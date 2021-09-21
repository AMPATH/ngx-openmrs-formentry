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
                imports: [
                    CommonModule,
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
                exports: [
                    FormRendererComponent,
                    AfeNgSelectComponent,
                    ErrorRendererComponent,
                    DateTimePickerModule,
                    EncounterViewerModule,
                    NgxDateTimePickerModule
                ]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsOEVBQThFO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOENBQThD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cnQgeyBNYXRUYWJzTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuLy8gaW1wb3J0IHsgTm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbGxhcHNlTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb2xsYXBzZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZXJyb3ItcmVuZGVyZXIvZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9oaXN0b3JpY2FsLXZhbHVlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmd4LWRhdGUtdGltZS1waWNrZXIvbmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IEFmZU5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9hZmUtbmctc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9zaG93LW1lc3NhZ2VzLmZhY3RvcnknO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm1TY2hlbWFDb21waWxlciB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9xdWVzdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9lbmNvdW50ZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBQZXJzb25BdHRyaWJ1QWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvcGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9yZGVyVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vcmRlci5hZGFwdGVyJztcbmltcG9ydCB7IE9ic0FkYXB0ZXJIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy1hZGFwdGVyLWhlbHBlcic7XG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcbmltcG9ydCB7IFJlbW90ZVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtb3RlLXNlbGVjdC9yZW1vdGUtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyTW9kdWxlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2stYm94L2NoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFRpbWVBZ29QaXBlIH0gZnJvbSAndGltZS1hZ28tcGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb2xsYXBzZU1vZHVsZSxcbiAgICAvLyBOZ1NlbGVjdE1vZHVsZSxcbiAgICBTZWxlY3RNb2R1bGUsXG4gICAgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgUmVtb3RlU2VsZWN0TW9kdWxlLFxuICAgIC8vIE5vb3BBbmltYXRpb25zTW9kdWxlLFxuICAgIFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUsXG4gICAgRW5jb3VudGVyVmlld2VyTW9kdWxlLFxuICAgIENoZWNrYm94TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE5neERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtUmVuZGVyZXJDb21wb25lbnQsXG4gICAgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnQsXG4gICAgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlLFxuICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsXG4gICAgVGltZUFnb1BpcGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRm9ybUJ1aWxkZXIsXG4gICAgRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIEZvcm1FcnJvcnNTZXJ2aWNlLFxuICAgIFZhbGlkYXRpb25GYWN0b3J5LFxuICAgIEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnksXG4gICAgQWxlcnRzRmFjdG9yeSxcbiAgICBFeHByZXNzaW9uUnVubmVyLFxuICAgIEpzRXhwcmVzc2lvbkhlbHBlcixcbiAgICBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlLFxuICAgIEZvcm1TY2hlbWFDb21waWxlcixcbiAgICBGb3JtRmFjdG9yeSxcbiAgICBRdWVzdGlvbkZhY3RvcnksXG4gICAgVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnksXG4gICAgT2JzQWRhcHRlckhlbHBlcixcbiAgICBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgRW5jb3VudGVyQWRhcHRlcixcbiAgICBQZXJzb25BdHRyaWJ1QWRhcHRlcixcbiAgICBPcmRlclZhbHVlQWRhcHRlcixcbiAgICBEZWJ1Z01vZGVTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBGb3JtUmVuZGVyZXJDb21wb25lbnQsXG4gICAgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgRXJyb3JSZW5kZXJlckNvbXBvbmVudCxcbiAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUsXG4gICAgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRW50cnlNb2R1bGUge31cbiJdfQ==