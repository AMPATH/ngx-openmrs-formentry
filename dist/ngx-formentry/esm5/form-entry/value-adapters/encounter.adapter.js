/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
var EncounterAdapter = /** @class */ (function () {
    function EncounterAdapter(ordersAdapter, obsAdapter) {
        this.ordersAdapter = ordersAdapter;
        this.obsAdapter = obsAdapter;
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    EncounterAdapter.prototype.populateForm = /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    function (form, payload) {
        this.populateNode(form.rootNode, payload);
        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    };
    /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    EncounterAdapter.prototype.populateNode = /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    function (rootNode, payload) {
        if (payload === undefined || payload === null) {
            throw new Error('Expected payload');
        }
        var /** @type {?} */ nodes = this.getEncounterNodes(rootNode);
        nodes.forEach(function (node) {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (Array.isArray(payload['encounterProviders']) && payload['encounterProviders'].length > 0) {
                        var /** @type {?} */ firstProvider = payload['encounterProviders'][0].provider;
                        if (firstProvider && firstProvider.uuid) {
                            node.control.setValue(firstProvider.uuid);
                            node.initialValue = firstProvider.uuid;
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
    /**
     * @param {?} form
     * @return {?}
     */
    EncounterAdapter.prototype.generateFormPayload = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var /** @type {?} */ payload = this.generateNodePayload(form.rootNode);
        this.setNonFilledPayloadMembers(form, payload);
        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
        return payload;
    };
    /**
     * @param {?} rootNode
     * @return {?}
     */
    EncounterAdapter.prototype.generateNodePayload = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var /** @type {?} */ nodes = this.getEncounterNodes(rootNode);
        var /** @type {?} */ payload = {};
        nodes.forEach(function (node) {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        var /** @type {?} */ dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            var /** @type {?} */ providers = [];
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
    /**
     * @param {?} rootNode
     * @return {?}
     */
    EncounterAdapter.prototype.getEncounterNodes = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var /** @type {?} */ results = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    };
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    EncounterAdapter.prototype.setNonFilledPayloadMembers = /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    function (form, payload) {
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
    /**
     * @param {?} payload
     * @param {?} patientUuid
     * @return {?}
     */
    EncounterAdapter.prototype.setPayloadPatientUuid = /**
     * @param {?} payload
     * @param {?} patientUuid
     * @return {?}
     */
    function (payload, patientUuid) {
        payload['patient'] = patientUuid;
    };
    /**
     * @param {?} payload
     * @param {?} visitUuid
     * @return {?}
     */
    EncounterAdapter.prototype.setPayloadVisitUuid = /**
     * @param {?} payload
     * @param {?} visitUuid
     * @return {?}
     */
    function (payload, visitUuid) {
        payload['visit'] = visitUuid;
    };
    /**
     * @param {?} payload
     * @param {?} encounterTypeUuid
     * @return {?}
     */
    EncounterAdapter.prototype.setPayloadEncounterTypeUuid = /**
     * @param {?} payload
     * @param {?} encounterTypeUuid
     * @return {?}
     */
    function (payload, encounterTypeUuid) {
        payload['encounterType'] = encounterTypeUuid;
    };
    /**
     * @param {?} payload
     * @param {?} formUuid
     * @return {?}
     */
    EncounterAdapter.prototype.setPayloadFormUuid = /**
     * @param {?} payload
     * @param {?} formUuid
     * @return {?}
     */
    function (payload, formUuid) {
        payload['form'] = formUuid;
    };
    /**
     * @param {?} payload
     * @param {?} encounterUuid
     * @return {?}
     */
    EncounterAdapter.prototype.setPayloadEncounterUuid = /**
     * @param {?} payload
     * @param {?} encounterUuid
     * @return {?}
     */
    function (payload, encounterUuid) {
        payload['uuid'] = encounterUuid;
    };
    /**
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    EncounterAdapter.prototype._getEncounterNodes = /**
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    function (rootNode, array) {
        var _this = this;
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var /** @type {?} */ node = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            var /** @type {?} */ node = /** @type {?} */ (rootNode);
            node.children.forEach(function (child) {
                _this._getEncounterNodes(child, array);
            });
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    EncounterAdapter.prototype._isEncounterNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
        { type: OrderValueAdapter, },
        { type: ObsValueAdapter, },
    ]; };
    return EncounterAdapter;
}());
export { EncounterAdapter };
function EncounterAdapter_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterAdapter.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterAdapter.ctorParameters;
    /** @type {?} */
    EncounterAdapter.prototype.ordersAdapter;
    /** @type {?} */
    EncounterAdapter.prototype.obsAdapter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQzs7SUFLbkIsMEJBQW1CLGFBQWdDLEVBQVMsVUFBMkI7UUFBcEUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7S0FBSzs7Ozs7O0lBRTVGLHVDQUFZOzs7OztJQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FB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Ozs7O2dCQU5GLGlCQUFpQjtnQkFEakIsZUFBZTs7MkJBTnhCOztTQWNhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuXG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4vb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL29yZGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvcmRlcnNBZGFwdGVyOiBPcmRlclZhbHVlQWRhcHRlciwgcHVibGljIG9ic0FkYXB0ZXI6IE9ic1ZhbHVlQWRhcHRlcikgeyB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICB0aGlzLnBvcHVsYXRlTm9kZShmb3JtLnJvb3ROb2RlLCBwYXlsb2FkKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9yZGVycykpIHtcbiAgICAgICAgICAgIHRoaXMub3JkZXJzQWRhcHRlci5wb3B1bGF0ZUZvcm0oZm9ybSwgcGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZC5vYnMpKSB7XG4gICAgICAgICAgICB0aGlzLm9ic0FkYXB0ZXIucG9wdWxhdGVGb3JtKGZvcm0sIHBheWxvYWQub2JzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvcHVsYXRlTm9kZShyb290Tm9kZTogTm9kZUJhc2UsIHBheWxvYWQpIHtcblxuICAgICAgICBpZiAocGF5bG9hZCA9PT0gdW5kZWZpbmVkIHx8IHBheWxvYWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcGF5bG9hZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlKTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGUnLCBwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShtb21lbnQocGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSkudG9EYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBtb21lbnQocGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSkudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXSkgJiYgcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQcm92aWRlcjogYW55ID0gcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ11bMF0ucHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RQcm92aWRlciAmJiBmaXJzdFByb3ZpZGVyLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZmlyc3RQcm92aWRlci51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGZpcnN0UHJvdmlkZXIudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkWydsb2NhdGlvbiddICYmIHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdlbmVyYXRlTm9kZVBheWxvYWQoZm9ybS5yb290Tm9kZSk7XG5cbiAgICAgICAgdGhpcy5zZXROb25GaWxsZWRQYXlsb2FkTWVtYmVycyhmb3JtLCBwYXlsb2FkKTtcblxuICAgICAgICBwYXlsb2FkWydvYnMnXSA9IHRoaXMub2JzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xuXG4gICAgICAgIHBheWxvYWRbJ29yZGVycyddID0gdGhpcy5vcmRlcnNBZGFwdGVyLmdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybSkgfHwgW107XG5cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVOb2RlUGF5bG9hZChyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHt9O1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG1vbWVudChub2RlLmNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnV0Y09mZnNldChyb290Tm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udXRjT2Zmc2V0IHx8ICcrMDMwMCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSA9IGRhdGVWYWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICYmIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBub2RlLmNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY291bnRlclJvbGU6ICdhMGIwMzA1MC1jOTliLTExZTAtOTU3Mi0wODAwMjAwYzlhNjYnIC8vIHVua25vd24gcHJvdmlkZXIgcm9sZSBpbiB0aGUgZW5jb3VudGVyIGFzIGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXSA9IHByb3ZpZGVycztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkWydsb2NhdGlvbiddID0gbm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIGdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPiA9IFtdO1xuICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSwgcmVzdWx0cyk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHNldE5vbkZpbGxlZFBheWxvYWRNZW1iZXJzKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wYXRpZW50VXVpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkUGF0aWVudFV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnBhdGllbnRVdWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRWaXNpdFV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnZpc2l0VXVpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJUeXBlVXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVHlwZVV1aWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5mb3JtVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRm9ybVV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmZvcm1VdWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRW5jb3VudGVyVXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQYXlsb2FkUGF0aWVudFV1aWQocGF5bG9hZCwgcGF0aWVudFV1aWQ6IHN0cmluZykge1xuICAgICAgICBwYXlsb2FkWydwYXRpZW50J10gPSBwYXRpZW50VXVpZDtcbiAgICB9XG5cbiAgICBzZXRQYXlsb2FkVmlzaXRVdWlkKHBheWxvYWQsIHZpc2l0VXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHBheWxvYWRbJ3Zpc2l0J10gPSB2aXNpdFV1aWQ7XG4gICAgfVxuXG4gICAgc2V0UGF5bG9hZEVuY291bnRlclR5cGVVdWlkKHBheWxvYWQsIGVuY291bnRlclR5cGVVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyVHlwZSddID0gZW5jb3VudGVyVHlwZVV1aWQ7XG4gICAgfVxuXG4gICAgc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm1VdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZFsnZm9ybSddID0gZm9ybVV1aWQ7XG4gICAgfVxuXG4gICAgc2V0UGF5bG9hZEVuY291bnRlclV1aWQocGF5bG9hZCwgZW5jb3VudGVyVXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHBheWxvYWRbJ3V1aWQnXSA9IGVuY291bnRlclV1aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlLCBhcnJheTogQXJyYXk8Tm9kZUJhc2U+KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0VuY291bnRlck5vZGUocm9vdE5vZGUpKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKHJvb3ROb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltvXSBpbnN0YW5jZW9mIE5vZGVCYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldEVuY291bnRlck5vZGVzKG5vZGUuY2hpbGRyZW5bb10sIGFycmF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldEVuY291bnRlck5vZGVzKGNoaWxkLCBhcnJheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2lzRW5jb3VudGVyTm9kZShub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnZW5jb3VudGVyRGF0ZXRpbWUnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlclByb3ZpZGVyJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJMb2NhdGlvbicpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIl19