/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                template: "<encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>\n\n\n",
                styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
            }] }
];
/** @nocollapse */
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter }
];
EncounterContainerComponent.propDecorators = {
    form: [{ type: Input }],
    encounter: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    EncounterContainerComponent.prototype.$form;
    /** @type {?} */
    EncounterContainerComponent.prototype.$enc;
    /**
     * @type {?}
     * @private
     */
    EncounterContainerComponent.prototype.encAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBTXJGLE1BQU0sT0FBTywyQkFBMkI7Ozs7SUFXcEMsWUFBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFBSSxDQUFDOzs7OztJQVByRCxJQUFvQixJQUFJLENBQUMsSUFBSTtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7OztJQUNELElBQW9CLFNBQVMsQ0FBQyxHQUFHO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFJRCxRQUFRO0lBQ1IsQ0FBQzs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw0R0FBbUQ7O2FBRXREOzs7O1lBTFEsZ0JBQWdCOzs7bUJBVXBCLEtBQUs7d0JBR0wsS0FBSzs7OztJQU5OLDRDQUFtQjs7SUFDbkIsMkNBQWlCOzs7OztJQVNMLGlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlbmNvdW50ZXItcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyAkZm9ybTogRm9ybTtcbiAgICBwdWJsaWMgJGVuYzogYW55O1xuXG4gICAgQElucHV0KCkgcHVibGljIHNldCBmb3JtKGZvcm0pIHtcbiAgICAgICAgdGhpcy4kZm9ybSA9IGZvcm07XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYykge1xuICAgICAgICB0aGlzLiRlbmMgPSBlbmM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cbn1cbiJdfQ==