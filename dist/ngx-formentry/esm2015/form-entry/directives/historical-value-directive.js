/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';
export class HistoricalValueDirective {
    /**
     * @param {?} historicalFieldHelper
     */
    constructor(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    setValue(e) {
        if (e.target.name === 'historyValue') {
            if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
                || !this.compareString(this._node.question.renderingType, 'section'))) {
                this._node.control.setValue(this._node.question.historicalDataValue.value);
                this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                e.stopPropagation();
                this._nodeChange.emit(this._node);
            }
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compareString(a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    set node(node) {
        if (node) {
            this._node = node;
            if (this._node.question.enableHistoricalValue && !_.isUndefined(this._node.question.historicalDataValue)) {
                const /** @type {?} */ display = { text: '', _date: '' };
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
    }
}
HistoricalValueDirective.decorators = [
    { type: Directive, args: [{
                selector: `[node]`
            },] },
];
/** @nocollapse */
HistoricalValueDirective.ctorParameters = () => [
    { type: HistoricalFieldHelperService, },
];
HistoricalValueDirective.propDecorators = {
    "_node": [{ type: Input },],
    "_nodeChange": [{ type: Output },],
    "setValue": [{ type: HostListener, args: ['click', ['$event'],] },],
    "node": [{ type: Input },],
};
function HistoricalValueDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HistoricalValueDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HistoricalValueDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    HistoricalValueDirective.propDecorators;
    /** @type {?} */
    HistoricalValueDirective.prototype._node;
    /** @type {?} */
    HistoricalValueDirective.prototype._nodeChange;
    /** @type {?} */
    HistoricalValueDirective.prototype.historicalDisplay;
    /** @type {?} */
    HistoricalValueDirective.prototype.historicalFieldHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU1yRCxNQUFNOzs7O0lBT0osWUFBb0IscUJBQW1EO1FBQW5ELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBOEI7MkJBSi9DLElBQUksWUFBWSxFQUFVO0tBS2pEOzs7OztJQUdELFFBQVEsQ0FBQyxDQUFDO1FBRVIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUVyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7bUJBQzVFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFM0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFbkM7U0FFRjs7Ozs7OztJQUVLLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkOzs7Ozs7UUFHQyxJQUFJLENBQUMsSUFBYztRQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6Ryx1QkFBTSxPQUFPLEdBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUTt1QkFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLGNBQWM7dUJBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDbkIsT0FBTyxFQUNQLE9BQU8sQ0FDUixDQUFDO29CQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO29CQUVsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFFcEQ7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbkUsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7b0JBQzdELE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO29CQUVsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFDcEQ7YUFDRjtTQUNGOzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsUUFBUTthQUNuQjs7OztZQU5RLDRCQUE0Qjs7O3NCQVVsQyxLQUFLOzRCQUNMLE1BQU07eUJBT04sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkF5QmhDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW25vZGVdYFxufSlcblxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgX25vZGU6IE5vZGVCYXNlO1xuICBAT3V0cHV0KCkgX25vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblxuICBoaXN0b3JpY2FsRGlzcGxheTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaGlzdG9yaWNhbEZpZWxkSGVscGVyOiBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHNldFZhbHVlKGUpIHtcblxuICAgIGlmIChlLnRhcmdldC5uYW1lID09PSAnaGlzdG9yeVZhbHVlJykge1xuXG4gICAgICBpZiAodGhpcy5fbm9kZSAmJiAoIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdwYWdlJylcbiAgICAgICAgfHwgIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdzZWN0aW9uJykpKSB7XG5cbiAgICAgICAgdGhpcy5fbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbFZhbHVlJ10gPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWU7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX25vZGVDaGFuZ2UuZW1pdCh0aGlzLl9ub2RlKTtcblxuICAgICAgfVxuXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY29tcGFyZVN0cmluZyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub2RlKG5vZGU6IE5vZGVCYXNlKSB7XG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgICBpZiAodGhpcy5fbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgIV8uaXNVbmRlZmluZWQodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlKSkge1xuICAgICAgICBjb25zdCBkaXNwbGF5OiBhbnkgPSB7IHRleHQ6ICcnLCBfZGF0ZTogJycgfTtcbiAgICAgICAgaWYgKCh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWxlY3QnXG4gICAgICAgICAgfHwgdGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnbXVsdGktc2VsZWN0J1xuICAgICAgICAgIHx8IHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NpbmdsZS1zZWxlY3QnKSkge1xuXG4gICAgICAgICAgZGlzcGxheS50ZXh0ID0gdGhpcy5oaXN0b3JpY2FsRmllbGRIZWxwZXIuZ2V0RGlzcGxheVRleHRGcm9tT3B0aW9ucyhcbiAgICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb24sXG4gICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgJ2xhYmVsJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZGlzcGxheS5fZGF0ZSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZURhdGU7XG5cbiAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsRGlzcGxheSddID0gZGlzcGxheTtcblxuICAgICAgICB9IGVsc2UgaWYgKCFfLmlzVW5kZWZpbmVkKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZSkpIHtcblxuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZTtcbiAgICAgICAgICBkaXNwbGF5Ll9kYXRlID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlRGF0ZTtcblxuICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxEaXNwbGF5J10gPSBkaXNwbGF5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==