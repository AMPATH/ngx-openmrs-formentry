/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @return {?}
     */
    ErrorRendererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ErrorRendererComponent.prototype.showErrors = /**
     * @return {?}
     */
    function () {
        return !this.form.valid && this.form.showErrors;
    };
    Object.defineProperty(ErrorRendererComponent.prototype, "errorNodes", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
            return invalidControls;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @return {?}
     */
    ErrorRendererComponent.prototype.getControlError = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    /**
     * @param {?} errorNode
     * @return {?}
     */
    ErrorRendererComponent.prototype.announceErrorField = /**
     * @param {?} errorNode
     * @return {?}
     */
    function (errorNode) {
        var _this = this;
        /** @type {?} */
        var nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, (/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.question.renderingType === 'page') {
                /** @type {?} */
                var pageIndex = _this.getPageIndex(node);
                _this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        }));
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ErrorRendererComponent.prototype.getPageIndex = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var questionGroup = (/** @type {?} */ (this.form.rootNode.question));
        return questionGroup.questions.indexOf(node.question);
    };
    ErrorRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'error-renderer',
                    template: "<div *ngIf=\"showErrors()\" class=\"container\">\n<ul class=\"list-group\">\n  <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n    <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n      <h4>{{errorNode.question.label}}</h4>\n      <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n    </div>\n  </li>\n</ul>\n</div>\n",
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
if (false) {
    /** @type {?} */
    ErrorRendererComponent.prototype.form;
    /**
     * @type {?}
     * @private
     */
    ErrorRendererComponent.prototype.validationFactory;
    /**
     * @type {?}
     * @private
     */
    ErrorRendererComponent.prototype.formErrorsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUMzQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEU7SUFtQkUsZ0NBQW9CLGlCQUFvQyxFQUFVLGlCQUFvQztRQUFsRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFHLENBQUM7Ozs7SUFFMUcseUNBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELDJDQUFVOzs7SUFBVjtRQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2xELENBQUM7SUFFRCxzQkFBSSw4Q0FBVTs7OztRQUFkOztnQkFFUSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFDN0UsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7Ozs7SUFFRCxnREFBZTs7OztJQUFmLFVBQWdCLElBQWM7O1lBQ3BCLE1BQU0sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07UUFFdkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVULE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUVELG1EQUFrQjs7OztJQUFsQixVQUFtQixTQUFtQjtRQUF0QyxpQkFXQzs7WUFUTyxLQUFLLEdBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFekgsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLOzs7O1FBQUUsVUFBQyxJQUFjO1lBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7O29CQUNyQyxTQUFTLEdBQVcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEYsQ0FBQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCw2Q0FBWTs7OztJQUFaLFVBQWEsSUFBYzs7WUFDbEIsYUFBYSxHQUFrQixtQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQWlCO1FBQ2pGLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsdWJBVWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsNElBQTRJLENBQUM7aUJBQ3pKOzs7Z0JBbkJRLGlCQUFpQjtnQkFHakIsaUJBQWlCOzs7dUJBbUJ2QixLQUFLOztJQTZDUiw2QkFBQztDQUFBLEFBOURELElBOERDO1NBL0NZLHNCQUFzQjs7O0lBRWpDLHNDQUFvQjs7Ozs7SUFFUixtREFBNEM7Ozs7O0lBQUUsbURBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBOb2RlQmFzZSwgTGVhZk5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZXJyb3ItcmVuZGVyZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwic2hvd0Vycm9ycygpXCIgY2xhc3M9XCJjb250YWluZXJcIj5cclxuPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0td2FybmluZ1wiICpuZ0Zvcj1cImxldCBlcnJvck5vZGUgb2YgZXJyb3JOb2Rlc1wiIChjbGljayk9YW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZSk+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImVycm9yTm9kZS5jb250cm9sLnZhbGlkID09IGZhbHNlXCI+XHJcbiAgICAgIDxoND57e2Vycm9yTm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oND5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPiB7e2dldENvbnRyb2xFcnJvcihlcnJvck5vZGUpfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICA8L2xpPlxyXG48L3VsPlxyXG48L2Rpdj5cclxuYCxcclxuICAgIHN0eWxlczogW2B1bHtsaXN0LXN0eWxlOm5vbmV9Lmxpc3QtZ3JvdXAtaXRlbXtwYWRkaW5nOjJweCAxNXB4O2N1cnNvcjpwb2ludGVyfXVsIGxpOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2ZmZn1oNHttYXJnaW4tdG9wOjdweDttYXJnaW4tYm90dG9tOjdweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LCBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBzaG93RXJyb3JzKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLmZvcm0udmFsaWQgJiYgdGhpcy5mb3JtLnNob3dFcnJvcnM7XHJcbiAgfVxyXG5cclxuICBnZXQgZXJyb3JOb2RlcygpIHtcclxuXHJcbiAgICBjb25zdCBpbnZhbGlkQ29udHJvbHMgPSB0aGlzLmZvcm0ubWFya0ludmFsaWRDb250cm9scyh0aGlzLmZvcm0ucm9vdE5vZGUsIFtdKTtcclxuICAgIHJldHVybiBpbnZhbGlkQ29udHJvbHM7XHJcbiAgfVxyXG5cclxuICBnZXRDb250cm9sRXJyb3Iobm9kZTogTGVhZk5vZGUpIHtcclxuICAgICAgY29uc3QgZXJyb3JzOiBhbnkgPSBub2RlLmNvbnRyb2wuZXJyb3JzO1xyXG5cclxuICAgICAgaWYgKGVycm9ycykge1xyXG5cclxuICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBhbm5vdW5jZUVycm9yRmllbGQoZXJyb3JOb2RlOiBMZWFmTm9kZSkge1xyXG5cclxuICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlQmFzZT4gPSB0aGlzLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChlcnJvck5vZGUucGF0aC5zdWJzdHJpbmcoMCwgZXJyb3JOb2RlLnBhdGguaW5kZXhPZignLicpKSk7XHJcblxyXG4gICAgXy5mb3JFYWNoKG5vZGVzLCAobm9kZTogTm9kZUJhc2UpID0+IHtcclxuXHJcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xyXG4gICAgICAgIGNvbnN0IHBhZ2VJbmRleDogbnVtYmVyID0gdGhpcy5nZXRQYWdlSW5kZXgobm9kZSk7XHJcbiAgICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQocGFnZUluZGV4ICsgJywnICsgZXJyb3JOb2RlLnF1ZXN0aW9uLmtleSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGFnZUluZGV4KG5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICAgY29uc3QgcXVlc3Rpb25Hcm91cDogUXVlc3Rpb25Hcm91cCA9IHRoaXMuZm9ybS5yb290Tm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xyXG4gICAgIHJldHVybiBxdWVzdGlvbkdyb3VwLnF1ZXN0aW9ucy5pbmRleE9mKG5vZGUucXVlc3Rpb24pO1xyXG4gIH1cclxufVxyXG4iXX0=