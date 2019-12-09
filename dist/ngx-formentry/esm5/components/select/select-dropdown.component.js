import * as tslib_1 from "tslib";
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
                'color': this.highlightTextColor
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SelectDropdownComponent.prototype, "filterEnabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "highlightColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "highlightTextColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "left", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SelectDropdownComponent.prototype, "multiple", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "notFoundMsg", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OptionList)
    ], SelectDropdownComponent.prototype, "optionList", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "top", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "close", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "optionClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "singleFilterClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "singleFilterInput", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "singleFilterKeydown", void 0);
    tslib_1.__decorate([
        ViewChild('filterInput', { static: false }),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "filterInput", void 0);
    tslib_1.__decorate([
        ViewChild('optionsList', { static: false }),
        tslib_1.__metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "optionsList", void 0);
    SelectDropdownComponent = tslib_1.__decorate([
        Component({
            selector: 'select-dropdown',
            template: "<div\n    [ngStyle]=\"{'top.px': top, 'left.px': left, 'width.px': width}\">\n\n    <div class=\"filter\"\n        *ngIf=\"!multiple\">\n        <input\n            *ngIf=\"filterEnabled\"\n            #filterInput\n            (click)=\"onSingleFilterClick($event)\"\n            (input)=\"onSingleFilterInput($event)\"\n            (keydown)=\"onSingleFilterKeydown($event)\">\n    </div>\n\n    <div class=\"options\"\n        #optionsList>\n        <ul\n            (wheel)=\"onOptionsWheel($event)\">\n            <li *ngFor=\"let option of optionList.filtered\"\n                [ngClass]=\"{'highlighted': option.highlighted, 'selected': option.selected, 'disabled': option.disabled}\"\n                [ngStyle]=\"getOptionStyle(option)\"\n                (click)=\"onOptionClick(option)\"\n                (mouseover)=\"onOptionMouseover(option)\">\n                {{option.label}}\n            </li>\n            <li\n                *ngIf=\"!optionList.hasShown()\"\n                class=\"message\">\n                {{notFoundMsg}}\n            </li>\n        </ul>\n    </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            styles: [STYLE]
        })
    ], SelectDropdownComponent);
    return SelectDropdownComponent;
}());
export { SelectDropdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMzQztJQVBBO1FBb0JjLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMzQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzdDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUt4RCxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFpSGpDLENBQUM7SUEvR0csdUJBQXVCO0lBRXZCLDRCQUE0QjtJQUU1QiwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw2Q0FBVyxHQUFYLFVBQVksT0FBWTtRQUNwQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELGlEQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFB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RUFBRSxLQUFLLEVBQUMsQ0FBQzs7Z0VBQWtCO0lBcEJuRCx1QkFBdUI7UUFQbkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQiwwbENBQTZDO1lBRTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO3FCQUQ1QixLQUFLO1NBRWpCLENBQUM7T0FFVyx1QkFBdUIsQ0F3SW5DO0lBQUQsOEJBQUM7Q0FBQSxBQXhJRCxJQXdJQztTQXhJWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50LnN0eWxlJztcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xyXG5pbXBvcnQgeyBPcHRpb25MaXN0IH0gZnJvbSAnLi9vcHRpb24tbGlzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VsZWN0LWRyb3Bkb3duJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnc2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW1NUWUxFXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3REcm9wZG93bkNvbXBvbmVudFxyXG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodENvbG9yOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRUZXh0Q29sb3I6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGxlZnQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbm90Rm91bmRNc2c6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XHJcbiAgICBASW5wdXQoKSB0b3A6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gICAgQE91dHB1dCgpIG9wdGlvbkNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE9wdGlvbj4oKTtcclxuICAgIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgQE91dHB1dCgpIHNpbmdsZUZpbHRlcktleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcsIHtzdGF0aWM6IGZhbHNlfSkgZmlsdGVySW5wdXQ6IGFueTtcclxuICAgIEBWaWV3Q2hpbGQoJ29wdGlvbnNMaXN0Jywge3N0YXRpYzogZmFsc2V9KSBvcHRpb25zTGlzdDogYW55O1xyXG5cclxuICAgIGRpc2FibGVkQ29sb3IgPSAnI2ZmZic7XHJcbiAgICBkaXNhYmxlZFRleHRDb2xvciA9ICc5ZTllOWUnO1xyXG5cclxuICAgIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXHJcblxyXG4gICAgLy8gQW5ndWxhciBsaWZlIGN5Y2xlIGhvb2tzLlxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ29wdGlvbkxpc3QnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNSZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbHRlciBpbnB1dCAoc2luZ2xlIHNlbGVjdCkuXHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJDbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJDbGljay5lbWl0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlRmlsdGVySW5wdXQuZW1pdChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJLZXlkb3duLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9wdGlvbnMgbGlzdC5cclxuXHJcbiAgICBvbk9wdGlvbnNXaGVlbChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25zV2hlZWwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uTW91c2VvdmVyKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkNsaWNrZWQuZW1pdChvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBJbml0aWFsaXphdGlvbi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBvcHRpb25zUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LnJlc2V0RmlsdGVyKCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWaWV3LiAqKi9cclxuXHJcbiAgICBnZXRPcHRpb25TdHlsZShvcHRpb246IE9wdGlvbik6IGFueSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmhpZ2hsaWdodENvbG9yLFxyXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogdGhpcy5oaWdobGlnaHRUZXh0Q29sb3JcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRmlsdGVySW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgbGlzdEhlaWdodCA9IGxpc3Qub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLm9wdGlvbkxpc3QuZ2V0SGlnaGxpZ2h0ZWRJbmRleCgpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5baXRlbUluZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IGl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVRvcCA9IGl0ZW1JbmRleCAqIGl0ZW1IZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgaXRlbUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdUb3AgPSBsaXN0LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgY29uc3Qgdmlld0JvdHRvbSA9IHZpZXdUb3AgKyBsaXN0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW1Cb3R0b20gPiB2aWV3Qm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Cb3R0b20gLSBsaXN0SGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPCB2aWV3VG9wKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW1Ub3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVPcHRpb25zV2hlZWwoZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGF0VG9wID0gZGl2LnNjcm9sbFRvcCA9PT0gMDtcclxuICAgICAgICBjb25zdCBhdEJvdHRvbSA9IGRpdi5vZmZzZXRIZWlnaHQgKyBkaXYuc2Nyb2xsVG9wID09PSBkaXYuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoYXRUb3AgJiYgZS5kZWx0YVkgPCAwKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGF0Qm90dG9tICYmIGUuZGVsdGFZID4gMCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==