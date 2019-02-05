/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * moment.pipe
 */
import { Pipe } from '@angular/core';
export class MomentPipe {
    /**
     * @param {?} moment
     * @param {?=} format
     * @return {?}
     */
    transform(moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    }
}
MomentPipe.decorators = [
    { type: Pipe, args: [{ name: 'moment' },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU07Ozs7OztJQUNGLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBZTtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQUxKLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1vbWVudC5waXBlXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbkBQaXBlKHtuYW1lOiAnbW9tZW50J30pXG5cbmV4cG9ydCBjbGFzcyBNb21lbnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKG1vbWVudDogTW9tZW50LCBmb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZm9ybWF0ID8gbW9tZW50LmZvcm1hdChmb3JtYXQpIDogbW9tZW50LmZvcm1hdCgnTU1NIERELCBZWVlZJyk7XG4gICAgfVxufVxuIl19