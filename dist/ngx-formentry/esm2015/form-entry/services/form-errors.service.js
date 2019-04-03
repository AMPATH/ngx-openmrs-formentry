/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class FormErrorsService {
    constructor() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    announceErrorField(error) {
        this.announceErrorFieldSource.next(error);
    }
}
// Observable string sources
FormErrorsService.control = null;
FormErrorsService.tab = null;
FormErrorsService.decorators = [
    { type: Injectable },
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTy9CLE1BQU07SUFETjtRQU1TLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDakQsd0JBQW1CLEdBQW9CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUk3RixDQUFDOzs7OztJQUhRLGtCQUFrQixDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOztBQVBELDRCQUE0QjtBQUNkLHlCQUFPLEdBQWtELElBQUksQ0FBQztBQUM5RCxxQkFBRyxHQUFXLElBQUksQ0FBQzs7WUFMbEMsVUFBVTs7OztJQUlULDBCQUE0RTs7SUFDNUUsc0JBQWlDOztJQUNqQyxxREFBd0Q7O0lBQ3hELGdEQUEyRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXBpJztcclxuaW1wb3J0IHsgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yc1NlcnZpY2Uge1xyXG5cclxuICAvLyBPYnNlcnZhYmxlIHN0cmluZyBzb3VyY2VzXHJcbiAgcHVibGljIHN0YXRpYyBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCAgPSBudWxsO1xyXG4gIHB1YmxpYyBzdGF0aWMgdGFiOiBudW1iZXIgPSBudWxsO1xyXG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGRTb3VyY2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcbiAgcHVibGljIGFubm91bmNlRXJyb3JGaWVsZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYW5ub3VuY2VFcnJvckZpZWxkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGQoZXJyb3I6IHN0cmluZykge1xyXG4gICAgdGhpcy5hbm5vdW5jZUVycm9yRmllbGRTb3VyY2UubmV4dChlcnJvcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==