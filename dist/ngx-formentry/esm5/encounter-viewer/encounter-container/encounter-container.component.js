import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
var EncounterContainerComponent = /** @class */ (function () {
    function EncounterContainerComponent(encAdapter, encounterPdfViewerService) {
        this.encAdapter = encAdapter;
        this.encounterPdfViewerService = encounterPdfViewerService;
    }
    Object.defineProperty(EncounterContainerComponent.prototype, "form", {
        set: function (form) {
            this.$form = form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterContainerComponent.prototype, "encounter", {
        set: function (enc) {
            this.$enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    EncounterContainerComponent.prototype.ngOnInit = function () {
    };
    EncounterContainerComponent.prototype.displayPdf = function () {
        this.encounterPdfViewerService.displayPdf(this.$form);
    };
    EncounterContainerComponent.ctorParameters = function () { return [
        { type: EncounterAdapter },
        { type: EncounterPdfViewerService }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], EncounterContainerComponent.prototype, "form", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], EncounterContainerComponent.prototype, "encounter", null);
    EncounterContainerComponent = tslib_1.__decorate([
        Component({
            selector: 'encounter-renderer',
            template: "<a type=\"button\" style=\"display: block; font-size: 28px; cursor: pointer\" class=\"text-right\" (click)=\"displayPdf()\">\n  <span class=\"glyphicon text-primary glyphicon-print\"></span>\n</a>\n<encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>",
            styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [EncounterAdapter,
            EncounterPdfViewerService])
    ], EncounterContainerComponent);
    return EncounterContainerComponent;
}());
export { EncounterContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTzVFO0lBV0kscUNBQ1ksVUFBNEIsRUFDNUIseUJBQW9EO1FBRHBELGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQzVCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7SUFBSSxDQUFDO0lBVDVELHNCQUFXLDZDQUFJO2FBQWYsVUFBZ0IsSUFBSTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUNRLHNCQUFXLGtEQUFTO2FBQXBCLFVBQXFCLEdBQUc7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFNRCw4Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELGdEQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDOztnQkFSdUIsZ0JBQWdCO2dCQUNELHlCQUF5Qjs7SUFUdkQ7UUFBUixLQUFLLEVBQUU7OzsyREFFUDtJQUNRO1FBQVIsS0FBSyxFQUFFOzs7Z0VBRVA7SUFUUSwyQkFBMkI7UUFMdkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtZQUM5Qiw0U0FBbUQ7O1NBRXRELENBQUM7aURBYTBCLGdCQUFnQjtZQUNELHlCQUF5QjtPQWJ2RCwyQkFBMkIsQ0FxQnZDO0lBQUQsa0NBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcblxuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljICRmb3JtOiBGb3JtO1xuICAgIHB1YmxpYyAkZW5jOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGZvcm0oZm9ybSkge1xuICAgICAgICB0aGlzLiRmb3JtID0gZm9ybTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jKSB7XG4gICAgICAgIHRoaXMuJGVuYyA9IGVuYztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyLFxuICAgICAgICBwcml2YXRlIGVuY291bnRlclBkZlZpZXdlclNlcnZpY2U6IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgZGlzcGxheVBkZigpIHtcbiAgICAgICAgdGhpcy5lbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlLmRpc3BsYXlQZGYodGhpcy4kZm9ybSk7XG4gICAgfVxufVxuIl19