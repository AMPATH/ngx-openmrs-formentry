/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
import { EncounterPdfViewerService } from './encounter-pdf-viewer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlComponent } from './display-controls/question-control.component';
import { FilePreviewComponent } from './display-controls/file-preview.component';
import { RemoteAnswerComponent } from './display-controls/remote-answer.component';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared.module';
export class EncounterViewerModule {
}
EncounterViewerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    EncounterViewerComponent,
                    EncounterContainerComponent,
                    QuestionControlComponent,
                    FilePreviewComponent,
                    RemoteAnswerComponent
                ],
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    HttpModule,
                    SharedModule
                ],
                providers: [
                    EncounterViewerService,
                    EncounterPdfViewerService
                ],
                exports: [
                    EncounterContainerComponent,
                    HttpModule
                ],
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUF5QmhELE1BQU07OztZQXhCTCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHdCQUF3QjtvQkFDeEIsMkJBQTJCO29CQUMzQix3QkFBd0I7b0JBQ3hCLG9CQUFvQjtvQkFDcEIscUJBQXFCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixZQUFZO2lCQUNmO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxzQkFBc0I7b0JBQ3RCLHlCQUF5QjtpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLDJCQUEyQjtvQkFDM0IsVUFBVTtpQkFDYjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9lbmNvdW50ZXItdmlldy9lbmNvdW50ZXItdmlld2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL3F1ZXN0aW9uLWNvbnRyb2wuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsZVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvZmlsZS1wcmV2aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJlbW90ZUFuc3dlckNvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9yZW1vdGUtYW5zd2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkLm1vZHVsZSc7XHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQsXHJcbiAgICAgICAgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgIFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCxcclxuICAgICAgICBGaWxlUHJldmlld0NvbXBvbmVudCxcclxuICAgICAgICBSZW1vdGVBbnN3ZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGVcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxyXG4gICAgICAgIEVuY291bnRlclBkZlZpZXdlclNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgIEh0dHBNb2R1bGVcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUge31cclxuIl19