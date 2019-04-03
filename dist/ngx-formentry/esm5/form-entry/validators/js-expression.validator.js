/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Validations } from './validations';
var JsExpressionValidator = /** @class */ (function () {
    function JsExpressionValidator() {
    }
    /**
     * @param {?} model
     * @param {?=} form
     * @return {?}
     */
    JsExpressionValidator.prototype.validate = /**
     * @param {?} model
     * @param {?=} form
     * @return {?}
     */
    function (model, form) {
        // convert helper functions to string
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (!Validations.JSExpressionValidatorsEnabled) {
                return null;
            }
            /** @type {?} */
            var expression = model.failsWhenExpression;
            /** @type {?} */
            var helper = new JsExpressionHelper();
            /** @type {?} */
            var dataDependencies = {};
            /** @type {?} */
            var helperFunctions = helper.helperFunctions;
            /** @type {?} */
            var runnable = new ExpressionRunner().getRunnable(expression, control, helperFunctions, dataDependencies, form);
            if (runnable.run()) {
                return { 'js_expression': { 'expression': expression, message: model.message } };
            }
            return null;
        });
    };
    return JsExpressionValidator;
}());
export { JsExpressionValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvanMtZXhwcmVzc2lvbi52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXJFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUM7SUFFRTtJQUFlLENBQUM7Ozs7OztJQUVoQix3Q0FBUTs7Ozs7SUFBUixVQUFTLEtBQWtDLEVBQUUsSUFBVTtRQUVyRCxxQ0FBcUM7UUFDckMsTUFBTTs7OztRQUFDLFVBQUMsT0FBdUI7WUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQzs7Z0JBRUssVUFBVSxHQUFHLEtBQUssQ0FBQyxtQkFBbUI7O2dCQUN0QyxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsRUFBRTs7Z0JBQ2pDLGdCQUFnQixHQUFHLEVBQUU7O2dCQUVyQixlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWU7O2dCQUN4QyxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7WUFFakgsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFbkIsTUFBTSxDQUFDLEVBQUUsZUFBZSxFQUFFLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDcEYsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbnMgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBKc0V4cHJlc3Npb25WYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHZhbGlkYXRlKG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwsIGZvcm0/OiBhbnkpIHtcclxuXHJcbiAgICAvLyBjb252ZXJ0IGhlbHBlciBmdW5jdGlvbnMgdG8gc3RyaW5nXHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XHJcblxyXG4gICAgICBpZiAoIVZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xyXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XHJcbiAgICAgIGNvbnN0IGRhdGFEZXBlbmRlbmNpZXMgPSB7fTtcclxuXHJcbiAgICAgIGNvbnN0IGhlbHBlckZ1bmN0aW9ucyA9IGhlbHBlci5oZWxwZXJGdW5jdGlvbnM7XHJcbiAgICAgIGNvbnN0IHJ1bm5hYmxlID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKS5nZXRSdW5uYWJsZShleHByZXNzaW9uLCBjb250cm9sLCBoZWxwZXJGdW5jdGlvbnMsIGRhdGFEZXBlbmRlbmNpZXMsIGZvcm0pO1xyXG5cclxuICAgICAgaWYgKHJ1bm5hYmxlLnJ1bigpKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB7ICdqc19leHByZXNzaW9uJzogeyAnZXhwcmVzc2lvbic6IGV4cHJlc3Npb24sIG1lc3NhZ2U6ICBtb2RlbC5tZXNzYWdlIH0gfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=