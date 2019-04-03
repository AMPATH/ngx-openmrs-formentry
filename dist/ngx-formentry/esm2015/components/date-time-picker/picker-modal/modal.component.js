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
export class ModalComponent {
    constructor() {
        this.onOverlayClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    closeModal() {
        this.onOverlayClick.emit(false);
    }
}
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'picker-modal',
                template: `<section class="x-modal">
    <section class="modal-overlay" (click)="closeModal()"></section>
    <section class="modal-main" id="section-modal-main">
        <ng-content></ng-content>
    </section>
</section>
`,
                styles: [`:host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}`],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [],
            },] },
];
ModalComponent.ctorParameters = () => [];
ModalComponent.propDecorators = {
    onOverlayClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ModalComponent.prototype.onOverlayClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCxTQUFTLEVBQUUsTUFBTSxFQUFVLFlBQVksRUFDdkMsdUJBQXVCLEVBQzFCLE1BQU0sZUFBZSxDQUFDOzs7O0FBdUJ2QixNQUFNO0lBSUY7UUFGVSxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFHdkQsQ0FBQzs7OztJQUVELFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7O0NBTWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsbVRBQW1ULENBQUM7Z0JBQzdULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsRUFDWDthQUNKOzs7OzZCQUlJLE1BQU07Ozs7SUFBUCx3Q0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogbW9kYWwuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCwgT3V0cHV0LCBPbkluaXQsIEV2ZW50RW1pdHRlcixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vLyB3ZWJwYWNrMV9cclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG4vLyBjb25zdCBteURwU3R5bGVzOiBzdHJpbmcgPSByZXF1aXJlKCcuL21vZGFsLmNvbXBvbmVudC5jc3MnKTtcclxuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcpO1xyXG4vLyB3ZWJwYWNrMl9cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwaWNrZXItbW9kYWwnLFxyXG4gICAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cIngtbW9kYWxcIj5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwibW9kYWwtb3ZlcmxheVwiIChjbGljayk9XCJjbG9zZU1vZGFsKClcIj48L3NlY3Rpb24+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLW1haW5cIiBpZD1cInNlY3Rpb24tbW9kYWwtbWFpblwiPlxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvc2VjdGlvbj5cclxuPC9zZWN0aW9uPlxyXG5gLFxyXG4gICAgc3R5bGVzOiBbYDpob3N0e3otaW5kZXg6OTk5OTk5OTk5OX0qLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5tb2RhbC1tYWlue3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MTkuNiU7cmlnaHQ6YXV0bzt0b3A6YXV0bzt6LWluZGV4OjExMTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZDdkYWQ3O2JvcmRlci1yYWRpdXM6NnB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKTtib3gtc2hhZG93OjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuMyl9YF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgIF0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbk92ZXJsYXlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIHRoaXMub25PdmVybGF5Q2xpY2suZW1pdChmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuIl19