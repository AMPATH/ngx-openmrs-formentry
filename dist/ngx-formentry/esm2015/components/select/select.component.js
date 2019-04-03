/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STYLE } from './select.component.style';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
/** @type {?} */
export const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => SelectComponent)),
    multi: true
};
export class SelectComponent {
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
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
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
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (term.length > 2) {
                this.typed.emit(term);
            }
        }), 500);
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
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.optionList.filter(event.target.value);
        }));
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
        this.optionList.getOptionsByValue(value).forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            this.selectOption(option);
        }));
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
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.multiple) {
                    // this.updateFilterWidth();
                    this.updatePosition();
                    this.optionList.highlight();
                    if (this.isOpen) {
                        this.dropdown.moveHighlightedIntoView();
                    }
                }
            }));
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
                this.deselected.emit(selection.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => {
                    return option.undecoratedCopy();
                })));
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
                setTimeout((/**
                 * @return {?}
                 */
                () => { this.openDropdown(); }));
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
                template: `<div
    #selection
    [attr.tabindex]="disabled ? null : 0"
    [ngClass]="{'open': isOpen, 'focus': hasFocus, 'below': isBelow, 'disabled': disabled}"
    (click)="onSelectContainerClick($event)"
    (focus)="onSelectContainerFocus()"
    (keydown)="onSelectContainerKeydown($event)"
    (window:click)="onWindowClick()"
    (window:resize)="onWindowResize()">

    <div class="single"
        *ngIf="!multiple">
        <div class="value"
            *ngIf="optionList.hasSelected()">
            {{optionList.selection[0].label}}
        </div>
        <div class="placeholder"
            *ngIf="!optionList.hasSelected()">
            {{placeholderView}}
        </div>
        <div class="clear"
            *ngIf="allowClear"
            (click)="onClearSelectionClick($event)">
            &#x2715;
        </div>
        <div class="toggle"
            *ngIf="isOpen">
            &#x25B2;
        </div>
        <div class="toggle"
            *ngIf="!isOpen">
            &#x25BC;
        </div>
    </div>

    <div class="multiple"
        *ngIf="multiple">
        <div class="option"
            *ngFor="let option of optionList.selection">
            <span class="deselect-option"
                (click)=onDeselectOptionClick(option)>
                &#x2715;
            </span>
            {{option.label}}
        </div>
        <input
            *ngIf="filterEnabled"
            #filterInput
            tabindex="-1"
            [placeholder]="placeholderView"
            [ngStyle]="{'width.px': filterInputWidth}"
            (input)="onMultipleFilterInput($event)"
            (keydown)="onMultipleFilterKeydown($event)"/>
    </div>

</div>
<select-dropdown
    *ngIf="isOpen"
    #dropdown
    [multiple]="multiple"
    [optionList]="optionList"
    [notFoundMsg]="notFoundMsg"
    [highlightColor]="highlightColor"
    [highlightTextColor]="highlightTextColor"
    [filterEnabled]="filterEnabled"
    [width]="width"
    [top]="top"
    [left]="left"
    (close)="onDropdownClose($event)"
    (optionClicked)="onDropdownOptionClicked($event)"
    (singleFilterClick)="onSingleFilterClick()"
    (singleFilterInput)="onSingleFilterInput($event)"
    (singleFilterKeydown)="onSingleFilterKeydown($event)">
</select-dropdown>
`,
                styles: [STYLE],
                providers: [SELECT_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None
            },] },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLE9BQU8scUJBQXFCLEdBQXFCO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNkO0FBb0ZELE1BQU07SUFsRk47UUFvRkksYUFBYTtRQUVMLFNBQUksR0FBUTtZQUNoQixTQUFTLEVBQUUsQ0FBQztZQUNaLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLEVBQUU7WUFDVCxHQUFHLEVBQUUsRUFBRTtZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFJTyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsbUJBQWMsR0FBRyxTQUFTLENBQUM7UUFDM0IsdUJBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxLQUFLLENBQUM7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ZCw4QkFBWTs7SUFDWiwrQkFBYTs7Ozs7SUFFYixtQ0FBbUM7Ozs7O0lBQ25DLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBFeGlzdGluZ1Byb3ZpZGVyLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgICBmb3J3YXJkUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU1RZTEUgfSBmcm9tICcuL3NlbGVjdC5jb21wb25lbnQuc3R5bGUnO1xyXG5pbXBvcnQgeyBTZWxlY3REcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcclxuaW1wb3J0IHsgT3B0aW9uTGlzdCB9IGZyb20gJy4vb3B0aW9uLWxpc3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogRXhpc3RpbmdQcm92aWRlciA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdlxyXG4gICAgI3NlbGVjdGlvblxyXG4gICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXHJcbiAgICBbbmdDbGFzc109XCJ7J29wZW4nOiBpc09wZW4sICdmb2N1cyc6IGhhc0ZvY3VzLCAnYmVsb3cnOiBpc0JlbG93LCAnZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxyXG4gICAgKGNsaWNrKT1cIm9uU2VsZWN0Q29udGFpbmVyQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAoZm9jdXMpPVwib25TZWxlY3RDb250YWluZXJGb2N1cygpXCJcclxuICAgIChrZXlkb3duKT1cIm9uU2VsZWN0Q29udGFpbmVyS2V5ZG93bigkZXZlbnQpXCJcclxuICAgICh3aW5kb3c6Y2xpY2spPVwib25XaW5kb3dDbGljaygpXCJcclxuICAgICh3aW5kb3c6cmVzaXplKT1cIm9uV2luZG93UmVzaXplKClcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwic2luZ2xlXCJcclxuICAgICAgICAqbmdJZj1cIiFtdWx0aXBsZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZVwiXHJcbiAgICAgICAgICAgICpuZ0lmPVwib3B0aW9uTGlzdC5oYXNTZWxlY3RlZCgpXCI+XHJcbiAgICAgICAgICAgIHt7b3B0aW9uTGlzdC5zZWxlY3Rpb25bMF0ubGFiZWx9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgICAgICpuZ0lmPVwiIW9wdGlvbkxpc3QuaGFzU2VsZWN0ZWQoKVwiPlxyXG4gICAgICAgICAgICB7e3BsYWNlaG9sZGVyVmlld319XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyXCJcclxuICAgICAgICAgICAgKm5nSWY9XCJhbGxvd0NsZWFyXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xlYXJTZWxlY3Rpb25DbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICYjeDI3MTU7XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZVwiXHJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNPcGVuXCI+XHJcbiAgICAgICAgICAgICYjeDI1QjI7XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZVwiXHJcbiAgICAgICAgICAgICpuZ0lmPVwiIWlzT3BlblwiPlxyXG4gICAgICAgICAgICAmI3gyNUJDO1xyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm11bHRpcGxlXCJcclxuICAgICAgICAqbmdJZj1cIm11bHRpcGxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uTGlzdC5zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNlbGVjdC1vcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1vbkRlc2VsZWN0T3B0aW9uQ2xpY2sob3B0aW9uKT5cclxuICAgICAgICAgICAgICAgICYjeDI3MTU7XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlckVuYWJsZWRcIlxyXG4gICAgICAgICAgICAjZmlsdGVySW5wdXRcclxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclZpZXdcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7J3dpZHRoLnB4JzogZmlsdGVySW5wdXRXaWR0aH1cIlxyXG4gICAgICAgICAgICAoaW5wdXQpPVwib25NdWx0aXBsZUZpbHRlcklucHV0KCRldmVudClcIlxyXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJvbk11bHRpcGxlRmlsdGVyS2V5ZG93bigkZXZlbnQpXCIvPlxyXG4gICAgPC9kaXY+XHJcblxyXG48L2Rpdj5cclxuPHNlbGVjdC1kcm9wZG93blxyXG4gICAgKm5nSWY9XCJpc09wZW5cIlxyXG4gICAgI2Ryb3Bkb3duXHJcbiAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxyXG4gICAgW29wdGlvbkxpc3RdPVwib3B0aW9uTGlzdFwiXHJcbiAgICBbbm90Rm91bmRNc2ddPVwibm90Rm91bmRNc2dcIlxyXG4gICAgW2hpZ2hsaWdodENvbG9yXT1cImhpZ2hsaWdodENvbG9yXCJcclxuICAgIFtoaWdobGlnaHRUZXh0Q29sb3JdPVwiaGlnaGxpZ2h0VGV4dENvbG9yXCJcclxuICAgIFtmaWx0ZXJFbmFibGVkXT1cImZpbHRlckVuYWJsZWRcIlxyXG4gICAgW3dpZHRoXT1cIndpZHRoXCJcclxuICAgIFt0b3BdPVwidG9wXCJcclxuICAgIFtsZWZ0XT1cImxlZnRcIlxyXG4gICAgKGNsb3NlKT1cIm9uRHJvcGRvd25DbG9zZSgkZXZlbnQpXCJcclxuICAgIChvcHRpb25DbGlja2VkKT1cIm9uRHJvcGRvd25PcHRpb25DbGlja2VkKCRldmVudClcIlxyXG4gICAgKHNpbmdsZUZpbHRlckNsaWNrKT1cIm9uU2luZ2xlRmlsdGVyQ2xpY2soKVwiXHJcbiAgICAoc2luZ2xlRmlsdGVySW5wdXQpPVwib25TaW5nbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcclxuICAgIChzaW5nbGVGaWx0ZXJLZXlkb3duKT1cIm9uU2luZ2xlRmlsdGVyS2V5ZG93bigkZXZlbnQpXCI+XHJcbjwvc2VsZWN0LWRyb3Bkb3duPlxyXG5gLFxyXG4gICAgc3R5bGVzOiBbU1RZTEVdLFxyXG4gICAgcHJvdmlkZXJzOiBbU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnRcclxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIC8qKiBLZXlzLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIEtFWVM6IGFueSA9IHtcclxuICAgICAgICBCQUNLU1BBQ0U6IDgsXHJcbiAgICAgICAgVEFCOiA5LFxyXG4gICAgICAgIEVOVEVSOiAxMyxcclxuICAgICAgICBFU0M6IDI3LFxyXG4gICAgICAgIFNQQUNFOiAzMixcclxuICAgICAgICBVUDogMzgsXHJcbiAgICAgICAgRE9XTjogNDBcclxuICAgIH07XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcclxuXHJcbiAgICBASW5wdXQoKSBhbGxvd0NsZWFyID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0Q29sb3IgPSAnIzIxOTZmMyc7XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRUZXh0Q29sb3IgPSAnI2ZmZic7XHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgbm9GaWx0ZXIgPSAwO1xyXG4gICAgQElucHV0KCkgbm90Rm91bmRNc2cgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBkZXNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIHR5cGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuXHJcbiAgICBAVmlld0NoaWxkKCdzZWxlY3Rpb24nKSBzZWxlY3Rpb25TcGFuOiBhbnk7XHJcbiAgICBAVmlld0NoaWxkKCdkcm9wZG93bicpIGRyb3Bkb3duOiBTZWxlY3REcm9wZG93bkNvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0JykgZmlsdGVySW5wdXQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcclxuXHJcbiAgICAvLyBTZWxlY3Rpb24gc3RhdGUgdmFyaWFibGVzLlxyXG4gICAgaGFzU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBWaWV3IHN0YXRlIHZhcmlhYmxlcy5cclxuICAgIGZpbHRlckVuYWJsZWQgPSB0cnVlO1xyXG4gICAgZmlsdGVySW5wdXRXaWR0aCA9IDE7XHJcbiAgICBoYXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgaXNCZWxvdyA9IHRydWU7XHJcbiAgICBpc0Rpc2FibGVkID0gZmFsc2U7XHJcbiAgICBpc09wZW4gPSBmYWxzZTtcclxuICAgIHBsYWNlaG9sZGVyVmlldyA9ICcnO1xyXG5cclxuICAgIGNsZWFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFdpZHRoIGFuZCBwb3NpdGlvbiBmb3IgdGhlIGRyb3Bkb3duIGNvbnRhaW5lci5cclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICB0b3A6IG51bWJlcjtcclxuICAgIGxlZnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IH07XHJcblxyXG4gICAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cclxuXHJcbiAgICAvLyBBbmd1bGFyIGxpZmVjeWNsZSBob29rcy5cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMucGxhY2Vob2xkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uc0xpc3QoY2hhbmdlc1snb3B0aW9ucyddLmlzRmlyc3RDaGFuZ2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdub0ZpbHRlcicpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bU9wdGlvbnM6IG51bWJlciA9IHRoaXMub3B0aW9uTGlzdC5vcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgbWluTnVtT3B0aW9uczogbnVtYmVyID0gY2hhbmdlc1snbm9GaWx0ZXInXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRW5hYmxlZCA9IG51bU9wdGlvbnMgPj0gbWluTnVtT3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2luZG93LlxyXG5cclxuICAgIG9uV2luZG93Q2xpY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbGVjdCBjb250YWluZXIuXHJcblxyXG4gICAgb25TZWxlY3RDb250YWluZXJDbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RDb250YWluZXJGb2N1cygpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEcm9wZG93biBjb250YWluZXIuXHJcblxyXG4gICAgb25Ecm9wZG93bk9wdGlvbkNsaWNrZWQob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm11bHRpcGxlID9cclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RPcHRpb24ob3B0aW9uKSA6IHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wZG93bkNsb3NlKGZvY3VzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oZm9jdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmdsZSBmaWx0ZXIgaW5wdXQuXHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJDbGljaygpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVySW5wdXQodGVybTogc3RyaW5nKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0ZXJtLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZWQuZW1pdCh0ZXJtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcih0ZXJtKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTXVsdGlwbGUgZmlsdGVyIGlucHV0LlxyXG5cclxuICAgIG9uTXVsdGlwbGVGaWx0ZXJJbnB1dChldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmdsZSBjbGVhciBzZWxlY3QuXHJcblxyXG4gICAgb25DbGVhclNlbGVjdGlvbkNsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNdWx0aXBsZSBkZXNlbGVjdCBvcHRpb24uXHJcblxyXG4gICAgb25EZXNlbGVjdE9wdGlvbkNsaWNrKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQVBJLiAqKi9cclxuXHJcbiAgICAvLyBUT0RPIGZpeCBpc3N1ZXMgd2l0aCBnbG9iYWwgY2xpY2sva2V5IGhhbmRsZXIgdGhhdCBjbG9zZXMgdGhlIGRyb3Bkb3duLlxyXG4gICAgb3BlbigpIHtcclxuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3QodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5nZXRPcHRpb25zQnlWYWx1ZSh2YWx1ZSkuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIG1ldGhvZHMuICoqL1xyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVmFsdWUuICoqL1xyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5fdmFsdWUgOiB0aGlzLl92YWx1ZVswXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcgfHwgdiA9PT0gbnVsbCB8fCB2ID09PSAnJykge1xyXG4gICAgICAgICAgICB2ID0gW107XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdiA9IFt2XTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHYpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIU9wdGlvbkxpc3QuZXF1YWxWYWx1ZXModiwgdGhpcy5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC52YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5vcHRpb25MaXN0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLmhhc1NlbGVjdGVkID0gdGhpcy5fdmFsdWUubGVuZ3RoID4gMDtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMuaGFzU2VsZWN0ZWQgPyAnJyA6IHRoaXMucGxhY2Vob2xkZXI7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBJbml0aWFsaXphdGlvbi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPcHRpb25zTGlzdChmaXJzdFRpbWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgdjogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRpbWUpIHtcclxuICAgICAgICAgICAgdiA9IHRoaXMub3B0aW9uTGlzdC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdCA9IG5ldyBPcHRpb25MaXN0KHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC52YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEcm9wZG93bi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSB0b2dnbGVEcm9wZG93bigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlbkRyb3Bkb3duKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaWR0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5lbWl0KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICBwcml2YXRlIGNsb3NlRHJvcGRvd24oZm9jdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVySW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICAvKiogU2VsZWN0LiAqKi9cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIGlmICghb3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5zZWxlY3Qob3B0aW9uLCB0aGlzLm11bHRpcGxlKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KG9wdGlvbi51bmRlY29yYXRlZENvcHkoKSk7XHJcbiAgICAgICAgICAgIC8vIElzIHRoaXMgbm90IGFsbHJlYWR5IGRvbmUgd2hlbiBzZXR0aW5nIHRoZSB2YWx1ZT8/XHJcbiAgICAgICAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmRlc2VsZWN0KG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KG9wdGlvbi51bmRlY29yYXRlZENvcHkoKSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uOiBBcnJheTxPcHRpb24+ID0gdGhpcy5vcHRpb25MaXN0LnNlbGVjdGlvbjtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQoc2VsZWN0aW9uWzBdLnVuZGVjb3JhdGVkQ29weSgpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KHNlbGVjdGlvbi5tYXAoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b2dnbGVTZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgP1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0SGlnaGxpZ2h0ZWRPcHRpb24oKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0ZWRPcHRpb247XHJcbiAgICAgICAgaWYgKG9wdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzZWxlY3RMYXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHNlbDogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChzZWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb246IE9wdGlvbiA9IHNlbFtzZWwubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNdWx0aXBsZUZpbHRlcklucHV0KG9wdGlvbi5sYWJlbCArICcgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBGaWx0ZXIuICoqL1xyXG5cclxuICAgIHByaXZhdGUgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5jbGVhckZpbHRlcklucHV0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRVNDIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5ID09PSB0aGlzLktFWVMuVVAgJiYgZXZlbnQuYWx0S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLlRBQikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRU5URVIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGlnaGxpZ2h0ZWRPcHRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5VUCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodFByZXZpb3VzT3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRE9XTikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE5leHRPcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FTlRFUiB8fCBrZXkgPT09IHRoaXMuS0VZUy5TUEFDRSB8fFxyXG4gICAgICAgICAgICAgICAgKGtleSA9PT0gdGhpcy5LRVlTLkRPV04gJiYgZXZlbnQuYWx0S2V5KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIEZJUkVGT1ggSEFDSzpcclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKiBUaGUgc2V0VGltZW91dCBpcyBhZGRlZCB0byBwcmV2ZW50IHRoZSBlbnRlciBrZXlkb3duIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgKiB0byBiZSB0cmlnZ2VyZWQgZm9yIHRoZSBmaWx0ZXIgaW5wdXQgZmllbGQsIHdoaWNoIGNhdXNlc1xyXG4gICAgICAgICAgICAgICAgICogdGhlIGRyb3Bkb3duIHRvIGJlIGNsb3NlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMub3BlbkRyb3Bkb3duKCk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5CQUNLU1BBQ0UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzU2VsZWN0ZWQgJiYgdGhpcy5maWx0ZXJFbmFibGVkICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0TGFzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHwga2V5ID09PSB0aGlzLktFWVMuVEFCXHJcbiAgICAgICAgICAgIHx8IGtleSA9PT0gdGhpcy5LRVlTLlVQIHx8IGtleSA9PT0gdGhpcy5LRVlTLkRPV05cclxuICAgICAgICAgICAgfHwga2V5ID09PSB0aGlzLktFWVMuRU5URVIpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZpZXcuICoqL1xyXG5cclxuICAgIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBibHVyKCkge1xyXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV2lkdGgoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLmxlZnQgPSBlLm9mZnNldExlZnQ7XHJcbiAgICAgICAgdGhpcy50b3AgPSBlLm9mZnNldFRvcCArIGUub2Zmc2V0SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUZpbHRlcldpZHRoKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5maWx0ZXJJbnB1dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dFdpZHRoID0gdmFsdWUubGVuZ3RoID09PSAwID9cclxuICAgICAgICAgICAgICAgIDEgKyB0aGlzLnBsYWNlaG9sZGVyVmlldy5sZW5ndGggKiAxMCA6IDEgKyB2YWx1ZS5sZW5ndGggKiAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19