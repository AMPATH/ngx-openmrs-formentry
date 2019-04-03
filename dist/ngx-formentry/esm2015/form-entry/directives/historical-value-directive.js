/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @private
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
                /** @type {?} */
                const display = { text: '', _date: '' };
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
HistoricalValueDirective.ctorParameters = () => [
    { type: HistoricalFieldHelperService }
];
HistoricalValueDirective.propDecorators = {
    _node: [{ type: Input }],
    _nodeChange: [{ type: Output }],
    setValue: [{ type: HostListener, args: ['click', ['$event'],] }],
    node: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU1yRCxNQUFNOzs7O0lBT0osWUFBb0IscUJBQW1EO1FBQW5ELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBOEI7UUFKN0QsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBS25ELENBQUM7Ozs7O0lBR0QsUUFBUSxDQUFDLENBQUM7UUFFUixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBRXJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzttQkFDNUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1C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bnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2hlbHBlcnMvaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBgW25vZGVdYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgpIF9ub2RlOiBOb2RlQmFzZTtcclxuICBAT3V0cHV0KCkgX25vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcclxuXHJcbiAgaGlzdG9yaWNhbERpc3BsYXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoaXN0b3JpY2FsRmllbGRIZWxwZXI6IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UpIHtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBzZXRWYWx1ZShlKSB7XHJcblxyXG4gICAgaWYgKGUudGFyZ2V0Lm5hbWUgPT09ICdoaXN0b3J5VmFsdWUnKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5fbm9kZSAmJiAoIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdwYWdlJylcclxuICAgICAgICB8fCAhdGhpcy5jb21wYXJlU3RyaW5nKHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSwgJ3NlY3Rpb24nKSkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxWYWx1ZSddID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fbm9kZUNoYW5nZS5lbWl0KHRoaXMuX25vZGUpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBjb21wYXJlU3RyaW5nKGEsIGIpIHtcclxuICAgIGlmIChhID09PSBiKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBub2RlKG5vZGU6IE5vZGVCYXNlKSB7XHJcblxyXG4gICAgaWYgKG5vZGUpIHtcclxuICAgICAgdGhpcy5fbm9kZSA9IG5vZGU7XHJcbiAgICAgIGlmICh0aGlzLl9ub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiAhXy5pc1VuZGVmaW5lZCh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUpKSB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheTogYW55ID0geyB0ZXh0OiAnJywgX2RhdGU6ICcnIH07XHJcbiAgICAgICAgaWYgKCh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWxlY3QnXHJcbiAgICAgICAgICB8fCB0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdtdWx0aS1zZWxlY3QnXHJcbiAgICAgICAgICB8fCB0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzaW5nbGUtc2VsZWN0JykpIHtcclxuXHJcbiAgICAgICAgICBkaXNwbGF5LnRleHQgPSB0aGlzLmhpc3RvcmljYWxGaWVsZEhlbHBlci5nZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKFxyXG4gICAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLFxyXG4gICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAnbGFiZWwnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgZGlzcGxheS5fZGF0ZSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZURhdGU7XHJcblxyXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbERpc3BsYXknXSA9IGRpc3BsYXk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIV8uaXNVbmRlZmluZWQodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlKSkge1xyXG5cclxuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZTtcclxuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xyXG5cclxuICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxEaXNwbGF5J10gPSBkaXNwbGF5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19