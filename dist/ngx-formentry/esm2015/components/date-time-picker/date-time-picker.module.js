/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBb0J2RSxNQUFNLE9BQU8sb0JBQW9COzs7WUFsQmhDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2dCQUNwQyxZQUFZLEVBQUU7b0JBQ1YsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLGNBQWM7b0JBQ2QsVUFBVTtvQkFDVix1QkFBdUI7aUJBQzFCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsY0FBYztvQkFDZCxVQUFVO29CQUNWLHVCQUF1QjtpQkFDMUI7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7YUFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXIubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9tZW50UGlwZSB9IGZyb20gJy4vcGlwZXMvbW9tZW50LnBpcGUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIERhdGVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIFRpbWVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBNb21lbnRQaXBlLFxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBUaW1lUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTW9tZW50UGlwZSxcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJNb2R1bGUge1xufVxuIl19