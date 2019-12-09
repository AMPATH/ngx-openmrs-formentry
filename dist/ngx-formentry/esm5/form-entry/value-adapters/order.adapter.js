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
        var e_1, _a;
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
    OrderValueAdapter.prototype._setOrderValues = function (node, existingOrders) {
        var e_2, _a;
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
        var e_3, _a;
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
    OrderValueAdapter = tslib_1.__decorate([
        Injectable()
    ], OrderValueAdapter);
    return OrderValueAdapter;
}());
export { OrderValueAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QjtJQURBO1FBRUksbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBME0xQixDQUFDO0lBeE1HLCtDQUFtQixHQUFuQixVQUFvQixJQUFVO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHdDQUFZLEdBQVosVUFBYSxJQUFVLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLDZDQUFpQixHQUF6QixVQUEwQixJQUFVO1FBQ2hDLElBQUksSUFBSSxDQUFDLG1CQUFt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QUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FFekQsTUFBTTs0QkFDVixLQUFLLFdBQVc7Z0NBQ1osSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO29DQUNuQixpQ0FBaUM7b0NBQ2pDLEtBQUssSUFBTSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTt3Q0FDbEMsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7d0NBQ2xELElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7NENBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5Q0FDckQ7cUNBQ0o7aUNBRUo7Z0NBQ0QsTUFBTTs0QkFDVjtnQ0FDSSxNQUFNO3lCQUViO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjtJQUNMLENBQUM7SUExTVEsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtPQUNBLGlCQUFpQixDQTRNN0I7SUFBRCx3QkFBQztDQUFBLEFBNU1ELElBNE1DO1NBNU1ZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZGVyVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgICBmb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgIHByaXZhdGUgcHJvdmlkZXIgPSAnJztcblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgICAgIHRoaXMuX3NldE9yZGVyUHJvdmlkZXIoZm9ybSk7XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3JkZXJzUGF5bG9hZCh0aGlzLmZvcm1PcmRlck5vZGVzLCBmb3JtKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICBmb3JtLmV4aXN0aW5nT3JkZXJzID0gcGF5bG9hZDtcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJWYWx1ZXModGhpcy5mb3JtT3JkZXJOb2RlcywgZXhpc3RpbmdPcmRlcnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyUHJvdmlkZXIoZm9ybTogRm9ybSkge1xuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVPcmRlcnNQYXlsb2FkKG9yZGVyTm9kZXMsIGZvcm06IEZvcm0pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVycyA9IFtdO1xuICAgICAgICBsZXQgZGVsZXRlZE9yZGVycyA9IFtdO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBvcmRlck5vZGVWYWx1ZXMgPSBvcmRlck5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycyA9IFtdO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJzW29iai5jb25jZXB0XSA9IG9iai5jb25jZXB0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gb3JkZXJOb2RlVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyTm9kZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmRlclZhbHVlID0gb3JkZXJOb2RlVmFsdWVzW29yZGVyXVtvcmRlck5vZGUucXVlc3Rpb24ua2V5XTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkT3JkZXIgPSB0aGlzLl9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJWYWx1ZSwgb3JkZXJOb2RlLnF1ZXN0aW9uLmV4dHJhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyc1tvcmRlclZhbHVlXSAhPT0gb3JkZXJWYWx1ZSAmJiBwYXlsb2FkT3JkZXIuY29uY2VwdCAhPT0gJycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHBheWxvYWRPcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcmRlcnNbb3JkZXJWYWx1ZV0gPSBvcmRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWRPcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLnV1aWQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZWRPcmRlcnMgPSB0aGlzLl9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybTogRm9ybSkge1xuICAgICAgICBpZiAoZm9ybS5leGlzdGluZ09yZGVycyAmJiBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycykge1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nT3JkZXJzID0gZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMubWFwKChvKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogby5jb25jZXB0LnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyTnVtYmVyOiBvLm9yZGVyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBvcmRlclV1aWQ6IG8udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiBvLnZvaWRlZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVZvaWRlZDogby5hdWRpdEluZm8uZGF0ZVZvaWRlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nT3JkZXJzID0gXy5maWx0ZXIoZXhpc3RpbmdPcmRlcnMsIChvcmRlcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnZvaWRlZCA9PT0gdHJ1ZSB8fCBvcmRlci5kYXRlVm9pZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJWYWx1ZXMobm9kZSwgZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMobm9kZSk7XG5cbiAgICAgICAgY29uc3Qgb3JkZXJOb2RlcyA9IHRoaXMuZm9ybU9yZGVyTm9kZXM7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldE9yZGVyTm9kZVZhbHVlcyhvcmRlck5vZGUsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk6IGFueSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZGVsZXRlZE9yZGVycykge1xuICAgICAgICAgICAgaWYgKGRlbGV0ZWRPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHsgdXVpZDogZGVsZXRlZE9yZGVyc1tvcmRlcl0sIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJDb25jZXB0LCBxdWVzaXRvbkV4dHJhcyk6IGFueSB7XG4gICAgICAgIGNvbnN0IG9yZGVyID0ge1xuICAgICAgICAgICAgY29uY2VwdDogJycsXG4gICAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICAgIG9yZGVyZXI6ICcnLFxuICAgICAgICAgICAgY2FyZVNldHRpbmc6ICcnXG4gICAgICAgIH07XG4gICAgICAgIG9yZGVyLmNvbmNlcHQgPSBvcmRlckNvbmNlcHQ7XG4gICAgICAgIG9yZGVyLnR5cGUgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJUeXBlO1xuICAgICAgICBvcmRlci5vcmRlcmVyID0gdGhpcy5wcm92aWRlcjtcbiAgICAgICAgb3JkZXIuY2FyZVNldHRpbmcgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcblxuICAgICAgICAvLyBkZWxldGUgb3JkZXJlciBpZiBwcm92aWRlciBub3QgcHJvdmlkZWRcbiAgICAgICAgaWYgKG9yZGVyLm9yZGVyZXIgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgb3JkZXIub3JkZXJlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcmRlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZU9yZGVycyA9IFtdO1xuICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJDb25jZXB0ID0gZXhpc3RpbmdPcmRlcnNbb3JkZXJdLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXIgPSBzZWxlY3RlZE9yZGVyc1tleGlzdGluZ09yZGVyQ29uY2VwdF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE9yZGVyICE9PSBleGlzdGluZ09yZGVyQ29uY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlT3JkZXJzLnB1c2goZXhpc3RpbmdPcmRlcnNbb3JkZXJdLm9yZGVyVXVpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0RlbGV0ZWQgT3JkZXJzICcsIGRlbGV0ZU9yZGVycyk7XG4gICAgICAgIHJldHVybiBkZWxldGVPcmRlcnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJOb2RlVmFsdWVzKG5vZGUsIG9yZGVycykge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IG9yZGVycztcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcbiAgICAgICAgICAgIG5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xuICAgICAgICAgICAgdmFsdWVbbm9kZS5xdWVzdGlvbi5rZXldID0gb3JkZXIuY29uY2VwdDtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICAgICAgY2hpbGROb2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgY2hpbGROb2RlWydpbml0aWFsVmFsdWUnXSA9IHZhbHVlO1xuICAgICAgICAgICAgY2hpbGROb2RlWydvcmRlck51bWJlciddID0gb3JkZXIub3JkZXJOdW1iZXI7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2V0IFZhbHVlJywgbm9kZS5jaGlsZHJlbltpbmRleF0uY29udHJvbC52YWx1ZSwgbm9kZSwgY2hpbGROb2RlKTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZSkge1xuXG4gICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0ucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLmV4dHJhcyAmJiBxdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3Rlc3RPcmRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2Rlcy5wdXNoKGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==