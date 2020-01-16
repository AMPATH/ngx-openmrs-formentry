import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlComponent } from './display-controls/question-control.component';
import { FilePreviewComponent } from './display-controls/file-preview.component';
import { RemoteAnswerComponent } from './display-controls/remote-answer.component';
// import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared.module';
var EncounterViewerModule = /** @class */ (function () {
    function EncounterViewerModule() {
    }
    EncounterViewerModule = tslib_1.__decorate([
        NgModule({
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
                // HttpModule,
                SharedModule
            ],
            providers: [
                EncounterViewerService
            ],
            exports: [
                EncounterContainerComponent
                // HttpModule
            ],
        })
    ], EncounterViewerModule);
    return EncounterViewerModule;
}());
export { EncounterViewerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRiw4Q0FBOEM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBd0JoRDtJQUFBO0lBQW9DLENBQUM7SUFBeEIscUJBQXFCO1FBdkJqQyxRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1Ysd0JBQXdCO2dCQUN4QiwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsb0JBQW9CO2dCQUNwQixxQkFBcUI7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxZQUFZO2FBQ2Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asc0JBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDJCQUEyQjtnQkFDM0IsYUFBYTthQUNoQjtTQUNKLENBQUM7T0FDVyxxQkFBcUIsQ0FBRztJQUFELDRCQUFDO0NBQUEsQUFBckMsSUFBcUM7U0FBeEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvZmlsZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZW1vdGVBbnN3ZXJDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcmVtb3RlLWFuc3dlci5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQsXG4gICAgICAgIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50LFxuICAgICAgICBGaWxlUHJldmlld0NvbXBvbmVudCxcbiAgICAgICAgUmVtb3RlQW5zd2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIC8vIEh0dHBNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEVuY291bnRlclZpZXdlclNlcnZpY2VcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50XG4gICAgICAgIC8vIEh0dHBNb2R1bGVcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJNb2R1bGUge31cbiJdfQ==