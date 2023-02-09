import * as tslib_1 from "tslib";
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
var RepeatingQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(RepeatingQuestion, _super);
    function RepeatingQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'repeating';
        _this.questions = options.questions || [];
        _this.controlType = AfeControlType.AfeFormArray;
        return _this;
    }
    return RepeatingQuestion;
}(NestedQuestion));
export { RepeatingQuestion };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0aW5nLXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcmVwZWF0aW5nLXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRS9EO0lBQXVDLDZDQUFjO0lBR25ELDJCQUFZLE9BQWlDO1FBQTdDLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBSWY7UUFIQyxLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ3pDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQzs7SUFDakQsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVRELENBQXVDLGNBQWMsR0FTcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgUmVwZWF0aW5nUXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlcGVhdGluZy1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5pbXBvcnQgeyBOZXN0ZWRRdWVzdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcblxuZXhwb3J0IGNsYXNzIFJlcGVhdGluZ1F1ZXN0aW9uIGV4dGVuZHMgTmVzdGVkUXVlc3Rpb24ge1xuICBxdWVzdGlvbnM6IFF1ZXN0aW9uQmFzZVtdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcGVhdGluZ1F1ZXN0aW9uT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdyZXBlYXRpbmcnO1xuICAgIHRoaXMucXVlc3Rpb25zID0gb3B0aW9ucy5xdWVzdGlvbnMgfHwgW107XG4gICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1BcnJheTtcbiAgfVxufVxuIl19