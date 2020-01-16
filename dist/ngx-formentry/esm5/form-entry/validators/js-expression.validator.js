import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Validations } from './validations';
var JsExpressionValidator = /** @class */ (function () {
    function JsExpressionValidator() {
    }
    JsExpressionValidator.prototype.validate = function (model, form) {
        // convert helper functions to string
        return function (control) {
            if (!Validations.JSExpressionValidatorsEnabled) {
                return null;
            }
            var expression = model.failsWhenExpression;
            var helper = new JsExpressionHelper();
            var dataDependencies = {};
            var helperFunctions = helper.helperFunctions;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDO0lBRUU7SUFBZSxDQUFDO0lBRWhCLHdDQUFRLEdBQVIsVUFBUyxLQUFrQyxFQUFFLElBQVU7UUFFckQscUNBQXFDO1FBQ3JDLE9BQU8sVUFBQyxPQUF1QjtZQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLDZCQUE2QixFQUFFO2dCQUM5QyxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzdDLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUN4QyxJQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUU1QixJQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQy9DLElBQU0sUUFBUSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEgsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBRWxCLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQzthQUNuRjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9ucyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgSnNFeHByZXNzaW9uVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCwgZm9ybT86IGFueSkge1xuXG4gICAgLy8gY29udmVydCBoZWxwZXIgZnVuY3Rpb25zIHRvIHN0cmluZ1xuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcblxuICAgICAgaWYgKCFWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IG1vZGVsLmZhaWxzV2hlbkV4cHJlc3Npb247XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XG4gICAgICBjb25zdCBkYXRhRGVwZW5kZW5jaWVzID0ge307XG5cbiAgICAgIGNvbnN0IGhlbHBlckZ1bmN0aW9ucyA9IGhlbHBlci5oZWxwZXJGdW5jdGlvbnM7XG4gICAgICBjb25zdCBydW5uYWJsZSA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCkuZ2V0UnVubmFibGUoZXhwcmVzc2lvbiwgY29udHJvbCwgaGVscGVyRnVuY3Rpb25zLCBkYXRhRGVwZW5kZW5jaWVzLCBmb3JtKTtcblxuICAgICAgaWYgKHJ1bm5hYmxlLnJ1bigpKSB7XG5cbiAgICAgICAgcmV0dXJuIHsgJ2pzX2V4cHJlc3Npb24nOiB7ICdleHByZXNzaW9uJzogZXhwcmVzc2lvbiwgbWVzc2FnZTogIG1vZGVsLm1lc3NhZ2UgfSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=