import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
var ErrorRendererComponent = /** @class */ (function () {
    function ErrorRendererComponent(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    ErrorRendererComponent.prototype.ngOnInit = function () { };
    ErrorRendererComponent.prototype.showErrors = function () {
        return !this.form.valid && this.form.showErrors;
    };
    Object.defineProperty(ErrorRendererComponent.prototype, "errorNodes", {
        get: function () {
            var invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
            return invalidControls;
        },
        enumerable: true,
        configurable: true
    });
    ErrorRendererComponent.prototype.getControlError = function (node) {
        var errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    ErrorRendererComponent.prototype.announceErrorField = function (errorNode) {
        var _this = this;
        var nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, function (node) {
            if (node.question.renderingType === 'page') {
                var pageIndex = _this.getPageIndex(node);
                _this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    };
    ErrorRendererComponent.prototype.getPageIndex = function (node) {
        var questionGroup = this.form.rootNode
            .question;
        return questionGroup.questions.indexOf(node.question);
    };
    ErrorRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'error-renderer',
                    template: "<div *ngIf=\"showErrors()\" class=\"container\">\n  <ul class=\"list-group\">\n    <li\n      class=\"list-group-item list-group-item-warning\"\n      *ngFor=\"let errorNode of errorNodes\"\n      (click)=\"announceErrorField(errorNode)\"\n    >\n      <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n        <h4>{{ errorNode.question.label }}</h4>\n        <span class=\"text-danger\"> {{ getControlError(errorNode) }}</span>\n      </div>\n    </li>\n  </ul>\n</div>\n",
                    styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
                },] },
    ];
    ErrorRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory },
        { type: FormErrorsService }
    ]; };
    ErrorRendererComponent.propDecorators = {
        form: [{ type: Input }]
    };
    return ErrorRendererComponent;
}());
export { ErrorRendererComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBR3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXBFO0lBc0JFLGdDQUNVLGlCQUFvQyxFQUNwQyxpQkFBb0M7UUFEcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzNDLENBQUM7SUFFSix5Q0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLDJDQUFVLEdBQVY7UUFDRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsc0JBQUksOENBQVU7YUFBZDtZQUNFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNsQixFQUFFLENBQ0gsQ0FBQztZQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxnREFBZSxHQUFmLFVBQWdCLElBQWM7UUFDNUIsSUFBTSxNQUFNLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsbURBQWtCLEdBQWxCLFVBQW1CLFNBQW1CO1FBQXRDLGlCQWFDO1FBWkMsSUFBTSxLQUFLLEdBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQzdELFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1FBRUYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFjO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQU0sU0FBUyxHQUFXLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FDdkMsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDekMsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBWSxHQUFaLFVBQWEsSUFBYztRQUN6QixJQUFNLGFBQWEsR0FBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3BELFFBQXlCLENBQUM7UUFDN0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkF0RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSwwZUFjWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw0SUFBNEksQ0FBQztpQkFDdko7OztnQkF2QlEsaUJBQWlCO2dCQUdqQixpQkFBaUI7Ozt1QkFzQnZCLEtBQUs7O0lBbURSLDZCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0FwRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vycm9yLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwic2hvd0Vycm9ycygpXCIgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxuICAgIDxsaVxuICAgICAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLXdhcm5pbmdcIlxuICAgICAgKm5nRm9yPVwibGV0IGVycm9yTm9kZSBvZiBlcnJvck5vZGVzXCJcbiAgICAgIChjbGljayk9XCJhbm5vdW5jZUVycm9yRmllbGQoZXJyb3JOb2RlKVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJlcnJvck5vZGUuY29udHJvbC52YWxpZCA9PSBmYWxzZVwiPlxuICAgICAgICA8aDQ+e3sgZXJyb3JOb2RlLnF1ZXN0aW9uLmxhYmVsIH19PC9oND5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPiB7eyBnZXRDb250cm9sRXJyb3IoZXJyb3JOb2RlKSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIDwvdWw+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B1bHtsaXN0LXN0eWxlOm5vbmV9Lmxpc3QtZ3JvdXAtaXRlbXtwYWRkaW5nOjJweCAxNXB4O2N1cnNvcjpwb2ludGVyfXVsIGxpOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2ZmZn1oNHttYXJnaW4tdG9wOjdweDttYXJnaW4tYm90dG9tOjdweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZm9ybTogRm9ybTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIHNob3dFcnJvcnMoKSB7XG4gICAgcmV0dXJuICF0aGlzLmZvcm0udmFsaWQgJiYgdGhpcy5mb3JtLnNob3dFcnJvcnM7XG4gIH1cblxuICBnZXQgZXJyb3JOb2RlcygpIHtcbiAgICBjb25zdCBpbnZhbGlkQ29udHJvbHMgPSB0aGlzLmZvcm0ubWFya0ludmFsaWRDb250cm9scyhcbiAgICAgIHRoaXMuZm9ybS5yb290Tm9kZSxcbiAgICAgIFtdXG4gICAgKTtcbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xzO1xuICB9XG5cbiAgZ2V0Q29udHJvbEVycm9yKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgY29uc3QgZXJyb3JzOiBhbnkgPSBub2RlLmNvbnRyb2wuZXJyb3JzO1xuXG4gICAgaWYgKGVycm9ycykge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZTogTGVhZk5vZGUpIHtcbiAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gdGhpcy5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoXG4gICAgICBlcnJvck5vZGUucGF0aC5zdWJzdHJpbmcoMCwgZXJyb3JOb2RlLnBhdGguaW5kZXhPZignLicpKVxuICAgICk7XG5cbiAgICBfLmZvckVhY2gobm9kZXMsIChub2RlOiBOb2RlQmFzZSkgPT4ge1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VJbmRleDogbnVtYmVyID0gdGhpcy5nZXRQYWdlSW5kZXgobm9kZSk7XG4gICAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkKFxuICAgICAgICAgIHBhZ2VJbmRleCArICcsJyArIGVycm9yTm9kZS5xdWVzdGlvbi5rZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFBhZ2VJbmRleChub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IHF1ZXN0aW9uR3JvdXA6IFF1ZXN0aW9uR3JvdXAgPSB0aGlzLmZvcm0ucm9vdE5vZGVcbiAgICAgIC5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xuICAgIHJldHVybiBxdWVzdGlvbkdyb3VwLnF1ZXN0aW9ucy5pbmRleE9mKG5vZGUucXVlc3Rpb24pO1xuICB9XG59XG4iXX0=