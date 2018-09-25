/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function TextAreaInputQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    TextAreaInputQuestion.prototype.isExpanded;
    /** @type {?} */
    TextAreaInputQuestion.prototype.rows;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLElBQUE7SUFBMkMsaURBQWlCO0lBSXhELCtCQUFZLE9BQWdDO1FBQTVDLFlBRUksa0JBQU0sT0FBTyxDQUFDLFNBTWpCO1FBTEcsS0FBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxLQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1FBQzlDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDaEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDOztLQUNwRDtnQ0FoQkw7RUFJMkMsaUJBQWlCLEVBYTNELENBQUE7QUFiRCxpQ0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi90ZXh0LWlucHV0LXF1ZXN0aW9uJztcclxuaW1wb3J0IHsgVGV4dEFyZWFRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdGV4dC1hcmVhLXF1ZXN0aW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUlucHV0UXVlc3Rpb24gZXh0ZW5kcyBUZXh0SW5wdXRRdWVzdGlvbiB7XHJcbiAgICBpc0V4cGFuZGVkOiBib29sZWFuO1xyXG4gICAgcm93czogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IG9wdGlvbnMuaXNFeHBhbmRlZCB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLnJvd3MgPSBvcHRpb25zLnJvd3MgfHwgMTg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3RleHRhcmVhJztcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcbn1cclxuIl19