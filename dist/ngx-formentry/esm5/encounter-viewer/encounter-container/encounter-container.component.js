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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPNUU7SUFXSSxxQ0FDWSxVQUE0QixFQUM1Qix5QkFBb0Q7UUFEcEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDNUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtJQUFJLENBQUM7SUFUNUQsc0JBQVcsNkNBQUk7YUFBZixVQUFnQixJQUFJO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBQ1Esc0JBQVcsa0RBQVM7YUFBcEIsVUFBcUIsR0FBRztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQU1ELDhDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsZ0RBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQVJ1QixnQkFBZ0I7Z0JBQ0QseUJBQXlCOztJQVR2RDtRQUFSLEtBQUssRUFBRTs7OzJEQUVQO0lBQ1E7UUFBUixLQUFLLEVBQUU7OztnRUFFUDtJQVRRLDJCQUEyQjtRQUx2QyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLDRTQUFtRDs7U0FFdEQsQ0FBQztpREFhMEIsZ0JBQWdCO1lBQ0QseUJBQXlCO09BYnZELDJCQUEyQixDQXFCdkM7SUFBRCxrQ0FBQztDQUFBLEFBckJELElBcUJDO1NBckJZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZW5jb3VudGVyLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgJGZvcm06IEZvcm07XG4gICAgcHVibGljICRlbmM6IGFueTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZm9ybShmb3JtKSB7XG4gICAgICAgIHRoaXMuJGZvcm0gPSBmb3JtO1xuICAgIH1cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmMpIHtcbiAgICAgICAgdGhpcy4kZW5jID0gZW5jO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVuY0FkYXB0ZXI6IEVuY291bnRlckFkYXB0ZXIsXG4gICAgICAgIHByaXZhdGUgZW5jb3VudGVyUGRmVmlld2VyU2VydmljZTogRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBkaXNwbGF5UGRmKCkge1xuICAgICAgICB0aGlzLmVuY291bnRlclBkZlZpZXdlclNlcnZpY2UuZGlzcGxheVBkZih0aGlzLiRmb3JtKTtcbiAgICB9XG59XG4iXX0=