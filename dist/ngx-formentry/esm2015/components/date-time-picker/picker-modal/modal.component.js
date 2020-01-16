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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlja2VyLW1vZGFsL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFFSCxPQUFPLEVBQ0gsU0FBUyxFQUFFLE1BQU0sRUFBVSxZQUFZLEVBQ3ZDLHVCQUF1QixFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUl2QiwrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELFlBQVk7QUFXWixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBSXZCO1FBRlUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBR3ZELENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0osQ0FBQTtBQVhhO0lBQVQsTUFBTSxFQUFFOztzREFBOEM7QUFGOUMsY0FBYztJQVQxQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUN4QixnUEFBcUM7UUFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsVUFBVSxFQUFFLEVBQ1g7O0tBQ0osQ0FBQzs7R0FFVyxjQUFjLENBYTFCO1NBYlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9kYWwuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE91dHB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIHdlYnBhY2sxX1xuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuY3NzJyk7XG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL21vZGFsLmNvbXBvbmVudC5odG1sJyk7XG4vLyB3ZWJwYWNrMl9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwaWNrZXItbW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICBdLFxufSlcblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBPdXRwdXQoKSBvbk92ZXJsYXlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMub25PdmVybGF5Q2xpY2suZW1pdChmYWxzZSk7XG4gICAgfVxufVxuIl19