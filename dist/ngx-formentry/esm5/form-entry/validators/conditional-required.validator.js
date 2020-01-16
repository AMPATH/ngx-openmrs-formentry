var ConditionalRequiredValidator = /** @class */ (function () {
    function ConditionalRequiredValidator() {
    }
    ConditionalRequiredValidator.prototype.validate = function (model) {
        // convert helper functions to string
        return function (control) {
            var value = control.value;
            var relationValue = null;
            var referenceQuestionId = model.referenceQuestionId;
            var referenceQuestionAnswers = model.referenceQuestionAnswers;
            var isRequired;
            if (control && control.controlRelations && control.controlRelations.relations) {
                control.controlRelations.relations.forEach(function (relation) {
                    var relatedAsControl = relation.relatedTo;
                    if (relatedAsControl.uuid === referenceQuestionId) {
                        if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                            relationValue = relation.relatedTo.value;
                        }
                        else {
                            relationValue = relation.relatedTo.value && relation.relatedTo.value.value ?
                                relation.relatedTo.value.value : relation.relatedTo.value;
                        }
                    }
                });
            }
            if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) !== -1) {
                isRequired = true;
            }
            if (isRequired && !value) {
                return { 'conditional_required': { message: model.message } };
            }
            return null;
        };
    };
    return ConditionalRequiredValidator;
}());
export { ConditionalRequiredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0lBRUU7SUFBZSxDQUFDO0lBRWhCLCtDQUFRLEdBQVIsVUFBUyxLQUFpQztRQUV4QyxxQ0FBcUM7UUFDckMsT0FBTyxVQUFDLE9BQXVCO1lBRTdCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQU0sbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzlELElBQU0sd0JBQXdCLEdBQVEsS0FBSyxDQUFDLHdCQUF3QixDQUFDO1lBQ3JFLElBQUksVUFBbUIsQ0FBQztZQUV4QixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtnQkFDM0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO29CQUVqRCxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxTQUFnQixDQUFDO29CQUNuRCxJQUFJLGdCQUFnQixDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRTt3QkFDakQsSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUMzRCxhQUFhLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7eUJBQzVDOzZCQUFNOzRCQUNILGFBQWEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDeEUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzt5QkFDakU7cUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksT0FBTyx3QkFBd0IsS0FBSyxRQUFRLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMxRyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxVQUFVLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRyxLQUFLLENBQUMsT0FBTyxFQUFHLEVBQUUsQ0FBQzthQUNqRTtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKSB7XG5cbiAgICAvLyBjb252ZXJ0IGhlbHBlciBmdW5jdGlvbnMgdG8gc3RyaW5nXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBsZXQgcmVsYXRpb25WYWx1ZSA9IG51bGw7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbklkOiBzdHJpbmcgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbklkO1xuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiBhbnkgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM7XG4gICAgICBsZXQgaXNSZXF1aXJlZDogYm9vbGVhbjtcblxuICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcbiAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zLmZvckVhY2gocmVsYXRpb24gPT4ge1xuXG4gICAgICAgICAgICBjb25zdCByZWxhdGVkQXNDb250cm9sID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sLnV1aWQgPT09IHJlZmVyZW5jZVF1ZXN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUgJiYgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgOiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpICE9PSAtMSkge1xuICAgICAgICBpc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzUmVxdWlyZWQgJiYgIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7ICdjb25kaXRpb25hbF9yZXF1aXJlZCc6IHsgbWVzc2FnZTogIG1vZGVsLm1lc3NhZ2UgIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19