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
    ngOnInit() { }
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
                animations: []
            },] },
];
ModalComponent.ctorParameters = () => [];
ModalComponent.propDecorators = {
    onOverlayClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3BpY2tlci1tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFFTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLCtEQUErRDtBQUMvRCw2REFBNkQ7QUFDN0QsWUFBWTtBQWVaLE1BQU07SUFHSjtRQUZVLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUV4QyxDQUFDO0lBRWhCLFFBQVEsS0FBSSxDQUFDO0lBRWIsVUFBVTtRQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7O0NBTVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsbVRBQW1ULENBQUM7Z0JBQzdULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsRUFBRTthQUNmOzs7OzZCQUVFLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1vZGFsLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIHdlYnBhY2sxX1xuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi9tb2RhbC5jb21wb25lbnQuY3NzJyk7XG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL21vZGFsLmNvbXBvbmVudC5odG1sJyk7XG4vLyB3ZWJwYWNrMl9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGlja2VyLW1vZGFsJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cIngtbW9kYWxcIj5cbiAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1vdmVybGF5XCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiPjwvc2VjdGlvbj5cbiAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1tYWluXCIgaWQ9XCJzZWN0aW9uLW1vZGFsLW1haW5cIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc2VjdGlvbj5cbjwvc2VjdGlvbj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHt6LWluZGV4Ojk5OTk5OTk5OTl9Kiw6OmFmdGVyLDo6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubW9kYWwtbWFpbntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjE5LjYlO3JpZ2h0OmF1dG87dG9wOmF1dG87ei1pbmRleDoxMTE7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgI2Q3ZGFkNztib3JkZXItcmFkaXVzOjZweDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMCk7Ym94LXNoYWRvdzowIDVweCAxNXB4IHJnYmEoMCwwLDAsLjMpfWBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW11cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgb25PdmVybGF5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIHRoaXMub25PdmVybGF5Q2xpY2suZW1pdChmYWxzZSk7XG4gIH1cbn1cbiJdfQ==