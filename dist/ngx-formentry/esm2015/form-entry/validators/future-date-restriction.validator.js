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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU0sT0FBTyw4QkFBOEI7SUFFekMsZ0JBQWdCLENBQUM7Ozs7O0lBRWpCLFFBQVEsQ0FBQyxPQUF1QjtRQUU5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUM7U0FDYjs7Y0FFSyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7O2NBQ3JCLEdBQUcsR0FBUyxJQUFJLElBQUksRUFBRTtRQUU1QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUUvQixJQUFJLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7O3NCQUVsQyxDQUFDLEdBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUUvQixPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUMvRTtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuL2RhdGUudmFsaWRhdG9yJztcblxuZXhwb3J0IGNsYXNzIEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICB2YWxpZGF0ZShjb250cm9sOiBBZmVGb3JtQ29udHJvbCkge1xuXG4gICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgY29uc3Qgbm93OiBEYXRlID0gbmV3IERhdGUoKTtcblxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggIT09IDApIHtcblxuICAgICAgaWYgKCFuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlKHZhbHVlKSkge1xuXG4gICAgICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGQuZ2V0VGltZSgpID4gbm93LmdldFRpbWUoKSA/IHsgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6IHRydWUgfSA6IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==