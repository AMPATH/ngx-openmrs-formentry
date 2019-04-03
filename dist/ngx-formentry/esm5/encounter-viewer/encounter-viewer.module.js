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
var EncounterViewerModule = /** @class */ (function () {
    function EncounterViewerModule() {
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
    return EncounterViewerModule;
}());
export { EncounterViewerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQ7SUFBQTtJQXdCb0MsQ0FBQzs7Z0JBeEJwQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLHdCQUF3Qjt3QkFDeEIsMkJBQTJCO3dCQUMzQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZO3FCQUNmO29CQUNELFNBQVMsRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLHlCQUF5QjtxQkFDNUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLDJCQUEyQjt3QkFDM0IsVUFBVTtxQkFDYjtpQkFDSjs7SUFDbUMsNEJBQUM7Q0FBQSxBQXhCckMsSUF3QnFDO1NBQXhCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEVuY291bnRlclZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItcGRmLXZpZXdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL2ZpbGUtcHJldmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZW1vdGVBbnN3ZXJDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcmVtb3RlLWFuc3dlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50LFxyXG4gICAgICAgIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQsXHJcbiAgICAgICAgRmlsZVByZXZpZXdDb21wb25lbnQsXHJcbiAgICAgICAgUmVtb3RlQW5zd2VyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEh0dHBNb2R1bGUsXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRW5jb3VudGVyVmlld2VyU2VydmljZSxcclxuICAgICAgICBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBIdHRwTW9kdWxlXHJcbiAgICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyTW9kdWxlIHt9XHJcbiJdfQ==