/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
var RepeatingQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(RepeatingQuestion, _super);
    function RepeatingQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'repeating';
        _this.questions = options.questions || [];
        _this.controlType = AfeControlType.AfeFormArray;
        return _this;
    }
    return RepeatingQuestion;
}(NestedQuestion));
export { RepeatingQuestion };
function RepeatingQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    RepeatingQuestion.prototype.questions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0aW5nLXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcmVwZWF0aW5nLXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRCxJQUFBO0lBQXVDLDZDQUFjO0lBR2pELDJCQUFZLE9BQWlDO1FBQTdDLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBSWpCO1FBSEcsS0FBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7O0tBQ2xEOzRCQWRMO0VBTXVDLGNBQWMsRUFTcEQsQ0FBQTtBQVRELDZCQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgUmVwZWF0aW5nUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlcGVhdGluZy1xdWVzdGlvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XHJcblxyXG5pbXBvcnQgeyBOZXN0ZWRRdWVzdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBlYXRpbmdRdWVzdGlvbiBleHRlbmRzIE5lc3RlZFF1ZXN0aW9uIHtcclxuICAgIHF1ZXN0aW9uczogUXVlc3Rpb25CYXNlW107XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogUmVwZWF0aW5nUXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3JlcGVhdGluZyc7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSBvcHRpb25zLnF1ZXN0aW9ucyB8fCBbXTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUFycmF5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==