import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STYLE } from './select.component.style';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
// tslint:disable-block
export const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};
let SelectComponent = class SelectComponent {
    constructor() {
        /** Keys. **/
        this.KEYS = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            UP: 38,
            DOWN: 40
        };
        this.allowClear = false;
        this.disabled = false;
        this.highlightColor = '#2196f3';
        this.highlightTextColor = '#fff';
        this.multiple = false;
        this.noFilter = 0;
        this.notFoundMsg = 'No results found';
        this.placeholder = '';
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.selected = new EventEmitter();
        this.deselected = new EventEmitter();
        this.typed = new EventEmitter();
        this._value = [];
        // Selection state variables.
        this.hasSelected = false;
        // View state variables.
        this.filterEnabled = true;
        this.filterInputWidth = 1;
        this.hasFocus = false;
        this.isBelow = true;
        this.isDisabled = false;
        this.isOpen = false;
        this.placeholderView = '';
        this.clearClicked = false;
        this.selectContainerClicked = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /** Event handlers. **/
    // Angular lifecycle hooks.
    ngOnInit() {
        this.placeholderView = this.placeholder;
    }
    ngAfterViewInit() {
        this.updateFilterWidth();
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
        if (changes.hasOwnProperty('noFilter')) {
            const numOptions = this.optionList.options.length;
            const minNumOptions = changes['noFilter'].currentValue;
            this.filterEnabled = numOptions >= minNumOptions;
        }
    }
    // Window.
    onWindowClick() {
        if (!this.selectContainerClicked) {
            this.closeDropdown();
        }
        this.clearClicked = false;
        this.selectContainerClicked = false;
    }
    onWindowResize() {
        this.updateWidth();
    }
    // Select container.
    onSelectContainerClick(event) {
        this.selectContainerClicked = true;
        if (!this.clearClicked) {
            this.toggleDropdown();
        }
    }
    onSelectContainerFocus() {
        this.onTouched();
    }
    onSelectContainerKeydown(event) {
        this.handleSelectContainerKeydown(event);
    }
    // Dropdown container.
    onDropdownOptionClicked(option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
    }
    onDropdownClose(focus) {
        this.closeDropdown(focus);
    }
    // Single filter input.
    onSingleFilterClick() {
        this.selectContainerClicked = true;
    }
    onSingleFilterInput(term) {
        setTimeout(() => {
            if (term.length > 2) {
                this.typed.emit(term);
            }
        }, 500);
        this.optionList.filter(term);
    }
    onSingleFilterKeydown(event) {
        this.handleSingleFilterKeydown(event);
    }
    // Multiple filter input.
    onMultipleFilterInput(event) {
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        setTimeout(() => {
            this.optionList.filter(event.target.value);
        });
    }
    onMultipleFilterKeydown(event) {
        this.handleMultipleFilterKeydown(event);
    }
    // Single clear select.
    onClearSelectionClick(event) {
        this.clearClicked = true;
        this.clearSelection();
        this.closeDropdown(true);
    }
    // Multiple deselect option.
    onDeselectOptionClick(option) {
        this.clearClicked = true;
        this.deselectOption(option);
    }
    /** API. **/
    // TODO fix issues with global click/key handler that closes the dropdown.
    open() {
        this.openDropdown();
    }
    close() {
        this.closeDropdown();
    }
    clear() {
        this.clearSelection();
    }
    select(value) {
        this.optionList.getOptionsByValue(value).forEach((option) => {
            this.selectOption(option);
        });
        this.valueChanged();
    }
    /** ControlValueAccessor interface methods. **/
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Value. **/
    get value() {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this.multiple ? this._value : this._value[0];
        }
    }
    set value(v) {
        if (typeof v === 'undefined' || v === null || v === '') {
            v = [];
        }
        else if (typeof v === 'string') {
            v = [v];
        }
        else if (!Array.isArray(v)) {
            throw new TypeError('Value must be a string or an array.');
        }
        if (!OptionList.equalValues(v, this._value)) {
            this.optionList.value = v;
            this.valueChanged();
        }
    }
    valueChanged() {
        this._value = this.optionList.value;
        this.hasSelected = this._value.length > 0;
        this.placeholderView = this.hasSelected ? '' : this.placeholder;
        this.updateFilterWidth();
        this.onChange(this.value);
    }
    /** Initialization. **/
    updateOptionsList(firstTime) {
        let v;
        if (!firstTime) {
            v = this.optionList.value;
        }
        this.optionList = new OptionList(this.options);
        if (!firstTime) {
            this.optionList.value = v;
            this.valueChanged();
        }
    }
    /** Dropdown. **/
    toggleDropdown() {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    }
    openDropdown() {
        if (!this.isOpen) {
            this.updateWidth();
            this.updatePosition();
            this.isOpen = true;
            if (this.multiple && this.filterEnabled) {
                this.filterInput.nativeElement.focus();
            }
            this.opened.emit(null);
        }
    }
    /* tslint:disable */
    closeDropdown(focus = false) {
        if (this.isOpen) {
            this.clearFilterInput();
            this.isOpen = false;
            if (focus) {
                this.focus();
            }
            this.closed.emit(null);
        }
    }
    /* tslint:enable */
    /** Select. **/
    selectOption(option) {
        if (!option.selected) {
            this.optionList.select(option, this.multiple);
            this.valueChanged();
            this.selected.emit(option.undecoratedCopy());
            // Is this not allready done when setting the value??
            /*setTimeout(() => {
                if (this.multiple) {
                    this.updateFilterWidth();
                }
            });*/
        }
    }
    deselectOption(option) {
        if (option.selected) {
            this.optionList.deselect(option);
            this.valueChanged();
            this.deselected.emit(option.undecoratedCopy());
            setTimeout(() => {
                if (this.multiple) {
                    // this.updateFilterWidth();
                    this.updatePosition();
                    this.optionList.highlight();
                    if (this.isOpen) {
                        this.dropdown.moveHighlightedIntoView();
                    }
                }
            });
        }
    }
    clearSelection() {
        const selection = this.optionList.selection;
        if (selection.length > 0) {
            this.optionList.clearSelection();
            this.valueChanged();
            if (selection.length === 1) {
                this.deselected.emit(selection[0].undecoratedCopy());
            }
            else {
                this.deselected.emit(selection.map((option) => {
                    return option.undecoratedCopy();
                }));
            }
        }
    }
    toggleSelectOption(option) {
        option.selected ?
            this.deselectOption(option) : this.selectOption(option);
    }
    selectHighlightedOption() {
        const option = this.optionList.highlightedOption;
        if (option !== null) {
            this.selectOption(option);
            this.closeDropdown(true);
        }
    }
    deselectLast() {
        const sel = this.optionList.selection;
        if (sel.length > 0) {
            const option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    }
    /** Filter. **/
    clearFilterInput() {
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
        else {
            this.dropdown.clearFilterInput();
        }
    }
    setMultipleFilterInput(value) {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = value;
        }
    }
    handleSelectContainerKeydown(event) {
        const key = event.which;
        if (this.isOpen) {
            if (key === this.KEYS.ESC ||
                (key === this.KEYS.UP && event.altKey)) {
                this.closeDropdown(true);
            }
            else if (key === this.KEYS.TAB) {
                this.closeDropdown();
            }
            else if (key === this.KEYS.ENTER) {
                this.selectHighlightedOption();
            }
            else if (key === this.KEYS.UP) {
                this.optionList.highlightPreviousOption();
                this.dropdown.moveHighlightedIntoView();
                if (!this.filterEnabled) {
                    event.preventDefault();
                }
            }
            else if (key === this.KEYS.DOWN) {
                this.optionList.highlightNextOption();
                this.dropdown.moveHighlightedIntoView();
                if (!this.filterEnabled) {
                    event.preventDefault();
                }
            }
        }
        else {
            if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
                (key === this.KEYS.DOWN && event.altKey)) {
                /* FIREFOX HACK:
                 *
                 * The setTimeout is added to prevent the enter keydown event
                 * to be triggered for the filter input field, which causes
                 * the dropdown to be closed again.
                 */
                setTimeout(() => { this.openDropdown(); });
            }
        }
    }
    handleMultipleFilterKeydown(event) {
        const key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected && this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    }
    handleSingleFilterKeydown(event) {
        const key = event.which;
        if (key === this.KEYS.ESC || key === this.KEYS.TAB
            || key === this.KEYS.UP || key === this.KEYS.DOWN
            || key === this.KEYS.ENTER) {
            this.handleSelectContainerKeydown(event);
        }
    }
    /** View. **/
    focus() {
        this.hasFocus = true;
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
        else {
            this.selectionSpan.nativeElement.focus();
        }
    }
    blur() {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    }
    updateWidth() {
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    }
    updatePosition() {
        const e = this.selectionSpan.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    }
    updateFilterWidth() {
        if (typeof this.filterInput !== 'undefined') {
            const value = this.filterInput.nativeElement.value;
            this.filterInputWidth = value.length === 0 ?
                1 + this.placeholderView.length * 10 : 1 + value.length * 10;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SelectComponent.prototype, "options", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "allowClear", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "highlightColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "highlightTextColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "multiple", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "noFilter", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "notFoundMsg", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], SelectComponent.prototype, "opened", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], SelectComponent.prototype, "closed", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], SelectComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], SelectComponent.prototype, "deselected", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], SelectComponent.prototype, "typed", void 0);
