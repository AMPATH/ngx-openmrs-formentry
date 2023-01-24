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
    /** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Vycm9yLXJlbmRlcmVyL2Vycm9yLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEU7SUFzQkUsZ0NBQ1UsaUJBQW9DLEVBQ3BDLGlCQUFvQztRQURwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDM0MsQ0FBQztJQUVKLHlDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRWIsMkNBQVUsR0FBVjtRQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2xELENBQUM7SUFFRCxzQkFBSSw4Q0FBVTthQUFkO1lBQ0UsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ2xCLEVBQUUsQ0FDSCxDQUFDO1lBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELGdEQUFlLEdBQWYsVUFBZ0IsSUFBYztRQUM1QixJQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxtREFBa0IsR0FBbEIsVUFBbUIsU0FBbUI7UUFBdEMsaUJBYUM7UUFaQyxJQUFNLEtBQUssR0FBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FDN0QsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3pELENBQUM7UUFFRixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFDLElBQWM7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBTSxTQUFTLEdBQVcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUN2QyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QyxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZDQUFZLEdBQVosVUFBYSxJQUFjO1FBQ3pCLElBQU0sYUFBYSxHQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDcEQsUUFBeUIsQ0FBQztRQUM3QixNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O2dCQXRFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDBlQWNYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDRJQUE0SSxDQUFDO2lCQUN2Sjs7OztnQkF2QlEsaUJBQWlCO2dCQUdqQixpQkFBaUI7Ozt1QkFzQnZCLEtBQUs7O0lBbURSLDZCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0FwRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vycm9yLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwic2hvd0Vycm9ycygpXCIgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxuICAgIDxsaVxuICAgICAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLXdhcm5pbmdcIlxuICAgICAgKm5nRm9yPVwibGV0IGVycm9yTm9kZSBvZiBlcnJvck5vZGVzXCJcbiAgICAgIChjbGljayk9XCJhbm5vdW5jZUVycm9yRmllbGQoZXJyb3JOb2RlKVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJlcnJvck5vZGUuY29udHJvbC52YWxpZCA9PSBmYWxzZVwiPlxuICAgICAgICA8aDQ+e3sgZXJyb3JOb2RlLnF1ZXN0aW9uLmxhYmVsIH19PC9oND5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPiB7eyBnZXRDb250cm9sRXJyb3IoZXJyb3JOb2RlKSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIDwvdWw+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B1bHtsaXN0LXN0eWxlOm5vbmV9Lmxpc3QtZ3JvdXAtaXRlbXtwYWRkaW5nOjJweCAxNXB4O2N1cnNvcjpwb2ludGVyfXVsIGxpOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2ZmZn1oNHttYXJnaW4tdG9wOjdweDttYXJnaW4tYm90dG9tOjdweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZm9ybTogRm9ybTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIHNob3dFcnJvcnMoKSB7XG4gICAgcmV0dXJuICF0aGlzLmZvcm0udmFsaWQgJiYgdGhpcy5mb3JtLnNob3dFcnJvcnM7XG4gIH1cblxuICBnZXQgZXJyb3JOb2RlcygpIHtcbiAgICBjb25zdCBpbnZhbGlkQ29udHJvbHMgPSB0aGlzLmZvcm0ubWFya0ludmFsaWRDb250cm9scyhcbiAgICAgIHRoaXMuZm9ybS5yb290Tm9kZSxcbiAgICAgIFtdXG4gICAgKTtcbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xzO1xuICB9XG5cbiAgZ2V0Q29udHJvbEVycm9yKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgY29uc3QgZXJyb3JzOiBhbnkgPSBub2RlLmNvbnRyb2wuZXJyb3JzO1xuXG4gICAgaWYgKGVycm9ycykge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZTogTGVhZk5vZGUpIHtcbiAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gdGhpcy5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoXG4gICAgICBlcnJvck5vZGUucGF0aC5zdWJzdHJpbmcoMCwgZXJyb3JOb2RlLnBhdGguaW5kZXhPZignLicpKVxuICAgICk7XG5cbiAgICBfLmZvckVhY2gobm9kZXMsIChub2RlOiBOb2RlQmFzZSkgPT4ge1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VJbmRleDogbnVtYmVyID0gdGhpcy5nZXRQYWdlSW5kZXgobm9kZSk7XG4gICAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkKFxuICAgICAgICAgIHBhZ2VJbmRleCArICcsJyArIGVycm9yTm9kZS5xdWVzdGlvbi5rZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFBhZ2VJbmRleChub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IHF1ZXN0aW9uR3JvdXA6IFF1ZXN0aW9uR3JvdXAgPSB0aGlzLmZvcm0ucm9vdE5vZGVcbiAgICAgIC5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xuICAgIHJldHVybiBxdWVzdGlvbkdyb3VwLnF1ZXN0aW9ucy5pbmRleE9mKG5vZGUucXVlc3Rpb24pO1xuICB9XG59XG4iXX0=