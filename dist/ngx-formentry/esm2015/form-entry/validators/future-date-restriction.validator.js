/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateValidator } from './date.validator';
export class FutureDateRestrictionValidator {
    constructor() { }
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        if (control.hidden) {
            return null;
        }
        /** @type {?} */
        const value = control.value;
        /** @type {?} */
        const now = new Date();
        if (value && value.length !== 0) {
            if (!new DateValidator().validate(value)) {
                /** @type {?} */
                const d = new Date(value);
                return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
            }
        }
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU07SUFFSixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsUUFBUSxDQUFDLE9BQXVCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDOztjQUVLLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSzs7Y0FDckIsR0FBRyxHQUFTLElBQUksSUFBSSxFQUFFO1FBRTVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O3NCQUVuQyxDQUFDLEdBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUUvQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hGLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9kYXRlLnZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgdmFsaWRhdGUoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpIHtcclxuXHJcbiAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xyXG4gICAgY29uc3Qgbm93OiBEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoICE9PSAwKSB7XHJcblxyXG4gICAgICBpZiAoIW5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGUodmFsdWUpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkLmdldFRpbWUoKSA+IG5vdy5nZXRUaW1lKCkgPyB7ICdmdXR1cmVEYXRlUmVzdHJpY3Rpb24nOiB0cnVlIH0gOiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==