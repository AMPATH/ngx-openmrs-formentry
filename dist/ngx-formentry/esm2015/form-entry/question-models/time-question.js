import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class TimeQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.renderingType = 'time';
        this.controlType = AfeControlType.AfeFormControl;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3RpbWUtcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixNQUFNLG1CQUFvQixTQUFRLFlBQVk7SUFDMUMsWUFBWSxPQUE0QjtRQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IFRpbWVRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdGltZS1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgVGltZVF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUaW1lUXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAndGltZSc7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG59XG4iXX0=