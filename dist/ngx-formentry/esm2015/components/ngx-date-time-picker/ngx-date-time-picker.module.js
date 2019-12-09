/**
 * date-time-picker.module
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { NgxDateTimePickerComponent } from './ngx-date-time-picker.component';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MatSelectModule } from '@angular/material/select';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
let NgxDateTimePickerModule = class NgxDateTimePickerModule {
};
NgxDateTimePickerModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatNativeDateModule,
            MatInputModule,
            DateTimePickerModule,
            // AmazingTimePickerModule,
            MatSelectModule
        ],
        declarations: [
            NgxDateTimePickerComponent
        ],
        exports: [
            MatDatepickerModule,
            MatFormFieldModule,
            MatNativeDateModule,
            MatInputModule,
            NgxDateTimePickerComponent
        ],
        providers: []
    })
], NgxDateTimePickerModule);
export { NgxDateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRyxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRyxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RSxpRUFBaUU7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBOEJuRixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtDQUNuQyxDQUFBO0FBRFksdUJBQXVCO0lBMUJuQyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2Qsb0JBQW9CO1lBQ3BCLDJCQUEyQjtZQUMzQixlQUFlO1NBQ2xCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsMEJBQTBCO1NBQzdCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixtQkFBbUI7WUFDbkIsY0FBYztZQUNkLDBCQUEwQjtTQUM3QjtRQUNELFNBQVMsRUFBRSxFQUNWO0tBQ0osQ0FBQztHQUNXLHVCQUF1QixDQUNuQztTQURZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLXBpY2tlci5tb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlICwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSAsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBBbWF6aW5nVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJ2FtYXppbmctdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgIC8vIEFtYXppbmdUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZSB7XG59XG4iXX0=