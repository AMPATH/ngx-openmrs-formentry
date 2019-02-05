/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var FileUploadQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(FileUploadQuestion, _super);
    function FileUploadQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.showTime = true;
        _this.showWeeksAdder = false;
        _this.renderingType = 'file';
        _this.dataSource = options.dataSource;
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return FileUploadQuestion;
}(QuestionBase));
export { FileUploadQuestion };
if (false) {
    /** @type {?} */
    FileUploadQuestion.prototype.showTime;
    /** @type {?} */
    FileUploadQuestion.prototype.showWeeksAdder;
    /** @type {?} */
    FileUploadQuestion.prototype.dataSource;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9maWxlLXVwbG9hZC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEY7SUFBd0MsOENBQVk7SUFJaEQsNEJBQVksT0FBa0M7UUFBOUMsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FJakI7UUFSRCxjQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBSW5CLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNyQyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0lBQ3JELENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFWRCxDQUF3QyxZQUFZLEdBVW5EOzs7O0lBVEcsc0NBQWdCOztJQUNoQiw0Q0FBdUI7O0lBQ3ZCLHdDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbGUtdXBsb2FkLXF1ZXN0aW9uLW9wdGlvbnMnO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkUXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xuICAgIHNob3dUaW1lID0gdHJ1ZTtcbiAgICBzaG93V2Vla3NBZGRlciA9IGZhbHNlO1xuICAgIGRhdGFTb3VyY2U/OiBhbnk7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogRmlsZVVwbG9hZFF1ZXN0aW9uT3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ2ZpbGUnO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBvcHRpb25zLmRhdGFTb3VyY2U7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG59XG4iXX0=