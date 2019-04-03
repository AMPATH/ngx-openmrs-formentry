/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                existingOrders.map((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) {
                    orders[obj.concept] = obj.concept;
                }));
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
            let existingOrders = form.existingOrders.orders.map((/**
             * @param {?} o
             * @return {?}
             */
            (o) => {
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
            (order) => {
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
    { type: Injectable },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNO0lBRE47UUFFSSxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7SUEwTTFCLENBQUM7Ozs7O0lBeE1HLG1CQUFtQixDQUFDLElBQVU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxJQUFVLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztjQUMxQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBVTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7UUFDMUQsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBVTs7Y0FDekMsT0FBTyxHQUFHLEVBQUU7O2NBQ1osY0FBYyxHQUFHLEVBQUU7O1lBQ3JCLGFBQWEsR0FBRyxFQUFFOztjQUNoQixjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUNwRCxHQUFHLENBQUMsQ0FBQyxNQUFNLFNBQVMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDOztrQkFDM0IsZUFBZSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSzs7a0JBQ3pDLE1BQU0sR0FBRyxFQUFFO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLGNBQWMsQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQVUsR0FBRztvQkFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUN0QyxDQUFDLEVBQUMsQ0FBQztZQUNQLENBQUM7WUFHRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7MEJBRWxDLFVBQVUsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7OzBCQUUzRCxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFFcEYsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFVBQVUsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBRW5FLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQy9CLENBQUM7b0JBQ0QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDeEMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxPQUFPLFlBQVksQ0FBQyxXQUFXLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDO1FBRUQsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFbkUsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsSUFBVTtRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2hELGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEQsTUFBTSxDQUFDO29CQUNILE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7b0JBQ3ZCLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVztvQkFDMUIsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJO29CQUNqQixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVU7aUJBQ3JDLENBQUM7WUFDTixDQUFDLEVBQUM7WUFFRixNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYzs7OztZQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQztRQUNYLENBQUM7SUFFTCxDQUFDOzs7Ozs7O0lBRU8sZUFBZSxDQUFDLElBQUksRUFBRSxjQUFjO1FBQ3hDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Y0FFakMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjO1FBQ3RDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLDBCQUEwQixDQUFDLGFBQWEsRUFBRSxPQUFPO1FBQ3JELEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDOzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsWUFBWSxFQUFFLGNBQWM7O2NBQzlDLEtBQUssR0FBRztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsRUFBRTtZQUNYLFdBQVcsRUFBRSxFQUFFO1NBQ2xCO1FBQ0QsS0FBSyxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDN0IsS0FBSyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUN0RCxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsS0FBSyxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBRXBFLDBDQUEwQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsY0FBYzs7Y0FDOUMsWUFBWSxHQUFHLEVBQUU7UUFDdkIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNqQixHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7MEJBQ2pDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPOzswQkFDcEQsYUFBYSxHQUFHLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDMUQsRUFBRSxDQUFDLENBQUMsYUFBYSxLQUFLLG9CQUFvQixDQUFDLENBQUMsQ0FBQzt3QkFDekMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZELENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsZ0RBQWdEO1FBQ2hELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDeEIsQ0FBQzs7Ozs7OztJQUVPLG1CQUFtQixDQUFDLElBQUksRUFBRSxNQUFNOztZQUNoQyxLQUFLLEdBQUcsQ0FBQztRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O2tCQUNqQixLQUFLLEdBQUcsRUFBRTtZQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDOztrQkFDbkMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3RDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbEMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDN0MsaUZBQWlGO1lBQ2pGLEtBQUssRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLDJCQUEyQixDQUFDLFFBQVE7UUFFeEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxLQUFLLE1BQU07Z0NBQ1AsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDekQsS0FBSyxDQUFDOzRCQUNWLEtBQUssU0FBUztnQ0FDVixJQUFJLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUN6RCxLQUFLLENBQUM7NEJBQ1YsS0FBSyxPQUFPO2dDQUNSLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBRXpELEtBQUssQ0FBQzs0QkFDVixLQUFLLFdBQVc7Z0NBQ1osRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0NBQ3BCLGlDQUFpQztvQ0FDakMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OzhDQUM3QixRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRO3dDQUNqRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7NENBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3Q0FDdEQsQ0FBQztvQ0FDTCxDQUFDO2dDQUVMLENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWO2dDQUNJLEtBQUssQ0FBQzt3QkFFZCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDO0lBQ0wsQ0FBQzs7O1lBM01KLFVBQVU7Ozs7SUFFUCwyQ0FBb0I7Ozs7O0lBQ3BCLHFDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcclxuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPcmRlclZhbHVlQWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XHJcbiAgICBmb3JtT3JkZXJOb2RlcyA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwcm92aWRlciA9ICcnO1xyXG5cclxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xyXG4gICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zZXRPcmRlclByb3ZpZGVyKGZvcm0pO1xyXG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVPcmRlcnNQYXlsb2FkKHRoaXMuZm9ybU9yZGVyTm9kZXMsIGZvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XHJcbiAgICAgICAgZm9ybS5leGlzdGluZ09yZGVycyA9IHBheWxvYWQ7XHJcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XHJcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJWYWx1ZXModGhpcy5mb3JtT3JkZXJOb2RlcywgZXhpc3RpbmdPcmRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NldE9yZGVyUHJvdmlkZXIoZm9ybTogRm9ybSkge1xyXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIgPSBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucHJvdmlkZXJVdWlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVPcmRlcnNQYXlsb2FkKG9yZGVyTm9kZXMsIGZvcm06IEZvcm0pIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlcnMgPSBbXTtcclxuICAgICAgICBsZXQgZGVsZXRlZE9yZGVycyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJzID0gdGhpcy5fZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcmRlck5vZGUgb2Ygb3JkZXJOb2Rlcykge1xyXG4gICAgICAgICAgICBjb25zdCBvcmRlck5vZGVWYWx1ZXMgPSBvcmRlck5vZGUuY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3Qgb3JkZXJzID0gW107XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycykge1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmRlcnNbb2JqLmNvbmNlcHRdID0gb2JqLmNvbmNlcHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gb3JkZXJOb2RlVmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3JkZXJOb2RlVmFsdWVzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmRlclZhbHVlID0gb3JkZXJOb2RlVmFsdWVzW29yZGVyXVtvcmRlck5vZGUucXVlc3Rpb24ua2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZE9yZGVyID0gdGhpcy5fY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyVmFsdWUsIG9yZGVyTm9kZS5xdWVzdGlvbi5leHRyYXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJzW29yZGVyVmFsdWVdICE9PSBvcmRlclZhbHVlICYmIHBheWxvYWRPcmRlci5jb25jZXB0ICE9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHBheWxvYWRPcmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3JkZXJzW29yZGVyVmFsdWVdID0gb3JkZXJWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLnV1aWQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkT3JkZXIudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGVkT3JkZXJzID0gdGhpcy5fZ2V0RGVsZXRlZE9yZGVycyhzZWxlY3RlZE9yZGVycywgZXhpc3RpbmdPcmRlcnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRFeGlzdGluZ09yZGVycyhmb3JtOiBGb3JtKSB7XHJcbiAgICAgICAgaWYgKGZvcm0uZXhpc3RpbmdPcmRlcnMgJiYgZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMpIHtcclxuICAgICAgICAgICAgbGV0IGV4aXN0aW5nT3JkZXJzID0gZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMubWFwKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG8uY29uY2VwdC51dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyTnVtYmVyOiBvLm9yZGVyTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVXVpZDogby51dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogby52b2lkZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVZvaWRlZDogby5hdWRpdEluZm8uZGF0ZVZvaWRlZFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdPcmRlcnMgPSBfLmZpbHRlcihleGlzdGluZ09yZGVycywgKG9yZGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcmRlci52b2lkZWQgPT09IHRydWUgfHwgb3JkZXIuZGF0ZVZvaWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NldE9yZGVyVmFsdWVzKG5vZGUsIGV4aXN0aW5nT3JkZXJzKSB7XHJcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMobm9kZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9yZGVyTm9kZXMgPSB0aGlzLmZvcm1PcmRlck5vZGVzO1xyXG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0T3JkZXJOb2RlVmFsdWVzKG9yZGVyTm9kZSwgZXhpc3RpbmdPcmRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpOiBhbnkge1xyXG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZGVsZXRlZE9yZGVycykge1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlZE9yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcclxuICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7IHV1aWQ6IGRlbGV0ZWRPcmRlcnNbb3JkZXJdLCB2b2lkZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlUGF5bG9hZE9yZGVyKG9yZGVyQ29uY2VwdCwgcXVlc2l0b25FeHRyYXMpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IG9yZGVyID0ge1xyXG4gICAgICAgICAgICBjb25jZXB0OiAnJyxcclxuICAgICAgICAgICAgdHlwZTogJycsXHJcbiAgICAgICAgICAgIG9yZGVyZXI6ICcnLFxyXG4gICAgICAgICAgICBjYXJlU2V0dGluZzogJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyLmNvbmNlcHQgPSBvcmRlckNvbmNlcHQ7XHJcbiAgICAgICAgb3JkZXIudHlwZSA9IHF1ZXNpdG9uRXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vcmRlclR5cGU7XHJcbiAgICAgICAgb3JkZXIub3JkZXJlciA9IHRoaXMucHJvdmlkZXI7XHJcbiAgICAgICAgb3JkZXIuY2FyZVNldHRpbmcgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcclxuXHJcbiAgICAgICAgLy8gZGVsZXRlIG9yZGVyZXIgaWYgcHJvdmlkZXIgbm90IHByb3ZpZGVkXHJcbiAgICAgICAgaWYgKG9yZGVyLm9yZGVyZXIgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcmRlci5vcmRlcmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTogYW55IHtcclxuICAgICAgICBjb25zdCBkZWxldGVPcmRlcnMgPSBbXTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlcnMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBleGlzdGluZ09yZGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzLmhhc093blByb3BlcnR5KG9yZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXJDb25jZXB0ID0gZXhpc3RpbmdPcmRlcnNbb3JkZXJdLmNvbmNlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlciA9IHNlbGVjdGVkT3JkZXJzW2V4aXN0aW5nT3JkZXJDb25jZXB0XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRPcmRlciAhPT0gZXhpc3RpbmdPcmRlckNvbmNlcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlT3JkZXJzLnB1c2goZXhpc3RpbmdPcmRlcnNbb3JkZXJdLm9yZGVyVXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdEZWxldGVkIE9yZGVycyAnLCBkZWxldGVPcmRlcnMpO1xyXG4gICAgICAgIHJldHVybiBkZWxldGVPcmRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJOb2RlVmFsdWVzKG5vZGUsIG9yZGVycykge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBvcmRlcnM7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcclxuICAgICAgICAgICAgbm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB7fTtcclxuICAgICAgICAgICAgdmFsdWVbbm9kZS5xdWVzdGlvbi5rZXldID0gb3JkZXIuY29uY2VwdDtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XHJcbiAgICAgICAgICAgIGNoaWxkTm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgY2hpbGROb2RlWydpbml0aWFsVmFsdWUnXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBjaGlsZE5vZGVbJ29yZGVyTnVtYmVyJ10gPSBvcmRlci5vcmRlck51bWJlcjtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NldCBWYWx1ZScsIG5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbnRyb2wudmFsdWUsIG5vZGUsIGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlKSB7XHJcblxyXG4gICAgICAgIGlmIChmb3JtTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtTm9kZS5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlLmNoaWxkcmVuW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBmb3JtTm9kZS5jaGlsZHJlbltub2RlXS5xdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5leHRyYXMgJiYgcXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICd0ZXN0T3JkZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2Rlcy5wdXNoKGZvcm1Ob2RlLmNoaWxkcmVuW25vZGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==