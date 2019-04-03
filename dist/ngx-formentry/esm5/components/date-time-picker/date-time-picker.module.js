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
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
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
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFO0lBQUE7SUFtQkEsQ0FBQzs7Z0JBbkJBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNwQyxZQUFZLEVBQUU7d0JBQ1YsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsVUFBVTt3QkFDVix1QkFBdUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxVQUFVO3dCQUNWLHVCQUF1QjtxQkFDMUI7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7aUJBQ2hCOztJQUVELDJCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZGF0ZS10aW1lLXBpY2tlci5tb2R1bGVcclxuICovXHJcblxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb21lbnRQaXBlIH0gZnJvbSAnLi9waXBlcy9tb21lbnQucGlwZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRGF0ZVBpY2tlckNvbXBvbmVudCxcclxuICAgICAgICBUaW1lUGlja2VyQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIE1vbWVudFBpcGUsXHJcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRGF0ZVBpY2tlckNvbXBvbmVudCxcclxuICAgICAgICBUaW1lUGlja2VyQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIE1vbWVudFBpcGUsXHJcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck1vZHVsZSB7XHJcbn1cclxuIl19