import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
let EncounterContainerComponent = class EncounterContainerComponent {
    constructor(encAdapter, encounterPdfViewerService) {
        this.encAdapter = encAdapter;
        this.encounterPdfViewerService = encounterPdfViewerService;
    }
    set form(form) {
        this.$form = form;
    }
    set encounter(enc) {
        this.$enc = enc;
    }
    ngOnInit() {
    }
    displayPdf() {
        this.encounterPdfViewerService.displayPdf(this.$form);
    }
};
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter },
    { type: EncounterPdfViewerService }
];
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
export { EncounterContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPNUUsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFXcEMsWUFDWSxVQUE0QixFQUM1Qix5QkFBb0Q7UUFEcEQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDNUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtJQUFJLENBQUM7SUFUNUQsSUFBVyxJQUFJLENBQUMsSUFBSTtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ1EsSUFBVyxTQUFTLENBQUMsR0FBRztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBTUQsUUFBUTtJQUNSLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNKLENBQUE7O1lBVDJCLGdCQUFnQjtZQUNELHlCQUF5Qjs7QUFUdkQ7SUFBUixLQUFLLEVBQUU7Ozt1REFFUDtBQUNRO0lBQVIsS0FBSyxFQUFFOzs7NERBRVA7QUFUUSwyQkFBMkI7SUFMdkMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5Qiw0U0FBbUQ7O0tBRXRELENBQUM7NkNBYTBCLGdCQUFnQjtRQUNELHlCQUF5QjtHQWJ2RCwyQkFBMkIsQ0FxQnZDO1NBckJZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZW5jb3VudGVyLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgJGZvcm06IEZvcm07XG4gICAgcHVibGljICRlbmM6IGFueTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZm9ybShmb3JtKSB7XG4gICAgICAgIHRoaXMuJGZvcm0gPSBmb3JtO1xuICAgIH1cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmMpIHtcbiAgICAgICAgdGhpcy4kZW5jID0gZW5jO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVuY0FkYXB0ZXI6IEVuY291bnRlckFkYXB0ZXIsXG4gICAgICAgIHByaXZhdGUgZW5jb3VudGVyUGRmVmlld2VyU2VydmljZTogRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBkaXNwbGF5UGRmKCkge1xuICAgICAgICB0aGlzLmVuY291bnRlclBkZlZpZXdlclNlcnZpY2UuZGlzcGxheVBkZih0aGlzLiRmb3JtKTtcbiAgICB9XG59XG4iXX0=