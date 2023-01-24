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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy90ZXh0LWFyZWEtaW5wdXQtcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUEyQyxpREFBaUI7SUFJMUQsK0JBQVksT0FBZ0M7UUFBNUMsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FNZjtRQUxDLEtBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDN0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7SUFDbkQsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQVpELENBQTJDLGlCQUFpQixHQVkzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi90ZXh0LWlucHV0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFRleHRBcmVhUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RleHQtYXJlYS1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIGV4dGVuZHMgVGV4dElucHV0UXVlc3Rpb24ge1xuICBpc0V4cGFuZGVkOiBib29sZWFuO1xuICByb3dzOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogVGV4dEFyZWFRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSBvcHRpb25zLmlzRXhwYW5kZWQgfHwgZmFsc2U7XG4gICAgdGhpcy5yb3dzID0gb3B0aW9ucy5yb3dzIHx8IDE4O1xuICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICd0ZXh0YXJlYSc7XG4gICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICB9XG59XG4iXX0=