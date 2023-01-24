var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    MinValidator.prototype.validate = function (min) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                var v = control.value;
                return v >= min
                    ? null
                    : { min: { requiredValue: min, actualValue: v } };
            }
            return null;
        };
    };
    return MinValidator;
}());
export { MinValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7SUFBQTtJQWdCQSxDQUFDO0lBZkMsK0JBQVEsR0FBUixVQUFTLEdBQVc7UUFDbEIsTUFBTSxDQUFDLFVBQUMsT0FBdUI7WUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFNLENBQUMsR0FBVyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUc7b0JBQ2IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0RCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcblxuZXhwb3J0IGNsYXNzIE1pblZhbGlkYXRvciB7XG4gIHZhbGlkYXRlKG1pbjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgY29uc3QgdjogbnVtYmVyID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHYgPj0gbWluXG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiB7IG1pbjogeyByZXF1aXJlZFZhbHVlOiBtaW4sIGFjdHVhbFZhbHVlOiB2IH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19