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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUI7SUFBQTtRQUVJLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ1osYUFBUSxHQUFHLEVBQUUsQ0FBQztJQTBNMUIsQ0FBQzs7Ozs7SUF4TUcsK0NBQW1COzs7O0lBQW5CLFVBQW9CLElBQVU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUVELHdDQUFZOzs7OztJQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFDMUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7OztJQUVPLDZDQUFpQjs7Ozs7SUFBekIsVUFBMEIsSUFBVTtR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QUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7NENBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3Q0FDdEQsQ0FBQztvQ0FDTCxDQUFDO2dDQUVMLENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWO2dDQUNJLEtBQUssQ0FBQzt3QkFFZCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDO0lBQ0wsQ0FBQzs7Z0JBM01KLFVBQVU7O0lBNk1YLHdCQUFDO0NBQUEsQUE3TUQsSUE2TUM7U0E1TVksaUJBQWlCOzs7SUFDMUIsMkNBQW9COzs7OztJQUNwQixxQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclZhbHVlQWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG4gICAgZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICBwcml2YXRlIHByb3ZpZGVyID0gJyc7XG5cbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLl9zZXRPcmRlclByb3ZpZGVyKGZvcm0pO1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU9yZGVyc1BheWxvYWQodGhpcy5mb3JtT3JkZXJOb2RlcywgZm9ybSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgZm9ybS5leGlzdGluZ09yZGVycyA9IHBheWxvYWQ7XG4gICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XG4gICAgICAgIHRoaXMuX3NldE9yZGVyVmFsdWVzKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlclByb3ZpZGVyKGZvcm06IEZvcm0pIHtcbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIgPSBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3JlYXRlT3JkZXJzUGF5bG9hZChvcmRlck5vZGVzLCBmb3JtOiBGb3JtKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlcnMgPSBbXTtcbiAgICAgICAgbGV0IGRlbGV0ZWRPcmRlcnMgPSBbXTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xuICAgICAgICAgICAgY29uc3Qgb3JkZXJOb2RlVmFsdWVzID0gb3JkZXJOb2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBvcmRlcnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycykge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nT3JkZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyc1tvYmouY29uY2VwdF0gPSBvYmouY29uY2VwdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIG9yZGVyTm9kZVZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmIChvcmRlck5vZGVWYWx1ZXMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JkZXJWYWx1ZSA9IG9yZGVyTm9kZVZhbHVlc1tvcmRlcl1bb3JkZXJOb2RlLnF1ZXN0aW9uLmtleV07XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZE9yZGVyID0gdGhpcy5fY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyVmFsdWUsIG9yZGVyTm9kZS5xdWVzdGlvbi5leHRyYXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcnNbb3JkZXJWYWx1ZV0gIT09IG9yZGVyVmFsdWUgJiYgcGF5bG9hZE9yZGVyLmNvbmNlcHQgIT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChwYXlsb2FkT3JkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3JkZXJzW29yZGVyVmFsdWVdID0gb3JkZXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRPcmRlci5vcmRlck51bWJlciA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRPcmRlci51dWlkID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWRPcmRlci51dWlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGVkT3JkZXJzID0gdGhpcy5fZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEV4aXN0aW5nT3JkZXJzKGZvcm06IEZvcm0pIHtcbiAgICAgICAgaWYgKGZvcm0uZXhpc3RpbmdPcmRlcnMgJiYgZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMpIHtcbiAgICAgICAgICAgIGxldCBleGlzdGluZ09yZGVycyA9IGZvcm0uZXhpc3RpbmdPcmRlcnMub3JkZXJzLm1hcCgobykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG8uY29uY2VwdC51dWlkLFxuICAgICAgICAgICAgICAgICAgICBvcmRlck51bWJlcjogby5vcmRlck51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJVdWlkOiBvLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogby52b2lkZWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVWb2lkZWQ6IG8uYXVkaXRJbmZvLmRhdGVWb2lkZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZ09yZGVycyA9IF8uZmlsdGVyKGV4aXN0aW5nT3JkZXJzLCAob3JkZXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcmRlci52b2lkZWQgPT09IHRydWUgfHwgb3JkZXIuZGF0ZVZvaWRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyVmFsdWVzKG5vZGUsIGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKG5vZGUpO1xuXG4gICAgICAgIGNvbnN0IG9yZGVyTm9kZXMgPSB0aGlzLmZvcm1PcmRlck5vZGVzO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRPcmRlck5vZGVWYWx1ZXMob3JkZXJOb2RlLCBleGlzdGluZ09yZGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpOiBhbnkge1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGRlbGV0ZWRPcmRlcnMpIHtcbiAgICAgICAgICAgIGlmIChkZWxldGVkT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7IHV1aWQ6IGRlbGV0ZWRPcmRlcnNbb3JkZXJdLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyQ29uY2VwdCwgcXVlc2l0b25FeHRyYXMpOiBhbnkge1xuICAgICAgICBjb25zdCBvcmRlciA9IHtcbiAgICAgICAgICAgIGNvbmNlcHQ6ICcnLFxuICAgICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgICBvcmRlcmVyOiAnJyxcbiAgICAgICAgICAgIGNhcmVTZXR0aW5nOiAnJ1xuICAgICAgICB9O1xuICAgICAgICBvcmRlci5jb25jZXB0ID0gb3JkZXJDb25jZXB0O1xuICAgICAgICBvcmRlci50eXBlID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyVHlwZTtcbiAgICAgICAgb3JkZXIub3JkZXJlciA9IHRoaXMucHJvdmlkZXI7XG4gICAgICAgIG9yZGVyLmNhcmVTZXR0aW5nID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyU2V0dGluZ1V1aWQ7XG5cbiAgICAgICAgLy8gZGVsZXRlIG9yZGVyZXIgaWYgcHJvdmlkZXIgbm90IHByb3ZpZGVkXG4gICAgICAgIGlmIChvcmRlci5vcmRlcmVyID09PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIG9yZGVyLm9yZGVyZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpOiBhbnkge1xuICAgICAgICBjb25zdCBkZWxldGVPcmRlcnMgPSBbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ09yZGVyQ29uY2VwdCA9IGV4aXN0aW5nT3JkZXJzW29yZGVyXS5jb25jZXB0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVyID0gc2VsZWN0ZWRPcmRlcnNbZXhpc3RpbmdPcmRlckNvbmNlcHRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlciAhPT0gZXhpc3RpbmdPcmRlckNvbmNlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9yZGVycy5wdXNoKGV4aXN0aW5nT3JkZXJzW29yZGVyXS5vcmRlclV1aWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdEZWxldGVkIE9yZGVycyAnLCBkZWxldGVPcmRlcnMpO1xuICAgICAgICByZXR1cm4gZGVsZXRlT3JkZXJzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyTm9kZVZhbHVlcyhub2RlLCBvcmRlcnMpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBvcmRlcnM7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgb2Ygb3JkZXJzKSB7XG4gICAgICAgICAgICBub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICAgICAgICAgIHZhbHVlW25vZGUucXVlc3Rpb24ua2V5XSA9IG9yZGVyLmNvbmNlcHQ7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIGNoaWxkTm9kZVsnaW5pdGlhbFZhbHVlJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNoaWxkTm9kZVsnb3JkZXJOdW1iZXInXSA9IG9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NldCBWYWx1ZScsIG5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbnRyb2wudmFsdWUsIG5vZGUsIGNoaWxkTm9kZSk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUpIHtcblxuICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVzdGlvbiA9IGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5leHRyYXMgJiYgcXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICd0ZXN0T3JkZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMucHVzaChmb3JtTm9kZS5jaGlsZHJlbltub2RlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=