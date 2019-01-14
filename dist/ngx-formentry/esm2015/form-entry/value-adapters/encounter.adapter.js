/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        nodes.forEach(node => {
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
                            setTimeout(() => {
                                node.control.setValue(firstProvider.uuid);
                            });
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
        nodes.forEach(node => {
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
        });
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
            node.children.forEach(child => {
                this._getEncounterNodes(child, array);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE1BQU07Ozs7O0lBRUYsWUFBbUIsYUFBZ0MsRUFBUyxVQUEyQjtRQUFwRSxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtJQUFJLENBQUM7Ozs7OztJQUU1RixZQUFZLENBQUMsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxD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LENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7O1lBekxKLFVBQVU7OztZQU5GLGlCQUFpQjtZQURqQixlQUFlOzs7O0lBVVIseUNBQXVDOztJQUFFLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuXG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBPcmRlclZhbHVlQWRhcHRlciB9IGZyb20gJy4vb3JkZXIuYWRhcHRlcic7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG9yZGVyc0FkYXB0ZXI6IE9yZGVyVmFsdWVBZGFwdGVyLCBwdWJsaWMgb2JzQWRhcHRlcjogT2JzVmFsdWVBZGFwdGVyKSB7IH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMucG9wdWxhdGVOb2RlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub3JkZXJzKSkge1xuICAgICAgICAgICAgdGhpcy5vcmRlcnNBZGFwdGVyLnBvcHVsYXRlRm9ybShmb3JtLCBwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9icykpIHtcbiAgICAgICAgICAgIHRoaXMub2JzQWRhcHRlci5wb3B1bGF0ZUZvcm0oZm9ybSwgcGF5bG9hZC5vYnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuXG4gICAgICAgIGlmIChwYXlsb2FkID09PSB1bmRlZmluZWQgfHwgcGF5bG9hZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBwYXlsb2FkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGF0ZScsIHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddKSAmJiBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFByb3ZpZGVyOiBhbnkgPSBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXVswXS5wcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdFByb3ZpZGVyICYmIGZpcnN0UHJvdmlkZXIudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVmVyeSB3ZWlyZCB3b3JrIGFyb3VuZCBmb3IgYW4gaXNzdWUgd2l0aCBzZXR0aW5nIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGZpcnN0UHJvdmlkZXIudXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBmaXJzdFByb3ZpZGVyLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyTG9jYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFsnbG9jYXRpb24nXSAmJiBwYXlsb2FkWydsb2NhdGlvbiddLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShwYXlsb2FkWydsb2NhdGlvbiddLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBwYXlsb2FkWydsb2NhdGlvbiddLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuXG4gICAgICAgIHRoaXMuc2V0Tm9uRmlsbGVkUGF5bG9hZE1lbWJlcnMoZm9ybSwgcGF5bG9hZCk7XG5cbiAgICAgICAgcGF5bG9hZFsnb2JzJ10gPSB0aGlzLm9ic0FkYXB0ZXIuZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtKSB8fCBbXTtcblxuICAgICAgICBwYXlsb2FkWydvcmRlcnMnXSA9IHRoaXMub3JkZXJzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIGdlbmVyYXRlTm9kZVBheWxvYWQocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSk7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBtb21lbnQobm9kZS5jb250cm9sLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51dGNPZmZzZXQocm9vdE5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnV0Y09mZnNldCB8fCAnKzAzMDAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10gPSBkYXRlVmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAmJiBub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXJzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogbm9kZS5jb250cm9sLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvdW50ZXJSb2xlOiAnYTBiMDMwNTAtYzk5Yi0xMWUwLTk1NzItMDgwMDIwMGM5YTY2JyAvLyB1bmtub3duIHByb3ZpZGVyIHJvbGUgaW4gdGhlIGVuY291bnRlciBhcyBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10gPSBwcm92aWRlcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyTG9jYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsnbG9jYXRpb24nXSA9IG5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBnZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UpOiBBcnJheTxOb2RlQmFzZT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4gPSBbXTtcbiAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUsIHJlc3VsdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBzZXROb25GaWxsZWRQYXlsb2FkTWVtYmVycyhmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucGF0aWVudFV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wYXRpZW50VXVpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnZpc2l0VXVpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkVmlzaXRVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby52aXNpdFV1aWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJUeXBlVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZm9ybVV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZEZvcm1VdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5mb3JtVXVpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZEVuY291bnRlclV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclV1aWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIHBhdGllbnRVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZFsncGF0aWVudCddID0gcGF0aWVudFV1aWQ7XG4gICAgfVxuXG4gICAgc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCB2aXNpdFV1aWQ6IHN0cmluZykge1xuICAgICAgICBwYXlsb2FkWyd2aXNpdCddID0gdmlzaXRVdWlkO1xuICAgIH1cblxuICAgIHNldFBheWxvYWRFbmNvdW50ZXJUeXBlVXVpZChwYXlsb2FkLCBlbmNvdW50ZXJUeXBlVXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHBheWxvYWRbJ2VuY291bnRlclR5cGUnXSA9IGVuY291bnRlclR5cGVVdWlkO1xuICAgIH1cblxuICAgIHNldFBheWxvYWRGb3JtVXVpZChwYXlsb2FkLCBmb3JtVXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHBheWxvYWRbJ2Zvcm0nXSA9IGZvcm1VdWlkO1xuICAgIH1cblxuICAgIHNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGVuY291bnRlclV1aWQ6IHN0cmluZykge1xuICAgICAgICBwYXlsb2FkWyd1dWlkJ10gPSBlbmNvdW50ZXJVdWlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEVuY291bnRlck5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSwgYXJyYXk6IEFycmF5PE5vZGVCYXNlPikge1xuICAgICAgICBpZiAodGhpcy5faXNFbmNvdW50ZXJOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW5bb10gaW5zdGFuY2VvZiBOb2RlQmFzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2Rlcyhub2RlLmNoaWxkcmVuW29dLCBhcnJheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2RlcyhjaGlsZCwgYXJyYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc0VuY291bnRlck5vZGUobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckRhdGV0aW1lJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJQcm92aWRlcicgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnZW5jb3VudGVyTG9jYXRpb24nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==