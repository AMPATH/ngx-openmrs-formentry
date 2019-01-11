/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatTabsModule, MatIconModule, MatCardModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
// import { SelectModule } from '../components/select/select.module';
import { NgSelectModule } from '@ng-select/ng-select';
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
                    NgSelectModule,
                    DateTimePickerModule,
                    RemoteSelectModule,
                    NoopAnimationsModule,
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOztBQUV6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFF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b3JlJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgLCBNYXRJY29uTW9kdWxlICwgTWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbGxhcHNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm1SZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1yZW5kZXJlci9mb3JtLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2hpc3RvcmljYWwtdmFsdWUtZGlyZWN0aXZlJztcbmltcG9ydCB7IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2hlbHBlcnMvaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZSc7XG4vLyBpbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQubW9kdWxlJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5neERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgQWZlTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnknO1xuaW1wb3J0IHsgQWxlcnRzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybVNjaGVtYUNvbXBpbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXNjaGVtYS1jb21waWxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5JztcbmltcG9ydCB7IFF1ZXN0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcbmltcG9ydCB7IFBlcnNvbkF0dHJpYnVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXInO1xuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29yZGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2JzQWRhcHRlckhlbHBlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb2JzLWFkYXB0ZXItaGVscGVyJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgUmVtb3RlU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9yZW1vdGUtc2VsZWN0L3JlbW90ZS1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2FwcG9pbnRtZW50cy1vdmVydmlldy9hcHBvaW50bWVudHMtb3ZlcnZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlck1vZHVsZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXdlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrLWJveC9jaGVja2JveC5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJ3RpbWUtYWdvLXBpcGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29sbGFwc2VNb2R1bGUsXG4gICAgICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgICAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICAgICAgUmVtb3RlU2VsZWN0TW9kdWxlLFxuICAgICAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSxcbiAgICAgICAgRW5jb3VudGVyVmlld2VyTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZvcm1SZW5kZXJlckNvbXBvbmVudCxcbiAgICAgICAgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUsXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsXG4gICAgICAgIFRpbWVBZ29QaXBlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRm9ybUJ1aWxkZXIsXG4gICAgICAgIEZvcm1Db250cm9sU2VydmljZSxcbiAgICAgICAgRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxuICAgICAgICBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5LFxuICAgICAgICBBbGVydHNGYWN0b3J5LFxuICAgICAgICBFeHByZXNzaW9uUnVubmVyLFxuICAgICAgICBKc0V4cHJlc3Npb25IZWxwZXIsXG4gICAgICAgIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UsXG4gICAgICAgIEZvcm1TY2hlbWFDb21waWxlcixcbiAgICAgICAgRm9ybUZhY3RvcnksXG4gICAgICAgIFF1ZXN0aW9uRmFjdG9yeSxcbiAgICAgICAgVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgICAgIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LFxuICAgICAgICBPYnNBZGFwdGVySGVscGVyLFxuICAgICAgICBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgICAgIEVuY291bnRlckFkYXB0ZXIsXG4gICAgICAgIFBlcnNvbkF0dHJpYnVBZGFwdGVyLFxuICAgICAgICBPcmRlclZhbHVlQWRhcHRlcixcbiAgICAgICAgRGVidWdNb2RlU2VydmljZVxuICAgIF0sXG4gICAgZXhwb3J0czogW0Zvcm1SZW5kZXJlckNvbXBvbmVudCwgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsIERhdGVUaW1lUGlja2VyTW9kdWxlLCBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgLCBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVudHJ5TW9kdWxlIHtcblxufVxuIl19