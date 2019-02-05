/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU07SUFFSixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsUUFBUSxDQUFDLE9BQXVCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDOztjQUVLLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSzs7Y0FDckIsR0FBRyxHQUFTLElBQUksSUFBSSxFQUFFO1FBRTVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O3NCQUVuQyxDQUFDLEdBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUUvQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hGLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4vZGF0ZS52YWxpZGF0b3InO1xuXG5leHBvcnQgY2xhc3MgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHZhbGlkYXRlKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKSB7XG5cbiAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICBjb25zdCBub3c6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICBpZiAoIW5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGUodmFsdWUpKSB7XG5cbiAgICAgICAgY29uc3QgZDogRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gZC5nZXRUaW1lKCkgPiBub3cuZ2V0VGltZSgpID8geyAnZnV0dXJlRGF0ZVJlc3RyaWN0aW9uJzogdHJ1ZSB9IDogbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19