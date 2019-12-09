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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQUFBO0lBYUEsQ0FBQztJQVhDLG9DQUFRLEdBQVIsVUFBUyxPQUF1QjtRQUU5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQU0sS0FBSyxHQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBTSxPQUFPLEdBQVksS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFFMUYsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0MsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcblxuZXhwb3J0IGNsYXNzIFJlcXVpcmVkVmFsaWRhdG9yIHtcblxuICB2YWxpZGF0ZShjb250cm9sOiBBZmVGb3JtQ29udHJvbCkge1xuXG4gICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZTogYW55ID0gY29udHJvbC52YWx1ZTtcbiAgICBjb25zdCBpc0VtcHR5OiBib29sZWFuID0gdmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCA9PT0gMDtcblxuICAgIHJldHVybiBpc0VtcHR5ID8geyAncmVxdWlyZWQnOiB0cnVlIH0gOiBudWxsO1xuICB9XG59XG4iXX0=