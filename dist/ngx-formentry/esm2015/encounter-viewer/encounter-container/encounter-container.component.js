import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
export class EncounterContainerComponent {
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
    ngOnInit() { }
    displayPdf() {
        this.encounterPdfViewerService.displayPdf(this.$form);
    }
}
EncounterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-renderer',
                template: `<a
  type="button"
  style="display: block; font-size: 28px; cursor: pointer"
  class="text-right"
  (click)="displayPdf()"
>
  <span class="glyphicon text-primary glyphicon-print"></span>
</a>
<encounter-viewer
  class="card"
  [form]="$form"
  [encounter]="$enc"
></encounter-viewer>
`,
                styles: [`.card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}`]
            },] },
];
/** @nocollapse */
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter },
    { type: EncounterPdfViewerService }
];
EncounterContainerComponent.propDecorators = {
    form: [{ type: Input }],
    encounter: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUVyRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQW9CNUUsTUFBTTtJQVdKLFlBQ1UsVUFBNEIsRUFDNUIseUJBQW9EO1FBRHBELGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQzVCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7SUFDM0QsQ0FBQztJQVZKLElBQW9CLElBQUksQ0FBQyxJQUFJO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFvQixTQUFTLENBQUMsR0FBRztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBT0QsUUFBUSxLQUFJLENBQUM7SUFFYixVQUFVO1FBQ1IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Q0FhWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyw0RUFBNEUsQ0FBQzthQUN2Rjs7OztZQXJCUSxnQkFBZ0I7WUFFaEIseUJBQXlCOzs7bUJBd0IvQixLQUFLO3dCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcblxuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbmNvdW50ZXItcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDxhXG4gIHR5cGU9XCJidXR0b25cIlxuICBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBmb250LXNpemU6IDI4cHg7IGN1cnNvcjogcG9pbnRlclwiXG4gIGNsYXNzPVwidGV4dC1yaWdodFwiXG4gIChjbGljayk9XCJkaXNwbGF5UGRmKClcIlxuPlxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiB0ZXh0LXByaW1hcnkgZ2x5cGhpY29uLXByaW50XCI+PC9zcGFuPlxuPC9hPlxuPGVuY291bnRlci12aWV3ZXJcbiAgY2xhc3M9XCJjYXJkXCJcbiAgW2Zvcm1dPVwiJGZvcm1cIlxuICBbZW5jb3VudGVyXT1cIiRlbmNcIlxuPjwvZW5jb3VudGVyLXZpZXdlcj5cbmAsXG4gIHN0eWxlczogW2AuY2FyZHtib3gtc2hhZG93OjAgMnB4IDVweCAwIHJnYmEoMCwwLDAsLjE2KSwwIDJweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfWBdXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyAkZm9ybTogRm9ybTtcbiAgcHVibGljICRlbmM6IGFueTtcblxuICBASW5wdXQoKSBwdWJsaWMgc2V0IGZvcm0oZm9ybSkge1xuICAgIHRoaXMuJGZvcm0gPSBmb3JtO1xuICB9XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYykge1xuICAgIHRoaXMuJGVuYyA9IGVuYztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZW5jQWRhcHRlcjogRW5jb3VudGVyQWRhcHRlcixcbiAgICBwcml2YXRlIGVuY291bnRlclBkZlZpZXdlclNlcnZpY2U6IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBkaXNwbGF5UGRmKCkge1xuICAgIHRoaXMuZW5jb3VudGVyUGRmVmlld2VyU2VydmljZS5kaXNwbGF5UGRmKHRoaXMuJGZvcm0pO1xuICB9XG59XG4iXX0=