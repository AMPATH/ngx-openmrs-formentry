/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
var EncounterContainerComponent = /** @class */ (function () {
    function EncounterContainerComponent(encAdapter, encounterPdfViewerService) {
        this.encAdapter = encAdapter;
        this.encounterPdfViewerService = encounterPdfViewerService;
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
    /**
     * @return {?}
     */
    EncounterContainerComponent.prototype.displayPdf = /**
     * @return {?}
     */
    function () {
        this.encounterPdfViewerService.displayPdf(this.$form);
    };
    EncounterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-renderer',
                    template: "<a type=\"button\" style=\"display: block; font-size: 28px; cursor: pointer\" class=\"text-right\" (click)=\"displayPdf()\">\n  <span class=\"glyphicon text-primary glyphicon-print\"></span>\n</a>\n<encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>",
                    styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
                },] },
    ];
    EncounterContainerComponent.ctorParameters = function () { return [
        { type: EncounterAdapter },
        { type: EncounterPdfViewerService }
    ]; };
    EncounterContainerComponent.propDecorators = {
        form: [{ type: Input }],
        encounter: [{ type: Input }]
    };
    return EncounterContainerComponent;
}());
export { EncounterContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTVFO0lBbUJJLHFDQUNZLFVBQTRCLEVBQzVCLHlCQUFvRDtRQURwRCxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUM1Qiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO0lBQUksQ0FBQztJQVRyRSxzQkFBb0IsNkNBQUk7Ozs7O1FBQXhCLFVBQXlCLElBQUk7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBb0Isa0RBQVM7Ozs7O1FBQTdCLFVBQThCLEdBQUc7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7Ozs7SUFNRCw4Q0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQsZ0RBQVU7OztJQUFWO1FBQ0ksSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Z0JBNUJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsa1NBR3VFO29CQUNqRixNQUFNLEVBQUUsQ0FBQyw0RUFBNEUsQ0FBQztpQkFDekY7OztnQkFYUSxnQkFBZ0I7Z0JBRWhCLHlCQUF5Qjs7O3VCQWM3QixLQUFLOzRCQUdMLEtBQUs7O0lBY1Ysa0NBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQXJCWSwyQkFBMkI7OztJQUNwQyw0Q0FBbUI7O0lBQ25CLDJDQUFpQjs7Ozs7SUFVYixpREFBb0M7Ozs7O0lBQ3BDLGdFQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybSc7XHJcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xyXG5cclxuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxhIHR5cGU9XCJidXR0b25cIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBmb250LXNpemU6IDI4cHg7IGN1cnNvcjogcG9pbnRlclwiIGNsYXNzPVwidGV4dC1yaWdodFwiIChjbGljayk9XCJkaXNwbGF5UGRmKClcIj5cclxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiB0ZXh0LXByaW1hcnkgZ2x5cGhpY29uLXByaW50XCI+PC9zcGFuPlxyXG48L2E+XHJcbjxlbmNvdW50ZXItdmlld2VyIGNsYXNzPVwiY2FyZFwiIFtmb3JtXT1cIiRmb3JtXCIgW2VuY291bnRlcl09XCIkZW5jXCI+PC9lbmNvdW50ZXItdmlld2VyPmAsXHJcbiAgICBzdHlsZXM6IFtgLmNhcmR7Ym94LXNoYWRvdzowIDJweCA1cHggMCByZ2JhKDAsMCwwLC4xNiksMCAycHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyAkZm9ybTogRm9ybTtcclxuICAgIHB1YmxpYyAkZW5jOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgcHVibGljIHNldCBmb3JtKGZvcm0pIHtcclxuICAgICAgICB0aGlzLiRmb3JtID0gZm9ybTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYykge1xyXG4gICAgICAgIHRoaXMuJGVuYyA9IGVuYztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVuY0FkYXB0ZXI6IEVuY291bnRlckFkYXB0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBlbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5UGRmKCkge1xyXG4gICAgICAgIHRoaXMuZW5jb3VudGVyUGRmVmlld2VyU2VydmljZS5kaXNwbGF5UGRmKHRoaXMuJGZvcm0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==