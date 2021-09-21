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
    debugEnabled() {
        // check if the hidefield
        return false;
    }
}
DebugModeService.decorators = [
    { type: Injectable },
];
DebugModeService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztFQU1FO0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNO0lBR0o7UUFGTyxjQUFTLEdBQUcsV0FBVyxDQUFDO0lBRWhCLENBQUM7SUFDVCxZQUFZO1FBQ2pCLHlCQUF5QjtRQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBUkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGlzIHNlcnZpY2UgY2hlY2tzIGlmIHRoZSBkZWJ1ZyBtb2RlIG9uIG5nMi1hbXJzXG5oYXMgYmVlbiBlbmFibGVkIGJ5IGNoZWNraW5nIGNvb2tpZXMuXG5JZiB0aGUgZGVidWcgbW9kZSBoYXMgYmVlbiBlbmFibGVkIHRoZW5cbml0IHJldHVybnMgdHJ1ZSBhbmQgYWxsIGZpZWxkcyBhcmUgZGlzcGxheWVkXG5mb3IgdXNlIGJ5IHRlc3RlcnNcbiovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlYnVnTW9kZVNlcnZpY2Uge1xuICBwdWJsaWMgY29va2llS2V5ID0gJ2Zvcm1EZWJ1Zyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuICBwdWJsaWMgZGVidWdFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIC8vIGNoZWNrIGlmIHRoZSBoaWRlZmllbGRcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==