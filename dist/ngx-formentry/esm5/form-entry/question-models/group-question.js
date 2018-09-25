/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
var QuestionGroup = /** @class */ (function (_super) {
    tslib_1.__extends(QuestionGroup, _super);
    function QuestionGroup(options) {
        var _this = _super.call(this, options) || this;
        _this.isExpanded = true;
        _this.renderingType = 'group';
        _this.questions = options.questions || [];
        _this.controlType = AfeControlType.AfeFormGroup;
        return _this;
    }
    return QuestionGroup;
}(NestedQuestion));
export { QuestionGroup };
function QuestionGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionGroup.prototype.questions;
    /** @type {?} */
    QuestionGroup.prototype.isExpanded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFL0QsSUFBQTtJQUFtQyx5Q0FBYztJQUk3Qyx1QkFBWSxPQUE2QjtRQUF6QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjsyQkFQWSxJQUFJO1FBSWIsS0FBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7O0tBQ2xEO3dCQWZMO0VBTW1DLGNBQWMsRUFVaEQsQ0FBQTtBQVZELHlCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgR3JvdXBRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvZ3JvdXAtcXVlc3Rpb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5cclxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvbmVzdGVkLXF1ZXN0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Hcm91cCBleHRlbmRzIE5lc3RlZFF1ZXN0aW9uIHtcclxuICAgIHF1ZXN0aW9uczogUXVlc3Rpb25CYXNlW107XHJcbiAgICBpc0V4cGFuZGVkID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBHcm91cFF1ZXN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdncm91cCc7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSBvcHRpb25zLnF1ZXN0aW9ucyB8fCBbXTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUdyb3VwO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==