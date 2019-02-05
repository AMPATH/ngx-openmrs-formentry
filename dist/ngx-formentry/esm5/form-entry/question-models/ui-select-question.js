/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var UiSelectQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(UiSelectQuestion, _super);
    function UiSelectQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'ui-select';
        _this.options = options.options || [];
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return UiSelectQuestion;
}(QuestionBase));
export { UiSelectQuestion };
if (false) {
    /** @type {?} */
    UiSelectQuestion.prototype.options;
    /** @type {?} */
    UiSelectQuestion.prototype.searchFunction;
    /** @type {?} */
    UiSelectQuestion.prototype.resolveFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdWktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUFzQyw0Q0FBWTtJQUs5QywwQkFBWSxPQUFnQztRQUE1QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjtRQUhHLEtBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDOztJQUNyRCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBc0MsWUFBWSxHQVlqRDs7OztJQVZHLG1DQUEwQzs7SUFDMUMsMENBQXlCOztJQUN6QiwyQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgVWlTZWxlY3RRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdWktc2VsZWN0LXF1ZXN0aW9uLW9wdGlvbnMnO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBVaVNlbGVjdFF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcblxuICAgIG9wdGlvbnM6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdO1xuICAgIHNlYXJjaEZ1bmN0aW9uOiBGdW5jdGlvbjtcbiAgICByZXNvbHZlRnVuY3Rpb246IEZ1bmN0aW9uO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFVpU2VsZWN0UXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAndWktc2VsZWN0JztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zIHx8IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XG4gICAgfVxuXG59XG4iXX0=