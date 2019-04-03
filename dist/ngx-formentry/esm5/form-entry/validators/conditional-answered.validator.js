/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
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
                    control.controlRelations.relations.forEach((/**
                     * @param {?} relation
                     * @return {?}
                     */
                    function (relation) {
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
                    }));
                }
            }
            if (!successCondition) {
                return { 'conditional_answered': { message: model.message } };
            }
            return null;
        });
    };
    return ConditionalAnsweredValidator;
}());
export { ConditionalAnsweredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7SUFFRTtJQUFlLENBQUM7Ozs7O0lBRWhCLCtDQUFROzs7O0lBQVIsVUFBUyxLQUFpQztRQUV4QyxNQUFNOzs7O1FBQUMsVUFBQyxPQUF1Qjs7Z0JBRXZCLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSzs7Z0JBQ3ZCLGFBQWEsR0FBRyxJQUFJOztnQkFDbEIsbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQjs7Z0JBQ3ZELHdCQUF3QixHQUFRLEtBQUssQ0FBQyx3QkFBd0I7O2dCQUNoRSxnQkFBZ0IsR0FBUSxJQUFJO1lBRWhDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsUUFBUTs7NEJBRTNDLGdCQUFnQixHQUFHLG1CQUFBLFFBQVEsQ0FBQyxTQUFTLEVBQU87d0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7NEJBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN4QyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzRCQUMzQyxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FDbEgsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzRCQUM5RCxDQUFDO3dCQUNILENBQUM7d0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzNCLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sd0JBQXdCLEtBQUssUUFBUSxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xILGdCQUFnQixHQUFHLEtBQUssQ0FBQzt3QkFDM0IsQ0FBQztvQkFDSCxDQUFDLEVBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRyxLQUFLLENBQUMsT0FBTyxFQUFHLEVBQUUsQ0FBQztZQUNsRSxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQztJQUNKLENBQUM7SUFDSCxtQ0FBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgdmFsaWRhdGUobW9kZWw6IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKSB7XHJcblxyXG4gICAgcmV0dXJuIChjb250cm9sOiBBZmVGb3JtQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xyXG5cclxuICAgICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICBsZXQgcmVsYXRpb25WYWx1ZSA9IG51bGw7XHJcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHN0cmluZyA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uSWQ7XHJcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VyczogYW55ID0gbW9kZWwucmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzO1xyXG4gICAgICBsZXQgc3VjY2Vzc0NvbmRpdGlvbjogYW55ID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xyXG4gICAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sLnV1aWQgPT09IHJlZmVyZW5jZVF1ZXN0aW9uSWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPSByZWxhdGVkQXNDb250cm9sLnZhbHVlICYmIHR5cGVvZiByZWxhdGVkQXNDb250cm9sLnZhbHVlID09PSAnb2JqZWN0JyAmJiByZWxhdGVkQXNDb250cm9sLnZhbHVlLnZhbHVlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZEFzQ29udHJvbC52YWx1ZS52YWx1ZSA6IHJlbGF0ZWRBc0NvbnRyb2wudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoIXJlbGF0aW9uVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDb25kaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXN1Y2Nlc3NDb25kaXRpb24pIHtcclxuICAgICAgICByZXR1cm4geyAnY29uZGl0aW9uYWxfYW5zd2VyZWQnOiB7IG1lc3NhZ2U6ICBtb2RlbC5tZXNzYWdlICB9IH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19