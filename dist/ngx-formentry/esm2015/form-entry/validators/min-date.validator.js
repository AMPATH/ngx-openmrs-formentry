/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                    const /** @type {?} */ newDate = new Date(control.value);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE1BQU07Ozs7O0lBRUosUUFBUSxDQUFDLEdBQVM7UUFFaEIsTUFBTSxDQUFDLENBQUMsT0FBdUIsRUFBMEIsRUFBRTtZQUV6RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWpELHVCQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDL0c7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRU4sTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQy9DO2FBQ0Y7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztLQUNIO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4vZGF0ZS52YWxpZGF0b3InO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbkRhdGVWYWxpZGF0b3Ige1xyXG5cclxuICB2YWxpZGF0ZShtaW46IERhdGUpIHtcclxuXHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XHJcblxyXG4gICAgICBpZiAoY29udHJvbC5oaWRkZW4pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgICAgaWYgKCFuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlKGNvbnRyb2wudmFsdWUpKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgbmV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGNvbnRyb2wudmFsdWUpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBuZXdEYXRlLmdldFRpbWUoKSA8IG1pbi5nZXRUaW1lKCkgPyB7ICdtaW5kYXRlJzogeyAncmVxdWlyZWREYXRlJzogbWluLCBhY3R1YWxEYXRlOiBuZXdEYXRlIH0gfSA6IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4geyAnbWluZGF0ZSc6IHsgJ3JlcXVpcmVkRGF0ZSc6IG1pbiB9IH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==