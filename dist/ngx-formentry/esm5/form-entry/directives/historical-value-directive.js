/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] }
    ];
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDtJQVdFLGtDQUFvQixxQkFBbUQ7UUFBbkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUE4QjtRQUo3RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFLbkQsQ0FBQzs7Ozs7SUFHRCwyQ0FBUTs7OztJQURSLFVBQ1MsQ0FBQztRQUVSLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1lBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO21CQUM1RSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUU7Z0JBRXZFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFM0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFbkM7U0FFRjtJQUNILENBQUM7Ozs7Ozs7SUFDTyxnREFBYTs7Ozs7O0lBQXJCLFVBQXNCLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBQ0Qsc0JBQ0ksMENBQUk7Ozs7O1FBRFIsVUFDUyxJQUFjO1lBRXJCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFOzt3QkFDbEcsT0FBTyxHQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO29CQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLFFBQVE7MkJBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxjQUFjOzJCQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLEVBQUU7d0JBRTNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDbkIsT0FBTyxFQUNQLE9BQU8sQ0FDUixDQUFDO3dCQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO3dCQUVsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztxQkFFcEQ7eUJBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTt3QkFFbEUsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7d0JBQzdELE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO3dCQUVsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztxQkFDcEQ7aUJBQ0Y7YUFDRjtRQUNILENBQUM7OztPQUFBOztnQkFwRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxRQUFRO2lCQUNuQjs7OztnQkFOUSw0QkFBNEI7Ozt3QkFVbEMsS0FBSzs4QkFDTCxNQUFNOzJCQU9OLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBeUJoQyxLQUFLOztJQStCUiwrQkFBQztDQUFBLEFBdEVELElBc0VDO1NBbEVZLHdCQUF3Qjs7O0lBRW5DLHlDQUF5Qjs7SUFDekIsK0NBQW1EOztJQUVuRCxxREFBMEI7Ozs7O0lBRWQseURBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYFtub2RlXWBcbn0pXG5cbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsVmFsdWVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIF9ub2RlOiBOb2RlQmFzZTtcbiAgQE91dHB1dCgpIF9ub2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgaGlzdG9yaWNhbERpc3BsYXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhpc3RvcmljYWxGaWVsZEhlbHBlcjogSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSkge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBzZXRWYWx1ZShlKSB7XG5cbiAgICBpZiAoZS50YXJnZXQubmFtZSA9PT0gJ2hpc3RvcnlWYWx1ZScpIHtcblxuICAgICAgaWYgKHRoaXMuX25vZGUgJiYgKCF0aGlzLmNvbXBhcmVTdHJpbmcodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlLCAncGFnZScpXG4gICAgICAgIHx8ICF0aGlzLmNvbXBhcmVTdHJpbmcodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlLCAnc2VjdGlvbicpKSkge1xuXG4gICAgICAgIHRoaXMuX25vZGUuY29udHJvbC5zZXRWYWx1ZSh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxWYWx1ZSddID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLl9ub2RlQ2hhbmdlLmVtaXQodGhpcy5fbm9kZSk7XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNvbXBhcmVTdHJpbmcoYSwgYikge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm9kZShub2RlOiBOb2RlQmFzZSkge1xuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgICAgaWYgKHRoaXMuX25vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmICFfLmlzVW5kZWZpbmVkKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheTogYW55ID0geyB0ZXh0OiAnJywgX2RhdGU6ICcnIH07XG4gICAgICAgIGlmICgodGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VsZWN0J1xuICAgICAgICAgIHx8IHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ211bHRpLXNlbGVjdCdcbiAgICAgICAgICB8fCB0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzaW5nbGUtc2VsZWN0JykpIHtcblxuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuaGlzdG9yaWNhbEZpZWxkSGVscGVyLmdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMoXG4gICAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdsYWJlbCdcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xuXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbERpc3BsYXknXSA9IGRpc3BsYXk7XG5cbiAgICAgICAgfSBlbHNlIGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUpKSB7XG5cbiAgICAgICAgICBkaXNwbGF5LnRleHQgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWU7XG4gICAgICAgICAgZGlzcGxheS5fZGF0ZSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZURhdGU7XG5cbiAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsRGlzcGxheSddID0gZGlzcGxheTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=