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
    EncounterAdapter.ctorParameters = function () { return [
        { type: OrderValueAdapter },
        { type: ObsValueAdapter }
    ]; };
    return EncounterAdapter;
}());
export { EncounterAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkI7SUFFRSwwQkFDUyxhQUFnQyxFQUNoQyxVQUEyQjtRQUQzQixrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7SUFDakMsQ0FBQztJQUVKLHVDQUFZLEdBQVosVUFBYSxJQUFVLEVBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENB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QyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQjtnQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQTdNRixVQUFVOzs7Z0JBTkYsaUJBQWlCO2dCQURqQixlQUFlOztJQXFOeEIsdUJBQUM7Q0FBQSxBQTlNRCxJQThNQztTQTdNWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcblxuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4vb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL29yZGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG9yZGVyc0FkYXB0ZXI6IE9yZGVyVmFsdWVBZGFwdGVyLFxuICAgIHB1YmxpYyBvYnNBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXJcbiAgKSB7fVxuXG4gIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgdGhpcy5wb3B1bGF0ZU5vZGUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9yZGVycykpIHtcbiAgICAgIHRoaXMub3JkZXJzQWRhcHRlci5wb3B1bGF0ZUZvcm0oZm9ybSwgcGF5bG9hZCk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub2JzKSkge1xuICAgICAgdGhpcy5vYnNBZGFwdGVyLnBvcHVsYXRlRm9ybShmb3JtLCBwYXlsb2FkLm9icyk7XG4gICAgfVxuICB9XG5cbiAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuICAgIGlmIChwYXlsb2FkID09PSB1bmRlZmluZWQgfHwgcGF5bG9hZCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBwYXlsb2FkJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlKTtcblxuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSkge1xuICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgICAgaWYgKHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRlJywgcGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSk7XG4gICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoXG4gICAgICAgICAgICAgIG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gbW9tZW50KHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pLnRvRGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10pICYmXG4gICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXS5sZW5ndGggPiAwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFByb3ZpZGVyOiBhbnkgPVxuICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXVswXS5wcm92aWRlcjtcbiAgICAgICAgICAgIGlmIChmaXJzdFByb3ZpZGVyICYmIGZpcnN0UHJvdmlkZXIudXVpZCkge1xuICAgICAgICAgICAgICAvLyBWZXJ5IHdlaXJkIHdvcmsgYXJvdW5kIGZvciBhbiBpc3N1ZSB3aXRoIHNldHRpbmcgdGhlIHZhbHVlXG4gICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZmlyc3RQcm92aWRlci51dWlkKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZmlyc3RQcm92aWRlci51dWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5jb3VudGVyTG9jYXRpb24nOlxuICAgICAgICAgIGlmIChwYXlsb2FkWydsb2NhdGlvbiddICYmIHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCkge1xuICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCk7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuXG4gICAgdGhpcy5zZXROb25GaWxsZWRQYXlsb2FkTWVtYmVycyhmb3JtLCBwYXlsb2FkKTtcblxuICAgIHBheWxvYWRbJ29icyddID0gdGhpcy5vYnNBZGFwdGVyLmdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybSkgfHwgW107XG5cbiAgICBwYXlsb2FkWydvcmRlcnMnXSA9IHRoaXMub3JkZXJzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xuXG4gICAgcmV0dXJuIHBheWxvYWQ7XG4gIH1cblxuICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHt9O1xuXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJ1xuICAgICAgKSB7XG4gICAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcbiAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG1vbWVudChub2RlLmNvbnRyb2wudmFsdWUpLnV0Y09mZnNldChcbiAgICAgICAgICAgICAgcm9vdE5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnV0Y09mZnNldCB8fCAnKzAzMDAnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSA9IGRhdGVWYWx1ZS5mb3JtYXQoXG4gICAgICAgICAgICAgICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgJiYgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICBjb25zdCBwcm92aWRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBub2RlLmNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgZW5jb3VudGVyUm9sZTogJ2EwYjAzMDUwLWM5OWItMTFlMC05NTcyLTA4MDAyMDBjOWE2NicgLy8gdW5rbm93biBwcm92aWRlciByb2xlIGluIHRoZSBlbmNvdW50ZXIgYXMgZGVmYXVsdFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10gPSBwcm92aWRlcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XG4gICAgICAgICAgICBwYXlsb2FkWydsb2NhdGlvbiddID0gbm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIGdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgY29uc3QgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+ID0gW107XG4gICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUsIHJlc3VsdHMpO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgc2V0Tm9uRmlsbGVkUGF5bG9hZE1lbWJlcnMoZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucGF0aWVudFV1aWQpIHtcbiAgICAgIHRoaXMuc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wYXRpZW50VXVpZCk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby52aXNpdFV1aWQpIHtcbiAgICAgIHRoaXMuc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKSB7XG4gICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJUeXBlVXVpZChcbiAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZm9ybVV1aWQpIHtcbiAgICAgIHRoaXMuc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5mb3JtVXVpZCk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJVdWlkKSB7XG4gICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJVdWlkKFxuICAgICAgICBwYXlsb2FkLFxuICAgICAgICBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRQYXlsb2FkUGF0aWVudFV1aWQocGF5bG9hZCwgcGF0aWVudFV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ3BhdGllbnQnXSA9IHBhdGllbnRVdWlkO1xuICB9XG5cbiAgc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCB2aXNpdFV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ3Zpc2l0J10gPSB2aXNpdFV1aWQ7XG4gIH1cblxuICBzZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZW5jb3VudGVyVHlwZVV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ2VuY291bnRlclR5cGUnXSA9IGVuY291bnRlclR5cGVVdWlkO1xuICB9XG5cbiAgc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm1VdWlkOiBzdHJpbmcpIHtcbiAgICBwYXlsb2FkWydmb3JtJ10gPSBmb3JtVXVpZDtcbiAgfVxuXG4gIHNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGVuY291bnRlclV1aWQ6IHN0cmluZykge1xuICAgIHBheWxvYWRbJ3V1aWQnXSA9IGVuY291bnRlclV1aWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UsIGFycmF5OiBBcnJheTxOb2RlQmFzZT4pIHtcbiAgICBpZiAodGhpcy5faXNFbmNvdW50ZXJOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltvXSBpbnN0YW5jZW9mIE5vZGVCYXNlKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMobm9kZS5jaGlsZHJlbltvXSwgYXJyYXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2RlcyhjaGlsZCwgYXJyYXkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNFbmNvdW50ZXJOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnZW5jb3VudGVyRGF0ZXRpbWUnIHx8XG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJQcm92aWRlcicgfHxcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckxvY2F0aW9uJylcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==