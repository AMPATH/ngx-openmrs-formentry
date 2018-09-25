/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class UiSelectQuestion extends QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'ui-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}
function UiSelectQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    UiSelectQuestion.prototype.options;
    /** @type {?} */
    UiSelectQuestion.prototype.searchFunction;
    /** @type {?} */
    UiSelectQuestion.prototype.resolveFunction;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdWktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0sdUJBQXdCLFNBQVEsWUFBWTs7OztJQUs5QyxZQUFZLE9BQWdDO1FBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0tBQ3BEO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBVaVNlbGVjdFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy91aS1zZWxlY3QtcXVlc3Rpb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVpU2VsZWN0UXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xyXG5cclxuICAgIG9wdGlvbnM6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdO1xyXG4gICAgc2VhcmNoRnVuY3Rpb246IEZ1bmN0aW9uO1xyXG4gICAgcmVzb2x2ZUZ1bmN0aW9uOiBGdW5jdGlvbjtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFVpU2VsZWN0UXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3VpLXNlbGVjdCc7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19