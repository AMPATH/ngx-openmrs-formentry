/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
DebugModeService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    DebugModeService.prototype.cookieKey;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07SUFJRjtRQUZPLGNBQVMsR0FBRyxXQUFXLENBQUM7SUFHL0IsQ0FBQzs7OztJQUNLLFlBQVk7UUFFVCx5QkFBeUI7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7WUFaTCxVQUFVOzs7OztJQUlQLHFDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcblRoaXMgc2VydmljZSBjaGVja3MgaWYgdGhlIGRlYnVnIG1vZGUgb24gbmcyLWFtcnNcclxuaGFzIGJlZW4gZW5hYmxlZCBieSBjaGVja2luZyBjb29raWVzLlxyXG5JZiB0aGUgZGVidWcgbW9kZSBoYXMgYmVlbiBlbmFibGVkIHRoZW5cclxuaXQgcmV0dXJucyB0cnVlIGFuZCBhbGwgZmllbGRzIGFyZSBkaXNwbGF5ZWRcclxuZm9yIHVzZSBieSB0ZXN0ZXJzXHJcbiovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgRGVidWdNb2RlU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvb2tpZUtleSA9ICdmb3JtRGVidWcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG4gICBwdWJsaWMgZGVidWdFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBoaWRlZmllbGRcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgIH1cclxufVxyXG4iXX0=