/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var OrderValueAdapter = /** @class */ (function () {
    function OrderValueAdapter() {
        this.formOrderNodes = [];
        this.provider = '';
    }
    /**
     * @param {?} form
     * @return {?}
     */
    OrderValueAdapter.prototype.generateFormPayload = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes, form);
    };
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    OrderValueAdapter.prototype.populateForm = /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    function (form, payload) {
        form.existingOrders = payload;
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        /** @type {?} */
        var existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    };
    /**
     * @private
     * @param {?} form
     * @return {?}
     */
    OrderValueAdapter.prototype._setOrderProvider = /**
     * @private
     * @param {?} form
     * @return {?}
     */
    function (form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    };
    /**
     * @private
     * @param {?} orderNodes
     * @param {?} form
     * @return {?}
     */
    OrderValueAdapter.prototype._createOrdersPayload = /**
     * @private
     * @param {?} orderNodes
     * @param {?} form
     * @return {?}
     */
    function (orderNodes, form) {
        var e_1, _a;
        /** @type {?} */
        var payload = [];
        /** @type {?} */
        var selectedOrders = [];
        /** @type {?} */
        var deletedOrders = [];
        /** @type {?} */
        var existingOrders = this._getExistingOrders(form);
        var _loop_1 = function (orderNode) {
            /** @type {?} */
            var orderNodeValues = orderNode.control.value;
            /** @type {?} */
            var orders = [];
            if (existingOrders) {
                existingOrders.map(function (obj) {
                    orders[obj.concept] = obj.concept;
                });
            }
            for (var order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {
                    /** @type {?} */
                    var orderValue = orderNodeValues[order][orderNode.question.key];
                    /** @type {?} */
                    var payloadOrder = this_1._createPayloadOrder(orderValue, orderNode.question.extras);
                    if (orders[orderValue] !== orderValue && payloadOrder.concept !== '') {
                        payload.push(payloadOrder);
                    }
                    selectedOrders[orderValue] = orderValue;
                    if (payloadOrder.orderNumber === '') {
                        delete payloadOrder.orderNumber;
                    }
                    if (payloadOrder.uuid === '') {
                        delete payloadOrder.uuid;
                    }
                }
            }
        };
        var this_1 = this;
        try {
            for (var orderNodes_1 = tslib_1.__values(orderNodes), orderNodes_1_1 = orderNodes_1.next(); !orderNodes_1_1.done; orderNodes_1_1 = orderNodes_1.next()) {
                var orderNode = orderNodes_1_1.value;
                _loop_1(orderNode);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (orderNodes_1_1 && !orderNodes_1_1.done && (_a = orderNodes_1.return)) _a.call(orderNodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        deletedOrders = this._getDeletedOrders(selectedOrders, existingOrders);
        return this._addDeletedOrdersToPayload(deletedOrders, payload);
    };
    /**
     * @private
     * @param {?} form
     * @return {?}
     */
    OrderValueAdapter.prototype._getExistingOrders = /**
     * @private
     * @param {?} form
     * @return {?}
     */
    function (form) {
        if (form.existingOrders && form.existingOrders.orders) {
            /** @type {?} */
            var existingOrders = form.existingOrders.orders.map(function (o) {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            });
            return existingOrders = _.filter(existingOrders, function (order) {
                if (order.voided === true || order.dateVoided) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
        else {
            return;
        }
    };
    /**
     * @private
     * @param {?} node
     * @param {?} existingOrders
     * @return {?}
     */
    OrderValueAdapter.prototype._setOrderValues = /**
     * @private
     * @param {?} node
     * @param {?} existingOrders
     * @return {?}
     */
    function (node, existingOrders) {
        var e_2, _a;
        this._findTestOrderQuestionNodes(node);
        /** @type {?} */
        var orderNodes = this.formOrderNodes;
        try {
            for (var orderNodes_2 = tslib_1.__values(orderNodes), orderNodes_2_1 = orderNodes_2.next(); !orderNodes_2_1.done; orderNodes_2_1 = orderNodes_2.next()) {
                var orderNode = orderNodes_2_1.value;
                this._setOrderNodeValues(orderNode, existingOrders);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (orderNodes_2_1 && !orderNodes_2_1.done && (_a = orderNodes_2.return)) _a.call(orderNodes_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * @private
     * @param {?} deletedOrders
     * @param {?} payload
     * @return {?}
     */
    OrderValueAdapter.prototype._addDeletedOrdersToPayload = /**
     * @private
     * @param {?} deletedOrders
     * @param {?} payload
     * @return {?}
     */
    function (deletedOrders, payload) {
        for (var order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    };
    /**
     * @private
     * @param {?} orderConcept
     * @param {?} quesitonExtras
     * @return {?}
     */
    OrderValueAdapter.prototype._createPayloadOrder = /**
     * @private
     * @param {?} orderConcept
     * @param {?} quesitonExtras
     * @return {?}
     */
    function (orderConcept, quesitonExtras) {
        /** @type {?} */
        var order = {
            concept: '',
            type: '',
            orderer: '',
            careSetting: ''
        };
        order.concept = orderConcept;
        order.type = quesitonExtras.questionOptions.orderType;
        order.orderer = this.provider;
        order.careSetting = quesitonExtras.questionOptions.orderSettingUuid;
        // delete orderer if provider not provided
        if (order.orderer === '') {
            delete order.orderer;
        }
        return order;
    };
    /**
     * @private
     * @param {?} selectedOrders
     * @param {?} existingOrders
     * @return {?}
     */
    OrderValueAdapter.prototype._getDeletedOrders = /**
     * @private
     * @param {?} selectedOrders
     * @param {?} existingOrders
     * @return {?}
     */
    function (selectedOrders, existingOrders) {
        /** @type {?} */
        var deleteOrders = [];
        if (selectedOrders) {
            for (var order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    /** @type {?} */
                    var existingOrderConcept = existingOrders[order].concept;
                    /** @type {?} */
                    var selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(existingOrders[order].orderUuid);
                    }
                }
            }
        }
        // console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    };
    /**
     * @private
     * @param {?} node
     * @param {?} orders
     * @return {?}
     */
    OrderValueAdapter.prototype._setOrderNodeValues = /**
     * @private
     * @param {?} node
     * @param {?} orders
     * @return {?}
     */
    function (node, orders) {
        var e_3, _a;
        /** @type {?} */
        var index = 0;
        node['initialValue'] = orders;
        try {
            for (var orders_1 = tslib_1.__values(orders), orders_1_1 = orders_1.next(); !orders_1_1.done; orders_1_1 = orders_1.next()) {
                var order = orders_1_1.value;
                node.createChildNode();
                /** @type {?} */
                var value = {};
                value[node.question.key] = order.concept;
                /** @type {?} */
                var childNode = node.children[index];
                childNode.control.setValue(value);
                childNode['initialValue'] = value;
                childNode['orderNumber'] = order.orderNumber;
                // console.log('Set Value', node.children[index].control.value, node, childNode);
                index++;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (orders_1_1 && !orders_1_1.done && (_a = orders_1.return)) _a.call(orders_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @private
     * @param {?} formNode
     * @return {?}
     */
    OrderValueAdapter.prototype._findTestOrderQuestionNodes = /**
     * @private
     * @param {?} formNode
     * @return {?}
     */
    function (formNode) {
        if (formNode.children) {
            if (formNode.children instanceof Object) {
                for (var key in formNode.children) {
                    if (formNode.children.hasOwnProperty(key)) {
                        switch (formNode.children[key].question.renderingType) {
                            case 'page':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'section':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'group':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'repeating':
                                if (formNode.children) {
                                    // tslint:disable-next-line:forin
                                    for (var node in formNode.children) {
                                        /** @type {?} */
                                        var question = formNode.children[node].question;
                                        if (question.extras && question.extras.type === 'testOrder') {
                                            this.formOrderNodes.push(formNode.children[node]);
                                        }
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    };
    OrderValueAdapter.decorators = [
        { type: Injectable }
    ];
    return OrderValueAdapter;
}());
export { OrderValueAdapter };
if (false) {
    /** @type {?} */
    OrderValueAdapter.prototype.formOrderNodes;
    /**
     * @type {?}
     * @private
     */
    OrderValueAdapter.prototype.provider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUI7SUFBQTtRQUVJLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ1osYUFBUSxHQUFHLEVBQUUsQ0FBQztJQTBNMUIsQ0FBQzs7Ozs7SUF4TUcsK0NBQW1COzs7O0lBQW5CLFVBQW9CLElBQVU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7SUFFRCx3Q0FBWTs7Ozs7SUFBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBQzFDLGNBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFFTyw2Q0FBaUI7Ozs7O0lBQXpCLFVBQTBCLElBQVU7UUFDaEMs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Q0FBQztnQ0FFekQsTUFBTTs0QkFDVixLQUFLLFdBQVc7Z0NBQ1osSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO29DQUNuQixpQ0FBaUM7b0NBQ2pDLEtBQUssSUFBTSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTs7NENBQzVCLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVE7d0NBQ2pELElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7NENBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5Q0FDckQ7cUNBQ0o7aUNBRUo7Z0NBQ0QsTUFBTTs0QkFDVjtnQ0FDSSxNQUFNO3lCQUViO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjtJQUNMLENBQUM7O2dCQTNNSixVQUFVOztJQTZNWCx3QkFBQztDQUFBLEFBN01ELElBNk1DO1NBNU1ZLGlCQUFpQjs7O0lBQzFCLDJDQUFvQjs7Ozs7SUFDcEIscUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJWYWx1ZUFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuICAgIGZvcm1PcmRlck5vZGVzID0gW107XG4gICAgcHJpdmF0ZSBwcm92aWRlciA9ICcnO1xuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJQcm92aWRlcihmb3JtKTtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVPcmRlcnNQYXlsb2FkKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGZvcm0pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIGZvcm0uZXhpc3RpbmdPcmRlcnMgPSBwYXlsb2FkO1xuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgICAgICB0aGlzLl9zZXRPcmRlclZhbHVlcyh0aGlzLmZvcm1PcmRlck5vZGVzLCBleGlzdGluZ09yZGVycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJQcm92aWRlcihmb3JtOiBGb3JtKSB7XG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZU9yZGVyc1BheWxvYWQob3JkZXJOb2RlcywgZm9ybTogRm9ybSkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXJzID0gW107XG4gICAgICAgIGxldCBkZWxldGVkT3JkZXJzID0gW107XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyTm9kZVZhbHVlcyA9IG9yZGVyTm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgY29uc3Qgb3JkZXJzID0gW107XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ09yZGVycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvcmRlcnNbb2JqLmNvbmNlcHRdID0gb2JqLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBvcmRlck5vZGVWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXJOb2RlVmFsdWVzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyVmFsdWUgPSBvcmRlck5vZGVWYWx1ZXNbb3JkZXJdW29yZGVyTm9kZS5xdWVzdGlvbi5rZXldO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRPcmRlciA9IHRoaXMuX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlclZhbHVlLCBvcmRlck5vZGUucXVlc3Rpb24uZXh0cmFzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJzW29yZGVyVmFsdWVdICE9PSBvcmRlclZhbHVlICYmIHBheWxvYWRPcmRlci5jb25jZXB0ICE9PSAnJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2gocGF5bG9hZE9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9yZGVyc1tvcmRlclZhbHVlXSA9IG9yZGVyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXIgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIudXVpZCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlZE9yZGVycyA9IHRoaXMuX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRFeGlzdGluZ09yZGVycyhmb3JtOiBGb3JtKSB7XG4gICAgICAgIGlmIChmb3JtLmV4aXN0aW5nT3JkZXJzICYmIGZvcm0uZXhpc3RpbmdPcmRlcnMub3JkZXJzKSB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdPcmRlcnMgPSBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycy5tYXAoKG8pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBvLmNvbmNlcHQudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJOdW1iZXI6IG8ub3JkZXJOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVXVpZDogby51dWlkLFxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IG8udm9pZGVkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVm9pZGVkOiBvLmF1ZGl0SW5mby5kYXRlVm9pZGVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdPcmRlcnMgPSBfLmZpbHRlcihleGlzdGluZ09yZGVycywgKG9yZGVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIudm9pZGVkID09PSB0cnVlIHx8IG9yZGVyLmRhdGVWb2lkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlclZhbHVlcyhub2RlLCBleGlzdGluZ09yZGVycykge1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhub2RlKTtcblxuICAgICAgICBjb25zdCBvcmRlck5vZGVzID0gdGhpcy5mb3JtT3JkZXJOb2RlcztcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5fc2V0T3JkZXJOb2RlVmFsdWVzKG9yZGVyTm9kZSwgZXhpc3RpbmdPcmRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTogYW55IHtcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBkZWxldGVkT3JkZXJzKSB7XG4gICAgICAgICAgICBpZiAoZGVsZXRlZE9yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goeyB1dWlkOiBkZWxldGVkT3JkZXJzW29yZGVyXSwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlckNvbmNlcHQsIHF1ZXNpdG9uRXh0cmFzKTogYW55IHtcbiAgICAgICAgY29uc3Qgb3JkZXIgPSB7XG4gICAgICAgICAgICBjb25jZXB0OiAnJyxcbiAgICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgICAgb3JkZXJlcjogJycsXG4gICAgICAgICAgICBjYXJlU2V0dGluZzogJydcbiAgICAgICAgfTtcbiAgICAgICAgb3JkZXIuY29uY2VwdCA9IG9yZGVyQ29uY2VwdDtcbiAgICAgICAgb3JkZXIudHlwZSA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclR5cGU7XG4gICAgICAgIG9yZGVyLm9yZGVyZXIgPSB0aGlzLnByb3ZpZGVyO1xuICAgICAgICBvcmRlci5jYXJlU2V0dGluZyA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBvcmRlcmVyIGlmIHByb3ZpZGVyIG5vdCBwcm92aWRlZFxuICAgICAgICBpZiAob3JkZXIub3JkZXJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcmRlci5vcmRlcmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTogYW55IHtcbiAgICAgICAgY29uc3QgZGVsZXRlT3JkZXJzID0gW107XG4gICAgICAgIGlmIChzZWxlY3RlZE9yZGVycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBleGlzdGluZ09yZGVycykge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlckNvbmNlcHQgPSBleGlzdGluZ09yZGVyc1tvcmRlcl0uY29uY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlciA9IHNlbGVjdGVkT3JkZXJzW2V4aXN0aW5nT3JkZXJDb25jZXB0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXIgIT09IGV4aXN0aW5nT3JkZXJDb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmRlcnMucHVzaChleGlzdGluZ09yZGVyc1tvcmRlcl0ub3JkZXJVdWlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRGVsZXRlZCBPcmRlcnMgJywgZGVsZXRlT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU9yZGVycztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlck5vZGVWYWx1ZXMobm9kZSwgb3JkZXJzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gb3JkZXJzO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgICAgICAgICAgbm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgICAgICAgICB2YWx1ZVtub2RlLnF1ZXN0aW9uLmtleV0gPSBvcmRlci5jb25jZXB0O1xuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICBjaGlsZE5vZGUuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ2luaXRpYWxWYWx1ZSddID0gdmFsdWU7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ29yZGVyTnVtYmVyJ10gPSBvcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZXQgVmFsdWUnLCBub2RlLmNoaWxkcmVuW2luZGV4XS5jb250cm9sLnZhbHVlLCBub2RlLCBjaGlsZE5vZGUpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtTm9kZS5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBmb3JtTm9kZS5jaGlsZHJlbltub2RlXS5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24uZXh0cmFzICYmIHF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAndGVzdE9yZGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzLnB1c2goZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19