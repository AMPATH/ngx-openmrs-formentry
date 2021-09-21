/**
 * date-time-picker.module
 */
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
    NgxDateTimePickerModule.decorators = [
        { type: NgModule, args: [{
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
                    declarations: [NgxDateTimePickerComponent],
                    exports: [
                        MatDatepickerModule,
                        MatFormFieldModule,
                        MatNativeDateModule,
                        MatInputModule,
                        NgxDateTimePickerComponent
                    ],
                    providers: []
                },] },
    ];
    return NgxDateTimePickerModule;
}());
export { NgxDateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlFLGlFQUFpRTtBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbkY7SUFBQTtJQXVCc0MsQ0FBQzs7Z0JBdkJ0QyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQiwyQkFBMkI7d0JBQzNCLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUMxQyxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCwwQkFBMEI7cUJBQzNCO29CQUNELFNBQVMsRUFBRSxFQUFFO2lCQUNkOztJQUNxQyw4QkFBQztDQUFBLEFBdkJ2QyxJQXVCdUM7U0FBMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBBbWF6aW5nVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJ2FtYXppbmctdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIC8vIEFtYXppbmdUaW1lUGlja2VyTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUge31cbiJdfQ==