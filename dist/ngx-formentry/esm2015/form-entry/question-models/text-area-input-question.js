/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TextInputQuestion } from './text-input-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class TextAreaInputQuestion extends TextInputQuestion {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.placeholder = options.placeholder || '';
        this.isExpanded = options.isExpanded || false;
        this.rows = options.rows || 18;
        this.renderingType = 'textarea';
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    TextAreaInputQuestion.prototype.isExpanded;
    /** @type {?} */
    TextAreaInputQuestion.prototype.rows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSw0QkFBNkIsU0FBUSxpQkFBaUI7Ozs7SUFJeEQsWUFBWSxPQUFnQztRQUV4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQztDQUNKOzs7SUFaRywyQ0FBb0I7O0lBQ3BCLHFDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dElucHV0UXVlc3Rpb24gfSBmcm9tICcuL3RleHQtaW5wdXQtcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBUZXh0QXJlYVF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90ZXh0LWFyZWEtcXVlc3Rpb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRBcmVhSW5wdXRRdWVzdGlvbiBleHRlbmRzIFRleHRJbnB1dFF1ZXN0aW9uIHtcclxuICAgIGlzRXhwYW5kZWQ6IGJvb2xlYW47XHJcbiAgICByb3dzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVGV4dEFyZWFRdWVzdGlvbk9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkID0gb3B0aW9ucy5pc0V4cGFuZGVkIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm93cyA9IG9wdGlvbnMucm93cyB8fCAxODtcclxuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAndGV4dGFyZWEnO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcclxuICAgIH1cclxufVxyXG4iXX0=