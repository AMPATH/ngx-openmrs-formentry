/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * modal.component
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
// const myDpStyles: string = require('./modal.component.css');
// const myDpTpl: string = require('./modal.component.html');
// webpack2_
var ModalComponent = /** @class */ (function () {
    function ModalComponent() {
        this.onOverlayClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype.closeModal = /**
     * @return {?}
     */
    function () {
        this.onOverlayClick.emit(false);
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'picker-modal',
                    template: "<section class=\"x-modal\">\n    <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n    <section class=\"modal-main\" id=\"section-modal-main\">\n        <ng-content></ng-content>\n    </section>\n</section>\n",
                    styles: [":host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [],
                },] },
    ];
    ModalComponent.ctorParameters = function () { return []; };
    ModalComponent.propDecorators = {
        onOverlayClick: [{ type: Output }]
    };
    return ModalComponent;
}());
export { ModalComponent };
if (false) {
    /** @type {?} */
    ModalComponent.prototype.onOverlayClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCxTQUFTLEVBQUUsTUFBTSxFQUFVLFlBQVksRUFDdkMsdUJBQXVCLEVBQzFCLE1BQU0sZUFBZSxDQUFDOzs7O0FBUXZCO0lBbUJJO1FBRlUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBR3ZELENBQUM7Ozs7SUFFRCxpQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQsbUNBQVU7OztJQUFWO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Z0JBM0JKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLHNPQU1iO29CQUNHLE1BQU0sRUFBRSxDQUFDLG1UQUFtVCxDQUFDO29CQUM3VCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFLEVBQ1g7aUJBQ0o7Ozs7aUNBSUksTUFBTTs7SUFXWCxxQkFBQztDQUFBLEFBNUJELElBNEJDO1NBYlksY0FBYzs7O0lBRXZCLHdDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBtb2RhbC5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBPdXRwdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIHdlYnBhY2sxX1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vbW9kYWwuY29tcG9uZW50LmNzcycpO1xyXG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL21vZGFsLmNvbXBvbmVudC5odG1sJyk7XHJcbi8vIHdlYnBhY2syX1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3BpY2tlci1tb2RhbCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwieC1tb2RhbFwiPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1vdmVybGF5XCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiPjwvc2VjdGlvbj5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwibW9kYWwtbWFpblwiIGlkPVwic2VjdGlvbi1tb2RhbC1tYWluXCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9zZWN0aW9uPlxyXG48L3NlY3Rpb24+XHJcbmAsXHJcbiAgICBzdHlsZXM6IFtgOmhvc3R7ei1pbmRleDo5OTk5OTk5OTk5fSosOjphZnRlciw6OmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1vZGFsLW1haW57cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxOS42JTtyaWdodDphdXRvO3RvcDphdXRvO3otaW5kZXg6MTExO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNkN2RhZDc7Ym9yZGVyLXJhZGl1czo2cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO2JveC1zaGFkb3c6MCA1cHggMTVweCByZ2JhKDAsMCwwLC4zKX1gXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlDbGljay5lbWl0KGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=