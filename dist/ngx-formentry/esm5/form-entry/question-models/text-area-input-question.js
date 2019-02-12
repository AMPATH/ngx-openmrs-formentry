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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGO0lBQTJDLGlEQUFpQjtJQUl4RCwrQkFBWSxPQUFnQztRQUE1QyxZQUVJLGtCQUFNLE9BQU8sQ0FBQyxTQU1qQjtRQUxHLEtBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDN0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7SUFDckQsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQWJELENBQTJDLGlCQUFpQixHQWEzRDs7OztJQVpHLDJDQUFvQjs7SUFDcEIscUNBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0SW5wdXRRdWVzdGlvbiB9IGZyb20gJy4vdGV4dC1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBUZXh0QXJlYVF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90ZXh0LWFyZWEtcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIFRleHRBcmVhSW5wdXRRdWVzdGlvbiBleHRlbmRzIFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBpc0V4cGFuZGVkOiBib29sZWFuO1xuICAgIHJvd3M6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zKSB7XG5cbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBvcHRpb25zLmlzRXhwYW5kZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucm93cyA9IG9wdGlvbnMucm93cyB8fCAxODtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3RleHRhcmVhJztcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICAgIH1cbn1cbiJdfQ==