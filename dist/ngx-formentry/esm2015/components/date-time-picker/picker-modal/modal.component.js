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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCxTQUFTLEVBQUUsTUFBTSxFQUFVLFlBQVksRUFDdkMsdUJBQXVCLEVBQzFCLE1BQU0sZUFBZSxDQUFDOzs7O0FBdUJ2QixNQUFNO0lBSUY7UUFGVSxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFHdkQsQ0FBQzs7OztJQUVELFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7O0NBTWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsbVRBQW1ULENBQUM7Z0JBQzdULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsRUFDWDthQUNKOzs7OzZCQUlJLE1BQU07Ozs7SUFBUCx3Q0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1vZGFsLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPdXRwdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vbW9kYWwuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGlja2VyLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwieC1tb2RhbFwiPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwibW9kYWwtb3ZlcmxheVwiIChjbGljayk9XCJjbG9zZU1vZGFsKClcIj48L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1tYWluXCIgaWQ9XCJzZWN0aW9uLW1vZGFsLW1haW5cIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbjwvc2VjdGlvbj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e3otaW5kZXg6OTk5OTk5OTk5OX0qLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5tb2RhbC1tYWlue3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MTkuNiU7cmlnaHQ6YXV0bzt0b3A6YXV0bzt6LWluZGV4OjExMTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZDdkYWQ3O2JvcmRlci1yYWRpdXM6NnB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKTtib3gtc2hhZG93OjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuMyl9YF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW1xuICAgIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlDbGljay5lbWl0KGZhbHNlKTtcbiAgICB9XG59XG4iXX0=