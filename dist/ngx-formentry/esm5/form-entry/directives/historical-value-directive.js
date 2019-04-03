/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';
var HistoricalValueDirective = /** @class */ (function () {
    function HistoricalValueDirective(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    HistoricalValueDirective.prototype.setValue = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.target.name === 'historyValue') {
            if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
                || !this.compareString(this._node.question.renderingType, 'section'))) {
                this._node.control.setValue(this._node.question.historicalDataValue.value);
                this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                e.stopPropagation();
                this._nodeChange.emit(this._node);
            }
        }
    };
    /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    HistoricalValueDirective.prototype.compareString = /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(HistoricalValueDirective.prototype, "node", {
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node) {
                this._node = node;
                if (this._node.question.enableHistoricalValue && !_.isUndefined(this._node.question.historicalDataValue)) {
                    /** @type {?} */
                    var display = { text: '', _date: '' };
                    if ((this._node.question.renderingType === 'select'
                        || this._node.question.renderingType === 'multi-select'
                        || this._node.question.renderingType === 'single-select')) {
                        display.text = this.historicalFieldHelper.getDisplayTextFromOptions(this._node.question, 'value', 'label');
                        display._date = this._node.question.historicalDataValue.valueDate;
                        this._node.question['historicalDisplay'] = display;
                    }
                    else if (!_.isUndefined(this._node.question.historicalDataValue)) {
                        display.text = this._node.question.historicalDataValue.value;
                        display._date = this._node.question.historicalDataValue.valueDate;
                        this._node.question['historicalDisplay'] = display;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    HistoricalValueDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[node]"
                },] },
    ];
    HistoricalValueDirective.ctorParameters = function () { return [
        { type: HistoricalFieldHelperService }
    ]; };
    HistoricalValueDirective.propDecorators = {
        _node: [{ type: Input }],
        _nodeChange: [{ type: Output }],
        setValue: [{ type: HostListener, args: ['click', ['$event'],] }],
        node: [{ type: Input }]
    };
    return HistoricalValueDirective;
}());
export { HistoricalValueDirective };
if (false) {
    /** @type {?} */
    HistoricalValueDirective.prototype._node;
    /** @type {?} */
    HistoricalValueDirective.prototype._nodeChange;
    /** @type {?} */
    HistoricalValueDirective.prototype.historicalDisplay;
    /**
     * @type {?}
     * @private
     */
    HistoricalValueDirective.prototype.historicalFieldHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDtJQVdFLGtDQUFvQixxQkFBbUQ7UUFBbkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUE4QjtRQUo3RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFLbkQsQ0FBQzs7Ozs7SUFHRCwyQ0FBUTs7OztJQURSLFVBQ1MsQ0FBQztRQUVSLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO21CQUM1RSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4RSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMs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QkFBd0I7OztJQUVuQyx5Q0FBeUI7O0lBQ3pCLCtDQUFtRDs7SUFFbkQscURBQTBCOzs7OztJQUVkLHlEQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogYFtub2RlXWBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBfbm9kZTogTm9kZUJhc2U7XHJcbiAgQE91dHB1dCgpIF9ub2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XHJcblxyXG4gIGhpc3RvcmljYWxEaXNwbGF5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaGlzdG9yaWNhbEZpZWxkSGVscGVyOiBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgc2V0VmFsdWUoZSkge1xyXG5cclxuICAgIGlmIChlLnRhcmdldC5uYW1lID09PSAnaGlzdG9yeVZhbHVlJykge1xyXG5cclxuICAgICAgaWYgKHRoaXMuX25vZGUgJiYgKCF0aGlzLmNvbXBhcmVTdHJpbmcodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlLCAncGFnZScpXHJcbiAgICAgICAgfHwgIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdzZWN0aW9uJykpKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX25vZGUuY29udHJvbC5zZXRWYWx1ZSh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsVmFsdWUnXSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX25vZGVDaGFuZ2UuZW1pdCh0aGlzLl9ub2RlKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgY29tcGFyZVN0cmluZyhhLCBiKSB7XHJcbiAgICBpZiAoYSA9PT0gYikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgbm9kZShub2RlOiBOb2RlQmFzZSkge1xyXG5cclxuICAgIGlmIChub2RlKSB7XHJcbiAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gICAgICBpZiAodGhpcy5fbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgIV8uaXNVbmRlZmluZWQodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlKSkge1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYXk6IGFueSA9IHsgdGV4dDogJycsIF9kYXRlOiAnJyB9O1xyXG4gICAgICAgIGlmICgodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VsZWN0J1xyXG4gICAgICAgICAgfHwgdGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnbXVsdGktc2VsZWN0J1xyXG4gICAgICAgICAgfHwgdGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2luZ2xlLXNlbGVjdCcpKSB7XHJcblxyXG4gICAgICAgICAgZGlzcGxheS50ZXh0ID0gdGhpcy5oaXN0b3JpY2FsRmllbGRIZWxwZXIuZ2V0RGlzcGxheVRleHRGcm9tT3B0aW9ucyhcclxuICAgICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvbixcclxuICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgJ2xhYmVsJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xyXG5cclxuICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxEaXNwbGF5J10gPSBkaXNwbGF5O1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCFfLmlzVW5kZWZpbmVkKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICBkaXNwbGF5LnRleHQgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWU7XHJcbiAgICAgICAgICBkaXNwbGF5Ll9kYXRlID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlRGF0ZTtcclxuXHJcbiAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsRGlzcGxheSddID0gZGlzcGxheTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==