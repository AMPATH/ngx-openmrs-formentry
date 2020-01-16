import { DateValidator } from './date.validator';
var FutureDateRestrictionValidator = /** @class */ (function () {
    function FutureDateRestrictionValidator() {
    }
    FutureDateRestrictionValidator.prototype.validate = function (control) {
        if (control.hidden) {
            return null;
        }
        var value = control.value;
        var now = new Date();
        if (value && value.length !== 0) {
            if (!new DateValidator().validate(value)) {
                var d = new Date(value);
                return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
            }
        }
        return null;
    };
    return FutureDateRestrictionValidator;
}());
export { FutureDateRestrictionValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDtJQUVFO0lBQWdCLENBQUM7SUFFakIsaURBQVEsR0FBUixVQUFTLE9BQXVCO1FBRTlCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFNLEdBQUcsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRTdCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBRS9CLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFFeEMsSUFBTSxDQUFDLEdBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWhDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQy9FO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxxQ0FBQztBQUFELENBQUMsQUF6QkQsSUF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuL2RhdGUudmFsaWRhdG9yJztcblxuZXhwb3J0IGNsYXNzIEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICB2YWxpZGF0ZShjb250cm9sOiBBZmVGb3JtQ29udHJvbCkge1xuXG4gICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgY29uc3Qgbm93OiBEYXRlID0gbmV3IERhdGUoKTtcblxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggIT09IDApIHtcblxuICAgICAgaWYgKCFuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlKHZhbHVlKSkge1xuXG4gICAgICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGQuZ2V0VGltZSgpID4gbm93LmdldFRpbWUoKSA/IHsgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6IHRydWUgfSA6IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==