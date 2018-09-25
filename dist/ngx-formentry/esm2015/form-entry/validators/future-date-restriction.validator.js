/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ value = control.value;
        const /** @type {?} */ now = new Date();
        if (value && value.length !== 0) {
            if (!new DateValidator().validate(value)) {
                const /** @type {?} */ d = new Date(value);
                return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
            }
        }
        return null;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU07SUFFSixpQkFBaUI7Ozs7O0lBRWpCLFFBQVEsQ0FBQyxPQUF1QjtRQUU5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFFRCx1QkFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1Qix1QkFBTSxHQUFHLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUU3QixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6Qyx1QkFBTSxDQUFDLEdBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDL0U7U0FDRjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuL2RhdGUudmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICB2YWxpZGF0ZShjb250cm9sOiBBZmVGb3JtQ29udHJvbCkge1xyXG5cclxuICAgIGlmIChjb250cm9sLmhpZGRlbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XHJcbiAgICBjb25zdCBub3c6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgIGlmICghbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZSh2YWx1ZSkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgZDogRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGQuZ2V0VGltZSgpID4gbm93LmdldFRpbWUoKSA/IHsgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6IHRydWUgfSA6IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19