/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                existingOrders.map((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) {
                    orders[obj.concept] = obj.concept;
                }));
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
        var e_1, _a;
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
            var existingOrders = form.existingOrders.orders.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            }));
            return existingOrders = _.filter(existingOrders, (/**
             * @param {?} order
             * @return {?}
             */
            function (order) {
                if (order.voided === true || order.dateVoided) {
                    return false;
                }
                else {
                    return true;
                }
            }));
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
        var e_2, _a;
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
        var e_3, _a;
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
        { type: Injectable },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUI7SUFBQTtRQUVJLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ1osYUFBUSxHQUFHLEVBQUUsQ0FBQztJQTBNMUIsQ0FBQzs7Ozs7SUF4TUcsK0NBQW1COzs7O0lBQW5CLFVBQW9CLElBQVU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUVELHdDQUFZOzs7OztJQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFDMUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7OztJQUVPLDZDQUFpQjs7Ozs7SUFBekIsVUFBMEIsSUFBVTtR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QUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDOzRDQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0NBQ3RELENBQUM7b0NBQ0wsQ0FBQztnQ0FFTCxDQUFDO2dDQUNELEtBQUssQ0FBQzs0QkFDVjtnQ0FDSSxLQUFLLENBQUM7d0JBRWQsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7O2dCQTNNSixVQUFVOztJQTZNWCx3QkFBQztDQUFBLEFBN01ELElBNk1DO1NBNU1ZLGlCQUFpQjs7O0lBQzFCLDJDQUFvQjs7Ozs7SUFDcEIscUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJWYWx1ZUFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuICAgIGZvcm1PcmRlck5vZGVzID0gW107XG4gICAgcHJpdmF0ZSBwcm92aWRlciA9ICcnO1xuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJQcm92aWRlcihmb3JtKTtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVPcmRlcnNQYXlsb2FkKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGZvcm0pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIGZvcm0uZXhpc3RpbmdPcmRlcnMgPSBwYXlsb2FkO1xuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgICAgICB0aGlzLl9zZXRPcmRlclZhbHVlcyh0aGlzLmZvcm1PcmRlck5vZGVzLCBleGlzdGluZ09yZGVycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJQcm92aWRlcihmb3JtOiBGb3JtKSB7XG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZU9yZGVyc1BheWxvYWQob3JkZXJOb2RlcywgZm9ybTogRm9ybSkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXJzID0gW107XG4gICAgICAgIGxldCBkZWxldGVkT3JkZXJzID0gW107XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyTm9kZVZhbHVlcyA9IG9yZGVyTm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgY29uc3Qgb3JkZXJzID0gW107XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ09yZGVycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvcmRlcnNbb2JqLmNvbmNlcHRdID0gb2JqLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBvcmRlck5vZGVWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXJOb2RlVmFsdWVzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyVmFsdWUgPSBvcmRlck5vZGVWYWx1ZXNbb3JkZXJdW29yZGVyTm9kZS5xdWVzdGlvbi5rZXldO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRPcmRlciA9IHRoaXMuX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlclZhbHVlLCBvcmRlck5vZGUucXVlc3Rpb24uZXh0cmFzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJzW29yZGVyVmFsdWVdICE9PSBvcmRlclZhbHVlICYmIHBheWxvYWRPcmRlci5jb25jZXB0ICE9PSAnJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2gocGF5bG9hZE9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9yZGVyc1tvcmRlclZhbHVlXSA9IG9yZGVyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXIgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIudXVpZCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlZE9yZGVycyA9IHRoaXMuX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRFeGlzdGluZ09yZGVycyhmb3JtOiBGb3JtKSB7XG4gICAgICAgIGlmIChmb3JtLmV4aXN0aW5nT3JkZXJzICYmIGZvcm0uZXhpc3RpbmdPcmRlcnMub3JkZXJzKSB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdPcmRlcnMgPSBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycy5tYXAoKG8pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBvLmNvbmNlcHQudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJOdW1iZXI6IG8ub3JkZXJOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVXVpZDogby51dWlkLFxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IG8udm9pZGVkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVm9pZGVkOiBvLmF1ZGl0SW5mby5kYXRlVm9pZGVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdPcmRlcnMgPSBfLmZpbHRlcihleGlzdGluZ09yZGVycywgKG9yZGVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIudm9pZGVkID09PSB0cnVlIHx8IG9yZGVyLmRhdGVWb2lkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlclZhbHVlcyhub2RlLCBleGlzdGluZ09yZGVycykge1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhub2RlKTtcblxuICAgICAgICBjb25zdCBvcmRlck5vZGVzID0gdGhpcy5mb3JtT3JkZXJOb2RlcztcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5fc2V0T3JkZXJOb2RlVmFsdWVzKG9yZGVyTm9kZSwgZXhpc3RpbmdPcmRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTogYW55IHtcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBkZWxldGVkT3JkZXJzKSB7XG4gICAgICAgICAgICBpZiAoZGVsZXRlZE9yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goeyB1dWlkOiBkZWxldGVkT3JkZXJzW29yZGVyXSwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlckNvbmNlcHQsIHF1ZXNpdG9uRXh0cmFzKTogYW55IHtcbiAgICAgICAgY29uc3Qgb3JkZXIgPSB7XG4gICAgICAgICAgICBjb25jZXB0OiAnJyxcbiAgICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgICAgb3JkZXJlcjogJycsXG4gICAgICAgICAgICBjYXJlU2V0dGluZzogJydcbiAgICAgICAgfTtcbiAgICAgICAgb3JkZXIuY29uY2VwdCA9IG9yZGVyQ29uY2VwdDtcbiAgICAgICAgb3JkZXIudHlwZSA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclR5cGU7XG4gICAgICAgIG9yZGVyLm9yZGVyZXIgPSB0aGlzLnByb3ZpZGVyO1xuICAgICAgICBvcmRlci5jYXJlU2V0dGluZyA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBvcmRlcmVyIGlmIHByb3ZpZGVyIG5vdCBwcm92aWRlZFxuICAgICAgICBpZiAob3JkZXIub3JkZXJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcmRlci5vcmRlcmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTogYW55IHtcbiAgICAgICAgY29uc3QgZGVsZXRlT3JkZXJzID0gW107XG4gICAgICAgIGlmIChzZWxlY3RlZE9yZGVycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBleGlzdGluZ09yZGVycykge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlckNvbmNlcHQgPSBleGlzdGluZ09yZGVyc1tvcmRlcl0uY29uY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlciA9IHNlbGVjdGVkT3JkZXJzW2V4aXN0aW5nT3JkZXJDb25jZXB0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXIgIT09IGV4aXN0aW5nT3JkZXJDb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmRlcnMucHVzaChleGlzdGluZ09yZGVyc1tvcmRlcl0ub3JkZXJVdWlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRGVsZXRlZCBPcmRlcnMgJywgZGVsZXRlT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU9yZGVycztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlck5vZGVWYWx1ZXMobm9kZSwgb3JkZXJzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gb3JkZXJzO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgICAgICAgICAgbm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgICAgICAgICB2YWx1ZVtub2RlLnF1ZXN0aW9uLmtleV0gPSBvcmRlci5jb25jZXB0O1xuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICBjaGlsZE5vZGUuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ2luaXRpYWxWYWx1ZSddID0gdmFsdWU7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ29yZGVyTnVtYmVyJ10gPSBvcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZXQgVmFsdWUnLCBub2RlLmNoaWxkcmVuW2luZGV4XS5jb250cm9sLnZhbHVlLCBub2RlLCBjaGlsZE5vZGUpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtTm9kZS5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBmb3JtTm9kZS5jaGlsZHJlbltub2RlXS5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24uZXh0cmFzICYmIHF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAndGVzdE9yZGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzLnB1c2goZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19