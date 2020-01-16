import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
let EncounterContainerComponent = class EncounterContainerComponent {
    constructor(encAdapter) {
        this.encAdapter = encAdapter;
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
        console.warn('Functionality removed from this repository during angular 8 upgrade!');
    }
};
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter }
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
    tslib_1.__metadata("design:paramtypes", [EncounterAdapter])
], EncounterContainerComponent);
export { EncounterContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFPckYsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFXcEMsWUFDWSxVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjtJQUFJLENBQUM7SUFScEMsSUFBVyxJQUFJLENBQUMsSUFBSTtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ1EsSUFBVyxTQUFTLENBQUMsR0FBRztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBS0QsUUFBUTtJQUNSLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Q0FDSixDQUFBOztZQVIyQixnQkFBZ0I7O0FBUi9CO0lBQVIsS0FBSyxFQUFFOzs7dURBRVA7QUFDUTtJQUFSLEtBQUssRUFBRTs7OzREQUVQO0FBVFEsMkJBQTJCO0lBTHZDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsNFNBQW1EOztLQUV0RCxDQUFDOzZDQWEwQixnQkFBZ0I7R0FaL0IsMkJBQTJCLENBb0J2QztTQXBCWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlbmNvdW50ZXItcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyAkZm9ybTogRm9ybTtcbiAgICBwdWJsaWMgJGVuYzogYW55O1xuXG4gICAgQElucHV0KCkgcHVibGljIHNldCBmb3JtKGZvcm0pIHtcbiAgICAgICAgdGhpcy4kZm9ybSA9IGZvcm07XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYykge1xuICAgICAgICB0aGlzLiRlbmMgPSBlbmM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZW5jQWRhcHRlcjogRW5jb3VudGVyQWRhcHRlcikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBkaXNwbGF5UGRmKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Z1bmN0aW9uYWxpdHkgcmVtb3ZlZCBmcm9tIHRoaXMgcmVwb3NpdG9yeSBkdXJpbmcgYW5ndWxhciA4IHVwZ3JhZGUhJyk7XG4gICAgfVxufVxuIl19