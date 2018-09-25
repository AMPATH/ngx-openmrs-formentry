/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function FileUploadQuestion_tsickle_Closure_declarations() {
    /** @type {?} */
    FileUploadQuestion.prototype.showTime;
    /** @type {?} */
    FileUploadQuestion.prototype.showWeeksAdder;
    /** @type {?} */
    FileUploadQuestion.prototype.dataSource;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9maWxlLXVwbG9hZC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsSUFBQTtJQUF3Qyw4Q0FBWTtJQUloRCw0QkFBWSxPQUFrQztRQUE5QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjt5QkFSVSxJQUFJOytCQUNFLEtBQUs7UUFJbEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQzs7S0FDcEQ7NkJBYkw7RUFJd0MsWUFBWSxFQVVuRCxDQUFBO0FBVkQsOEJBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbGUtdXBsb2FkLXF1ZXN0aW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkUXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xyXG4gICAgc2hvd1RpbWUgPSB0cnVlO1xyXG4gICAgc2hvd1dlZWtzQWRkZXIgPSBmYWxzZTtcclxuICAgIGRhdGFTb3VyY2U/OiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaWxlVXBsb2FkUXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ2ZpbGUnO1xyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG9wdGlvbnMuZGF0YVNvdXJjZTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcbn1cclxuIl19