/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ModalComponent } from './picker-modal/modal.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateTimePickerComponent } from './date-time-picker.component';
export class DateTimePickerModule {
}
DateTimePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [
                    DatePickerComponent,
                    TimePickerComponent,
                    ModalComponent,
                    MomentPipe,
                    DateTimePickerComponent
                ],
                exports: [
                    DatePickerComponent,
                    TimePickerComponent,
                    ModalComponent,
                    MomentPipe,
                    DateTimePickerComponent
                ],
                providers: []
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBb0J2RSxNQUFNOzs7WUFsQkwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7Z0JBQ3BDLFlBQVksRUFBRTtvQkFDVixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsY0FBYztvQkFDZCxVQUFVO29CQUNWLHVCQUF1QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixjQUFjO29CQUNkLFVBQVU7b0JBQ1YsdUJBQXVCO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkYXRlLXRpbWUtcGlja2VyLm1vZHVsZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vcGlja2VyLW1vZGFsL21vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1vbWVudFBpcGUgfSBmcm9tICcuL3BpcGVzL21vbWVudC5waXBlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxyXG4gICAgICAgIFRpbWVQaWNrZXJDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgTW9tZW50UGlwZSxcclxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxyXG4gICAgICAgIFRpbWVQaWNrZXJDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgTW9tZW50UGlwZSxcclxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyTW9kdWxlIHtcclxufVxyXG4iXX0=