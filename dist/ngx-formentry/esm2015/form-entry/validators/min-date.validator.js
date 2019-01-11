/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateValidator } from './date.validator';
export class MinDateValidator {
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
                if (!new DateValidator().validate(control.value)) {
                    /** @type {?} */
                    const newDate = new Date(control.value);
                    return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
                }
                else {
                    return { 'mindate': { 'requiredDate': min } };
                }
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBRTNCLFFBQVEsQ0FBQyxHQUFTO1FBRWhCLE9BQU8sQ0FBQyxPQUF1QixFQUEwQixFQUFFO1lBRXpELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBRS9DLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7OzBCQUUxQyxPQUFPLEdBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFFN0MsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDL0c7cUJBQU07b0JBRUwsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUMvQzthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuL2RhdGUudmFsaWRhdG9yJztcblxuZXhwb3J0IGNsYXNzIE1pbkRhdGVWYWxpZGF0b3Ige1xuXG4gIHZhbGlkYXRlKG1pbjogRGF0ZSkge1xuXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgaWYgKCFuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlKGNvbnRyb2wudmFsdWUpKSB7XG5cbiAgICAgICAgICBjb25zdCBuZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoY29udHJvbC52YWx1ZSk7XG5cbiAgICAgICAgICByZXR1cm4gbmV3RGF0ZS5nZXRUaW1lKCkgPCBtaW4uZ2V0VGltZSgpID8geyAnbWluZGF0ZSc6IHsgJ3JlcXVpcmVkRGF0ZSc6IG1pbiwgYWN0dWFsRGF0ZTogbmV3RGF0ZSB9IH0gOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgcmV0dXJuIHsgJ21pbmRhdGUnOiB7ICdyZXF1aXJlZERhdGUnOiBtaW4gfSB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==