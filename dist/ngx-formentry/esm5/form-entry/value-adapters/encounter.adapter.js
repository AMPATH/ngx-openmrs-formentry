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
var moment = moment_;
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
        /** @type {?} */
        var nodes = this.getEncounterNodes(rootNode);
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
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
                        var firstProvider_1 = payload['encounterProviders'][0].provider;
                        if (firstProvider_1 && firstProvider_1.uuid) {
                            //Very weird work around for an issue with setting the value
                            node.control.setValue(firstProvider_1.uuid);
                            setTimeout((/**
                             * @return {?}
                             */
                            function () {
                                node.control.setValue(firstProvider_1.uuid);
                            }));
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
        }));
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
        /** @type {?} */
        var payload = this.generateNodePayload(form.rootNode);
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
        /** @type {?} */
        var nodes = this.getEncounterNodes(rootNode);
        /** @type {?} */
        var payload = {};
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        /** @type {?} */
                        var dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            /** @type {?} */
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
        }));
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
        /** @type {?} */
        var results = [];
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
     * @private
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    EncounterAdapter.prototype._getEncounterNodes = /**
     * @private
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
            /** @type {?} */
            var node = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var node = (/** @type {?} */ (rootNode));
            node.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                _this._getEncounterNodes(child, array);
            }));
        }
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    EncounterAdapter.prototype._isEncounterNode = /**
     * @private
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
    EncounterAdapter.ctorParameters = function () { return [
        { type: OrderValueAdapter },
        { type: ObsValueAdapter }
    ]; };
    return EncounterAdapter;
}());
export { EncounterAdapter };
if (false) {
    /** @type {?} */
    EncounterAdapter.prototype.ordersAdapter;
    /** @type {?} */
    EncounterAdapter.prototype.obsAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBR0ksMEJBQW1CLGFBQWdDLEVBQVMsVUFBMkI7UUFBcEUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7SUFBSSxDQUFDOzs7Ozs7SUFFNUYsdUNBQVk7Ozs7O0lBQVosVUFBYSxJQUFVLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFP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SUFBSSxLQUFLLG1CQUFtQjtnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQjtnQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Z0JBekxKLFVBQVU7OztnQkFORixpQkFBaUI7Z0JBRGpCLGVBQWU7O0lBaU14Qix1QkFBQztDQUFBLEFBMUxELElBMExDO1NBekxZLGdCQUFnQjs7O0lBRWIseUNBQXVDOztJQUFFLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcclxuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi9vYnMuYWRhcHRlcic7XHJcbmltcG9ydCB7IE9yZGVyVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi9vcmRlci5hZGFwdGVyJztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3JkZXJzQWRhcHRlcjogT3JkZXJWYWx1ZUFkYXB0ZXIsIHB1YmxpYyBvYnNBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXIpIHsgfVxyXG5cclxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU5vZGUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub3JkZXJzKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyc0FkYXB0ZXIucG9wdWxhdGVGb3JtKGZvcm0sIHBheWxvYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9icykpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNBZGFwdGVyLnBvcHVsYXRlRm9ybShmb3JtLCBwYXlsb2FkLm9icyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlTm9kZShyb290Tm9kZTogTm9kZUJhc2UsIHBheWxvYWQpIHtcclxuXHJcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcGF5bG9hZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldEVuY291bnRlck5vZGVzKHJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RhdGUnLCBwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gbW9tZW50KHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pLnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXSkgJiYgcGF5bG9hZFsnZW5jb3VudGVyUHJvdmlkZXJzJ10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFByb3ZpZGVyOiBhbnkgPSBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXVswXS5wcm92aWRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0UHJvdmlkZXIgJiYgZmlyc3RQcm92aWRlci51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1Zlcnkgd2VpcmQgd29yayBhcm91bmQgZm9yIGFuIGlzc3VlIHdpdGggc2V0dGluZyB0aGUgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGZpcnN0UHJvdmlkZXIudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFsnbG9jYXRpb24nXSAmJiBwYXlsb2FkWydsb2NhdGlvbiddLnV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHBheWxvYWRbJ2xvY2F0aW9uJ10udXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gcGF5bG9hZFsnbG9jYXRpb24nXS51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE5vbkZpbGxlZFBheWxvYWRNZW1iZXJzKGZvcm0sIHBheWxvYWQpO1xyXG5cclxuICAgICAgICBwYXlsb2FkWydvYnMnXSA9IHRoaXMub2JzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xyXG5cclxuICAgICAgICBwYXlsb2FkWydvcmRlcnMnXSA9IHRoaXMub3JkZXJzQWRhcHRlci5nZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm0pIHx8IFtdO1xyXG5cclxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSk7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHt9O1xyXG5cclxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBtb21lbnQobm9kZS5jb250cm9sLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnV0Y09mZnNldChyb290Tm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udXRjT2Zmc2V0IHx8ICcrMDMwMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddID0gZGF0ZVZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgJiYgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IG5vZGUuY29udHJvbC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvdW50ZXJSb2xlOiAnYTBiMDMwNTAtYzk5Yi0xMWUwLTk1NzItMDgwMDIwMGM5YTY2JyAvLyB1bmtub3duIHByb3ZpZGVyIHJvbGUgaW4gdGhlIGVuY291bnRlciBhcyBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddID0gcHJvdmlkZXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsnbG9jYXRpb24nXSA9IG5vZGUuY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlKTogQXJyYXk8Tm9kZUJhc2U+IHtcclxuICAgICAgICBjb25zdCByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4gPSBbXTtcclxuICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZSwgcmVzdWx0cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9uRmlsbGVkUGF5bG9hZE1lbWJlcnMoZm9ybTogRm9ybSwgcGF5bG9hZCkge1xyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucGF0aWVudFV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkUGF0aWVudFV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnBhdGllbnRVdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVHlwZVV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmVuY291bnRlclR5cGVVdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZm9ybVV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYXlsb2FkRm9ybVV1aWQocGF5bG9hZCwgZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmZvcm1VdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVXVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJVdWlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5bG9hZFBhdGllbnRVdWlkKHBheWxvYWQsIHBhdGllbnRVdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBwYXlsb2FkWydwYXRpZW50J10gPSBwYXRpZW50VXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXlsb2FkVmlzaXRVdWlkKHBheWxvYWQsIHZpc2l0VXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsndmlzaXQnXSA9IHZpc2l0VXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZW5jb3VudGVyVHlwZVV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIHBheWxvYWRbJ2VuY291bnRlclR5cGUnXSA9IGVuY291bnRlclR5cGVVdWlkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBheWxvYWRGb3JtVXVpZChwYXlsb2FkLCBmb3JtVXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsnZm9ybSddID0gZm9ybVV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5bG9hZEVuY291bnRlclV1aWQocGF5bG9hZCwgZW5jb3VudGVyVXVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcGF5bG9hZFsndXVpZCddID0gZW5jb3VudGVyVXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UsIGFycmF5OiBBcnJheTxOb2RlQmFzZT4pIHtcclxuICAgICAgICBpZiAodGhpcy5faXNFbmNvdW50ZXJOb2RlKHJvb3ROb2RlKSkge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKHJvb3ROb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuW29dIGluc3RhbmNlb2YgTm9kZUJhc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRFbmNvdW50ZXJOb2Rlcyhub2RlLmNoaWxkcmVuW29dLCBhcnJheSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMoY2hpbGQsIGFycmF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzRW5jb3VudGVyTm9kZShub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxyXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckRhdGV0aW1lJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlclByb3ZpZGVyJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckxvY2F0aW9uJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=