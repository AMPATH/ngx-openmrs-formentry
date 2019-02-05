/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
if (false) {
    /** @type {?} */
    DateValidationModel.prototype.allowFutureDates;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJEO0lBQXlDLCtDQUFlO0lBSXRELDZCQUFZLFdBQWdCO1FBQTVCLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBR25CO1FBTkQsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBS3ZCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7SUFDakYsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVRELENBQXlDLGVBQWUsR0FTdkQ7Ozs7SUFQQywrQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVZhbGlkYXRpb25Nb2RlbCBleHRlbmRzIFZhbGlkYXRpb25Nb2RlbCB7XG5cbiAgYWxsb3dGdXR1cmVEYXRlcyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25zOiBhbnkpIHtcbiAgICBzdXBlcih2YWxpZGF0aW9ucyk7XG5cbiAgICB0aGlzLmFsbG93RnV0dXJlRGF0ZXMgPSB2YWxpZGF0aW9ucy5hbGxvd0Z1dHVyZURhdGVzID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gIH1cbn1cbiJdfQ==