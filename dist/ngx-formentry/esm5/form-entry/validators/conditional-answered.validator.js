var ConditionalAnsweredValidator = /** @class */ (function () {
    function ConditionalAnsweredValidator() {
    }
    ConditionalAnsweredValidator.prototype.validate = function (model) {
        return function (control) {
            var value = control.value;
            var relationValue = null;
            var referenceQuestionId = model.referenceQuestionId;
            var referenceQuestionAnswers = model.referenceQuestionAnswers;
            var successCondition = true;
            if (value) {
                if (control &&
                    control.controlRelations &&
                    control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(function (relation) {
                        var relatedAsControl = relation.relatedTo;
                        if (relatedAsControl.uuid === referenceQuestionId) {
                            if (Array.isArray(relatedAsControl.value)) {
                                relationValue = relatedAsControl.value;
                            }
                            else {
                                relationValue =
                                    relatedAsControl.value &&
                                        typeof relatedAsControl.value === 'object' &&
                                        relatedAsControl.value.value
                                        ? relatedAsControl.value.value
                                        : relatedAsControl.value;
                            }
                        }
                        if (!relationValue) {
                            successCondition = false;
                        }
                        else if (typeof referenceQuestionAnswers === 'object' &&
                            referenceQuestionAnswers.indexOf(relationValue) === -1) {
                            successCondition = false;
                        }
                    });
                }
            }
            if (!successCondition) {
                return { conditional_answered: { message: model.message } };
            }
            return null;
        };
    };
    return ConditionalAnsweredValidator;
}());
export { ConditionalAnsweredValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0lBQ0U7SUFBZSxDQUFDO0lBRWhCLCtDQUFRLEdBQVIsVUFBUyxLQUFpQztRQUN4QyxNQUFNLENBQUMsVUFBQyxPQUF1QjtZQUM3QixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzVCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFNLG1CQUFtQixHQUFXLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUM5RCxJQUFNLHdCQUF3QixHQUFRLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztZQUNyRSxJQUFJLGdCQUFnQixHQUFRLElBQUksQ0FBQztZQUVqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEVBQUUsQ0FBQyxDQUNELE9BQU87b0JBQ1AsT0FBTyxDQUFDLGdCQUFnQjtvQkFDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQzNCLENBQUMsQ0FBQyxDQUFDO29CQUNELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTt3QkFDbEQsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsU0FBZ0IsQ0FBQzt3QkFDbkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQzs0QkFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7NEJBQ3pDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sYUFBYTtvQ0FDWCxnQkFBZ0IsQ0FBQyxLQUFLO3dDQUN0QixPQUFPLGdCQUFnQixDQUFDLEtBQUssS0FBSyxRQUFRO3dDQUMxQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSzt3Q0FDMUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLO3dDQUM5QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzRCQUMvQixDQUFDO3dCQUNILENBQUM7d0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzNCLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNSLE9BQU8sd0JBQXdCLEtBQUssUUFBUTs0QkFDNUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDdkQsQ0FBQyxDQUFDLENBQUM7NEJBQ0QsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUMzQixDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxFQUFFLG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQzlELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZhbGlkYXRlKG1vZGVsOiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCkge1xuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCByZWxhdGlvblZhbHVlID0gbnVsbDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHN0cmluZyA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uSWQ7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IGFueSA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycztcbiAgICAgIGxldCBzdWNjZXNzQ29uZGl0aW9uOiBhbnkgPSB0cnVlO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbnRyb2wgJiZcbiAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiZcbiAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaCgocmVsYXRpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wudXVpZCA9PT0gcmVmZXJlbmNlUXVlc3Rpb25JZCkge1xuICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPSByZWxhdGVkQXNDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPVxuICAgICAgICAgICAgICAgICAgcmVsYXRlZEFzQ29udHJvbC52YWx1ZSAmJlxuICAgICAgICAgICAgICAgICAgdHlwZW9mIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICByZWxhdGVkQXNDb250cm9sLnZhbHVlLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgID8gcmVsYXRlZEFzQ29udHJvbC52YWx1ZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZWxhdGlvblZhbHVlKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3NDb25kaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpID09PSAtMVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3NDb25kaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXN1Y2Nlc3NDb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgY29uZGl0aW9uYWxfYW5zd2VyZWQ6IHsgbWVzc2FnZTogbW9kZWwubWVzc2FnZSB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==