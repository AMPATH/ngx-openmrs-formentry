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
        // console.log('Deleted Orders ', deleteOrders);
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
            // console.log('Set Value', node.children[index].control.value, node, childNode);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNOzs4QkFDZSxFQUFFO3dCQUNBLEVBQUU7Ozs7OztJQUVyQixtQkFBbUIsQ0FBQyxJQUFVO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvRDs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsdUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDN0Q7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBVTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJ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QUFDLENBQUM7NEJBQ3BELEtBQUssTUFBTTtnQ0FDUCxJQUFJLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUN6RCxLQUFLLENBQUM7NEJBQ1YsS0FBSyxTQUFTO2dDQUNWLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pELEtBQUssQ0FBQzs0QkFDVixLQUFLLE9BQU87Z0NBQ1IsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FFekQsS0FBSyxDQUFDOzRCQUNWLEtBQUssV0FBVztnQ0FDWixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7b0NBRXBCLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLElBQUksSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3Q0FDbkMsdUJBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO3dDQUNsRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7NENBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5Q0FDckQ7cUNBQ0o7aUNBRUo7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWO2dDQUNJLEtBQUssQ0FBQzt5QkFFYjtxQkFDSjtpQkFDSjthQUNKO1NBRUo7Ozs7WUExTVIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZGVyVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgICBmb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgIHByaXZhdGUgcHJvdmlkZXIgPSAnJztcblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgICAgIHRoaXMuX3NldE9yZGVyUHJvdmlkZXIoZm9ybSk7XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3JkZXJzUGF5bG9hZCh0aGlzLmZvcm1PcmRlck5vZGVzLCBmb3JtKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICBmb3JtLmV4aXN0aW5nT3JkZXJzID0gcGF5bG9hZDtcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJWYWx1ZXModGhpcy5mb3JtT3JkZXJOb2RlcywgZXhpc3RpbmdPcmRlcnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyUHJvdmlkZXIoZm9ybTogRm9ybSkge1xuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVPcmRlcnNQYXlsb2FkKG9yZGVyTm9kZXMsIGZvcm06IEZvcm0pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVycyA9IFtdO1xuICAgICAgICBsZXQgZGVsZXRlZE9yZGVycyA9IFtdO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBvcmRlck5vZGVWYWx1ZXMgPSBvcmRlck5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycyA9IFtdO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJzW29iai5jb25jZXB0XSA9IG9iai5jb25jZXB0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gb3JkZXJOb2RlVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyTm9kZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmRlclZhbHVlID0gb3JkZXJOb2RlVmFsdWVzW29yZGVyXVtvcmRlck5vZGUucXVlc3Rpb24ua2V5XTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkT3JkZXIgPSB0aGlzLl9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJWYWx1ZSwgb3JkZXJOb2RlLnF1ZXN0aW9uLmV4dHJhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyc1tvcmRlclZhbHVlXSAhPT0gb3JkZXJWYWx1ZSAmJiBwYXlsb2FkT3JkZXIuY29uY2VwdCAhPT0gJycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHBheWxvYWRPcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcmRlcnNbb3JkZXJWYWx1ZV0gPSBvcmRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWRPcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLnV1aWQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZWRPcmRlcnMgPSB0aGlzLl9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybTogRm9ybSkge1xuICAgICAgICBpZiAoZm9ybS5leGlzdGluZ09yZGVycyAmJiBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycykge1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nT3JkZXJzID0gZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMubWFwKChvKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogby5jb25jZXB0LnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyTnVtYmVyOiBvLm9yZGVyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBvcmRlclV1aWQ6IG8udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiBvLnZvaWRlZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVZvaWRlZDogby5hdWRpdEluZm8uZGF0ZVZvaWRlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nT3JkZXJzID0gXy5maWx0ZXIoZXhpc3RpbmdPcmRlcnMsIChvcmRlcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnZvaWRlZCA9PT0gdHJ1ZSB8fCBvcmRlci5kYXRlVm9pZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJWYWx1ZXMobm9kZSwgZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMobm9kZSk7XG5cbiAgICAgICAgY29uc3Qgb3JkZXJOb2RlcyA9IHRoaXMuZm9ybU9yZGVyTm9kZXM7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldE9yZGVyTm9kZVZhbHVlcyhvcmRlck5vZGUsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk6IGFueSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZGVsZXRlZE9yZGVycykge1xuICAgICAgICAgICAgaWYgKGRlbGV0ZWRPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHsgdXVpZDogZGVsZXRlZE9yZGVyc1tvcmRlcl0sIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJDb25jZXB0LCBxdWVzaXRvbkV4dHJhcyk6IGFueSB7XG4gICAgICAgIGNvbnN0IG9yZGVyID0ge1xuICAgICAgICAgICAgY29uY2VwdDogJycsXG4gICAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICAgIG9yZGVyZXI6ICcnLFxuICAgICAgICAgICAgY2FyZVNldHRpbmc6ICcnXG4gICAgICAgIH07XG4gICAgICAgIG9yZGVyLmNvbmNlcHQgPSBvcmRlckNvbmNlcHQ7XG4gICAgICAgIG9yZGVyLnR5cGUgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJUeXBlO1xuICAgICAgICBvcmRlci5vcmRlcmVyID0gdGhpcy5wcm92aWRlcjtcbiAgICAgICAgb3JkZXIuY2FyZVNldHRpbmcgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcblxuICAgICAgICAvLyBkZWxldGUgb3JkZXJlciBpZiBwcm92aWRlciBub3QgcHJvdmlkZWRcbiAgICAgICAgaWYgKG9yZGVyLm9yZGVyZXIgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgb3JkZXIub3JkZXJlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcmRlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZU9yZGVycyA9IFtdO1xuICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJDb25jZXB0ID0gZXhpc3RpbmdPcmRlcnNbb3JkZXJdLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXIgPSBzZWxlY3RlZE9yZGVyc1tleGlzdGluZ09yZGVyQ29uY2VwdF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE9yZGVyICE9PSBleGlzdGluZ09yZGVyQ29uY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlT3JkZXJzLnB1c2goZXhpc3RpbmdPcmRlcnNbb3JkZXJdLm9yZGVyVXVpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0RlbGV0ZWQgT3JkZXJzICcsIGRlbGV0ZU9yZGVycyk7XG4gICAgICAgIHJldHVybiBkZWxldGVPcmRlcnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJOb2RlVmFsdWVzKG5vZGUsIG9yZGVycykge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IG9yZGVycztcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcbiAgICAgICAgICAgIG5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xuICAgICAgICAgICAgdmFsdWVbbm9kZS5xdWVzdGlvbi5rZXldID0gb3JkZXIuY29uY2VwdDtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICAgICAgY2hpbGROb2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgY2hpbGROb2RlWydpbml0aWFsVmFsdWUnXSA9IHZhbHVlO1xuICAgICAgICAgICAgY2hpbGROb2RlWydvcmRlck51bWJlciddID0gb3JkZXIub3JkZXJOdW1iZXI7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2V0IFZhbHVlJywgbm9kZS5jaGlsZHJlbltpbmRleF0uY29udHJvbC52YWx1ZSwgbm9kZSwgY2hpbGROb2RlKTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZSkge1xuXG4gICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0ucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLmV4dHJhcyAmJiBxdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3Rlc3RPcmRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2Rlcy5wdXNoKGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==