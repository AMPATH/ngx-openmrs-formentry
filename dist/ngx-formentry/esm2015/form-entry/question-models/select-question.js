/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class SelectQuestion extends QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
        this.dataSource = options.dataSource || '';
    }
}
if (false) {
    /** @type {?} */
    SelectQuestion.prototype.options;
    /** @type {?} */
    SelectQuestion.prototype.dataSource;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0scUJBQXNCLFNBQVEsWUFBWTs7OztJQUs1QyxZQUFZLE9BQThCO1FBQ3RDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQztDQUVKOzs7SUFYRyxpQ0FBMEM7O0lBQzFDLG9DQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9zZWxlY3QtcXVlc3Rpb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdFF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcclxuXHJcbiAgICBvcHRpb25zOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXTtcclxuICAgIGRhdGFTb3VyY2U/OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogU2VsZWN0UXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3NlbGVjdCc7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBvcHRpb25zLmRhdGFTb3VyY2UgfHwgJyc7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==