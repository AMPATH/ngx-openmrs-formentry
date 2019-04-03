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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0sMEJBQTJCLFNBQVEsY0FBYzs7OztJQUluRCxZQUFZLE9BQW1DO1FBQzNDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxJQUFLLGVBQWUsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUNyRCxDQUFDO0NBRUo7OztJQVRHLHNDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi9zZWxlY3QtcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tdWx0aS1zZWxlY3Qtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0UXVlc3Rpb24gZXh0ZW5kcyBTZWxlY3RRdWVzdGlvbiB7XHJcblxyXG4gICAgb3B0aW9uczogeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W107XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogTXVsdGlTZWxlY3RRdWVzdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnbXVsdGktc2VsZWN0JyAgfHwgJ3NpbmdsZS1zZWxlY3QnO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucyB8fCBbXTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==