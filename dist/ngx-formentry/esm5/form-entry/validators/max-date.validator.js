import { DateValidator } from './date.validator';
var MaxDateValidator = /** @class */ (function () {
    function MaxDateValidator() {
    }
    MaxDateValidator.prototype.validate = function (max) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    var newDate = new Date(control.value);
                    return newDate.getTime() > max.getTime()
                        ? { maxdate: { requiredDate: max, actualDate: newDate } }
                        : null;
                }
                else {
                    return { maxdate: { requiredDate: max } };
                }
            }
            return null;
        };
    };
    return MaxDateValidator;
}());
export { MaxDateValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvbWF4LWRhdGUudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDtJQUFBO0lBc0JBLENBQUM7SUFyQkMsbUNBQVEsR0FBUixVQUFTLEdBQVM7UUFDaEIsTUFBTSxDQUFDLFVBQUMsT0FBdUI7WUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELElBQU0sT0FBTyxHQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFO3dCQUN0QyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRTt3QkFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDWCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUM1QyxDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi9kYXRlLnZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBNYXhEYXRlVmFsaWRhdG9yIHtcbiAgdmFsaWRhdGUobWF4OiBEYXRlKSB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoIW5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGUoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBuZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoY29udHJvbC52YWx1ZSk7XG5cbiAgICAgICAgICByZXR1cm4gbmV3RGF0ZS5nZXRUaW1lKCkgPiBtYXguZ2V0VGltZSgpXG4gICAgICAgICAgICA/IHsgbWF4ZGF0ZTogeyByZXF1aXJlZERhdGU6IG1heCwgYWN0dWFsRGF0ZTogbmV3RGF0ZSB9IH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBtYXhkYXRlOiB7IHJlcXVpcmVkRGF0ZTogbWF4IH0gfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=