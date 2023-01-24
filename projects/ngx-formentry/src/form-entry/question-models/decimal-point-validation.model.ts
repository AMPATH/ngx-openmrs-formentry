export class DecimalPointValidationModel {
  type: string;
  message: string;
  decimalPlace = 0;
  failsWhenExpression = '';

  constructor(validations: any) {
    this.type = 'js_expression';
    this.decimalPlace = validations.decimalPlace;
  }
  setFailExpression(): void {
    this.failsWhenExpression = `!isEmpty(myValue) && String(myValue).split('.')[1].length !== ${this.decimalPlace}`;
  }
  setMessage() {
    this.message = `Value must be to ${this.decimalPlace} decimal places`;
  }
  setValuesAndExpressions() {
    this.setMessage();
    this.setFailExpression();
  }
}
