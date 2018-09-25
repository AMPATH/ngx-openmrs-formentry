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
var DebugModeService = /** @class */ (function () {
    function DebugModeService() {
        this.cookieKey = 'formDebug';
    }
    /**
     * @return {?}
     */
    DebugModeService.prototype.debugEnabled = /**
     * @return {?}
     */
    function () {
        // check if the hidefield
        return false;
    };
    DebugModeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DebugModeService.ctorParameters = function () { return []; };
    return DebugModeService;
}());
export { DebugModeService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQVF2Qzt5QkFGbUIsV0FBVztLQUc3Qjs7OztJQUNLLHVDQUFZOzs7OztRQUdWLE1BQU0sQ0FBQyxLQUFLLENBQUM7OztnQkFYeEIsVUFBVTs7OzsyQkFWWDs7U0FZYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5UaGlzIHNlcnZpY2UgY2hlY2tzIGlmIHRoZSBkZWJ1ZyBtb2RlIG9uIG5nMi1hbXJzXHJcbmhhcyBiZWVuIGVuYWJsZWQgYnkgY2hlY2tpbmcgY29va2llcy5cclxuSWYgdGhlIGRlYnVnIG1vZGUgaGFzIGJlZW4gZW5hYmxlZCB0aGVuXHJcbml0IHJldHVybnMgdHJ1ZSBhbmQgYWxsIGZpZWxkcyBhcmUgZGlzcGxheWVkXHJcbmZvciB1c2UgYnkgdGVzdGVyc1xyXG4qL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5cclxuZXhwb3J0IGNsYXNzIERlYnVnTW9kZVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb29raWVLZXkgPSAnZm9ybURlYnVnJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgcHVibGljIGRlYnVnRW5hYmxlZCgpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgaGlkZWZpZWxkXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICB9XHJcbn1cclxuIl19