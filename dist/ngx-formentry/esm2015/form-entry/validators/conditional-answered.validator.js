/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ConditionalAnsweredValidator {
    constructor() { }
    /**
     * @param {?} model
     * @return {?}
     */
    validate(model) {
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const value = control.value;
            /** @type {?} */
            let relationValue = null;
            /** @type {?} */
            const referenceQuestionId = model.referenceQuestionId;
            /** @type {?} */
            const referenceQuestionAnswers = model.referenceQuestionAnswers;
            /** @type {?} */
            let successCondition = true;
            if (value) {
                if (control && control.controlRelations && control.controlRelations.relations) {
                    control.controlRelations.relations.forEach((/**
                     * @param {?} relation
                     * @return {?}
                     */
                    relation => {
                        /** @type {?} */
                        const relatedAsControl = (/** @type {?} */ (relation.relatedTo));
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
                    }));
                }
            }
            if (!successCondition) {
                return { 'conditional_answered': { message: model.message } };
            }
            return null;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTTtJQUVKLGdCQUFlLENBQUM7Ozs7O0lBRWhCLFFBQVEsQ0FBQyxLQUFpQztRQUV4QyxNQUFNOzs7O1FBQUMsQ0FBQyxPQUF1QixFQUEwQixFQUFFOztrQkFFbkQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLOztnQkFDdkIsYUFBYSxHQUFHLElBQUk7O2tCQUNsQixtQkFBbUIsR0FBVyxLQUFLLENBQUMsbUJBQW1COztrQkFDdkQsd0JBQXdCLEdBQVEsS0FBSyxDQUFDLHdCQUF3Qjs7Z0JBQ2hFLGdCQUFnQixHQUFRLElBQUk7WUFFaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7b0JBQUMsUUFBUSxDQUFDLEVBQUU7OzhCQUU5QyxnQkFBZ0IsR0FBRyxtQkFBQSxRQUFRLENBQUMsU0FBUyxFQUFPO3dCQUNsRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsQ0FBQyxDQUFDOzRCQUNsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDeEMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQzs0QkFDM0MsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDSixhQUFhLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxJQUFJLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQ2xILGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQzs0QkFDOUQsQ0FBQzt3QkFDSCxDQUFDO3dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUMzQixDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLHdCQUF3QixLQUFLLFFBQVEsSUFBSSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNsSCxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzNCLENBQUM7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUNILENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRyxFQUFFLENBQUM7WUFDbEUsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZhbGlkYXRlKG1vZGVsOiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCkge1xuXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBsZXQgcmVsYXRpb25WYWx1ZSA9IG51bGw7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbklkOiBzdHJpbmcgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbklkO1xuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiBhbnkgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM7XG4gICAgICBsZXQgc3VjY2Vzc0NvbmRpdGlvbjogYW55ID0gdHJ1ZTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zKSB7XG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zLmZvckVhY2gocmVsYXRpb24gPT4ge1xuXG4gICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbC51dWlkID09PSByZWZlcmVuY2VRdWVzdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVsYXRlZEFzQ29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUgJiYgdHlwZW9mIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUgPT09ICdvYmplY3QnICYmIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUudmFsdWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZEFzQ29udHJvbC52YWx1ZS52YWx1ZSA6IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFyZWxhdGlvblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDb25kaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFzdWNjZXNzQ29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiB7ICdjb25kaXRpb25hbF9hbnN3ZXJlZCc6IHsgbWVzc2FnZTogIG1vZGVsLm1lc3NhZ2UgIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19