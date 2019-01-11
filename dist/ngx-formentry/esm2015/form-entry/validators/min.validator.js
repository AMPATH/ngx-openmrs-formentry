/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class MinValidator {
    /**
     * @param {?} min
     * @return {?}
     */
    validate(min) {
        return (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                /** @type {?} */
                const v = control.value;
                return v >= min ? null : { 'min': { requiredValue: min, actualValue: v } };
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFHdkIsUUFBUSxDQUFDLEdBQVc7UUFFbEIsT0FBTyxDQUFDLE9BQXVCLEVBQTBCLEVBQUU7WUFFekQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7c0JBRXpDLENBQUMsR0FBVyxPQUFPLENBQUMsS0FBSztnQkFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUM1RTtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5cbmV4cG9ydCBjbGFzcyBNaW5WYWxpZGF0b3Ige1xuXG5cbiAgdmFsaWRhdGUobWluOiBudW1iZXIpIHtcblxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcblxuICAgICAgaWYgKGNvbnRyb2wuaGlkZGVuKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBjb25zdCB2OiBudW1iZXIgPSBjb250cm9sLnZhbHVlO1xuICAgICAgICByZXR1cm4gdiA+PSBtaW4gPyBudWxsIDogeyAnbWluJzogeyByZXF1aXJlZFZhbHVlOiBtaW4sIGFjdHVhbFZhbHVlOiB2IH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19