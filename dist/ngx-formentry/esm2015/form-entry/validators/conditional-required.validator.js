/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class ConditionalRequiredValidator {
    constructor() { }
    /**
     * @param {?} model
     * @return {?}
     */
    validate(model) {
        // convert helper functions to string
        return (control) => {
            const /** @type {?} */ value = control.value;
            let /** @type {?} */ relationValue = null;
            const /** @type {?} */ referenceQuestionId = model.referenceQuestionId;
            const /** @type {?} */ referenceQuestionAnswers = model.referenceQuestionAnswers;
            let /** @type {?} */ isRequired;
            if (control && control.controlRelations && control.controlRelations.relations) {
                control.controlRelations.relations.forEach(relation => {
                    const /** @type {?} */ relatedAsControl = /** @type {?} */ (relation.relatedTo);
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
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTTtJQUVKLGlCQUFnQjs7Ozs7SUFFaEIsUUFBUSxDQUFDLEtBQWlDOztRQUd4QyxNQUFNLENBQUMsQ0FBQyxPQUF1QixFQUEwQixFQUFFO1lBRXpELHVCQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzVCLHFCQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDekIsdUJBQU0sbUJBQW1CLEdBQVcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzlELHVCQUFNLHdCQUF3QixHQUFRLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztZQUNyRSxxQkFBSSxVQUFtQixDQUFDO1lBRXhCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUVwRCx1QkFBTSxnQkFBZ0IscUJBQUcsUUFBUSxDQUFDLFNBQWdCLENBQUEsQ0FBQztvQkFDbkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQzt3QkFDbEQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVELGFBQWEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzt5QkFDNUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osYUFBYSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUN4RSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUNqRTtxQkFDRjtpQkFDRixDQUFDLENBQUM7YUFDTjtZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sd0JBQXdCLEtBQUssUUFBUSxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNHLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDbkI7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRyxLQUFLLENBQUMsT0FBTyxFQUFHLEVBQUUsQ0FBQzthQUNqRTtZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYixDQUFDO0tBQ0g7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICB2YWxpZGF0ZShtb2RlbDogQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwpIHtcclxuXHJcbiAgICAvLyBjb252ZXJ0IGhlbHBlciBmdW5jdGlvbnMgdG8gc3RyaW5nXHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XHJcblxyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnRyb2wudmFsdWU7XHJcbiAgICAgIGxldCByZWxhdGlvblZhbHVlID0gbnVsbDtcclxuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25JZDogc3RyaW5nID0gbW9kZWwucmVmZXJlbmNlUXVlc3Rpb25JZDtcclxuICAgICAgY29uc3QgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiBhbnkgPSBtb2RlbC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM7XHJcbiAgICAgIGxldCBpc1JlcXVpcmVkOiBib29sZWFuO1xyXG5cclxuICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcclxuICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWxhdGVkQXNDb250cm9sID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIGFueTtcclxuICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wudXVpZCA9PT0gcmVmZXJlbmNlUXVlc3Rpb25JZCkge1xyXG4gICAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sICYmIEFycmF5LmlzQXJyYXkocmVsYXRlZEFzQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlICYmIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgOiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMgPT09ICdvYmplY3QnICYmIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2Vycy5pbmRleE9mKHJlbGF0aW9uVmFsdWUpICE9PSAtMSkge1xyXG4gICAgICAgIGlzUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiAhdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4geyAnY29uZGl0aW9uYWxfcmVxdWlyZWQnOiB7IG1lc3NhZ2U6ICBtb2RlbC5tZXNzYWdlICB9IH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19