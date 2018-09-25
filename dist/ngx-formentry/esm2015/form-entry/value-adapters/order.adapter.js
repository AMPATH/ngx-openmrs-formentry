/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
export class OrderValueAdapter {
    constructor() {
        this.formOrderNodes = [];
        this.provider = '';
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes, form);
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    populateForm(form, payload) {
        form.existingOrders = payload;
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        const /** @type {?} */ existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    _setOrderProvider(form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    }
    /**
     * @param {?} orderNodes
     * @param {?} form
     * @return {?}
     */
    _createOrdersPayload(orderNodes, form) {
        const /** @type {?} */ payload = [];
        const /** @type {?} */ selectedOrders = [];
        let /** @type {?} */ deletedOrders = [];
        const /** @type {?} */ existingOrders = this._getExistingOrders(form);
        for (const /** @type {?} */ orderNode of orderNodes) {
            const /** @type {?} */ orderNodeValues = orderNode.control.value;
            const /** @type {?} */ orders = [];
            if (existingOrders) {
                existingOrders.map(function (obj) {
                    orders[obj.concept] = obj.concept;
                });
            }
            for (const /** @type {?} */ order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {
                    const /** @type {?} */ orderValue = orderNodeValues[order][orderNode.question.key];
                    const /** @type {?} */ payloadOrder = this._createPayloadOrder(orderValue, orderNode.question.extras);
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
        }
        deletedOrders = this._getDeletedOrders(selectedOrders, existingOrders);
        return this._addDeletedOrdersToPayload(deletedOrders, payload);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    _getExistingOrders(form) {
        if (form.existingOrders && form.existingOrders.orders) {
            let /** @type {?} */ existingOrders = form.existingOrders.orders.map((o) => {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            });
            return existingOrders = _.filter(existingOrders, (order) => {
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
    }
    /**
     * @param {?} node
     * @param {?} existingOrders
     * @return {?}
     */
    _setOrderValues(node, existingOrders) {
        this._findTestOrderQuestionNodes(node);
        const /** @type {?} */ orderNodes = this.formOrderNodes;
        for (const /** @type {?} */ orderNode of orderNodes) {
            this._setOrderNodeValues(orderNode, existingOrders);
        }
    }
    /**
     * @param {?} deletedOrders
     * @param {?} payload
     * @return {?}
     */
    _addDeletedOrdersToPayload(deletedOrders, payload) {
        for (const /** @type {?} */ order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    }
    /**
     * @param {?} orderConcept
     * @param {?} quesitonExtras
     * @return {?}
     */
    _createPayloadOrder(orderConcept, quesitonExtras) {
        const /** @type {?} */ order = {
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
    }
    /**
     * @param {?} selectedOrders
     * @param {?} existingOrders
     * @return {?}
     */
    _getDeletedOrders(selectedOrders, existingOrders) {
        const /** @type {?} */ deleteOrders = [];
        if (selectedOrders) {
            for (const /** @type {?} */ order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    const /** @type {?} */ existingOrderConcept = existingOrders[order].concept;
                    const /** @type {?} */ selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(existingOrders[order].orderUuid);
                    }
                }
            }
        }
        console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    }
    /**
     * @param {?} node
     * @param {?} orders
     * @return {?}
     */
    _setOrderNodeValues(node, orders) {
        let /** @type {?} */ index = 0;
        node['initialValue'] = orders;
        for (const /** @type {?} */ order of orders) {
            node.createChildNode();
            const /** @type {?} */ value = {};
            value[node.question.key] = order.concept;
            const /** @type {?} */ childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['initialValue'] = value;
            childNode['orderNumber'] = order.orderNumber;
            console.log('Set Value', node.children[index].control.value, node, childNode);
            index++;
        }
    }
    /**
     * @param {?} formNode
     * @return {?}
     */
    _findTestOrderQuestionNodes(formNode) {
        if (formNode.children) {
            if (formNode.children instanceof Object) {
                for (const /** @type {?} */ key in formNode.children) {
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
                                    for (const /** @type {?} */ node in formNode.children) {
                                        const /** @type {?} */ question = formNode.children[node].question;
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
    }
}
OrderValueAdapter.decorators = [
    { type: Injectable },
];
function OrderValueAdapter_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    OrderValueAdapter.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    OrderValueAdapter.ctorParameters;
    /** @type {?} */
    OrderValueAdapter.prototype.formOrderNodes;
    /** @type {?} */
    OrderValueAdapter.prototype.provider;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNOzs4QkFDZSxFQUFFO3dCQUNBLEVBQUU7Ozs7OztJQUVyQixtQkFBbUIsQ0FBQyxJQUFVO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvRDs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsdUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDN0Q7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBVTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJ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S0FBSyxDQUFDO3lCQUViO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjs7OztZQTFNUixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xyXG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9yZGVyVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcclxuICAgIGZvcm1PcmRlck5vZGVzID0gW107XHJcbiAgICBwcml2YXRlIHByb3ZpZGVyID0gJyc7XHJcblxyXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NldE9yZGVyUHJvdmlkZXIoZm9ybSk7XHJcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU9yZGVyc1BheWxvYWQodGhpcy5mb3JtT3JkZXJOb2RlcywgZm9ybSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcclxuICAgICAgICBmb3JtLmV4aXN0aW5nT3JkZXJzID0gcGF5bG9hZDtcclxuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcclxuICAgICAgICB0aGlzLl9zZXRPcmRlclZhbHVlcyh0aGlzLmZvcm1PcmRlck5vZGVzLCBleGlzdGluZ09yZGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJQcm92aWRlcihmb3JtOiBGb3JtKSB7XHJcbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZU9yZGVyc1BheWxvYWQob3JkZXJOb2RlcywgZm9ybTogRm9ybSkge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVycyA9IFtdO1xyXG4gICAgICAgIGxldCBkZWxldGVkT3JkZXJzID0gW107XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyTm9kZVZhbHVlcyA9IG9yZGVyTm9kZS5jb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBvcmRlcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ09yZGVycy5tYXAoZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyc1tvYmouY29uY2VwdF0gPSBvYmouY29uY2VwdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBvcmRlck5vZGVWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcmRlck5vZGVWYWx1ZXMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyVmFsdWUgPSBvcmRlck5vZGVWYWx1ZXNbb3JkZXJdW29yZGVyTm9kZS5xdWVzdGlvbi5rZXldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkT3JkZXIgPSB0aGlzLl9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJWYWx1ZSwgb3JkZXJOb2RlLnF1ZXN0aW9uLmV4dHJhcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcnNbb3JkZXJWYWx1ZV0gIT09IG9yZGVyVmFsdWUgJiYgcGF5bG9hZE9yZGVyLmNvbmNlcHQgIT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2gocGF5bG9hZE9yZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcmRlcnNbb3JkZXJWYWx1ZV0gPSBvcmRlclZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXIgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkT3JkZXIudXVpZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWRPcmRlci51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZWRPcmRlcnMgPSB0aGlzLl9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEV4aXN0aW5nT3JkZXJzKGZvcm06IEZvcm0pIHtcclxuICAgICAgICBpZiAoZm9ybS5leGlzdGluZ09yZGVycyAmJiBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycykge1xyXG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdPcmRlcnMgPSBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycy5tYXAoKG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogby5jb25jZXB0LnV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJOdW1iZXI6IG8ub3JkZXJOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJVdWlkOiBvLnV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiBvLnZvaWRlZCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlVm9pZGVkOiBvLmF1ZGl0SW5mby5kYXRlVm9pZGVkXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZ09yZGVycyA9IF8uZmlsdGVyKGV4aXN0aW5nT3JkZXJzLCAob3JkZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnZvaWRlZCA9PT0gdHJ1ZSB8fCBvcmRlci5kYXRlVm9pZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJWYWx1ZXMobm9kZSwgZXhpc3RpbmdPcmRlcnMpIHtcclxuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhub2RlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb3JkZXJOb2RlcyA9IHRoaXMuZm9ybU9yZGVyTm9kZXM7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRPcmRlck5vZGVWYWx1ZXMob3JkZXJOb2RlLCBleGlzdGluZ09yZGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk6IGFueSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBkZWxldGVkT3JkZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChkZWxldGVkT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHsgdXVpZDogZGVsZXRlZE9yZGVyc1tvcmRlcl0sIHZvaWRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJDb25jZXB0LCBxdWVzaXRvbkV4dHJhcyk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgb3JkZXIgPSB7XHJcbiAgICAgICAgICAgIGNvbmNlcHQ6ICcnLFxyXG4gICAgICAgICAgICB0eXBlOiAnJyxcclxuICAgICAgICAgICAgb3JkZXJlcjogJycsXHJcbiAgICAgICAgICAgIGNhcmVTZXR0aW5nOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb3JkZXIuY29uY2VwdCA9IG9yZGVyQ29uY2VwdDtcclxuICAgICAgICBvcmRlci50eXBlID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyVHlwZTtcclxuICAgICAgICBvcmRlci5vcmRlcmVyID0gdGhpcy5wcm92aWRlcjtcclxuICAgICAgICBvcmRlci5jYXJlU2V0dGluZyA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xyXG5cclxuICAgICAgICAvLyBkZWxldGUgb3JkZXJlciBpZiBwcm92aWRlciBub3QgcHJvdmlkZWRcclxuICAgICAgICBpZiAob3JkZXIub3JkZXJlciA9PT0gJycpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9yZGVyLm9yZGVyZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZU9yZGVycyA9IFtdO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE9yZGVycykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGV4aXN0aW5nT3JkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlckNvbmNlcHQgPSBleGlzdGluZ09yZGVyc1tvcmRlcl0uY29uY2VwdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVyID0gc2VsZWN0ZWRPcmRlcnNbZXhpc3RpbmdPcmRlckNvbmNlcHRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE9yZGVyICE9PSBleGlzdGluZ09yZGVyQ29uY2VwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmRlcnMucHVzaChleGlzdGluZ09yZGVyc1tvcmRlcl0ub3JkZXJVdWlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZWQgT3JkZXJzICcsIGRlbGV0ZU9yZGVycyk7XHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU9yZGVycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZXRPcmRlck5vZGVWYWx1ZXMobm9kZSwgb3JkZXJzKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IG9yZGVycztcclxuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xyXG4gICAgICAgICAgICBub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xyXG4gICAgICAgICAgICB2YWx1ZVtub2RlLnF1ZXN0aW9uLmtleV0gPSBvcmRlci5jb25jZXB0O1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW2luZGV4XTtcclxuICAgICAgICAgICAgY2hpbGROb2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBjaGlsZE5vZGVbJ2luaXRpYWxWYWx1ZSddID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGNoaWxkTm9kZVsnb3JkZXJOdW1iZXInXSA9IG9yZGVyLm9yZGVyTnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2V0IFZhbHVlJywgbm9kZS5jaGlsZHJlbltpbmRleF0uY29udHJvbC52YWx1ZSwgbm9kZSwgY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVzdGlvbiA9IGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdLnF1ZXN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLmV4dHJhcyAmJiBxdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3Rlc3RPcmRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzLnB1c2goZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19