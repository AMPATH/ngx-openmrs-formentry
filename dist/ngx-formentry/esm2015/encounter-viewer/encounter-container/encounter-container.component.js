/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
export class EncounterContainerComponent {
    /**
     * @param {?} encAdapter
     */
    constructor(encAdapter) {
        this.encAdapter = encAdapter;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this.$form = form;
    }
    /**
     * @param {?} enc
     * @return {?}
     */
    set encounter(enc) {
        this.$enc = enc;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
EncounterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-renderer',
                template: `<encounter-viewer class="card" [form]="$form" [encounter]="$enc"></encounter-viewer>


`,
                styles: [`.card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}`]
            },] },
];
/** @nocollapse */
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter, },
];
EncounterContainerComponent.propDecorators = {
    "form": [{ type: Input },],
    "encounter": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBU3JGLE1BQU07Ozs7SUFXRixZQUFvQixVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjtLQUFLOzs7OztRQVBqQyxJQUFJLENBQUMsSUFBSTtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7Ozs7O1FBRUYsU0FBUyxDQUFDLEdBQUc7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Ozs7O0lBS3BCLFFBQVE7S0FDUDs7O1lBdEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7OztDQUdiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLDRFQUE0RSxDQUFDO2FBQ3pGOzs7O1lBUlEsZ0JBQWdCOzs7cUJBYXBCLEtBQUs7MEJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybSc7XHJcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZW5jb3VudGVyLXJlbmRlcmVyJyxcclxuICAgIHRlbXBsYXRlOiBgPGVuY291bnRlci12aWV3ZXIgY2xhc3M9XCJjYXJkXCIgW2Zvcm1dPVwiJGZvcm1cIiBbZW5jb3VudGVyXT1cIiRlbmNcIj48L2VuY291bnRlci12aWV3ZXI+XHJcblxyXG5cclxuYCxcclxuICAgIHN0eWxlczogW2AuY2FyZHtib3gtc2hhZG93OjAgMnB4IDVweCAwIHJnYmEoMCwwLDAsLjE2KSwwIDJweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljICRmb3JtOiBGb3JtO1xyXG4gICAgcHVibGljICRlbmM6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGZvcm0oZm9ybSkge1xyXG4gICAgICAgIHRoaXMuJGZvcm0gPSBmb3JtO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jKSB7XHJcbiAgICAgICAgdGhpcy4kZW5jID0gZW5jO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZW5jQWRhcHRlcjogRW5jb3VudGVyQWRhcHRlcikgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcbn1cclxuIl19