import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import * as moment_ from 'moment';
var moment = moment_;
var EncounterAdapter = /** @class */ (function () {
    function EncounterAdapter(ordersAdapter, obsAdapter) {
        this.ordersAdapter = ordersAdapter;
        this.obsAdapter = obsAdapter;
    }
    EncounterAdapter.prototype.populateForm = function (form, payload) {
        this.populateNode(form.rootNode, payload);
        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    };
    EncounterAdapter.prototype.populateNode = function (rootNode, payload) {
        if (payload === undefined || payload === null) {
            throw new Error('Expected payload');
        }
        var nodes = this.getEncounterNodes(rootNode);
        nodes.forEach(function (node) {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        // console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (Array.isArray(payload['encounterProviders']) &&
                        payload['encounterProviders'].length > 0) {
                        var firstProvider_1 = payload['encounterProviders'][0].provider;
                        if (firstProvider_1 && firstProvider_1.uuid) {
                            // Very weird work around for an issue with setting the value
                            node.control.setValue(firstProvider_1.uuid);
                            setTimeout(function () {
                                node.control.setValue(firstProvider_1.uuid);
                            });
                            node.initialValue = firstProvider_1.uuid;
                        }
                    }
                    break;
                case 'encounterLocation':
                    if (payload['location'] && payload['location'].uuid) {
                        node.control.setValue(payload['location'].uuid);
                        node.initialValue = payload['location'].uuid;
                    }
                    break;
                default:
                    break;
            }
        });
    };
    EncounterAdapter.prototype.generateFormPayload = function (form) {
        var payload = this.generateNodePayload(form.rootNode);
        this.setNonFilledPayloadMembers(form, payload);
        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
        return payload;
    };
    EncounterAdapter.prototype.generateNodePayload = function (rootNode) {
        var nodes = this.getEncounterNodes(rootNode);
        var payload = {};
        nodes.forEach(function (node) {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        var dateValue = moment(node.control.value).utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            var providers = [];
                            providers.push({
                                provider: node.control.value,
                                encounterRole: 'a0b03050-c99b-11e0-9572-0800200c9a66' // unknown provider role in the encounter as default
                            });
                            payload['encounterProviders'] = providers;
                        }
                        break;
                    case 'encounterLocation':
                        payload['location'] = node.control.value;
                        break;
                    default:
                        break;
                }
            }
        });
        return payload;
    };
    EncounterAdapter.prototype.getEncounterNodes = function (rootNode) {
        var results = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    };
    EncounterAdapter.prototype.setNonFilledPayloadMembers = function (form, payload) {
        if (form.valueProcessingInfo.patientUuid) {
            this.setPayloadPatientUuid(payload, form.valueProcessingInfo.patientUuid);
        }
        if (form.valueProcessingInfo.visitUuid) {
            this.setPayloadVisitUuid(payload, form.valueProcessingInfo.visitUuid);
        }
        if (form.valueProcessingInfo.encounterTypeUuid) {
            this.setPayloadEncounterTypeUuid(payload, form.valueProcessingInfo.encounterTypeUuid);
        }
        if (form.valueProcessingInfo.formUuid) {
            this.setPayloadFormUuid(payload, form.valueProcessingInfo.formUuid);
        }
        if (form.valueProcessingInfo.encounterUuid) {
            this.setPayloadEncounterUuid(payload, form.valueProcessingInfo.encounterUuid);
        }
    };
    EncounterAdapter.prototype.setPayloadPatientUuid = function (payload, patientUuid) {
        payload['patient'] = patientUuid;
    };
    EncounterAdapter.prototype.setPayloadVisitUuid = function (payload, visitUuid) {
        payload['visit'] = visitUuid;
    };
    EncounterAdapter.prototype.setPayloadEncounterTypeUuid = function (payload, encounterTypeUuid) {
        payload['encounterType'] = encounterTypeUuid;
    };
    EncounterAdapter.prototype.setPayloadFormUuid = function (payload, formUuid) {
        payload['form'] = formUuid;
    };
    EncounterAdapter.prototype.setPayloadEncounterUuid = function (payload, encounterUuid) {
        payload['uuid'] = encounterUuid;
    };
    EncounterAdapter.prototype._getEncounterNodes = function (rootNode, array) {
        var _this = this;
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var node = rootNode;
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            var node = rootNode;
            node.children.forEach(function (child) {
                _this._getEncounterNodes(child, array);
            });
        }
    };
    EncounterAdapter.prototype._isEncounterNode = function (node) {
        if (node.question.extras &&
            (node.question.extras.type === 'encounterDatetime' ||
                node.question.extras.type === 'encounterProvider' ||
                node.question.extras.type === 'encounterLocation')) {
            return true;
        }
        return false;
    };
    EncounterAdapter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EncounterAdapter.ctorParameters = function () { return [
        { type: OrderValueAdapter },
        { type: ObsValueAdapter }
    ]; };
    return EncounterAdapter;
}());
export { EncounterAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUkzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QjtJQUVFLDBCQUNTLGFBQWdDLEVBQ2hDLFVBQTJCO1FBRDNCLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtJQUNqQyxDQUFDO0lBRUosdUNBQVksR0FBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFB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LENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssbUJBQW1CO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBN01GLFVBQVU7Ozs7Z0JBTkYsaUJBQWlCO2dCQURqQixlQUFlOztJQXFOeEIsdUJBQUM7Q0FBQSxBQTlNRCxJQThNQztTQTdNWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcblxuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4vb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL29yZGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG9yZGVyc0FkYXB0ZXI6IE9yZGVyVmFsdWVBZGFwdGVyLFxuICAgIHB1YmxpYyBvYnNBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXJcbiAgKSB7fVxuXG4gIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgdGhpcy5wb3B1bGF0ZU5vZGUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9yZGVycykpIHtcbiAgICAgIHRoaXMub3JkZXJzQWRhcHRlci5wb3B1bGF0ZUZvcm0oZm9ybSwgcGF5bG9hZCk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub2JzKSkge1xuICAgICAgdGhpcy5vYnNBZGFwdGVyLnBvcHVsYXRlRm9ybShmb3JtLCBwYXlsb2FkLm9icyk7XG4gICAgfVxuICB9XG5cbiAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuICAgIGlmIChwYXlsb2FkID09PSB1bmRlZmluZWQgfHwgcGF5bG9hZCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBwYXlsb2FkJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlKTtcblxuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSkge1xuICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgICAgaWYgKHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRlJywgcGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSk7XG4gICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoXG4gICAgICAgICAgICAgIG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gbW9tZW50KHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pLnRvRGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10pICYmXG4gICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXS5sZW5ndGggPiAwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFByb3ZpZGVyOiBhbnkgPVxuICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXVswXS5wcm92aWRlcjtcbiAgICAgICAgICAgIGlmIChmaXJzdFByb3ZpZGVyICYmIGZpcnN0UHJvdmlkZXIudXVpZCkge1xuICAgICAgICAgICAgICAvLyBWZXJ5IHdlaXJkIHdvcmsgYXJvdW5kIGZvciBhbiBpc3N1ZSB3aXRoIHNldHRpbmcgdGhlIHZhbHVlXG4gICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZmlyc3RQcm92aWRlci51dWlkKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZmlyc3RQcm92aWRlci51dWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5jb3VudGVyTG9jYXRpb24nOlxuICAgICAgICAgIGlmIChwYXlsb2FkWydsb2NhdGlvbiddICYmIHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCkge1xuICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCk7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuXG4gICAgdGhpcy5zZXROb25GaWxsZWRQYXlsb2FkTWVtYmVycyhmb3JtLCBwYXlsb2FkKTtcblxuICAgIHBheWxvYWRbJ29icyddID0gdGhpcy5vYnNBZGFwdGVyLmdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybSkgfHwgW107XG5cbiAgICBwYXlsb2FkWydvcmRlcnMnXSA9IHRoaXMub3JkZXJzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xuXG4gICAgcmV0dXJuIHBheWxvYWQ7XG4gIH1cblxuICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHt9O1xuXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJ1xuICAgICAgKSB7XG4gICAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcbiAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG1vbWVudChub2RlLmNvbnRyb2wudmFsdWUpLnV0Y09mZnNldChcbiAgICAgICAgICAgICAgcm9vdE5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnV0Y09mZnNldCB8fCAnKzAzMDAnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSA9IGRhdGVWYWx1ZS5mb3JtYXQoXG4gICAgICAgICAgICAgICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgJiYgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICBjb25zdCBwcm92aWRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBub2RlLmNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgZW5jb3VudGVyUm9sZTogJ2EwYjAzMDUwLWM5OWItMTFlMC05NTcyLTA4MDAyMDBjOWE2NicgLy8gdW5rbm93biBwcm92aWRlciByb2xlIGluIHRoZSBlbmNvdW50ZXIgYXMgZGVmYXVsdFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10gPSBwcm92aWRlcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XG4gICAgICAgICAgICBwYXlsb2FkWydsb2NhdGlvbiddID0gbm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIGdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgY29uc3QgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+ID0gW107XG4gICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUsIHJlc3VsdHMpO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgc2V0Tm9uRmlsbGVkUGF5bG9hZE1lbWJlcnMoZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucGF0aWVudFV1aWQpIHtcbiAgICAgIHRoaXMuc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wYXRpZW50VXVpZCk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby52aXNpdFV1aWQpIHtcbiAgICAgIHRoaXMuc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKSB7XG4gICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJUeXBlVXVpZChcbiAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZm9ybVV1aWQpIHtcbiAgICAgIHRoaXMuc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5mb3JtVXVpZCk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJVdWlkKSB7XG4gICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJVdWlkKFxuICAgICAgICBwYXlsb2FkLFxuICAgICAgICBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQYXlsb2FkUGF0aWVudFV1aWQocGF5bG9hZCwgcGF0aWVudFV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ3BhdGllbnQnXSA9IHBhdGllbnRVdWlkO1xuICB9XG5cbiAgc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCB2aXNpdFV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ3Zpc2l0J10gPSB2aXNpdFV1aWQ7XG4gIH1cblxuICBzZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZW5jb3VudGVyVHlwZVV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ2VuY291bnRlclR5cGUnXSA9IGVuY291bnRlclR5cGVVdWlkO1xuICB9XG5cbiAgc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm1VdWlkOiBzdHJpbmcpIHtcbiAgICBwYXlsb2FkWydmb3JtJ10gPSBmb3JtVXVpZDtcbiAgfVxuXG4gIHNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGVuY291bnRlclV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ3V1aWQnXSA9IGVuY291bnRlclV1aWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UsIGFycmF5OiBBcnJheTxOb2RlQmFzZT4pIHtcbiAgICBpZiAodGhpcy5faXNFbmNvdW50ZXJOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltvXSBpbnN0YW5jZW9mIE5vZGVCYXNlKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMobm9kZS5jaGlsZHJlbltvXSwgYXJyYXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2RlcyhjaGlsZCwgYXJyYXkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNFbmNvdW50ZXJOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnZW5jb3VudGVyRGF0ZXRpbWUnIHx8XG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJQcm92aWRlcicgfHxcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckxvY2F0aW9uJylcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==