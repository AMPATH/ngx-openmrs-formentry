/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                    var /** @type {?} */ newDate = new Date(control.value);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELElBQUE7Ozs7Ozs7SUFFRSxtQ0FBUTs7OztJQUFSLFVBQVMsR0FBUztRQUVoQixNQUFNLENBQUMsVUFBQyxPQUF1QjtZQUU3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWpELHFCQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDL0c7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRU4sTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQy9DO2FBQ0Y7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztLQUNIOzJCQTVCSDtJQTZCQyxDQUFBO0FBMUJELDRCQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9kYXRlLnZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluRGF0ZVZhbGlkYXRvciB7XHJcblxyXG4gIHZhbGlkYXRlKG1pbjogRGF0ZSkge1xyXG5cclxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcclxuXHJcbiAgICAgIGlmIChjb250cm9sLmhpZGRlbikge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICBpZiAoIW5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGUoY29udHJvbC52YWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBuZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoY29udHJvbC52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG5ld0RhdGUuZ2V0VGltZSgpIDwgbWluLmdldFRpbWUoKSA/IHsgJ21pbmRhdGUnOiB7ICdyZXF1aXJlZERhdGUnOiBtaW4sIGFjdHVhbERhdGU6IG5ld0RhdGUgfSB9IDogbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIHJldHVybiB7ICdtaW5kYXRlJzogeyAncmVxdWlyZWREYXRlJzogbWluIH0gfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19