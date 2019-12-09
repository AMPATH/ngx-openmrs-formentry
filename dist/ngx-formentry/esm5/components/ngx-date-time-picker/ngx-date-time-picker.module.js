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
var NgxDateTimePickerModule = /** @class */ (function () {
    function NgxDateTimePickerModule() {
    }
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
    return NgxDateTimePickerModule;
}());
export { NgxDateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRyxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRyxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RSxpRUFBaUU7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBOEJuRjtJQUFBO0lBQ0EsQ0FBQztJQURZLHVCQUF1QjtRQTFCbkMsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLGNBQWM7Z0JBQ2Qsb0JBQW9CO2dCQUNwQiwyQkFBMkI7Z0JBQzNCLGVBQWU7YUFDbEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMEJBQTBCO2FBQzdCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLG1CQUFtQjtnQkFDbkIsa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLGNBQWM7Z0JBQ2QsMEJBQTBCO2FBQzdCO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDSixDQUFDO09BQ1csdUJBQXVCLENBQ25DO0lBQUQsOEJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXIubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSAsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUgLCBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgQW1hemluZ1RpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICdhbWF6aW5nLXRpbWUtcGlja2VyJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICAvLyBBbWF6aW5nVGltZVBpY2tlck1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUge1xufVxuIl19