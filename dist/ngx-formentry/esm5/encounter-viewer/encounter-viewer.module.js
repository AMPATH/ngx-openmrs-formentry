/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQ7SUFBQTtJQXVCb0MsQ0FBQzs7Z0JBdkJwQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLHdCQUF3Qjt3QkFDeEIsMkJBQTJCO3dCQUMzQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZO3FCQUNmO29CQUNELFNBQVMsRUFBRTt3QkFDUCxzQkFBc0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCwyQkFBMkI7d0JBQzNCLFVBQVU7cUJBQ2I7aUJBQ0o7O0lBQ21DLDRCQUFDO0NBQUEsQUF2QnJDLElBdUJxQztTQUF4QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lbmNvdW50ZXItY29udGFpbmVyL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWxlUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFJlbW90ZUFuc3dlckNvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9yZW1vdGUtYW5zd2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEVuY291bnRlclZpZXdlckNvbXBvbmVudCxcbiAgICAgICAgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgIEZpbGVQcmV2aWV3Q29tcG9uZW50LFxuICAgICAgICBSZW1vdGVBbnN3ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cE1vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBIdHRwTW9kdWxlXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyTW9kdWxlIHt9XG4iXX0=