/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var CheckBoxQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(CheckBoxQuestion, _super);
    function CheckBoxQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'checkbox' || 'radio';
        _this.options = options.options || [];
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return CheckBoxQuestion;
}(QuestionBase));
export { CheckBoxQuestion };
if (false) {
    /** @type {?} */
    CheckBoxQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9jaGVja2JveC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEY7SUFBc0MsNENBQVk7SUFJOUMsMEJBQVksT0FBd0I7UUFBcEMsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FJakI7UUFIRyxLQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsSUFBSSxPQUFPLENBQUM7UUFDM0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0lBQ3JELENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFYRCxDQUFzQyxZQUFZLEdBV2pEOzs7O0lBVEcsbUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgQ2hlY2tib3hPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NoZWNrYm94LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja0JveFF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcclxuXHJcbiAgICBvcHRpb25zOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDaGVja2JveE9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnY2hlY2tib3gnIHx8ICdyYWRpbyc7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19