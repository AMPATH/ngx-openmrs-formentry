/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
export class EncounterAdapter {
    /**
     * @param {?} ordersAdapter
     * @param {?} obsAdapter
     */
    constructor(ordersAdapter, obsAdapter) {
        this.ordersAdapter = ordersAdapter;
        this.obsAdapter = obsAdapter;
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    populateForm(form, payload) {
        this.populateNode(form.rootNode, payload);
        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    }
    /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    populateNode(rootNode, payload) {
        if (payload === undefined || payload === null) {
            throw new Error('Expected payload');
        }
        const /** @type {?} */ nodes = this.getEncounterNodes(rootNode);
        nodes.forEach(node => {
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
                        const /** @type {?} */ firstProvider = payload['encounterProviders'][0].provider;
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
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        const /** @type {?} */ payload = this.generateNodePayload(form.rootNode);
        this.setNonFilledPayloadMembers(form, payload);
        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
        return payload;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    generateNodePayload(rootNode) {
        const /** @type {?} */ nodes = this.getEncounterNodes(rootNode);
        const /** @type {?} */ payload = {};
        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        const /** @type {?} */ dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            const /** @type {?} */ providers = [];
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
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    getEncounterNodes(rootNode) {
        const /** @type {?} */ results = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    setNonFilledPayloadMembers(form, payload) {
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
    }
    /**
     * @param {?} payload
     * @param {?} patientUuid
     * @return {?}
     */
    setPayloadPatientUuid(payload, patientUuid) {
        payload['patient'] = patientUuid;
    }
    /**
     * @param {?} payload
     * @param {?} visitUuid
     * @return {?}
     */
    setPayloadVisitUuid(payload, visitUuid) {
        payload['visit'] = visitUuid;
    }
    /**
     * @param {?} payload
     * @param {?} encounterTypeUuid
     * @return {?}
     */
    setPayloadEncounterTypeUuid(payload, encounterTypeUuid) {
        payload['encounterType'] = encounterTypeUuid;
    }
    /**
     * @param {?} payload
     * @param {?} formUuid
     * @return {?}
     */
    setPayloadFormUuid(payload, formUuid) {
        payload['form'] = formUuid;
    }
    /**
     * @param {?} payload
     * @param {?} encounterUuid
     * @return {?}
     */
    setPayloadEncounterUuid(payload, encounterUuid) {
        payload['uuid'] = encounterUuid;
    }
    /**
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    _getEncounterNodes(rootNode, array) {
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            const /** @type {?} */ node = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            const /** @type {?} */ node = /** @type {?} */ (rootNode);
            node.children.forEach(child => {
                this._getEncounterNodes(child, array);
            });
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    _isEncounterNode(node) {
        if (node.question.extras &&
            (node.question.extras.type === 'encounterDatetime' ||
                node.question.extras.type === 'encounterProvider' ||
                node.question.extras.type === 'encounterLocation')) {
            return true;
        }
        return false;
    }
}
EncounterAdapter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EncounterAdapter.ctorParameters = () => [
    { type: OrderValueAdapter, },
    { type: ObsValueAdapter, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUd2QixNQUFNOzs7OztJQUVGLFlBQW1CLGFBQWdDLEVBQVMsVUFBMkI7UUFBcEUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7S0FBSzs7Ozs7O0lBRTVGLFlBQVksQ0FBQyxJQUFVLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsRDtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxD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QUFHLFFBQXFCLENBQUEsQ0FBQzs7WUFFbkMsR0FBRyxDQUFDLENBQUMsdUJBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNwRDthQUNKO1NBQ0o7UUFFRCxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoQyx1QkFBTSxJQUFJLHFCQUFHLFFBQXFCLENBQUEsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN6QyxDQUFDLENBQUM7U0FDTjs7Ozs7O0lBR0csZ0JBQWdCLENBQUMsSUFBYztRQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDcEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssbUJBQW1CO2dCQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssbUJBQW1CO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQXBMcEIsVUFBVTs7OztZQU5GLGlCQUFpQjtZQURqQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xyXG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL29icy5hZGFwdGVyJztcclxuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL29yZGVyLmFkYXB0ZXInO1xyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEVuY291bnRlckFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvcmRlcnNBZGFwdGVyOiBPcmRlclZhbHVlQWRhcHRlciwgcHVibGljIG9ic0FkYXB0ZXI6IE9ic1ZhbHVlQWRhcHRlcikgeyB9XHJcblxyXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcclxuICAgICAgICB0aGlzLnBvcHVsYXRlTm9kZShmb3JtLnJvb3ROb2RlLCBwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZC5vcmRlcnMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXJzQWRhcHRlci5wb3B1bGF0ZUZvcm0oZm9ybSwgcGF5bG9hZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub2JzKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic0FkYXB0ZXIucG9wdWxhdGVGb3JtKGZvcm0sIHBheWxvYWQub2JzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xyXG5cclxuICAgICAgICBpZiAocGF5bG9hZCA9PT0gdW5kZWZpbmVkIHx8IHBheWxvYWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBwYXlsb2FkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0ZScsIHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUobW9tZW50KHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pLnRvRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBtb21lbnQocGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSkudG9EYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddKSAmJiBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0UHJvdmlkZXI6IGFueSA9IHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddWzBdLnByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RQcm92aWRlciAmJiBmaXJzdFByb3ZpZGVyLnV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBmaXJzdFByb3ZpZGVyLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRbJ2xvY2F0aW9uJ10gJiYgcGF5bG9hZFsnbG9jYXRpb24nXS51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShwYXlsb2FkWydsb2NhdGlvbiddLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2VuZXJhdGVOb2RlUGF5bG9hZChmb3JtLnJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXROb25GaWxsZWRQYXlsb2FkTWVtYmVycyhmb3JtLCBwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgcGF5bG9hZFsnb2JzJ10gPSB0aGlzLm9ic0FkYXB0ZXIuZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtKSB8fCBbXTtcclxuXHJcbiAgICAgICAgcGF5bG9hZFsnb3JkZXJzJ10gPSB0aGlzLm9yZGVyc0FkYXB0ZXIuZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtKSB8fCBbXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVOb2RlUGF5bG9hZChyb290Tm9kZTogTm9kZUJhc2UpIHtcclxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUpO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcclxuXHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gbW9tZW50KG5vZGUuY29udHJvbC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51dGNPZmZzZXQocm9vdE5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnV0Y09mZnNldCB8fCAnKzAzMDAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyRGF0ZXRpbWUnXSA9IGRhdGVWYWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICYmIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBub2RlLmNvbnRyb2wudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb3VudGVyUm9sZTogJ2EwYjAzMDUwLWM5OWItMTFlMC05NTcyLTA4MDAyMDBjOWE2NicgLy8gdW5rbm93biBwcm92aWRlciByb2xlIGluIHRoZSBlbmNvdW50ZXIgYXMgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXSA9IHByb3ZpZGVycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRbJ2xvY2F0aW9uJ10gPSBub2RlLmNvbnRyb2wudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+ID0gW107XHJcbiAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUsIHJlc3VsdHMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE5vbkZpbGxlZFBheWxvYWRNZW1iZXJzKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcclxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnBhdGllbnRVdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wYXRpZW50VXVpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnZpc2l0VXVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRWaXNpdFV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnZpc2l0VXVpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZEVuY291bnRlclR5cGVVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJUeXBlVXVpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmZvcm1VdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5mb3JtVXVpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRW5jb3VudGVyVXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFBheWxvYWRQYXRpZW50VXVpZChwYXlsb2FkLCBwYXRpZW50VXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsncGF0aWVudCddID0gcGF0aWVudFV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCB2aXNpdFV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIHBheWxvYWRbJ3Zpc2l0J10gPSB2aXNpdFV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5bG9hZEVuY291bnRlclR5cGVVdWlkKHBheWxvYWQsIGVuY291bnRlclR5cGVVdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJUeXBlJ10gPSBlbmNvdW50ZXJUeXBlVXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXlsb2FkRm9ybVV1aWQocGF5bG9hZCwgZm9ybVV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIHBheWxvYWRbJ2Zvcm0nXSA9IGZvcm1VdWlkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGVuY291bnRlclV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIHBheWxvYWRbJ3V1aWQnXSA9IGVuY291bnRlclV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlLCBhcnJheTogQXJyYXk8Tm9kZUJhc2U+KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRW5jb3VudGVyTm9kZShyb290Tm9kZSkpIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltvXSBpbnN0YW5jZW9mIE5vZGVCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMobm9kZS5jaGlsZHJlbltvXSwgYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcclxuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldEVuY291bnRlck5vZGVzKGNoaWxkLCBhcnJheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0VuY291bnRlck5vZGUobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcclxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJEYXRldGltZScgfHxcclxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJQcm92aWRlcicgfHxcclxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJMb2NhdGlvbicpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19