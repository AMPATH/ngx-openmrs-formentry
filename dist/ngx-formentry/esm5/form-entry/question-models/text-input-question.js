/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var TextInputQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(TextInputQuestion, _super);
    function TextInputQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.placeholder = options.placeholder || '';
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return TextInputQuestion;
}(QuestionBase));
export { TextInputQuestion };
if (false) {
    /** @type {?} */
    TextInputQuestion.prototype.placeholder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3RleHQtaW5wdXQtcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGO0lBQXVDLDZDQUFZO0lBRy9DLDJCQUFZLE9BQTRCO1FBQXhDLFlBRUksa0JBQU0sT0FBTyxDQUFDLFNBR2pCO1FBRkcsS0FBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0lBQ3JELENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFURCxDQUF1QyxZQUFZLEdBU2xEOzs7O0lBUEcsd0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IFRleHRRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdGV4dC1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0UXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xuXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXh0UXVlc3Rpb25PcHRpb25zKSB7XG5cbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XG4gICAgfVxufVxuIl19