export class ConditionalRequiredValidator {
    constructor() { }
    validate(model) {
        // convert helper functions to string
        return (control) => {
            const value = control.value;
            let relationValue = null;
            const referenceQuestionId = model.referenceQuestionId;
            const referenceQuestionAnswers = model.referenceQuestionAnswers;
            let isRequired;
            if (control &&
                control.controlRelations &&
                control.controlRelations.relations) {
                control.controlRelations.relations.forEach((relation) => {
                    const relatedAsControl = relation.relatedTo;
                    if (relatedAsControl.uuid === referenceQuestionId) {
                        if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                            relationValue = relation.relatedTo.value;
                        }
                        else {
                            relationValue =
                                relation.relatedTo.value && relation.relatedTo.value.value
                                    ? relation.relatedTo.value.value
                                    : relation.relatedTo.value;
                        }
                    }
                });
            }
            if (typeof referenceQuestionAnswers === 'object' &&
                referenceQuestionAnswers.indexOf(relationValue) !== -1) {
                isRequired = true;
            }
            if (isRequired && !value) {
                return { conditional_required: { message: model.message } };
            }
            return null;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNO0lBQ0osZ0JBQWUsQ0FBQztJQUVoQixRQUFRLENBQUMsS0FBaUM7UUFDeEMscUNBQXFDO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLE9BQXVCLEVBQTBCLEVBQUU7WUFDekQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDekIsTUFBTSxtQkFBbUIsR0FBVyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDOUQsTUFBTSx3QkFBd0IsR0FBUSxLQUFLLENBQUMsd0JBQXdCLENBQUM7WUFDckUsSUFBSSxVQUFtQixDQUFDO1lBRXhCLEVBQUUsQ0FBQyxDQUNELE9BQU87Z0JBQ1AsT0FBTyxDQUFDLGdCQUFnQjtnQkFDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQzNCLENBQUMsQ0FBQyxDQUFDO2dCQUNELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFNBQWdCLENBQUM7b0JBQ25ELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5RCxhQUFhLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQzNDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sYUFBYTtnQ0FDWCxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLO29DQUN4RCxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSztvQ0FDaEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO3dCQUNqQyxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQ0QsT0FBTyx3QkFBd0IsS0FBSyxRQUFRO2dCQUM1Qyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUN2RCxDQUFDLENBQUMsQ0FBQztnQkFDRCxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUM5RCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZhbGlkYXRlKG1vZGVsOiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCkge1xuICAgIC8vIGNvbnZlcnQgaGVscGVyIGZ1bmN0aW9ucyB0byBzdHJpbmdcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBsZXQgcmVsYXRpb25WYWx1ZSA9IG51bGw7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbklkOiBzdHJpbmcgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbklkO1xuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiBhbnkgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM7XG4gICAgICBsZXQgaXNSZXF1aXJlZDogYm9vbGVhbjtcblxuICAgICAgaWYgKFxuICAgICAgICBjb250cm9sICYmXG4gICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJlxuICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zXG4gICAgICApIHtcbiAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKChyZWxhdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sLnV1aWQgPT09IHJlZmVyZW5jZVF1ZXN0aW9uSWQpIHtcbiAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sICYmIEFycmF5LmlzQXJyYXkocmVsYXRlZEFzQ29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPVxuICAgICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWVcbiAgICAgICAgICAgICAgICAgID8gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlXG4gICAgICAgICAgICAgICAgICA6IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmXG4gICAgICAgIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIGlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgY29uZGl0aW9uYWxfcmVxdWlyZWQ6IHsgbWVzc2FnZTogbW9kZWwubWVzc2FnZSB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==