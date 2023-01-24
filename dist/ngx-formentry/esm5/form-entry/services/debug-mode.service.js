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
    DebugModeService.prototype.debugEnabled = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztFQU1FO0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUlFO1FBRk8sY0FBUyxHQUFHLFdBQVcsQ0FBQztJQUVoQixDQUFDO0lBQ1QsdUNBQVksR0FBbkI7UUFDRSx5QkFBeUI7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQVJGLFVBQVU7OztJQVNYLHVCQUFDO0NBQUEsQUFURCxJQVNDO1NBUlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoaXMgc2VydmljZSBjaGVja3MgaWYgdGhlIGRlYnVnIG1vZGUgb24gbmcyLWFtcnNcbmhhcyBiZWVuIGVuYWJsZWQgYnkgY2hlY2tpbmcgY29va2llcy5cbklmIHRoZSBkZWJ1ZyBtb2RlIGhhcyBiZWVuIGVuYWJsZWQgdGhlblxuaXQgcmV0dXJucyB0cnVlIGFuZCBhbGwgZmllbGRzIGFyZSBkaXNwbGF5ZWRcbmZvciB1c2UgYnkgdGVzdGVyc1xuKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVidWdNb2RlU2VydmljZSB7XG4gIHB1YmxpYyBjb29raWVLZXkgPSAnZm9ybURlYnVnJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHB1YmxpYyBkZWJ1Z0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gY2hlY2sgaWYgdGhlIGhpZGVmaWVsZFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19