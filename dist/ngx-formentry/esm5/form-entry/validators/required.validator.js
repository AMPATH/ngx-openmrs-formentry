/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFBQTtJQWFBLENBQUM7Ozs7O0lBWEMsb0NBQVE7Ozs7SUFBUixVQUFTLE9BQXVCO1FBRTlCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiOztZQUVLLEtBQUssR0FBUSxPQUFPLENBQUMsS0FBSzs7WUFDMUIsT0FBTyxHQUFZLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUV6RixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRWYWxpZGF0b3Ige1xuXG4gIHZhbGlkYXRlKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKSB7XG5cbiAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IGlzRW1wdHk6IGJvb2xlYW4gPSB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xuXG4gICAgcmV0dXJuIGlzRW1wdHkgPyB7ICdyZXF1aXJlZCc6IHRydWUgfSA6IG51bGw7XG4gIH1cbn1cbiJdfQ==