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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0aW5nLXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcmVwZWF0aW5nLXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRS9ELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxjQUFjOzs7O0lBR2pELFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFDbkQsQ0FBQztDQUNKOzs7SUFSRyxzQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgUmVwZWF0aW5nUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlcGVhdGluZy1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5pbXBvcnQgeyBOZXN0ZWRRdWVzdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcblxuZXhwb3J0IGNsYXNzIFJlcGVhdGluZ1F1ZXN0aW9uIGV4dGVuZHMgTmVzdGVkUXVlc3Rpb24ge1xuICAgIHF1ZXN0aW9uczogUXVlc3Rpb25CYXNlW107XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZXBlYXRpbmdRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdyZXBlYXRpbmcnO1xuICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IG9wdGlvbnMucXVlc3Rpb25zIHx8IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUFycmF5O1xuICAgIH1cbn1cbiJdfQ==