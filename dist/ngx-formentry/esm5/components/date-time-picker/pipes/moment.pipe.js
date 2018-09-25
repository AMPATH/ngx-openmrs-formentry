/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function MomentPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MomentPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MomentPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7SUFNaEQsOEJBQVM7Ozs7O0lBQVQsVUFBVSxNQUFjLEVBQUUsTUFBZTtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3pFOztnQkFMSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDOztxQkFQdEI7O1NBU2EsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBtb21lbnQucGlwZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XHJcblxyXG5AUGlwZSh7bmFtZTogJ21vbWVudCd9KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vbWVudFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybShtb21lbnQ6IE1vbWVudCwgZm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gZm9ybWF0ID8gbW9tZW50LmZvcm1hdChmb3JtYXQpIDogbW9tZW50LmZvcm1hdCgnTU1NIERELCBZWVlZJyk7XHJcbiAgICB9XHJcbn1cclxuIl19