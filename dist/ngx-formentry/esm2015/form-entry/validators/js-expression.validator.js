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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDLE1BQU07SUFDSixnQkFBZSxDQUFDO0lBRWhCLFFBQVEsQ0FBQyxLQUFrQyxFQUFFLElBQVU7UUFDckQscUNBQXFDO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLE9BQXVCLEVBQTBCLEVBQUU7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFFNUIsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMsV0FBVyxDQUNqRCxVQUFVLEVBQ1YsT0FBTyxFQUNQLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsSUFBSSxDQUNMLENBQUM7WUFFRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUM7b0JBQ0wsYUFBYSxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtpQkFDbEUsQ0FBQztZQUNKLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IFZhbGlkYXRpb25zIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBKc0V4cHJlc3Npb25WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCwgZm9ybT86IGFueSkge1xuICAgIC8vIGNvbnZlcnQgaGVscGVyIGZ1bmN0aW9ucyB0byBzdHJpbmdcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG4gICAgICBpZiAoIVZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHByZXNzaW9uID0gbW9kZWwuZmFpbHNXaGVuRXhwcmVzc2lvbjtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBKc0V4cHJlc3Npb25IZWxwZXIoKTtcbiAgICAgIGNvbnN0IGRhdGFEZXBlbmRlbmNpZXMgPSB7fTtcblxuICAgICAgY29uc3QgaGVscGVyRnVuY3Rpb25zID0gaGVscGVyLmhlbHBlckZ1bmN0aW9ucztcbiAgICAgIGNvbnN0IHJ1bm5hYmxlID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKS5nZXRSdW5uYWJsZShcbiAgICAgICAgZXhwcmVzc2lvbixcbiAgICAgICAgY29udHJvbCxcbiAgICAgICAgaGVscGVyRnVuY3Rpb25zLFxuICAgICAgICBkYXRhRGVwZW5kZW5jaWVzLFxuICAgICAgICBmb3JtXG4gICAgICApO1xuXG4gICAgICBpZiAocnVubmFibGUucnVuKCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBqc19leHByZXNzaW9uOiB7IGV4cHJlc3Npb246IGV4cHJlc3Npb24sIG1lc3NhZ2U6IG1vZGVsLm1lc3NhZ2UgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=