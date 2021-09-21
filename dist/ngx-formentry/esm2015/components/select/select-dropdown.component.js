import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { STYLE } from './select-dropdown.component.style';
import { OptionList } from './option-list';
export class SelectDropdownComponent {
    constructor() {
        this.close = new EventEmitter();
        this.optionClicked = new EventEmitter();
        this.singleFilterClick = new EventEmitter();
        this.singleFilterInput = new EventEmitter();
        this.singleFilterKeydown = new EventEmitter();
        this.disabledColor = '#fff';
        this.disabledTextColor = '9e9e9e';
    }
    /** Event handlers. **/
    // Angular life cycle hooks.
    ngOnInit() {
        this.optionsReset();
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }
    ngAfterViewInit() {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    }
    // Filter input (single select).
    onSingleFilterClick(event) {
        this.singleFilterClick.emit(null);
    }
    onSingleFilterInput(event) {
        this.singleFilterInput.emit(event.target.value);
    }
    onSingleFilterKeydown(event) {
        this.singleFilterKeydown.emit(event);
    }
    // Options list.
    onOptionsWheel(event) {
        this.handleOptionsWheel(event);
    }
    onOptionMouseover(option) {
        this.optionList.highlightOption(option);
    }
    onOptionClick(option) {
        this.optionClicked.emit(option);
    }
    /** Initialization. **/
    optionsReset() {
        this.optionList.resetFilter();
        this.optionList.highlight();
    }
    /** View. **/
    getOptionStyle(option) {
        if (option.highlighted) {
            return {
                'background-color': this.highlightColor,
                color: this.highlightTextColor
            };
        }
        else {
            return {};
        }
    }
    clearFilterInput() {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    }
    moveHighlightedIntoView() {
        const list = this.optionsList.nativeElement;
        const listHeight = list.offsetHeight;
        const itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            const item = list.children[0].children[itemIndex];
            const itemHeight = item.offsetHeight;
            const itemTop = itemIndex * itemHeight;
            const itemBottom = itemTop + itemHeight;
            const viewTop = list.scrollTop;
            const viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    }
    handleOptionsWheel(e) {
        const div = this.optionsList.nativeElement;
        const atTop = div.scrollTop === 0;
        const atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    }
}
SelectDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-dropdown',
                template: `<div [ngStyle]="{ 'top.px': top, 'left.px': left, 'width.px': width }">
  <div class="filter" *ngIf="!multiple">
    <input
      *ngIf="filterEnabled"
      #filterInput
      (click)="onSingleFilterClick($event)"
      (input)="onSingleFilterInput($event)"
      (keydown)="onSingleFilterKeydown($event)"
    />
  </div>

  <div class="options" #optionsList>
    <ul (wheel)="onOptionsWheel($event)">
      <li
        *ngFor="let option of optionList.filtered"
        [ngClass]="{
          highlighted: option.highlighted,
          selected: option.selected,
          disabled: option.disabled
        }"
        [ngStyle]="getOptionStyle(option)"
        (click)="onOptionClick(option)"
        (mouseover)="onOptionMouseover(option)"
      >
        {{ option.label }}
      </li>
      <li *ngIf="!optionList.hasShown()" class="message">
        {{ notFoundMsg }}
      </li>
    </ul>
  </div>
</div>
`,
                styles: [STYLE],
                encapsulation: ViewEncapsulation.None
            },] },
];
SelectDropdownComponent.propDecorators = {
    filterEnabled: [{ type: Input }],
    highlightColor: [{ type: Input }],
    highlightTextColor: [{ type: Input }],
    left: [{ type: Input }],
    multiple: [{ type: Input }],
    notFoundMsg: [{ type: Input }],
    optionList: [{ type: Input }],
    top: [{ type: Input }],
    width: [{ type: Input }],
    close: [{ type: Output }],
    optionClicked: [{ type: Output }],
    singleFilterClick: [{ type: Output }],
    singleFilterInput: [{ type: Output }],
    singleFilterKeydown: [{ type: Output }],
    filterInput: [{ type: ViewChild, args: ['filterInput',] }],
    optionsList: [{ type: ViewChild, args: ['optionsList',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUUxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBd0MzQyxNQUFNO0lBdENOO1FBa0RZLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMzQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzdDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUt4RCxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFnSC9CLENBQUM7SUE5R0MsdUJBQXVCO0lBRXZCLDRCQUE0QjtJQUU1QixRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsRUFBRSxDQUFD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QUFTLFNBQUMsYUFBYTswQkFDdkIsU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50LnN0eWxlJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VsZWN0LWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ1N0eWxlXT1cInsgJ3RvcC5weCc6IHRvcCwgJ2xlZnQucHgnOiBsZWZ0LCAnd2lkdGgucHgnOiB3aWR0aCB9XCI+XG4gIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIiAqbmdJZj1cIiFtdWx0aXBsZVwiPlxuICAgIDxpbnB1dFxuICAgICAgKm5nSWY9XCJmaWx0ZXJFbmFibGVkXCJcbiAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgKGNsaWNrKT1cIm9uU2luZ2xlRmlsdGVyQ2xpY2soJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwib25TaW5nbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duKT1cIm9uU2luZ2xlRmlsdGVyS2V5ZG93bigkZXZlbnQpXCJcbiAgICAvPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiICNvcHRpb25zTGlzdD5cbiAgICA8dWwgKHdoZWVsKT1cIm9uT3B0aW9uc1doZWVsKCRldmVudClcIj5cbiAgICAgIDxsaVxuICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbkxpc3QuZmlsdGVyZWRcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgaGlnaGxpZ2h0ZWQ6IG9wdGlvbi5oaWdobGlnaHRlZCxcbiAgICAgICAgICBzZWxlY3RlZDogb3B0aW9uLnNlbGVjdGVkLFxuICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24uZGlzYWJsZWRcbiAgICAgICAgfVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldE9wdGlvblN0eWxlKG9wdGlvbilcIlxuICAgICAgICAoY2xpY2spPVwib25PcHRpb25DbGljayhvcHRpb24pXCJcbiAgICAgICAgKG1vdXNlb3Zlcik9XCJvbk9wdGlvbk1vdXNlb3ZlcihvcHRpb24pXCJcbiAgICAgID5cbiAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICA8L2xpPlxuICAgICAgPGxpICpuZ0lmPVwiIW9wdGlvbkxpc3QuaGFzU2hvd24oKVwiIGNsYXNzPVwibWVzc2FnZVwiPlxuICAgICAgICB7eyBub3RGb3VuZE1zZyB9fVxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbU1RZTEVdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdERyb3Bkb3duQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBmaWx0ZXJFbmFibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBoaWdobGlnaHRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBoaWdobGlnaHRUZXh0Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgbGVmdDogbnVtYmVyO1xuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgbm90Rm91bmRNc2c6IHN0cmluZztcbiAgQElucHV0KCkgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcbiAgQElucHV0KCkgdG9wOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb3B0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uPigpO1xuICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyS2V5ZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0JykgZmlsdGVySW5wdXQ6IGFueTtcbiAgQFZpZXdDaGlsZCgnb3B0aW9uc0xpc3QnKSBvcHRpb25zTGlzdDogYW55O1xuXG4gIGRpc2FibGVkQ29sb3IgPSAnI2ZmZic7XG4gIGRpc2FibGVkVGV4dENvbG9yID0gJzllOWU5ZSc7XG5cbiAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cblxuICAvLyBBbmd1bGFyIGxpZmUgY3ljbGUgaG9va3MuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zUmVzZXQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvcHRpb25MaXN0JykpIHtcbiAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcbiAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBGaWx0ZXIgaW5wdXQgKHNpbmdsZSBzZWxlY3QpLlxuXG4gIG9uU2luZ2xlRmlsdGVyQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuc2luZ2xlRmlsdGVyQ2xpY2suZW1pdChudWxsKTtcbiAgfVxuXG4gIG9uU2luZ2xlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuc2luZ2xlRmlsdGVySW5wdXQuZW1pdChldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgb25TaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNpbmdsZUZpbHRlcktleWRvd24uZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBPcHRpb25zIGxpc3QuXG5cbiAgb25PcHRpb25zV2hlZWwoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaGFuZGxlT3B0aW9uc1doZWVsKGV2ZW50KTtcbiAgfVxuXG4gIG9uT3B0aW9uTW91c2VvdmVyKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgb25PcHRpb25DbGljayhvcHRpb246IE9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uQ2xpY2tlZC5lbWl0KG9wdGlvbik7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xuXG4gIHByaXZhdGUgb3B0aW9uc1Jlc2V0KCkge1xuICAgIHRoaXMub3B0aW9uTGlzdC5yZXNldEZpbHRlcigpO1xuICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHQoKTtcbiAgfVxuXG4gIC8qKiBWaWV3LiAqKi9cblxuICBnZXRPcHRpb25TdHlsZShvcHRpb246IE9wdGlvbik6IGFueSB7XG4gICAgaWYgKG9wdGlvbi5oaWdobGlnaHRlZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICBjb2xvcjogdGhpcy5oaWdobGlnaHRUZXh0Q29sb3JcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH1cblxuICBjbGVhckZpbHRlcklucHV0KCkge1xuICAgIGlmICh0aGlzLmZpbHRlckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVIaWdobGlnaHRlZEludG9WaWV3KCkge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgbGlzdEhlaWdodCA9IGxpc3Qub2Zmc2V0SGVpZ2h0O1xuXG4gICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5vcHRpb25MaXN0LmdldEhpZ2hsaWdodGVkSW5kZXgoKTtcblxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5baXRlbUluZGV4XTtcbiAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtLm9mZnNldEhlaWdodDtcblxuICAgICAgY29uc3QgaXRlbVRvcCA9IGl0ZW1JbmRleCAqIGl0ZW1IZWlnaHQ7XG4gICAgICBjb25zdCBpdGVtQm90dG9tID0gaXRlbVRvcCArIGl0ZW1IZWlnaHQ7XG5cbiAgICAgIGNvbnN0IHZpZXdUb3AgPSBsaXN0LnNjcm9sbFRvcDtcbiAgICAgIGNvbnN0IHZpZXdCb3R0b20gPSB2aWV3VG9wICsgbGlzdEhlaWdodDtcblxuICAgICAgaWYgKGl0ZW1Cb3R0b20gPiB2aWV3Qm90dG9tKSB7XG4gICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbUJvdHRvbSAtIGxpc3RIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPCB2aWV3VG9wKSB7XG4gICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbVRvcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU9wdGlvbnNXaGVlbChlOiBhbnkpIHtcbiAgICBjb25zdCBkaXYgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgYXRUb3AgPSBkaXYuc2Nyb2xsVG9wID09PSAwO1xuICAgIGNvbnN0IGF0Qm90dG9tID0gZGl2Lm9mZnNldEhlaWdodCArIGRpdi5zY3JvbGxUb3AgPT09IGRpdi5zY3JvbGxIZWlnaHQ7XG5cbiAgICBpZiAoYXRUb3AgJiYgZS5kZWx0YVkgPCAwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChhdEJvdHRvbSAmJiBlLmRlbHRhWSA+IDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==