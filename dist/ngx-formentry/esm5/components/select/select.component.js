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
export var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return SelectComponent; })),
    multi: true
};
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
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
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** Event handlers. **/
    // Angular lifecycle hooks.
    /**
     * Event handlers. *
     * @return {?}
     */
    // Angular lifecycle hooks.
    SelectComponent.prototype.ngOnInit = /**
     * Event handlers. *
     * @return {?}
     */
    // Angular lifecycle hooks.
    function () {
        this.placeholderView = this.placeholder;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.updateFilterWidth();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
        if (changes.hasOwnProperty('noFilter')) {
            /** @type {?} */
            var numOptions = this.optionList.options.length;
            /** @type {?} */
            var minNumOptions = changes['noFilter'].currentValue;
            this.filterEnabled = numOptions >= minNumOptions;
        }
    };
    // Window.
    // Window.
    /**
     * @return {?}
     */
    SelectComponent.prototype.onWindowClick = 
    // Window.
    /**
     * @return {?}
     */
    function () {
        if (!this.selectContainerClicked) {
            this.closeDropdown();
        }
        this.clearClicked = false;
        this.selectContainerClicked = false;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onWindowResize = /**
     * @return {?}
     */
    function () {
        this.updateWidth();
    };
    // Select container.
    // Select container.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerClick = 
    // Select container.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectContainerClicked = true;
        if (!this.clearClicked) {
            this.toggleDropdown();
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerFocus = /**
     * @return {?}
     */
    function () {
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleSelectContainerKeydown(event);
    };
    // Dropdown container.
    // Dropdown container.
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.onDropdownOptionClicked = 
    // Dropdown container.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
    };
    /**
     * @param {?} focus
     * @return {?}
     */
    SelectComponent.prototype.onDropdownClose = /**
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        this.closeDropdown(focus);
    };
    // Single filter input.
    // Single filter input.
    /**
     * @return {?}
     */
    SelectComponent.prototype.onSingleFilterClick = 
    // Single filter input.
    /**
     * @return {?}
     */
    function () {
        this.selectContainerClicked = true;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    SelectComponent.prototype.onSingleFilterInput = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (term.length > 2) {
                _this.typed.emit(term);
            }
        }), 500);
        this.optionList.filter(term);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onSingleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleSingleFilterKeydown(event);
    };
    // Multiple filter input.
    // Multiple filter input.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onMultipleFilterInput = 
    // Multiple filter input.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.optionList.filter(event.target.value);
        }));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onMultipleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleMultipleFilterKeydown(event);
    };
    // Single clear select.
    // Single clear select.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onClearSelectionClick = 
    // Single clear select.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.clearClicked = true;
        this.clearSelection();
        this.closeDropdown(true);
    };
    // Multiple deselect option.
    // Multiple deselect option.
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.onDeselectOptionClick = 
    // Multiple deselect option.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.clearClicked = true;
        this.deselectOption(option);
    };
    /** API. **/
    // TODO fix issues with global click/key handler that closes the dropdown.
    /**
     * API. *
     * @return {?}
     */
    // TODO fix issues with global click/key handler that closes the dropdown.
    SelectComponent.prototype.open = /**
     * API. *
     * @return {?}
     */
    // TODO fix issues with global click/key handler that closes the dropdown.
    function () {
        this.openDropdown();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.closeDropdown();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.clearSelection();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.select = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.optionList.getOptionsByValue(value).forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            _this.selectOption(option);
        }));
        this.valueChanged();
    };
    /** ControlValueAccessor interface methods. **/
    /**
     * ControlValueAccessor interface methods. *
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * ControlValueAccessor interface methods. *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(SelectComponent.prototype, "value", {
        /** Value. **/
        get: /**
         * Value. *
         * @return {?}
         */
        function () {
            if (this._value.length === 0) {
                return '';
            }
            else {
                return this.multiple ? this._value : this._value[0];
            }
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype.valueChanged = /**
     * @private
     * @return {?}
     */
    function () {
        this._value = this.optionList.value;
        this.hasSelected = this._value.length > 0;
        this.placeholderView = this.hasSelected ? '' : this.placeholder;
        this.updateFilterWidth();
        this.onChange(this.value);
    };
    /** Initialization. **/
    /**
     * Initialization. *
     * @private
     * @param {?} firstTime
     * @return {?}
     */
    SelectComponent.prototype.updateOptionsList = /**
     * Initialization. *
     * @private
     * @param {?} firstTime
     * @return {?}
     */
    function (firstTime) {
        /** @type {?} */
        var v;
        if (!firstTime) {
            v = this.optionList.value;
        }
        this.optionList = new OptionList(this.options);
        if (!firstTime) {
            this.optionList.value = v;
            this.valueChanged();
        }
    };
    /** Dropdown. **/
    /**
     * Dropdown. *
     * @private
     * @return {?}
     */
    SelectComponent.prototype.toggleDropdown = /**
     * Dropdown. *
     * @private
     * @return {?}
     */
    function () {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype.openDropdown = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.updateWidth();
            this.updatePosition();
            this.isOpen = true;
            if (this.multiple && this.filterEnabled) {
                this.filterInput.nativeElement.focus();
            }
            this.opened.emit(null);
        }
    };
    /* tslint:disable */
    /* tslint:disable */
    /**
     * @private
     * @param {?=} focus
     * @return {?}
     */
    SelectComponent.prototype.closeDropdown = /* tslint:disable */
    /**
     * @private
     * @param {?=} focus
     * @return {?}
     */
    function (focus) {
        if (focus === void 0) { focus = false; }
        if (this.isOpen) {
            this.clearFilterInput();
            this.isOpen = false;
            if (focus) {
                this.focus();
            }
            this.closed.emit(null);
        }
    };
    /* tslint:enable */
    /** Select. **/
    /* tslint:enable */
    /**
     * Select. *
     * @private
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.selectOption = /* tslint:enable */
    /**
     * Select. *
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
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
    };
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.deselectOption = /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var _this = this;
        if (option.selected) {
            this.optionList.deselect(option);
            this.valueChanged();
            this.deselected.emit(option.undecoratedCopy());
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.multiple) {
                    // this.updateFilterWidth();
                    _this.updatePosition();
                    _this.optionList.highlight();
                    if (_this.isOpen) {
                        _this.dropdown.moveHighlightedIntoView();
                    }
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype.clearSelection = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selection = this.optionList.selection;
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
                function (option) {
                    return option.undecoratedCopy();
                })));
            }
        }
    };
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.toggleSelectOption = /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        option.selected ?
            this.deselectOption(option) : this.selectOption(option);
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype.selectHighlightedOption = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var option = this.optionList.highlightedOption;
        if (option !== null) {
            this.selectOption(option);
            this.closeDropdown(true);
        }
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype.deselectLast = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sel = this.optionList.selection;
        if (sel.length > 0) {
            /** @type {?} */
            var option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    };
    /** Filter. **/
    /**
     * Filter. *
     * @private
     * @return {?}
     */
    SelectComponent.prototype.clearFilterInput = /**
     * Filter. *
     * @private
     * @return {?}
     */
    function () {
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
        else {
            this.dropdown.clearFilterInput();
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.setMultipleFilterInput = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = value;
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.handleSelectContainerKeydown = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var key = event.which;
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
                function () { _this.openDropdown(); }));
            }
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.handleMultipleFilterKeydown = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected && this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.handleSingleFilterKeydown = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.which;
        if (key === this.KEYS.ESC || key === this.KEYS.TAB
            || key === this.KEYS.UP || key === this.KEYS.DOWN
            || key === this.KEYS.ENTER) {
            this.handleSelectContainerKeydown(event);
        }
    };
    /** View. **/
    /**
     * View. *
     * @return {?}
     */
    SelectComponent.prototype.focus = /**
     * View. *
     * @return {?}
     */
    function () {
        this.hasFocus = true;
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
        else {
            this.selectionSpan.nativeElement.focus();
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.blur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateWidth = /**
     * @return {?}
     */
    function () {
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updatePosition = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var e = this.selectionSpan.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateFilterWidth = /**
     * @return {?}
     */
    function () {
        if (typeof this.filterInput !== 'undefined') {
            /** @type {?} */
            var value = this.filterInput.nativeElement.value;
            this.filterInputWidth = value.length === 0 ?
                1 + this.placeholderView.length * 10 : 1 + value.length * 10;
        }
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select',
                    template: "<div\n    #selection\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [ngClass]=\"{'open': isOpen, 'focus': hasFocus, 'below': isBelow, 'disabled': disabled}\"\n    (click)=\"onSelectContainerClick($event)\"\n    (focus)=\"onSelectContainerFocus()\"\n    (keydown)=\"onSelectContainerKeydown($event)\"\n    (window:click)=\"onWindowClick()\"\n    (window:resize)=\"onWindowResize()\">\n\n    <div class=\"single\"\n        *ngIf=\"!multiple\">\n        <div class=\"value\"\n            *ngIf=\"optionList.hasSelected()\">\n            {{optionList.selection[0].label}}\n        </div>\n        <div class=\"placeholder\"\n            *ngIf=\"!optionList.hasSelected()\">\n            {{placeholderView}}\n        </div>\n        <div class=\"clear\"\n            *ngIf=\"allowClear\"\n            (click)=\"onClearSelectionClick($event)\">\n            &#x2715;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"isOpen\">\n            &#x25B2;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"!isOpen\">\n            &#x25BC;\n        </div>\n    </div>\n\n    <div class=\"multiple\"\n        *ngIf=\"multiple\">\n        <div class=\"option\"\n            *ngFor=\"let option of optionList.selection\">\n            <span class=\"deselect-option\"\n                (click)=onDeselectOptionClick(option)>\n                &#x2715;\n            </span>\n            {{option.label}}\n        </div>\n        <input\n            *ngIf=\"filterEnabled\"\n            #filterInput\n            tabindex=\"-1\"\n            [placeholder]=\"placeholderView\"\n            [ngStyle]=\"{'width.px': filterInputWidth}\"\n            (input)=\"onMultipleFilterInput($event)\"\n            (keydown)=\"onMultipleFilterKeydown($event)\"/>\n    </div>\n\n</div>\n<select-dropdown\n    *ngIf=\"isOpen\"\n    #dropdown\n    [multiple]=\"multiple\"\n    [optionList]=\"optionList\"\n    [notFoundMsg]=\"notFoundMsg\"\n    [highlightColor]=\"highlightColor\"\n    [highlightTextColor]=\"highlightTextColor\"\n    [filterEnabled]=\"filterEnabled\"\n    [width]=\"width\"\n    [top]=\"top\"\n    [left]=\"left\"\n    (close)=\"onDropdownClose($event)\"\n    (optionClicked)=\"onDropdownOptionClicked($event)\"\n    (singleFilterClick)=\"onSingleFilterClick()\"\n    (singleFilterInput)=\"onSingleFilterInput($event)\"\n    (singleFilterKeydown)=\"onSingleFilterKeydown($event)\">\n</select-dropdown>\n",
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
    return SelectComponent;
}());
export { SelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLEtBQU8scUJBQXFCLEdBQXFCO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxlQUFlLEVBQWYsQ0FBZSxFQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ2Q7QUFFRDtJQUFBO1FBb0ZJLGFBQWE7UUFFTCxTQUFJLEdBQVE7WUFDaEIsU0FBUyxFQUFFLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxFQUFFO1lBQ1QsR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBSU8sZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsU0FBUyxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUM1QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FB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TCxLQUFLO2lDQUNMLEtBQUs7cUNBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO3lCQUVMLE1BQU07eUJBQ04sTUFBTTsyQkFDTixNQUFNOzZCQUNOLE1BQU07d0JBQ04sTUFBTTtnQ0FHTixTQUFTLFNBQUMsV0FBVzsyQkFDckIsU0FBUyxTQUFDLFVBQVU7OEJBQ3BCLFNBQVMsU0FBQyxhQUFhOztJQWtjNUIsc0JBQUM7Q0FBQSxBQXRqQkQsSUFzakJDO1NBcGVZLGVBQWU7Ozs7Ozs7SUFJeEIsK0JBUUU7O0lBRUYsa0NBQTZCOztJQUU3QixxQ0FBNEI7O0lBQzVCLG1DQUEwQjs7SUFDMUIseUNBQW9DOztJQUNwQyw2Q0FBcUM7O0lBQ3JDLG1DQUEwQjs7SUFDMUIsbUNBQXNCOztJQUN0QixzQ0FBMEM7O0lBQzFDLHNDQUEwQjs7SUFFMUIsaUNBQWdFOztJQUNoRSxpQ0FBZ0U7O0lBQ2hFLG1DQUFnRTs7SUFDaEUscUNBQWtFOztJQUNsRSxnQ0FBNkQ7O0lBRzdELHdDQUEyQzs7SUFDM0MsbUNBQXlEOztJQUN6RCxzQ0FBMkM7Ozs7O0lBRTNDLGlDQUFnQzs7SUFDaEMscUNBQXVCOztJQUd2QixzQ0FBb0I7O0lBR3BCLHdDQUFxQjs7SUFDckIsMkNBQXFCOztJQUNyQixtQ0FBaUI7O0lBQ2pCLGtDQUFlOztJQUNmLHFDQUFtQjs7SUFDbkIsaUNBQWU7O0lBQ2YsMENBQXFCOztJQUVyQix1Q0FBcUI7O0lBQ3JCLGlEQUErQjs7SUFHL0IsZ0NBQWM7O0lBQ2QsOEJBQVk7O0lBQ1osK0JBQWE7Ozs7O0lBRWIsbUNBQW1DOzs7OztJQUNuQyxvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgRXhpc3RpbmdQcm92aWRlcixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgZm9yd2FyZFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50LnN0eWxlJztcclxuaW1wb3J0IHsgU2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IEV4aXN0aW5nUHJvdmlkZXIgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXZcclxuICAgICNzZWxlY3Rpb25cclxuICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IDBcIlxyXG4gICAgW25nQ2xhc3NdPVwieydvcGVuJzogaXNPcGVuLCAnZm9jdXMnOiBoYXNGb2N1cywgJ2JlbG93JzogaXNCZWxvdywgJ2Rpc2FibGVkJzogZGlzYWJsZWR9XCJcclxuICAgIChjbGljayk9XCJvblNlbGVjdENvbnRhaW5lckNsaWNrKCRldmVudClcIlxyXG4gICAgKGZvY3VzKT1cIm9uU2VsZWN0Q29udGFpbmVyRm9jdXMoKVwiXHJcbiAgICAoa2V5ZG93bik9XCJvblNlbGVjdENvbnRhaW5lcktleWRvd24oJGV2ZW50KVwiXHJcbiAgICAod2luZG93OmNsaWNrKT1cIm9uV2luZG93Q2xpY2soKVwiXHJcbiAgICAod2luZG93OnJlc2l6ZSk9XCJvbldpbmRvd1Jlc2l6ZSgpXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInNpbmdsZVwiXHJcbiAgICAgICAgKm5nSWY9XCIhbXVsdGlwbGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIlxyXG4gICAgICAgICAgICAqbmdJZj1cIm9wdGlvbkxpc3QuaGFzU2VsZWN0ZWQoKVwiPlxyXG4gICAgICAgICAgICB7e29wdGlvbkxpc3Quc2VsZWN0aW9uWzBdLmxhYmVsfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAgICAqbmdJZj1cIiFvcHRpb25MaXN0Lmhhc1NlbGVjdGVkKClcIj5cclxuICAgICAgICAgICAge3twbGFjZWhvbGRlclZpZXd9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhclwiXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYWxsb3dDbGVhclwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsZWFyU2VsZWN0aW9uQ2xpY2soJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAmI3gyNzE1O1xyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGVcIlxyXG4gICAgICAgICAgICAqbmdJZj1cImlzT3BlblwiPlxyXG4gICAgICAgICAgICAmI3gyNUIyO1xyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGVcIlxyXG4gICAgICAgICAgICAqbmdJZj1cIiFpc09wZW5cIj5cclxuICAgICAgICAgICAgJiN4MjVCQztcclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtdWx0aXBsZVwiXHJcbiAgICAgICAgKm5nSWY9XCJtdWx0aXBsZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcHRpb25cIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbkxpc3Quc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzZWxlY3Qtb3B0aW9uXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9b25EZXNlbGVjdE9wdGlvbkNsaWNrKG9wdGlvbik+XHJcbiAgICAgICAgICAgICAgICAmI3gyNzE1O1xyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJFbmFibGVkXCJcclxuICAgICAgICAgICAgI2ZpbHRlcklucHV0XHJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxyXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJWaWV3XCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyd3aWR0aC5weCc6IGZpbHRlcklucHV0V2lkdGh9XCJcclxuICAgICAgICAgICAgKGlucHV0KT1cIm9uTXVsdGlwbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGtleWRvd24pPVwib25NdWx0aXBsZUZpbHRlcktleWRvd24oJGV2ZW50KVwiLz5cclxuICAgIDwvZGl2PlxyXG5cclxuPC9kaXY+XHJcbjxzZWxlY3QtZHJvcGRvd25cclxuICAgICpuZ0lmPVwiaXNPcGVuXCJcclxuICAgICNkcm9wZG93blxyXG4gICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCJcclxuICAgIFtvcHRpb25MaXN0XT1cIm9wdGlvbkxpc3RcIlxyXG4gICAgW25vdEZvdW5kTXNnXT1cIm5vdEZvdW5kTXNnXCJcclxuICAgIFtoaWdobGlnaHRDb2xvcl09XCJoaWdobGlnaHRDb2xvclwiXHJcbiAgICBbaGlnaGxpZ2h0VGV4dENvbG9yXT1cImhpZ2hsaWdodFRleHRDb2xvclwiXHJcbiAgICBbZmlsdGVyRW5hYmxlZF09XCJmaWx0ZXJFbmFibGVkXCJcclxuICAgIFt3aWR0aF09XCJ3aWR0aFwiXHJcbiAgICBbdG9wXT1cInRvcFwiXHJcbiAgICBbbGVmdF09XCJsZWZ0XCJcclxuICAgIChjbG9zZSk9XCJvbkRyb3Bkb3duQ2xvc2UoJGV2ZW50KVwiXHJcbiAgICAob3B0aW9uQ2xpY2tlZCk9XCJvbkRyb3Bkb3duT3B0aW9uQ2xpY2tlZCgkZXZlbnQpXCJcclxuICAgIChzaW5nbGVGaWx0ZXJDbGljayk9XCJvblNpbmdsZUZpbHRlckNsaWNrKClcIlxyXG4gICAgKHNpbmdsZUZpbHRlcklucHV0KT1cIm9uU2luZ2xlRmlsdGVySW5wdXQoJGV2ZW50KVwiXHJcbiAgICAoc2luZ2xlRmlsdGVyS2V5ZG93bik9XCJvblNpbmdsZUZpbHRlcktleWRvd24oJGV2ZW50KVwiPlxyXG48L3NlbGVjdC1kcm9wZG93bj5cclxuYCxcclxuICAgIHN0eWxlczogW1NUWUxFXSxcclxuICAgIHByb3ZpZGVyczogW1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50XHJcbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgICAvKiogS2V5cy4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBLRVlTOiBhbnkgPSB7XHJcbiAgICAgICAgQkFDS1NQQUNFOiA4LFxyXG4gICAgICAgIFRBQjogOSxcclxuICAgICAgICBFTlRFUjogMTMsXHJcbiAgICAgICAgRVNDOiAyNyxcclxuICAgICAgICBTUEFDRTogMzIsXHJcbiAgICAgICAgVVA6IDM4LFxyXG4gICAgICAgIERPV046IDQwXHJcbiAgICB9O1xyXG5cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XHJcblxyXG4gICAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodENvbG9yID0gJyMyMTk2ZjMnO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yID0gJyNmZmYnO1xyXG4gICAgQElucHV0KCkgbXVsdGlwbGUgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIG5vRmlsdGVyID0gMDtcclxuICAgIEBJbnB1dCgpIG5vdEZvdW5kTXNnID0gJ05vIHJlc3VsdHMgZm91bmQnO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcclxuXHJcbiAgICBAT3V0cHV0KCkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgZGVzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSB0eXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uJykgc2VsZWN0aW9uU3BhbjogYW55O1xyXG4gICAgQFZpZXdDaGlsZCgnZHJvcGRvd24nKSBkcm9wZG93bjogU2VsZWN0RHJvcGRvd25Db21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XHJcblxyXG4gICAgLy8gU2VsZWN0aW9uIHN0YXRlIHZhcmlhYmxlcy5cclxuICAgIGhhc1NlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVmlldyBzdGF0ZSB2YXJpYWJsZXMuXHJcbiAgICBmaWx0ZXJFbmFibGVkID0gdHJ1ZTtcclxuICAgIGZpbHRlcklucHV0V2lkdGggPSAxO1xyXG4gICAgaGFzRm9jdXMgPSBmYWxzZTtcclxuICAgIGlzQmVsb3cgPSB0cnVlO1xyXG4gICAgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgaXNPcGVuID0gZmFsc2U7XHJcbiAgICBwbGFjZWhvbGRlclZpZXcgPSAnJztcclxuXHJcbiAgICBjbGVhckNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBXaWR0aCBhbmQgcG9zaXRpb24gZm9yIHRoZSBkcm9wZG93biBjb250YWluZXIuXHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgdG9wOiBudW1iZXI7XHJcbiAgICBsZWZ0OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuICAgIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4geyB9O1xyXG5cclxuICAgIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXHJcblxyXG4gICAgLy8gQW5ndWxhciBsaWZlY3ljbGUgaG9va3MuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLnBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnNMaXN0KGNoYW5nZXNbJ29wdGlvbnMnXS5pc0ZpcnN0Q2hhbmdlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbm9GaWx0ZXInKSkge1xyXG4gICAgICAgICAgICBjb25zdCBudW1PcHRpb25zOiBudW1iZXIgPSB0aGlzLm9wdGlvbkxpc3Qub3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbk51bU9wdGlvbnM6IG51bWJlciA9IGNoYW5nZXNbJ25vRmlsdGVyJ10uY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckVuYWJsZWQgPSBudW1PcHRpb25zID49IG1pbk51bU9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdpbmRvdy5cclxuXHJcbiAgICBvbldpbmRvd0NsaWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZWxlY3QgY29udGFpbmVyLlxyXG5cclxuICAgIG9uU2VsZWN0Q29udGFpbmVyQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNsZWFyQ2xpY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2VsZWN0Q29udGFpbmVyRm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRHJvcGRvd24gY29udGFpbmVyLlxyXG5cclxuICAgIG9uRHJvcGRvd25PcHRpb25DbGlja2VkKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBsZSA/XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJvcGRvd25DbG9zZShmb2N1czogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKGZvY3VzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5nbGUgZmlsdGVyIGlucHV0LlxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlcklucHV0KHRlcm06IHN0cmluZykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGVybS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVkLmVtaXQodGVybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXIodGVybSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE11bHRpcGxlIGZpbHRlciBpbnB1dC5cclxuXHJcbiAgICBvbk11bHRpcGxlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5nbGUgY2xlYXIgc2VsZWN0LlxyXG5cclxuICAgIG9uQ2xlYXJTZWxlY3Rpb25DbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTXVsdGlwbGUgZGVzZWxlY3Qgb3B0aW9uLlxyXG5cclxuICAgIG9uRGVzZWxlY3RPcHRpb25DbGljayhvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFQSS4gKiovXHJcblxyXG4gICAgLy8gVE9ETyBmaXggaXNzdWVzIHdpdGggZ2xvYmFsIGNsaWNrL2tleSBoYW5kbGVyIHRoYXQgY2xvc2VzIHRoZSBkcm9wZG93bi5cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWUpLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSBtZXRob2RzLiAqKi9cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZhbHVlLiAqKi9cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3ZhbHVlIDogdGhpcy5fdmFsdWVbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2OiBhbnkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09ICd1bmRlZmluZWQnIHx8IHYgPT09IG51bGwgfHwgdiA9PT0gJycpIHtcclxuICAgICAgICAgICAgdiA9IFtdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHYgPSBbdl07XHJcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFPcHRpb25MaXN0LmVxdWFsVmFsdWVzKHYsIHRoaXMuX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QudmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMub3B0aW9uTGlzdC52YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5oYXNTZWxlY3RlZCA9IHRoaXMuX3ZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLmhhc1NlbGVjdGVkID8gJycgOiB0aGlzLnBsYWNlaG9sZGVyO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT3B0aW9uc0xpc3QoZmlyc3RUaW1lOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHY6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUaW1lKSB7XHJcbiAgICAgICAgICAgIHYgPSB0aGlzLm9wdGlvbkxpc3QudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QgPSBuZXcgT3B0aW9uTGlzdCh0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIWZpcnN0VGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QudmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRHJvcGRvd24uICoqL1xyXG5cclxuICAgIHByaXZhdGUgdG9nZ2xlRHJvcGRvd24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5Ecm9wZG93bigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcGVuZWQuZW1pdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZURyb3Bkb3duKGZvY3VzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcklucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChmb2N1cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xyXG4gICAgLyoqIFNlbGVjdC4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBpZiAoIW9wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0KG9wdGlvbiwgdGhpcy5tdWx0aXBsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCkpO1xyXG4gICAgICAgICAgICAvLyBJcyB0aGlzIG5vdCBhbGxyZWFkeSBkb25lIHdoZW4gc2V0dGluZyB0aGUgdmFsdWU/P1xyXG4gICAgICAgICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5kZXNlbGVjdChvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCkpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbjogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KHNlbGVjdGlvblswXS51bmRlY29yYXRlZENvcHkoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChzZWxlY3Rpb24ubWFwKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID9cclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pIDogdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdEhpZ2hsaWdodGVkT3B0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodGVkT3B0aW9uO1xyXG4gICAgICAgIGlmIChvcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc2VsZWN0TGFzdCgpIHtcclxuICAgICAgICBjb25zdCBzZWw6IEFycmF5PE9wdGlvbj4gPSB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoc2VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSBzZWxbc2VsLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dChvcHRpb24ubGFiZWwgKyAnICcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRmlsdGVyLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyRmlsdGVySW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uY2xlYXJGaWx0ZXJJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE11bHRpcGxlRmlsdGVySW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVTQyB8fFxyXG4gICAgICAgICAgICAgICAgKGtleSA9PT0gdGhpcy5LRVlTLlVQICYmIGV2ZW50LmFsdEtleSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5UQUIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhpZ2hsaWdodGVkT3B0aW9uKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuVVApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRQcmV2aW91c09wdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkRPV04pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHROZXh0T3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRU5URVIgfHwga2V5ID09PSB0aGlzLktFWVMuU1BBQ0UgfHxcclxuICAgICAgICAgICAgICAgIChrZXkgPT09IHRoaXMuS0VZUy5ET1dOICYmIGV2ZW50LmFsdEtleSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBGSVJFRk9YIEhBQ0s6XHJcbiAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICogVGhlIHNldFRpbWVvdXQgaXMgYWRkZWQgdG8gcHJldmVudCB0aGUgZW50ZXIga2V5ZG93biBldmVudFxyXG4gICAgICAgICAgICAgICAgICogdG8gYmUgdHJpZ2dlcmVkIGZvciB0aGUgZmlsdGVyIGlucHV0IGZpZWxkLCB3aGljaCBjYXVzZXNcclxuICAgICAgICAgICAgICAgICAqIHRoZSBkcm9wZG93biB0byBiZSBjbG9zZWQgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLm9wZW5Ecm9wZG93bigpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVNdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuQkFDS1NQQUNFKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1NlbGVjdGVkICYmIHRoaXMuZmlsdGVyRW5hYmxlZCAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdExhc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRVNDIHx8IGtleSA9PT0gdGhpcy5LRVlTLlRBQlxyXG4gICAgICAgICAgICB8fCBrZXkgPT09IHRoaXMuS0VZUy5VUCB8fCBrZXkgPT09IHRoaXMuS0VZUy5ET1dOXHJcbiAgICAgICAgICAgIHx8IGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWaWV3LiAqKi9cclxuXHJcbiAgICBmb2N1cygpIHtcclxuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmx1cigpIHtcclxuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVdpZHRoKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcclxuICAgICAgICBjb25zdCBlID0gdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gZS5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIHRoaXMudG9wID0gZS5vZmZzZXRUb3AgKyBlLm9mZnNldEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGaWx0ZXJXaWR0aCgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVySW5wdXQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXRXaWR0aCA9IHZhbHVlLmxlbmd0aCA9PT0gMCA/XHJcbiAgICAgICAgICAgICAgICAxICsgdGhpcy5wbGFjZWhvbGRlclZpZXcubGVuZ3RoICogMTAgOiAxICsgdmFsdWUubGVuZ3RoICogMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==