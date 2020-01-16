import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STYLE } from './select.component.style';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
// tslint:disable-block
export var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
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
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    /** Event handlers. **/
    // Angular lifecycle hooks.
    SelectComponent.prototype.ngOnInit = function () {
        this.placeholderView = this.placeholder;
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        this.updateFilterWidth();
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
        if (changes.hasOwnProperty('noFilter')) {
            var numOptions = this.optionList.options.length;
            var minNumOptions = changes['noFilter'].currentValue;
            this.filterEnabled = numOptions >= minNumOptions;
        }
    };
    // Window.
    SelectComponent.prototype.onWindowClick = function () {
        if (!this.selectContainerClicked) {
            this.closeDropdown();
        }
        this.clearClicked = false;
        this.selectContainerClicked = false;
    };
    SelectComponent.prototype.onWindowResize = function () {
        this.updateWidth();
    };
    // Select container.
    SelectComponent.prototype.onSelectContainerClick = function (event) {
        this.selectContainerClicked = true;
        if (!this.clearClicked) {
            this.toggleDropdown();
        }
    };
    SelectComponent.prototype.onSelectContainerFocus = function () {
        this.onTouched();
    };
    SelectComponent.prototype.onSelectContainerKeydown = function (event) {
        this.handleSelectContainerKeydown(event);
    };
    // Dropdown container.
    SelectComponent.prototype.onDropdownOptionClicked = function (option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
    };
    SelectComponent.prototype.onDropdownClose = function (focus) {
        this.closeDropdown(focus);
    };
    // Single filter input.
    SelectComponent.prototype.onSingleFilterClick = function () {
        this.selectContainerClicked = true;
    };
    SelectComponent.prototype.onSingleFilterInput = function (term) {
        var _this = this;
        setTimeout(function () {
            if (term.length > 2) {
                _this.typed.emit(term);
            }
        }, 500);
        this.optionList.filter(term);
    };
    SelectComponent.prototype.onSingleFilterKeydown = function (event) {
        this.handleSingleFilterKeydown(event);
    };
    // Multiple filter input.
    SelectComponent.prototype.onMultipleFilterInput = function (event) {
        var _this = this;
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        setTimeout(function () {
            _this.optionList.filter(event.target.value);
        });
    };
    SelectComponent.prototype.onMultipleFilterKeydown = function (event) {
        this.handleMultipleFilterKeydown(event);
    };
    // Single clear select.
    SelectComponent.prototype.onClearSelectionClick = function (event) {
        this.clearClicked = true;
        this.clearSelection();
        this.closeDropdown(true);
    };
    // Multiple deselect option.
    SelectComponent.prototype.onDeselectOptionClick = function (option) {
        this.clearClicked = true;
        this.deselectOption(option);
    };
    /** API. **/
    // TODO fix issues with global click/key handler that closes the dropdown.
    SelectComponent.prototype.open = function () {
        this.openDropdown();
    };
    SelectComponent.prototype.close = function () {
        this.closeDropdown();
    };
    SelectComponent.prototype.clear = function () {
        this.clearSelection();
    };
    SelectComponent.prototype.select = function (value) {
        var _this = this;
        this.optionList.getOptionsByValue(value).forEach(function (option) {
            _this.selectOption(option);
        });
        this.valueChanged();
    };
    /** ControlValueAccessor interface methods. **/
    SelectComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    SelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(SelectComponent.prototype, "value", {
        /** Value. **/
        get: function () {
            if (this._value.length === 0) {
                return '';
            }
            else {
                return this.multiple ? this._value : this._value[0];
            }
        },
        set: function (v) {
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
    SelectComponent.prototype.valueChanged = function () {
        this._value = this.optionList.value;
        this.hasSelected = this._value.length > 0;
        this.placeholderView = this.hasSelected ? '' : this.placeholder;
        this.updateFilterWidth();
        this.onChange(this.value);
    };
    /** Initialization. **/
    SelectComponent.prototype.updateOptionsList = function (firstTime) {
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
    SelectComponent.prototype.toggleDropdown = function () {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    };
    SelectComponent.prototype.openDropdown = function () {
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
    SelectComponent.prototype.closeDropdown = function (focus) {
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
    SelectComponent.prototype.selectOption = function (option) {
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
    SelectComponent.prototype.deselectOption = function (option) {
        var _this = this;
        if (option.selected) {
            this.optionList.deselect(option);
            this.valueChanged();
            this.deselected.emit(option.undecoratedCopy());
            setTimeout(function () {
                if (_this.multiple) {
                    // this.updateFilterWidth();
                    _this.updatePosition();
                    _this.optionList.highlight();
                    if (_this.isOpen) {
                        _this.dropdown.moveHighlightedIntoView();
                    }
                }
            });
        }
    };
    SelectComponent.prototype.clearSelection = function () {
        var selection = this.optionList.selection;
        if (selection.length > 0) {
            this.optionList.clearSelection();
            this.valueChanged();
            if (selection.length === 1) {
                this.deselected.emit(selection[0].undecoratedCopy());
            }
            else {
                this.deselected.emit(selection.map(function (option) {
                    return option.undecoratedCopy();
                }));
            }
        }
    };
    SelectComponent.prototype.toggleSelectOption = function (option) {
        option.selected ?
            this.deselectOption(option) : this.selectOption(option);
    };
    SelectComponent.prototype.selectHighlightedOption = function () {
        var option = this.optionList.highlightedOption;
        if (option !== null) {
            this.selectOption(option);
            this.closeDropdown(true);
        }
    };
    SelectComponent.prototype.deselectLast = function () {
        var sel = this.optionList.selection;
        if (sel.length > 0) {
            var option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    };
    /** Filter. **/
    SelectComponent.prototype.clearFilterInput = function () {
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
        else {
            this.dropdown.clearFilterInput();
        }
    };
    SelectComponent.prototype.setMultipleFilterInput = function (value) {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = value;
        }
    };
    SelectComponent.prototype.handleSelectContainerKeydown = function (event) {
        var _this = this;
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
                setTimeout(function () { _this.openDropdown(); });
            }
        }
    };
    SelectComponent.prototype.handleMultipleFilterKeydown = function (event) {
        var key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected && this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    };
    SelectComponent.prototype.handleSingleFilterKeydown = function (event) {
        var key = event.which;
        if (key === this.KEYS.ESC || key === this.KEYS.TAB
            || key === this.KEYS.UP || key === this.KEYS.DOWN
            || key === this.KEYS.ENTER) {
            this.handleSelectContainerKeydown(event);
        }
    };
    /** View. **/
    SelectComponent.prototype.focus = function () {
        this.hasFocus = true;
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
        else {
            this.selectionSpan.nativeElement.focus();
        }
    };
    SelectComponent.prototype.blur = function () {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    };
    SelectComponent.prototype.updateWidth = function () {
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    };
    SelectComponent.prototype.updatePosition = function () {
        var e = this.selectionSpan.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    };
    SelectComponent.prototype.updateFilterWidth = function () {
        if (typeof this.filterInput !== 'undefined') {
            var value = this.filterInput.nativeElement.value;
            this.filterInputWidth = value.length === 0 ?
                1 + this.placeholderView.length * 10 : 1 + value.length * 10;
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
    return SelectComponent;
}());
export { SelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsdUJBQXVCO0FBQ3ZCLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFxQjtJQUNuRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGVBQWUsRUFBZixDQUFlLENBQUM7SUFDOUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBVUY7SUFSQTtRQVVJLGFBQWE7UUFFTCxTQUFJLEdBQVE7WUFDaEIsU0FBUyxFQUFFLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxFQUFFO1lBQ1QsR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBSU8sZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsU0FBUyxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLE1BQU0sQ0FB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QkFBcUIsQ0FBQztZQUNsQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtxQkFGNUIsS0FBSztTQUdqQixDQUFDO09BRVcsZUFBZSxDQW9lM0I7SUFBRCxzQkFBQztDQUFBLEFBcGVELElBb2VDO1NBcGVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgRXhpc3RpbmdQcm92aWRlcixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgZm9yd2FyZFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50LnN0eWxlJztcclxuaW1wb3J0IHsgU2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLWJsb2NrXHJcbmV4cG9ydCBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IEV4aXN0aW5nUHJvdmlkZXIgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlczogW1NUWUxFXSxcclxuICAgIHByb3ZpZGVyczogW1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50XHJcbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgICAvKiogS2V5cy4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBLRVlTOiBhbnkgPSB7XHJcbiAgICAgICAgQkFDS1NQQUNFOiA4LFxyXG4gICAgICAgIFRBQjogOSxcclxuICAgICAgICBFTlRFUjogMTMsXHJcbiAgICAgICAgRVNDOiAyNyxcclxuICAgICAgICBTUEFDRTogMzIsXHJcbiAgICAgICAgVVA6IDM4LFxyXG4gICAgICAgIERPV046IDQwXHJcbiAgICB9O1xyXG5cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XHJcblxyXG4gICAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGhpZ2hsaWdodENvbG9yID0gJyMyMTk2ZjMnO1xyXG4gICAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yID0gJyNmZmYnO1xyXG4gICAgQElucHV0KCkgbXVsdGlwbGUgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIG5vRmlsdGVyID0gMDtcclxuICAgIEBJbnB1dCgpIG5vdEZvdW5kTXNnID0gJ05vIHJlc3VsdHMgZm91bmQnO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcclxuXHJcbiAgICBAT3V0cHV0KCkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgZGVzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSB0eXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uJywge3N0YXRpYzogZmFsc2V9KSBzZWxlY3Rpb25TcGFuOiBhbnk7XHJcbiAgICBAVmlld0NoaWxkKCdkcm9wZG93bicsIHtzdGF0aWM6IGZhbHNlfSkgZHJvcGRvd246IFNlbGVjdERyb3Bkb3duQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnLCB7c3RhdGljOiBmYWxzZX0pIGZpbHRlcklucHV0OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XHJcblxyXG4gICAgLy8gU2VsZWN0aW9uIHN0YXRlIHZhcmlhYmxlcy5cclxuICAgIGhhc1NlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVmlldyBzdGF0ZSB2YXJpYWJsZXMuXHJcbiAgICBmaWx0ZXJFbmFibGVkID0gdHJ1ZTtcclxuICAgIGZpbHRlcklucHV0V2lkdGggPSAxO1xyXG4gICAgaGFzRm9jdXMgPSBmYWxzZTtcclxuICAgIGlzQmVsb3cgPSB0cnVlO1xyXG4gICAgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgaXNPcGVuID0gZmFsc2U7XHJcbiAgICBwbGFjZWhvbGRlclZpZXcgPSAnJztcclxuXHJcbiAgICBjbGVhckNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBXaWR0aCBhbmQgcG9zaXRpb24gZm9yIHRoZSBkcm9wZG93biBjb250YWluZXIuXHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgdG9wOiBudW1iZXI7XHJcbiAgICBsZWZ0OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuICAgIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4geyB9O1xyXG5cclxuICAgIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXHJcblxyXG4gICAgLy8gQW5ndWxhciBsaWZlY3ljbGUgaG9va3MuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLnBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnNMaXN0KGNoYW5nZXNbJ29wdGlvbnMnXS5pc0ZpcnN0Q2hhbmdlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbm9GaWx0ZXInKSkge1xyXG4gICAgICAgICAgICBjb25zdCBudW1PcHRpb25zOiBudW1iZXIgPSB0aGlzLm9wdGlvbkxpc3Qub3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbk51bU9wdGlvbnM6IG51bWJlciA9IGNoYW5nZXNbJ25vRmlsdGVyJ10uY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckVuYWJsZWQgPSBudW1PcHRpb25zID49IG1pbk51bU9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdpbmRvdy5cclxuXHJcbiAgICBvbldpbmRvd0NsaWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZWxlY3QgY29udGFpbmVyLlxyXG5cclxuICAgIG9uU2VsZWN0Q29udGFpbmVyQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNsZWFyQ2xpY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2VsZWN0Q29udGFpbmVyRm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRHJvcGRvd24gY29udGFpbmVyLlxyXG5cclxuICAgIG9uRHJvcGRvd25PcHRpb25DbGlja2VkKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBsZSA/XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJvcGRvd25DbG9zZShmb2N1czogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKGZvY3VzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5nbGUgZmlsdGVyIGlucHV0LlxyXG5cclxuICAgIG9uU2luZ2xlRmlsdGVyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblNpbmdsZUZpbHRlcklucHV0KHRlcm06IHN0cmluZykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGVybS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVkLmVtaXQodGVybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXIodGVybSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE11bHRpcGxlIGZpbHRlciBpbnB1dC5cclxuXHJcbiAgICBvbk11bHRpcGxlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5nbGUgY2xlYXIgc2VsZWN0LlxyXG5cclxuICAgIG9uQ2xlYXJTZWxlY3Rpb25DbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTXVsdGlwbGUgZGVzZWxlY3Qgb3B0aW9uLlxyXG5cclxuICAgIG9uRGVzZWxlY3RPcHRpb25DbGljayhvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFQSS4gKiovXHJcblxyXG4gICAgLy8gVE9ETyBmaXggaXNzdWVzIHdpdGggZ2xvYmFsIGNsaWNrL2tleSBoYW5kbGVyIHRoYXQgY2xvc2VzIHRoZSBkcm9wZG93bi5cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWUpLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSBtZXRob2RzLiAqKi9cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZhbHVlLiAqKi9cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3ZhbHVlIDogdGhpcy5fdmFsdWVbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2OiBhbnkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09ICd1bmRlZmluZWQnIHx8IHYgPT09IG51bGwgfHwgdiA9PT0gJycpIHtcclxuICAgICAgICAgICAgdiA9IFtdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHYgPSBbdl07XHJcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFPcHRpb25MaXN0LmVxdWFsVmFsdWVzKHYsIHRoaXMuX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QudmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMub3B0aW9uTGlzdC52YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5oYXNTZWxlY3RlZCA9IHRoaXMuX3ZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLmhhc1NlbGVjdGVkID8gJycgOiB0aGlzLnBsYWNlaG9sZGVyO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT3B0aW9uc0xpc3QoZmlyc3RUaW1lOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHY6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGlmICghZmlyc3RUaW1lKSB7XHJcbiAgICAgICAgICAgIHYgPSB0aGlzLm9wdGlvbkxpc3QudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3QgPSBuZXcgT3B0aW9uTGlzdCh0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIWZpcnN0VGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QudmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRHJvcGRvd24uICoqL1xyXG5cclxuICAgIHByaXZhdGUgdG9nZ2xlRHJvcGRvd24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5Ecm9wZG93bigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcGVuZWQuZW1pdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZURyb3Bkb3duKGZvY3VzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcklucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChmb2N1cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xyXG4gICAgLyoqIFNlbGVjdC4gKiovXHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBpZiAoIW9wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0KG9wdGlvbiwgdGhpcy5tdWx0aXBsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCkpO1xyXG4gICAgICAgICAgICAvLyBJcyB0aGlzIG5vdCBhbGxyZWFkeSBkb25lIHdoZW4gc2V0dGluZyB0aGUgdmFsdWU/P1xyXG4gICAgICAgICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5kZXNlbGVjdChvcHRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCkpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbjogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KHNlbGVjdGlvblswXS51bmRlY29yYXRlZENvcHkoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChzZWxlY3Rpb24ubWFwKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID9cclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pIDogdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdEhpZ2hsaWdodGVkT3B0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodGVkT3B0aW9uO1xyXG4gICAgICAgIGlmIChvcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc2VsZWN0TGFzdCgpIHtcclxuICAgICAgICBjb25zdCBzZWw6IEFycmF5PE9wdGlvbj4gPSB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoc2VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSBzZWxbc2VsLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dChvcHRpb24ubGFiZWwgKyAnICcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRmlsdGVyLiAqKi9cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyRmlsdGVySW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uY2xlYXJGaWx0ZXJJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE11bHRpcGxlRmlsdGVySW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVTQyB8fFxyXG4gICAgICAgICAgICAgICAgKGtleSA9PT0gdGhpcy5LRVlTLlVQICYmIGV2ZW50LmFsdEtleSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5UQUIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhpZ2hsaWdodGVkT3B0aW9uKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuVVApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRQcmV2aW91c09wdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkRPV04pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHROZXh0T3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlsdGVyRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRU5URVIgfHwga2V5ID09PSB0aGlzLktFWVMuU1BBQ0UgfHxcclxuICAgICAgICAgICAgICAgIChrZXkgPT09IHRoaXMuS0VZUy5ET1dOICYmIGV2ZW50LmFsdEtleSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBGSVJFRk9YIEhBQ0s6XHJcbiAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICogVGhlIHNldFRpbWVvdXQgaXMgYWRkZWQgdG8gcHJldmVudCB0aGUgZW50ZXIga2V5ZG93biBldmVudFxyXG4gICAgICAgICAgICAgICAgICogdG8gYmUgdHJpZ2dlcmVkIGZvciB0aGUgZmlsdGVyIGlucHV0IGZpZWxkLCB3aGljaCBjYXVzZXNcclxuICAgICAgICAgICAgICAgICAqIHRoZSBkcm9wZG93biB0byBiZSBjbG9zZWQgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLm9wZW5Ecm9wZG93bigpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVNdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuQkFDS1NQQUNFKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1NlbGVjdGVkICYmIHRoaXMuZmlsdGVyRW5hYmxlZCAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdExhc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRVNDIHx8IGtleSA9PT0gdGhpcy5LRVlTLlRBQlxyXG4gICAgICAgICAgICB8fCBrZXkgPT09IHRoaXMuS0VZUy5VUCB8fCBrZXkgPT09IHRoaXMuS0VZUy5ET1dOXHJcbiAgICAgICAgICAgIHx8IGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWaWV3LiAqKi9cclxuXHJcbiAgICBmb2N1cygpIHtcclxuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmx1cigpIHtcclxuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVdpZHRoKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcclxuICAgICAgICBjb25zdCBlID0gdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gZS5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIHRoaXMudG9wID0gZS5vZmZzZXRUb3AgKyBlLm9mZnNldEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGaWx0ZXJXaWR0aCgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVySW5wdXQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXRXaWR0aCA9IHZhbHVlLmxlbmd0aCA9PT0gMCA/XHJcbiAgICAgICAgICAgICAgICAxICsgdGhpcy5wbGFjZWhvbGRlclZpZXcubGVuZ3RoICogMTAgOiAxICsgdmFsdWUubGVuZ3RoICogMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==