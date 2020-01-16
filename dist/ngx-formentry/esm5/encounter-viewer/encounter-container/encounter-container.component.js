import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
var EncounterContainerComponent = /** @class */ (function () {
    function EncounterContainerComponent(encAdapter) {
        this.encAdapter = encAdapter;
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
        console.warn('Functionality removed from this repository during angular 8 upgrade!');
    };
    EncounterContainerComponent.ctorParameters = function () { return [
        { type: EncounterAdapter }
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
        tslib_1.__metadata("design:paramtypes", [EncounterAdapter])
    ], EncounterContainerComponent);
    return EncounterContainerComponent;
}());
export { EncounterContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFPckY7SUFXSSxxQ0FDWSxVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjtJQUFJLENBQUM7SUFScEMsc0JBQVcsNkNBQUk7YUFBZixVQUFnQixJQUFJO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBQ1Esc0JBQVcsa0RBQVM7YUFBcEIsVUFBcUIsR0FBRztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUtELDhDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsZ0RBQVUsR0FBVjtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0VBQXNFLENBQUMsQ0FBQztJQUN6RixDQUFDOztnQkFQdUIsZ0JBQWdCOztJQVIvQjtRQUFSLEtBQUssRUFBRTs7OzJEQUVQO0lBQ1E7UUFBUixLQUFLLEVBQUU7OztnRUFFUDtJQVRRLDJCQUEyQjtRQUx2QyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLDRTQUFtRDs7U0FFdEQsQ0FBQztpREFhMEIsZ0JBQWdCO09BWi9CLDJCQUEyQixDQW9CdkM7SUFBRCxrQ0FBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljICRmb3JtOiBGb3JtO1xuICAgIHB1YmxpYyAkZW5jOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGZvcm0oZm9ybSkge1xuICAgICAgICB0aGlzLiRmb3JtID0gZm9ybTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jKSB7XG4gICAgICAgIHRoaXMuJGVuYyA9IGVuYztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIGRpc3BsYXlQZGYoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignRnVuY3Rpb25hbGl0eSByZW1vdmVkIGZyb20gdGhpcyByZXBvc2l0b3J5IGR1cmluZyBhbmd1bGFyIDggdXBncmFkZSEnKTtcbiAgICB9XG59XG4iXX0=