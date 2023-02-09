import { TextInputQuestion } from './text-input-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class TextAreaInputQuestion extends TextInputQuestion {
    constructor(options) {
        super(options);
        this.placeholder = options.placeholder || '';
        this.isExpanded = options.isExpanded || false;
        this.rows = options.rows || 18;
        this.renderingType = 'textarea';
        this.controlType = AfeControlType.AfeFormControl;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjtJQUkxRCxZQUFZLE9BQWdDO1FBQzFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUNuRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0SW5wdXRRdWVzdGlvbiB9IGZyb20gJy4vdGV4dC1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBUZXh0QXJlYVF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90ZXh0LWFyZWEtcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIFRleHRBcmVhSW5wdXRRdWVzdGlvbiBleHRlbmRzIFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgaXNFeHBhbmRlZDogYm9vbGVhbjtcbiAgcm93czogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgdGhpcy5pc0V4cGFuZGVkID0gb3B0aW9ucy5pc0V4cGFuZGVkIHx8IGZhbHNlO1xuICAgIHRoaXMucm93cyA9IG9wdGlvbnMucm93cyB8fCAxODtcbiAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAndGV4dGFyZWEnO1xuICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgfVxufVxuIl19