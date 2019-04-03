/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateValidator } from './date.validator';
var MaxDateValidator = /** @class */ (function () {
    function MaxDateValidator() {
    }
    /**
     * @param {?} max
     * @return {?}
     */
    MaxDateValidator.prototype.validate = /**
     * @param {?} max
     * @return {?}
     */
    function (max) {
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    /** @type {?} */
                    var newDate = new Date(control.value);
                    return newDate.getTime() > max.getTime() ? { 'maxdate': { 'requiredDate': max, actualDate: newDate } } : null;
                }
                else {
                    return { 'maxdate': { 'requiredDate': max } };
                }
            }
            return null;
        });
    };
    return MaxDateValidator;
}());
export { MaxDateValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21heC1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpEO0lBQUE7SUEwQkEsQ0FBQzs7Ozs7SUF4QkMsbUNBQVE7Ozs7SUFBUixVQUFTLEdBQVM7UUFFaEIsTUFBTTs7OztRQUFDLFVBQUMsT0FBdUI7WUFFN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O3dCQUUzQyxPQUFPLEdBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNoSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVOLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUNoRCxDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuL2RhdGUudmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXhEYXRlVmFsaWRhdG9yIHtcclxuXHJcbiAgdmFsaWRhdGUobWF4OiBEYXRlKSB7XHJcblxyXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xyXG5cclxuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoICE9PSAwKSB7XHJcblxyXG4gICAgICAgIGlmICghbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZShjb250cm9sLnZhbHVlKSkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IG5ld0RhdGU6IERhdGUgPSBuZXcgRGF0ZShjb250cm9sLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbmV3RGF0ZS5nZXRUaW1lKCkgPiBtYXguZ2V0VGltZSgpID8geyAnbWF4ZGF0ZSc6IHsgJ3JlcXVpcmVkRGF0ZSc6IG1heCwgYWN0dWFsRGF0ZTogbmV3RGF0ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHsgJ21heGRhdGUnOiB7ICdyZXF1aXJlZERhdGUnOiBtYXggfSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=