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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU07SUFDSixnQkFBZSxDQUFDO0lBRWhCLFFBQVEsQ0FBQyxLQUFpQztRQUN4QyxxQ0FBcUM7UUFDckMsTUFBTSxDQUFDLENBQUMsT0FBdUIsRUFBMEIsRUFBRTtZQUN6RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzVCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLG1CQUFtQixHQUFXLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztZQUM5RCxNQUFNLHdCQUF3QixHQUFRLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztZQUNyRSxJQUFJLFVBQW1CLENBQUM7WUFFeEIsRUFBRSxDQUFDLENBQ0QsT0FBTztnQkFDUCxPQUFPLENBQUMsZ0JBQWdCO2dCQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FDM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDdEQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsU0FBZ0IsQ0FBQztvQkFDbkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQzt3QkFDbEQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzlELGFBQWEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDM0MsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixhQUFhO2dDQUNYLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUs7b0NBQ3hELENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLO29DQUNoQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQ2pDLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FDRCxPQUFPLHdCQUF3QixLQUFLLFFBQVE7Z0JBQzVDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQ3ZELENBQUMsQ0FBQyxDQUFDO2dCQUNELFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDcEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFFLG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQzlELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmFsaWRhdGUobW9kZWw6IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKSB7XG4gICAgLy8gY29udmVydCBoZWxwZXIgZnVuY3Rpb25zIHRvIHN0cmluZ1xuICAgIHJldHVybiAoY29udHJvbDogQWZlRm9ybUNvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCByZWxhdGlvblZhbHVlID0gbnVsbDtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHN0cmluZyA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uSWQ7XG4gICAgICBjb25zdCByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IGFueSA9IG1vZGVsLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycztcbiAgICAgIGxldCBpc1JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnRyb2wgJiZcbiAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmXG4gICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnNcbiAgICAgICkge1xuICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zLmZvckVhY2goKHJlbGF0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wudXVpZCA9PT0gcmVmZXJlbmNlUXVlc3Rpb25JZCkge1xuICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZWxhdGlvblZhbHVlID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVsYXRpb25WYWx1ZSA9XG4gICAgICAgICAgICAgICAgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlICYmIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgPyByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWVcbiAgICAgICAgICAgICAgICAgIDogcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLmluZGV4T2YocmVsYXRpb25WYWx1ZSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1JlcXVpcmVkICYmICF2YWx1ZSkge1xuICAgICAgICByZXR1cm4geyBjb25kaXRpb25hbF9yZXF1aXJlZDogeyBtZXNzYWdlOiBtb2RlbC5tZXNzYWdlIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19