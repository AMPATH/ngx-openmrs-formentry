export declare class DecimalPointValidationModel {
    type: string;
    message: string;
    decimalPlace: number;
    failsWhenExpression: string;
    constructor(validations: any);
    setFailExpression(): void;
    setMessage(): void;
    setValuesAndExpressions(): void;
}
