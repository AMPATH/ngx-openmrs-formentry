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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QjtJQUFBO1FBRUUsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBd014QixDQUFDO0lBdE1DLCtDQUFtQixHQUFuQixVQUFvQixJQUFVO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsd0NBQVksR0FBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU8sNkNBQWlCLEdBQXpCLFVBQTBCLElBQVU7UUFDbEMsRUFBRSxDQUFDLENBQUMs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QUFDLFFBQVEsQ0FBQzt3Q0FDbEQsRUFBRSxDQUFDLENBQ0QsUUFBUSxDQUFDLE1BQU07NENBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FDM0IsQ0FBQyxDQUFDLENBQUM7NENBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dDQUNwRCxDQUFDO29DQUNILENBQUM7Z0NBQ0gsQ0FBQztnQ0FDRCxLQUFLLENBQUM7NEJBQ1I7Z0NBQ0UsS0FBSyxDQUFDO3dCQUNWLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOztnQkExTUYsVUFBVTs7SUEyTVgsd0JBQUM7Q0FBQSxBQTNNRCxJQTJNQztTQTFNWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclZhbHVlQWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG4gIGZvcm1PcmRlck5vZGVzID0gW107XG4gIHByaXZhdGUgcHJvdmlkZXIgPSAnJztcblxuICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgdGhpcy5fc2V0T3JkZXJQcm92aWRlcihmb3JtKTtcbiAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtLnJvb3ROb2RlKTtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3JkZXJzUGF5bG9hZCh0aGlzLmZvcm1PcmRlck5vZGVzLCBmb3JtKTtcbiAgfVxuXG4gIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgZm9ybS5leGlzdGluZ09yZGVycyA9IHBheWxvYWQ7XG4gICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XG4gICAgdGhpcy5fc2V0T3JkZXJWYWx1ZXModGhpcy5mb3JtT3JkZXJOb2RlcywgZXhpc3RpbmdPcmRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0T3JkZXJQcm92aWRlcihmb3JtOiBGb3JtKSB7XG4gICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQpIHtcbiAgICAgIHRoaXMucHJvdmlkZXIgPSBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU9yZGVyc1BheWxvYWQob3JkZXJOb2RlcywgZm9ybTogRm9ybSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcbiAgICBjb25zdCBzZWxlY3RlZE9yZGVycyA9IFtdO1xuICAgIGxldCBkZWxldGVkT3JkZXJzID0gW107XG4gICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICBjb25zdCBvcmRlck5vZGVWYWx1ZXMgPSBvcmRlck5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IFtdO1xuICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgIGV4aXN0aW5nT3JkZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgb3JkZXJzW29iai5jb25jZXB0XSA9IG9iai5jb25jZXB0O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBvcmRlck5vZGVWYWx1ZXMpIHtcbiAgICAgICAgaWYgKG9yZGVyTm9kZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICBjb25zdCBvcmRlclZhbHVlID0gb3JkZXJOb2RlVmFsdWVzW29yZGVyXVtvcmRlck5vZGUucXVlc3Rpb24ua2V5XTtcblxuICAgICAgICAgIGNvbnN0IHBheWxvYWRPcmRlciA9IHRoaXMuX2NyZWF0ZVBheWxvYWRPcmRlcihcbiAgICAgICAgICAgIG9yZGVyVmFsdWUsXG4gICAgICAgICAgICBvcmRlck5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIG9yZGVyc1tvcmRlclZhbHVlXSAhPT0gb3JkZXJWYWx1ZSAmJlxuICAgICAgICAgICAgcGF5bG9hZE9yZGVyLmNvbmNlcHQgIT09ICcnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwYXlsb2FkLnB1c2gocGF5bG9hZE9yZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZWN0ZWRPcmRlcnNbb3JkZXJWYWx1ZV0gPSBvcmRlclZhbHVlO1xuICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXIgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLnV1aWQgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLnV1aWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlZE9yZGVycyA9IHRoaXMuX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICByZXR1cm4gdGhpcy5fYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEV4aXN0aW5nT3JkZXJzKGZvcm06IEZvcm0pIHtcbiAgICBpZiAoZm9ybS5leGlzdGluZ09yZGVycyAmJiBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycykge1xuICAgICAgbGV0IGV4aXN0aW5nT3JkZXJzID0gZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMubWFwKChvKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29uY2VwdDogby5jb25jZXB0LnV1aWQsXG4gICAgICAgICAgb3JkZXJOdW1iZXI6IG8ub3JkZXJOdW1iZXIsXG4gICAgICAgICAgb3JkZXJVdWlkOiBvLnV1aWQsXG4gICAgICAgICAgdm9pZGVkOiBvLnZvaWRlZCxcbiAgICAgICAgICBkYXRlVm9pZGVkOiBvLmF1ZGl0SW5mby5kYXRlVm9pZGVkXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIChleGlzdGluZ09yZGVycyA9IF8uZmlsdGVyKGV4aXN0aW5nT3JkZXJzLCAob3JkZXI6IGFueSkgPT4ge1xuICAgICAgICBpZiAob3JkZXIudm9pZGVkID09PSB0cnVlIHx8IG9yZGVyLmRhdGVWb2lkZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldE9yZGVyVmFsdWVzKG5vZGUsIGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMobm9kZSk7XG5cbiAgICBjb25zdCBvcmRlck5vZGVzID0gdGhpcy5mb3JtT3JkZXJOb2RlcztcbiAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICB0aGlzLl9zZXRPcmRlck5vZGVWYWx1ZXMob3JkZXJOb2RlLCBleGlzdGluZ09yZGVycyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTogYW55IHtcbiAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGRlbGV0ZWRPcmRlcnMpIHtcbiAgICAgIGlmIChkZWxldGVkT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICBwYXlsb2FkLnB1c2goeyB1dWlkOiBkZWxldGVkT3JkZXJzW29yZGVyXSwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlckNvbmNlcHQsIHF1ZXNpdG9uRXh0cmFzKTogYW55IHtcbiAgICBjb25zdCBvcmRlciA9IHtcbiAgICAgIGNvbmNlcHQ6ICcnLFxuICAgICAgdHlwZTogJycsXG4gICAgICBvcmRlcmVyOiAnJyxcbiAgICAgIGNhcmVTZXR0aW5nOiAnJ1xuICAgIH07XG4gICAgb3JkZXIuY29uY2VwdCA9IG9yZGVyQ29uY2VwdDtcbiAgICBvcmRlci50eXBlID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyVHlwZTtcbiAgICBvcmRlci5vcmRlcmVyID0gdGhpcy5wcm92aWRlcjtcbiAgICBvcmRlci5jYXJlU2V0dGluZyA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xuXG4gICAgLy8gZGVsZXRlIG9yZGVyZXIgaWYgcHJvdmlkZXIgbm90IHByb3ZpZGVkXG4gICAgaWYgKG9yZGVyLm9yZGVyZXIgPT09ICcnKSB7XG4gICAgICBkZWxldGUgb3JkZXIub3JkZXJlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3JkZXI7XG4gIH1cblxuICBwcml2YXRlIF9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk6IGFueSB7XG4gICAgY29uc3QgZGVsZXRlT3JkZXJzID0gW107XG4gICAgaWYgKHNlbGVjdGVkT3JkZXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgIGlmIChleGlzdGluZ09yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ09yZGVyQ29uY2VwdCA9IGV4aXN0aW5nT3JkZXJzW29yZGVyXS5jb25jZXB0O1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXIgPSBzZWxlY3RlZE9yZGVyc1tleGlzdGluZ09yZGVyQ29uY2VwdF07XG4gICAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXIgIT09IGV4aXN0aW5nT3JkZXJDb25jZXB0KSB7XG4gICAgICAgICAgICBkZWxldGVPcmRlcnMucHVzaChleGlzdGluZ09yZGVyc1tvcmRlcl0ub3JkZXJVdWlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ0RlbGV0ZWQgT3JkZXJzICcsIGRlbGV0ZU9yZGVycyk7XG4gICAgcmV0dXJuIGRlbGV0ZU9yZGVycztcbiAgfVxuXG4gIHByaXZhdGUgX3NldE9yZGVyTm9kZVZhbHVlcyhub2RlLCBvcmRlcnMpIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gb3JkZXJzO1xuICAgIGZvciAoY29uc3Qgb3JkZXIgb2Ygb3JkZXJzKSB7XG4gICAgICBub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICAgIHZhbHVlW25vZGUucXVlc3Rpb24ua2V5XSA9IG9yZGVyLmNvbmNlcHQ7XG4gICAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIGNoaWxkTm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIGNoaWxkTm9kZVsnaW5pdGlhbFZhbHVlJ10gPSB2YWx1ZTtcbiAgICAgIGNoaWxkTm9kZVsnb3JkZXJOdW1iZXInXSA9IG9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1NldCBWYWx1ZScsIG5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbnRyb2wudmFsdWUsIG5vZGUsIGNoaWxkTm9kZSk7XG4gICAgICBpbmRleCsrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlKSB7XG4gICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgc3dpdGNoIChmb3JtTm9kZS5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0ucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3Rlc3RPcmRlcidcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2Rlcy5wdXNoKGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==