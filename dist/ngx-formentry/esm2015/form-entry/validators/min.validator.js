/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class MinValidator {
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
                /** @type {?} */
                const v = control.value;
                return v >= min ? null : { 'min': { requiredValue: min, actualValue: v } };
            }
            return null;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNOzs7OztJQUdKLFFBQVEsQ0FBQyxHQUFXO1FBRWxCLE1BQU07Ozs7UUFBQyxDQUFDLE9BQXVCLEVBQTBCLEVBQUU7WUFFekQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztzQkFFMUMsQ0FBQyxHQUFXLE9BQU8sQ0FBQyxLQUFLO2dCQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0UsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5WYWxpZGF0b3Ige1xyXG5cclxuXHJcbiAgdmFsaWRhdGUobWluOiBudW1iZXIpIHtcclxuXHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XHJcblxyXG4gICAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICBjb25zdCB2OiBudW1iZXIgPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiB2ID49IG1pbiA/IG51bGwgOiB7ICdtaW4nOiB7IHJlcXVpcmVkVmFsdWU6IG1pbiwgYWN0dWFsVmFsdWU6IHYgfSB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==