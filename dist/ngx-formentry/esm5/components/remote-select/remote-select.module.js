import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { RemoteSelectComponent } from './remote-select.component';
var RemoteSelectModule = /** @class */ (function () {
    function RemoteSelectModule() {
    }
    RemoteSelectModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SelectModule, FormsModule],
            exports: [RemoteSelectComponent],
            declarations: [RemoteSelectComponent],
            providers: [],
        })
    ], RemoteSelectModule);
    return RemoteSelectModule;
}());
export { RemoteSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3Qyx3REFBd0Q7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBUWxFO0lBQUE7SUFBa0MsQ0FBQztJQUF0QixrQkFBa0I7UUFOOUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7WUFDbEQsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDaEMsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDckMsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztPQUNXLGtCQUFrQixDQUFJO0lBQUQseUJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBpbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICduZzItc2VsZWN0L25nMi1zZWxlY3QnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBSZW1vdGVTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3JlbW90ZS1zZWxlY3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTZWxlY3RNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUmVtb3RlU2VsZWN0Q29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtSZW1vdGVTZWxlY3RDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW10sXG59KVxuZXhwb3J0IGNsYXNzIFJlbW90ZVNlbGVjdE1vZHVsZSB7IH1cbiJdfQ==