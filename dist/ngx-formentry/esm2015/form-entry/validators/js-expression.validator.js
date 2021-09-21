import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Validations } from './validations';
export class JsExpressionValidator {
    constructor() { }
    validate(model, form) {
        // convert helper functions to string
        return (control) => {
            if (!Validations.JSExpressionValidatorsEnabled) {
                return null;
            }
            const expression = model.failsWhenExpression;
            const helper = new JsExpressionHelper();
            const dataDependencies = {};
            const helperFunctions = helper.helperFunctions;
            const runnable = new ExpressionRunner().getRunnable(expression, control, helperFunctions, dataDependencies, form);
            if (runnable.run()) {
                return {
                    js_expression: { expression: expression, message: model.message }
                };
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvanMtZXhwcmVzc2lvbi52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1QyxNQUFNO0lBQ0osZ0JBQWUsQ0FBQztJQUVoQixRQUFRLENBQUMsS0FBa0MsRUFBRSxJQUFVO1FBQ3JELHFDQUFxQztRQUNyQyxNQUFNLENBQUMsQ0FBQyxPQUF1QixFQUEwQixFQUFFO1lBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBRTVCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FDakQsVUFBVSxFQUNWLE9BQU8sRUFDUCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLElBQUksQ0FDTCxDQUFDO1lBRUYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDO29CQUNMLGFBQWEsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUU7aUJBQ2xFLENBQUM7WUFDSixDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9ucyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgSnNFeHByZXNzaW9uVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZhbGlkYXRlKG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwsIGZvcm0/OiBhbnkpIHtcbiAgICAvLyBjb252ZXJ0IGhlbHBlciBmdW5jdGlvbnMgdG8gc3RyaW5nXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuICAgICAgaWYgKCFWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IG1vZGVsLmZhaWxzV2hlbkV4cHJlc3Npb247XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XG4gICAgICBjb25zdCBkYXRhRGVwZW5kZW5jaWVzID0ge307XG5cbiAgICAgIGNvbnN0IGhlbHBlckZ1bmN0aW9ucyA9IGhlbHBlci5oZWxwZXJGdW5jdGlvbnM7XG4gICAgICBjb25zdCBydW5uYWJsZSA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCkuZ2V0UnVubmFibGUoXG4gICAgICAgIGV4cHJlc3Npb24sXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGhlbHBlckZ1bmN0aW9ucyxcbiAgICAgICAgZGF0YURlcGVuZGVuY2llcyxcbiAgICAgICAgZm9ybVxuICAgICAgKTtcblxuICAgICAgaWYgKHJ1bm5hYmxlLnJ1bigpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAganNfZXhwcmVzc2lvbjogeyBleHByZXNzaW9uOiBleHByZXNzaW9uLCBtZXNzYWdlOiBtb2RlbC5tZXNzYWdlIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19