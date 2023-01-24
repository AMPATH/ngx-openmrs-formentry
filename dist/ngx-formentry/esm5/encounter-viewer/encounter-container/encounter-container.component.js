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
    EncounterContainerComponent.prototype.ngOnInit = function () { };
    EncounterContainerComponent.prototype.displayPdf = function () {
        this.encounterPdfViewerService.displayPdf(this.$form);
    };
    EncounterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-renderer',
                    template: "<a\n  type=\"button\"\n  style=\"display: block; font-size: 28px; cursor: pointer\"\n  class=\"text-right\"\n  (click)=\"displayPdf()\"\n>\n  <span class=\"glyphicon text-primary glyphicon-print\"></span>\n</a>\n<encounter-viewer\n  class=\"card\"\n  [form]=\"$form\"\n  [encounter]=\"$enc\"\n></encounter-viewer>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFNUU7SUE2QkUscUNBQ1UsVUFBNEIsRUFDNUIseUJBQW9EO1FBRHBELGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQzVCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7SUFDM0QsQ0FBQztJQVZKLHNCQUFvQiw2Q0FBSTthQUF4QixVQUF5QixJQUFJO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQW9CLGtEQUFTO2FBQTdCLFVBQThCLEdBQUc7WUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFPRCw4Q0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLGdEQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkF0Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSw2VEFhWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw0RUFBNEUsQ0FBQztpQkFDdkY7OztnQkFyQlEsZ0JBQWdCO2dCQUVoQix5QkFBeUI7Ozt1QkF3Qi9CLEtBQUs7NEJBR0wsS0FBSzs7SUFjUixrQ0FBQztDQUFBLEFBdkNELElBdUNDO1NBckJZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXG4gIHRlbXBsYXRlOiBgPGFcbiAgdHlwZT1cImJ1dHRvblwiXG4gIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IGZvbnQtc2l6ZTogMjhweDsgY3Vyc29yOiBwb2ludGVyXCJcbiAgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCJcbiAgKGNsaWNrKT1cImRpc3BsYXlQZGYoKVwiXG4+XG4gIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIHRleHQtcHJpbWFyeSBnbHlwaGljb24tcHJpbnRcIj48L3NwYW4+XG48L2E+XG48ZW5jb3VudGVyLXZpZXdlclxuICBjbGFzcz1cImNhcmRcIlxuICBbZm9ybV09XCIkZm9ybVwiXG4gIFtlbmNvdW50ZXJdPVwiJGVuY1wiXG4+PC9lbmNvdW50ZXItdmlld2VyPlxuYCxcbiAgc3R5bGVzOiBbYC5jYXJke2JveC1zaGFkb3c6MCAycHggNXB4IDAgcmdiYSgwLDAsMCwuMTYpLDAgMnB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMil9YF1cbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljICRmb3JtOiBGb3JtO1xuICBwdWJsaWMgJGVuYzogYW55O1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgZm9ybShmb3JtKSB7XG4gICAgdGhpcy4kZm9ybSA9IGZvcm07XG4gIH1cbiAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jKSB7XG4gICAgdGhpcy4kZW5jID0gZW5jO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyLFxuICAgIHByaXZhdGUgZW5jb3VudGVyUGRmVmlld2VyU2VydmljZTogRW5jb3VudGVyUGRmVmlld2VyU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIGRpc3BsYXlQZGYoKSB7XG4gICAgdGhpcy5lbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlLmRpc3BsYXlQZGYodGhpcy4kZm9ybSk7XG4gIH1cbn1cbiJdfQ==