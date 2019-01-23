/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import { TimeAgoPipe } from 'time-ago-pipe';
export class FormEntryModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUN6RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFFLDZCQUE2QixFQUFDLE1BQU0scUVBQXFFLENBQUM7QUFDbkgsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0Q1QyxNQUFNOzs7WUFqREwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVk7b0JBQ2xCLG1CQUFtQjtvQkFDbkIsY0FBYztvQkFDZCxZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYix1QkFBdUI7b0JBQ3ZCLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQiw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO29CQUN0QixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxXQUFXO29CQUNYLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtvQkFDdEIsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsNEJBQTRCO29CQUM1QixrQkFBa0I7b0JBQ2xCLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CO29CQUNqRCxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRyx1QkFBdUIsQ0FBQzthQUNyRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlICwgTWF0SWNvbk1vZHVsZSAsIE1hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbGxhcHNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm1SZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1yZW5kZXJlci9mb3JtLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2hpc3RvcmljYWwtdmFsdWUtZGlyZWN0aXZlJztcbmltcG9ydCB7IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2hlbHBlcnMvaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmd4LWRhdGUtdGltZS1waWNrZXIvbmd4LWRhdGUtdGltZS1waWNrZXIubW9kdWxlJztcbmltcG9ydCB7IEFmZU5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9hZmUtbmctc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9zaG93LW1lc3NhZ2VzLmZhY3RvcnknO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm1TY2hlbWFDb21waWxlciB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9xdWVzdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9lbmNvdW50ZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBQZXJzb25BdHRyaWJ1QWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvcGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9yZGVyVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vcmRlci5hZGFwdGVyJztcbmltcG9ydCB7IE9ic0FkYXB0ZXJIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy1hZGFwdGVyLWhlbHBlcic7XG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcbmltcG9ydCB7IFJlbW90ZVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtb3RlLXNlbGVjdC9yZW1vdGUtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9hcHBvaW50bWVudHMtb3ZlcnZpZXcvYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVGltZUFnb1BpcGUgfSBmcm9tICd0aW1lLWFnby1waXBlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbGxhcHNlTW9kdWxlLFxuICAgICAgICBTZWxlY3RNb2R1bGUsXG4gICAgICAgIERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICBSZW1vdGVTZWxlY3RNb2R1bGUsXG4gICAgICAgIFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUsXG4gICAgICAgIEVuY291bnRlclZpZXdlck1vZHVsZSxcbiAgICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE5neERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGb3JtUmVuZGVyZXJDb21wb25lbnQsXG4gICAgICAgIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCxcbiAgICAgICAgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlLFxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LFxuICAgICAgICBUaW1lQWdvUGlwZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEZvcm1CdWlsZGVyLFxuICAgICAgICBGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgICAgIEZvcm1FcnJvcnNTZXJ2aWNlLFxuICAgICAgICBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICAgICAgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSxcbiAgICAgICAgQWxlcnRzRmFjdG9yeSxcbiAgICAgICAgRXhwcmVzc2lvblJ1bm5lcixcbiAgICAgICAgSnNFeHByZXNzaW9uSGVscGVyLFxuICAgICAgICBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlLFxuICAgICAgICBGb3JtU2NoZW1hQ29tcGlsZXIsXG4gICAgICAgIEZvcm1GYWN0b3J5LFxuICAgICAgICBRdWVzdGlvbkZhY3RvcnksXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxuICAgICAgICBDb250cm9sUmVsYXRpb25zRmFjdG9yeSxcbiAgICAgICAgT2JzQWRhcHRlckhlbHBlcixcbiAgICAgICAgT2JzVmFsdWVBZGFwdGVyLFxuICAgICAgICBFbmNvdW50ZXJBZGFwdGVyLFxuICAgICAgICBQZXJzb25BdHRyaWJ1QWRhcHRlcixcbiAgICAgICAgT3JkZXJWYWx1ZUFkYXB0ZXIsXG4gICAgICAgIERlYnVnTW9kZVNlcnZpY2VcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtGb3JtUmVuZGVyZXJDb21wb25lbnQsIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LCBEYXRlVGltZVBpY2tlck1vZHVsZSwgRW5jb3VudGVyVmlld2VyTW9kdWxlICwgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbnRyeU1vZHVsZSB7XG5cbn1cbiJdfQ==