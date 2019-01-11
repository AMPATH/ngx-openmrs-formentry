/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConditionalAnsweredValidator = /** @class */ (function () {
    function ConditionalAnsweredValidator() {
    }
    /**
     * @param {?} model
     * @return {?}
     */
    ConditionalAnsweredValidator.prototype.validate = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        return function (control) {
            /** @type {?} */
            var value = control.value;
            /** @type {?} */
            var relationValue = null;
            /** @type {?} */
            var referenceQuestionId = model.referenceQuestionId;
            /** @type {?} */
            var referenceQuestionAnswers = model.referenceQuestionAnswers;
            /** @type {?} */
            var successCondition = true;
            if (value) {
                if (control && control.controlRelations && control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(function (relation) {
                        /** @type {?} */
                        var relatedAsControl = (/** @type {?} */ (relation.relatedTo));
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
    };
    return ConditionalAnsweredValidator;
}());
export { ConditionalAnsweredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7SUFFRTtJQUFlLENBQUM7Ozs7O0lBRWhCLCtDQUFROzs7O0lBQVIsVUFBUyxLQUFpQztRQUV4QyxPQUFPLFVBQUMsT0FBdUI7O2dCQUV2QixLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7O2dCQUN2QixhQUFhLEdBQUcsSUFBSTs7Z0JBQ2xCLG1CQUFtQixHQUFXLEtBQUssQ0FBQyxtQkFBbUI7O2dCQUN2RCx3QkFBd0IsR0FBUSxLQUFLLENBQUMsd0JBQXdCOztnQkFDaEUsZ0JBQWdCLEdBQVEsSUFBSTtZQUVoQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtvQkFDM0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFROzs0QkFFM0MsZ0JBQWdCLEdBQUcsbUJBQUEsUUFBUSxDQUFDLFNBQVMsRUFBTzt3QkFDbEQsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLEVBQUU7NEJBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDdkMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQzs2QkFDMUM7aUNBQU07Z0NBQ0gsYUFBYSxHQUFHLGdCQUFnQixDQUFDLEtBQUssSUFBSSxPQUFPLGdCQUFnQixDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUNsSCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7NkJBQzdEO3lCQUNGO3dCQUVELElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ2xCLGdCQUFnQixHQUFHLEtBQUssQ0FBQzt5QkFDMUI7NkJBQU0sSUFBSSxPQUFPLHdCQUF3QixLQUFLLFFBQVEsSUFBSSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQ2pILGdCQUFnQixHQUFHLEtBQUssQ0FBQzt5QkFDMUI7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDRjtZQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDckIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUcsRUFBRSxDQUFDO2FBQ2pFO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0gsbUNBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICB2YWxpZGF0ZShtb2RlbDogQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwpIHtcblxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcblxuICAgICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgbGV0IHJlbGF0aW9uVmFsdWUgPSBudWxsO1xuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25JZDogc3RyaW5nID0gbW9kZWwucmVmZXJlbmNlUXVlc3Rpb25JZDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VyczogYW55ID0gbW9kZWwucmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzO1xuICAgICAgbGV0IHN1Y2Nlc3NDb25kaXRpb246IGFueSA9IHRydWU7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucykge1xuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKHJlbGF0aW9uID0+IHtcblxuICAgICAgICAgICAgICBjb25zdCByZWxhdGVkQXNDb250cm9sID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIGFueTtcbiAgICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wudXVpZCA9PT0gcmVmZXJlbmNlUXVlc3Rpb25JZCkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPSByZWxhdGVkQXNDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPSByZWxhdGVkQXNDb250cm9sLnZhbHVlICYmIHR5cGVvZiByZWxhdGVkQXNDb250cm9sLnZhbHVlID09PSAnb2JqZWN0JyAmJiByZWxhdGVkQXNDb250cm9sLnZhbHVlLnZhbHVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUudmFsdWUgOiByZWxhdGVkQXNDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghcmVsYXRpb25WYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDb25kaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzID09PSAnb2JqZWN0JyAmJiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMuaW5kZXhPZihyZWxhdGlvblZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ29uZGl0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghc3VjY2Vzc0NvbmRpdGlvbikge1xuICAgICAgICByZXR1cm4geyAnY29uZGl0aW9uYWxfYW5zd2VyZWQnOiB7IG1lc3NhZ2U6ICBtb2RlbC5tZXNzYWdlICB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==