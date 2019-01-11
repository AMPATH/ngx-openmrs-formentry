/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    }
    /**
     * @private
     * @param {?} form
     * @return {?}
     */
    _setOrderProvider(form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    }
    /**
     * @private
     * @param {?} orderNodes
     * @param {?} form
     * @return {?}
     */
    _createOrdersPayload(orderNodes, form) {
        /** @type {?} */
        const payload = [];
        /** @type {?} */
        const selectedOrders = [];
        /** @type {?} */
        let deletedOrders = [];
        /** @type {?} */
        const existingOrders = this._getExistingOrders(form);
        for (const orderNode of orderNodes) {
            /** @type {?} */
            const orderNodeValues = orderNode.control.value;
            /** @type {?} */
            const orders = [];
            if (existingOrders) {
                existingOrders.map(function (obj) {
                    orders[obj.concept] = obj.concept;
                });
            }
            for (const order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {
                    /** @type {?} */
                    const orderValue = orderNodeValues[order][orderNode.question.key];
                    /** @type {?} */
                    const payloadOrder = this._createPayloadOrder(orderValue, orderNode.question.extras);
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
     * @private
     * @param {?} form
     * @return {?}
     */
    _getExistingOrders(form) {
        if (form.existingOrders && form.existingOrders.orders) {
            /** @type {?} */
            let existingOrders = form.existingOrders.orders.map((o) => {
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
     * @private
     * @param {?} node
     * @param {?} existingOrders
     * @return {?}
     */
    _setOrderValues(node, existingOrders) {
        this._findTestOrderQuestionNodes(node);
        /** @type {?} */
        const orderNodes = this.formOrderNodes;
        for (const orderNode of orderNodes) {
            this._setOrderNodeValues(orderNode, existingOrders);
        }
    }
    /**
     * @private
     * @param {?} deletedOrders
     * @param {?} payload
     * @return {?}
     */
    _addDeletedOrdersToPayload(deletedOrders, payload) {
        for (const order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    }
    /**
     * @private
     * @param {?} orderConcept
     * @param {?} quesitonExtras
     * @return {?}
     */
    _createPayloadOrder(orderConcept, quesitonExtras) {
        /** @type {?} */
        const order = {
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
     * @private
     * @param {?} selectedOrders
     * @param {?} existingOrders
     * @return {?}
     */
    _getDeletedOrders(selectedOrders, existingOrders) {
        /** @type {?} */
        const deleteOrders = [];
        if (selectedOrders) {
            for (const order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    /** @type {?} */
                    const existingOrderConcept = existingOrders[order].concept;
                    /** @type {?} */
                    const selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(existingOrders[order].orderUuid);
                    }
                }
            }
        }
        // console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    }
    /**
     * @private
     * @param {?} node
     * @param {?} orders
     * @return {?}
     */
    _setOrderNodeValues(node, orders) {
        /** @type {?} */
        let index = 0;
        node['initialValue'] = orders;
        for (const order of orders) {
            node.createChildNode();
            /** @type {?} */
            const value = {};
            value[node.question.key] = order.concept;
            /** @type {?} */
            const childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['initialValue'] = value;
            childNode['orderNumber'] = order.orderNumber;
            // console.log('Set Value', node.children[index].control.value, node, childNode);
            index++;
        }
    }
    /**
     * @private
     * @param {?} formNode
     * @return {?}
     */
    _findTestOrderQuestionNodes(formNode) {
        if (formNode.children) {
            if (formNode.children instanceof Object) {
                for (const key in formNode.children) {
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
                                    for (const node in formNode.children) {
                                        /** @type {?} */
                                        const question = formNode.children[node].question;
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
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    OrderValueAdapter.prototype.formOrderNodes;
    /**
     * @type {?}
     * @private
     */
    OrderValueAdapter.prototype.provider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNLE9BQU8saUJBQWlCO0lBRDlCO1FBRUksbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBME0xQixDQUFDOzs7OztJQXhNRyxtQkFBbUIsQ0FBQyxJQUFVO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O2NBQzFDLGNBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxJQUFVO1FBQ2hDLElBQUksSUFBSSxDQUFD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LElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5Q0FDckQ7cUNBQ0o7aUNBRUo7Z0NBQ0QsTUFBTTs0QkFDVjtnQ0FDSSxNQUFNO3lCQUViO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjtJQUNMLENBQUM7OztZQTNNSixVQUFVOzs7O0lBRVAsMkNBQW9COzs7OztJQUNwQixxQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclZhbHVlQWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG4gICAgZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICBwcml2YXRlIHByb3ZpZGVyID0gJyc7XG5cbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLl9zZXRPcmRlclByb3ZpZGVyKGZvcm0pO1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU9yZGVyc1BheWxvYWQodGhpcy5mb3JtT3JkZXJOb2RlcywgZm9ybSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgZm9ybS5leGlzdGluZ09yZGVycyA9IHBheWxvYWQ7XG4gICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XG4gICAgICAgIHRoaXMuX3NldE9yZGVyVmFsdWVzKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlclByb3ZpZGVyKGZvcm06IEZvcm0pIHtcbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIgPSBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3JlYXRlT3JkZXJzUGF5bG9hZChvcmRlck5vZGVzLCBmb3JtOiBGb3JtKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlcnMgPSBbXTtcbiAgICAgICAgbGV0IGRlbGV0ZWRPcmRlcnMgPSBbXTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xuICAgICAgICAgICAgY29uc3Qgb3JkZXJOb2RlVmFsdWVzID0gb3JkZXJOb2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBvcmRlcnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycykge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nT3JkZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyc1tvYmouY29uY2VwdF0gPSBvYmouY29uY2VwdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIG9yZGVyTm9kZVZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmIChvcmRlck5vZGVWYWx1ZXMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JkZXJWYWx1ZSA9IG9yZGVyTm9kZVZhbHVlc1tvcmRlcl1bb3JkZXJOb2RlLnF1ZXN0aW9uLmtleV07XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZE9yZGVyID0gdGhpcy5fY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyVmFsdWUsIG9yZGVyTm9kZS5xdWVzdGlvbi5leHRyYXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcnNbb3JkZXJWYWx1ZV0gIT09IG9yZGVyVmFsdWUgJiYgcGF5bG9hZE9yZGVyLmNvbmNlcHQgIT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChwYXlsb2FkT3JkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3JkZXJzW29yZGVyVmFsdWVdID0gb3JkZXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRPcmRlci5vcmRlck51bWJlciA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIub3JkZXJOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRPcmRlci51dWlkID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWRPcmRlci51dWlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGVkT3JkZXJzID0gdGhpcy5fZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkRGVsZXRlZE9yZGVyc1RvUGF5bG9hZChkZWxldGVkT3JkZXJzLCBwYXlsb2FkKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEV4aXN0aW5nT3JkZXJzKGZvcm06IEZvcm0pIHtcbiAgICAgICAgaWYgKGZvcm0uZXhpc3RpbmdPcmRlcnMgJiYgZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMpIHtcbiAgICAgICAgICAgIGxldCBleGlzdGluZ09yZGVycyA9IGZvcm0uZXhpc3RpbmdPcmRlcnMub3JkZXJzLm1hcCgobykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG8uY29uY2VwdC51dWlkLFxuICAgICAgICAgICAgICAgICAgICBvcmRlck51bWJlcjogby5vcmRlck51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJVdWlkOiBvLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogby52b2lkZWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVWb2lkZWQ6IG8uYXVkaXRJbmZvLmRhdGVWb2lkZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZ09yZGVycyA9IF8uZmlsdGVyKGV4aXN0aW5nT3JkZXJzLCAob3JkZXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcmRlci52b2lkZWQgPT09IHRydWUgfHwgb3JkZXIuZGF0ZVZvaWRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyVmFsdWVzKG5vZGUsIGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKG5vZGUpO1xuXG4gICAgICAgIGNvbnN0IG9yZGVyTm9kZXMgPSB0aGlzLmZvcm1PcmRlck5vZGVzO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRPcmRlck5vZGVWYWx1ZXMob3JkZXJOb2RlLCBleGlzdGluZ09yZGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpOiBhbnkge1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGRlbGV0ZWRPcmRlcnMpIHtcbiAgICAgICAgICAgIGlmIChkZWxldGVkT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7IHV1aWQ6IGRlbGV0ZWRPcmRlcnNbb3JkZXJdLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyQ29uY2VwdCwgcXVlc2l0b25FeHRyYXMpOiBhbnkge1xuICAgICAgICBjb25zdCBvcmRlciA9IHtcbiAgICAgICAgICAgIGNvbmNlcHQ6ICcnLFxuICAgICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgICBvcmRlcmVyOiAnJyxcbiAgICAgICAgICAgIGNhcmVTZXR0aW5nOiAnJ1xuICAgICAgICB9O1xuICAgICAgICBvcmRlci5jb25jZXB0ID0gb3JkZXJDb25jZXB0O1xuICAgICAgICBvcmRlci50eXBlID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyVHlwZTtcbiAgICAgICAgb3JkZXIub3JkZXJlciA9IHRoaXMucHJvdmlkZXI7XG4gICAgICAgIG9yZGVyLmNhcmVTZXR0aW5nID0gcXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyU2V0dGluZ1V1aWQ7XG5cbiAgICAgICAgLy8gZGVsZXRlIG9yZGVyZXIgaWYgcHJvdmlkZXIgbm90IHByb3ZpZGVkXG4gICAgICAgIGlmIChvcmRlci5vcmRlcmVyID09PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIG9yZGVyLm9yZGVyZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpOiBhbnkge1xuICAgICAgICBjb25zdCBkZWxldGVPcmRlcnMgPSBbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIGluIGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ09yZGVyQ29uY2VwdCA9IGV4aXN0aW5nT3JkZXJzW29yZGVyXS5jb25jZXB0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVyID0gc2VsZWN0ZWRPcmRlcnNbZXhpc3RpbmdPcmRlckNvbmNlcHRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlciAhPT0gZXhpc3RpbmdPcmRlckNvbmNlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9yZGVycy5wdXNoKGV4aXN0aW5nT3JkZXJzW29yZGVyXS5vcmRlclV1aWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdEZWxldGVkIE9yZGVycyAnLCBkZWxldGVPcmRlcnMpO1xuICAgICAgICByZXR1cm4gZGVsZXRlT3JkZXJzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyTm9kZVZhbHVlcyhub2RlLCBvcmRlcnMpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBvcmRlcnM7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgb2Ygb3JkZXJzKSB7XG4gICAgICAgICAgICBub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICAgICAgICAgIHZhbHVlW25vZGUucXVlc3Rpb24ua2V5XSA9IG9yZGVyLmNvbmNlcHQ7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIGNoaWxkTm9kZVsnaW5pdGlhbFZhbHVlJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNoaWxkTm9kZVsnb3JkZXJOdW1iZXInXSA9IG9yZGVyLm9yZGVyTnVtYmVyO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NldCBWYWx1ZScsIG5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbnRyb2wudmFsdWUsIG5vZGUsIGNoaWxkTm9kZSk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUpIHtcblxuICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVzdGlvbiA9IGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5leHRyYXMgJiYgcXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICd0ZXN0T3JkZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMucHVzaChmb3JtTm9kZS5jaGlsZHJlbltub2RlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=