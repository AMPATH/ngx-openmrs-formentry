/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
export class EncounterContainerComponent {
    /**
     * @param {?} encAdapter
     * @param {?} encounterPdfViewerService
     */
    constructor(encAdapter, encounterPdfViewerService) {
        this.encAdapter = encAdapter;
        this.encounterPdfViewerService = encounterPdfViewerService;
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
    /**
     * @return {?}
     */
    displayPdf() {
        this.encounterPdfViewerService.displayPdf(this.$form);
    }
}
EncounterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-renderer',
                template: `<a type="button" style="display: block; font-size: 28px; cursor: pointer" class="text-right" (click)="displayPdf()">
  <span class="glyphicon text-primary glyphicon-print"></span>
</a>
<encounter-viewer class="card" [form]="$form" [encounter]="$enc"></encounter-viewer>`,
                styles: [`.card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}`]
            },] },
];
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter },
    { type: EncounterPdfViewerService }
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
    /**
     * @type {?}
     * @private
     */
    EncounterContainerComponent.prototype.encounterPdfViewerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBVTVFLE1BQU07Ozs7O0lBV0YsWUFDWSxVQUE0QixFQUM1Qix5QkFBb0Q7UUFEcEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDNUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtJQUFJLENBQUM7Ozs7O0lBVHJFLElBQW9CLElBQUksQ0FBQyxJQUFJO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFBb0IsU0FBUyxDQUFDLEdBQUc7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQzs7OztJQU1ELFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7cUZBR3VFO2dCQUNqRixNQUFNLEVBQUUsQ0FBQyw0RUFBNEUsQ0FBQzthQUN6Rjs7O1lBWFEsZ0JBQWdCO1lBRWhCLHlCQUF5Qjs7O21CQWM3QixLQUFLO3dCQUdMLEtBQUs7Ozs7SUFOTiw0Q0FBbUI7O0lBQ25CLDJDQUFpQjs7Ozs7SUFVYixpREFBb0M7Ozs7O0lBQ3BDLGdFQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZW5jb3VudGVyLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZTogYDxhIHR5cGU9XCJidXR0b25cIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBmb250LXNpemU6IDI4cHg7IGN1cnNvcjogcG9pbnRlclwiIGNsYXNzPVwidGV4dC1yaWdodFwiIChjbGljayk9XCJkaXNwbGF5UGRmKClcIj5cbiAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gdGV4dC1wcmltYXJ5IGdseXBoaWNvbi1wcmludFwiPjwvc3Bhbj5cbjwvYT5cbjxlbmNvdW50ZXItdmlld2VyIGNsYXNzPVwiY2FyZFwiIFtmb3JtXT1cIiRmb3JtXCIgW2VuY291bnRlcl09XCIkZW5jXCI+PC9lbmNvdW50ZXItdmlld2VyPmAsXG4gICAgc3R5bGVzOiBbYC5jYXJke2JveC1zaGFkb3c6MCAycHggNXB4IDAgcmdiYSgwLDAsMCwuMTYpLDAgMnB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMil9YF1cbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgJGZvcm06IEZvcm07XG4gICAgcHVibGljICRlbmM6IGFueTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZm9ybShmb3JtKSB7XG4gICAgICAgIHRoaXMuJGZvcm0gPSBmb3JtO1xuICAgIH1cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmMpIHtcbiAgICAgICAgdGhpcy4kZW5jID0gZW5jO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVuY0FkYXB0ZXI6IEVuY291bnRlckFkYXB0ZXIsXG4gICAgICAgIHByaXZhdGUgZW5jb3VudGVyUGRmVmlld2VyU2VydmljZTogRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBkaXNwbGF5UGRmKCkge1xuICAgICAgICB0aGlzLmVuY291bnRlclBkZlZpZXdlclNlcnZpY2UuZGlzcGxheVBkZih0aGlzLiRmb3JtKTtcbiAgICB9XG59XG4iXX0=