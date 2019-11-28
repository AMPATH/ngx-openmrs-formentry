/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DebugModeService = /** @class */ (function () {
    function DebugModeService() {
        this.cookieKey = 'formDebug';
    }
    DebugModeService.prototype.debugEnabled = function () {
        // check if the hidefield
        return false;
    };
    DebugModeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], DebugModeService);
    return DebugModeService;
}());
export { DebugModeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztFQU1FOztBQUVGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0M7SUFJSTtRQUZPLGNBQVMsR0FBRyxXQUFXLENBQUM7SUFHL0IsQ0FBQztJQUNLLHVDQUFZLEdBQW5CO1FBRVUseUJBQXlCO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFWTyxnQkFBZ0I7UUFGNUIsVUFBVSxFQUFFOztPQUVBLGdCQUFnQixDQVc1QjtJQUFELHVCQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoaXMgc2VydmljZSBjaGVja3MgaWYgdGhlIGRlYnVnIG1vZGUgb24gbmcyLWFtcnNcbmhhcyBiZWVuIGVuYWJsZWQgYnkgY2hlY2tpbmcgY29va2llcy5cbklmIHRoZSBkZWJ1ZyBtb2RlIGhhcyBiZWVuIGVuYWJsZWQgdGhlblxuaXQgcmV0dXJucyB0cnVlIGFuZCBhbGwgZmllbGRzIGFyZSBkaXNwbGF5ZWRcbmZvciB1c2UgYnkgdGVzdGVyc1xuKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z01vZGVTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBjb29raWVLZXkgPSAnZm9ybURlYnVnJztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgIHB1YmxpYyBkZWJ1Z0VuYWJsZWQoKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgaGlkZWZpZWxkXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgIH1cbn1cbiJdfQ==