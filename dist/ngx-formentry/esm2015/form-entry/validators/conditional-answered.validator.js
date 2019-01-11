/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ConditionalAnsweredValidator {
    constructor() { }
    /**
     * @param {?} model
     * @return {?}
     */
    validate(model) {
        return (control) => {
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
                    control.controlRelations.relations.forEach(relation => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTSxPQUFPLDRCQUE0QjtJQUV2QyxnQkFBZSxDQUFDOzs7OztJQUVoQixRQUFRLENBQUMsS0FBaUM7UUFFeEMsT0FBTyxDQUFDLE9BQXVCLEVBQTBCLEVBQUU7O2tCQUVuRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7O2dCQUN2QixhQUFhLEdBQUcsSUFBSTs7a0JBQ2xCLG1CQUFtQixHQUFXLEtBQUssQ0FBQyxtQkFBbUI7O2tCQUN2RCx3QkFBd0IsR0FBUSxLQUFLLENBQUMsd0JBQXdCOztnQkFDaEUsZ0JBQWdCLEdBQVEsSUFBSTtZQUVoQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtvQkFDM0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7OzhCQUU5QyxnQkFBZ0IsR0FBRyxtQkFBQSxRQUFRLENBQUMsU0FBUyxFQUFPO3dCQUNsRCxJQUFJLGdCQUFnQixDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRTs0QkFDakQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUN2QyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzZCQUMxQztpQ0FBTTtnQ0FDSCxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxJQUFJLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQ2xILGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQzs2QkFDN0Q7eUJBQ0Y7d0JBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRTs0QkFDbEIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3lCQUMxQjs2QkFBTSxJQUFJLE9BQU8sd0JBQXdCLEtBQUssUUFBUSxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDakgsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3lCQUMxQjtvQkFDSCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNGO1lBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRyxFQUFFLENBQUM7YUFDakU7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKSB7XG5cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCByZWxhdGlvblZhbHVlID0gbnVsbDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHN0cmluZyA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uSWQ7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IGFueSA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycztcbiAgICAgIGxldCBzdWNjZXNzQ29uZGl0aW9uOiBhbnkgPSB0cnVlO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sLnV1aWQgPT09IHJlZmVyZW5jZVF1ZXN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRlZEFzQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRlZEFzQ29udHJvbC52YWx1ZSAmJiB0eXBlb2YgcmVsYXRlZEFzQ29udHJvbC52YWx1ZSA9PT0gJ29iamVjdCcgJiYgcmVsYXRlZEFzQ29udHJvbC52YWx1ZS52YWx1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkQXNDb250cm9sLnZhbHVlLnZhbHVlIDogcmVsYXRlZEFzQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIXJlbGF0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ29uZGl0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyA9PT0gJ29iamVjdCcgJiYgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLmluZGV4T2YocmVsYXRpb25WYWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXN1Y2Nlc3NDb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJzogeyBtZXNzYWdlOiAgbW9kZWwubWVzc2FnZSAgfSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=