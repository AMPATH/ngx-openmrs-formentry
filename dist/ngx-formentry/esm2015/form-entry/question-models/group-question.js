/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
export class QuestionGroup extends NestedQuestion {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.isExpanded = true;
        this.renderingType = 'group';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormGroup;
    }
}
if (false) {
    /** @type {?} */
    QuestionGroup.prototype.questions;
    /** @type {?} */
    QuestionGroup.prototype.isExpanded;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRCxNQUFNLG9CQUFxQixTQUFRLGNBQWM7Ozs7SUFJN0MsWUFBWSxPQUE2QjtRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFIbkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUlkLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO0lBQ25ELENBQUM7Q0FDSjs7O0lBVEcsa0NBQTBCOztJQUMxQixtQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBHcm91cFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9ncm91cC1xdWVzdGlvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XHJcblxyXG5pbXBvcnQgeyBOZXN0ZWRRdWVzdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkdyb3VwIGV4dGVuZHMgTmVzdGVkUXVlc3Rpb24ge1xyXG4gICAgcXVlc3Rpb25zOiBRdWVzdGlvbkJhc2VbXTtcclxuICAgIGlzRXhwYW5kZWQgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEdyb3VwUXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ2dyb3VwJztcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IG9wdGlvbnMucXVlc3Rpb25zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXA7XHJcbiAgICB9XHJcbn1cclxuIl19