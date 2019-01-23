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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07SUFJRjtRQUZPLGNBQVMsR0FBRyxXQUFXLENBQUM7SUFHL0IsQ0FBQzs7OztJQUNLLFlBQVk7UUFFVCx5QkFBeUI7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7WUFaTCxVQUFVOzs7OztJQUlQLHFDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGlzIHNlcnZpY2UgY2hlY2tzIGlmIHRoZSBkZWJ1ZyBtb2RlIG9uIG5nMi1hbXJzXG5oYXMgYmVlbiBlbmFibGVkIGJ5IGNoZWNraW5nIGNvb2tpZXMuXG5JZiB0aGUgZGVidWcgbW9kZSBoYXMgYmVlbiBlbmFibGVkIHRoZW5cbml0IHJldHVybnMgdHJ1ZSBhbmQgYWxsIGZpZWxkcyBhcmUgZGlzcGxheWVkXG5mb3IgdXNlIGJ5IHRlc3RlcnNcbiovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgRGVidWdNb2RlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgY29va2llS2V5ID0gJ2Zvcm1EZWJ1Zyc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICBwdWJsaWMgZGVidWdFbmFibGVkKCk6IGJvb2xlYW4ge1xuXG4gICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGhpZGVmaWVsZFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICB9XG59XG4iXX0=