import { ValidationModel } from './validation.model';
export class JsExpressionValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        this.failsWhenExpression = validations.failsWhenExpression;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxNQUFNLGtDQUFtQyxTQUFRLGVBQWU7SUFHOUQsWUFBWSxXQUFnQjtRQUMxQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztJQUM3RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIGV4dGVuZHMgVmFsaWRhdGlvbk1vZGVsIHtcbiAgZmFpbHNXaGVuRXhwcmVzc2lvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25zOiBhbnkpIHtcbiAgICBzdXBlcih2YWxpZGF0aW9ucyk7XG4gICAgdGhpcy5mYWlsc1doZW5FeHByZXNzaW9uID0gdmFsaWRhdGlvbnMuZmFpbHNXaGVuRXhwcmVzc2lvbjtcbiAgfVxufVxuIl19