/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RequiredValidator = /** @class */ (function () {
    function RequiredValidator() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    RequiredValidator.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (control.hidden) {
            return null;
        }
        /** @type {?} */
        var value = control.value;
        /** @type {?} */
        var isEmpty = value == null || typeof value === 'string' && value.length === 0;
        return isEmpty ? { 'required': true } : null;
    };
    return RequiredValidator;
}());
export { RequiredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFBQTtJQWFBLENBQUM7Ozs7O0lBWEMsb0NBQVE7Ozs7SUFBUixVQUFTLE9BQXVCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDOztZQUVLLEtBQUssR0FBUSxPQUFPLENBQUMsS0FBSzs7WUFDMUIsT0FBTyxHQUFZLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUV6RixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9DLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFiRCxJQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRWYWxpZGF0b3Ige1xyXG5cclxuICB2YWxpZGF0ZShjb250cm9sOiBBZmVGb3JtQ29udHJvbCkge1xyXG5cclxuICAgIGlmIChjb250cm9sLmhpZGRlbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZTogYW55ID0gY29udHJvbC52YWx1ZTtcclxuICAgIGNvbnN0IGlzRW1wdHk6IGJvb2xlYW4gPSB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xyXG5cclxuICAgIHJldHVybiBpc0VtcHR5ID8geyAncmVxdWlyZWQnOiB0cnVlIH0gOiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=