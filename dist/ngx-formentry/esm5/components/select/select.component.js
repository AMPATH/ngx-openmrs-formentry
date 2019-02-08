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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLEtBQU8scUJBQXFCLEdBQXFCO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxlQUFlLEVBQWYsQ0FBZSxFQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ2Q7QUFFRDtJQUFBO1FBb0ZJLGFBQWE7UUFFTCxTQUFJLEdBQVE7WUFDaEIsU0FBUyxFQUFFLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxFQUFFO1lBQ1QsR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBSU8sZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsU0FBUyxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUM1QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FB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TCxLQUFLO2lDQUNMLEtBQUs7cUNBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO3lCQUVMLE1BQU07eUJBQ04sTUFBTTsyQkFDTixNQUFNOzZCQUNOLE1BQU07d0JBQ04sTUFBTTtnQ0FHTixTQUFTLFNBQUMsV0FBVzsyQkFDckIsU0FBUyxTQUFDLFVBQVU7OEJBQ3BCLFNBQVMsU0FBQyxhQUFhOztJQWtjNUIsc0JBQUM7Q0FBQSxBQXRqQkQsSUFzakJDO1NBcGVZLGVBQWU7Ozs7Ozs7SUFJeEIsK0JBUUU7O0lBRUYsa0NBQTZCOztJQUU3QixxQ0FBNEI7O0lBQzVCLG1DQUEwQjs7SUFDMUIseUNBQW9DOztJQUNwQyw2Q0FBcUM7O0lBQ3JDLG1DQUEwQjs7SUFDMUIsbUNBQXNCOztJQUN0QixzQ0FBMEM7O0lBQzFDLHNDQUEwQjs7SUFFMUIsaUNBQWdFOztJQUNoRSxpQ0FBZ0U7O0lBQ2hFLG1DQUFnRTs7SUFDaEUscUNBQWtFOztJQUNsRSxnQ0FBNkQ7O0lBRzdELHdDQUEyQzs7SUFDM0MsbUNBQXlEOztJQUN6RCxzQ0FBMkM7Ozs7O0lBRTNDLGlDQUFnQzs7SUFDaEMscUNBQXVCOztJQUd2QixzQ0FBb0I7O0lBR3BCLHdDQUFxQjs7SUFDckIsMkNBQXFCOztJQUNyQixtQ0FBaUI7O0lBQ2pCLGtDQUFlOztJQUNmLHFDQUFtQjs7SUFDbkIsaUNBQWU7O0lBQ2YsMENBQXFCOztJQUVyQix1Q0FBcUI7O0lBQ3JCLGlEQUErQjs7SUFHL0IsZ0NBQWM7O0lBQ2QsOEJBQVk7O0lBQ1osK0JBQWE7Ozs7O0lBRWIsbUNBQW1DOzs7OztJQUNuQyxvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgRXhpc3RpbmdQcm92aWRlcixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgZm9yd2FyZFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50LnN0eWxlJztcclxuaW1wb3J0IHsgU2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IEV4aXN0aW5nUHJvdmlkZXIgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXZcbiAgICAjc2VsZWN0aW9uXG4gICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXG4gICAgW25nQ2xhc3NdPVwieydvcGVuJzogaXNPcGVuLCAnZm9jdXMnOiBoYXNGb2N1cywgJ2JlbG93JzogaXNCZWxvdywgJ2Rpc2FibGVkJzogZGlzYWJsZWR9XCJcbiAgICAoY2xpY2spPVwib25TZWxlY3RDb250YWluZXJDbGljaygkZXZlbnQpXCJcbiAgICAoZm9jdXMpPVwib25TZWxlY3RDb250YWluZXJGb2N1cygpXCJcbiAgICAoa2V5ZG93bik9XCJvblNlbGVjdENvbnRhaW5lcktleWRvd24oJGV2ZW50KVwiXG4gICAgKHdpbmRvdzpjbGljayk9XCJvbldpbmRvd0NsaWNrKClcIlxuICAgICh3aW5kb3c6cmVzaXplKT1cIm9uV2luZG93UmVzaXplKClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJzaW5nbGVcIlxuICAgICAgICAqbmdJZj1cIiFtdWx0aXBsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIlxuICAgICAgICAgICAgKm5nSWY9XCJvcHRpb25MaXN0Lmhhc1NlbGVjdGVkKClcIj5cbiAgICAgICAgICAgIHt7b3B0aW9uTGlzdC5zZWxlY3Rpb25bMF0ubGFiZWx9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICpuZ0lmPVwiIW9wdGlvbkxpc3QuaGFzU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgICAge3twbGFjZWhvbGRlclZpZXd9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyXCJcbiAgICAgICAgICAgICpuZ0lmPVwiYWxsb3dDbGVhclwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25DbGVhclNlbGVjdGlvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICYjeDI3MTU7XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNPcGVuXCI+XG4gICAgICAgICAgICAmI3gyNUIyO1xuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZVwiXG4gICAgICAgICAgICAqbmdJZj1cIiFpc09wZW5cIj5cbiAgICAgICAgICAgICYjeDI1QkM7XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm11bHRpcGxlXCJcbiAgICAgICAgKm5nSWY9XCJtdWx0aXBsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B0aW9uXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uTGlzdC5zZWxlY3Rpb25cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzZWxlY3Qtb3B0aW9uXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPW9uRGVzZWxlY3RPcHRpb25DbGljayhvcHRpb24pPlxuICAgICAgICAgICAgICAgICYjeDI3MTU7XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRW5hYmxlZFwiXG4gICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyVmlld1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7J3dpZHRoLnB4JzogZmlsdGVySW5wdXRXaWR0aH1cIlxuICAgICAgICAgICAgKGlucHV0KT1cIm9uTXVsdGlwbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uTXVsdGlwbGVGaWx0ZXJLZXlkb3duKCRldmVudClcIi8+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuPHNlbGVjdC1kcm9wZG93blxuICAgICpuZ0lmPVwiaXNPcGVuXCJcbiAgICAjZHJvcGRvd25cbiAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgIFtvcHRpb25MaXN0XT1cIm9wdGlvbkxpc3RcIlxuICAgIFtub3RGb3VuZE1zZ109XCJub3RGb3VuZE1zZ1wiXG4gICAgW2hpZ2hsaWdodENvbG9yXT1cImhpZ2hsaWdodENvbG9yXCJcbiAgICBbaGlnaGxpZ2h0VGV4dENvbG9yXT1cImhpZ2hsaWdodFRleHRDb2xvclwiXG4gICAgW2ZpbHRlckVuYWJsZWRdPVwiZmlsdGVyRW5hYmxlZFwiXG4gICAgW3dpZHRoXT1cIndpZHRoXCJcbiAgICBbdG9wXT1cInRvcFwiXG4gICAgW2xlZnRdPVwibGVmdFwiXG4gICAgKGNsb3NlKT1cIm9uRHJvcGRvd25DbG9zZSgkZXZlbnQpXCJcbiAgICAob3B0aW9uQ2xpY2tlZCk9XCJvbkRyb3Bkb3duT3B0aW9uQ2xpY2tlZCgkZXZlbnQpXCJcbiAgICAoc2luZ2xlRmlsdGVyQ2xpY2spPVwib25TaW5nbGVGaWx0ZXJDbGljaygpXCJcbiAgICAoc2luZ2xlRmlsdGVySW5wdXQpPVwib25TaW5nbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAoc2luZ2xlRmlsdGVyS2V5ZG93bik9XCJvblNpbmdsZUZpbHRlcktleWRvd24oJGV2ZW50KVwiPlxuPC9zZWxlY3QtZHJvcGRvd24+XG5gLFxyXG4gICAgc3R5bGVzOiBbU1RZTEVdLFxyXG4gICAgcHJvdmlkZXJzOiBbU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnRcclxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIC8qKiBLZXlzLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIEtFWVM6IGFueSA9IHtcclxuICAgICAgICBCQUNLU1BBQ0U6IDgsXHJcbiAgICAgICAgVEFCOiA5LFxyXG4gICAgICAgIEVOVEVSOiAxMyxcclxuICAgICAgICBFU0M6IDI3LFxyXG4gICAgICAgIFNQQUNFOiAzMixcclxuICAgICAgICBVUDogMzgsXHJcbiAgICAgICAgRE9XTjogNDBcclxuICAgIH07XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcclxuXHJcbiAgICBASW5wdXQoKSBhbGxvd0NsZWFyID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0Q29sb3IgPSAnIzIxOTZmMyc7XHJcbiAgICBASW5wdXQoKSBoaWdobGlnaHRUZXh0Q29sb3IgPSAnI2ZmZic7XHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgbm9GaWx0ZXIgPSAwO1xyXG4gICAgQElucHV0KCkgbm90Rm91bmRNc2cgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBkZXNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIHR5cGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuXHJcbiAgICBAVmlld0NoaWxkKCdzZWxlY3Rpb24nKSBzZWxlY3Rpb25TcGFuOiBhbnk7XHJcbiAgICBAVmlld0NoaWxkKCdkcm9wZG93bicpIGRyb3Bkb3duOiBTZWxlY3REcm9wZG93bkNvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0JykgZmlsdGVySW5wdXQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcclxuXHJcbiAgICAvLyBTZWxlY3Rpb24gc3RhdGUgdmFyaWFibGVzLlxyXG4gICAgaGFzU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBWaWV3IHN0YXRlIHZhcmlhYmxlcy5cclxuICAgIGZpbHRlckVuYWJsZWQgPSB0cnVlO1xyXG4gICAgZmlsdGVySW5wdXRXaWR0aCA9IDE7XHJcbiAgICBoYXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgaXNCZWxvdyA9IHRydWU7XHJcbiAgICBpc0Rpc2FibGVkID0gZmFsc2U7XHJcbiAgICBpc09wZW4gPSBmYWxzZTtcclxuICAgIHBsYWNlaG9sZGVyVmlldyA9ICcnO1xyXG5cclxuICAgIGNsZWFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFdpZHRoIGFuZCBwb3NpdGlvbiBmb3IgdGhlIGRyb3Bkb3duIGNvbnRhaW5lci5cclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICB0b3A6IG51bWJlcjtcclxuICAgIGxlZnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IH07XHJcblxyXG4gICAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cclxuXHJcbiAgICAvLyBBbmd1bGFyIGxpZmVjeWNsZSBob29rcy5cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMucGxhY2Vob2xkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uc0xpc3QoY2hhbmdlc1snb3B0aW9ucyddLmlzRmlyc3RDaGFuZ2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdub0ZpbHRlcicpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bU9wdGlvbnM6IG51bWJlciA9IHRoaXMub3B0aW9uTGlzdC5vcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgbWluTnVtT3B0aW9uczogbnVtYmVyID0gY2hhbmdlc1snbm9GaWx0ZXInXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRW5hYmxlZCA9IG51bU9wdGlvbnMgPj0gbWluTnVtT3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2luZG93LlxyXG5cclxuICAgIG9uV2luZG93Q2xpY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbGVjdCBjb250YWluZXIuXHJcblxyXG4gICAgb25TZWxlY3RDb250YWluZXJDbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RDb250YWluZXJGb2N1cygpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEcm9wZG93biBjb250YWluZXIuXHJcblxyXG4gICAgb25Ecm9wZG93bk9wdGlvbkNsaWNrZWQob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLm11bHRpcGxlID9cclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RPcHRpb24ob3B0aW9uKSA6IHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wZG93bkNsb3NlKGZvY3VzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oZm9jdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmdsZSBmaWx0ZXIgaW5wdXQuXHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJDbGljaygpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVySW5wdXQodGVybTogc3RyaW5nKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0ZXJtLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZWQuZW1pdCh0ZXJtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcih0ZXJtKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTXVsdGlwbGUgZmlsdGVyIGlucHV0LlxyXG5cclxuICAgIG9uTXVsdGlwbGVGaWx0ZXJJbnB1dChldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmdsZSBjbGVhciBzZWxlY3QuXHJcblxyXG4gICAgb25DbGVhclNlbGVjdGlvbkNsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNdWx0aXBsZSBkZXNlbGVjdCBvcHRpb24uXHJcblxyXG4gICAgb25EZXNlbGVjdE9wdGlvbkNsaWNrKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQVBJLiAqKi9cclxuXHJcbiAgICAvLyBUT0RPIGZpeCBpc3N1ZXMgd2l0aCBnbG9iYWwgY2xpY2sva2V5IGhhbmRsZXIgdGhhdCBjbG9zZXMgdGhlIGRyb3Bkb3duLlxyXG4gICAgb3BlbigpIHtcclxuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3QodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5nZXRPcHRpb25zQnlWYWx1ZSh2YWx1ZSkuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIG1ldGhvZHMuICoqL1xyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVmFsdWUuICoqL1xyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5fdmFsdWUgOiB0aGlzLl92YWx1ZVswXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcgfHwgdiA9PT0gbnVsbCB8fCB2ID09PSAnJykge1xyXG4gICAgICAgICAgICB2ID0gW107XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdiA9IFt2XTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHYpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIU9wdGlvbkxpc3QuZXF1YWxWYWx1ZXModiwgdGhpcy5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC52YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5vcHRpb25MaXN0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLmhhc1NlbGVjdGVkID0gdGhpcy5fdmFsdWUubGVuZ3RoID4gMDtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMuaGFzU2VsZWN0ZWQgPyAnJyA6IHRoaXMucGxhY2Vob2xkZXI7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBJbml0aWFsaXphdGlvbi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPcHRpb25zTGlzdChmaXJzdFRpbWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgdjogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgaWYgKCFmaXJzdFRpbWUpIHtcclxuICAgICAgICAgICAgdiA9IHRoaXMub3B0aW9uTGlzdC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdCA9IG5ldyBPcHRpb25MaXN0KHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC52YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEcm9wZG93bi4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSB0b2dnbGVEcm9wZG93bigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlbkRyb3Bkb3duKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaWR0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9wZW5lZC5lbWl0KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICBwcml2YXRlIGNsb3NlRHJvcGRvd24oZm9jdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVySW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICAvKiogU2VsZWN0LiAqKi9cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIGlmICghb3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5zZWxlY3Qob3B0aW9uLCB0aGlzLm11bHRpcGxlKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KG9wdGlvbi51bmRlY29yYXRlZENvcHkoKSk7XHJcbiAgICAgICAgICAgIC8vIElzIHRoaXMgbm90IGFsbHJlYWR5IGRvbmUgd2hlbiBzZXR0aW5nIHRoZSB2YWx1ZT8/XHJcbiAgICAgICAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmRlc2VsZWN0KG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KG9wdGlvbi51bmRlY29yYXRlZENvcHkoKSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uOiBBcnJheTxPcHRpb24+ID0gdGhpcy5vcHRpb25MaXN0LnNlbGVjdGlvbjtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQoc2VsZWN0aW9uWzBdLnVuZGVjb3JhdGVkQ29weSgpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KHNlbGVjdGlvbi5tYXAoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b2dnbGVTZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgP1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0SGlnaGxpZ2h0ZWRPcHRpb24oKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0ZWRPcHRpb247XHJcbiAgICAgICAgaWYgKG9wdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzZWxlY3RMYXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHNlbDogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChzZWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb246IE9wdGlvbiA9IHNlbFtzZWwubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNdWx0aXBsZUZpbHRlcklucHV0KG9wdGlvbi5sYWJlbCArICcgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBGaWx0ZXIuICoqL1xyXG5cclxuICAgIHByaXZhdGUgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5jbGVhckZpbHRlcklucHV0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRVNDIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5ID09PSB0aGlzLktFWVMuVVAgJiYgZXZlbnQuYWx0S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLlRBQikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRU5URVIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGlnaGxpZ2h0ZWRPcHRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5VUCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodFByZXZpb3VzT3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRE9XTikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE5leHRPcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FTlRFUiB8fCBrZXkgPT09IHRoaXMuS0VZUy5TUEFDRSB8fFxyXG4gICAgICAgICAgICAgICAgKGtleSA9PT0gdGhpcy5LRVlTLkRPV04gJiYgZXZlbnQuYWx0S2V5KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIEZJUkVGT1ggSEFDSzpcclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKiBUaGUgc2V0VGltZW91dCBpcyBhZGRlZCB0byBwcmV2ZW50IHRoZSBlbnRlciBrZXlkb3duIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgKiB0byBiZSB0cmlnZ2VyZWQgZm9yIHRoZSBmaWx0ZXIgaW5wdXQgZmllbGQsIHdoaWNoIGNhdXNlc1xyXG4gICAgICAgICAgICAgICAgICogdGhlIGRyb3Bkb3duIHRvIGJlIGNsb3NlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMub3BlbkRyb3Bkb3duKCk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5CQUNLU1BBQ0UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzU2VsZWN0ZWQgJiYgdGhpcy5maWx0ZXJFbmFibGVkICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0TGFzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHwga2V5ID09PSB0aGlzLktFWVMuVEFCXHJcbiAgICAgICAgICAgIHx8IGtleSA9PT0gdGhpcy5LRVlTLlVQIHx8IGtleSA9PT0gdGhpcy5LRVlTLkRPV05cclxuICAgICAgICAgICAgfHwga2V5ID09PSB0aGlzLktFWVMuRU5URVIpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZpZXcuICoqL1xyXG5cclxuICAgIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBibHVyKCkge1xyXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV2lkdGgoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLmxlZnQgPSBlLm9mZnNldExlZnQ7XHJcbiAgICAgICAgdGhpcy50b3AgPSBlLm9mZnNldFRvcCArIGUub2Zmc2V0SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUZpbHRlcldpZHRoKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5maWx0ZXJJbnB1dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dFdpZHRoID0gdmFsdWUubGVuZ3RoID09PSAwID9cclxuICAgICAgICAgICAgICAgIDEgKyB0aGlzLnBsYWNlaG9sZGVyVmlldy5sZW5ndGggKiAxMCA6IDEgKyB2YWx1ZS5sZW5ndGggKiAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19