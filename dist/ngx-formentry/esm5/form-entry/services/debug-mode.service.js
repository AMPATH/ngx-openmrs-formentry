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
    /** @nocollapse */
    DebugModeService.ctorParameters = function () { return []; };
    return DebugModeService;
}());
export { DebugModeService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0VBTUU7QUFFRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBSUU7UUFGTyxjQUFTLEdBQUcsV0FBVyxDQUFDO0lBRWhCLENBQUM7SUFDVCx1Q0FBWSxHQUFuQjtRQUNFLHlCQUF5QjtRQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBUkYsVUFBVTs7OztJQVNYLHVCQUFDO0NBQUEsQUFURCxJQVNDO1NBUlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoaXMgc2VydmljZSBjaGVja3MgaWYgdGhlIGRlYnVnIG1vZGUgb24gbmcyLWFtcnNcbmhhcyBiZWVuIGVuYWJsZWQgYnkgY2hlY2tpbmcgY29va2llcy5cbklmIHRoZSBkZWJ1ZyBtb2RlIGhhcyBiZWVuIGVuYWJsZWQgdGhlblxuaXQgcmV0dXJucyB0cnVlIGFuZCBhbGwgZmllbGRzIGFyZSBkaXNwbGF5ZWRcbmZvciB1c2UgYnkgdGVzdGVyc1xuKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVidWdNb2RlU2VydmljZSB7XG4gIHB1YmxpYyBjb29raWVLZXkgPSAnZm9ybURlYnVnJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHB1YmxpYyBkZWJ1Z0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gY2hlY2sgaWYgdGhlIGhpZGVmaWVsZFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19