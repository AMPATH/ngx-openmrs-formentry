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
                return {
                    js_expression: { expression: expression, message: model.message }
                };
            }
            return null;
        };
    };
    return JsExpressionValidator;
}());
export { JsExpressionValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDO0lBQ0U7SUFBZSxDQUFDO0lBRWhCLHdDQUFRLEdBQVIsVUFBUyxLQUFrQyxFQUFFLElBQVU7UUFDckQscUNBQXFDO1FBQ3JDLE1BQU0sQ0FBQyxVQUFDLE9BQXVCO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDN0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQ3hDLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBRTVCLElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDL0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FDakQsVUFBVSxFQUNWLE9BQU8sRUFDUCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLElBQUksQ0FDTCxDQUFDO1lBRUYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDO29CQUNMLGFBQWEsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUU7aUJBQ2xFLENBQUM7WUFDSixDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbnMgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEpzRXhwcmVzc2lvblZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICB2YWxpZGF0ZShtb2RlbDogSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsLCBmb3JtPzogYW55KSB7XG4gICAgLy8gY29udmVydCBoZWxwZXIgZnVuY3Rpb25zIHRvIHN0cmluZ1xuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIGlmICghVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IEpzRXhwcmVzc2lvbkhlbHBlcigpO1xuICAgICAgY29uc3QgZGF0YURlcGVuZGVuY2llcyA9IHt9O1xuXG4gICAgICBjb25zdCBoZWxwZXJGdW5jdGlvbnMgPSBoZWxwZXIuaGVscGVyRnVuY3Rpb25zO1xuICAgICAgY29uc3QgcnVubmFibGUgPSBuZXcgRXhwcmVzc2lvblJ1bm5lcigpLmdldFJ1bm5hYmxlKFxuICAgICAgICBleHByZXNzaW9uLFxuICAgICAgICBjb250cm9sLFxuICAgICAgICBoZWxwZXJGdW5jdGlvbnMsXG4gICAgICAgIGRhdGFEZXBlbmRlbmNpZXMsXG4gICAgICAgIGZvcm1cbiAgICAgICk7XG5cbiAgICAgIGlmIChydW5uYWJsZS5ydW4oKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGpzX2V4cHJlc3Npb246IHsgZXhwcmVzc2lvbjogZXhwcmVzc2lvbiwgbWVzc2FnZTogbW9kZWwubWVzc2FnZSB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==