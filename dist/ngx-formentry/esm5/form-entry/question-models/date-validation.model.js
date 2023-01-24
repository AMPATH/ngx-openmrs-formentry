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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRDtJQUF5QywrQ0FBZTtJQUd0RCw2QkFBWSxXQUFnQjtRQUE1QixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUluQjtRQVBELHNCQUFnQixHQUFHLEtBQUssQ0FBQztRQUt2QixLQUFJLENBQUMsZ0JBQWdCO1lBQ25CLFdBQVcsQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOztJQUMzRCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBeUMsZUFBZSxHQVN2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBEYXRlVmFsaWRhdGlvbk1vZGVsIGV4dGVuZHMgVmFsaWRhdGlvbk1vZGVsIHtcbiAgYWxsb3dGdXR1cmVEYXRlcyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25zOiBhbnkpIHtcbiAgICBzdXBlcih2YWxpZGF0aW9ucyk7XG5cbiAgICB0aGlzLmFsbG93RnV0dXJlRGF0ZXMgPVxuICAgICAgdmFsaWRhdGlvbnMuYWxsb3dGdXR1cmVEYXRlcyA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG59XG4iXX0=