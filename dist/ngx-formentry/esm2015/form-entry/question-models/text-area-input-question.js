/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function TextAreaInputQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    TextAreaInputQuestion.prototype.isExpanded;
    /** @type {?} */
    TextAreaInputQuestion.prototype.rows;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSw0QkFBNkIsU0FBUSxpQkFBaUI7Ozs7SUFJeEQsWUFBWSxPQUFnQztRQUV4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7S0FDcEQ7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi90ZXh0LWlucHV0LXF1ZXN0aW9uJztcclxuaW1wb3J0IHsgVGV4dEFyZWFRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdGV4dC1hcmVhLXF1ZXN0aW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUlucHV0UXVlc3Rpb24gZXh0ZW5kcyBUZXh0SW5wdXRRdWVzdGlvbiB7XHJcbiAgICBpc0V4cGFuZGVkOiBib29sZWFuO1xyXG4gICAgcm93czogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IG9wdGlvbnMuaXNFeHBhbmRlZCB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLnJvd3MgPSBvcHRpb25zLnJvd3MgfHwgMTg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3RleHRhcmVhJztcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcbn1cclxuIl19