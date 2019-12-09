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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0VBTUU7O0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQztJQUlJO1FBRk8sY0FBUyxHQUFHLFdBQVcsQ0FBQztJQUcvQixDQUFDO0lBQ0ssdUNBQVksR0FBbkI7UUFFVSx5QkFBeUI7UUFDMUIsT0FBTyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQVZPLGdCQUFnQjtRQUY1QixVQUFVLEVBQUU7O09BRUEsZ0JBQWdCLENBVzVCO0lBQUQsdUJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhpcyBzZXJ2aWNlIGNoZWNrcyBpZiB0aGUgZGVidWcgbW9kZSBvbiBuZzItYW1yc1xuaGFzIGJlZW4gZW5hYmxlZCBieSBjaGVja2luZyBjb29raWVzLlxuSWYgdGhlIGRlYnVnIG1vZGUgaGFzIGJlZW4gZW5hYmxlZCB0aGVuXG5pdCByZXR1cm5zIHRydWUgYW5kIGFsbCBmaWVsZHMgYXJlIGRpc3BsYXllZFxuZm9yIHVzZSBieSB0ZXN0ZXJzXG4qL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIERlYnVnTW9kZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGNvb2tpZUtleSA9ICdmb3JtRGVidWcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgcHVibGljIGRlYnVnRW5hYmxlZCgpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBoaWRlZmllbGRcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgfVxufVxuIl19