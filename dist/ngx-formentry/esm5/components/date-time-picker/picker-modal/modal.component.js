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
    ModalComponent.prototype.ngOnInit = function () { };
    ModalComponent.prototype.closeModal = function () {
        this.onOverlayClick.emit(false);
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'picker-modal',
                    template: "<section class=\"x-modal\">\n  <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n  <section class=\"modal-main\" id=\"section-modal-main\">\n    <ng-content></ng-content>\n  </section>\n</section>\n",
                    styles: [":host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: []
                },] },
    ];
    ModalComponent.ctorParameters = function () { return []; };
    ModalComponent.propDecorators = {
        onOverlayClick: [{ type: Output }]
    };
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFFTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLCtEQUErRDtBQUMvRCw2REFBNkQ7QUFDN0QsWUFBWTtBQUVaO0lBZ0JFO1FBRlUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRXhDLENBQUM7SUFFaEIsaUNBQVEsR0FBUixjQUFZLENBQUM7SUFFYixtQ0FBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLDROQU1YO29CQUNDLE1BQU0sRUFBRSxDQUFDLG1UQUFtVCxDQUFDO29CQUM3VCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Ozs7aUNBRUUsTUFBTTs7SUFTVCxxQkFBQztDQUFBLEFBdkJELElBdUJDO1NBVlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9kYWwuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gd2VicGFjazFfXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XG4vLyBjb25zdCBteURwU3R5bGVzOiBzdHJpbmcgPSByZXF1aXJlKCcuL21vZGFsLmNvbXBvbmVudC5jc3MnKTtcbi8vIGNvbnN0IG15RHBUcGw6IHN0cmluZyA9IHJlcXVpcmUoJy4vbW9kYWwuY29tcG9uZW50Lmh0bWwnKTtcbi8vIHdlYnBhY2syX1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwaWNrZXItbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwieC1tb2RhbFwiPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLW92ZXJsYXlcIiAoY2xpY2spPVwiY2xvc2VNb2RhbCgpXCI+PC9zZWN0aW9uPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLW1haW5cIiBpZD1cInNlY3Rpb24tbW9kYWwtbWFpblwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9zZWN0aW9uPlxuPC9zZWN0aW9uPlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e3otaW5kZXg6OTk5OTk5OTk5OX0qLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5tb2RhbC1tYWlue3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MTkuNiU7cmlnaHQ6YXV0bzt0b3A6YXV0bzt6LWluZGV4OjExMTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZDdkYWQ3O2JvcmRlci1yYWRpdXM6NnB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKTtib3gtc2hhZG93OjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuMyl9YF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBvbk92ZXJsYXlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5vbk92ZXJsYXlDbGljay5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIl19