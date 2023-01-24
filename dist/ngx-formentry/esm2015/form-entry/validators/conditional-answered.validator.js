export class ConditionalAnsweredValidator {
    constructor() { }
    validate(model) {
        return (control) => {
            const value = control.value;
            let relationValue = null;
            const referenceQuestionId = model.referenceQuestionId;
            const referenceQuestionAnswers = model.referenceQuestionAnswers;
            let successCondition = true;
            if (value) {
                if (control &&
                    control.controlRelations &&
                    control.controlRelations.relations) {
                    control.controlRelations.relations.forEach((relation) => {
                        const relatedAsControl = relation.relatedTo;
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
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU07SUFDSixnQkFBZSxDQUFDO0lBRWhCLFFBQVEsQ0FBQyxLQUFpQztRQUN4QyxNQUFNLENBQUMsQ0FBQyxPQUF1QixFQUEwQixFQUFFO1lBQ3pELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzlELE1BQU0sd0JBQXdCLEdBQVEsS0FBSyxDQUFDLHdCQUF3QixDQUFDO1lBQ3JFLElBQUksZ0JBQWdCLEdBQVEsSUFBSSxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQ0QsT0FBTztvQkFDUCxPQUFPLENBQUMsZ0JBQWdCO29CQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FDM0IsQ0FBQyxDQUFDLENBQUM7b0JBQ0QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDdEQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsU0FBZ0IsQ0FBQzt3QkFDbkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQzs0QkFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7NEJBQ3pDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sYUFBYTtvQ0FDWCxnQkFBZ0IsQ0FBQyxLQUFLO3dDQUN0QixPQUFPLGdCQUFnQixDQUFDLEtBQUssS0FBSyxRQUFRO3dDQUMxQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSzt3Q0FDMUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLO3dDQUM5QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzRCQUMvQixDQUFDO3dCQUNILENBQUM7d0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzNCLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNSLE9BQU8sd0JBQXdCLEtBQUssUUFBUTs0QkFDNUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDdkQsQ0FBQyxDQUFDLENBQUM7NEJBQ0QsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUMzQixDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxFQUFFLG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQzlELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKSB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgbGV0IHJlbGF0aW9uVmFsdWUgPSBudWxsO1xuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25JZDogc3RyaW5nID0gbW9kZWwucmVmZXJlbmNlUXVlc3Rpb25JZDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VyczogYW55ID0gbW9kZWwucmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzO1xuICAgICAgbGV0IHN1Y2Nlc3NDb25kaXRpb246IGFueSA9IHRydWU7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29udHJvbCAmJlxuICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJlxuICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnNcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKChyZWxhdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbC51dWlkID09PSByZWZlcmVuY2VRdWVzdGlvbklkKSB7XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9XG4gICAgICAgICAgICAgICAgICByZWxhdGVkQXNDb250cm9sLnZhbHVlICYmXG4gICAgICAgICAgICAgICAgICB0eXBlb2YgcmVsYXRlZEFzQ29udHJvbC52YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgPyByZWxhdGVkQXNDb250cm9sLnZhbHVlLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIDogcmVsYXRlZEFzQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXJlbGF0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgdHlwZW9mIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLmluZGV4T2YocmVsYXRpb25WYWx1ZSkgPT09IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghc3VjY2Vzc0NvbmRpdGlvbikge1xuICAgICAgICByZXR1cm4geyBjb25kaXRpb25hbF9hbnN3ZXJlZDogeyBtZXNzYWdlOiBtb2RlbC5tZXNzYWdlIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19