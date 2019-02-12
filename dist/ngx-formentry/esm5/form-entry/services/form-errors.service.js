/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var FormErrorsService = /** @class */ (function () {
    function FormErrorsService() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    FormErrorsService.prototype.announceErrorField = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.announceErrorFieldSource.next(error);
    };
    // Observable string sources
    FormErrorsService.control = null;
    FormErrorsService.tab = null;
    FormErrorsService.decorators = [
        { type: Injectable },
    ];
    return FormErrorsService;
}());
export { FormErrorsService };
if (false) {
    /** @type {?} */
    FormErrorsService.control;
    /** @type {?} */
    FormErrorsService.tab;
    /** @type {?} */
    FormErrorsService.prototype.announceErrorFieldSource;
    /** @type {?} */
    FormErrorsService.prototype.announceErrorField$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTS9CO0lBQUE7UUFNUyw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2pELHdCQUFtQixHQUFvQixJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFJN0YsQ0FBQzs7Ozs7SUFIUSw4Q0FBa0I7Ozs7SUFBekIsVUFBMEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFQRCw0QkFBNEI7SUFDZCx5QkFBTyxHQUFrRCxJQUFJLENBQUM7SUFDOUQscUJBQUcsR0FBVyxJQUFJLENBQUM7O2dCQUxsQyxVQUFVOztJQVdYLHdCQUFDO0NBQUEsQUFYRCxJQVdDO1NBVlksaUJBQWlCOzs7SUFHNUIsMEJBQTRFOztJQUM1RSxzQkFBaUM7O0lBQ2pDLHFEQUF3RDs7SUFDeEQsZ0RBQTJGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXBpJztcbmltcG9ydCB7IEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1FcnJvcnNTZXJ2aWNlIHtcblxuICAvLyBPYnNlcnZhYmxlIHN0cmluZyBzb3VyY2VzXG4gIHB1YmxpYyBzdGF0aWMgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgID0gbnVsbDtcbiAgcHVibGljIHN0YXRpYyB0YWI6IG51bWJlciA9IG51bGw7XG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGRTb3VyY2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGQkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmFubm91bmNlRXJyb3JGaWVsZFNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgcHVibGljIGFubm91bmNlRXJyb3JGaWVsZChlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5hbm5vdW5jZUVycm9yRmllbGRTb3VyY2UubmV4dChlcnJvcik7XG4gIH1cbn1cbiJdfQ==