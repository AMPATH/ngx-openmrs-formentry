var RequiredValidator = /** @class */ (function () {
    function RequiredValidator() {
    }
    RequiredValidator.prototype.validate = function (control) {
        if (control.hidden) {
            return null;
        }
        var value = control.value;
        var isEmpty = value == null || typeof value === 'string' && value.length === 0;
        return isEmpty ? { 'required': true } : null;
    };
    return RequiredValidator;
}());
export { RequiredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvcmVxdWlyZWQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBQUE7SUFhQSxDQUFDO0lBWEMsb0NBQVEsR0FBUixVQUFTLE9BQXVCO1FBRTlCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxLQUFLLEdBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFNLE9BQU8sR0FBWSxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUUxRixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRWYWxpZGF0b3Ige1xuXG4gIHZhbGlkYXRlKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKSB7XG5cbiAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlO1xuICAgIGNvbnN0IGlzRW1wdHk6IGJvb2xlYW4gPSB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xuXG4gICAgcmV0dXJuIGlzRW1wdHkgPyB7ICdyZXF1aXJlZCc6IHRydWUgfSA6IG51bGw7XG4gIH1cbn1cbiJdfQ==