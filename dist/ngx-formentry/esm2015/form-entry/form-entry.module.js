/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatTabsModule, MatIconModule, MatCardModule } from '@angular/material';
// import { NoopAnimationsModule} from '@angular/platform-browser/animations';
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
// import { NgSelectModule } from '@ng-select/ng-select';
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
import { TimeAgoPipe } from 'time-ago-pipe';
export class FormEntryModule {
}
FormEntryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule,
                    ReactiveFormsModule,
                    CollapseModule,
                    // NgSelectModule,
                    SelectModule,
                    DateTimePickerModule,
                    RemoteSelectModule,
                    // NoopAnimationsModule,
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
                    ErrorRendererComponent,
                    TimeAgoPipe
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQUVqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBRWxFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzlGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxxRUFBcUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzRDVDLE1BQU07OztZQW5ETCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWTtvQkFDbEIsbUJBQW1CO29CQUNuQixjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYix1QkFBdUI7b0JBQ3ZCLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQiw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO29CQUN0QixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxXQUFXO29CQUNYLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtvQkFDdEIsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsNEJBQTRCO29CQUM1QixrQkFBa0I7b0JBQ2xCLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CO29CQUNqRCxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRyx1QkFBdUIsQ0FBQzthQUNyRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlICwgTWF0SWNvbk1vZHVsZSAsIE1hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbi8vIGltcG9ydCB7IE5vb3BBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlYnVnTW9kZVNlcnZpY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xsYXBzZU1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvY29sbGFwc2UnO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEVycm9yUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2Vycm9yLXJlbmRlcmVyL2Vycm9yLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB9IGZyb20gJy4vaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5tb2R1bGUnO1xuLy8gaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBSZW1vdGVGaWxlVXBsb2FkTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL25neC1kYXRlLXRpbWUtcGlja2VyL25neC1kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBBZmVOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvYWZlLW5nLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2hpZGVycy1kaXNhYmxlcnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBBbGVydHNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5JztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBGb3JtU2NoZW1hQ29tcGlsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tc2NoZW1hLWNvbXBpbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvcXVlc3Rpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgUGVyc29uQXR0cmlidUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL3BlcnNvbi1hdHRyaWJ1dGUuYWRhcHRlcic7XG5pbXBvcnQgeyBPcmRlclZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXInO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBSZW1vdGVTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyTW9kdWxlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2stYm94L2NoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFRpbWVBZ29QaXBlIH0gZnJvbSAndGltZS1hZ28tcGlwZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBDb2xsYXBzZU1vZHVsZSxcbiAgICAgICAgLy8gTmdTZWxlY3RNb2R1bGUsXG4gICAgICAgIFNlbGVjdE1vZHVsZSxcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgIFJlbW90ZVNlbGVjdE1vZHVsZSxcbiAgICAgICAgLy8gTm9vcEFuaW1hdGlvbnNNb2R1bGUsXG4gICAgICAgIFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUsXG4gICAgICAgIEVuY291bnRlclZpZXdlck1vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE5neERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGb3JtUmVuZGVyZXJDb21wb25lbnQsXG4gICAgICAgIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCxcbiAgICAgICAgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlLFxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LFxuICAgICAgICBUaW1lQWdvUGlwZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEZvcm1CdWlsZGVyLFxuICAgICAgICBGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgICAgIEZvcm1FcnJvcnNTZXJ2aWNlLFxuICAgICAgICBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICAgICAgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSxcbiAgICAgICAgQWxlcnRzRmFjdG9yeSxcbiAgICAgICAgRXhwcmVzc2lvblJ1bm5lcixcbiAgICAgICAgSnNFeHByZXNzaW9uSGVscGVyLFxuICAgICAgICBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlLFxuICAgICAgICBGb3JtU2NoZW1hQ29tcGlsZXIsXG4gICAgICAgIEZvcm1GYWN0b3J5LFxuICAgICAgICBRdWVzdGlvbkZhY3RvcnksXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxuICAgICAgICBDb250cm9sUmVsYXRpb25zRmFjdG9yeSxcbiAgICAgICAgT2JzQWRhcHRlckhlbHBlcixcbiAgICAgICAgT2JzVmFsdWVBZGFwdGVyLFxuICAgICAgICBFbmNvdW50ZXJBZGFwdGVyLFxuICAgICAgICBQZXJzb25BdHRyaWJ1QWRhcHRlcixcbiAgICAgICAgT3JkZXJWYWx1ZUFkYXB0ZXIsXG4gICAgICAgIERlYnVnTW9kZVNlcnZpY2VcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtGb3JtUmVuZGVyZXJDb21wb25lbnQsIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LCBEYXRlVGltZVBpY2tlck1vZHVsZSwgRW5jb3VudGVyVmlld2VyTW9kdWxlICwgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbnRyeU1vZHVsZSB7XG5cbn1cbiJdfQ==