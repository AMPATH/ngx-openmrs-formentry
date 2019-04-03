/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class DateValidator {
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
        if (value && value.length !== 0) {
            // YYYY-MM-DD or DD-MM-YYYY
            /** @type {?} */
            const test = !/Invalid|NaN/.test(new Date(value).toString());
            return test ? null : { 'date': true };
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvZGF0ZS52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE1BQU07SUFFSixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsUUFBUSxDQUFDLE9BQXVCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDOztjQUVLLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSztRQUUzQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7a0JBRzFCLElBQUksR0FBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFckUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgdmFsaWRhdGUoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpIHtcclxuXHJcbiAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xyXG5cclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgIC8vIFlZWVktTU0tREQgb3IgREQtTU0tWVlZWVxyXG4gICAgICBjb25zdCB0ZXN0OiBib29sZWFuID0gIS9JbnZhbGlkfE5hTi8udGVzdChuZXcgRGF0ZSh2YWx1ZSkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICByZXR1cm4gdGVzdCA/IG51bGwgOiB7ICdkYXRlJzogdHJ1ZSB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==