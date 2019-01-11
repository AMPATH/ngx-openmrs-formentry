/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        { type: Injectable }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTS9CO0lBQUE7UUFNUyw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2pELHdCQUFtQixHQUFvQixJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFJN0YsQ0FBQzs7Ozs7SUFIUSw4Q0FBa0I7Ozs7SUFBekIsVUFBMEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7O0lBTmEseUJBQU8sR0FBa0QsSUFBSSxDQUFDO0lBQzlELHFCQUFHLEdBQVcsSUFBSSxDQUFDOztnQkFMbEMsVUFBVTs7SUFXWCx3QkFBQztDQUFBLEFBWEQsSUFXQztTQVZZLGlCQUFpQjs7O0lBRzVCLDBCQUE0RTs7SUFDNUUsc0JBQWlDOztJQUNqQyxxREFBd0Q7O0lBQ3hELGdEQUEyRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vcHVibGljX2FwaSc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtRXJyb3JzU2VydmljZSB7XG5cbiAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc291cmNlc1xuICBwdWJsaWMgc3RhdGljIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwICA9IG51bGw7XG4gIHB1YmxpYyBzdGF0aWMgdGFiOiBudW1iZXIgPSBudWxsO1xuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5hbm5vdW5jZUVycm9yRmllbGRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGQoZXJyb3I6IHN0cmluZykge1xuICAgIHRoaXMuYW5ub3VuY2VFcnJvckZpZWxkU291cmNlLm5leHQoZXJyb3IpO1xuICB9XG59XG4iXX0=