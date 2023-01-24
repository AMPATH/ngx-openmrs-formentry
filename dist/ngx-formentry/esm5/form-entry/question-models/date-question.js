import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var DateQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(DateQuestion, _super);
    function DateQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.showTime = true;
        _this.showWeeksAdder = false;
        _this.renderingType = 'date';
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return DateQuestion;
}(QuestionBase));
export { DateQuestion };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvZGF0ZS1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUFrQyx3Q0FBWTtJQUc1QyxzQkFBWSxPQUE0QjtRQUF4QyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUdmO1FBTkQsY0FBUSxHQUFHLElBQUksQ0FBQztRQUNoQixvQkFBYyxHQUFHLEtBQUssQ0FBQztRQUdyQixLQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0lBQ25ELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFSRCxDQUFrQyxZQUFZLEdBUTdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IERhdGVRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvZGF0ZS1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcbiAgc2hvd1RpbWUgPSB0cnVlO1xuICBzaG93V2Vla3NBZGRlciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBEYXRlUXVlc3Rpb25PcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ2RhdGUnO1xuICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgfVxufVxuIl19