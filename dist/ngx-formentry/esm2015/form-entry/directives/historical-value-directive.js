import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';
export class HistoricalValueDirective {
    constructor(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    setValue(e) {
        if (e.target.name === 'historyValue') {
            if (this._node &&
                (!this.compareString(this._node.question.renderingType, 'page') ||
                    !this.compareString(this._node.question.renderingType, 'section'))) {
                this._node.control.setValue(this._node.question.historicalDataValue.value);
                this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                e.stopPropagation();
                this._nodeChange.emit(this._node);
            }
        }
    }
    compareString(a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    }
    set node(node) {
        if (node) {
            this._node = node;
            if (this._node.question.enableHistoricalValue &&
                !_.isUndefined(this._node.question.historicalDataValue)) {
                const display = { text: '', _date: '' };
                if (this._node.question.renderingType === 'select' ||
                    this._node.question.renderingType === 'multi-select' ||
                    this._node.question.renderingType === 'single-select') {
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
    { type: HistoricalFieldHelperService }
];
HistoricalValueDirective.propDecorators = {
    _node: [{ type: Input }],
    _nodeChange: [{ type: Output }],
    setValue: [{ type: HostListener, args: ['click', ['$event'],] }],
    node: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZGlyZWN0aXZlcy9oaXN0b3JpY2FsLXZhbHVlLWRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTTtJQU1KLFlBQW9CLHFCQUFtRDtRQUFuRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQThCO1FBSjdELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl1QixDQUFDO0lBRzNFLFFBQVEsQ0FBQyxDQUFDO1FBQ1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FDRCxJQUFJLENBQUMsS0FBSztnQkFDVixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO29CQUM3RCxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUNyRSxDQUFDLENBQUMsQ0FBQztnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxD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ICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2hlbHBlcnMvaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOb2RlQmFzZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBbbm9kZV1gXG59KVxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIF9ub2RlOiBOb2RlQmFzZTtcbiAgQE91dHB1dCgpIF9ub2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgaGlzdG9yaWNhbERpc3BsYXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhpc3RvcmljYWxGaWVsZEhlbHBlcjogSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHNldFZhbHVlKGUpIHtcbiAgICBpZiAoZS50YXJnZXQubmFtZSA9PT0gJ2hpc3RvcnlWYWx1ZScpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fbm9kZSAmJlxuICAgICAgICAoIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdwYWdlJykgfHxcbiAgICAgICAgICAhdGhpcy5jb21wYXJlU3RyaW5nKHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSwgJ3NlY3Rpb24nKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9ub2RlLmNvbnRyb2wuc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvbltcbiAgICAgICAgICAnaGlzdG9yaWNhbFZhbHVlJ1xuICAgICAgICBdID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLl9ub2RlQ2hhbmdlLmVtaXQodGhpcy5fbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHByaXZhdGUgY29tcGFyZVN0cmluZyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub2RlKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJlxuICAgICAgICAhXy5pc1VuZGVmaW5lZCh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZGlzcGxheTogYW55ID0geyB0ZXh0OiAnJywgX2RhdGU6ICcnIH07XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWxlY3QnIHx8XG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnbXVsdGktc2VsZWN0JyB8fFxuICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NpbmdsZS1zZWxlY3QnXG4gICAgICAgICkge1xuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuaGlzdG9yaWNhbEZpZWxkSGVscGVyLmdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMoXG4gICAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdsYWJlbCdcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xuXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbERpc3BsYXknXSA9IGRpc3BsYXk7XG4gICAgICAgIH0gZWxzZSBpZiAoIV8uaXNVbmRlZmluZWQodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlKSkge1xuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZTtcbiAgICAgICAgICBkaXNwbGF5Ll9kYXRlID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlRGF0ZTtcblxuICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxEaXNwbGF5J10gPSBkaXNwbGF5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=