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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUFBO1FBb0RjLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMzQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzdDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUt4RCxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFpSGpDLENBQUM7SUEvR0csdUJBQXVCO0lBRXZCLDRCQUE0Qjs7Ozs7O0lBRTVCLDBDQUFROzs7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsNkNBQVc7Ozs7SUFBWCxVQUFZLE9BQVk7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsaURBQWU7OztJQUFmO1FBQ0ksSUFBSSxD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QUVMLE1BQU07Z0NBQ04sTUFBTTtvQ0FDTixNQUFNO29DQUNOLE1BQU07c0NBQ04sTUFBTTs4QkFFTixTQUFTLFNBQUMsYUFBYTs4QkFDdkIsU0FBUyxTQUFDLGFBQWE7O0lBb0g1Qiw4QkFBQztDQUFBLEFBL0tELElBK0tDO1NBeElZLHVCQUF1Qjs7O0lBR2hDLGdEQUFnQzs7SUFDaEMsaURBQWdDOztJQUNoQyxxREFBb0M7O0lBQ3BDLHVDQUFzQjs7SUFDdEIsMkNBQTJCOztJQUMzQiw4Q0FBNkI7O0lBQzdCLDZDQUFnQzs7SUFDaEMsc0NBQXFCOztJQUNyQix3Q0FBdUI7O0lBRXZCLHdDQUE4Qzs7SUFDOUMsZ0RBQXFEOztJQUNyRCxvREFBdUQ7O0lBQ3ZELG9EQUF5RDs7SUFDekQsc0RBQXdEOztJQUV4RCw4Q0FBMkM7O0lBQzNDLDhDQUEyQzs7SUFFM0MsZ0RBQXVCOztJQUN2QixvREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50LnN0eWxlJztcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xyXG5pbXBvcnQgeyBPcHRpb25MaXN0IH0gZnJvbSAnLi9vcHRpb24tbGlzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VsZWN0LWRyb3Bkb3duJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdlxyXG4gICAgW25nU3R5bGVdPVwieyd0b3AucHgnOiB0b3AsICdsZWZ0LnB4JzogbGVmdCwgJ3dpZHRoLnB4Jzogd2lkdGh9XCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImZpbHRlclwiXHJcbiAgICAgICAgKm5nSWY9XCIhbXVsdGlwbGVcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJFbmFibGVkXCJcclxuICAgICAgICAgICAgI2ZpbHRlcklucHV0XHJcbiAgICAgICAgICAgIChjbGljayk9XCJvblNpbmdsZUZpbHRlckNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICAoaW5wdXQpPVwib25TaW5nbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGtleWRvd24pPVwib25TaW5nbGVGaWx0ZXJLZXlkb3duKCRldmVudClcIj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJvcHRpb25zXCJcclxuICAgICAgICAjb3B0aW9uc0xpc3Q+XHJcbiAgICAgICAgPHVsXHJcbiAgICAgICAgICAgICh3aGVlbCk9XCJvbk9wdGlvbnNXaGVlbCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbkxpc3QuZmlsdGVyZWRcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydoaWdobGlnaHRlZCc6IG9wdGlvbi5oaWdobGlnaHRlZCwgJ3NlbGVjdGVkJzogb3B0aW9uLnNlbGVjdGVkLCAnZGlzYWJsZWQnOiBvcHRpb24uZGlzYWJsZWR9XCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldE9wdGlvblN0eWxlKG9wdGlvbilcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2sob3B0aW9uKVwiXHJcbiAgICAgICAgICAgICAgICAobW91c2VvdmVyKT1cIm9uT3B0aW9uTW91c2VvdmVyKG9wdGlvbilcIj5cclxuICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpXHJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFvcHRpb25MaXN0Lmhhc1Nob3duKClcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJtZXNzYWdlXCI+XHJcbiAgICAgICAgICAgICAgICB7e25vdEZvdW5kTXNnfX1cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gICAgc3R5bGVzOiBbU1RZTEVdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdERyb3Bkb3duQ29tcG9uZW50XHJcbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJFbmFibGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0Q29sb3I6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodFRleHRDb2xvcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgbGVmdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBub3RGb3VuZE1zZzogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcclxuICAgIEBJbnB1dCgpIHRvcDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICBAT3V0cHV0KCkgb3B0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uPigpO1xyXG4gICAgQE91dHB1dCgpIHNpbmdsZUZpbHRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIHNpbmdsZUZpbHRlcklucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyS2V5ZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0JykgZmlsdGVySW5wdXQ6IGFueTtcclxuICAgIEBWaWV3Q2hpbGQoJ29wdGlvbnNMaXN0Jykgb3B0aW9uc0xpc3Q6IGFueTtcclxuXHJcbiAgICBkaXNhYmxlZENvbG9yID0gJyNmZmYnO1xyXG4gICAgZGlzYWJsZWRUZXh0Q29sb3IgPSAnOWU5ZTllJztcclxuXHJcbiAgICAvKiogRXZlbnQgaGFuZGxlcnMuICoqL1xyXG5cclxuICAgIC8vIEFuZ3VsYXIgbGlmZSBjeWNsZSBob29rcy5cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNSZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvcHRpb25MaXN0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBGaWx0ZXIgaW5wdXQgKHNpbmdsZSBzZWxlY3QpLlxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlRmlsdGVyQ2xpY2suZW1pdChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlcklucHV0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZUZpbHRlcklucHV0LmVtaXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlRmlsdGVyS2V5ZG93bi5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPcHRpb25zIGxpc3QuXHJcblxyXG4gICAgb25PcHRpb25zV2hlZWwoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uc1doZWVsKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvbk1vdXNlb3ZlcihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvbkNsaWNrKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25DbGlja2VkLmVtaXQob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xyXG5cclxuICAgIHByaXZhdGUgb3B0aW9uc1Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5yZXNldEZpbHRlcigpO1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVmlldy4gKiovXHJcblxyXG4gICAgZ2V0T3B0aW9uU3R5bGUob3B0aW9uOiBPcHRpb24pOiBhbnkge1xyXG4gICAgICAgIGlmIChvcHRpb24uaGlnaGxpZ2h0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5oaWdobGlnaHRDb2xvcixcclxuICAgICAgICAgICAgICAgICdjb2xvcic6IHRoaXMuaGlnaGxpZ2h0VGV4dENvbG9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckZpbHRlcklucHV0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVIaWdobGlnaHRlZEludG9WaWV3KCkge1xyXG5cclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGxpc3RIZWlnaHQgPSBsaXN0Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5vcHRpb25MaXN0LmdldEhpZ2hsaWdodGVkSW5kZXgoKTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1JbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0LmNoaWxkcmVuWzBdLmNoaWxkcmVuW2l0ZW1JbmRleF07XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Ub3AgPSBpdGVtSW5kZXggKiBpdGVtSGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQm90dG9tID0gaXRlbVRvcCArIGl0ZW1IZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2aWV3VG9wID0gbGlzdC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdCb3R0b20gPSB2aWV3VG9wICsgbGlzdEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtQm90dG9tID4gdmlld0JvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zY3JvbGxUb3AgPSBpdGVtQm90dG9tIC0gbGlzdEhlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtVG9wIDwgdmlld1RvcCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zY3JvbGxUb3AgPSBpdGVtVG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlT3B0aW9uc1doZWVsKGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGRpdiA9IHRoaXMub3B0aW9uc0xpc3QubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBjb25zdCBhdFRvcCA9IGRpdi5zY3JvbGxUb3AgPT09IDA7XHJcbiAgICAgICAgY29uc3QgYXRCb3R0b20gPSBkaXYub2Zmc2V0SGVpZ2h0ICsgZGl2LnNjcm9sbFRvcCA9PT0gZGl2LnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGF0VG9wICYmIGUuZGVsdGFZIDwgMCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhdEJvdHRvbSAmJiBlLmRlbHRhWSA+IDApIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=