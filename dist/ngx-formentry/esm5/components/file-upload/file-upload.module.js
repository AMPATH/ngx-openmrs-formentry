/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader-ampath';
import { SharedModule } from '../../shared.module';
import { SelectModule } from '../../components/select/select.module';
import { RemoteFileUploadComponent } from './file-upload.component';
var RemoteFileUploadModule = /** @class */ (function () {
    function RemoteFileUploadModule() {
    }
    RemoteFileUploadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, SelectModule, FormsModule, NgxFileUploaderModule, SharedModule],
                    exports: [RemoteFileUploadComponent],
                    declarations: [RemoteFileUploadComponent],
                    providers: [],
                },] },
    ];
    return RemoteFileUploadModule;
}());
export { RemoteFileUploadModule };
function RemoteFileUploadModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RemoteFileUploadModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RemoteFileUploadModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztnQkFFbkUsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLFlBQVksQ0FBQztvQkFDdkYsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3BDLFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUN6QyxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O2lDQWZEOztTQWdCYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ3hGaWxlVXBsb2FkZXJNb2R1bGUgfSBmcm9tICduZ3gtZmlsZS11cGxvYWRlci1hbXBhdGgnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkLm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICduZzItc2VsZWN0L25nMi1zZWxlY3QnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNlbGVjdE1vZHVsZSwgRm9ybXNNb2R1bGUsIE5neEZpbGVVcGxvYWRlck1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSB7IH1cbiJdfQ==