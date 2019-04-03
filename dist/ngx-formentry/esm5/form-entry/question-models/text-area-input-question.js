/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TextInputQuestion } from './text-input-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var TextAreaInputQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaInputQuestion, _super);
    function TextAreaInputQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.placeholder = options.placeholder || '';
        _this.isExpanded = options.isExpanded || false;
        _this.rows = options.rows || 18;
        _this.renderingType = 'textarea';
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return TextAreaInputQuestion;
}(TextInputQuestion));
export { TextAreaInputQuestion };
if (false) {
    /** @type {?} */
    TextAreaInputQuestion.prototype.isExpanded;
    /** @type {?} */
    TextAreaInputQuestion.prototype.rows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGO0lBQTJDLGlEQUFpQjtJQUl4RCwrQkFBWSxPQUFnQztRQUE1QyxZQUVJLGtCQUFNLE9BQU8sQ0FBQyxTQU1qQjtRQUxHLEtBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDN0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7SUFDckQsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQWJELENBQTJDLGlCQUFpQixHQWEzRDs7OztJQVpHLDJDQUFvQjs7SUFDcEIscUNBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0SW5wdXRRdWVzdGlvbiB9IGZyb20gJy4vdGV4dC1pbnB1dC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RleHQtYXJlYS1xdWVzdGlvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIGV4dGVuZHMgVGV4dElucHV0UXVlc3Rpb24ge1xyXG4gICAgaXNFeHBhbmRlZDogYm9vbGVhbjtcclxuICAgIHJvd3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXh0QXJlYVF1ZXN0aW9uT3B0aW9ucykge1xyXG5cclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcclxuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBvcHRpb25zLmlzRXhwYW5kZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yb3dzID0gb3B0aW9ucy5yb3dzIHx8IDE4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICd0ZXh0YXJlYSc7XHJcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==