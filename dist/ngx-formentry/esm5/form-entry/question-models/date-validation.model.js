import * as tslib_1 from "tslib";
import { ValidationModel } from './validation.model';
var DateValidationModel = /** @class */ (function (_super) {
    tslib_1.__extends(DateValidationModel, _super);
    function DateValidationModel(validations) {
        var _this = _super.call(this, validations) || this;
        _this.allowFutureDates = false;
        _this.allowFutureDates = validations.allowFutureDates === 'true' ? true : false;
        return _this;
    }
    return DateValidationModel;
}(ValidationModel));
export { DateValidationModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7SUFBeUMsK0NBQWU7SUFJdEQsNkJBQVksV0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FHbkI7UUFORCxzQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLdkIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOztJQUNqRixDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBeUMsZUFBZSxHQVN2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBEYXRlVmFsaWRhdGlvbk1vZGVsIGV4dGVuZHMgVmFsaWRhdGlvbk1vZGVsIHtcblxuICBhbGxvd0Z1dHVyZURhdGVzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKHZhbGlkYXRpb25zKTtcblxuICAgIHRoaXMuYWxsb3dGdXR1cmVEYXRlcyA9IHZhbGlkYXRpb25zLmFsbG93RnV0dXJlRGF0ZXMgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgfVxufVxuIl19