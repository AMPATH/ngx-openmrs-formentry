/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SelectQuestion } from './select-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class MultiSelectQuestion extends SelectQuestion {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'multi-select' || 'single-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    MultiSelectQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0sMEJBQTJCLFNBQVEsY0FBYzs7OztJQUluRCxZQUFZLE9BQW1DO1FBQzNDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxJQUFLLGVBQWUsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUNyRCxDQUFDO0NBRUo7OztJQVRHLHNDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi9zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvbXVsdGktc2VsZWN0LW9wdGlvbnMnO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdFF1ZXN0aW9uIGV4dGVuZHMgU2VsZWN0UXVlc3Rpb24ge1xuXG4gICAgb3B0aW9uczogeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W107XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNdWx0aVNlbGVjdFF1ZXN0aW9uT3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ211bHRpLXNlbGVjdCcgIHx8ICdzaW5nbGUtc2VsZWN0JztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zIHx8IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XG4gICAgfVxuXG59XG4iXX0=