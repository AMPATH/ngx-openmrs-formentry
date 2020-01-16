/**
 * date-time-picker.module
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ModalComponent } from './picker-modal/modal.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateTimePickerComponent } from './date-time-picker.component';
let DateTimePickerModule = class DateTimePickerModule {
};
DateTimePickerModule = tslib_1.__decorate([
    NgModule({
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
    })
], DateTimePickerModule);
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQW9CdkUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FDaEMsQ0FBQTtBQURZLG9CQUFvQjtJQWxCaEMsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztRQUNwQyxZQUFZLEVBQUU7WUFDVixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLGNBQWM7WUFDZCxVQUFVO1lBQ1YsdUJBQXVCO1NBQzFCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QsVUFBVTtZQUNWLHVCQUF1QjtTQUMxQjtRQUNELFNBQVMsRUFBRSxFQUFFO0tBQ2hCLENBQUM7R0FDVyxvQkFBb0IsQ0FDaEM7U0FEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXIubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9tZW50UGlwZSB9IGZyb20gJy4vcGlwZXMvbW9tZW50LnBpcGUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIERhdGVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIFRpbWVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBNb21lbnRQaXBlLFxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBUaW1lUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTW9tZW50UGlwZSxcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJNb2R1bGUge1xufVxuIl19