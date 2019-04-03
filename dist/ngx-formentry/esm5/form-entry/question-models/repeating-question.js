/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
if (false) {
    /** @type {?} */
    RepeatingQuestion.prototype.questions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0aW5nLXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcmVwZWF0aW5nLXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRDtJQUF1Qyw2Q0FBYztJQUdqRCwyQkFBWSxPQUFpQztRQUE3QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjtRQUhHLEtBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekMsS0FBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDOztJQUNuRCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBdUMsY0FBYyxHQVNwRDs7OztJQVJHLHNDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IFJlcGVhdGluZ1F1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9yZXBlYXRpbmctcXVlc3Rpb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5cclxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvbmVzdGVkLXF1ZXN0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVwZWF0aW5nUXVlc3Rpb24gZXh0ZW5kcyBOZXN0ZWRRdWVzdGlvbiB7XHJcbiAgICBxdWVzdGlvbnM6IFF1ZXN0aW9uQmFzZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcGVhdGluZ1F1ZXN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdyZXBlYXRpbmcnO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25zID0gb3B0aW9ucy5xdWVzdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1BcnJheTtcclxuICAgIH1cclxufVxyXG4iXX0=