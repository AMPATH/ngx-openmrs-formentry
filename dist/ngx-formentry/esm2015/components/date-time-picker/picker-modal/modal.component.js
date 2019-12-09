/**
 * modal.component
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
// const myDpStyles: string = require('./modal.component.css');
// const myDpTpl: string = require('./modal.component.html');
// webpack2_
let ModalComponent = class ModalComponent {
    constructor() {
        this.onOverlayClick = new EventEmitter();
    }
    ngOnInit() {
    }
    closeModal() {
        this.onOverlayClick.emit(false);
    }
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
export { ModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsT0FBTyxFQUNILFNBQVMsRUFBRSxNQUFNLEVBQVUsWUFBWSxFQUN2Qyx1QkFBdUIsRUFDMUIsTUFBTSxlQUFlLENBQUM7QUFJdkIsK0RBQStEO0FBQy9ELDZEQUE2RDtBQUM3RCxZQUFZO0FBV1osSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUl2QjtRQUZVLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUd2RCxDQUFDO0lBRUQsUUFBUTtJQUNSLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNKLENBQUE7QUFYYTtJQUFULE1BQU0sRUFBRTs7c0RBQThDO0FBRjlDLGNBQWM7SUFUMUIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsZ1BBQXFDO1FBRXJDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFVBQVUsRUFBRSxFQUNYOztLQUNKLENBQUM7O0dBRVcsY0FBYyxDQWExQjtTQWJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1vZGFsLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPdXRwdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vbW9kYWwuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGlja2VyLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21vZGFsLmNvbXBvbmVudC5jc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAT3V0cHV0KCkgb25PdmVybGF5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBjbG9zZU1vZGFsKCkge1xuICAgICAgICB0aGlzLm9uT3ZlcmxheUNsaWNrLmVtaXQoZmFsc2UpO1xuICAgIH1cbn1cbiJdfQ==