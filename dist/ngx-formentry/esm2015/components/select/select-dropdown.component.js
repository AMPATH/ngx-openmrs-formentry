import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { STYLE } from './select-dropdown.component.style';
import { OptionList } from './option-list';
let SelectDropdownComponent = class SelectDropdownComponent {
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
                'color': this.highlightTextColor
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
export { SelectDropdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUUxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUzNDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBUHBDO1FBb0JjLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMzQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzdDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUt4RCxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFpSGpDLENBQUM7SUEvR0csdUJBQXVCO0lBRXZCLDRCQUE0QjtJQUU1QixRQUFRO1FBQ0osSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUNwQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztR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RCx1QkFBdUI7SUFQbkMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQiwwbENBQTZDO1FBRTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUQ1QixLQUFLO0tBRWpCLENBQUM7R0FFVyx1QkFBdUIsQ0F3SW5DO1NBeElZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU1RZTEUgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQuc3R5bGUnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzZWxlY3QtZHJvcGRvd24nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdzZWxlY3QtZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbU1RZTEVdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdERyb3Bkb3duQ29tcG9uZW50XHJcbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJFbmFibGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0Q29sb3I6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodFRleHRDb2xvcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgbGVmdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBub3RGb3VuZE1zZzogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcclxuICAgIEBJbnB1dCgpIHRvcDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICBAT3V0cHV0KCkgb3B0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uPigpO1xyXG4gICAgQE91dHB1dCgpIHNpbmdsZUZpbHRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIHNpbmdsZUZpbHRlcklucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyS2V5ZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0Jywge3N0YXRpYzogZmFsc2V9KSBmaWx0ZXJJbnB1dDogYW55O1xyXG4gICAgQFZpZXdDaGlsZCgnb3B0aW9uc0xpc3QnLCB7c3RhdGljOiBmYWxzZX0pIG9wdGlvbnNMaXN0OiBhbnk7XHJcblxyXG4gICAgZGlzYWJsZWRDb2xvciA9ICcjZmZmJztcclxuICAgIGRpc2FibGVkVGV4dENvbG9yID0gJzllOWU5ZSc7XHJcblxyXG4gICAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cclxuXHJcbiAgICAvLyBBbmd1bGFyIGxpZmUgY3ljbGUgaG9va3MuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zUmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uTGlzdCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlsdGVyIGlucHV0IChzaW5nbGUgc2VsZWN0KS5cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlckNsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZUZpbHRlckNsaWNrLmVtaXQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJJbnB1dChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVGaWx0ZXJJbnB1dC5lbWl0KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZUZpbHRlcktleWRvd24uZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3B0aW9ucyBsaXN0LlxyXG5cclxuICAgIG9uT3B0aW9uc1doZWVsKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbnNXaGVlbChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25Nb3VzZW92ZXIob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25DbGljayhvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMub3B0aW9uQ2xpY2tlZC5lbWl0KG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEluaXRpYWxpemF0aW9uLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbnNSZXNldCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QucmVzZXRGaWx0ZXIoKTtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZpZXcuICoqL1xyXG5cclxuICAgIGdldE9wdGlvblN0eWxlKG9wdGlvbjogT3B0aW9uKTogYW55IHtcclxuICAgICAgICBpZiAob3B0aW9uLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuaGlnaGxpZ2h0Q29sb3IsXHJcbiAgICAgICAgICAgICAgICAnY29sb3InOiB0aGlzLmhpZ2hsaWdodFRleHRDb2xvclxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMub3B0aW9uc0xpc3QubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBjb25zdCBsaXN0SGVpZ2h0ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMub3B0aW9uTGlzdC5nZXRIaWdobGlnaHRlZEluZGV4KCk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbGlzdC5jaGlsZHJlblswXS5jaGlsZHJlbltpdGVtSW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gaXRlbS5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpdGVtVG9wID0gaXRlbUluZGV4ICogaXRlbUhlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUJvdHRvbSA9IGl0ZW1Ub3AgKyBpdGVtSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgdmlld1RvcCA9IGxpc3Quc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3Qm90dG9tID0gdmlld1RvcCArIGxpc3RIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbUJvdHRvbSA+IHZpZXdCb3R0b20pIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbUJvdHRvbSAtIGxpc3RIZWlnaHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbVRvcCA8IHZpZXdUb3ApIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbVRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU9wdGlvbnNXaGVlbChlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBkaXYgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgYXRUb3AgPSBkaXYuc2Nyb2xsVG9wID09PSAwO1xyXG4gICAgICAgIGNvbnN0IGF0Qm90dG9tID0gZGl2Lm9mZnNldEhlaWdodCArIGRpdi5zY3JvbGxUb3AgPT09IGRpdi5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChhdFRvcCAmJiBlLmRlbHRhWSA8IDApIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXRCb3R0b20gJiYgZS5kZWx0YVkgPiAwKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19