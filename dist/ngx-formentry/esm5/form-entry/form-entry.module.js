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
var FormEntryModule = /** @class */ (function () {
    function FormEntryModule() {
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
    return FormEntryModule;
}());
export { FormEntryModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQUVqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBRWxFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGLE9BQU8sRUFB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YW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgLCBNYXRJY29uTW9kdWxlICwgTWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuLy8gaW1wb3J0IHsgTm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbGxhcHNlTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb2xsYXBzZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZXJyb3ItcmVuZGVyZXIvZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9oaXN0b3JpY2FsLXZhbHVlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmd4LWRhdGUtdGltZS1waWNrZXIvbmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IEFmZU5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9hZmUtbmctc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9zaG93LW1lc3NhZ2VzLmZhY3RvcnknO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm1TY2hlbWFDb21waWxlciB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9xdWVzdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9lbmNvdW50ZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBQZXJzb25BdHRyaWJ1QWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvcGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9yZGVyVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vcmRlci5hZGFwdGVyJztcbmltcG9ydCB7IE9ic0FkYXB0ZXJIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy1hZGFwdGVyLWhlbHBlcic7XG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcbmltcG9ydCB7IFJlbW90ZVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtb3RlLXNlbGVjdC9yZW1vdGUtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9hcHBvaW50bWVudHMtb3ZlcnZpZXcvYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVGltZUFnb1BpcGUgfSBmcm9tICd0aW1lLWFnby1waXBlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbGxhcHNlTW9kdWxlLFxuICAgICAgICAvLyBOZ1NlbGVjdE1vZHVsZSxcbiAgICAgICAgU2VsZWN0TW9kdWxlLFxuICAgICAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICAgICAgUmVtb3RlU2VsZWN0TW9kdWxlLFxuICAgICAgICAvLyBOb29wQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSxcbiAgICAgICAgRW5jb3VudGVyVmlld2VyTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZvcm1SZW5kZXJlckNvbXBvbmVudCxcbiAgICAgICAgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUsXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsXG4gICAgICAgIFRpbWVBZ29QaXBlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRm9ybUJ1aWxkZXIsXG4gICAgICAgIEZvcm1Db250cm9sU2VydmljZSxcbiAgICAgICAgRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxuICAgICAgICBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5LFxuICAgICAgICBBbGVydHNGYWN0b3J5LFxuICAgICAgICBFeHByZXNzaW9uUnVubmVyLFxuICAgICAgICBKc0V4cHJlc3Npb25IZWxwZXIsXG4gICAgICAgIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UsXG4gICAgICAgIEZvcm1TY2hlbWFDb21waWxlcixcbiAgICAgICAgRm9ybUZhY3RvcnksXG4gICAgICAgIFF1ZXN0aW9uRmFjdG9yeSxcbiAgICAgICAgVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgICAgIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LFxuICAgICAgICBPYnNBZGFwdGVySGVscGVyLFxuICAgICAgICBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgICAgIEVuY291bnRlckFkYXB0ZXIsXG4gICAgICAgIFBlcnNvbkF0dHJpYnVBZGFwdGVyLFxuICAgICAgICBPcmRlclZhbHVlQWRhcHRlcixcbiAgICAgICAgRGVidWdNb2RlU2VydmljZVxuICAgIF0sXG4gICAgZXhwb3J0czogW0Zvcm1SZW5kZXJlckNvbXBvbmVudCwgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsIERhdGVUaW1lUGlja2VyTW9kdWxlLCBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgLCBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVudHJ5TW9kdWxlIHtcblxufVxuIl19