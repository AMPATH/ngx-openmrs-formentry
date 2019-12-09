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
                if (control && control.controlRelations && control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(relation => {
                        const relatedAsControl = relation.relatedTo;
                        if (relatedAsControl.uuid === referenceQuestionId) {
                            if (Array.isArray(relatedAsControl.value)) {
                                relationValue = relatedAsControl.value;
                            }
                            else {
                                relationValue = relatedAsControl.value && typeof relatedAsControl.value === 'object' && relatedAsControl.value.value ?
                                    relatedAsControl.value.value : relatedAsControl.value;
                            }
                        }
                        if (!relationValue) {
                            successCondition = false;
                        }
                        else if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) === -1) {
                            successCondition = false;
                        }
                    });
                }
            }
            if (!successCondition) {
                return { 'conditional_answered': { message: model.message } };
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLE9BQU8sNEJBQTRCO0lBRXZDLGdCQUFlLENBQUM7SUFFaEIsUUFBUSxDQUFDLEtBQWlDO1FBRXhDLE9BQU8sQ0FBQyxPQUF1QixFQUEwQixFQUFFO1lBRXpELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzlELE1BQU0sd0JBQXdCLEdBQVEsS0FBSyxDQUFDLHdCQUF3QixDQUFDO1lBQ3JFLElBQUksZ0JBQWdCLEdBQVEsSUFBSSxDQUFDO1lBRWpDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO29CQUMzRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFFcEQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsU0FBZ0IsQ0FBQzt3QkFDbkQsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLEVBQUU7NEJBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDdkMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQzs2QkFDMUM7aUNBQU07Z0NBQ0gsYUFBYSxHQUFHLGdCQUFnQixDQUFDLEtBQUssSUFBSSxPQUFPLGdCQUFnQixDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUNsSCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7NkJBQzdEO3lCQUNGO3dCQUVELElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ2xCLGdCQUFnQixHQUFHLEtBQUssQ0FBQzt5QkFDMUI7NkJBQU0sSUFBSSxPQUFPLHdCQUF3QixLQUFLLFFBQVEsSUFBSSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQ2pILGdCQUFnQixHQUFHLEtBQUssQ0FBQzt5QkFDMUI7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDRjtZQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDckIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUcsRUFBRSxDQUFDO2FBQ2pFO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZhbGlkYXRlKG1vZGVsOiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCkge1xuXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBsZXQgcmVsYXRpb25WYWx1ZSA9IG51bGw7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbklkOiBzdHJpbmcgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbklkO1xuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiBhbnkgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM7XG4gICAgICBsZXQgc3VjY2Vzc0NvbmRpdGlvbjogYW55ID0gdHJ1ZTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zKSB7XG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zLmZvckVhY2gocmVsYXRpb24gPT4ge1xuXG4gICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbC51dWlkID09PSByZWZlcmVuY2VRdWVzdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVsYXRlZEFzQ29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUgJiYgdHlwZW9mIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUgPT09ICdvYmplY3QnICYmIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUudmFsdWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZEFzQ29udHJvbC52YWx1ZS52YWx1ZSA6IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWxhdGlvblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDb25kaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzdWNjZXNzQ29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiB7ICdjb25kaXRpb25hbF9hbnN3ZXJlZCc6IHsgbWVzc2FnZTogIG1vZGVsLm1lc3NhZ2UgIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19