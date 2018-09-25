/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function MomentPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MomentPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MomentPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU07Ozs7OztJQUNGLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBZTtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3pFOzs7WUFMSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIG1vbWVudC5waXBlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcclxuXHJcbkBQaXBlKHtuYW1lOiAnbW9tZW50J30pXHJcblxyXG5leHBvcnQgY2xhc3MgTW9tZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKG1vbWVudDogTW9tZW50LCBmb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBtb21lbnQuZm9ybWF0KGZvcm1hdCkgOiBtb21lbnQuZm9ybWF0KCdNTU0gREQsIFlZWVknKTtcclxuICAgIH1cclxufVxyXG4iXX0=