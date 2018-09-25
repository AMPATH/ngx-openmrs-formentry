/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatTabsModule, MatIconModule, MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DebugModeService } from '../form-entry/services/debug-mode.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormErrorsService } from './services/form-errors.service';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ErrorRendererComponent } from './error-renderer/error-renderer.component';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { SelectModule } from '../components/select/select.module';
import { RemoteFileUploadModule } from '../components/file-upload/file-upload.module';
import { DateTimePickerModule } from '../components/date-time-picker/date-time-picker.module';
import { NgxDateTimePickerModule } from '../components/ngx-date-time-picker/ngx-date-time-picker.module';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
import { HidersDisablersFactory } from './form-factory/hiders-disablers.factory';
import { AlertsFactory } from './form-factory/show-messages.factory';
import { ExpressionRunner } from './expression-runner/expression-runner';
import { JsExpressionHelper } from './helpers/js-expression-helper';
import { FormSchemaCompiler } from './services/form-schema-compiler.service';
import { FormFactory } from './form-factory/form.factory';
import { QuestionFactory } from './form-factory/question.factory';
import { ControlRelationsFactory } from './form-factory/control-relations.factory';
import { EncounterAdapter } from './value-adapters/encounter.adapter';
import { PersonAttribuAdapter } from './value-adapters/person-attribute.adapter';
import { OrderValueAdapter } from './value-adapters/order.adapter';
import { ObsAdapterHelper } from './value-adapters/obs-adapter-helper';
import { ObsValueAdapter } from './value-adapters/obs.adapter';
import { RemoteSelectModule } from '../components/remote-select/remote-select.module';
import { AppointmentsOverviewComponent } from '../components/appointments-overview/appointments-overview.component';
import { EncounterViewerModule } from '../encounter-viewer/encounter-viewer.module';
import { CheckboxModule } from '../components/check-box/checkbox.module';
import { SharedModule } from '../shared.module';
var FormEntryModule = /** @class */ (function () {
    function FormEntryModule() {
    }
    FormEntryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule,
                        ReactiveFormsModule,
                        CollapseModule,
                        SelectModule,
                        DateTimePickerModule,
                        RemoteSelectModule,
                        RemoteFileUploadModule,
                        EncounterViewerModule,
                        CheckboxModule,
                        MatIconModule,
                        MatTabsModule,
                        MatCardModule,
                        NgxDateTimePickerModule,
                        SharedModule
                    ],
                    declarations: [
                        FormRendererComponent,
                        AfeNgSelectComponent,
                        AppointmentsOverviewComponent,
                        HistoricalValueDirective,
                        ErrorRendererComponent
                    ],
                    providers: [
                        FormBuilder,
                        FormControlService,
                        FormErrorsService,
                        ValidationFactory,
                        HidersDisablersFactory,
                        AlertsFactory,
                        ExpressionRunner,
                        JsExpressionHelper,
                        HistoricalFieldHelperService,
                        FormSchemaCompiler,
                        FormFactory,
                        QuestionFactory,
                        ValidationFactory,
                        ControlRelationsFactory,
                        ObsAdapterHelper,
                        ObsValueAdapter,
                        EncounterAdapter,
                        PersonAttribuAdapter,
                        OrderValueAdapter,
                        DebugModeService
                    ],
                    exports: [FormRendererComponent, AfeNgSelectComponent,
                        ErrorRendererComponent, DateTimePickerModule, EncounterViewerModule, NgxDateTimePickerModule]
                },] },
    ];
    return FormEntryModule;
}());
export { FormEntryModule };
function FormEntryModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormEntryModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormEntryModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUN6RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFFLDZCQUE2QixFQUFDLE1BQU0scUVBQXFFLENBQUM7QUFDbkgsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Z0JBRy9DLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZO3dCQUNsQixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3dCQUN0QixxQkFBcUI7d0JBQ3JCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsdUJBQXVCO3dCQUN2QixZQUFZO3FCQUNmO29CQUNELFlBQVksRUFBRTt3QkFDVixxQkFBcUI7d0JBQ3JCLG9CQUFvQjt3QkFDcEIsNkJBQTZCO3dCQUM3Qix3QkFBd0I7d0JBQ3hCLHNCQUFzQjtxQkFDekI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsc0JBQXNCO3dCQUN0QixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQiw0QkFBNEI7d0JBQzVCLGtCQUFrQjt3QkFDbEIsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsZ0JBQWdCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0I7d0JBQ2pELHNCQUFzQixFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFHLHVCQUF1QixDQUFDO2lCQUNyRzs7MEJBdEZEOztTQXVGYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0VGFic01vZHVsZSAsIE1hdEljb25Nb2R1bGUgLCBNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2xsYXBzZU1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvY29sbGFwc2UnO1xyXG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBGb3JtUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlJztcclxuaW1wb3J0IHsgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQubW9kdWxlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmd4LWRhdGUtdGltZS1waWNrZXIvbmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlJztcclxuaW1wb3J0IHsgQWZlTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2hpZGVycy1kaXNhYmxlcnMuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9zaG93LW1lc3NhZ2VzLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XHJcbmltcG9ydCB7IEZvcm1TY2hlbWFDb21waWxlciB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5JztcclxuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvcXVlc3Rpb24uZmFjdG9yeSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcclxuaW1wb3J0IHsgUGVyc29uQXR0cmlidUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL3BlcnNvbi1hdHRyaWJ1dGUuYWRhcHRlcic7XHJcbmltcG9ydCB7IE9yZGVyVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vcmRlci5hZGFwdGVyJztcclxuaW1wb3J0IHsgT2JzQWRhcHRlckhlbHBlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb2JzLWFkYXB0ZXItaGVscGVyJztcclxuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XHJcbmltcG9ydCB7IFJlbW90ZVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtb3RlLXNlbGVjdC9yZW1vdGUtc2VsZWN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2FwcG9pbnRtZW50cy1vdmVydmlldy9hcHBvaW50bWVudHMtb3ZlcnZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyTW9kdWxlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3gubW9kdWxlJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBDb2xsYXBzZU1vZHVsZSxcclxuICAgICAgICBTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgUmVtb3RlU2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUsXHJcbiAgICAgICAgRW5jb3VudGVyVmlld2VyTW9kdWxlLFxyXG4gICAgICAgIENoZWNrYm94TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0VGFic01vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE5neERhdGVUaW1lUGlja2VyTW9kdWxlLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZvcm1SZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgICBBZmVOZ1NlbGVjdENvbXBvbmVudCxcclxuICAgICAgICBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCxcclxuICAgICAgICBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUsXHJcbiAgICAgICAgRXJyb3JSZW5kZXJlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEZvcm1CdWlsZGVyLFxyXG4gICAgICAgIEZvcm1Db250cm9sU2VydmljZSxcclxuICAgICAgICBGb3JtRXJyb3JzU2VydmljZSxcclxuICAgICAgICBWYWxpZGF0aW9uRmFjdG9yeSxcclxuICAgICAgICBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5LFxyXG4gICAgICAgIEFsZXJ0c0ZhY3RvcnksXHJcbiAgICAgICAgRXhwcmVzc2lvblJ1bm5lcixcclxuICAgICAgICBKc0V4cHJlc3Npb25IZWxwZXIsXHJcbiAgICAgICAgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSxcclxuICAgICAgICBGb3JtU2NoZW1hQ29tcGlsZXIsXHJcbiAgICAgICAgRm9ybUZhY3RvcnksXHJcbiAgICAgICAgUXVlc3Rpb25GYWN0b3J5LFxyXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxyXG4gICAgICAgIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LFxyXG4gICAgICAgIE9ic0FkYXB0ZXJIZWxwZXIsXHJcbiAgICAgICAgT2JzVmFsdWVBZGFwdGVyLFxyXG4gICAgICAgIEVuY291bnRlckFkYXB0ZXIsXHJcbiAgICAgICAgUGVyc29uQXR0cmlidUFkYXB0ZXIsXHJcbiAgICAgICAgT3JkZXJWYWx1ZUFkYXB0ZXIsXHJcbiAgICAgICAgRGVidWdNb2RlU2VydmljZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtGb3JtUmVuZGVyZXJDb21wb25lbnQsIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsIERhdGVUaW1lUGlja2VyTW9kdWxlLCBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgLCBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1FbnRyeU1vZHVsZSB7XHJcblxyXG59XHJcbiJdfQ==