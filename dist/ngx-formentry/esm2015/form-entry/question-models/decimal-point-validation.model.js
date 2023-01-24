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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC1wb2ludC12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9kZWNpbWFsLXBvaW50LXZhbGlkYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtJQU1KLFlBQVksV0FBZ0I7UUFINUIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBR3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUMvQyxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGlFQUFpRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEgsQ0FBQztJQUNELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFvQixJQUFJLENBQUMsWUFBWSxpQkFBaUIsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGVjaW1hbFBvaW50VmFsaWRhdGlvbk1vZGVsIHtcbiAgdHlwZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGRlY2ltYWxQbGFjZSA9IDA7XG4gIGZhaWxzV2hlbkV4cHJlc3Npb24gPSAnJztcblxuICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uczogYW55KSB7XG4gICAgdGhpcy50eXBlID0gJ2pzX2V4cHJlc3Npb24nO1xuICAgIHRoaXMuZGVjaW1hbFBsYWNlID0gdmFsaWRhdGlvbnMuZGVjaW1hbFBsYWNlO1xuICB9XG4gIHNldEZhaWxFeHByZXNzaW9uKCk6IHZvaWQge1xuICAgIHRoaXMuZmFpbHNXaGVuRXhwcmVzc2lvbiA9IGAhaXNFbXB0eShteVZhbHVlKSAmJiBTdHJpbmcobXlWYWx1ZSkuc3BsaXQoJy4nKVsxXS5sZW5ndGggIT09ICR7dGhpcy5kZWNpbWFsUGxhY2V9YDtcbiAgfVxuICBzZXRNZXNzYWdlKCkge1xuICAgIHRoaXMubWVzc2FnZSA9IGBWYWx1ZSBtdXN0IGJlIHRvICR7dGhpcy5kZWNpbWFsUGxhY2V9IGRlY2ltYWwgcGxhY2VzYDtcbiAgfVxuICBzZXRWYWx1ZXNBbmRFeHByZXNzaW9ucygpIHtcbiAgICB0aGlzLnNldE1lc3NhZ2UoKTtcbiAgICB0aGlzLnNldEZhaWxFeHByZXNzaW9uKCk7XG4gIH1cbn1cbiJdfQ==