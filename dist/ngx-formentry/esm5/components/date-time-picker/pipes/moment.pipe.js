/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * moment.pipe
 */
import { Pipe } from '@angular/core';
var MomentPipe = /** @class */ (function () {
    function MomentPipe() {
    }
    /**
     * @param {?} moment
     * @param {?=} format
     * @return {?}
     */
    MomentPipe.prototype.transform = /**
     * @param {?} moment
     * @param {?=} format
     * @return {?}
     */
    function (moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    };
    MomentPipe.decorators = [
        { type: Pipe, args: [{ name: 'moment' },] },
    ];
    return MomentPipe;
}());
export { MomentPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFNQSxDQUFDOzs7Ozs7SUFIRyw4QkFBUzs7Ozs7SUFBVCxVQUFVLE1BQWMsRUFBRSxNQUFlO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Z0JBTEosSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQzs7SUFNdEIsaUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FKWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIG1vbWVudC5waXBlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcclxuXHJcbkBQaXBlKHtuYW1lOiAnbW9tZW50J30pXHJcblxyXG5leHBvcnQgY2xhc3MgTW9tZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKG1vbWVudDogTW9tZW50LCBmb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBtb21lbnQuZm9ybWF0KGZvcm1hdCkgOiBtb21lbnQuZm9ybWF0KCdNTU0gREQsIFlZWVknKTtcclxuICAgIH1cclxufVxyXG4iXX0=