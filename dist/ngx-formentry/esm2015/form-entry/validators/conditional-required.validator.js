/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ConditionalRequiredValidator {
    constructor() { }
    /**
     * @param {?} model
     * @return {?}
     */
    validate(model) {
        // convert helper functions to string
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
            let isRequired;
            if (control && control.controlRelations && control.controlRelations.relations) {
                control.controlRelations.relations.forEach((/**
                 * @param {?} relation
                 * @return {?}
                 */
                relation => {
                    /** @type {?} */
                    const relatedAsControl = (/** @type {?} */ (relation.relatedTo));
                    if (relatedAsControl.uuid === referenceQuestionId) {
                        if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                            relationValue = relation.relatedTo.value;
                        }
                        else {
                            relationValue = relation.relatedTo.value && relation.relatedTo.value.value ?
                                relation.relatedTo.value.value : relation.relatedTo.value;
                        }
                    }
                }));
            }
            if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) !== -1) {
                isRequired = true;
            }
            if (isRequired && !value) {
                return { 'conditional_required': { message: model.message } };
            }
            return null;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTTtJQUVKLGdCQUFlLENBQUM7Ozs7O0lBRWhCLFFBQVEsQ0FBQyxLQUFpQztRQUV4QyxxQ0FBcUM7UUFDckMsTUFBTTs7OztRQUFDLENBQUMsT0FBdUIsRUFBMEIsRUFBRTs7a0JBRW5ELEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSzs7Z0JBQ3ZCLGFBQWEsR0FBRyxJQUFJOztrQkFDbEIsbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQjs7a0JBQ3ZELHdCQUF3QixHQUFRLEtBQUssQ0FBQyx3QkFBd0I7O2dCQUNoRSxVQUFtQjtZQUV2QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7Z0JBQUMsUUFBUSxDQUFDLEVBQUU7OzBCQUU5QyxnQkFBZ0IsR0FBRyxtQkFBQSxRQUFRLENBQUMsU0FBUyxFQUFPO29CQUNsRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUQsYUFBYSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO3dCQUM3QyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLGFBQWEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDeEUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDbEUsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUMsRUFBQyxDQUFDO1lBQ1AsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sd0JBQXdCLEtBQUssUUFBUSxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNHLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDcEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUcsRUFBRSxDQUFDO1lBQ2xFLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHZhbGlkYXRlKG1vZGVsOiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCkge1xyXG5cclxuICAgIC8vIGNvbnZlcnQgaGVscGVyIGZ1bmN0aW9ucyB0byBzdHJpbmdcclxuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcclxuICAgICAgbGV0IHJlbGF0aW9uVmFsdWUgPSBudWxsO1xyXG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbklkOiBzdHJpbmcgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbklkO1xyXG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IGFueSA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycztcclxuICAgICAgbGV0IGlzUmVxdWlyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucykge1xyXG4gICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKHJlbGF0aW9uID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xyXG4gICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbC51dWlkID09PSByZWZlcmVuY2VRdWVzdGlvbklkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlbGF0aW9uVmFsdWUgPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUgJiYgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlID9cclxuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA6IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyA9PT0gJ29iamVjdCcgJiYgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLmluZGV4T2YocmVsYXRpb25WYWx1ZSkgIT09IC0xKSB7XHJcbiAgICAgICAgaXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc1JlcXVpcmVkICYmICF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB7ICdjb25kaXRpb25hbF9yZXF1aXJlZCc6IHsgbWVzc2FnZTogIG1vZGVsLm1lc3NhZ2UgIH0gfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=