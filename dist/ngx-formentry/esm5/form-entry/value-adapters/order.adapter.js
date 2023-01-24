import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var OrderValueAdapter = /** @class */ (function () {
    function OrderValueAdapter() {
        this.formOrderNodes = [];
        this.provider = '';
    }
    OrderValueAdapter.prototype.generateFormPayload = function (form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes, form);
    };
    OrderValueAdapter.prototype.populateForm = function (form, payload) {
        form.existingOrders = payload;
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        var existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    };
    OrderValueAdapter.prototype._setOrderProvider = function (form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    };
    OrderValueAdapter.prototype._createOrdersPayload = function (orderNodes, form) {
        var payload = [];
        var selectedOrders = [];
        var deletedOrders = [];
        var existingOrders = this._getExistingOrders(form);
        var _loop_1 = function (orderNode) {
            var orderNodeValues = orderNode.control.value;
            var orders = [];
            if (existingOrders) {
                existingOrders.map(function (obj) {
                    orders[obj.concept] = obj.concept;
                });
            }
            for (var order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {
                    var orderValue = orderNodeValues[order][orderNode.question.key];
                    var payloadOrder = this_1._createPayloadOrder(orderValue, orderNode.question.extras);
                    if (orders[orderValue] !== orderValue &&
                        payloadOrder.concept !== '') {
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
    OrderValueAdapter.prototype._getExistingOrders = function (form) {
        if (form.existingOrders && form.existingOrders.orders) {
            var existingOrders = form.existingOrders.orders.map(function (o) {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            });
            return (existingOrders = _.filter(existingOrders, function (order) {
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
    OrderValueAdapter.prototype._setOrderValues = function (node, existingOrders) {
        this._findTestOrderQuestionNodes(node);
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
    OrderValueAdapter.prototype._addDeletedOrdersToPayload = function (deletedOrders, payload) {
        for (var order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    };
    OrderValueAdapter.prototype._createPayloadOrder = function (orderConcept, quesitonExtras) {
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
    OrderValueAdapter.prototype._getDeletedOrders = function (selectedOrders, existingOrders) {
        var deleteOrders = [];
        if (selectedOrders) {
            for (var order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    var existingOrderConcept = existingOrders[order].concept;
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
    OrderValueAdapter.prototype._setOrderNodeValues = function (node, orders) {
        var index = 0;
        node['initialValue'] = orders;
        try {
            for (var orders_1 = tslib_1.__values(orders), orders_1_1 = orders_1.next(); !orders_1_1.done; orders_1_1 = orders_1.next()) {
                var order = orders_1_1.value;
                node.createChildNode();
                var value = {};
                value[node.question.key] = order.concept;
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
    OrderValueAdapter.prototype._findTestOrderQuestionNodes = function (formNode) {
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
                                        var question = formNode.children[node].question;
                                        if (question.extras &&
                                            question.extras.type === 'testOrder') {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vcmRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCO0lBQUE7UUFFRSxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7SUF3TXhCLENBQUM7SUF0TUMsK0NBQW1CLEdBQW5CLFVBQW9CLElBQVU7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyw2Q0FBaUIsR0FBekIsVUFBMEIsSUFBVTtRQUNsQyxF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QUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO3dDQUNsRCxFQUFFLENBQUMsQ0FDRCxRQUFRLENBQUMsTUFBTTs0Q0FDZixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUMzQixDQUFDLENBQUMsQ0FBQzs0Q0FDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0NBQ3BELENBQUM7b0NBQ0gsQ0FBQztnQ0FDSCxDQUFDO2dDQUNELEtBQUssQ0FBQzs0QkFDUjtnQ0FDRSxLQUFLLENBQUM7d0JBQ1YsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7O2dCQTFNRixVQUFVOztJQTJNWCx3QkFBQztDQUFBLEFBM01ELElBMk1DO1NBMU1ZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZGVyVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgcHJpdmF0ZSBwcm92aWRlciA9ICcnO1xuXG4gIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICB0aGlzLl9zZXRPcmRlclByb3ZpZGVyKGZvcm0pO1xuICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVPcmRlcnNQYXlsb2FkKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGZvcm0pO1xuICB9XG5cbiAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICBmb3JtLmV4aXN0aW5nT3JkZXJzID0gcGF5bG9hZDtcbiAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XG4gICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICB0aGlzLl9zZXRPcmRlclZhbHVlcyh0aGlzLmZvcm1PcmRlck5vZGVzLCBleGlzdGluZ09yZGVycyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRPcmRlclByb3ZpZGVyKGZvcm06IEZvcm0pIHtcbiAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZCkge1xuICAgICAgdGhpcy5wcm92aWRlciA9IGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3JkZXJzUGF5bG9hZChvcmRlck5vZGVzLCBmb3JtOiBGb3JtKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFtdO1xuICAgIGNvbnN0IHNlbGVjdGVkT3JkZXJzID0gW107XG4gICAgbGV0IGRlbGV0ZWRPcmRlcnMgPSBbXTtcbiAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgIGNvbnN0IG9yZGVyTm9kZVZhbHVlcyA9IG9yZGVyTm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgY29uc3Qgb3JkZXJzID0gW107XG4gICAgICBpZiAoZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgZXhpc3RpbmdPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICBvcmRlcnNbb2JqLmNvbmNlcHRdID0gb2JqLmNvbmNlcHQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIG9yZGVyTm9kZVZhbHVlcykge1xuICAgICAgICBpZiAob3JkZXJOb2RlVmFsdWVzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICAgIGNvbnN0IG9yZGVyVmFsdWUgPSBvcmRlck5vZGVWYWx1ZXNbb3JkZXJdW29yZGVyTm9kZS5xdWVzdGlvbi5rZXldO1xuXG4gICAgICAgICAgY29uc3QgcGF5bG9hZE9yZGVyID0gdGhpcy5fY3JlYXRlUGF5bG9hZE9yZGVyKFxuICAgICAgICAgICAgb3JkZXJWYWx1ZSxcbiAgICAgICAgICAgIG9yZGVyTm9kZS5xdWVzdGlvbi5leHRyYXNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgb3JkZXJzW29yZGVyVmFsdWVdICE9PSBvcmRlclZhbHVlICYmXG4gICAgICAgICAgICBwYXlsb2FkT3JkZXIuY29uY2VwdCAhPT0gJydcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBheWxvYWQucHVzaChwYXlsb2FkT3JkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxlY3RlZE9yZGVyc1tvcmRlclZhbHVlXSA9IG9yZGVyVmFsdWU7XG4gICAgICAgICAgaWYgKHBheWxvYWRPcmRlci5vcmRlck51bWJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIudXVpZCA9PT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIudXVpZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVkT3JkZXJzID0gdGhpcy5fZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpO1xuICAgIHJldHVybiB0aGlzLl9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybTogRm9ybSkge1xuICAgIGlmIChmb3JtLmV4aXN0aW5nT3JkZXJzICYmIGZvcm0uZXhpc3RpbmdPcmRlcnMub3JkZXJzKSB7XG4gICAgICBsZXQgZXhpc3RpbmdPcmRlcnMgPSBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycy5tYXAoKG8pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb25jZXB0OiBvLmNvbmNlcHQudXVpZCxcbiAgICAgICAgICBvcmRlck51bWJlcjogby5vcmRlck51bWJlcixcbiAgICAgICAgICBvcmRlclV1aWQ6IG8udXVpZCxcbiAgICAgICAgICB2b2lkZWQ6IG8udm9pZGVkLFxuICAgICAgICAgIGRhdGVWb2lkZWQ6IG8uYXVkaXRJbmZvLmRhdGVWb2lkZWRcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKGV4aXN0aW5nT3JkZXJzID0gXy5maWx0ZXIoZXhpc3RpbmdPcmRlcnMsIChvcmRlcjogYW55KSA9PiB7XG4gICAgICAgIGlmIChvcmRlci52b2lkZWQgPT09IHRydWUgfHwgb3JkZXIuZGF0ZVZvaWRlZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0T3JkZXJWYWx1ZXMobm9kZSwgZXhpc3RpbmdPcmRlcnMpIHtcbiAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhub2RlKTtcblxuICAgIGNvbnN0IG9yZGVyTm9kZXMgPSB0aGlzLmZvcm1PcmRlck5vZGVzO1xuICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgIHRoaXMuX3NldE9yZGVyTm9kZVZhbHVlcyhvcmRlck5vZGUsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpOiBhbnkge1xuICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZGVsZXRlZE9yZGVycykge1xuICAgICAgaWYgKGRlbGV0ZWRPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgIHBheWxvYWQucHVzaCh7IHV1aWQ6IGRlbGV0ZWRPcmRlcnNbb3JkZXJdLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyQ29uY2VwdCwgcXVlc2l0b25FeHRyYXMpOiBhbnkge1xuICAgIGNvbnN0IG9yZGVyID0ge1xuICAgICAgY29uY2VwdDogJycsXG4gICAgICB0eXBlOiAnJyxcbiAgICAgIG9yZGVyZXI6ICcnLFxuICAgICAgY2FyZVNldHRpbmc6ICcnXG4gICAgfTtcbiAgICBvcmRlci5jb25jZXB0ID0gb3JkZXJDb25jZXB0O1xuICAgIG9yZGVyLnR5cGUgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJUeXBlO1xuICAgIG9yZGVyLm9yZGVyZXIgPSB0aGlzLnByb3ZpZGVyO1xuICAgIG9yZGVyLmNhcmVTZXR0aW5nID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyU2V0dGluZ1V1aWQ7XG5cbiAgICAvLyBkZWxldGUgb3JkZXJlciBpZiBwcm92aWRlciBub3QgcHJvdmlkZWRcbiAgICBpZiAob3JkZXIub3JkZXJlciA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSBvcmRlci5vcmRlcmVyO1xuICAgIH1cblxuICAgIHJldHVybiBvcmRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTogYW55IHtcbiAgICBjb25zdCBkZWxldGVPcmRlcnMgPSBbXTtcbiAgICBpZiAoc2VsZWN0ZWRPcmRlcnMpIHtcbiAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJDb25jZXB0ID0gZXhpc3RpbmdPcmRlcnNbb3JkZXJdLmNvbmNlcHQ7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlciA9IHNlbGVjdGVkT3JkZXJzW2V4aXN0aW5nT3JkZXJDb25jZXB0XTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlciAhPT0gZXhpc3RpbmdPcmRlckNvbmNlcHQpIHtcbiAgICAgICAgICAgIGRlbGV0ZU9yZGVycy5wdXNoKGV4aXN0aW5nT3JkZXJzW29yZGVyXS5vcmRlclV1aWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnRGVsZXRlZCBPcmRlcnMgJywgZGVsZXRlT3JkZXJzKTtcbiAgICByZXR1cm4gZGVsZXRlT3JkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0T3JkZXJOb2RlVmFsdWVzKG5vZGUsIG9yZGVycykge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBvcmRlcnM7XG4gICAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcbiAgICAgIG5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHt9O1xuICAgICAgdmFsdWVbbm9kZS5xdWVzdGlvbi5rZXldID0gb3JkZXIuY29uY2VwdDtcbiAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgY2hpbGROb2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgY2hpbGROb2RlWydpbml0aWFsVmFsdWUnXSA9IHZhbHVlO1xuICAgICAgY2hpbGROb2RlWydvcmRlck51bWJlciddID0gb3JkZXIub3JkZXJOdW1iZXI7XG4gICAgICAvLyBjb25zb2xlLmxvZygnU2V0IFZhbHVlJywgbm9kZS5jaGlsZHJlbltpbmRleF0uY29udHJvbC52YWx1ZSwgbm9kZSwgY2hpbGROb2RlKTtcbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUpIHtcbiAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBmb3JtTm9kZS5jaGlsZHJlbltub2RlXS5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAndGVzdE9yZGVyJ1xuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzLnB1c2goZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19