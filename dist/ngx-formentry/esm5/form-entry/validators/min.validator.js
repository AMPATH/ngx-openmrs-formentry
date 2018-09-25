/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    /**
     * @param {?} min
     * @return {?}
     */
    MinValidator.prototype.validate = /**
     * @param {?} min
     * @return {?}
     */
    function (min) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                var /** @type {?} */ v = control.value;
                return v >= min ? null : { 'min': { requiredValue: min, actualValue: v } };
            }
            return null;
        };
    };
    return MinValidator;
}());
export { MinValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFBOzs7Ozs7O0lBR0UsK0JBQVE7Ozs7SUFBUixVQUFTLEdBQVc7UUFFbEIsTUFBTSxDQUFDLFVBQUMsT0FBdUI7WUFFN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFaEQscUJBQU0sQ0FBQyxHQUFXLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUM1RTtZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYixDQUFDO0tBQ0g7dUJBcEJIO0lBcUJDLENBQUE7QUFuQkQsd0JBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluVmFsaWRhdG9yIHtcclxuXHJcblxyXG4gIHZhbGlkYXRlKG1pbjogbnVtYmVyKSB7XHJcblxyXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xyXG5cclxuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgICAgY29uc3QgdjogbnVtYmVyID0gY29udHJvbC52YWx1ZTtcclxuICAgICAgICByZXR1cm4gdiA+PSBtaW4gPyBudWxsIDogeyAnbWluJzogeyByZXF1aXJlZFZhbHVlOiBtaW4sIGFjdHVhbFZhbHVlOiB2IH0gfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=