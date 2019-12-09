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
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
    }
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
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFvQnZFO0lBQUE7SUFDQSxDQUFDO0lBRFksb0JBQW9CO1FBbEJoQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO1lBQ3BDLFlBQVksRUFBRTtnQkFDVixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxVQUFVO2dCQUNWLHVCQUF1QjthQUMxQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxVQUFVO2dCQUNWLHVCQUF1QjthQUMxQjtZQUNELFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7T0FDVyxvQkFBb0IsQ0FDaEM7SUFBRCwyQkFBQztDQUFBLEFBREQsSUFDQztTQURZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLXBpY2tlci5tb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vcGlja2VyLW1vZGFsL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb21lbnRQaXBlIH0gZnJvbSAnLi9waXBlcy9tb21lbnQucGlwZSc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGF0ZVBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgVGltZVBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgICAgIE1vbWVudFBpcGUsXG4gICAgICAgIERhdGVUaW1lUGlja2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERhdGVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIFRpbWVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBNb21lbnRQaXBlLFxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck1vZHVsZSB7XG59XG4iXX0=