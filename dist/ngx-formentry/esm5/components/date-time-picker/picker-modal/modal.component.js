/**
 * modal.component
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
// const myDpStyles: string = require('./modal.component.css');
// const myDpTpl: string = require('./modal.component.html');
// webpack2_
var ModalComponent = /** @class */ (function () {
    function ModalComponent() {
        this.onOverlayClick = new EventEmitter();
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.closeModal = function () {
        this.onOverlayClick.emit(false);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ModalComponent.prototype, "onOverlayClick", void 0);
    ModalComponent = tslib_1.__decorate([
        Component({
            selector: 'picker-modal',
            template: "<section class=\"x-modal\">\n    <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n    <section class=\"modal-main\" id=\"section-modal-main\">\n        <ng-content></ng-content>\n    </section>\n</section>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [],
            styles: [":host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ModalComponent);
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlja2VyLW1vZGFsL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFFSCxPQUFPLEVBQ0gsU0FBUyxFQUFFLE1BQU0sRUFBVSxZQUFZLEVBQ3ZDLHVCQUF1QixFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUl2QiwrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELFlBQVk7QUFXWjtJQUlJO1FBRlUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBR3ZELENBQUM7SUFFRCxpQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELG1DQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBVlM7UUFBVCxNQUFNLEVBQUU7OzBEQUE4QztJQUY5QyxjQUFjO1FBVDFCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLGdQQUFxQztZQUVyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxVQUFVLEVBQUUsRUFDWDs7U0FDSixDQUFDOztPQUVXLGNBQWMsQ0FhMUI7SUFBRCxxQkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1vZGFsLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPdXRwdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vbW9kYWwuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGlja2VyLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21vZGFsLmNvbXBvbmVudC5jc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAT3V0cHV0KCkgb25PdmVybGF5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBjbG9zZU1vZGFsKCkge1xuICAgICAgICB0aGlzLm9uT3ZlcmxheUNsaWNrLmVtaXQoZmFsc2UpO1xuICAgIH1cbn1cbiJdfQ==