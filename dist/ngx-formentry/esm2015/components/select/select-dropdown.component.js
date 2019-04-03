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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXlDM0MsTUFBTTtJQXZDTjtRQW9EYyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNwQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM3QyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQy9DLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFLeEQsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsUUFBUSxDQUFDO0lBaUhqQyxDQUFDOzs7Ozs7SUEzR0csUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFZO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFD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LDhDQUE2Qjs7SUFDN0IsNkNBQWdDOztJQUNoQyxzQ0FBcUI7O0lBQ3JCLHdDQUF1Qjs7SUFFdkIsd0NBQThDOztJQUM5QyxnREFBcUQ7O0lBQ3JELG9EQUF1RDs7SUFDdkQsb0RBQXlEOztJQUN6RCxzREFBd0Q7O0lBRXhELDhDQUEyQzs7SUFDM0MsOENBQTJDOztJQUUzQyxnREFBdUI7O0lBQ3ZCLG9EQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU1RZTEUgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQuc3R5bGUnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzZWxlY3QtZHJvcGRvd24nLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgICBbbmdTdHlsZV09XCJ7J3RvcC5weCc6IHRvcCwgJ2xlZnQucHgnOiBsZWZ0LCAnd2lkdGgucHgnOiB3aWR0aH1cIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCJcclxuICAgICAgICAqbmdJZj1cIiFtdWx0aXBsZVwiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlckVuYWJsZWRcIlxyXG4gICAgICAgICAgICAjZmlsdGVySW5wdXRcclxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uU2luZ2xlRmlsdGVyQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChpbnB1dCk9XCJvblNpbmdsZUZpbHRlcklucHV0KCRldmVudClcIlxyXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJvblNpbmdsZUZpbHRlcktleWRvd24oJGV2ZW50KVwiPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIlxyXG4gICAgICAgICNvcHRpb25zTGlzdD5cclxuICAgICAgICA8dWxcclxuICAgICAgICAgICAgKHdoZWVsKT1cIm9uT3B0aW9uc1doZWVsKCRldmVudClcIj5cclxuICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uTGlzdC5maWx0ZXJlZFwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J2hpZ2hsaWdodGVkJzogb3B0aW9uLmhpZ2hsaWdodGVkLCAnc2VsZWN0ZWQnOiBvcHRpb24uc2VsZWN0ZWQsICdkaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZH1cIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0T3B0aW9uU3R5bGUob3B0aW9uKVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25PcHRpb25DbGljayhvcHRpb24pXCJcclxuICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwib25PcHRpb25Nb3VzZW92ZXIob3B0aW9uKVwiPlxyXG4gICAgICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIW9wdGlvbkxpc3QuaGFzU2hvd24oKVwiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgIHt7bm90Rm91bmRNc2d9fVxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgICBzdHlsZXM6IFtTVFlMRV0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0RHJvcGRvd25Db21wb25lbnRcclxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlckVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRDb2xvcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBsZWZ0OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIG5vdEZvdW5kTXNnOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBvcHRpb25MaXN0OiBPcHRpb25MaXN0O1xyXG4gICAgQElucHV0KCkgdG9wOiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIEBPdXRwdXQoKSBvcHRpb25DbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxPcHRpb24+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVySW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJLZXlkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKSBmaWx0ZXJJbnB1dDogYW55O1xyXG4gICAgQFZpZXdDaGlsZCgnb3B0aW9uc0xpc3QnKSBvcHRpb25zTGlzdDogYW55O1xyXG5cclxuICAgIGRpc2FibGVkQ29sb3IgPSAnI2ZmZic7XHJcbiAgICBkaXNhYmxlZFRleHRDb2xvciA9ICc5ZTllOWUnO1xyXG5cclxuICAgIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXHJcblxyXG4gICAgLy8gQW5ndWxhciBsaWZlIGN5Y2xlIGhvb2tzLlxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ29wdGlvbkxpc3QnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNSZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbHRlciBpbnB1dCAoc2luZ2xlIHNlbGVjdCkuXHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJDbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJDbGljay5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlRmlsdGVySW5wdXQuZW1pdChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJLZXlkb3duLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9wdGlvbnMgbGlzdC5cclxuXHJcbiAgICBvbk9wdGlvbnNXaGVlbChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25zV2hlZWwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uTW91c2VvdmVyKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkNsaWNrZWQuZW1pdChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBJbml0aWFsaXphdGlvbi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBvcHRpb25zUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LnJlc2V0RmlsdGVyKCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWaWV3LiAqKi9cclxuXHJcbiAgICBnZXRPcHRpb25TdHlsZShvcHRpb246IE9wdGlvbik6IGFueSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmhpZ2hsaWdodENvbG9yLFxyXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogdGhpcy5oaWdobGlnaHRUZXh0Q29sb3JcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRmlsdGVySW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgbGlzdEhlaWdodCA9IGxpc3Qub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLm9wdGlvbkxpc3QuZ2V0SGlnaGxpZ2h0ZWRJbmRleCgpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5baXRlbUluZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IGl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVRvcCA9IGl0ZW1JbmRleCAqIGl0ZW1IZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgaXRlbUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdUb3AgPSBsaXN0LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgY29uc3Qgdmlld0JvdHRvbSA9IHZpZXdUb3AgKyBsaXN0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW1Cb3R0b20gPiB2aWV3Qm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Cb3R0b20gLSBsaXN0SGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPCB2aWV3VG9wKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Ub3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVPcHRpb25zV2hlZWwoZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGF0VG9wID0gZGl2LnNjcm9sbFRvcCA9PT0gMDtcclxuICAgICAgICBjb25zdCBhdEJvdHRvbSA9IGRpdi5vZmZzZXRIZWlnaHQgKyBkaXYuc2Nyb2xsVG9wID09PSBkaXYuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoYXRUb3AgJiYgZS5kZWx0YVkgPCAwKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGF0Qm90dG9tICYmIGUuZGVsdGFZID4gMCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==