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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0VBTUU7O0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUl6QjtRQUZPLGNBQVMsR0FBRyxXQUFXLENBQUM7SUFHL0IsQ0FBQztJQUNLLFlBQVk7UUFFVCx5QkFBeUI7UUFDMUIsT0FBTyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNMLENBQUE7QUFYWSxnQkFBZ0I7SUFGNUIsVUFBVSxFQUFFOztHQUVBLGdCQUFnQixDQVc1QjtTQVhZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGlzIHNlcnZpY2UgY2hlY2tzIGlmIHRoZSBkZWJ1ZyBtb2RlIG9uIG5nMi1hbXJzXG5oYXMgYmVlbiBlbmFibGVkIGJ5IGNoZWNraW5nIGNvb2tpZXMuXG5JZiB0aGUgZGVidWcgbW9kZSBoYXMgYmVlbiBlbmFibGVkIHRoZW5cbml0IHJldHVybnMgdHJ1ZSBhbmQgYWxsIGZpZWxkcyBhcmUgZGlzcGxheWVkXG5mb3IgdXNlIGJ5IHRlc3RlcnNcbiovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgRGVidWdNb2RlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgY29va2llS2V5ID0gJ2Zvcm1EZWJ1Zyc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICBwdWJsaWMgZGVidWdFbmFibGVkKCk6IGJvb2xlYW4ge1xuXG4gICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGhpZGVmaWVsZFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICB9XG59XG4iXX0=