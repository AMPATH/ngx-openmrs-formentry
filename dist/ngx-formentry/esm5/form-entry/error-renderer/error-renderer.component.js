/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        _.forEach(nodes, function (node) {
            if (node.question.renderingType === 'page') {
                /** @type {?} */
                var pageIndex = _this.getPageIndex(node);
                _this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
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
                }] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUMzQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEU7SUFTRSxnQ0FBb0IsaUJBQW9DLEVBQVUsaUJBQW9DO1FBQWxGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQUcsQ0FBQzs7OztJQUUxRyx5Q0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQsMkNBQVU7OztJQUFWO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2xELENBQUM7SUFFRCxzQkFBSSw4Q0FBVTs7OztRQUFkOztnQkFFUSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFDN0UsT0FBTyxlQUFlLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsZ0RBQWU7Ozs7SUFBZixVQUFnQixJQUFjOztZQUNwQixNQUFNLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1FBRXZDLElBQUksTUFBTSxFQUFFO1lBRVIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsbURBQWtCOzs7O0lBQWxCLFVBQW1CLFNBQW1CO1FBQXRDLGlCQVdDOztZQVRPLEtBQUssR0FBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV6SCxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFDLElBQWM7WUFFOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxNQUFNLEVBQUU7O29CQUNwQyxTQUFTLEdBQVcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsNkNBQVk7Ozs7SUFBWixVQUFhLElBQWM7O1lBQ2xCLGFBQWEsR0FBa0IsbUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFpQjtRQUNqRixPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDOztnQkFuREYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGljQUE0Qzs7aUJBRS9DOzs7O2dCQVRRLGlCQUFpQjtnQkFHakIsaUJBQWlCOzs7dUJBU3ZCLEtBQUs7O0lBNkNSLDZCQUFDO0NBQUEsQUFwREQsSUFvREM7U0EvQ1ksc0JBQXNCOzs7SUFFakMsc0NBQW9COzs7OztJQUVSLG1EQUE0Qzs7Ozs7SUFBRSxtREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgTGVhZk5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlcnJvci1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdlcnJvci1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGZvcm06IEZvcm07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksIHByaXZhdGUgZm9ybUVycm9yc1NlcnZpY2U6IEZvcm1FcnJvcnNTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgc2hvd0Vycm9ycygpIHtcbiAgICByZXR1cm4gIXRoaXMuZm9ybS52YWxpZCAmJiB0aGlzLmZvcm0uc2hvd0Vycm9ycztcbiAgfVxuXG4gIGdldCBlcnJvck5vZGVzKCkge1xuXG4gICAgY29uc3QgaW52YWxpZENvbnRyb2xzID0gdGhpcy5mb3JtLm1hcmtJbnZhbGlkQ29udHJvbHModGhpcy5mb3JtLnJvb3ROb2RlLCBbXSk7XG4gICAgcmV0dXJuIGludmFsaWRDb250cm9scztcbiAgfVxuXG4gIGdldENvbnRyb2xFcnJvcihub2RlOiBMZWFmTm9kZSkge1xuICAgICAgY29uc3QgZXJyb3JzOiBhbnkgPSBub2RlLmNvbnRyb2wuZXJyb3JzO1xuXG4gICAgICBpZiAoZXJyb3JzKSB7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uRmFjdG9yeS5lcnJvcnMoZXJyb3JzLCBub2RlLnF1ZXN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZTogTGVhZk5vZGUpIHtcblxuICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlQmFzZT4gPSB0aGlzLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChlcnJvck5vZGUucGF0aC5zdWJzdHJpbmcoMCwgZXJyb3JOb2RlLnBhdGguaW5kZXhPZignLicpKSk7XG5cbiAgICBfLmZvckVhY2gobm9kZXMsIChub2RlOiBOb2RlQmFzZSkgPT4ge1xuXG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZScpIHtcbiAgICAgICAgY29uc3QgcGFnZUluZGV4OiBudW1iZXIgPSB0aGlzLmdldFBhZ2VJbmRleChub2RlKTtcbiAgICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQocGFnZUluZGV4ICsgJywnICsgZXJyb3JOb2RlLnF1ZXN0aW9uLmtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYWdlSW5kZXgobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgY29uc3QgcXVlc3Rpb25Hcm91cDogUXVlc3Rpb25Hcm91cCA9IHRoaXMuZm9ybS5yb290Tm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xuICAgICByZXR1cm4gcXVlc3Rpb25Hcm91cC5xdWVzdGlvbnMuaW5kZXhPZihub2RlLnF1ZXN0aW9uKTtcbiAgfVxufVxuIl19