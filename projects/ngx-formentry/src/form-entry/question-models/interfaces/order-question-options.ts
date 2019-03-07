import { BaseOptions } from '../interfaces/base-options';
export interface OrderQuestionOptions extends BaseOptions {
    orderType: string;
    selectableOrders: { concept: string, label: string }[];
    orderSettingUuid: string;
    rendering: string;
    options?: { key: string, value: string }[];
}
