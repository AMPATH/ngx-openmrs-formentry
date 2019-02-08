/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * Event handlers. *
     * @return {?}
     */
    // Angular life cycle hooks.
    ngOnInit() {
        this.optionsReset();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    }
    // Filter input (single select).
    /**
     * @param {?} event
     * @return {?}
     */
    onSingleFilterClick(event) {
        this.singleFilterClick.emit(null);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSingleFilterInput(event) {
        this.singleFilterInput.emit(event.target.value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSingleFilterKeydown(event) {
        this.singleFilterKeydown.emit(event);
    }
    // Options list.
    /**
     * @param {?} event
     * @return {?}
     */
    onOptionsWheel(event) {
        this.handleOptionsWheel(event);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    onOptionMouseover(option) {
        this.optionList.highlightOption(option);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    onOptionClick(option) {
        this.optionClicked.emit(option);
    }
    /**
     * Initialization. *
     * @private
     * @return {?}
     */
    optionsReset() {
        this.optionList.resetFilter();
        this.optionList.highlight();
    }
    /**
     * View. *
     * @param {?} option
     * @return {?}
     */
    getOptionStyle(option) {
        if (option.highlighted) {
            return {
                'background-color': this.highlightColor,
                'color': this.highlightTextColor
            };
        }
        else {
            return {};
        }
    }
    /**
     * @return {?}
     */
    clearFilterInput() {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    }
    /**
     * @return {?}
     */
    moveHighlightedIntoView() {
        /** @type {?} */
        const list = this.optionsList.nativeElement;
        /** @type {?} */
        const listHeight = list.offsetHeight;
        /** @type {?} */
        const itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            /** @type {?} */
            const item = list.children[0].children[itemIndex];
            /** @type {?} */
            const itemHeight = item.offsetHeight;
            /** @type {?} */
            const itemTop = itemIndex * itemHeight;
            /** @type {?} */
            const itemBottom = itemTop + itemHeight;
            /** @type {?} */
            const viewTop = list.scrollTop;
            /** @type {?} */
            const viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    handleOptionsWheel(e) {
        /** @type {?} */
        const div = this.optionsList.nativeElement;
        /** @type {?} */
        const atTop = div.scrollTop === 0;
        /** @type {?} */
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
                template: `<div
    [ngStyle]="{'top.px': top, 'left.px': left, 'width.px': width}">

    <div class="filter"
        *ngIf="!multiple">
        <input
            *ngIf="filterEnabled"
            #filterInput
            (click)="onSingleFilterClick($event)"
            (input)="onSingleFilterInput($event)"
            (keydown)="onSingleFilterKeydown($event)">
    </div>

    <div class="options"
        #optionsList>
        <ul
            (wheel)="onOptionsWheel($event)">
            <li *ngFor="let option of optionList.filtered"
                [ngClass]="{'highlighted': option.highlighted, 'selected': option.selected, 'disabled': option.disabled}"
                [ngStyle]="getOptionStyle(option)"
                (click)="onOptionClick(option)"
                (mouseover)="onOptionMouseover(option)">
                {{option.label}}
            </li>
            <li
                *ngIf="!optionList.hasShown()"
                class="message">
                {{notFoundMsg}}
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
if (false) {
    /** @type {?} */
    SelectDropdownComponent.prototype.filterEnabled;
    /** @type {?} */
    SelectDropdownComponent.prototype.highlightColor;
    /** @type {?} */
    SelectDropdownComponent.prototype.highlightTextColor;
    /** @type {?} */
    SelectDropdownComponent.prototype.left;
    /** @type {?} */
    SelectDropdownComponent.prototype.multiple;
    /** @type {?} */
    SelectDropdownComponent.prototype.notFoundMsg;
    /** @type {?} */
    SelectDropdownComponent.prototype.optionList;
    /** @type {?} */
    SelectDropdownComponent.prototype.top;
    /** @type {?} */
    SelectDropdownComponent.prototype.width;
    /** @type {?} */
    SelectDropdownComponent.prototype.close;
    /** @type {?} */
    SelectDropdownComponent.prototype.optionClicked;
    /** @type {?} */
    SelectDropdownComponent.prototype.singleFilterClick;
    /** @type {?} */
    SelectDropdownComponent.prototype.singleFilterInput;
    /** @type {?} */
    SelectDropdownComponent.prototype.singleFilterKeydown;
    /** @type {?} */
    SelectDropdownComponent.prototype.filterInput;
    /** @type {?} */
    SelectDropdownComponent.prototype.optionsList;
    /** @type {?} */
    SelectDropdownComponent.prototype.disabledColor;
    /** @type {?} */
    SelectDropdownComponent.prototype.disabledTextColor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXlDM0MsTUFBTTtJQXZDTjtRQW9EYyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNwQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM3QyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQy9DLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFLeEQsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsUUFBUSxDQUFDO0lBaUhqQyxDQUFDOzs7Ozs7SUEzR0csUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFZO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFD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LDhDQUE2Qjs7SUFDN0IsNkNBQWdDOztJQUNoQyxzQ0FBcUI7O0lBQ3JCLHdDQUF1Qjs7SUFFdkIsd0NBQThDOztJQUM5QyxnREFBcUQ7O0lBQ3JELG9EQUF1RDs7SUFDdkQsb0RBQXlEOztJQUN6RCxzREFBd0Q7O0lBRXhELDhDQUEyQzs7SUFDM0MsOENBQTJDOztJQUUzQyxnREFBdUI7O0lBQ3ZCLG9EQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU1RZTEUgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQuc3R5bGUnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzZWxlY3QtZHJvcGRvd24nLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2XG4gICAgW25nU3R5bGVdPVwieyd0b3AucHgnOiB0b3AsICdsZWZ0LnB4JzogbGVmdCwgJ3dpZHRoLnB4Jzogd2lkdGh9XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCJcbiAgICAgICAgKm5nSWY9XCIhbXVsdGlwbGVcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlckVuYWJsZWRcIlxuICAgICAgICAgICAgI2ZpbHRlcklucHV0XG4gICAgICAgICAgICAoY2xpY2spPVwib25TaW5nbGVGaWx0ZXJDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgIChpbnB1dCk9XCJvblNpbmdsZUZpbHRlcklucHV0KCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24pPVwib25TaW5nbGVGaWx0ZXJLZXlkb3duKCRldmVudClcIj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJvcHRpb25zXCJcbiAgICAgICAgI29wdGlvbnNMaXN0PlxuICAgICAgICA8dWxcbiAgICAgICAgICAgICh3aGVlbCk9XCJvbk9wdGlvbnNXaGVlbCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25MaXN0LmZpbHRlcmVkXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J2hpZ2hsaWdodGVkJzogb3B0aW9uLmhpZ2hsaWdodGVkLCAnc2VsZWN0ZWQnOiBvcHRpb24uc2VsZWN0ZWQsICdkaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldE9wdGlvblN0eWxlKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwib25PcHRpb25Nb3VzZW92ZXIob3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFvcHRpb25MaXN0Lmhhc1Nob3duKClcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgIHt7bm90Rm91bmRNc2d9fVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcclxuICAgIHN0eWxlczogW1NUWUxFXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3REcm9wZG93bkNvbXBvbmVudFxyXG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodENvbG9yOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRUZXh0Q29sb3I6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGxlZnQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbm90Rm91bmRNc2c6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XHJcbiAgICBASW5wdXQoKSB0b3A6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gICAgQE91dHB1dCgpIG9wdGlvbkNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE9wdGlvbj4oKTtcclxuICAgIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgQE91dHB1dCgpIHNpbmdsZUZpbHRlcktleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0OiBhbnk7XHJcbiAgICBAVmlld0NoaWxkKCdvcHRpb25zTGlzdCcpIG9wdGlvbnNMaXN0OiBhbnk7XHJcblxyXG4gICAgZGlzYWJsZWRDb2xvciA9ICcjZmZmJztcclxuICAgIGRpc2FibGVkVGV4dENvbG9yID0gJzllOWU5ZSc7XHJcblxyXG4gICAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cclxuXHJcbiAgICAvLyBBbmd1bGFyIGxpZmUgY3ljbGUgaG9va3MuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zUmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uTGlzdCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlsdGVyIGlucHV0IChzaW5nbGUgc2VsZWN0KS5cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlckNsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZUZpbHRlckNsaWNrLmVtaXQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJJbnB1dChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJJbnB1dC5lbWl0KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZUZpbHRlcktleWRvd24uZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3B0aW9ucyBsaXN0LlxyXG5cclxuICAgIG9uT3B0aW9uc1doZWVsKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbnNXaGVlbChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25Nb3VzZW92ZXIob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25DbGljayhvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMub3B0aW9uQ2xpY2tlZC5lbWl0KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEluaXRpYWxpemF0aW9uLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbnNSZXNldCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QucmVzZXRGaWx0ZXIoKTtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZpZXcuICoqL1xyXG5cclxuICAgIGdldE9wdGlvblN0eWxlKG9wdGlvbjogT3B0aW9uKTogYW55IHtcclxuICAgICAgICBpZiAob3B0aW9uLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuaGlnaGxpZ2h0Q29sb3IsXHJcbiAgICAgICAgICAgICAgICAnY29sb3InOiB0aGlzLmhpZ2hsaWdodFRleHRDb2xvclxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMub3B0aW9uc0xpc3QubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBjb25zdCBsaXN0SGVpZ2h0ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMub3B0aW9uTGlzdC5nZXRIaWdobGlnaHRlZEluZGV4KCk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbGlzdC5jaGlsZHJlblswXS5jaGlsZHJlbltpdGVtSW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gaXRlbS5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpdGVtVG9wID0gaXRlbUluZGV4ICogaXRlbUhlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUJvdHRvbSA9IGl0ZW1Ub3AgKyBpdGVtSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgdmlld1RvcCA9IGxpc3Quc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3Qm90dG9tID0gdmlld1RvcCArIGxpc3RIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbUJvdHRvbSA+IHZpZXdCb3R0b20pIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbUJvdHRvbSAtIGxpc3RIZWlnaHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbVRvcCA8IHZpZXdUb3ApIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbVRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU9wdGlvbnNXaGVlbChlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBkaXYgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgYXRUb3AgPSBkaXYuc2Nyb2xsVG9wID09PSAwO1xyXG4gICAgICAgIGNvbnN0IGF0Qm90dG9tID0gZGl2Lm9mZnNldEhlaWdodCArIGRpdi5zY3JvbGxUb3AgPT09IGRpdi5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChhdFRvcCAmJiBlLmRlbHRhWSA8IDApIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXRCb3R0b20gJiYgZS5kZWx0YVkgPiAwKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19