/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvZGF0ZS52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE1BQU0sT0FBTyxhQUFhO0lBRXhCLGdCQUFnQixDQUFDOzs7OztJQUVqQixRQUFRLENBQUMsT0FBdUI7UUFFOUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O2NBRUssS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLO1FBRTNCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzs7a0JBR3pCLElBQUksR0FBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFckUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDdkM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcblxuXG5leHBvcnQgY2xhc3MgRGF0ZVZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICB2YWxpZGF0ZShjb250cm9sOiBBZmVGb3JtQ29udHJvbCkge1xuXG4gICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG5cbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgIC8vIFlZWVktTU0tREQgb3IgREQtTU0tWVlZWVxuICAgICAgY29uc3QgdGVzdDogYm9vbGVhbiA9ICEvSW52YWxpZHxOYU4vLnRlc3QobmV3IERhdGUodmFsdWUpLnRvU3RyaW5nKCkpO1xuXG4gICAgICByZXR1cm4gdGVzdCA/IG51bGwgOiB7ICdkYXRlJzogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==