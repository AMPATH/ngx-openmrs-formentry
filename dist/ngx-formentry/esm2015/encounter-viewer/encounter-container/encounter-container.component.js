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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBVTVFLE1BQU07Ozs7O0lBV0YsWUFDWSxVQUE0QixFQUM1Qix5QkFBb0Q7UUFEcEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDNUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtJQUFJLENBQUM7Ozs7O0lBVHJFLElBQW9CLElBQUksQ0FBQyxJQUFJO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFBb0IsU0FBUyxDQUFDLEdBQUc7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQzs7OztJQU1ELFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7cUZBR3VFO2dCQUNqRixNQUFNLEVBQUUsQ0FBQyw0RUFBNEUsQ0FBQzthQUN6Rjs7O1lBWFEsZ0JBQWdCO1lBRWhCLHlCQUF5Qjs7O21CQWM3QixLQUFLO3dCQUdMLEtBQUs7Ozs7SUFOTiw0Q0FBbUI7O0lBQ25CLDJDQUFpQjs7Ozs7SUFVYixpREFBb0M7Ozs7O0lBQ3BDLGdFQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybSc7XHJcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xyXG5cclxuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxhIHR5cGU9XCJidXR0b25cIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBmb250LXNpemU6IDI4cHg7IGN1cnNvcjogcG9pbnRlclwiIGNsYXNzPVwidGV4dC1yaWdodFwiIChjbGljayk9XCJkaXNwbGF5UGRmKClcIj5cclxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiB0ZXh0LXByaW1hcnkgZ2x5cGhpY29uLXByaW50XCI+PC9zcGFuPlxyXG48L2E+XHJcbjxlbmNvdW50ZXItdmlld2VyIGNsYXNzPVwiY2FyZFwiIFtmb3JtXT1cIiRmb3JtXCIgW2VuY291bnRlcl09XCIkZW5jXCI+PC9lbmNvdW50ZXItdmlld2VyPmAsXHJcbiAgICBzdHlsZXM6IFtgLmNhcmR7Ym94LXNoYWRvdzowIDJweCA1cHggMCByZ2JhKDAsMCwwLC4xNiksMCAycHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyAkZm9ybTogRm9ybTtcclxuICAgIHB1YmxpYyAkZW5jOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgcHVibGljIHNldCBmb3JtKGZvcm0pIHtcclxuICAgICAgICB0aGlzLiRmb3JtID0gZm9ybTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYykge1xyXG4gICAgICAgIHRoaXMuJGVuYyA9IGVuYztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVuY0FkYXB0ZXI6IEVuY291bnRlckFkYXB0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBlbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5UGRmKCkge1xyXG4gICAgICAgIHRoaXMuZW5jb3VudGVyUGRmVmlld2VyU2VydmljZS5kaXNwbGF5UGRmKHRoaXMuJGZvcm0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==