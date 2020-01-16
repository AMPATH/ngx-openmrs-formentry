var DateValidator = /** @class */ (function () {
    function DateValidator() {
    }
    DateValidator.prototype.validate = function (control) {
        if (control.hidden) {
            return null;
        }
        var value = control.value;
        if (value && value.length !== 0) {
            // YYYY-MM-DD or DD-MM-YYYY
            var test = !/Invalid|NaN/.test(new Date(value).toString());
            return test ? null : { 'date': true };
        }
        else {
            return null;
        }
    };
    return DateValidator;
}());
export { DateValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtJQUVFO0lBQWdCLENBQUM7SUFFakIsZ0NBQVEsR0FBUixVQUFTLE9BQXVCO1FBRTlCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUU1QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUUvQiwyQkFBMkI7WUFDM0IsSUFBTSxJQUFJLEdBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFdEUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDdkM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5cblxuZXhwb3J0IGNsYXNzIERhdGVWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgdmFsaWRhdGUoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpIHtcblxuICAgIGlmIChjb250cm9sLmhpZGRlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAvLyBZWVlZLU1NLUREIG9yIERELU1NLVlZWVlcbiAgICAgIGNvbnN0IHRlc3Q6IGJvb2xlYW4gPSAhL0ludmFsaWR8TmFOLy50ZXN0KG5ldyBEYXRlKHZhbHVlKS50b1N0cmluZygpKTtcblxuICAgICAgcmV0dXJuIHRlc3QgPyBudWxsIDogeyAnZGF0ZSc6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=