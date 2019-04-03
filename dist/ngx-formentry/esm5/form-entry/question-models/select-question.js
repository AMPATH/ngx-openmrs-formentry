/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var SelectQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(SelectQuestion, _super);
    function SelectQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'select';
        _this.options = options.options || [];
        _this.controlType = AfeControlType.AfeFormControl;
        _this.dataSource = options.dataSource || '';
        return _this;
    }
    return SelectQuestion;
}(QuestionBase));
export { SelectQuestion };
if (false) {
    /** @type {?} */
    SelectQuestion.prototype.options;
    /** @type {?} */
    SelectQuestion.prototype.dataSource;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUFvQywwQ0FBWTtJQUs1Qyx3QkFBWSxPQUE4QjtRQUExQyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUtqQjtRQUpHLEtBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQ2pELEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7O0lBQy9DLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFiRCxDQUFvQyxZQUFZLEdBYS9DOzs7O0lBWEcsaUNBQTBDOztJQUMxQyxvQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvc2VsZWN0LXF1ZXN0aW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XHJcblxyXG4gICAgb3B0aW9uczogeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W107XHJcbiAgICBkYXRhU291cmNlPzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlbGVjdFF1ZXN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdzZWxlY3QnO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucyB8fCBbXTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XHJcbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gb3B0aW9ucy5kYXRhU291cmNlIHx8ICcnO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=