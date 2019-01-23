/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    DebugModeService.ctorParameters = function () { return []; };
    return DebugModeService;
}());
export { DebugModeService };
if (false) {
    /** @type {?} */
    DebugModeService.prototype.cookieKey;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBTUk7UUFGTyxjQUFTLEdBQUcsV0FBVyxDQUFDO0lBRy9CLENBQUM7Ozs7SUFDSyx1Q0FBWTs7O0lBQW5CO1FBRVUseUJBQXlCO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Z0JBWkwsVUFBVTs7O0lBYVgsdUJBQUM7Q0FBQSxBQWJELElBYUM7U0FYWSxnQkFBZ0I7OztJQUV6QixxQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhpcyBzZXJ2aWNlIGNoZWNrcyBpZiB0aGUgZGVidWcgbW9kZSBvbiBuZzItYW1yc1xuaGFzIGJlZW4gZW5hYmxlZCBieSBjaGVja2luZyBjb29raWVzLlxuSWYgdGhlIGRlYnVnIG1vZGUgaGFzIGJlZW4gZW5hYmxlZCB0aGVuXG5pdCByZXR1cm5zIHRydWUgYW5kIGFsbCBmaWVsZHMgYXJlIGRpc3BsYXllZFxuZm9yIHVzZSBieSB0ZXN0ZXJzXG4qL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIERlYnVnTW9kZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGNvb2tpZUtleSA9ICdmb3JtRGVidWcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgcHVibGljIGRlYnVnRW5hYmxlZCgpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBoaWRlZmllbGRcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgfVxufVxuIl19