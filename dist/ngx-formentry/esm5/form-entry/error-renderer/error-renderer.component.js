/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            var /** @type {?} */ invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
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
        var /** @type {?} */ errors = node.control.errors;
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
        var /** @type {?} */ nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, function (node) {
            if (node.question.renderingType === 'page') {
                var /** @type {?} */ pageIndex = _this.getPageIndex(node);
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
        var /** @type {?} */ questionGroup = /** @type {?} */ (this.form.rootNode.question);
        return questionGroup.questions.indexOf(node.question);
    };
    ErrorRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'error-renderer',
                    template: "<div *ngIf=\"showErrors()\" class=\"container\">\n<ul class=\"list-group\">\n  <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n    <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n      <h4>{{errorNode.question.label}}</h4>\n      <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n    </div>\n  </li>\n</ul>\n</div>\n",
                    styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
                },] },
    ];
    /** @nocollapse */
    ErrorRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory, },
        { type: FormErrorsService, },
    ]; };
    ErrorRendererComponent.propDecorators = {
        "form": [{ type: Input },],
    };
    return ErrorRendererComponent;
}());
export { ErrorRendererComponent };
function ErrorRendererComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ErrorRendererComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ErrorRendererComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ErrorRendererComponent.propDecorators;
    /** @type {?} */
    ErrorRendererComponent.prototype.form;
    /** @type {?} */
    ErrorRendererComponent.prototype.validationFactory;
    /** @type {?} */
    ErrorRendererComponent.prototype.formErrorsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUMzQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBcUJsRSxnQ0FBb0IsaUJBQW9DLEVBQVUsaUJBQW9DO1FBQWxGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0tBQUk7Ozs7SUFFMUcseUNBQVE7OztJQUFSO0tBQ0M7Ozs7SUFFRCwyQ0FBVTs7O0lBQVY7UUFDRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUNqRDtJQUVELHNCQUFJLDhDQUFVOzs7O1FBQWQ7WUFFRSxxQkFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RSxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ3hCOzs7T0FBQTs7Ozs7SUFFRCxnREFBZTs7OztJQUFmLFVBQWdCLElBQWM7UUFDMUIscUJBQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFVCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNiOzs7OztJQUVELG1EQUFrQjs7OztJQUFsQixVQUFtQixTQUFtQjtRQUF0QyxpQkFXQztRQVRDLHFCQUFNLEtBQUssR0FBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFILENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBYztZQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxxQkFBTSxTQUFTLEdBQVcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyRjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELDZDQUFZOzs7O0lBQVosVUFBYSxJQUFjO1FBQ3hCLHFCQUFNLGFBQWEscUJBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQXlCLENBQUEsQ0FBQztRQUNsRixNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3hEOztnQkE3REYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSx1YkFVYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyw0SUFBNEksQ0FBQztpQkFDeko7Ozs7Z0JBbkJRLGlCQUFpQjtnQkFHakIsaUJBQWlCOzs7eUJBbUJ2QixLQUFLOztpQ0E1QlI7O1NBMEJhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcclxuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2Vycm9yLXJlbmRlcmVyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dFcnJvcnMoKVwiIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbjx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cclxuICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLXdhcm5pbmdcIiAqbmdGb3I9XCJsZXQgZXJyb3JOb2RlIG9mIGVycm9yTm9kZXNcIiAoY2xpY2spPWFubm91bmNlRXJyb3JGaWVsZChlcnJvck5vZGUpPlxyXG4gICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJlcnJvck5vZGUuY29udHJvbC52YWxpZCA9PSBmYWxzZVwiPlxyXG4gICAgICA8aDQ+e3tlcnJvck5vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDQ+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4ge3tnZXRDb250cm9sRXJyb3IoZXJyb3JOb2RlKX19PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9saT5cclxuPC91bD5cclxuPC9kaXY+XHJcbmAsXHJcbiAgICBzdHlsZXM6IFtgdWx7bGlzdC1zdHlsZTpub25lfS5saXN0LWdyb3VwLWl0ZW17cGFkZGluZzoycHggMTVweDtjdXJzb3I6cG9pbnRlcn11bCBsaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9aDR7bWFyZ2luLXRvcDo3cHg7bWFyZ2luLWJvdHRvbTo3cHh9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVycm9yUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBmb3JtOiBGb3JtO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSwgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgc2hvd0Vycm9ycygpIHtcclxuICAgIHJldHVybiAhdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZm9ybS5zaG93RXJyb3JzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVycm9yTm9kZXMoKSB7XHJcblxyXG4gICAgY29uc3QgaW52YWxpZENvbnRyb2xzID0gdGhpcy5mb3JtLm1hcmtJbnZhbGlkQ29udHJvbHModGhpcy5mb3JtLnJvb3ROb2RlLCBbXSk7XHJcbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udHJvbEVycm9yKG5vZGU6IExlYWZOb2RlKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcclxuXHJcbiAgICAgIGlmIChlcnJvcnMpIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uRmFjdG9yeS5lcnJvcnMoZXJyb3JzLCBub2RlLnF1ZXN0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZTogTGVhZk5vZGUpIHtcclxuXHJcbiAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gdGhpcy5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoZXJyb3JOb2RlLnBhdGguc3Vic3RyaW5nKDAsIGVycm9yTm9kZS5wYXRoLmluZGV4T2YoJy4nKSkpO1xyXG5cclxuICAgIF8uZm9yRWFjaChub2RlcywgKG5vZGU6IE5vZGVCYXNlKSA9PiB7XHJcblxyXG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZScpIHtcclxuICAgICAgICBjb25zdCBwYWdlSW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0UGFnZUluZGV4KG5vZGUpO1xyXG4gICAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkKHBhZ2VJbmRleCArICcsJyArIGVycm9yTm9kZS5xdWVzdGlvbi5rZXkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBhZ2VJbmRleChub2RlOiBOb2RlQmFzZSkge1xyXG4gICAgIGNvbnN0IHF1ZXN0aW9uR3JvdXA6IFF1ZXN0aW9uR3JvdXAgPSB0aGlzLmZvcm0ucm9vdE5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cDtcclxuICAgICByZXR1cm4gcXVlc3Rpb25Hcm91cC5xdWVzdGlvbnMuaW5kZXhPZihub2RlLnF1ZXN0aW9uKTtcclxuICB9XHJcbn1cclxuIl19