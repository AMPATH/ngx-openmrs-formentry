/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
var EncounterContainerComponent = /** @class */ (function () {
    function EncounterContainerComponent(encAdapter) {
        this.encAdapter = encAdapter;
    }
    Object.defineProperty(EncounterContainerComponent.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this.$form = form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterContainerComponent.prototype, "encounter", {
        set: /**
         * @param {?} enc
         * @return {?}
         */
        function (enc) {
            this.$enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    EncounterContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    EncounterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-renderer',
                    template: "<encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>\n\n\n",
                    styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
                },] },
    ];
    /** @nocollapse */
    EncounterContainerComponent.ctorParameters = function () { return [
        { type: EncounterAdapter, },
    ]; };
    EncounterContainerComponent.propDecorators = {
        "form": [{ type: Input },],
        "encounter": [{ type: Input },],
    };
    return EncounterContainerComponent;
}());
export { EncounterContainerComponent };
function EncounterContainerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterContainerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterContainerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    EncounterContainerComponent.propDecorators;
    /** @type {?} */
    EncounterContainerComponent.prototype.$form;
    /** @type {?} */
    EncounterContainerComponent.prototype.$enc;
    /** @type {?} */
    EncounterContainerComponent.prototype.encAdapter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDOztJQW9CakYscUNBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0tBQUs7MEJBUGpDLDZDQUFJOzs7OztrQkFBQyxJQUFJO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7OzswQkFFRixrREFBUzs7Ozs7a0JBQUMsR0FBRztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7SUFLcEIsOENBQVE7OztJQUFSO0tBQ0M7O2dCQXRCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGtHQUdiO29CQUNHLE1BQU0sRUFBRSxDQUFDLDRFQUE0RSxDQUFDO2lCQUN6Rjs7OztnQkFSUSxnQkFBZ0I7Ozt5QkFhcEIsS0FBSzs4QkFHTCxLQUFLOztzQ0FuQlY7O1NBWWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcclxuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9lbmNvdW50ZXIuYWRhcHRlcic7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdlbmNvdW50ZXItcmVuZGVyZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZW5jb3VudGVyLXZpZXdlciBjbGFzcz1cImNhcmRcIiBbZm9ybV09XCIkZm9ybVwiIFtlbmNvdW50ZXJdPVwiJGVuY1wiPjwvZW5jb3VudGVyLXZpZXdlcj5cclxuXHJcblxyXG5gLFxyXG4gICAgc3R5bGVzOiBbYC5jYXJke2JveC1zaGFkb3c6MCAycHggNXB4IDAgcmdiYSgwLDAsMCwuMTYpLDAgMnB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMil9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgJGZvcm06IEZvcm07XHJcbiAgICBwdWJsaWMgJGVuYzogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZm9ybShmb3JtKSB7XHJcbiAgICAgICAgdGhpcy4kZm9ybSA9IGZvcm07XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmMpIHtcclxuICAgICAgICB0aGlzLiRlbmMgPSBlbmM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxufVxyXG4iXX0=