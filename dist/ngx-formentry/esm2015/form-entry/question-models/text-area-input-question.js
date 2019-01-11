/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGlCQUFpQjs7OztJQUl4RCxZQUFZLE9BQWdDO1FBRXhDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7OztJQVpHLDJDQUFvQjs7SUFDcEIscUNBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0SW5wdXRRdWVzdGlvbiB9IGZyb20gJy4vdGV4dC1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBUZXh0QXJlYVF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90ZXh0LWFyZWEtcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIFRleHRBcmVhSW5wdXRRdWVzdGlvbiBleHRlbmRzIFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBpc0V4cGFuZGVkOiBib29sZWFuO1xuICAgIHJvd3M6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zKSB7XG5cbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBvcHRpb25zLmlzRXhwYW5kZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucm93cyA9IG9wdGlvbnMucm93cyB8fCAxODtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3RleHRhcmVhJztcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICAgIH1cbn1cbiJdfQ==