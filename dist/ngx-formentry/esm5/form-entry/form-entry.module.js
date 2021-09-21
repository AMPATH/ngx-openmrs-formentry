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
    return FormEntryModule;
}());
export { FormEntryModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsOEVBQThFO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOENBQThD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bnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG4vLyBpbXBvcnQgeyBOb29wQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbGxhcHNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm1SZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1yZW5kZXJlci9mb3JtLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2hpc3RvcmljYWwtdmFsdWUtZGlyZWN0aXZlJztcbmltcG9ydCB7IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2hlbHBlcnMvaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlJztcbi8vIGltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQubW9kdWxlJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5neERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgQWZlTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnknO1xuaW1wb3J0IHsgQWxlcnRzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybVNjaGVtYUNvbXBpbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXNjaGVtYS1jb21waWxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5JztcbmltcG9ydCB7IFF1ZXN0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcbmltcG9ydCB7IFBlcnNvbkF0dHJpYnVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXInO1xuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29yZGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2JzQWRhcHRlckhlbHBlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb2JzLWFkYXB0ZXItaGVscGVyJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgUmVtb3RlU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9yZW1vdGUtc2VsZWN0L3JlbW90ZS1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9hcHBvaW50bWVudHMtb3ZlcnZpZXcvYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVGltZUFnb1BpcGUgfSBmcm9tICd0aW1lLWFnby1waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbGxhcHNlTW9kdWxlLFxuICAgIC8vIE5nU2VsZWN0TW9kdWxlLFxuICAgIFNlbGVjdE1vZHVsZSxcbiAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBSZW1vdGVTZWxlY3RNb2R1bGUsXG4gICAgLy8gTm9vcEFuaW1hdGlvbnNNb2R1bGUsXG4gICAgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSxcbiAgICBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUsXG4gICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEZvcm1SZW5kZXJlckNvbXBvbmVudCxcbiAgICBBZmVOZ1NlbGVjdENvbXBvbmVudCxcbiAgICBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCxcbiAgICBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUsXG4gICAgRXJyb3JSZW5kZXJlckNvbXBvbmVudCxcbiAgICBUaW1lQWdvUGlwZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBGb3JtQnVpbGRlcixcbiAgICBGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSxcbiAgICBBbGVydHNGYWN0b3J5LFxuICAgIEV4cHJlc3Npb25SdW5uZXIsXG4gICAgSnNFeHByZXNzaW9uSGVscGVyLFxuICAgIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UsXG4gICAgRm9ybVNjaGVtYUNvbXBpbGVyLFxuICAgIEZvcm1GYWN0b3J5LFxuICAgIFF1ZXN0aW9uRmFjdG9yeSxcbiAgICBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICBDb250cm9sUmVsYXRpb25zRmFjdG9yeSxcbiAgICBPYnNBZGFwdGVySGVscGVyLFxuICAgIE9ic1ZhbHVlQWRhcHRlcixcbiAgICBFbmNvdW50ZXJBZGFwdGVyLFxuICAgIFBlcnNvbkF0dHJpYnVBZGFwdGVyLFxuICAgIE9yZGVyVmFsdWVBZGFwdGVyLFxuICAgIERlYnVnTW9kZVNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZvcm1SZW5kZXJlckNvbXBvbmVudCxcbiAgICBBZmVOZ1NlbGVjdENvbXBvbmVudCxcbiAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LFxuICAgIERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIEVuY291bnRlclZpZXdlck1vZHVsZSxcbiAgICBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbnRyeU1vZHVsZSB7fVxuIl19