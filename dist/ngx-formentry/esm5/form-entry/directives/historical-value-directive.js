import * as tslib_1 from "tslib";
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';
var HistoricalValueDirective = /** @class */ (function () {
    function HistoricalValueDirective(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    HistoricalValueDirective.prototype.setValue = function (e) {
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
    HistoricalValueDirective.prototype.compareString = function (a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(HistoricalValueDirective.prototype, "node", {
        set: function (node) {
            if (node) {
                this._node = node;
                if (this._node.question.enableHistoricalValue && !_.isUndefined(this._node.question.historicalDataValue)) {
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
    HistoricalValueDirective.ctorParameters = function () { return [
        { type: HistoricalFieldHelperService }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", NodeBase)
    ], HistoricalValueDirective.prototype, "_node", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], HistoricalValueDirective.prototype, "_nodeChange", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], HistoricalValueDirective.prototype, "setValue", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", NodeBase),
        tslib_1.__metadata("design:paramtypes", [NodeBase])
    ], HistoricalValueDirective.prototype, "node", null);
    HistoricalValueDirective = tslib_1.__decorate([
        Directive({
            selector: "[node]"
        }),
        tslib_1.__metadata("design:paramtypes", [HistoricalFieldHelperService])
    ], HistoricalValueDirective);
    return HistoricalValueDirective;
}());
export { HistoricalValueDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZGlyZWN0aXZlcy9oaXN0b3JpY2FsLXZhbHVlLWRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTXJEO0lBT0Usa0NBQW9CLHFCQUFtRDtRQUFuRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQThCO1FBSjdELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUtuRCxDQUFDO0lBR0QsMkNBQVEsR0FBUixVQUFTLENBQUM7UUFFUixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUVwQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzttQkFDNUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO2dCQUV2RSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTNFLElB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cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2hlbHBlcnMvaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOb2RlQmFzZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBbbm9kZV1gXG59KVxuXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBfbm9kZTogTm9kZUJhc2U7XG4gIEBPdXRwdXQoKSBfbm9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8T2JqZWN0PigpO1xuXG4gIGhpc3RvcmljYWxEaXNwbGF5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoaXN0b3JpY2FsRmllbGRIZWxwZXI6IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UpIHtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgc2V0VmFsdWUoZSkge1xuXG4gICAgaWYgKGUudGFyZ2V0Lm5hbWUgPT09ICdoaXN0b3J5VmFsdWUnKSB7XG5cbiAgICAgIGlmICh0aGlzLl9ub2RlICYmICghdGhpcy5jb21wYXJlU3RyaW5nKHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSwgJ3BhZ2UnKVxuICAgICAgICB8fCAhdGhpcy5jb21wYXJlU3RyaW5nKHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSwgJ3NlY3Rpb24nKSkpIHtcblxuICAgICAgICB0aGlzLl9ub2RlLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlKTtcblxuICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsVmFsdWUnXSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5fbm9kZUNoYW5nZS5lbWl0KHRoaXMuX25vZGUpO1xuXG4gICAgICB9XG5cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjb21wYXJlU3RyaW5nKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGUobm9kZTogTm9kZUJhc2UpIHtcblxuICAgIGlmIChub2RlKSB7XG4gICAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgICAgIGlmICh0aGlzLl9ub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiAhXy5pc1VuZGVmaW5lZCh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXk6IGFueSA9IHsgdGV4dDogJycsIF9kYXRlOiAnJyB9O1xuICAgICAgICBpZiAoKHRoaXMuX25vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlbGVjdCdcbiAgICAgICAgICB8fCB0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdtdWx0aS1zZWxlY3QnXG4gICAgICAgICAgfHwgdGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2luZ2xlLXNlbGVjdCcpKSB7XG5cbiAgICAgICAgICBkaXNwbGF5LnRleHQgPSB0aGlzLmhpc3RvcmljYWxGaWVsZEhlbHBlci5nZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKFxuICAgICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvbixcbiAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAnbGFiZWwnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkaXNwbGF5Ll9kYXRlID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlRGF0ZTtcblxuICAgICAgICAgIHRoaXMuX25vZGUucXVlc3Rpb25bJ2hpc3RvcmljYWxEaXNwbGF5J10gPSBkaXNwbGF5O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIV8uaXNVbmRlZmluZWQodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlKSkge1xuXG4gICAgICAgICAgZGlzcGxheS50ZXh0ID0gdGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlLnZhbHVlO1xuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xuXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbERpc3BsYXknXSA9IGRpc3BsYXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19