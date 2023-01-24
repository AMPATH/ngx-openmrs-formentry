import * as tslib_1 from "tslib";
import { ValidationModel } from './validation.model';
var DateValidationModel = /** @class */ (function (_super) {
    tslib_1.__extends(DateValidationModel, _super);
    function DateValidationModel(validations) {
        var _this = _super.call(this, validations) || this;
        _this.allowFutureDates = false;
        _this.allowFutureDates =
            validations.allowFutureDates === 'true' ? true : false;
        return _this;
    }
    return DateValidationModel;
}(ValidationModel));
export { DateValidationModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7SUFBeUMsK0NBQWU7SUFHdEQsNkJBQVksV0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FJbkI7UUFQRCxzQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLdkIsS0FBSSxDQUFDLGdCQUFnQjtZQUNuQixXQUFXLENBQUMsZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7SUFDM0QsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVRELENBQXlDLGVBQWUsR0FTdkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVZhbGlkYXRpb25Nb2RlbCBleHRlbmRzIFZhbGlkYXRpb25Nb2RlbCB7XG4gIGFsbG93RnV0dXJlRGF0ZXMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uczogYW55KSB7XG4gICAgc3VwZXIodmFsaWRhdGlvbnMpO1xuXG4gICAgdGhpcy5hbGxvd0Z1dHVyZURhdGVzID1cbiAgICAgIHZhbGlkYXRpb25zLmFsbG93RnV0dXJlRGF0ZXMgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgfVxufVxuIl19