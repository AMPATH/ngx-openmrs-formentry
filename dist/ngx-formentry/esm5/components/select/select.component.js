import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STYLE } from './select.component.style';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
export var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable:no-use-before-declare
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
        this.multiple ? this.toggleSelectOption(option) : this.selectOption(option);
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
        option.selected ? this.deselectOption(option) : this.selectOption(option);
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
            if (key === this.KEYS.ESC || (key === this.KEYS.UP && event.altKey)) {
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
            if (key === this.KEYS.ENTER ||
                key === this.KEYS.SPACE ||
                (key === this.KEYS.DOWN && event.altKey)) {
                /* FIREFOX HACK:
                 *
                 * The setTimeout is added to prevent the enter keydown event
                 * to be triggered for the filter input field, which causes
                 * the dropdown to be closed again.
                 */
                setTimeout(function () {
                    _this.openDropdown();
                });
            }
        }
    };
    SelectComponent.prototype.handleMultipleFilterKeydown = function (event) {
        var key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected &&
                this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    };
    SelectComponent.prototype.handleSingleFilterKeydown = function (event) {
        var key = event.which;
        if (key === this.KEYS.ESC ||
            key === this.KEYS.TAB ||
            key === this.KEYS.UP ||
            key === this.KEYS.DOWN ||
            key === this.KEYS.ENTER) {
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
            this.filterInputWidth =
                value.length === 0
                    ? 1 + this.placeholderView.length * 10
                    : 1 + value.length * 10;
        }
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select',
                    template: "<div\n  #selection\n  [attr.tabindex]=\"disabled ? null : 0\"\n  [ngClass]=\"{\n    open: isOpen,\n    focus: hasFocus,\n    below: isBelow,\n    disabled: disabled\n  }\"\n  (click)=\"onSelectContainerClick($event)\"\n  (focus)=\"onSelectContainerFocus()\"\n  (keydown)=\"onSelectContainerKeydown($event)\"\n  (window:click)=\"onWindowClick()\"\n  (window:resize)=\"onWindowResize()\"\n>\n  <div class=\"single\" *ngIf=\"!multiple\">\n    <div class=\"value\" *ngIf=\"optionList.hasSelected()\">\n      {{ optionList.selection[0].label }}\n    </div>\n    <div class=\"placeholder\" *ngIf=\"!optionList.hasSelected()\">\n      {{ placeholderView }}\n    </div>\n    <div\n      class=\"clear\"\n      *ngIf=\"allowClear\"\n      (click)=\"onClearSelectionClick($event)\"\n    >\n      &#x2715;\n    </div>\n    <div class=\"toggle\" *ngIf=\"isOpen\">&#x25B2;</div>\n    <div class=\"toggle\" *ngIf=\"!isOpen\">&#x25BC;</div>\n  </div>\n\n  <div class=\"multiple\" *ngIf=\"multiple\">\n    <div class=\"option\" *ngFor=\"let option of optionList.selection\">\n      <span class=\"deselect-option\" (click)=\"onDeselectOptionClick(option)\">\n        &#x2715;\n      </span>\n      {{ option.label }}\n    </div>\n    <input\n      *ngIf=\"filterEnabled\"\n      #filterInput\n      tabindex=\"-1\"\n      [placeholder]=\"placeholderView\"\n      [ngStyle]=\"{ 'width.px': filterInputWidth }\"\n      (input)=\"onMultipleFilterInput($event)\"\n      (keydown)=\"onMultipleFilterKeydown($event)\"\n    />\n  </div>\n</div>\n<select-dropdown\n  *ngIf=\"isOpen\"\n  #dropdown\n  [multiple]=\"multiple\"\n  [optionList]=\"optionList\"\n  [notFoundMsg]=\"notFoundMsg\"\n  [highlightColor]=\"highlightColor\"\n  [highlightTextColor]=\"highlightTextColor\"\n  [filterEnabled]=\"filterEnabled\"\n  [width]=\"width\"\n  [top]=\"top\"\n  [left]=\"left\"\n  (close)=\"onDropdownClose($event)\"\n  (optionClicked)=\"onDropdownOptionClicked($event)\"\n  (singleFilterClick)=\"onSingleFilterClick()\"\n  (singleFilterInput)=\"onSingleFilterInput($event)\"\n  (singleFilterKeydown)=\"onSingleFilterKeydown($event)\"\n>\n</select-dropdown>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQXFCO0lBQ3JELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsdUNBQXVDO0lBQ3ZDLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGVBQWUsRUFBZixDQUFlLENBQUM7SUFDOUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7SUFBQTtRQStFRSxhQUFhO1FBRUwsU0FBSSxHQUFRO1lBQ2xCLFNBQVMsRUFBRSxDQUFDO1lBQ1osR0FBRyxFQUFFLENBQUM7WUFDTixLQUFLLEVBQUUsRUFBRTtZQUNULEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7WUFDVCxFQUFFLEVBQUUsRUFBRTtZQUNOLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUlPLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixtQkFBYyxHQUFHLFNBQVMsQ0FBQztRQUMzQix1QkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDNUIsYUFBUSxH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bnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFeGlzdGluZ1Byb3ZpZGVyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU1RZTEUgfSBmcm9tICcuL3NlbGVjdC5jb21wb25lbnQuc3R5bGUnO1xuaW1wb3J0IHsgU2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgT3B0aW9uTGlzdCB9IGZyb20gJy4vb3B0aW9uLWxpc3QnO1xuXG5leHBvcnQgY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBFeGlzdGluZ1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gdHNsaW50OmRpc2FibGU6bm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgI3NlbGVjdGlvblxuICBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiAwXCJcbiAgW25nQ2xhc3NdPVwie1xuICAgIG9wZW46IGlzT3BlbixcbiAgICBmb2N1czogaGFzRm9jdXMsXG4gICAgYmVsb3c6IGlzQmVsb3csXG4gICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gIH1cIlxuICAoY2xpY2spPVwib25TZWxlY3RDb250YWluZXJDbGljaygkZXZlbnQpXCJcbiAgKGZvY3VzKT1cIm9uU2VsZWN0Q29udGFpbmVyRm9jdXMoKVwiXG4gIChrZXlkb3duKT1cIm9uU2VsZWN0Q29udGFpbmVyS2V5ZG93bigkZXZlbnQpXCJcbiAgKHdpbmRvdzpjbGljayk9XCJvbldpbmRvd0NsaWNrKClcIlxuICAod2luZG93OnJlc2l6ZSk9XCJvbldpbmRvd1Jlc2l6ZSgpXCJcbj5cbiAgPGRpdiBjbGFzcz1cInNpbmdsZVwiICpuZ0lmPVwiIW11bHRpcGxlXCI+XG4gICAgPGRpdiBjbGFzcz1cInZhbHVlXCIgKm5nSWY9XCJvcHRpb25MaXN0Lmhhc1NlbGVjdGVkKClcIj5cbiAgICAgIHt7IG9wdGlvbkxpc3Quc2VsZWN0aW9uWzBdLmxhYmVsIH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyXCIgKm5nSWY9XCIhb3B0aW9uTGlzdC5oYXNTZWxlY3RlZCgpXCI+XG4gICAgICB7eyBwbGFjZWhvbGRlclZpZXcgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImNsZWFyXCJcbiAgICAgICpuZ0lmPVwiYWxsb3dDbGVhclwiXG4gICAgICAoY2xpY2spPVwib25DbGVhclNlbGVjdGlvbkNsaWNrKCRldmVudClcIlxuICAgID5cbiAgICAgICYjeDI3MTU7XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRvZ2dsZVwiICpuZ0lmPVwiaXNPcGVuXCI+JiN4MjVCMjs8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlXCIgKm5nSWY9XCIhaXNPcGVuXCI+JiN4MjVCQzs8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cIm11bHRpcGxlXCIgKm5nSWY9XCJtdWx0aXBsZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJvcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbkxpc3Quc2VsZWN0aW9uXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImRlc2VsZWN0LW9wdGlvblwiIChjbGljayk9XCJvbkRlc2VsZWN0T3B0aW9uQ2xpY2sob3B0aW9uKVwiPlxuICAgICAgICAmI3gyNzE1O1xuICAgICAgPC9zcGFuPlxuICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgPC9kaXY+XG4gICAgPGlucHV0XG4gICAgICAqbmdJZj1cImZpbHRlckVuYWJsZWRcIlxuICAgICAgI2ZpbHRlcklucHV0XG4gICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclZpZXdcIlxuICAgICAgW25nU3R5bGVdPVwieyAnd2lkdGgucHgnOiBmaWx0ZXJJbnB1dFdpZHRoIH1cIlxuICAgICAgKGlucHV0KT1cIm9uTXVsdGlwbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duKT1cIm9uTXVsdGlwbGVGaWx0ZXJLZXlkb3duKCRldmVudClcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC9kaXY+XG48c2VsZWN0LWRyb3Bkb3duXG4gICpuZ0lmPVwiaXNPcGVuXCJcbiAgI2Ryb3Bkb3duXG4gIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gIFtvcHRpb25MaXN0XT1cIm9wdGlvbkxpc3RcIlxuICBbbm90Rm91bmRNc2ddPVwibm90Rm91bmRNc2dcIlxuICBbaGlnaGxpZ2h0Q29sb3JdPVwiaGlnaGxpZ2h0Q29sb3JcIlxuICBbaGlnaGxpZ2h0VGV4dENvbG9yXT1cImhpZ2hsaWdodFRleHRDb2xvclwiXG4gIFtmaWx0ZXJFbmFibGVkXT1cImZpbHRlckVuYWJsZWRcIlxuICBbd2lkdGhdPVwid2lkdGhcIlxuICBbdG9wXT1cInRvcFwiXG4gIFtsZWZ0XT1cImxlZnRcIlxuICAoY2xvc2UpPVwib25Ecm9wZG93bkNsb3NlKCRldmVudClcIlxuICAob3B0aW9uQ2xpY2tlZCk9XCJvbkRyb3Bkb3duT3B0aW9uQ2xpY2tlZCgkZXZlbnQpXCJcbiAgKHNpbmdsZUZpbHRlckNsaWNrKT1cIm9uU2luZ2xlRmlsdGVyQ2xpY2soKVwiXG4gIChzaW5nbGVGaWx0ZXJJbnB1dCk9XCJvblNpbmdsZUZpbHRlcklucHV0KCRldmVudClcIlxuICAoc2luZ2xlRmlsdGVyS2V5ZG93bik9XCJvblNpbmdsZUZpbHRlcktleWRvd24oJGV2ZW50KVwiXG4+XG48L3NlbGVjdC1kcm9wZG93bj5cbmAsXG4gIHN0eWxlczogW1NUWUxFXSxcbiAgcHJvdmlkZXJzOiBbU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQge1xuICAvKiogS2V5cy4gKiovXG5cbiAgcHJpdmF0ZSBLRVlTOiBhbnkgPSB7XG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIFRBQjogOSxcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyNyxcbiAgICBTUEFDRTogMzIsXG4gICAgVVA6IDM4LFxuICAgIERPV046IDQwXG4gIH07XG5cbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcblxuICBASW5wdXQoKSBhbGxvd0NsZWFyID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhpZ2hsaWdodENvbG9yID0gJyMyMTk2ZjMnO1xuICBASW5wdXQoKSBoaWdobGlnaHRUZXh0Q29sb3IgPSAnI2ZmZic7XG4gIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG5vRmlsdGVyID0gMDtcbiAgQElucHV0KCkgbm90Rm91bmRNc2cgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQE91dHB1dCgpIG9wZW5lZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGRlc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB0eXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdzZWxlY3Rpb24nKSBzZWxlY3Rpb25TcGFuOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duJykgZHJvcGRvd246IFNlbGVjdERyb3Bkb3duQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0OiBhbnk7XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcbiAgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcblxuICAvLyBTZWxlY3Rpb24gc3RhdGUgdmFyaWFibGVzLlxuICBoYXNTZWxlY3RlZCA9IGZhbHNlO1xuXG4gIC8vIFZpZXcgc3RhdGUgdmFyaWFibGVzLlxuICBmaWx0ZXJFbmFibGVkID0gdHJ1ZTtcbiAgZmlsdGVySW5wdXRXaWR0aCA9IDE7XG4gIGhhc0ZvY3VzID0gZmFsc2U7XG4gIGlzQmVsb3cgPSB0cnVlO1xuICBpc0Rpc2FibGVkID0gZmFsc2U7XG4gIGlzT3BlbiA9IGZhbHNlO1xuICBwbGFjZWhvbGRlclZpZXcgPSAnJztcblxuICBjbGVhckNsaWNrZWQgPSBmYWxzZTtcbiAgc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IGZhbHNlO1xuXG4gIC8vIFdpZHRoIGFuZCBwb3NpdGlvbiBmb3IgdGhlIGRyb3Bkb3duIGNvbnRhaW5lci5cbiAgd2lkdGg6IG51bWJlcjtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcblxuICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cblxuICAvLyBBbmd1bGFyIGxpZmVjeWNsZSBob29rcy5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMucGxhY2Vob2xkZXI7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xuICAgICAgdGhpcy51cGRhdGVPcHRpb25zTGlzdChjaGFuZ2VzWydvcHRpb25zJ10uaXNGaXJzdENoYW5nZSgpKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ25vRmlsdGVyJykpIHtcbiAgICAgIGNvbnN0IG51bU9wdGlvbnM6IG51bWJlciA9IHRoaXMub3B0aW9uTGlzdC5vcHRpb25zLmxlbmd0aDtcbiAgICAgIGNvbnN0IG1pbk51bU9wdGlvbnM6IG51bWJlciA9IGNoYW5nZXNbJ25vRmlsdGVyJ10uY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5maWx0ZXJFbmFibGVkID0gbnVtT3B0aW9ucyA+PSBtaW5OdW1PcHRpb25zO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdpbmRvdy5cblxuICBvbldpbmRvd0NsaWNrKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkKSB7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9XG4gICAgdGhpcy5jbGVhckNsaWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcbiAgfVxuXG4gIG9uV2luZG93UmVzaXplKCkge1xuICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIC8vIFNlbGVjdCBjb250YWluZXIuXG5cbiAgb25TZWxlY3RDb250YWluZXJDbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuY2xlYXJDbGlja2VkKSB7XG4gICAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgb25TZWxlY3RDb250YWluZXJGb2N1cygpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICB9XG5cbiAgb25TZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xuICB9XG5cbiAgLy8gRHJvcGRvd24gY29udGFpbmVyLlxuXG4gIG9uRHJvcGRvd25PcHRpb25DbGlja2VkKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgdGhpcy5tdWx0aXBsZSA/IHRoaXMudG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgb25Ecm9wZG93bkNsb3NlKGZvY3VzOiBhbnkpIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oZm9jdXMpO1xuICB9XG5cbiAgLy8gU2luZ2xlIGZpbHRlciBpbnB1dC5cblxuICBvblNpbmdsZUZpbHRlckNsaWNrKCkge1xuICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IHRydWU7XG4gIH1cblxuICBvblNpbmdsZUZpbHRlcklucHV0KHRlcm06IHN0cmluZykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRlcm0ubGVuZ3RoID4gMikge1xuICAgICAgICB0aGlzLnR5cGVkLmVtaXQodGVybSk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcbiAgICB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyKHRlcm0pO1xuICB9XG5cbiAgb25TaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZVNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQpO1xuICB9XG5cbiAgLy8gTXVsdGlwbGUgZmlsdGVyIGlucHV0LlxuXG4gIG9uTXVsdGlwbGVGaWx0ZXJJbnB1dChldmVudDogYW55KSB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcihldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgb25NdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcbiAgfVxuXG4gIC8vIFNpbmdsZSBjbGVhciBzZWxlY3QuXG5cbiAgb25DbGVhclNlbGVjdGlvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XG4gICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcbiAgfVxuXG4gIC8vIE11bHRpcGxlIGRlc2VsZWN0IG9wdGlvbi5cblxuICBvbkRlc2VsZWN0T3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcbiAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XG4gICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgLyoqIEFQSS4gKiovXG5cbiAgLy8gVE9ETyBmaXggaXNzdWVzIHdpdGggZ2xvYmFsIGNsaWNrL2tleSBoYW5kbGVyIHRoYXQgY2xvc2VzIHRoZSBkcm9wZG93bi5cbiAgb3BlbigpIHtcbiAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gIH1cblxuICBzZWxlY3QodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMub3B0aW9uTGlzdC5nZXRPcHRpb25zQnlWYWx1ZSh2YWx1ZSkuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIG1ldGhvZHMuICoqL1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBWYWx1ZS4gKiovXG5cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3ZhbHVlIDogdGhpcy5fdmFsdWVbMF07XG4gICAgfVxuICB9XG5cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcgfHwgdiA9PT0gbnVsbCB8fCB2ID09PSAnJykge1xuICAgICAgdiA9IFtdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2ID0gW3ZdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFPcHRpb25MaXN0LmVxdWFsVmFsdWVzKHYsIHRoaXMuX3ZhbHVlKSkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdjtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWx1ZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLm9wdGlvbkxpc3QudmFsdWU7XG5cbiAgICB0aGlzLmhhc1NlbGVjdGVkID0gdGhpcy5fdmFsdWUubGVuZ3RoID4gMDtcbiAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMuaGFzU2VsZWN0ZWQgPyAnJyA6IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xuXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXphdGlvbi4gKiovXG5cbiAgcHJpdmF0ZSB1cGRhdGVPcHRpb25zTGlzdChmaXJzdFRpbWU6IGJvb2xlYW4pIHtcbiAgICBsZXQgdjogQXJyYXk8c3RyaW5nPjtcblxuICAgIGlmICghZmlyc3RUaW1lKSB7XG4gICAgICB2ID0gdGhpcy5vcHRpb25MaXN0LnZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9uTGlzdCA9IG5ldyBPcHRpb25MaXN0KHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAoIWZpcnN0VGltZSkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdjtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERyb3Bkb3duLiAqKi9cblxuICBwcml2YXRlIHRvZ2dsZURyb3Bkb3duKCkge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmlzT3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRHJvcGRvd24oKSB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy51cGRhdGVXaWR0aCgpO1xuICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5maWx0ZXJFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcGVuZWQuZW1pdChudWxsKTtcbiAgICB9XG4gIH1cbiAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgcHJpdmF0ZSBjbG9zZURyb3Bkb3duKGZvY3VzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuY2xlYXJGaWx0ZXJJbnB1dCgpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIGlmIChmb2N1cykge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlZC5lbWl0KG51bGwpO1xuICAgIH1cbiAgfVxuICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gIC8qKiBTZWxlY3QuICoqL1xuXG4gIHByaXZhdGUgc2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgaWYgKCFvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC5zZWxlY3Qob3B0aW9uLCB0aGlzLm11bHRpcGxlKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG4gICAgICB0aGlzLnNlbGVjdGVkLmVtaXQob3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpKTtcbiAgICAgIC8vIElzIHRoaXMgbm90IGFsbHJlYWR5IGRvbmUgd2hlbiBzZXR0aW5nIHRoZSB2YWx1ZT8/XG4gICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsqL1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcbiAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuZGVzZWxlY3Qob3B0aW9uKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG4gICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgLy8gdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xuICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0KCk7XG4gICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbjogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XG4gICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG5cbiAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KHNlbGVjdGlvblswXS51bmRlY29yYXRlZENvcHkoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChcbiAgICAgICAgICBzZWxlY3Rpb24ubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24udW5kZWNvcmF0ZWRDb3B5KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xuICAgIG9wdGlvbi5zZWxlY3RlZCA/IHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKSA6IHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdEhpZ2hsaWdodGVkT3B0aW9uKCkge1xuICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodGVkT3B0aW9uO1xuICAgIGlmIChvcHRpb24gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXNlbGVjdExhc3QoKSB7XG4gICAgY29uc3Qgc2VsOiBBcnJheTxPcHRpb24+ID0gdGhpcy5vcHRpb25MaXN0LnNlbGVjdGlvbjtcblxuICAgIGlmIChzZWwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSBzZWxbc2VsLmxlbmd0aCAtIDFdO1xuICAgICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xuICAgICAgdGhpcy5zZXRNdWx0aXBsZUZpbHRlcklucHV0KG9wdGlvbi5sYWJlbCArICcgJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZpbHRlci4gKiovXG5cbiAgcHJpdmF0ZSBjbGVhckZpbHRlcklucHV0KCkge1xuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcGRvd24uY2xlYXJGaWx0ZXJJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcblxuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVTQyB8fCAoa2V5ID09PSB0aGlzLktFWVMuVVAgJiYgZXZlbnQuYWx0S2V5KSkge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLlRBQikge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRU5URVIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5VUCkge1xuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0UHJldmlvdXNPcHRpb24oKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRE9XTikge1xuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0TmV4dE9wdGlvbigpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XG4gICAgICAgIGlmICghdGhpcy5maWx0ZXJFbmFibGVkKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSIHx8XG4gICAgICAgIGtleSA9PT0gdGhpcy5LRVlTLlNQQUNFIHx8XG4gICAgICAgIChrZXkgPT09IHRoaXMuS0VZUy5ET1dOICYmIGV2ZW50LmFsdEtleSlcbiAgICAgICkge1xuICAgICAgICAvKiBGSVJFRk9YIEhBQ0s6XG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBzZXRUaW1lb3V0IGlzIGFkZGVkIHRvIHByZXZlbnQgdGhlIGVudGVyIGtleWRvd24gZXZlbnRcbiAgICAgICAgICogdG8gYmUgdHJpZ2dlcmVkIGZvciB0aGUgZmlsdGVyIGlucHV0IGZpZWxkLCB3aGljaCBjYXVzZXNcbiAgICAgICAgICogdGhlIGRyb3Bkb3duIHRvIGJlIGNsb3NlZCBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcblxuICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5CQUNLU1BBQ0UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5oYXNTZWxlY3RlZCAmJlxuICAgICAgICB0aGlzLmZpbHRlckVuYWJsZWQgJiZcbiAgICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSAnJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3RMYXN0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcblxuICAgIGlmIChcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLkVTQyB8fFxuICAgICAga2V5ID09PSB0aGlzLktFWVMuVEFCIHx8XG4gICAgICBrZXkgPT09IHRoaXMuS0VZUy5VUCB8fFxuICAgICAga2V5ID09PSB0aGlzLktFWVMuRE9XTiB8fFxuICAgICAga2V5ID09PSB0aGlzLktFWVMuRU5URVJcbiAgICApIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFZpZXcuICoqL1xuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgYmx1cigpIHtcbiAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgdXBkYXRlV2lkdGgoKSB7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9XG5cbiAgdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgY29uc3QgZSA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubGVmdCA9IGUub2Zmc2V0TGVmdDtcbiAgICB0aGlzLnRvcCA9IGUub2Zmc2V0VG9wICsgZS5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVGaWx0ZXJXaWR0aCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVySW5wdXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dFdpZHRoID1cbiAgICAgICAgdmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyAxICsgdGhpcy5wbGFjZWhvbGRlclZpZXcubGVuZ3RoICogMTBcbiAgICAgICAgICA6IDEgKyB2YWx1ZS5sZW5ndGggKiAxMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==