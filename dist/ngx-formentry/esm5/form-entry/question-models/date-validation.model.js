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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRDtJQUF5QywrQ0FBZTtJQUl0RCw2QkFBWSxXQUFnQjtRQUE1QixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUduQjtRQU5ELHNCQUFnQixHQUFHLEtBQUssQ0FBQztRQUt2QixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O0lBQ2pGLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFURCxDQUF5QyxlQUFlLEdBU3ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIERhdGVWYWxpZGF0aW9uTW9kZWwgZXh0ZW5kcyBWYWxpZGF0aW9uTW9kZWwge1xuXG4gIGFsbG93RnV0dXJlRGF0ZXMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uczogYW55KSB7XG4gICAgc3VwZXIodmFsaWRhdGlvbnMpO1xuXG4gICAgdGhpcy5hbGxvd0Z1dHVyZURhdGVzID0gdmFsaWRhdGlvbnMuYWxsb3dGdXR1cmVEYXRlcyA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG59XG4iXX0=