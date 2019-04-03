/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateValidator } from './date.validator';
var FutureDateRestrictionValidator = /** @class */ (function () {
    function FutureDateRestrictionValidator() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    FutureDateRestrictionValidator.prototype.validate = /**
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
        var now = new Date();
        if (value && value.length !== 0) {
            if (!new DateValidator().validate(value)) {
                /** @type {?} */
                var d = new Date(value);
                return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
            }
        }
        return null;
    };
    return FutureDateRestrictionValidator;
}());
export { FutureDateRestrictionValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpEO0lBRUU7SUFBZ0IsQ0FBQzs7Ozs7SUFFakIsaURBQVE7Ozs7SUFBUixVQUFTLE9BQXVCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDOztZQUVLLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSzs7WUFDckIsR0FBRyxHQUFTLElBQUksSUFBSSxFQUFFO1FBRTVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUVuQyxDQUFDLEdBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUUvQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hGLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxxQ0FBQztBQUFELENBQUMsQUF6QkQsSUF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4vZGF0ZS52YWxpZGF0b3InO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHZhbGlkYXRlKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKSB7XHJcblxyXG4gICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcclxuICAgIGNvbnN0IG5vdzogRGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgaWYgKCFuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlKHZhbHVlKSkge1xyXG5cclxuICAgICAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUodmFsdWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gZC5nZXRUaW1lKCkgPiBub3cuZ2V0VGltZSgpID8geyAnZnV0dXJlRGF0ZVJlc3RyaWN0aW9uJzogdHJ1ZSB9IDogbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=