/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    FormErrorsService.control = null;
    FormErrorsService.tab = null;
    FormErrorsService.decorators = [
        { type: Injectable },
    ];
    return FormErrorsService;
}());
export { FormErrorsService };
function FormErrorsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormErrorsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormErrorsService.ctorParameters;
    /** @type {?} */
    FormErrorsService.control;
    /** @type {?} */
    FormErrorsService.tab;
    /** @type {?} */
    FormErrorsService.prototype.announceErrorFieldSource;
    /** @type {?} */
    FormErrorsService.prototype.announceErrorField$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7d0NBWUssSUFBSSxPQUFPLEVBQVU7bUNBQ1QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRTs7Ozs7O0lBQ25GLDhDQUFrQjs7OztjQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0NBTDJCLElBQUk7NEJBQy9DLElBQUk7O2dCQUxqQyxVQUFVOzs0QkFQWDs7U0FRYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vcHVibGljX2FwaSc7XHJcbmltcG9ydCB7IEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1FcnJvcnNTZXJ2aWNlIHtcclxuXHJcbiAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc291cmNlc1xyXG4gIHB1YmxpYyBzdGF0aWMgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgID0gbnVsbDtcclxuICBwdWJsaWMgc3RhdGljIHRhYjogbnVtYmVyID0gbnVsbDtcclxuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gIHB1YmxpYyBhbm5vdW5jZUVycm9yRmllbGQkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmFubm91bmNlRXJyb3JGaWVsZFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICBwdWJsaWMgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYW5ub3VuY2VFcnJvckZpZWxkU291cmNlLm5leHQoZXJyb3IpO1xyXG4gIH1cclxufVxyXG4iXX0=