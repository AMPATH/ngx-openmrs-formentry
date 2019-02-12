/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConditionalRequiredValidator = /** @class */ (function () {
    function ConditionalRequiredValidator() {
    }
    /**
     * @param {?} model
     * @return {?}
     */
    ConditionalRequiredValidator.prototype.validate = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        // convert helper functions to string
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
            var isRequired;
            if (control && control.controlRelations && control.controlRelations.relations) {
                control.controlRelations.relations.forEach((/**
                 * @param {?} relation
                 * @return {?}
                 */
                function (relation) {
                    /** @type {?} */
                    var relatedAsControl = (/** @type {?} */ (relation.relatedTo));
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
    };
    return ConditionalRequiredValidator;
}());
export { ConditionalRequiredValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7SUFFRTtJQUFlLENBQUM7Ozs7O0lBRWhCLCtDQUFROzs7O0lBQVIsVUFBUyxLQUFpQztRQUV4QyxxQ0FBcUM7UUFDckMsTUFBTTs7OztRQUFDLFVBQUMsT0FBdUI7O2dCQUV2QixLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7O2dCQUN2QixhQUFhLEdBQUcsSUFBSTs7Z0JBQ2xCLG1CQUFtQixHQUFXLEtBQUssQ0FBQyxtQkFBbUI7O2dCQUN2RCx3QkFBd0IsR0FBUSxLQUFLLENBQUMsd0JBQXdCOztnQkFDaEUsVUFBbUI7WUFFdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsUUFBUTs7d0JBRTNDLGdCQUFnQixHQUFHLG1CQUFBLFFBQVEsQ0FBQyxTQUFTLEVBQU87b0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1RCxhQUFhLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQzdDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osYUFBYSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUN4RSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO3dCQUNsRSxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDUCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyx3QkFBd0IsS0FBSyxRQUFRLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0csVUFBVSxHQUFHLElBQUksQ0FBQztZQUNwQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRyxFQUFFLENBQUM7WUFDbEUsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBQ0gsbUNBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICB2YWxpZGF0ZShtb2RlbDogQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwpIHtcblxuICAgIC8vIGNvbnZlcnQgaGVscGVyIGZ1bmN0aW9ucyB0byBzdHJpbmdcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCByZWxhdGlvblZhbHVlID0gbnVsbDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHN0cmluZyA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uSWQ7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IGFueSA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycztcbiAgICAgIGxldCBpc1JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucykge1xuICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wudXVpZCA9PT0gcmVmZXJlbmNlUXVlc3Rpb25JZCkge1xuICAgICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbCAmJiBBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA6IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyA9PT0gJ29iamVjdCcgJiYgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLmluZGV4T2YocmVsYXRpb25WYWx1ZSkgIT09IC0xKSB7XG4gICAgICAgIGlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJzogeyBtZXNzYWdlOiAgbW9kZWwubWVzc2FnZSAgfSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=