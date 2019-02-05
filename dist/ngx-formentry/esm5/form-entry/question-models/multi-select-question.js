/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SelectQuestion } from './select-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var MultiSelectQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(MultiSelectQuestion, _super);
    function MultiSelectQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'multi-select' || 'single-select';
        _this.options = options.options || [];
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return MultiSelectQuestion;
}(SelectQuestion));
export { MultiSelectQuestion };
if (false) {
    /** @type {?} */
    MultiSelectQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUF5QywrQ0FBYztJQUluRCw2QkFBWSxPQUFtQztRQUEvQyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjtRQUhHLEtBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxJQUFLLGVBQWUsQ0FBQztRQUN4RCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7SUFDckQsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQVhELENBQXlDLGNBQWMsR0FXdEQ7Ozs7SUFURyxzQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4vc2VsZWN0LXF1ZXN0aW9uJztcbmltcG9ydCB7IE11bHRpU2VsZWN0UXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL211bHRpLXNlbGVjdC1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RRdWVzdGlvbiBleHRlbmRzIFNlbGVjdFF1ZXN0aW9uIHtcblxuICAgIG9wdGlvbnM6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogTXVsdGlTZWxlY3RRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdtdWx0aS1zZWxlY3QnICB8fCAnc2luZ2xlLXNlbGVjdCc7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucyB8fCBbXTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICAgIH1cblxufVxuIl19