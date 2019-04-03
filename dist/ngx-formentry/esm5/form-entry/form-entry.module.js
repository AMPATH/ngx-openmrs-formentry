/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQUVqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBRWxFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGLE9BQU8sRUFB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YW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0VGFic01vZHVsZSAsIE1hdEljb25Nb2R1bGUgLCBNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE5vb3BBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbGxhcHNlJztcclxuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcclxuaW1wb3J0IHsgRm9ybVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXJyb3JSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZXJyb3ItcmVuZGVyZXIvZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2hpc3RvcmljYWwtdmFsdWUtZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB9IGZyb20gJy4vaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XHJcbi8vIGltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xyXG5pbXBvcnQgeyBSZW1vdGVGaWxlVXBsb2FkTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5neERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBZmVOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvYWZlLW5nLXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcclxuaW1wb3J0IHsgQWxlcnRzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcclxuaW1wb3J0IHsgRm9ybVNjaGVtYUNvbXBpbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXNjaGVtYS1jb21waWxlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9xdWVzdGlvbi5mYWN0b3J5JztcclxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcclxuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xyXG5pbXBvcnQgeyBQZXJzb25BdHRyaWJ1QWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvcGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyJztcclxuaW1wb3J0IHsgT3JkZXJWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29yZGVyLmFkYXB0ZXInO1xyXG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXInO1xyXG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcclxuaW1wb3J0IHsgUmVtb3RlU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9yZW1vdGUtc2VsZWN0L3JlbW90ZS1zZWxlY3QubW9kdWxlJztcclxuaW1wb3J0IHsgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlJztcclxuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrLWJveC9jaGVja2JveC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQubW9kdWxlJztcclxuaW1wb3J0IHsgVGltZUFnb1BpcGUgfSBmcm9tICd0aW1lLWFnby1waXBlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIENvbGxhcHNlTW9kdWxlLFxyXG4gICAgICAgIC8vIE5nU2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcclxuICAgICAgICBSZW1vdGVTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgLy8gTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICAgICAgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSxcclxuICAgICAgICBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUsXHJcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRm9ybVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICAgIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50LFxyXG4gICAgICAgIEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSxcclxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICAgIFRpbWVBZ29QaXBlXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRm9ybUJ1aWxkZXIsXHJcbiAgICAgICAgRm9ybUNvbnRyb2xTZXJ2aWNlLFxyXG4gICAgICAgIEZvcm1FcnJvcnNTZXJ2aWNlLFxyXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxyXG4gICAgICAgIEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnksXHJcbiAgICAgICAgQWxlcnRzRmFjdG9yeSxcclxuICAgICAgICBFeHByZXNzaW9uUnVubmVyLFxyXG4gICAgICAgIEpzRXhwcmVzc2lvbkhlbHBlcixcclxuICAgICAgICBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlLFxyXG4gICAgICAgIEZvcm1TY2hlbWFDb21waWxlcixcclxuICAgICAgICBGb3JtRmFjdG9yeSxcclxuICAgICAgICBRdWVzdGlvbkZhY3RvcnksXHJcbiAgICAgICAgVmFsaWRhdGlvbkZhY3RvcnksXHJcbiAgICAgICAgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnksXHJcbiAgICAgICAgT2JzQWRhcHRlckhlbHBlcixcclxuICAgICAgICBPYnNWYWx1ZUFkYXB0ZXIsXHJcbiAgICAgICAgRW5jb3VudGVyQWRhcHRlcixcclxuICAgICAgICBQZXJzb25BdHRyaWJ1QWRhcHRlcixcclxuICAgICAgICBPcmRlclZhbHVlQWRhcHRlcixcclxuICAgICAgICBEZWJ1Z01vZGVTZXJ2aWNlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW0Zvcm1SZW5kZXJlckNvbXBvbmVudCwgQWZlTmdTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgRXJyb3JSZW5kZXJlckNvbXBvbmVudCwgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsIEVuY291bnRlclZpZXdlck1vZHVsZSAsIE5neERhdGVUaW1lUGlja2VyTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUVudHJ5TW9kdWxlIHtcclxuXHJcbn1cclxuIl19