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
    SelectDropdownComponent.prototype.ngOnInit = function () {
        this.optionsReset();
    };
    SelectDropdownComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    };
    SelectDropdownComponent.prototype.ngAfterViewInit = function () {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    };
    // Filter input (single select).
    SelectDropdownComponent.prototype.onSingleFilterClick = function (event) {
        this.singleFilterClick.emit(null);
    };
    SelectDropdownComponent.prototype.onSingleFilterInput = function (event) {
        this.singleFilterInput.emit(event.target.value);
    };
    SelectDropdownComponent.prototype.onSingleFilterKeydown = function (event) {
        this.singleFilterKeydown.emit(event);
    };
    // Options list.
    SelectDropdownComponent.prototype.onOptionsWheel = function (event) {
        this.handleOptionsWheel(event);
    };
    SelectDropdownComponent.prototype.onOptionMouseover = function (option) {
        this.optionList.highlightOption(option);
    };
    SelectDropdownComponent.prototype.onOptionClick = function (option) {
        this.optionClicked.emit(option);
    };
    /** Initialization. **/
    SelectDropdownComponent.prototype.optionsReset = function () {
        this.optionList.resetFilter();
        this.optionList.highlight();
    };
    /** View. **/
    SelectDropdownComponent.prototype.getOptionStyle = function (option) {
        if (option.highlighted) {
            return {
                'background-color': this.highlightColor,
                color: this.highlightTextColor
            };
        }
        else {
            return {};
        }
    };
    SelectDropdownComponent.prototype.clearFilterInput = function () {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    };
    SelectDropdownComponent.prototype.moveHighlightedIntoView = function () {
        var list = this.optionsList.nativeElement;
        var listHeight = list.offsetHeight;
        var itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            var item = list.children[0].children[itemIndex];
            var itemHeight = item.offsetHeight;
            var itemTop = itemIndex * itemHeight;
            var itemBottom = itemTop + itemHeight;
            var viewTop = list.scrollTop;
            var viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    };
    SelectDropdownComponent.prototype.handleOptionsWheel = function (e) {
        var div = this.optionsList.nativeElement;
        var atTop = div.scrollTop === 0;
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
                    template: "<div [ngStyle]=\"{ 'top.px': top, 'left.px': left, 'width.px': width }\">\n  <div class=\"filter\" *ngIf=\"!multiple\">\n    <input\n      *ngIf=\"filterEnabled\"\n      #filterInput\n      (click)=\"onSingleFilterClick($event)\"\n      (input)=\"onSingleFilterInput($event)\"\n      (keydown)=\"onSingleFilterKeydown($event)\"\n    />\n  </div>\n\n  <div class=\"options\" #optionsList>\n    <ul (wheel)=\"onOptionsWheel($event)\">\n      <li\n        *ngFor=\"let option of optionList.filtered\"\n        [ngClass]=\"{\n          highlighted: option.highlighted,\n          selected: option.selected,\n          disabled: option.disabled\n        }\"\n        [ngStyle]=\"getOptionStyle(option)\"\n        (click)=\"onOptionClick(option)\"\n        (mouseover)=\"onOptionMouseover(option)\"\n      >\n        {{ option.label }}\n      </li>\n      <li *ngIf=\"!optionList.hasShown()\" class=\"message\">\n        {{ notFoundMsg }}\n      </li>\n    </ul>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUUxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQUE7UUFrRFksVUFBSyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDN0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMvQyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBS3hELGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLHNCQUFpQixHQUFHLFFBQVEsQ0FBQztJQWdIL0IsQ0FBQztJQTlHQyx1QkFBdUI7SUFFdkIsNEJBQTRCO0lBRTVCLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDZDQUFXLEdBQVgsVUFBWSxPQUFZO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUVELGlEQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUM7SUFFRCxnQ0FBZ0M7SUFFaEMscURBQW1CLEdBQW5CLFVBQW9CLEtBQVU7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLEtBQVU7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCx1REFBcUIsR0FBckIsVUFBc0IsS0FBVTtRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxnQkFBZ0I7SUFFaEIsZ0RBQWMsR0FBZCxVQUFlLEtBQVU7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxtREFBaUIsR0FBakIsVUFBa0IsTUFBYztRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsK0NBQWEsR0FBYixVQUFjLE1BQWM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHVCQUF1QjtJQUVmLDhDQUFZLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxhQUFhO0lBRWIsZ0RBQWMsR0FBZCxVQUFlLE1BQWM7UUFDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDO2dCQUNMLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUN2QyxLQUFLLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjthQUMvQixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNaLENBQUM7SUFDSCxDQUFDO0lBRUQsa0RBQWdCLEdBQWhCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUVELHlEQUF1QixHQUF2QjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzVDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXhELEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUVyQyxJQUFNLE9BQU8sR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQ3ZDLElBQU0sVUFBVSxHQUFHLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFFeEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMvQixJQUFNLFVBQVUsR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU8sb0RBQWtCLEdBQTFCLFVBQTJCLENBQU07UUFDL0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFFdkUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQzs7Z0JBM0tGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsazlCQWdDWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0JBQ2YsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzs7Z0NBR0UsS0FBSztpQ0FDTCxLQUFLO3FDQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBRUwsTUFBTTtnQ0FDTixNQUFNO29DQUNOLE1BQU07b0NBQ04sTUFBTTtzQ0FDTixNQUFNOzhCQUVOLFNBQVMsU0FBQyxhQUFhOzhCQUN2QixTQUFTLFNBQUMsYUFBYTs7SUFtSDFCLDhCQUFDO0NBQUEsQUE1S0QsSUE0S0M7U0F0SVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTVFlMRSB9IGZyb20gJy4vc2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5zdHlsZSc7XG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBPcHRpb25MaXN0IH0gZnJvbSAnLi9vcHRpb24tbGlzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdTdHlsZV09XCJ7ICd0b3AucHgnOiB0b3AsICdsZWZ0LnB4JzogbGVmdCwgJ3dpZHRoLnB4Jzogd2lkdGggfVwiPlxuICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCIgKm5nSWY9XCIhbXVsdGlwbGVcIj5cbiAgICA8aW5wdXRcbiAgICAgICpuZ0lmPVwiZmlsdGVyRW5hYmxlZFwiXG4gICAgICAjZmlsdGVySW5wdXRcbiAgICAgIChjbGljayk9XCJvblNpbmdsZUZpbHRlckNsaWNrKCRldmVudClcIlxuICAgICAgKGlucHV0KT1cIm9uU2luZ2xlRmlsdGVySW5wdXQoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bik9XCJvblNpbmdsZUZpbHRlcktleWRvd24oJGV2ZW50KVwiXG4gICAgLz5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIiAjb3B0aW9uc0xpc3Q+XG4gICAgPHVsICh3aGVlbCk9XCJvbk9wdGlvbnNXaGVlbCgkZXZlbnQpXCI+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25MaXN0LmZpbHRlcmVkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgIGhpZ2hsaWdodGVkOiBvcHRpb24uaGlnaGxpZ2h0ZWQsXG4gICAgICAgICAgc2VsZWN0ZWQ6IG9wdGlvbi5zZWxlY3RlZCxcbiAgICAgICAgICBkaXNhYmxlZDogb3B0aW9uLmRpc2FibGVkXG4gICAgICAgIH1cIlxuICAgICAgICBbbmdTdHlsZV09XCJnZXRPcHRpb25TdHlsZShvcHRpb24pXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2sob3B0aW9uKVwiXG4gICAgICAgIChtb3VzZW92ZXIpPVwib25PcHRpb25Nb3VzZW92ZXIob3B0aW9uKVwiXG4gICAgICA+XG4gICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgPC9saT5cbiAgICAgIDxsaSAqbmdJZj1cIiFvcHRpb25MaXN0Lmhhc1Nob3duKClcIiBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAge3sgbm90Rm91bmRNc2cgfX1cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW1NUWUxFXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3REcm9wZG93bkNvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgZmlsdGVyRW5hYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgaGlnaGxpZ2h0Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxlZnQ6IG51bWJlcjtcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5vdEZvdW5kTXNnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XG4gIEBJbnB1dCgpIHRvcDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIG9wdGlvbkNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE9wdGlvbj4oKTtcbiAgQE91dHB1dCgpIHNpbmdsZUZpbHRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVySW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHNpbmdsZUZpbHRlcktleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ29wdGlvbnNMaXN0Jykgb3B0aW9uc0xpc3Q6IGFueTtcblxuICBkaXNhYmxlZENvbG9yID0gJyNmZmYnO1xuICBkaXNhYmxlZFRleHRDb2xvciA9ICc5ZTllOWUnO1xuXG4gIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXG5cbiAgLy8gQW5ndWxhciBsaWZlIGN5Y2xlIGhvb2tzLlxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uTGlzdCcpKSB7XG4gICAgICB0aGlzLm9wdGlvbnNSZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRmlsdGVyIGlucHV0IChzaW5nbGUgc2VsZWN0KS5cblxuICBvblNpbmdsZUZpbHRlckNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNpbmdsZUZpbHRlckNsaWNrLmVtaXQobnVsbCk7XG4gIH1cblxuICBvblNpbmdsZUZpbHRlcklucHV0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNpbmdsZUZpbHRlcklucHV0LmVtaXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgdGhpcy5zaW5nbGVGaWx0ZXJLZXlkb3duLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gT3B0aW9ucyBsaXN0LlxuXG4gIG9uT3B0aW9uc1doZWVsKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZU9wdGlvbnNXaGVlbChldmVudCk7XG4gIH1cblxuICBvbk9wdGlvbk1vdXNlb3ZlcihvcHRpb246IE9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRPcHRpb24ob3B0aW9uKTtcbiAgfVxuXG4gIG9uT3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbkNsaWNrZWQuZW1pdChvcHRpb24pO1xuICB9XG5cbiAgLyoqIEluaXRpYWxpemF0aW9uLiAqKi9cblxuICBwcml2YXRlIG9wdGlvbnNSZXNldCgpIHtcbiAgICB0aGlzLm9wdGlvbkxpc3QucmVzZXRGaWx0ZXIoKTtcbiAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0KCk7XG4gIH1cblxuICAvKiogVmlldy4gKiovXG5cbiAgZ2V0T3B0aW9uU3R5bGUob3B0aW9uOiBPcHRpb24pOiBhbnkge1xuICAgIGlmIChvcHRpb24uaGlnaGxpZ2h0ZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgY29sb3I6IHRoaXMuaGlnaGxpZ2h0VGV4dENvbG9yXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBtb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGxpc3RIZWlnaHQgPSBsaXN0Lm9mZnNldEhlaWdodDtcblxuICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMub3B0aW9uTGlzdC5nZXRIaWdobGlnaHRlZEluZGV4KCk7XG5cbiAgICBpZiAoaXRlbUluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0LmNoaWxkcmVuWzBdLmNoaWxkcmVuW2l0ZW1JbmRleF07XG4gICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gaXRlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIGNvbnN0IGl0ZW1Ub3AgPSBpdGVtSW5kZXggKiBpdGVtSGVpZ2h0O1xuICAgICAgY29uc3QgaXRlbUJvdHRvbSA9IGl0ZW1Ub3AgKyBpdGVtSGVpZ2h0O1xuXG4gICAgICBjb25zdCB2aWV3VG9wID0gbGlzdC5zY3JvbGxUb3A7XG4gICAgICBjb25zdCB2aWV3Qm90dG9tID0gdmlld1RvcCArIGxpc3RIZWlnaHQ7XG5cbiAgICAgIGlmIChpdGVtQm90dG9tID4gdmlld0JvdHRvbSkge1xuICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Cb3R0b20gLSBsaXN0SGVpZ2h0O1xuICAgICAgfSBlbHNlIGlmIChpdGVtVG9wIDwgdmlld1RvcCkge1xuICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Ub3A7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVPcHRpb25zV2hlZWwoZTogYW55KSB7XG4gICAgY29uc3QgZGl2ID0gdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGF0VG9wID0gZGl2LnNjcm9sbFRvcCA9PT0gMDtcbiAgICBjb25zdCBhdEJvdHRvbSA9IGRpdi5vZmZzZXRIZWlnaHQgKyBkaXYuc2Nyb2xsVG9wID09PSBkaXYuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgaWYgKGF0VG9wICYmIGUuZGVsdGFZIDwgMCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoYXRCb3R0b20gJiYgZS5kZWx0YVkgPiAwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=