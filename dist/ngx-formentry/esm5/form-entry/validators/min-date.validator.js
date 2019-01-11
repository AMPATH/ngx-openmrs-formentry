/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateValidator } from './date.validator';
var MinDateValidator = /** @class */ (function () {
    function MinDateValidator() {
    }
    /**
     * @param {?} min
     * @return {?}
     */
    MinDateValidator.prototype.validate = /**
     * @param {?} min
     * @return {?}
     */
    function (min) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    /** @type {?} */
                    var newDate = new Date(control.value);
                    return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
                }
                else {
                    return { 'mindate': { 'requiredDate': min } };
                }
            }
            return null;
        };
    };
    return MinDateValidator;
}());
export { MinDateValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpEO0lBQUE7SUEwQkEsQ0FBQzs7Ozs7SUF4QkMsbUNBQVE7Ozs7SUFBUixVQUFTLEdBQVM7UUFFaEIsT0FBTyxVQUFDLE9BQXVCO1lBRTdCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBRS9DLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7O3dCQUUxQyxPQUFPLEdBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFFN0MsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDL0c7cUJBQU07b0JBRUwsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUMvQzthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9kYXRlLnZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBNaW5EYXRlVmFsaWRhdG9yIHtcblxuICB2YWxpZGF0ZShtaW46IERhdGUpIHtcblxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcblxuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGlmICghbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZShjb250cm9sLnZhbHVlKSkge1xuXG4gICAgICAgICAgY29uc3QgbmV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGNvbnRyb2wudmFsdWUpO1xuXG4gICAgICAgICAgcmV0dXJuIG5ld0RhdGUuZ2V0VGltZSgpIDwgbWluLmdldFRpbWUoKSA/IHsgJ21pbmRhdGUnOiB7ICdyZXF1aXJlZERhdGUnOiBtaW4sIGFjdHVhbERhdGU6IG5ld0RhdGUgfSB9IDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHJldHVybiB7ICdtaW5kYXRlJzogeyAncmVxdWlyZWREYXRlJzogbWluIH0gfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=