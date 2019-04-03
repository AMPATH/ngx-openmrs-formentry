/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
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
        /** @type {?} */
        const nodes = this.getEncounterNodes(rootNode);
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        node => {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        // console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (Array.isArray(payload['encounterProviders']) && payload['encounterProviders'].length > 0) {
                        /** @type {?} */
                        const firstProvider = payload['encounterProviders'][0].provider;
                        if (firstProvider && firstProvider.uuid) {
                            //Very weird work around for an issue with setting the value
                            node.control.setValue(firstProvider.uuid);
                            setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                node.control.setValue(firstProvider.uuid);
                            }));
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
        }));
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        /** @type {?} */
        const payload = this.generateNodePayload(form.rootNode);
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
        /** @type {?} */
        const nodes = this.getEncounterNodes(rootNode);
        /** @type {?} */
        const payload = {};
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        /** @type {?} */
                        const dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            /** @type {?} */
                            const providers = [];
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
        }));
        return payload;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    getEncounterNodes(rootNode) {
        /** @type {?} */
        const results = [];
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
     * @private
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    _getEncounterNodes(rootNode, array) {
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            const node = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (const o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            const node = (/** @type {?} */ (rootNode));
            node.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => {
                this._getEncounterNodes(child, array);
            }));
        }
    }
    /**
     * @private
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
EncounterAdapter.ctorParameters = () => [
    { type: OrderValueAdapter },
    { type: ObsValueAdapter }
];
if (false) {
    /** @type {?} */
    EncounterAdapter.prototype.ordersAdapter;
    /** @type {?} */
    EncounterAdapter.prototype.obsAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE1BQU07Ozs7O0lBRUYsWUFBbUIsYUFBZ0MsRUFBUyxVQUEyQjtRQUFwRSxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtJQUFJLENBQUM7Ozs7OztJQUU1RixZQUFZLENBQUMsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxD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LG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7O1lBekxKLFVBQVU7OztZQU5GLGlCQUFpQjtZQURqQixlQUFlOzs7O0lBVVIseUNBQXVDOztJQUFFLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcclxuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi9vYnMuYWRhcHRlcic7XHJcbmltcG9ydCB7IE9yZGVyVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi9vcmRlci5hZGFwdGVyJztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3JkZXJzQWRhcHRlcjogT3JkZXJWYWx1ZUFkYXB0ZXIsIHB1YmxpYyBvYnNBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXIpIHsgfVxyXG5cclxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU5vZGUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub3JkZXJzKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyc0FkYXB0ZXIucG9wdWxhdGVGb3JtKGZvcm0sIHBheWxvYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9icykpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNBZGFwdGVyLnBvcHVsYXRlRm9ybShmb3JtLCBwYXlsb2FkLm9icyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlTm9kZShyb290Tm9kZTogTm9kZUJhc2UsIHBheWxvYWQpIHtcclxuXHJcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcGF5bG9hZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RhdGUnLCBwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gbW9tZW50KHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pLnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXSkgJiYgcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFByb3ZpZGVyOiBhbnkgPSBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXVswXS5wcm92aWRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0UHJvdmlkZXIgJiYgZmlyc3RQcm92aWRlci51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1Zlcnkgd2VpcmQgd29yayBhcm91bmQgZm9yIGFuIGlzc3VlIHdpdGggc2V0dGluZyB0aGUgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGZpcnN0UHJvdmlkZXIudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFsnbG9jYXRpb24nXSAmJiBwYXlsb2FkWydsb2NhdGlvbiddLnV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gcGF5bG9hZFsnbG9jYXRpb24nXS51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE5vbkZpbGxlZFBheWxvYWRNZW1iZXJzKGZvcm0sIHBheWxvYWQpO1xyXG5cclxuICAgICAgICBwYXlsb2FkWydvYnMnXSA9IHRoaXMub2JzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xyXG5cclxuICAgICAgICBwYXlsb2FkWydvcmRlcnMnXSA9IHRoaXMub3JkZXJzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xyXG5cclxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSk7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHt9O1xyXG5cclxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBtb21lbnQobm9kZS5jb250cm9sLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnV0Y09mZnNldChyb290Tm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udXRjT2Zmc2V0IHx8ICcrMDMwMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddID0gZGF0ZVZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgJiYgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IG5vZGUuY29udHJvbC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvdW50ZXJSb2xlOiAnYTBiMDMwNTAtYzk5Yi0xMWUwLTk1NzItMDgwMDIwMGM5YTY2JyAvLyB1bmtub3duIHByb3ZpZGVyIHJvbGUgaW4gdGhlIGVuY291bnRlciBhcyBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddID0gcHJvdmlkZXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsnbG9jYXRpb24nXSA9IG5vZGUuY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlKTogQXJyYXk8Tm9kZUJhc2U+IHtcclxuICAgICAgICBjb25zdCByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4gPSBbXTtcclxuICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSwgcmVzdWx0cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9uRmlsbGVkUGF5bG9hZE1lbWJlcnMoZm9ybTogRm9ybSwgcGF5bG9hZCkge1xyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucGF0aWVudFV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkUGF0aWVudFV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnBhdGllbnRVdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVHlwZVV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZm9ybVV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRm9ybVV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmZvcm1VdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJVdWlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIHBhdGllbnRVdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBwYXlsb2FkWydwYXRpZW50J10gPSBwYXRpZW50VXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXlsb2FkVmlzaXRVdWlkKHBheWxvYWQsIHZpc2l0VXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsndmlzaXQnXSA9IHZpc2l0VXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZW5jb3VudGVyVHlwZVV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIHBheWxvYWRbJ2VuY291bnRlclR5cGUnXSA9IGVuY291bnRlclR5cGVVdWlkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBheWxvYWRGb3JtVXVpZChwYXlsb2FkLCBmb3JtVXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsnZm9ybSddID0gZm9ybVV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5bG9hZEVuY291bnRlclV1aWQocGF5bG9hZCwgZW5jb3VudGVyVXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsndXVpZCddID0gZW5jb3VudGVyVXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UsIGFycmF5OiBBcnJheTxOb2RlQmFzZT4pIHtcclxuICAgICAgICBpZiAodGhpcy5faXNFbmNvdW50ZXJOb2RlKHJvb3ROb2RlKSkge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKHJvb3ROb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuW29dIGluc3RhbmNlb2YgTm9kZUJhc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2Rlcyhub2RlLmNoaWxkcmVuW29dLCBhcnJheSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMoY2hpbGQsIGFycmF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzRW5jb3VudGVyTm9kZShub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxyXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckRhdGV0aW1lJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlclByb3ZpZGVyJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckxvY2F0aW9uJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=