export class DecimalPointValidationModel {
    constructor(validations) {
        this.decimalPlace = 0;
        this.failsWhenExpression = '';
        this.type = 'js_expression';
        this.decimalPlace = validations.decimalPlace;
    }
    setFailExpression() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC1wb2ludC12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGVjaW1hbC1wb2ludC12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07SUFNSixZQUFZLFdBQWdCO1FBSDVCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUd2QixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7SUFDL0MsQ0FBQztJQUNELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxpRUFBaUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xILENBQUM7SUFDRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsSUFBSSxDQUFDLFlBQVksaUJBQWlCLENBQUM7SUFDeEUsQ0FBQztJQUNELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERlY2ltYWxQb2ludFZhbGlkYXRpb25Nb2RlbCB7XG4gIHR5cGU6IHN0cmluZztcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBkZWNpbWFsUGxhY2UgPSAwO1xuICBmYWlsc1doZW5FeHByZXNzaW9uID0gJyc7XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbnM6IGFueSkge1xuICAgIHRoaXMudHlwZSA9ICdqc19leHByZXNzaW9uJztcbiAgICB0aGlzLmRlY2ltYWxQbGFjZSA9IHZhbGlkYXRpb25zLmRlY2ltYWxQbGFjZTtcbiAgfVxuICBzZXRGYWlsRXhwcmVzc2lvbigpOiB2b2lkIHtcbiAgICB0aGlzLmZhaWxzV2hlbkV4cHJlc3Npb24gPSBgIWlzRW1wdHkobXlWYWx1ZSkgJiYgU3RyaW5nKG15VmFsdWUpLnNwbGl0KCcuJylbMV0ubGVuZ3RoICE9PSAke3RoaXMuZGVjaW1hbFBsYWNlfWA7XG4gIH1cbiAgc2V0TWVzc2FnZSgpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBgVmFsdWUgbXVzdCBiZSB0byAke3RoaXMuZGVjaW1hbFBsYWNlfSBkZWNpbWFsIHBsYWNlc2A7XG4gIH1cbiAgc2V0VmFsdWVzQW5kRXhwcmVzc2lvbnMoKSB7XG4gICAgdGhpcy5zZXRNZXNzYWdlKCk7XG4gICAgdGhpcy5zZXRGYWlsRXhwcmVzc2lvbigpO1xuICB9XG59XG4iXX0=