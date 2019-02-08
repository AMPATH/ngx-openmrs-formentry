/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { STYLE } from './select-dropdown.component.style';
import { OptionList } from './option-list';
var SelectDropdownComponent = /** @class */ (function () {
    function SelectDropdownComponent() {
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
    /**
     * Event handlers. *
     * @return {?}
     */
    // Angular life cycle hooks.
    SelectDropdownComponent.prototype.ngOnInit = /**
     * Event handlers. *
     * @return {?}
     */
    // Angular life cycle hooks.
    function () {
        this.optionsReset();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectDropdownComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    };
    /**
     * @return {?}
     */
    SelectDropdownComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    };
    // Filter input (single select).
    // Filter input (single select).
    /**
     * @param {?} event
     * @return {?}
     */
    SelectDropdownComponent.prototype.onSingleFilterClick = 
    // Filter input (single select).
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.singleFilterClick.emit(null);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectDropdownComponent.prototype.onSingleFilterInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.singleFilterInput.emit(event.target.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectDropdownComponent.prototype.onSingleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.singleFilterKeydown.emit(event);
    };
    // Options list.
    // Options list.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectDropdownComponent.prototype.onOptionsWheel = 
    // Options list.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleOptionsWheel(event);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectDropdownComponent.prototype.onOptionMouseover = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.optionList.highlightOption(option);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectDropdownComponent.prototype.onOptionClick = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.optionClicked.emit(option);
    };
    /** Initialization. **/
    /**
     * Initialization. *
     * @private
     * @return {?}
     */
    SelectDropdownComponent.prototype.optionsReset = /**
     * Initialization. *
     * @private
     * @return {?}
     */
    function () {
        this.optionList.resetFilter();
        this.optionList.highlight();
    };
    /** View. **/
    /**
     * View. *
     * @param {?} option
     * @return {?}
     */
    SelectDropdownComponent.prototype.getOptionStyle = /**
     * View. *
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option.highlighted) {
            return {
                'background-color': this.highlightColor,
                'color': this.highlightTextColor
            };
        }
        else {
            return {};
        }
    };
    /**
     * @return {?}
     */
    SelectDropdownComponent.prototype.clearFilterInput = /**
     * @return {?}
     */
    function () {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    };
    /**
     * @return {?}
     */
    SelectDropdownComponent.prototype.moveHighlightedIntoView = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var list = this.optionsList.nativeElement;
        /** @type {?} */
        var listHeight = list.offsetHeight;
        /** @type {?} */
        var itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            /** @type {?} */
            var item = list.children[0].children[itemIndex];
            /** @type {?} */
            var itemHeight = item.offsetHeight;
            /** @type {?} */
            var itemTop = itemIndex * itemHeight;
            /** @type {?} */
            var itemBottom = itemTop + itemHeight;
            /** @type {?} */
            var viewTop = list.scrollTop;
            /** @type {?} */
            var viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    SelectDropdownComponent.prototype.handleOptionsWheel = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var div = this.optionsList.nativeElement;
        /** @type {?} */
        var atTop = div.scrollTop === 0;
        /** @type {?} */
        var atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    };
    SelectDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-dropdown',
                    template: "<div\n    [ngStyle]=\"{'top.px': top, 'left.px': left, 'width.px': width}\">\n\n    <div class=\"filter\"\n        *ngIf=\"!multiple\">\n        <input\n            *ngIf=\"filterEnabled\"\n            #filterInput\n            (click)=\"onSingleFilterClick($event)\"\n            (input)=\"onSingleFilterInput($event)\"\n            (keydown)=\"onSingleFilterKeydown($event)\">\n    </div>\n\n    <div class=\"options\"\n        #optionsList>\n        <ul\n            (wheel)=\"onOptionsWheel($event)\">\n            <li *ngFor=\"let option of optionList.filtered\"\n                [ngClass]=\"{'highlighted': option.highlighted, 'selected': option.selected, 'disabled': option.disabled}\"\n                [ngStyle]=\"getOptionStyle(option)\"\n                (click)=\"onOptionClick(option)\"\n                (mouseover)=\"onOptionMouseover(option)\">\n                {{option.label}}\n            </li>\n            <li\n                *ngIf=\"!optionList.hasShown()\"\n                class=\"message\">\n                {{notFoundMsg}}\n            </li>\n        </ul>\n    </div>\n</div>\n",
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
    return SelectDropdownComponent;
}());
export { SelectDropdownComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUFBO1FBb0RjLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMzQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzdDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUt4RCxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFpSGpDLENBQUM7SUEvR0csdUJBQXVCO0lBRXZCLDRCQUE0Qjs7Ozs7O0lBRTVCLDBDQUFROzs7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsNkNBQVc7Ozs7SUFBWCxVQUFZLE9BQVk7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsaURBQWU7OztJQUFmO1FBQ0ksSUFBSSxD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QUVMLE1BQU07Z0NBQ04sTUFBTTtvQ0FDTixNQUFNO29DQUNOLE1BQU07c0NBQ04sTUFBTTs4QkFFTixTQUFTLFNBQUMsYUFBYTs4QkFDdkIsU0FBUyxTQUFDLGFBQWE7O0lBb0g1Qiw4QkFBQztDQUFBLEFBL0tELElBK0tDO1NBeElZLHVCQUF1Qjs7O0lBR2hDLGdEQUFnQzs7SUFDaEMsaURBQWdDOztJQUNoQyxxREFBb0M7O0lBQ3BDLHVDQUFzQjs7SUFDdEIsMkNBQTJCOztJQUMzQiw4Q0FBNkI7O0lBQzdCLDZDQUFnQzs7SUFDaEMsc0NBQXFCOztJQUNyQix3Q0FBdUI7O0lBRXZCLHdDQUE4Qzs7SUFDOUMsZ0RBQXFEOztJQUNyRCxvREFBdUQ7O0lBQ3ZELG9EQUF5RDs7SUFDekQsc0RBQXdEOztJQUV4RCw4Q0FBMkM7O0lBQzNDLDhDQUEyQzs7SUFFM0MsZ0RBQXVCOztJQUN2QixvREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50LnN0eWxlJztcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xyXG5pbXBvcnQgeyBPcHRpb25MaXN0IH0gZnJvbSAnLi9vcHRpb24tbGlzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VsZWN0LWRyb3Bkb3duJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdlxuICAgIFtuZ1N0eWxlXT1cInsndG9wLnB4JzogdG9wLCAnbGVmdC5weCc6IGxlZnQsICd3aWR0aC5weCc6IHdpZHRofVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImZpbHRlclwiXG4gICAgICAgICpuZ0lmPVwiIW11bHRpcGxlXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJFbmFibGVkXCJcbiAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uU2luZ2xlRmlsdGVyQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAoaW5wdXQpPVwib25TaW5nbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uU2luZ2xlRmlsdGVyS2V5ZG93bigkZXZlbnQpXCI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiXG4gICAgICAgICNvcHRpb25zTGlzdD5cbiAgICAgICAgPHVsXG4gICAgICAgICAgICAod2hlZWwpPVwib25PcHRpb25zV2hlZWwoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uTGlzdC5maWx0ZXJlZFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydoaWdobGlnaHRlZCc6IG9wdGlvbi5oaWdobGlnaHRlZCwgJ3NlbGVjdGVkJzogb3B0aW9uLnNlbGVjdGVkLCAnZGlzYWJsZWQnOiBvcHRpb24uZGlzYWJsZWR9XCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRPcHRpb25TdHlsZShvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25PcHRpb25DbGljayhvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAobW91c2VvdmVyKT1cIm9uT3B0aW9uTW91c2VvdmVyKG9wdGlvbilcIj5cbiAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhb3B0aW9uTGlzdC5oYXNTaG93bigpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICB7e25vdEZvdW5kTXNnfX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXHJcbiAgICBzdHlsZXM6IFtTVFlMRV0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0RHJvcGRvd25Db21wb25lbnRcclxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlckVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRDb2xvcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBsZWZ0OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIG5vdEZvdW5kTXNnOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBvcHRpb25MaXN0OiBPcHRpb25MaXN0O1xyXG4gICAgQElucHV0KCkgdG9wOiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIEBPdXRwdXQoKSBvcHRpb25DbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxPcHRpb24+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVySW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJLZXlkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKSBmaWx0ZXJJbnB1dDogYW55O1xyXG4gICAgQFZpZXdDaGlsZCgnb3B0aW9uc0xpc3QnKSBvcHRpb25zTGlzdDogYW55O1xyXG5cclxuICAgIGRpc2FibGVkQ29sb3IgPSAnI2ZmZic7XHJcbiAgICBkaXNhYmxlZFRleHRDb2xvciA9ICc5ZTllOWUnO1xyXG5cclxuICAgIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXHJcblxyXG4gICAgLy8gQW5ndWxhciBsaWZlIGN5Y2xlIGhvb2tzLlxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ29wdGlvbkxpc3QnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNSZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbHRlciBpbnB1dCAoc2luZ2xlIHNlbGVjdCkuXHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJDbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJDbGljay5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlRmlsdGVySW5wdXQuZW1pdChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJLZXlkb3duLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9wdGlvbnMgbGlzdC5cclxuXHJcbiAgICBvbk9wdGlvbnNXaGVlbChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25zV2hlZWwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uTW91c2VvdmVyKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkNsaWNrZWQuZW1pdChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBJbml0aWFsaXphdGlvbi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBvcHRpb25zUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LnJlc2V0RmlsdGVyKCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWaWV3LiAqKi9cclxuXHJcbiAgICBnZXRPcHRpb25TdHlsZShvcHRpb246IE9wdGlvbik6IGFueSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmhpZ2hsaWdodENvbG9yLFxyXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogdGhpcy5oaWdobGlnaHRUZXh0Q29sb3JcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRmlsdGVySW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgbGlzdEhlaWdodCA9IGxpc3Qub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLm9wdGlvbkxpc3QuZ2V0SGlnaGxpZ2h0ZWRJbmRleCgpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5baXRlbUluZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IGl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVRvcCA9IGl0ZW1JbmRleCAqIGl0ZW1IZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgaXRlbUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdUb3AgPSBsaXN0LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgY29uc3Qgdmlld0JvdHRvbSA9IHZpZXdUb3AgKyBsaXN0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW1Cb3R0b20gPiB2aWV3Qm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Cb3R0b20gLSBsaXN0SGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPCB2aWV3VG9wKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Ub3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVPcHRpb25zV2hlZWwoZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGF0VG9wID0gZGl2LnNjcm9sbFRvcCA9PT0gMDtcclxuICAgICAgICBjb25zdCBhdEJvdHRvbSA9IGRpdi5vZmZzZXRIZWlnaHQgKyBkaXYuc2Nyb2xsVG9wID09PSBkaXYuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoYXRUb3AgJiYgZS5kZWx0YVkgPCAwKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGF0Qm90dG9tICYmIGUuZGVsdGFZID4gMCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==