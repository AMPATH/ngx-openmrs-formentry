/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class MaxValidator {
    /**
     * @param {?} max
     * @return {?}
     */
    validate(max) {
        return (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                /** @type {?} */
                const v = control.value;
                return v <= max ? null : { 'max': { requiredValue: max, actualValue: v } };
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9tYXgudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFFdkIsUUFBUSxDQUFDLEdBQVc7UUFFbEIsT0FBTyxDQUFDLE9BQXVCLEVBQTBCLEVBQUU7WUFFekQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7c0JBRXpDLENBQUMsR0FBVyxPQUFPLENBQUMsS0FBSztnQkFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUM1RTtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5cbmV4cG9ydCBjbGFzcyBNYXhWYWxpZGF0b3Ige1xuXG4gIHZhbGlkYXRlKG1heDogbnVtYmVyKSB7XG5cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgIGlmIChjb250cm9sLmhpZGRlbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBjb25zdCB2OiBudW1iZXIgPSBjb250cm9sLnZhbHVlO1xuICAgICAgICByZXR1cm4gdiA8PSBtYXggPyBudWxsIDogeyAnbWF4JzogeyByZXF1aXJlZFZhbHVlOiBtYXgsIGFjdHVhbFZhbHVlOiB2IH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19