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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBQUE7SUFnQkEsQ0FBQztJQWZDLCtCQUFRLEdBQVIsVUFBUyxHQUFXO1FBQ2xCLE1BQU0sQ0FBQyxVQUFDLE9BQXVCO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBTSxDQUFDLEdBQVcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDaEMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHO29CQUNiLENBQUMsQ0FBQyxJQUFJO29CQUNOLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEQsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5cbmV4cG9ydCBjbGFzcyBNaW5WYWxpZGF0b3Ige1xuICB2YWxpZGF0ZShtaW46IG51bWJlcikge1xuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIGlmIChjb250cm9sLmhpZGRlbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IHY6IG51bWJlciA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgIHJldHVybiB2ID49IG1pblxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDogeyBtaW46IHsgcmVxdWlyZWRWYWx1ZTogbWluLCBhY3R1YWxWYWx1ZTogdiB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==