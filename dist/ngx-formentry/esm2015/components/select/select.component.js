/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STYLE } from './select.component.style';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
/** @type {?} */
export const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};
export class SelectComponent {
    constructor() {
        /** Keys. **/
        /**
         * Keys. *
         */
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
    /**
     * Event handlers. *
     * @return {?}
     */
    // Angular lifecycle hooks.
    ngOnInit() {
        this.placeholderView = this.placeholder;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateFilterWidth();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
        if (changes.hasOwnProperty('noFilter')) {
            /** @type {?} */
            const numOptions = this.optionList.options.length;
            /** @type {?} */
            const minNumOptions = changes['noFilter'].currentValue;
            this.filterEnabled = numOptions >= minNumOptions;
        }
    }
    // Window.
    /**
     * @return {?}
     */
    onWindowClick() {
        if (!this.selectContainerClicked) {
            this.closeDropdown();
        }
        this.clearClicked = false;
        this.selectContainerClicked = false;
    }
    /**
     * @return {?}
     */
    onWindowResize() {
        this.updateWidth();
    }
    // Select container.
    /**
     * @param {?} event
     * @return {?}
     */
    onSelectContainerClick(event) {
        this.selectContainerClicked = true;
        if (!this.clearClicked) {
            this.toggleDropdown();
        }
    }
    /**
     * @return {?}
     */
    onSelectContainerFocus() {
        this.onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSelectContainerKeydown(event) {
        this.handleSelectContainerKeydown(event);
    }
    // Dropdown container.
    /**
     * @param {?} option
     * @return {?}
     */
    onDropdownOptionClicked(option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    onDropdownClose(focus) {
        this.closeDropdown(focus);
    }
    // Single filter input.
    /**
     * @return {?}
     */
    onSingleFilterClick() {
        this.selectContainerClicked = true;
    }
    /**
     * @param {?} term
     * @return {?}
     */
    onSingleFilterInput(term) {
        setTimeout(() => {
            if (term.length > 2) {
                this.typed.emit(term);
            }
        }, 500);
        this.optionList.filter(term);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSingleFilterKeydown(event) {
        this.handleSingleFilterKeydown(event);
    }
    // Multiple filter input.
    /**
     * @param {?} event
     * @return {?}
     */
    onMultipleFilterInput(event) {
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        setTimeout(() => {
            this.optionList.filter(event.target.value);
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMultipleFilterKeydown(event) {
        this.handleMultipleFilterKeydown(event);
    }
    // Single clear select.
    /**
     * @param {?} event
     * @return {?}
     */
    onClearSelectionClick(event) {
        this.clearClicked = true;
        this.clearSelection();
        this.closeDropdown(true);
    }
    // Multiple deselect option.
    /**
     * @param {?} option
     * @return {?}
     */
    onDeselectOptionClick(option) {
        this.clearClicked = true;
        this.deselectOption(option);
    }
    /**
     * API. *
     * @return {?}
     */
    // TODO fix issues with global click/key handler that closes the dropdown.
    open() {
        this.openDropdown();
    }
    /**
     * @return {?}
     */
    close() {
        this.closeDropdown();
    }
    /**
     * @return {?}
     */
    clear() {
        this.clearSelection();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    select(value) {
        this.optionList.getOptionsByValue(value).forEach((option) => {
            this.selectOption(option);
        });
        this.valueChanged();
    }
    /**
     * ControlValueAccessor interface methods. *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Value. *
     * @return {?}
     */
    get value() {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this.multiple ? this._value : this._value[0];
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
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
    /**
     * @private
     * @return {?}
     */
    valueChanged() {
        this._value = this.optionList.value;
        this.hasSelected = this._value.length > 0;
        this.placeholderView = this.hasSelected ? '' : this.placeholder;
        this.updateFilterWidth();
        this.onChange(this.value);
    }
    /**
     * Initialization. *
     * @private
     * @param {?} firstTime
     * @return {?}
     */
    updateOptionsList(firstTime) {
        /** @type {?} */
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
    /**
     * Dropdown. *
     * @private
     * @return {?}
     */
    toggleDropdown() {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    }
    /**
     * @private
     * @return {?}
     */
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
    /**
     * @private
     * @param {?=} focus
     * @return {?}
     */
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
    /**
     * Select. *
     * @private
     * @param {?} option
     * @return {?}
     */
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
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
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
    /**
     * @private
     * @return {?}
     */
    clearSelection() {
        /** @type {?} */
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
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    toggleSelectOption(option) {
        option.selected ?
            this.deselectOption(option) : this.selectOption(option);
    }
    /**
     * @private
     * @return {?}
     */
    selectHighlightedOption() {
        /** @type {?} */
        const option = this.optionList.highlightedOption;
        if (option !== null) {
            this.selectOption(option);
            this.closeDropdown(true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    deselectLast() {
        /** @type {?} */
        const sel = this.optionList.selection;
        if (sel.length > 0) {
            /** @type {?} */
            const option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    }
    /**
     * Filter. *
     * @private
     * @return {?}
     */
    clearFilterInput() {
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
        else {
            this.dropdown.clearFilterInput();
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setMultipleFilterInput(value) {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = value;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleSelectContainerKeydown(event) {
        /** @type {?} */
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
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleMultipleFilterKeydown(event) {
        /** @type {?} */
        const key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected && this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleSingleFilterKeydown(event) {
        /** @type {?} */
        const key = event.which;
        if (key === this.KEYS.ESC || key === this.KEYS.TAB
            || key === this.KEYS.UP || key === this.KEYS.DOWN
            || key === this.KEYS.ENTER) {
            this.handleSelectContainerKeydown(event);
        }
    }
    /**
     * View. *
     * @return {?}
     */
    focus() {
        this.hasFocus = true;
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
        else {
            this.selectionSpan.nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    blur() {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    }
    /**
     * @return {?}
     */
    updateWidth() {
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    }
    /**
     * @return {?}
     */
    updatePosition() {
        /** @type {?} */
        const e = this.selectionSpan.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    }
    /**
     * @return {?}
     */
    updateFilterWidth() {
        if (typeof this.filterInput !== 'undefined') {
            /** @type {?} */
            const value = this.filterInput.nativeElement.value;
            this.filterInputWidth = value.length === 0 ?
                1 + this.placeholderView.length * 10 : 1 + value.length * 10;
        }
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-select',
                template: "<div\n    #selection\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [ngClass]=\"{'open': isOpen, 'focus': hasFocus, 'below': isBelow, 'disabled': disabled}\"\n    (click)=\"onSelectContainerClick($event)\"\n    (focus)=\"onSelectContainerFocus()\"\n    (keydown)=\"onSelectContainerKeydown($event)\"\n    (window:click)=\"onWindowClick()\"\n    (window:resize)=\"onWindowResize()\">\n\n    <div class=\"single\"\n        *ngIf=\"!multiple\">\n        <div class=\"value\"\n            *ngIf=\"optionList.hasSelected()\">\n            {{optionList.selection[0].label}}\n        </div>\n        <div class=\"placeholder\"\n            *ngIf=\"!optionList.hasSelected()\">\n            {{placeholderView}}\n        </div>\n        <div class=\"clear\"\n            *ngIf=\"allowClear\"\n            (click)=\"onClearSelectionClick($event)\">\n            &#x2715;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"isOpen\">\n            &#x25B2;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"!isOpen\">\n            &#x25BC;\n        </div>\n    </div>\n\n    <div class=\"multiple\"\n        *ngIf=\"multiple\">\n        <div class=\"option\"\n            *ngFor=\"let option of optionList.selection\">\n            <span class=\"deselect-option\"\n                (click)=onDeselectOptionClick(option)>\n                &#x2715;\n            </span>\n            {{option.label}}\n        </div>\n        <input\n            *ngIf=\"filterEnabled\"\n            #filterInput\n            tabindex=\"-1\"\n            [placeholder]=\"placeholderView\"\n            [ngStyle]=\"{'width.px': filterInputWidth}\"\n            (input)=\"onMultipleFilterInput($event)\"\n            (keydown)=\"onMultipleFilterKeydown($event)\"/>\n    </div>\n\n</div>\n<select-dropdown\n    *ngIf=\"isOpen\"\n    #dropdown\n    [multiple]=\"multiple\"\n    [optionList]=\"optionList\"\n    [notFoundMsg]=\"notFoundMsg\"\n    [highlightColor]=\"highlightColor\"\n    [highlightTextColor]=\"highlightTextColor\"\n    [filterEnabled]=\"filterEnabled\"\n    [width]=\"width\"\n    [top]=\"top\"\n    [left]=\"left\"\n    (close)=\"onDropdownClose($event)\"\n    (optionClicked)=\"onDropdownOptionClicked($event)\"\n    (singleFilterClick)=\"onSingleFilterClick()\"\n    (singleFilterInput)=\"onSingleFilterInput($event)\"\n    (singleFilterKeydown)=\"onSingleFilterKeydown($event)\">\n</select-dropdown>\n",
                providers: [SELECT_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                styles: [STYLE]
            }] }
];
SelectComponent.propDecorators = {
    options: [{ type: Input }],
    allowClear: [{ type: Input }],
    disabled: [{ type: Input }],
    highlightColor: [{ type: Input }],
    highlightTextColor: [{ type: Input }],
    multiple: [{ type: Input }],
    noFilter: [{ type: Input }],
    notFoundMsg: [{ type: Input }],
    placeholder: [{ type: Input }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    selected: [{ type: Output }],
    deselected: [{ type: Output }],
    typed: [{ type: Output }],
    selectionSpan: [{ type: ViewChild, args: ['selection',] }],
    dropdown: [{ type: ViewChild, args: ['dropdown',] }],
    filterInput: [{ type: ViewChild, args: ['filterInput',] }]
};
if (false) {
    /**
     * Keys. *
     * @type {?}
     * @private
     */
    SelectComponent.prototype.KEYS;
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.allowClear;
    /** @type {?} */
    SelectComponent.prototype.disabled;
    /** @type {?} */
    SelectComponent.prototype.highlightColor;
    /** @type {?} */
    SelectComponent.prototype.highlightTextColor;
    /** @type {?} */
    SelectComponent.prototype.multiple;
    /** @type {?} */
    SelectComponent.prototype.noFilter;
    /** @type {?} */
    SelectComponent.prototype.notFoundMsg;
    /** @type {?} */
    SelectComponent.prototype.placeholder;
    /** @type {?} */
    SelectComponent.prototype.opened;
    /** @type {?} */
    SelectComponent.prototype.closed;
    /** @type {?} */
    SelectComponent.prototype.selected;
    /** @type {?} */
    SelectComponent.prototype.deselected;
    /** @type {?} */
    SelectComponent.prototype.typed;
    /** @type {?} */
    SelectComponent.prototype.selectionSpan;
    /** @type {?} */
    SelectComponent.prototype.dropdown;
    /** @type {?} */
    SelectComponent.prototype.filterInput;
    /**
     * @type {?}
     * @private
     */
    SelectComponent.prototype._value;
    /** @type {?} */
    SelectComponent.prototype.optionList;
    /** @type {?} */
    SelectComponent.prototype.hasSelected;
    /** @type {?} */
    SelectComponent.prototype.filterEnabled;
    /** @type {?} */
    SelectComponent.prototype.filterInputWidth;
    /** @type {?} */
    SelectComponent.prototype.hasFocus;
    /** @type {?} */
    SelectComponent.prototype.isBelow;
    /** @type {?} */
    SelectComponent.prototype.isDisabled;
    /** @type {?} */
    SelectComponent.prototype.isOpen;
    /** @type {?} */
    SelectComponent.prototype.placeholderView;
    /** @type {?} */
    SelectComponent.prototype.clearClicked;
    /** @type {?} */
    SelectComponent.prototype.selectContainerClicked;
    /** @type {?} */
    SelectComponent.prototype.width;
    /** @type {?} */
    SelectComponent.prototype.top;
    /** @type {?} */
    SelectComponent.prototype.left;
    /**
     * @type {?}
     * @private
     */
    SelectComponent.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    SelectComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLE9BQU8scUJBQXFCLEdBQXFCO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDOUMsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQVVELE1BQU0sT0FBTyxlQUFlO0lBUjVCO1FBVUksYUFBYTs7OztRQUVMLFNBQUksR0FBUTtZQUNoQixTQUFTLEVBQUUsQ0FBQztZQUNaLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLEVBQUU7WUFDVCxHQUFHLEVBQUUsRUFBRTtZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFJTyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsbUJBQWMsR0FBRyxTQUFTLENBQUM7UUFDM0IsdUJBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxL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YTs7Ozs7Ozs7SUE5QnhCLCtCQVFFOztJQUVGLGtDQUE2Qjs7SUFFN0IscUNBQTRCOztJQUM1QixtQ0FBMEI7O0lBQzFCLHlDQUFvQzs7SUFDcEMsNkNBQXFDOztJQUNyQyxtQ0FBMEI7O0lBQzFCLG1DQUFzQjs7SUFDdEIsc0NBQTBDOztJQUMxQyxzQ0FBMEI7O0lBRTFCLGlDQUFnRTs7SUFDaEUsaUNBQWdFOztJQUNoRSxtQ0FBZ0U7O0lBQ2hFLHFDQUFrRTs7SUFDbEUsZ0NBQTZEOztJQUc3RCx3Q0FBMkM7O0lBQzNDLG1DQUF5RDs7SUFDekQsc0NBQTJDOzs7OztJQUUzQyxpQ0FBZ0M7O0lBQ2hDLHFDQUF1Qjs7SUFHdkIsc0NBQW9COztJQUdwQix3Q0FBcUI7O0lBQ3JCLDJDQUFxQjs7SUFDckIsbUNBQWlCOztJQUNqQixrQ0FBZTs7SUFDZixxQ0FBbUI7O0lBQ25CLGlDQUFlOztJQUNmLDBDQUFxQjs7SUFFckIsdUNBQXFCOztJQUNyQixpREFBK0I7O0lBRy9CLGdDQUFjOztJQUNkLDhCQUFZOztJQUNaLCtCQUFhOzs7OztJQUViLG1DQUFtQzs7Ozs7SUFDbkMsb0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEV4aXN0aW5nUHJvdmlkZXIsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIGZvcndhcmRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTVFlMRSB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudC5zdHlsZSc7XHJcbmltcG9ydCB7IFNlbGVjdERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xyXG5pbXBvcnQgeyBPcHRpb25MaXN0IH0gZnJvbSAnLi9vcHRpb24tbGlzdCc7XHJcblxyXG5leHBvcnQgY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBFeGlzdGluZ1Byb3ZpZGVyID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZy1zZWxlY3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZXM6IFtTVFlMRV0sXHJcbiAgICBwcm92aWRlcnM6IFtTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudFxyXG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQge1xyXG4gICAgLyoqIEtleXMuICoqL1xyXG5cclxuICAgIHByaXZhdGUgS0VZUzogYW55ID0ge1xyXG4gICAgICAgIEJBQ0tTUEFDRTogOCxcclxuICAgICAgICBUQUI6IDksXHJcbiAgICAgICAgRU5URVI6IDEzLFxyXG4gICAgICAgIEVTQzogMjcsXHJcbiAgICAgICAgU1BBQ0U6IDMyLFxyXG4gICAgICAgIFVQOiAzOCxcclxuICAgICAgICBET1dOOiA0MFxyXG4gICAgfTtcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIEBJbnB1dCgpIGFsbG93Q2xlYXIgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRDb2xvciA9ICcjMjE5NmYzJztcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodFRleHRDb2xvciA9ICcjZmZmJztcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBub0ZpbHRlciA9IDA7XHJcbiAgICBASW5wdXQoKSBub3RGb3VuZE1zZyA9ICdObyByZXN1bHRzIGZvdW5kJztcclxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9wZW5lZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGNsb3NlZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIGRlc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgdHlwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdGlvbicpIHNlbGVjdGlvblNwYW46IGFueTtcclxuICAgIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duJykgZHJvcGRvd246IFNlbGVjdERyb3Bkb3duQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKSBmaWx0ZXJJbnB1dDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBvcHRpb25MaXN0OiBPcHRpb25MaXN0O1xyXG5cclxuICAgIC8vIFNlbGVjdGlvbiBzdGF0ZSB2YXJpYWJsZXMuXHJcbiAgICBoYXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFZpZXcgc3RhdGUgdmFyaWFibGVzLlxyXG4gICAgZmlsdGVyRW5hYmxlZCA9IHRydWU7XHJcbiAgICBmaWx0ZXJJbnB1dFdpZHRoID0gMTtcclxuICAgIGhhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICBpc0JlbG93ID0gdHJ1ZTtcclxuICAgIGlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGlzT3BlbiA9IGZhbHNlO1xyXG4gICAgcGxhY2Vob2xkZXJWaWV3ID0gJyc7XHJcblxyXG4gICAgY2xlYXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICBzZWxlY3RDb250YWluZXJDbGlja2VkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gV2lkdGggYW5kIHBvc2l0aW9uIGZvciB0aGUgZHJvcGRvd24gY29udGFpbmVyLlxyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIHRvcDogbnVtYmVyO1xyXG4gICAgbGVmdDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcbiAgICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcclxuXHJcbiAgICAvKiogRXZlbnQgaGFuZGxlcnMuICoqL1xyXG5cclxuICAgIC8vIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2tzLlxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJWaWV3ID0gdGhpcy5wbGFjZWhvbGRlcjtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zTGlzdChjaGFuZ2VzWydvcHRpb25zJ10uaXNGaXJzdENoYW5nZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ25vRmlsdGVyJykpIHtcclxuICAgICAgICAgICAgY29uc3QgbnVtT3B0aW9uczogbnVtYmVyID0gdGhpcy5vcHRpb25MaXN0Lm9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5OdW1PcHRpb25zOiBudW1iZXIgPSBjaGFuZ2VzWydub0ZpbHRlciddLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJFbmFibGVkID0gbnVtT3B0aW9ucyA+PSBtaW5OdW1PcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBXaW5kb3cuXHJcblxyXG4gICAgb25XaW5kb3dDbGljaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhckNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VsZWN0IGNvbnRhaW5lci5cclxuXHJcbiAgICBvblNlbGVjdENvbnRhaW5lckNsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5jbGVhckNsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdENvbnRhaW5lckZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERyb3Bkb3duIGNvbnRhaW5lci5cclxuXHJcbiAgICBvbkRyb3Bkb3duT3B0aW9uQ2xpY2tlZChvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGUgP1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb24pIDogdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3Bkb3duQ2xvc2UoZm9jdXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bihmb2N1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luZ2xlIGZpbHRlciBpbnB1dC5cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlckNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJJbnB1dCh0ZXJtOiBzdHJpbmcpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRlcm0ubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlZC5lbWl0KHRlcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyKHRlcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNdWx0aXBsZSBmaWx0ZXIgaW5wdXQuXHJcblxyXG4gICAgb25NdWx0aXBsZUZpbHRlcklucHV0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcihldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luZ2xlIGNsZWFyIHNlbGVjdC5cclxuXHJcbiAgICBvbkNsZWFyU2VsZWN0aW9uQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE11bHRpcGxlIGRlc2VsZWN0IG9wdGlvbi5cclxuXHJcbiAgICBvbkRlc2VsZWN0T3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBUEkuICoqL1xyXG5cclxuICAgIC8vIFRPRE8gZml4IGlzc3VlcyB3aXRoIGdsb2JhbCBjbGljay9rZXkgaGFuZGxlciB0aGF0IGNsb3NlcyB0aGUgZHJvcGRvd24uXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmdldE9wdGlvbnNCeVZhbHVlKHZhbHVlKS5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgbWV0aG9kcy4gKiovXHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWYWx1ZS4gKiovXHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl92YWx1ZSA6IHRoaXMuX3ZhbHVlWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsIHx8IHYgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHYgPSBbXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2ID0gW3ZdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghT3B0aW9uTGlzdC5lcXVhbFZhbHVlcyh2LCB0aGlzLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWx1ZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLm9wdGlvbkxpc3QudmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuaGFzU2VsZWN0ZWQgPSB0aGlzLl92YWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJWaWV3ID0gdGhpcy5oYXNTZWxlY3RlZCA/ICcnIDogdGhpcy5wbGFjZWhvbGRlcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEluaXRpYWxpemF0aW9uLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnNMaXN0KGZpcnN0VGltZTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCB2OiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBpZiAoIWZpcnN0VGltZSkge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy5vcHRpb25MaXN0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0ID0gbmV3IE9wdGlvbkxpc3QodGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERyb3Bkb3duLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIHRvZ2dsZURyb3Bkb3duKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuRHJvcGRvd24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpZHRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3BlbmVkLmVtaXQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgIHByaXZhdGUgY2xvc2VEcm9wZG93bihmb2N1czogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIC8qKiBTZWxlY3QuICoqL1xyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LnNlbGVjdChvcHRpb24sIHRoaXMubXVsdGlwbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQob3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpKTtcclxuICAgICAgICAgICAgLy8gSXMgdGhpcyBub3QgYWxscmVhZHkgZG9uZSB3aGVuIHNldHRpbmcgdGhlIHZhbHVlPz9cclxuICAgICAgICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZGVzZWxlY3Qob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQob3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbigpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb246IEFycmF5PE9wdGlvbj4gPSB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0aW9uO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChzZWxlY3Rpb25bMF0udW5kZWNvcmF0ZWRDb3B5KCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQoc2VsZWN0aW9uLm1hcCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi51bmRlY29yYXRlZENvcHkoKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA/XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKSA6IHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpIHtcclxuICAgICAgICBjb25zdCBvcHRpb246IE9wdGlvbiA9IHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRlZE9wdGlvbjtcclxuICAgICAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdExhc3QoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsOiBBcnJheTxPcHRpb24+ID0gdGhpcy5vcHRpb25MaXN0LnNlbGVjdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKHNlbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gc2VsW3NlbC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnNldE11bHRpcGxlRmlsdGVySW5wdXQob3B0aW9uLmxhYmVsICsgJyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEZpbHRlci4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhckZpbHRlcklucHV0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmNsZWFyRmlsdGVySW5wdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRNdWx0aXBsZUZpbHRlcklucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHxcclxuICAgICAgICAgICAgICAgIChrZXkgPT09IHRoaXMuS0VZUy5VUCAmJiBldmVudC5hbHRLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuVEFCKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FTlRFUikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLlVQKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0UHJldmlvdXNPcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5ET1dOKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0TmV4dE9wdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSIHx8IGtleSA9PT0gdGhpcy5LRVlTLlNQQUNFIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5ID09PSB0aGlzLktFWVMuRE9XTiAmJiBldmVudC5hbHRLZXkpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogRklSRUZPWCBIQUNLOlxyXG4gICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAqIFRoZSBzZXRUaW1lb3V0IGlzIGFkZGVkIHRvIHByZXZlbnQgdGhlIGVudGVyIGtleWRvd24gZXZlbnRcclxuICAgICAgICAgICAgICAgICAqIHRvIGJlIHRyaWdnZXJlZCBmb3IgdGhlIGZpbHRlciBpbnB1dCBmaWVsZCwgd2hpY2ggY2F1c2VzXHJcbiAgICAgICAgICAgICAgICAgKiB0aGUgZHJvcGRvd24gdG8gYmUgY2xvc2VkIGFnYWluLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5vcGVuRHJvcGRvd24oKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuXHJcbiAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkJBQ0tTUEFDRSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNTZWxlY3RlZCAmJiB0aGlzLmZpbHRlckVuYWJsZWQgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RMYXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuXHJcbiAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVTQyB8fCBrZXkgPT09IHRoaXMuS0VZUy5UQUJcclxuICAgICAgICAgICAgfHwga2V5ID09PSB0aGlzLktFWVMuVVAgfHwga2V5ID09PSB0aGlzLktFWVMuRE9XTlxyXG4gICAgICAgICAgICB8fCBrZXkgPT09IHRoaXMuS0VZUy5FTlRFUikge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVmlldy4gKiovXHJcblxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJsdXIoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVXaWR0aCgpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMubGVmdCA9IGUub2Zmc2V0TGVmdDtcclxuICAgICAgICB0aGlzLnRvcCA9IGUub2Zmc2V0VG9wICsgZS5vZmZzZXRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmlsdGVyV2lkdGgoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0V2lkdGggPSB2YWx1ZS5sZW5ndGggPT09IDAgP1xyXG4gICAgICAgICAgICAgICAgMSArIHRoaXMucGxhY2Vob2xkZXJWaWV3Lmxlbmd0aCAqIDEwIDogMSArIHZhbHVlLmxlbmd0aCAqIDEwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=