import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
export declare class OrderValueAdapter implements ValueAdapter {
    formOrderNodes: any[];
    private provider;
    generateFormPayload(form: Form): any;
    populateForm(form: Form, payload: any): void;
    private _setOrderProvider;
    private _createOrdersPayload;
    private _getExistingOrders;
    private _setOrderValues;
    private _addDeletedOrdersToPayload;
    private _createPayloadOrder;
    private _getDeletedOrders;
    private _setOrderNodeValues;
    private _findTestOrderQuestionNodes;
}
