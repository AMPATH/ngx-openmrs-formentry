import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
let ErrorRendererComponent = class ErrorRendererComponent {
    constructor(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    ngOnInit() {
    }
    showErrors() {
        return !this.form.valid && this.form.showErrors;
    }
    get errorNodes() {
        const invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
        return invalidControls;
    }
    getControlError(node) {
        const errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
    announceErrorField(errorNode) {
        const nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, (node) => {
            if (node.question.renderingType === 'page') {
                const pageIndex = this.getPageIndex(node);
                this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    }
    getPageIndex(node) {
        const questionGroup = this.form.rootNode.question;
        return questionGroup.questions.indexOf(node.question);
    }
};
ErrorRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: FormErrorsService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Form)
], ErrorRendererComponent.prototype, "form", void 0);
ErrorRendererComponent = tslib_1.__decorate([
    Component({
        selector: 'error-renderer',
        template: "<div *ngIf=\"showErrors()\" class=\"container\">\n<ul class=\"list-group\">\n  <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n    <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n      <h4>{{errorNode.question.label}}</h4>\n      <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n    </div>\n  </li>\n</ul>\n</div>\n",
        styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ValidationFactory, FormErrorsService])
], ErrorRendererComponent);
export { ErrorRendererComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Vycm9yLXJlbmRlcmVyL2Vycm9yLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUd2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9wRSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUlqQyxZQUFvQixpQkFBb0MsRUFBVSxpQkFBb0M7UUFBbEYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBRyxDQUFDO0lBRTFHLFFBQVE7SUFDUixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBRVosTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RSxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQWM7UUFDMUIsTUFBTSxNQUFNLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFeEMsSUFBSSxNQUFNLEVBQUU7WUFFUixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRDtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELGtCQUFrQixDQUFDLFNBQW1CO1FBRXBDLE1BQU0sS0FBSyxHQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUgsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFjLEVBQUUsRUFBRTtZQUVsQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU0sRUFBRTtnQkFDMUMsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFjO1FBQ3hCLE1BQU0sYUFBYSxHQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUF5QixDQUFDO1FBQ2xGLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRixDQUFBOztZQTNDd0MsaUJBQWlCO1lBQTZCLGlCQUFpQjs7QUFGN0Y7SUFBUixLQUFLLEVBQUU7c0NBQU8sSUFBSTtvREFBQztBQUZULHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLGljQUE0Qzs7S0FFL0MsQ0FBQzs2Q0FLdUMsaUJBQWlCLEVBQTZCLGlCQUFpQjtHQUozRixzQkFBc0IsQ0ErQ2xDO1NBL0NZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IE5vZGVCYXNlLCBMZWFmTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vycm9yLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Vycm9yLXJlbmRlcmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9lcnJvci1yZW5kZXJlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZm9ybTogRm9ybTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSwgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBzaG93RXJyb3JzKCkge1xuICAgIHJldHVybiAhdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZm9ybS5zaG93RXJyb3JzO1xuICB9XG5cbiAgZ2V0IGVycm9yTm9kZXMoKSB7XG5cbiAgICBjb25zdCBpbnZhbGlkQ29udHJvbHMgPSB0aGlzLmZvcm0ubWFya0ludmFsaWRDb250cm9scyh0aGlzLmZvcm0ucm9vdE5vZGUsIFtdKTtcbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xzO1xuICB9XG5cbiAgZ2V0Q29udHJvbEVycm9yKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgICBjb25zdCBlcnJvcnM6IGFueSA9IG5vZGUuY29udHJvbC5lcnJvcnM7XG5cbiAgICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW107XG4gIH1cblxuICBhbm5vdW5jZUVycm9yRmllbGQoZXJyb3JOb2RlOiBMZWFmTm9kZSkge1xuXG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PE5vZGVCYXNlPiA9IHRoaXMuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKGVycm9yTm9kZS5wYXRoLnN1YnN0cmluZygwLCBlcnJvck5vZGUucGF0aC5pbmRleE9mKCcuJykpKTtcblxuICAgIF8uZm9yRWFjaChub2RlcywgKG5vZGU6IE5vZGVCYXNlKSA9PiB7XG5cbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgICBjb25zdCBwYWdlSW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0UGFnZUluZGV4KG5vZGUpO1xuICAgICAgICB0aGlzLmZvcm1FcnJvcnNTZXJ2aWNlLmFubm91bmNlRXJyb3JGaWVsZChwYWdlSW5kZXggKyAnLCcgKyBlcnJvck5vZGUucXVlc3Rpb24ua2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFBhZ2VJbmRleChub2RlOiBOb2RlQmFzZSkge1xuICAgICBjb25zdCBxdWVzdGlvbkdyb3VwOiBRdWVzdGlvbkdyb3VwID0gdGhpcy5mb3JtLnJvb3ROb2RlLnF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXA7XG4gICAgIHJldHVybiBxdWVzdGlvbkdyb3VwLnF1ZXN0aW9ucy5pbmRleE9mKG5vZGUucXVlc3Rpb24pO1xuICB9XG59XG4iXX0=