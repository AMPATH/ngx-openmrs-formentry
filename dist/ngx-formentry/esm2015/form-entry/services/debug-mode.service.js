/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DebugModeService = class DebugModeService {
    constructor() {
        this.cookieKey = 'formDebug';
    }
    debugEnabled() {
        // check if the hidefield
        return false;
    }
};
DebugModeService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], DebugModeService);
export { DebugModeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztFQU1FOztBQUVGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFJekI7UUFGTyxjQUFTLEdBQUcsV0FBVyxDQUFDO0lBRy9CLENBQUM7SUFDSyxZQUFZO1FBRVQseUJBQXlCO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDTCxDQUFBO0FBWFksZ0JBQWdCO0lBRjVCLFVBQVUsRUFBRTs7R0FFQSxnQkFBZ0IsQ0FXNUI7U0FYWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhpcyBzZXJ2aWNlIGNoZWNrcyBpZiB0aGUgZGVidWcgbW9kZSBvbiBuZzItYW1yc1xuaGFzIGJlZW4gZW5hYmxlZCBieSBjaGVja2luZyBjb29raWVzLlxuSWYgdGhlIGRlYnVnIG1vZGUgaGFzIGJlZW4gZW5hYmxlZCB0aGVuXG5pdCByZXR1cm5zIHRydWUgYW5kIGFsbCBmaWVsZHMgYXJlIGRpc3BsYXllZFxuZm9yIHVzZSBieSB0ZXN0ZXJzXG4qL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIERlYnVnTW9kZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGNvb2tpZUtleSA9ICdmb3JtRGVidWcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgcHVibGljIGRlYnVnRW5hYmxlZCgpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBoaWRlZmllbGRcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgfVxufVxuIl19