/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DebugModeService } from '../form-entry/services/debug-mode.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormErrorsService } from './services';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ErrorRendererComponent } from './error-renderer/error-renderer.component';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { SelectModule } from '../components/select';
import { RemoteFileUploadModule } from '../components/file-upload/file-upload.module';
import { DateTimePickerModule } from '../components/date-time-picker';
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
import { EncounterAdapter, PersonAttribuAdapter, OrderValueAdapter, ObsValueAdapter, ObsAdapterHelper } from './value-adapters';
import { RemoteSelectModule } from '../components/remote-select/remote-select.module';
import { DataSources } from './data-sources/data-sources';
import { AppointmentsOverviewComponent } from '../components/appointments-overview/appointments-overview.component';
import { EncounterViewerModule } from '../encounter-viewer/encounter-viewer.module';
import { CheckboxModule } from '../components/check-box/checkbox.module';
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
                    NgxDateTimePickerModule
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
                    DebugModeService,
                    DataSources
                ],
                exports: [FormRendererComponent, AfeNgSelectComponent,
                    ErrorRendererComponent, DateTimePickerModule, EncounterViewerModule, NgxDateTimePickerModule]
            },] },
];
function FormEntryModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormEntryModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormEntryModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDekcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUNILGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUN6RCxlQUFlLEVBQUUsZ0JBQWdCLEVBQ3BDLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFDSCw2QkFBNkIsRUFDaEMsTUFBTSxxRUFBcUUsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFtRHpFLE1BQU07OztZQWhETCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWTtvQkFDbEIsbUJBQW1CO29CQUNuQixjQUFjO29CQUNkLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixhQUFhO29CQUNiLHVCQUF1QjtpQkFDMUI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQiw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixzQkFBc0I7b0JBQ3RCLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLDRCQUE0QjtvQkFDNUIsa0JBQWtCO29CQUNsQixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLFdBQVc7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CO29CQUNqRCxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRyx1QkFBdUIsQ0FBQzthQUNyRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSEFNTUVSX0dFU1RVUkVfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbGxhcHNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIYW1tZXJDb25maWcgfSBmcm9tICcuL2hlbHBlcnMvaGFtbWVyLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZXJyb3ItcmVuZGVyZXIvZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9oaXN0b3JpY2FsLXZhbHVlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3QnO1xuaW1wb3J0IHsgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQubW9kdWxlJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyJztcbmltcG9ydCB7IE5neERhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgQWZlTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnknO1xuaW1wb3J0IHsgQWxlcnRzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybVNjaGVtYUNvbXBpbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXNjaGVtYS1jb21waWxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5JztcbmltcG9ydCB7IFF1ZXN0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7XG4gICAgRW5jb3VudGVyQWRhcHRlciwgUGVyc29uQXR0cmlidUFkYXB0ZXIsIE9yZGVyVmFsdWVBZGFwdGVyLFxuICAgIE9ic1ZhbHVlQWRhcHRlciwgT2JzQWRhcHRlckhlbHBlclxufSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzJztcbmltcG9ydCB7IFJlbW90ZVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtb3RlLXNlbGVjdC9yZW1vdGUtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4vZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQge1xuICAgIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50XG59IGZyb20gJy4uL2NvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyTW9kdWxlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2stYm94L2NoZWNrYm94Lm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBDb2xsYXBzZU1vZHVsZSxcbiAgICAgICAgU2VsZWN0TW9kdWxlLFxuICAgICAgICBEYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICAgICAgUmVtb3RlU2VsZWN0TW9kdWxlLFxuICAgICAgICBSZW1vdGVGaWxlVXBsb2FkTW9kdWxlLFxuICAgICAgICBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUsXG4gICAgICAgIENoZWNrYm94TW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZvcm1SZW5kZXJlckNvbXBvbmVudCxcbiAgICAgICAgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUsXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGb3JtQnVpbGRlcixcbiAgICAgICAgRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgICAgICBGb3JtRXJyb3JzU2VydmljZSxcbiAgICAgICAgVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgICAgIEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnksXG4gICAgICAgIEFsZXJ0c0ZhY3RvcnksXG4gICAgICAgIEV4cHJlc3Npb25SdW5uZXIsXG4gICAgICAgIEpzRXhwcmVzc2lvbkhlbHBlcixcbiAgICAgICAgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSxcbiAgICAgICAgRm9ybVNjaGVtYUNvbXBpbGVyLFxuICAgICAgICBGb3JtRmFjdG9yeSxcbiAgICAgICAgUXVlc3Rpb25GYWN0b3J5LFxuICAgICAgICBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICAgICAgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnksXG4gICAgICAgIE9ic0FkYXB0ZXJIZWxwZXIsXG4gICAgICAgIE9ic1ZhbHVlQWRhcHRlcixcbiAgICAgICAgRW5jb3VudGVyQWRhcHRlcixcbiAgICAgICAgUGVyc29uQXR0cmlidUFkYXB0ZXIsXG4gICAgICAgIE9yZGVyVmFsdWVBZGFwdGVyLFxuICAgICAgICBEZWJ1Z01vZGVTZXJ2aWNlLFxuICAgICAgICBEYXRhU291cmNlc1xuICAgIF0sXG4gICAgZXhwb3J0czogW0Zvcm1SZW5kZXJlckNvbXBvbmVudCwgQWZlTmdTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIEVycm9yUmVuZGVyZXJDb21wb25lbnQsIERhdGVUaW1lUGlja2VyTW9kdWxlLCBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUgLCBOZ3hEYXRlVGltZVBpY2tlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVudHJ5TW9kdWxlIHtcblxufVxuIl19