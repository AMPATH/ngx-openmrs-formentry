/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
export class RepeatingQuestion extends NestedQuestion {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'repeating';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormArray;
    }
}
if (false) {
    /** @type {?} */
    RepeatingQuestion.prototype.questions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0aW5nLXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcmVwZWF0aW5nLXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRS9ELE1BQU0sd0JBQXlCLFNBQVEsY0FBYzs7OztJQUdqRCxZQUFZLE9BQWlDO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO0lBQ25ELENBQUM7Q0FDSjs7O0lBUkcsc0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IFJlcGVhdGluZ1F1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9yZXBlYXRpbmctcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvbmVzdGVkLXF1ZXN0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBSZXBlYXRpbmdRdWVzdGlvbiBleHRlbmRzIE5lc3RlZFF1ZXN0aW9uIHtcbiAgICBxdWVzdGlvbnM6IFF1ZXN0aW9uQmFzZVtdO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogUmVwZWF0aW5nUXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAncmVwZWF0aW5nJztcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSBvcHRpb25zLnF1ZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1BcnJheTtcbiAgICB9XG59XG4iXX0=