tslib_1.__decorate([
    ViewChild('selection', { static: false }),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "selectionSpan", void 0);
tslib_1.__decorate([
    ViewChild('dropdown', { static: false }),
    tslib_1.__metadata("design:type", SelectDropdownComponent)
], SelectComponent.prototype, "dropdown", void 0);
tslib_1.__decorate([
    ViewChild('filterInput', { static: false }),
    tslib_1.__metadata("design:type", Object)
], SelectComponent.prototype, "filterInput", void 0);
SelectComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-select',
        template: "<div\n    #selection\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [ngClass]=\"{'open': isOpen, 'focus': hasFocus, 'below': isBelow, 'disabled': disabled}\"\n    (click)=\"onSelectContainerClick($event)\"\n    (focus)=\"onSelectContainerFocus()\"\n    (keydown)=\"onSelectContainerKeydown($event)\"\n    (window:click)=\"onWindowClick()\"\n    (window:resize)=\"onWindowResize()\">\n\n    <div class=\"single\"\n        *ngIf=\"!multiple\">\n        <div class=\"value\"\n            *ngIf=\"optionList.hasSelected()\">\n            {{optionList.selection[0].label}}\n        </div>\n        <div class=\"placeholder\"\n            *ngIf=\"!optionList.hasSelected()\">\n            {{placeholderView}}\n        </div>\n        <div class=\"clear\"\n            *ngIf=\"allowClear\"\n            (click)=\"onClearSelectionClick($event)\">\n            &#x2715;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"isOpen\">\n            &#x25B2;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"!isOpen\">\n            &#x25BC;\n        </div>\n    </div>\n\n    <div class=\"multiple\"\n        *ngIf=\"multiple\">\n        <div class=\"option\"\n            *ngFor=\"let option of optionList.selection\">\n            <span class=\"deselect-option\"\n                (click)=onDeselectOptionClick(option)>\n                &#x2715;\n            </span>\n            {{option.label}}\n        </div>\n        <input\n            *ngIf=\"filterEnabled\"\n            filterInput\n            tabindex=\"-1\"\n            [placeholder]=\"placeholderView\"\n            [ngStyle]=\"{'width.px': filterInputWidth}\"\n            (input)=\"onMultipleFilterInput($event)\"\n            (keydown)=\"onMultipleFilterKeydown($event)\"/>\n    </div>\n\n</div>\n<select-dropdown\n    *ngIf=\"isOpen\"\n    #dropdown\n    [multiple]=\"multiple\"\n    [optionList]=\"optionList\"\n    [notFoundMsg]=\"notFoundMsg\"\n    [highlightColor]=\"highlightColor\"\n    [highlightTextColor]=\"highlightTextColor\"\n    [filterEnabled]=\"filterEnabled\"\n    [width]=\"width\"\n    [top]=\"top\"\n    [left]=\"left\"\n    (close)=\"onDropdownClose($event)\"\n    (optionClicked)=\"onDropdownOptionClicked($event)\"\n    (singleFilterClick)=\"onSingleFilterClick()\"\n    (singleFilterInput)=\"onSingleFilterInput($event)\"\n    (singleFilterKeydown)=\"onSingleFilterKeydown($event)\">\n</select-dropdown>\n",
        providers: [SELECT_VALUE_ACCESSOR],
        encapsulation: ViewEncapsulation.None,
        styles: [STYLE]
    })
], SelectComponent);
export { SelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsdUJBQXVCO0FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFxQjtJQUNuRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQVVGLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFSNUI7UUFVSSxhQUFhO1FBRUwsU0FBSSxHQUFRO1lBQ2hCLFNBQVMsRUFBRSxDQUFDO1lBQ1osR0FBRyxFQUFFLENBQUM7WUFDTixLQUFLLEVBQUUsRUFBRTtZQUNULEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7WUFDVCxFQUFFLEVBQUUsRUFBRTtZQUNOLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUlPLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixtQkFBYyxHQUFHLFNBQVMsQ0FBQztRQUMz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OzsyREFBNkI7QUFDNUI7SUFBUixLQUFLLEVBQUU7O2lEQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7aURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7b0RBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFOztvREFBa0I7QUFFaEI7SUFBVCxNQUFNLEVBQUU7c0NBQVMsWUFBWTsrQ0FBa0M7QUFDdEQ7SUFBVCxNQUFNLEVBQUU7c0NBQVMsWUFBWTsrQ0FBa0M7QUFDdEQ7SUFBVCxNQUFNLEVBQUU7c0NBQVcsWUFBWTtpREFBZ0M7QUFDdEQ7SUFBVCxNQUFNLEVBQUU7c0NBQWEsWUFBWTttREFBZ0M7QUFDeEQ7SUFBVCxNQUFNLEVBQUU7c0NBQVEsWUFBWTs4Q0FBZ0M7QUFHcEI7SUFBeEMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzs7c0RBQW9CO0FBQ3BCO0lBQXZDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7c0NBQVcsdUJBQXVCO2lEQUFDO0FBQy9CO0lBQTFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7O29EQUFrQjtBQWxDbkQsZUFBZTtJQVIzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixpNEVBQXNDO1FBRXRDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1FBQ2xDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUY1QixLQUFLO0tBR2pCLENBQUM7R0FFVyxlQUFlLENBb2UzQjtTQXBlWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEV4aXN0aW5nUHJvdmlkZXIsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIGZvcndhcmRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTVFlMRSB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudC5zdHlsZSc7XHJcbmltcG9ydCB7IFNlbGVjdERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xyXG5pbXBvcnQgeyBPcHRpb25MaXN0IH0gZnJvbSAnLi9vcHRpb24tbGlzdCc7XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1ibG9ja1xyXG5leHBvcnQgY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBFeGlzdGluZ1Byb3ZpZGVyID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZy1zZWxlY3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFtTVFlMRV0sXHJcbiAgICBwcm92aWRlcnM6IFtTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudFxyXG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQge1xyXG4gICAgLyoqIEtleXMuICoqL1xyXG5cclxuICAgIHByaXZhdGUgS0VZUzogYW55ID0ge1xyXG4gICAgICAgIEJBQ0tTUEFDRTogOCxcclxuICAgICAgICBUQUI6IDksXHJcbiAgICAgICAgRU5URVI6IDEzLFxyXG4gICAgICAgIEVTQzogMjcsXHJcbiAgICAgICAgU1BBQ0U6IDMyLFxyXG4gICAgICAgIFVQOiAzOCxcclxuICAgICAgICBET1dOOiA0MFxyXG4gICAgfTtcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIEBJbnB1dCgpIGFsbG93Q2xlYXIgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRDb2xvciA9ICcjMjE5NmYzJztcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodFRleHRDb2xvciA9ICcjZmZmJztcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBub0ZpbHRlciA9IDA7XHJcbiAgICBASW5wdXQoKSBub3RGb3VuZE1zZyA9ICdObyByZXN1bHRzIGZvdW5kJztcclxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9wZW5lZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGNsb3NlZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIGRlc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgdHlwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdGlvbicsIHtzdGF0aWM6IGZhbHNlfSkgc2VsZWN0aW9uU3BhbjogYW55O1xyXG4gICAgQFZpZXdDaGlsZCgnZHJvcGRvd24nLCB7c3RhdGljOiBmYWxzZX0pIGRyb3Bkb3duOiBTZWxlY3REcm9wZG93bkNvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0Jywge3N0YXRpYzogZmFsc2V9KSBmaWx0ZXJJbnB1dDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBvcHRpb25MaXN0OiBPcHRpb25MaXN0O1xyXG5cclxuICAgIC8vIFNlbGVjdGlvbiBzdGF0ZSB2YXJpYWJsZXMuXHJcbiAgICBoYXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFZpZXcgc3RhdGUgdmFyaWFibGVzLlxyXG4gICAgZmlsdGVyRW5hYmxlZCA9IHRydWU7XHJcbiAgICBmaWx0ZXJJbnB1dFdpZHRoID0gMTtcclxuICAgIGhhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICBpc0JlbG93ID0gdHJ1ZTtcclxuICAgIGlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGlzT3BlbiA9IGZhbHNlO1xyXG4gICAgcGxhY2Vob2xkZXJWaWV3ID0gJyc7XHJcblxyXG4gICAgY2xlYXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICBzZWxlY3RDb250YWluZXJDbGlja2VkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gV2lkdGggYW5kIHBvc2l0aW9uIGZvciB0aGUgZHJvcGRvd24gY29udGFpbmVyLlxyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIHRvcDogbnVtYmVyO1xyXG4gICAgbGVmdDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcbiAgICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcclxuXHJcbiAgICAvKiogRXZlbnQgaGFuZGxlcnMuICoqL1xyXG5cclxuICAgIC8vIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2tzLlxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJWaWV3ID0gdGhpcy5wbGFjZWhvbGRlcjtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zTGlzdChjaGFuZ2VzWydvcHRpb25zJ10uaXNGaXJzdENoYW5nZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ25vRmlsdGVyJykpIHtcclxuICAgICAgICAgICAgY29uc3QgbnVtT3B0aW9uczogbnVtYmVyID0gdGhpcy5vcHRpb25MaXN0Lm9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5OdW1PcHRpb25zOiBudW1iZXIgPSBjaGFuZ2VzWydub0ZpbHRlciddLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJFbmFibGVkID0gbnVtT3B0aW9ucyA+PSBtaW5OdW1PcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBXaW5kb3cuXHJcblxyXG4gICAgb25XaW5kb3dDbGljaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhckNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VsZWN0IGNvbnRhaW5lci5cclxuXHJcbiAgICBvblNlbGVjdENvbnRhaW5lckNsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5jbGVhckNsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdENvbnRhaW5lckZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERyb3Bkb3duIGNvbnRhaW5lci5cclxuXHJcbiAgICBvbkRyb3Bkb3duT3B0aW9uQ2xpY2tlZChvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGUgP1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb24pIDogdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3Bkb3duQ2xvc2UoZm9jdXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bihmb2N1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luZ2xlIGZpbHRlciBpbnB1dC5cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlckNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJJbnB1dCh0ZXJtOiBzdHJpbmcpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRlcm0ubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlZC5lbWl0KHRlcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyKHRlcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNdWx0aXBsZSBmaWx0ZXIgaW5wdXQuXHJcblxyXG4gICAgb25NdWx0aXBsZUZpbHRlcklucHV0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcihldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luZ2xlIGNsZWFyIHNlbGVjdC5cclxuXHJcbiAgICBvbkNsZWFyU2VsZWN0aW9uQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE11bHRpcGxlIGRlc2VsZWN0IG9wdGlvbi5cclxuXHJcbiAgICBvbkRlc2VsZWN0T3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBUEkuICoqL1xyXG5cclxuICAgIC8vIFRPRE8gZml4IGlzc3VlcyB3aXRoIGdsb2JhbCBjbGljay9rZXkgaGFuZGxlciB0aGF0IGNsb3NlcyB0aGUgZHJvcGRvd24uXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmdldE9wdGlvbnNCeVZhbHVlKHZhbHVlKS5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgbWV0aG9kcy4gKiovXHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWYWx1ZS4gKiovXHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl92YWx1ZSA6IHRoaXMuX3ZhbHVlWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsIHx8IHYgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHYgPSBbXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2ID0gW3ZdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghT3B0aW9uTGlzdC5lcXVhbFZhbHVlcyh2LCB0aGlzLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWx1ZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLm9wdGlvbkxpc3QudmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuaGFzU2VsZWN0ZWQgPSB0aGlzLl92YWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJWaWV3ID0gdGhpcy5oYXNTZWxlY3RlZCA/ICcnIDogdGhpcy5wbGFjZWhvbGRlcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEluaXRpYWxpemF0aW9uLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnNMaXN0KGZpcnN0VGltZTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCB2OiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBpZiAoIWZpcnN0VGltZSkge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy5vcHRpb25MaXN0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0ID0gbmV3IE9wdGlvbkxpc3QodGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERyb3Bkb3duLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIHRvZ2dsZURyb3Bkb3duKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuRHJvcGRvd24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpZHRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLmVtaXQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgIHByaXZhdGUgY2xvc2VEcm9wZG93bihmb2N1czogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIC8qKiBTZWxlY3QuICoqL1xyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LnNlbGVjdChvcHRpb24sIHRoaXMubXVsdGlwbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQob3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpKTtcclxuICAgICAgICAgICAgLy8gSXMgdGhpcyBub3QgYWxscmVhZHkgZG9uZSB3aGVuIHNldHRpbmcgdGhlIHZhbHVlPz9cclxuICAgICAgICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZGVzZWxlY3Qob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQob3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbigpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb246IEFycmF5PE9wdGlvbj4gPSB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0aW9uO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChzZWxlY3Rpb25bMF0udW5kZWNvcmF0ZWRDb3B5KCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQoc2VsZWN0aW9uLm1hcCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi51bmRlY29yYXRlZENvcHkoKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA/XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKSA6IHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpIHtcclxuICAgICAgICBjb25zdCBvcHRpb246IE9wdGlvbiA9IHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRlZE9wdGlvbjtcclxuICAgICAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdExhc3QoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsOiBBcnJheTxPcHRpb24+ID0gdGhpcy5vcHRpb25MaXN0LnNlbGVjdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKHNlbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gc2VsW3NlbC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnNldE11bHRpcGxlRmlsdGVySW5wdXQob3B0aW9uLmxhYmVsICsgJyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEZpbHRlci4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhckZpbHRlcklucHV0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmNsZWFyRmlsdGVySW5wdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRNdWx0aXBsZUZpbHRlcklucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHxcclxuICAgICAgICAgICAgICAgIChrZXkgPT09IHRoaXMuS0VZUy5VUCAmJiBldmVudC5hbHRLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuVEFCKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FTlRFUikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLlVQKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0UHJldmlvdXNPcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5ET1dOKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0TmV4dE9wdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSIHx8IGtleSA9PT0gdGhpcy5LRVlTLlNQQUNFIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5ID09PSB0aGlzLktFWVMuRE9XTiAmJiBldmVudC5hbHRLZXkpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogRklSRUZPWCBIQUNLOlxyXG4gICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAqIFRoZSBzZXRUaW1lb3V0IGlzIGFkZGVkIHRvIHByZXZlbnQgdGhlIGVudGVyIGtleWRvd24gZXZlbnRcclxuICAgICAgICAgICAgICAgICAqIHRvIGJlIHRyaWdnZXJlZCBmb3IgdGhlIGZpbHRlciBpbnB1dCBmaWVsZCwgd2hpY2ggY2F1c2VzXHJcbiAgICAgICAgICAgICAgICAgKiB0aGUgZHJvcGRvd24gdG8gYmUgY2xvc2VkIGFnYWluLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5vcGVuRHJvcGRvd24oKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuXHJcbiAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkJBQ0tTUEFDRSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNTZWxlY3RlZCAmJiB0aGlzLmZpbHRlckVuYWJsZWQgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RMYXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuXHJcbiAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVTQyB8fCBrZXkgPT09IHRoaXMuS0VZUy5UQUJcclxuICAgICAgICAgICAgfHwga2V5ID09PSB0aGlzLktFWVMuVVAgfHwga2V5ID09PSB0aGlzLktFWVMuRE9XTlxyXG4gICAgICAgICAgICB8fCBrZXkgPT09IHRoaXMuS0VZUy5FTlRFUikge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVmlldy4gKiovXHJcblxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJsdXIoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVXaWR0aCgpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMubGVmdCA9IGUub2Zmc2V0TGVmdDtcclxuICAgICAgICB0aGlzLnRvcCA9IGUub2Zmc2V0VG9wICsgZS5vZmZzZXRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmlsdGVyV2lkdGgoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0V2lkdGggPSB2YWx1ZS5sZW5ndGggPT09IDAgP1xyXG4gICAgICAgICAgICAgICAgMSArIHRoaXMucGxhY2Vob2xkZXJWaWV3Lmxlbmd0aCAqIDEwIDogMSArIHZhbHVlLmxlbmd0aCAqIDEwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=