/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return function (control) {
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
        };
    };
    return JsExpressionValidator;
}());
export { JsExpressionValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvanMtZXhwcmVzc2lvbi52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXJFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUM7SUFFRTtJQUFlLENBQUM7Ozs7OztJQUVoQix3Q0FBUTs7Ozs7SUFBUixVQUFTLEtBQWtDLEVBQUUsSUFBVTtRQUVyRCxxQ0FBcUM7UUFDckMsT0FBTyxVQUFDLE9BQXVCO1lBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsNkJBQTZCLEVBQUU7Z0JBQzlDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7O2dCQUVLLFVBQVUsR0FBRyxLQUFLLENBQUMsbUJBQW1COztnQkFDdEMsTUFBTSxHQUFHLElBQUksa0JBQWtCLEVBQUU7O2dCQUNqQyxnQkFBZ0IsR0FBRyxFQUFFOztnQkFFckIsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlOztnQkFDeEMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO1lBRWpILElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUVsQixPQUFPLEVBQUUsZUFBZSxFQUFFLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7YUFDbkY7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbnMgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEpzRXhwcmVzc2lvblZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZhbGlkYXRlKG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwsIGZvcm0/OiBhbnkpIHtcblxuICAgIC8vIGNvbnZlcnQgaGVscGVyIGZ1bmN0aW9ucyB0byBzdHJpbmdcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgIGlmICghVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IEpzRXhwcmVzc2lvbkhlbHBlcigpO1xuICAgICAgY29uc3QgZGF0YURlcGVuZGVuY2llcyA9IHt9O1xuXG4gICAgICBjb25zdCBoZWxwZXJGdW5jdGlvbnMgPSBoZWxwZXIuaGVscGVyRnVuY3Rpb25zO1xuICAgICAgY29uc3QgcnVubmFibGUgPSBuZXcgRXhwcmVzc2lvblJ1bm5lcigpLmdldFJ1bm5hYmxlKGV4cHJlc3Npb24sIGNvbnRyb2wsIGhlbHBlckZ1bmN0aW9ucywgZGF0YURlcGVuZGVuY2llcywgZm9ybSk7XG5cbiAgICAgIGlmIChydW5uYWJsZS5ydW4oKSkge1xuXG4gICAgICAgIHJldHVybiB7ICdqc19leHByZXNzaW9uJzogeyAnZXhwcmVzc2lvbic6IGV4cHJlc3Npb24sIG1lc3NhZ2U6ICBtb2RlbC5tZXNzYWdlIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19