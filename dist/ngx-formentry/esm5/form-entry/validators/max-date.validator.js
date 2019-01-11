/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return function (control) {
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
        };
    };
    return MaxDateValidator;
}());
export { MaxDateValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21heC1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpEO0lBQUE7SUEwQkEsQ0FBQzs7Ozs7SUF4QkMsbUNBQVE7Ozs7SUFBUixVQUFTLEdBQVM7UUFFaEIsT0FBTyxVQUFDLE9BQXVCO1lBRTdCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBRS9DLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7O3dCQUUxQyxPQUFPLEdBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFFN0MsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDL0c7cUJBQU07b0JBRUwsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUMvQzthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9kYXRlLnZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBNYXhEYXRlVmFsaWRhdG9yIHtcblxuICB2YWxpZGF0ZShtYXg6IERhdGUpIHtcblxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcblxuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGlmICghbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZShjb250cm9sLnZhbHVlKSkge1xuXG4gICAgICAgICAgY29uc3QgbmV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGNvbnRyb2wudmFsdWUpO1xuXG4gICAgICAgICAgcmV0dXJuIG5ld0RhdGUuZ2V0VGltZSgpID4gbWF4LmdldFRpbWUoKSA/IHsgJ21heGRhdGUnOiB7ICdyZXF1aXJlZERhdGUnOiBtYXgsIGFjdHVhbERhdGU6IG5ld0RhdGUgfSB9IDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHJldHVybiB7ICdtYXhkYXRlJzogeyAncmVxdWlyZWREYXRlJzogbWF4IH0gfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=