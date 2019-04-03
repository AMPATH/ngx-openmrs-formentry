/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateValidator } from './date.validator';
export class MinDateValidator {
    /**
     * @param {?} min
     * @return {?}
     */
    validate(min) {
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    /** @type {?} */
                    const newDate = new Date(control.value);
                    return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
                }
                else {
                    return { 'mindate': { 'requiredDate': min } };
                }
            }
            return null;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU07Ozs7O0lBRUosUUFBUSxDQUFDLEdBQVM7UUFFaEIsTUFBTTs7OztRQUFDLENBQUMsT0FBdUIsRUFBMEIsRUFBRTtZQUV6RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7MEJBRTNDLE9BQU8sR0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRU4sTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ2hELENBQUM7WUFDSCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9kYXRlLnZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluRGF0ZVZhbGlkYXRvciB7XHJcblxyXG4gIHZhbGlkYXRlKG1pbjogRGF0ZSkge1xyXG5cclxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcclxuXHJcbiAgICAgIGlmIChjb250cm9sLmhpZGRlbikge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICBpZiAoIW5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGUoY29udHJvbC52YWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBuZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoY29udHJvbC52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG5ld0RhdGUuZ2V0VGltZSgpIDwgbWluLmdldFRpbWUoKSA/IHsgJ21pbmRhdGUnOiB7ICdyZXF1aXJlZERhdGUnOiBtaW4sIGFjdHVhbERhdGU6IG5ld0RhdGUgfSB9IDogbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIHJldHVybiB7ICdtaW5kYXRlJzogeyAncmVxdWlyZWREYXRlJzogbWluIH0gfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19