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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2NoZWNrYm94Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGO0lBQXNDLDRDQUFZO0lBR2hELDBCQUFZLE9BQXdCO1FBQXBDLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBSWY7UUFIQyxLQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsSUFBSSxPQUFPLENBQUM7UUFDM0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0lBQ25ELENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFURCxDQUFzQyxZQUFZLEdBU2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IENoZWNrYm94T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9jaGVja2JveC1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tCb3hRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XG4gIG9wdGlvbnM6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENoZWNrYm94T3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdjaGVja2JveCcgfHwgJ3JhZGlvJztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwgW107XG4gICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICB9XG59XG4iXX0=