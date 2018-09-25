/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/
import { Injectable } from '@angular/core';
export class DebugModeService {
    constructor() {
        this.cookieKey = 'formDebug';
    }
    /**
     * @return {?}
     */
    debugEnabled() {
        // check if the hidefield
        return false;
    }
}
DebugModeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DebugModeService.ctorParameters = () => [];
function DebugModeService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DebugModeService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DebugModeService.ctorParameters;
    /** @type {?} */
    DebugModeService.prototype.cookieKey;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07SUFJRjt5QkFGbUIsV0FBVztLQUc3Qjs7OztJQUNLLFlBQVk7O1FBR1YsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQVh4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuVGhpcyBzZXJ2aWNlIGNoZWNrcyBpZiB0aGUgZGVidWcgbW9kZSBvbiBuZzItYW1yc1xyXG5oYXMgYmVlbiBlbmFibGVkIGJ5IGNoZWNraW5nIGNvb2tpZXMuXHJcbklmIHRoZSBkZWJ1ZyBtb2RlIGhhcyBiZWVuIGVuYWJsZWQgdGhlblxyXG5pdCByZXR1cm5zIHRydWUgYW5kIGFsbCBmaWVsZHMgYXJlIGRpc3BsYXllZFxyXG5mb3IgdXNlIGJ5IHRlc3RlcnNcclxuKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWJ1Z01vZGVTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgY29va2llS2V5ID0gJ2Zvcm1EZWJ1Zyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbiAgIHB1YmxpYyBkZWJ1Z0VuYWJsZWQoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGhpZGVmaWVsZFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgfVxyXG59XHJcbiJdfQ==