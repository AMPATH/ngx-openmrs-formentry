var DecimalPointValidationModel = /** @class */ (function () {
    function DecimalPointValidationModel(validations) {
        this.decimalPlace = 0;
        this.failsWhenExpression = '';
        this.type = 'js_expression';
        this.decimalPlace = validations.decimalPlace;
    }
    DecimalPointValidationModel.prototype.setFailExpression = function () {
        this.failsWhenExpression = "!isEmpty(myValue) && String(myValue).split('.')[1].length !== " + this.decimalPlace;
    };
    DecimalPointValidationModel.prototype.setMessage = function () {
        this.message = "Value must be to " + this.decimalPlace + " decimal places";
    };
    DecimalPointValidationModel.prototype.setValuesAndExpressions = function () {
        this.setMessage();
        this.setFailExpression();
    };
    return DecimalPointValidationModel;
}());
export { DecimalPointValidationModel };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC1wb2ludC12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9kZWNpbWFsLXBvaW50LXZhbGlkYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFNRSxxQ0FBWSxXQUFnQjtRQUg1QixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQix3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBQy9DLENBQUM7SUFDRCx1REFBaUIsR0FBakI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUVBQWlFLElBQUksQ0FBQyxZQUFjLENBQUM7SUFDbEgsQ0FBQztJQUNELGdEQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFvQixJQUFJLENBQUMsWUFBWSxvQkFBaUIsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsNkRBQXVCLEdBQXZCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUFwQkQsSUFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGVjaW1hbFBvaW50VmFsaWRhdGlvbk1vZGVsIHtcbiAgdHlwZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGRlY2ltYWxQbGFjZSA9IDA7XG4gIGZhaWxzV2hlbkV4cHJlc3Npb24gPSAnJztcblxuICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uczogYW55KSB7XG4gICAgdGhpcy50eXBlID0gJ2pzX2V4cHJlc3Npb24nO1xuICAgIHRoaXMuZGVjaW1hbFBsYWNlID0gdmFsaWRhdGlvbnMuZGVjaW1hbFBsYWNlO1xuICB9XG4gIHNldEZhaWxFeHByZXNzaW9uKCk6IHZvaWQge1xuICAgIHRoaXMuZmFpbHNXaGVuRXhwcmVzc2lvbiA9IGAhaXNFbXB0eShteVZhbHVlKSAmJiBTdHJpbmcobXlWYWx1ZSkuc3BsaXQoJy4nKVsxXS5sZW5ndGggIT09ICR7dGhpcy5kZWNpbWFsUGxhY2V9YDtcbiAgfVxuICBzZXRNZXNzYWdlKCkge1xuICAgIHRoaXMubWVzc2FnZSA9IGBWYWx1ZSBtdXN0IGJlIHRvICR7dGhpcy5kZWNpbWFsUGxhY2V9IGRlY2ltYWwgcGxhY2VzYDtcbiAgfVxuICBzZXRWYWx1ZXNBbmRFeHByZXNzaW9ucygpIHtcbiAgICB0aGlzLnNldE1lc3NhZ2UoKTtcbiAgICB0aGlzLnNldEZhaWxFeHByZXNzaW9uKCk7XG4gIH1cbn1cbiJdfQ==