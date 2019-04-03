/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU07Ozs7OztJQUNGLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBZTtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQUxKLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogbW9tZW50LnBpcGVcclxuICovXHJcblxyXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xyXG5cclxuQFBpcGUoe25hbWU6ICdtb21lbnQnfSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNb21lbnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0obW9tZW50OiBNb21lbnQsIGZvcm1hdD86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IG1vbWVudC5mb3JtYXQoZm9ybWF0KSA6IG1vbWVudC5mb3JtYXQoJ01NTSBERCwgWVlZWScpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==