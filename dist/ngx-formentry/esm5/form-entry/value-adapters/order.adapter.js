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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vcmRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCO0lBREE7UUFFSSxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7SUEwTTFCLENBQUM7SUF4TUcsK0NBQW1CLEdBQW5CLFVBQW9CLElBQVU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsd0NBQVksR0FBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sNkNBQWlCLEdBQXpCLFVBQTBCLElBQVU7UUFDaEMsSUFBSSxJ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LENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUV6RCxNQUFNOzRCQUNWLEtBQUssV0FBVztnQ0FDWixJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0NBQ25CLGlDQUFpQztvQ0FDakMsS0FBSyxJQUFNLElBQUksSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO3dDQUNsQyxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQzt3Q0FDbEQsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTs0Q0FDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lDQUNyRDtxQ0FDSjtpQ0FFSjtnQ0FDRCxNQUFNOzRCQUNWO2dDQUNJLE1BQU07eUJBRWI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUVKO0lBQ0wsQ0FBQztJQTFNUSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCLENBNE03QjtJQUFELHdCQUFDO0NBQUEsQUE1TUQsSUE0TUM7U0E1TVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJWYWx1ZUFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuICAgIGZvcm1PcmRlck5vZGVzID0gW107XG4gICAgcHJpdmF0ZSBwcm92aWRlciA9ICcnO1xuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJQcm92aWRlcihmb3JtKTtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVPcmRlcnNQYXlsb2FkKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGZvcm0pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIGZvcm0uZXhpc3RpbmdPcmRlcnMgPSBwYXlsb2FkO1xuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgICAgICB0aGlzLl9zZXRPcmRlclZhbHVlcyh0aGlzLmZvcm1PcmRlck5vZGVzLCBleGlzdGluZ09yZGVycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJQcm92aWRlcihmb3JtOiBGb3JtKSB7XG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZU9yZGVyc1BheWxvYWQob3JkZXJOb2RlcywgZm9ybTogRm9ybSkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXJzID0gW107XG4gICAgICAgIGxldCBkZWxldGVkT3JkZXJzID0gW107XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyTm9kZVZhbHVlcyA9IG9yZGVyTm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgY29uc3Qgb3JkZXJzID0gW107XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ09yZGVycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvcmRlcnNbb2JqLmNvbmNlcHRdID0gb2JqLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBvcmRlck5vZGVWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXJOb2RlVmFsdWVzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyVmFsdWUgPSBvcmRlck5vZGVWYWx1ZXNbb3JkZXJdW29yZGVyTm9kZS5xdWVzdGlvbi5rZXldO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRPcmRlciA9IHRoaXMuX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlclZhbHVlLCBvcmRlck5vZGUucXVlc3Rpb24uZXh0cmFzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJzW29yZGVyVmFsdWVdICE9PSBvcmRlclZhbHVlICYmIHBheWxvYWRPcmRlci5jb25jZXB0ICE9PSAnJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2gocGF5bG9hZE9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9yZGVyc1tvcmRlclZhbHVlXSA9IG9yZGVyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXIgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIudXVpZCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlZE9yZGVycyA9IHRoaXMuX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRFeGlzdGluZ09yZGVycyhmb3JtOiBGb3JtKSB7XG4gICAgICAgIGlmIChmb3JtLmV4aXN0aW5nT3JkZXJzICYmIGZvcm0uZXhpc3RpbmdPcmRlcnMub3JkZXJzKSB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdPcmRlcnMgPSBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycy5tYXAoKG8pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBvLmNvbmNlcHQudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJOdW1iZXI6IG8ub3JkZXJOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVXVpZDogby51dWlkLFxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IG8udm9pZGVkLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVm9pZGVkOiBvLmF1ZGl0SW5mby5kYXRlVm9pZGVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdPcmRlcnMgPSBfLmZpbHRlcihleGlzdGluZ09yZGVycywgKG9yZGVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIudm9pZGVkID09PSB0cnVlIHx8IG9yZGVyLmRhdGVWb2lkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlclZhbHVlcyhub2RlLCBleGlzdGluZ09yZGVycykge1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhub2RlKTtcblxuICAgICAgICBjb25zdCBvcmRlck5vZGVzID0gdGhpcy5mb3JtT3JkZXJOb2RlcztcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5fc2V0T3JkZXJOb2RlVmFsdWVzKG9yZGVyTm9kZSwgZXhpc3RpbmdPcmRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTogYW55IHtcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBkZWxldGVkT3JkZXJzKSB7XG4gICAgICAgICAgICBpZiAoZGVsZXRlZE9yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goeyB1dWlkOiBkZWxldGVkT3JkZXJzW29yZGVyXSwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVBheWxvYWRPcmRlcihvcmRlckNvbmNlcHQsIHF1ZXNpdG9uRXh0cmFzKTogYW55IHtcbiAgICAgICAgY29uc3Qgb3JkZXIgPSB7XG4gICAgICAgICAgICBjb25jZXB0OiAnJyxcbiAgICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgICAgb3JkZXJlcjogJycsXG4gICAgICAgICAgICBjYXJlU2V0dGluZzogJydcbiAgICAgICAgfTtcbiAgICAgICAgb3JkZXIuY29uY2VwdCA9IG9yZGVyQ29uY2VwdDtcbiAgICAgICAgb3JkZXIudHlwZSA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclR5cGU7XG4gICAgICAgIG9yZGVyLm9yZGVyZXIgPSB0aGlzLnByb3ZpZGVyO1xuICAgICAgICBvcmRlci5jYXJlU2V0dGluZyA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBvcmRlcmVyIGlmIHByb3ZpZGVyIG5vdCBwcm92aWRlZFxuICAgICAgICBpZiAob3JkZXIub3JkZXJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcmRlci5vcmRlcmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTogYW55IHtcbiAgICAgICAgY29uc3QgZGVsZXRlT3JkZXJzID0gW107XG4gICAgICAgIGlmIChzZWxlY3RlZE9yZGVycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBleGlzdGluZ09yZGVycykge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlckNvbmNlcHQgPSBleGlzdGluZ09yZGVyc1tvcmRlcl0uY29uY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlciA9IHNlbGVjdGVkT3JkZXJzW2V4aXN0aW5nT3JkZXJDb25jZXB0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXIgIT09IGV4aXN0aW5nT3JkZXJDb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmRlcnMucHVzaChleGlzdGluZ09yZGVyc1tvcmRlcl0ub3JkZXJVdWlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRGVsZXRlZCBPcmRlcnMgJywgZGVsZXRlT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU9yZGVycztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlck5vZGVWYWx1ZXMobm9kZSwgb3JkZXJzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gb3JkZXJzO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgICAgICAgICAgbm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgICAgICAgICB2YWx1ZVtub2RlLnF1ZXN0aW9uLmtleV0gPSBvcmRlci5jb25jZXB0O1xuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICBjaGlsZE5vZGUuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ2luaXRpYWxWYWx1ZSddID0gdmFsdWU7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ29yZGVyTnVtYmVyJ10gPSBvcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZXQgVmFsdWUnLCBub2RlLmNoaWxkcmVuW2luZGV4XS5jb250cm9sLnZhbHVlLCBub2RlLCBjaGlsZE5vZGUpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtTm9kZS5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBmb3JtTm9kZS5jaGlsZHJlbltub2RlXS5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24uZXh0cmFzICYmIHF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAndGVzdE9yZGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzLnB1c2goZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19