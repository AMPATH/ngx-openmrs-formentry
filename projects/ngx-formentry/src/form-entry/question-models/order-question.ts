import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { OrderQuestionOptions } from './interfaces/order-question-options';
import { QuestionBase } from './question-base';

export class OrderQuestion extends QuestionBase {
    orderType: string;
    selectableOrders: { concept: string, label: string }[];
    orderSettingUuid: string;
    rendering: string;
    options: any[];
    constructor(options: OrderQuestionOptions) {
        super(options);
        this.renderingType = 'select';
        this.orderType = options.orderType;
        this.selectableOrders = options.selectableOrders;
        this.options = options.options;
        this.orderSettingUuid = options.orderSettingUuid;
        this.rendering = options.orderSettingUuid;
        this.controlType = AfeControlType.AfeFormControl;
    }
}
