/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUF5QywrQ0FBYztJQUluRCw2QkFBWSxPQUFtQztRQUEvQyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjtRQUhHLEtBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxJQUFLLGVBQWUsQ0FBQztRQUN4RCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7SUFDckQsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQVhELENBQXlDLGNBQWMsR0FXdEQ7Ozs7SUFURyxzQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4vc2VsZWN0LXF1ZXN0aW9uJztcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvbXVsdGktc2VsZWN0LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdFF1ZXN0aW9uIGV4dGVuZHMgU2VsZWN0UXVlc3Rpb24ge1xyXG5cclxuICAgIG9wdGlvbnM6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE11bHRpU2VsZWN0UXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ211bHRpLXNlbGVjdCcgIHx8ICdzaW5nbGUtc2VsZWN0JztcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=