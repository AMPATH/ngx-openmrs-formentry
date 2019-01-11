/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ValidationModel } from './validation.model';
export class DateValidationModel extends ValidationModel {
    /**
     * @param {?} validations
     */
    constructor(validations) {
        super(validations);
        this.allowFutureDates = false;
        this.allowFutureDates = validations.allowFutureDates === 'true' ? true : false;
    }
}
if (false) {
    /** @type {?} */
    DateValidationModel.prototype.allowFutureDates;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGVBQWU7Ozs7SUFJdEQsWUFBWSxXQUFnQjtRQUMxQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFIckIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBS3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRixDQUFDO0NBQ0Y7OztJQVBDLCtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBEYXRlVmFsaWRhdGlvbk1vZGVsIGV4dGVuZHMgVmFsaWRhdGlvbk1vZGVsIHtcblxuICBhbGxvd0Z1dHVyZURhdGVzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKHZhbGlkYXRpb25zKTtcblxuICAgIHRoaXMuYWxsb3dGdXR1cmVEYXRlcyA9IHZhbGlkYXRpb25zLmFsbG93RnV0dXJlRGF0ZXMgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgfVxufVxuIl19