import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STYLE } from './select.component.style';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
export const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable:no-use-before-declare
    useExisting: forwardRef(() => SelectComponent),
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
        this.multiple ? this.toggleSelectOption(option) : this.selectOption(option);
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
        option.selected ? this.deselectOption(option) : this.selectOption(option);
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
                setTimeout(() => {
                    this.openDropdown();
                });
            }
        }
    }
    handleMultipleFilterKeydown(event) {
        const key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected &&
                this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    }
    handleSingleFilterKeydown(event) {
        const key = event.which;
        if (key === this.KEYS.ESC ||
            key === this.KEYS.TAB ||
            key === this.KEYS.UP ||
            key === this.KEYS.DOWN ||
            key === this.KEYS.ENTER) {
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
            this.filterInputWidth =
                value.length === 0
                    ? 1 + this.placeholderView.length * 10
                    : 1 + value.length * 10;
        }
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-select',
                template: `<div
  #selection
  [attr.tabindex]="disabled ? null : 0"
  [ngClass]="{
    open: isOpen,
    focus: hasFocus,
    below: isBelow,
    disabled: disabled
  }"
  (click)="onSelectContainerClick($event)"
  (focus)="onSelectContainerFocus()"
  (keydown)="onSelectContainerKeydown($event)"
  (window:click)="onWindowClick()"
  (window:resize)="onWindowResize()"
>
  <div class="single" *ngIf="!multiple">
    <div class="value" *ngIf="optionList.hasSelected()">
      {{ optionList.selection[0].label }}
    </div>
    <div class="placeholder" *ngIf="!optionList.hasSelected()">
      {{ placeholderView }}
    </div>
    <div
      class="clear"
      *ngIf="allowClear"
      (click)="onClearSelectionClick($event)"
    >
      &#x2715;
    </div>
    <div class="toggle" *ngIf="isOpen">&#x25B2;</div>
    <div class="toggle" *ngIf="!isOpen">&#x25BC;</div>
  </div>

  <div class="multiple" *ngIf="multiple">
    <div class="option" *ngFor="let option of optionList.selection">
      <span class="deselect-option" (click)="onDeselectOptionClick(option)">
        &#x2715;
      </span>
      {{ option.label }}
    </div>
    <input
      *ngIf="filterEnabled"
      #filterInput
      tabindex="-1"
      [placeholder]="placeholderView"
      [ngStyle]="{ 'width.px': filterInputWidth }"
      (input)="onMultipleFilterInput($event)"
      (keydown)="onMultipleFilterKeydown($event)"
    />
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
  (singleFilterKeydown)="onSingleFilterKeydown($event)"
>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQXFCO0lBQ3JELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsdUNBQXVDO0lBQ3ZDLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQStFRixNQUFNO0lBN0VOO1FBK0VFLGFBQWE7UUFFTCxTQUFJLEdBQVE7WUFDbEIsU0FBUyxFQUFFLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxFQUFFO1lBQ1QsR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDO1FBSU8sZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsU0FBUyxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUM1QixhQUFR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QUssQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFO29CQUN0QyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDOzs7WUF6akJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0VYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDZixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7OztzQkFlRSxLQUFLO3lCQUVMLEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFFTCxNQUFNO3FCQUNOLE1BQU07dUJBQ04sTUFBTTt5QkFDTixNQUFNO29CQUNOLE1BQU07NEJBRU4sU0FBUyxTQUFDLFdBQVc7dUJBQ3JCLFNBQVMsU0FBQyxVQUFVOzBCQUNwQixTQUFTLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRXhpc3RpbmdQcm92aWRlcixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNUWUxFIH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50LnN0eWxlJztcbmltcG9ydCB7IFNlbGVjdERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcblxuZXhwb3J0IGNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogRXhpc3RpbmdQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gICNzZWxlY3Rpb25cbiAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXG4gIFtuZ0NsYXNzXT1cIntcbiAgICBvcGVuOiBpc09wZW4sXG4gICAgZm9jdXM6IGhhc0ZvY3VzLFxuICAgIGJlbG93OiBpc0JlbG93LFxuICAgIGRpc2FibGVkOiBkaXNhYmxlZFxuICB9XCJcbiAgKGNsaWNrKT1cIm9uU2VsZWN0Q29udGFpbmVyQ2xpY2soJGV2ZW50KVwiXG4gIChmb2N1cyk9XCJvblNlbGVjdENvbnRhaW5lckZvY3VzKClcIlxuICAoa2V5ZG93bik9XCJvblNlbGVjdENvbnRhaW5lcktleWRvd24oJGV2ZW50KVwiXG4gICh3aW5kb3c6Y2xpY2spPVwib25XaW5kb3dDbGljaygpXCJcbiAgKHdpbmRvdzpyZXNpemUpPVwib25XaW5kb3dSZXNpemUoKVwiXG4+XG4gIDxkaXYgY2xhc3M9XCJzaW5nbGVcIiAqbmdJZj1cIiFtdWx0aXBsZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZVwiICpuZ0lmPVwib3B0aW9uTGlzdC5oYXNTZWxlY3RlZCgpXCI+XG4gICAgICB7eyBvcHRpb25MaXN0LnNlbGVjdGlvblswXS5sYWJlbCB9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwbGFjZWhvbGRlclwiICpuZ0lmPVwiIW9wdGlvbkxpc3QuaGFzU2VsZWN0ZWQoKVwiPlxuICAgICAge3sgcGxhY2Vob2xkZXJWaWV3IH19XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJjbGVhclwiXG4gICAgICAqbmdJZj1cImFsbG93Q2xlYXJcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xlYXJTZWxlY3Rpb25DbGljaygkZXZlbnQpXCJcbiAgICA+XG4gICAgICAmI3gyNzE1O1xuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGVcIiAqbmdJZj1cImlzT3BlblwiPiYjeDI1QjI7PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRvZ2dsZVwiICpuZ0lmPVwiIWlzT3BlblwiPiYjeDI1QkM7PC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJtdWx0aXBsZVwiICpuZ0lmPVwibXVsdGlwbGVcIj5cbiAgICA8ZGl2IGNsYXNzPVwib3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25MaXN0LnNlbGVjdGlvblwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkZXNlbGVjdC1vcHRpb25cIiAoY2xpY2spPVwib25EZXNlbGVjdE9wdGlvbkNsaWNrKG9wdGlvbilcIj5cbiAgICAgICAgJiN4MjcxNTtcbiAgICAgIDwvc3Bhbj5cbiAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgIDwvZGl2PlxuICAgIDxpbnB1dFxuICAgICAgKm5nSWY9XCJmaWx0ZXJFbmFibGVkXCJcbiAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJWaWV3XCJcbiAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoLnB4JzogZmlsdGVySW5wdXRXaWR0aCB9XCJcbiAgICAgIChpbnB1dCk9XCJvbk11bHRpcGxlRmlsdGVySW5wdXQoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bik9XCJvbk11bHRpcGxlRmlsdGVyS2V5ZG93bigkZXZlbnQpXCJcbiAgICAvPlxuICA8L2Rpdj5cbjwvZGl2PlxuPHNlbGVjdC1kcm9wZG93blxuICAqbmdJZj1cImlzT3BlblwiXG4gICNkcm9wZG93blxuICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICBbb3B0aW9uTGlzdF09XCJvcHRpb25MaXN0XCJcbiAgW25vdEZvdW5kTXNnXT1cIm5vdEZvdW5kTXNnXCJcbiAgW2hpZ2hsaWdodENvbG9yXT1cImhpZ2hsaWdodENvbG9yXCJcbiAgW2hpZ2hsaWdodFRleHRDb2xvcl09XCJoaWdobGlnaHRUZXh0Q29sb3JcIlxuICBbZmlsdGVyRW5hYmxlZF09XCJmaWx0ZXJFbmFibGVkXCJcbiAgW3dpZHRoXT1cIndpZHRoXCJcbiAgW3RvcF09XCJ0b3BcIlxuICBbbGVmdF09XCJsZWZ0XCJcbiAgKGNsb3NlKT1cIm9uRHJvcGRvd25DbG9zZSgkZXZlbnQpXCJcbiAgKG9wdGlvbkNsaWNrZWQpPVwib25Ecm9wZG93bk9wdGlvbkNsaWNrZWQoJGV2ZW50KVwiXG4gIChzaW5nbGVGaWx0ZXJDbGljayk9XCJvblNpbmdsZUZpbHRlckNsaWNrKClcIlxuICAoc2luZ2xlRmlsdGVySW5wdXQpPVwib25TaW5nbGVGaWx0ZXJJbnB1dCgkZXZlbnQpXCJcbiAgKHNpbmdsZUZpbHRlcktleWRvd24pPVwib25TaW5nbGVGaWx0ZXJLZXlkb3duKCRldmVudClcIlxuPlxuPC9zZWxlY3QtZHJvcGRvd24+XG5gLFxuICBzdHlsZXM6IFtTVFlMRV0sXG4gIHByb3ZpZGVyczogW1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgLyoqIEtleXMuICoqL1xuXG4gIHByaXZhdGUgS0VZUzogYW55ID0ge1xuICAgIEJBQ0tTUEFDRTogOCxcbiAgICBUQUI6IDksXG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjcsXG4gICAgU1BBQ0U6IDMyLFxuICAgIFVQOiAzOCxcbiAgICBET1dOOiA0MFxuICB9O1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBoaWdobGlnaHRDb2xvciA9ICcjMjE5NmYzJztcbiAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yID0gJyNmZmYnO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBub0ZpbHRlciA9IDA7XG4gIEBJbnB1dCgpIG5vdEZvdW5kTXNnID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIEBPdXRwdXQoKSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIGNsb3NlZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBkZXNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgdHlwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uJykgc2VsZWN0aW9uU3BhbjogYW55O1xuICBAVmlld0NoaWxkKCdkcm9wZG93bicpIGRyb3Bkb3duOiBTZWxlY3REcm9wZG93bkNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKSBmaWx0ZXJJbnB1dDogYW55O1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBBcnJheTxhbnk+ID0gW107XG4gIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XG5cbiAgLy8gU2VsZWN0aW9uIHN0YXRlIHZhcmlhYmxlcy5cbiAgaGFzU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAvLyBWaWV3IHN0YXRlIHZhcmlhYmxlcy5cbiAgZmlsdGVyRW5hYmxlZCA9IHRydWU7XG4gIGZpbHRlcklucHV0V2lkdGggPSAxO1xuICBoYXNGb2N1cyA9IGZhbHNlO1xuICBpc0JlbG93ID0gdHJ1ZTtcbiAgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICBpc09wZW4gPSBmYWxzZTtcbiAgcGxhY2Vob2xkZXJWaWV3ID0gJyc7XG5cbiAgY2xlYXJDbGlja2VkID0gZmFsc2U7XG4gIHNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcblxuICAvLyBXaWR0aCBhbmQgcG9zaXRpb24gZm9yIHRoZSBkcm9wZG93biBjb250YWluZXIuXG4gIHdpZHRoOiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXG5cbiAgLy8gQW5ndWxhciBsaWZlY3ljbGUgaG9va3MuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcbiAgICAgIHRoaXMudXBkYXRlT3B0aW9uc0xpc3QoY2hhbmdlc1snb3B0aW9ucyddLmlzRmlyc3RDaGFuZ2UoKSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdub0ZpbHRlcicpKSB7XG4gICAgICBjb25zdCBudW1PcHRpb25zOiBudW1iZXIgPSB0aGlzLm9wdGlvbkxpc3Qub3B0aW9ucy5sZW5ndGg7XG4gICAgICBjb25zdCBtaW5OdW1PcHRpb25zOiBudW1iZXIgPSBjaGFuZ2VzWydub0ZpbHRlciddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVyRW5hYmxlZCA9IG51bU9wdGlvbnMgPj0gbWluTnVtT3B0aW9ucztcbiAgICB9XG4gIH1cblxuICAvLyBXaW5kb3cuXG5cbiAgb25XaW5kb3dDbGljaygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCkge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuICAgIHRoaXMuY2xlYXJDbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RDb250YWluZXJDbGlja2VkID0gZmFsc2U7XG4gIH1cblxuICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICB0aGlzLnVwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICAvLyBTZWxlY3QgY29udGFpbmVyLlxuXG4gIG9uU2VsZWN0Q29udGFpbmVyQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyQ2xpY2tlZCA9IHRydWU7XG4gICAgaWYgKCF0aGlzLmNsZWFyQ2xpY2tlZCkge1xuICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0Q29udGFpbmVyRm9jdXMoKSB7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIG9uU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50KTtcbiAgfVxuXG4gIC8vIERyb3Bkb3duIGNvbnRhaW5lci5cblxuICBvbkRyb3Bkb3duT3B0aW9uQ2xpY2tlZChvcHRpb246IE9wdGlvbikge1xuICAgIHRoaXMubXVsdGlwbGUgPyB0aGlzLnRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb24pIDogdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgfVxuXG4gIG9uRHJvcGRvd25DbG9zZShmb2N1czogYW55KSB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKGZvY3VzKTtcbiAgfVxuXG4gIC8vIFNpbmdsZSBmaWx0ZXIgaW5wdXQuXG5cbiAgb25TaW5nbGVGaWx0ZXJDbGljaygpIHtcbiAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgb25TaW5nbGVGaWx0ZXJJbnB1dCh0ZXJtOiBzdHJpbmcpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0ZXJtLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgdGhpcy50eXBlZC5lbWl0KHRlcm0pO1xuICAgICAgfVxuICAgIH0sIDUwMCk7XG4gICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcih0ZXJtKTtcbiAgfVxuXG4gIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgdGhpcy5oYW5kbGVTaW5nbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcbiAgfVxuXG4gIC8vIE11bHRpcGxlIGZpbHRlciBpbnB1dC5cblxuICBvbk11bHRpcGxlRmlsdGVySW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZU11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudCk7XG4gIH1cblxuICAvLyBTaW5nbGUgY2xlYXIgc2VsZWN0LlxuXG4gIG9uQ2xlYXJTZWxlY3Rpb25DbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5jbGVhckNsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XG4gIH1cblxuICAvLyBNdWx0aXBsZSBkZXNlbGVjdCBvcHRpb24uXG5cbiAgb25EZXNlbGVjdE9wdGlvbkNsaWNrKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgdGhpcy5jbGVhckNsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgfVxuXG4gIC8qKiBBUEkuICoqL1xuXG4gIC8vIFRPRE8gZml4IGlzc3VlcyB3aXRoIGdsb2JhbCBjbGljay9rZXkgaGFuZGxlciB0aGF0IGNsb3NlcyB0aGUgZHJvcGRvd24uXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICB9XG5cbiAgc2VsZWN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm9wdGlvbkxpc3QuZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWUpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xuICB9XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSBtZXRob2RzLiAqKi9cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICAvKiogVmFsdWUuICoqL1xuXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIGlmICh0aGlzLl92YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl92YWx1ZSA6IHRoaXMuX3ZhbHVlWzBdO1xuICAgIH1cbiAgfVxuXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHYgPT09ICd1bmRlZmluZWQnIHx8IHYgPT09IG51bGwgfHwgdiA9PT0gJycpIHtcbiAgICAgIHYgPSBbXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgICAgdiA9IFt2XTtcbiAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5LicpO1xuICAgIH1cblxuICAgIGlmICghT3B0aW9uTGlzdC5lcXVhbFZhbHVlcyh2LCB0aGlzLl92YWx1ZSkpIHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC52YWx1ZSA9IHY7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VkKCkge1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5vcHRpb25MaXN0LnZhbHVlO1xuXG4gICAgdGhpcy5oYXNTZWxlY3RlZCA9IHRoaXMuX3ZhbHVlLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLmhhc1NlbGVjdGVkID8gJycgOiB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcblxuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xuXG4gIHByaXZhdGUgdXBkYXRlT3B0aW9uc0xpc3QoZmlyc3RUaW1lOiBib29sZWFuKSB7XG4gICAgbGV0IHY6IEFycmF5PHN0cmluZz47XG5cbiAgICBpZiAoIWZpcnN0VGltZSkge1xuICAgICAgdiA9IHRoaXMub3B0aW9uTGlzdC52YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbkxpc3QgPSBuZXcgT3B0aW9uTGlzdCh0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKCFmaXJzdFRpbWUpIHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC52YWx1ZSA9IHY7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEcm9wZG93bi4gKiovXG5cbiAgcHJpdmF0ZSB0b2dnbGVEcm9wZG93bigpIHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5pc09wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3BlbkRyb3Bkb3duKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcbiAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3BlbmVkLmVtaXQobnVsbCk7XG4gICAgfVxuICB9XG4gIC8qIHRzbGludDpkaXNhYmxlICovXG4gIHByaXZhdGUgY2xvc2VEcm9wZG93bihmb2N1czogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmNsZWFyRmlsdGVySW5wdXQoKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZWQuZW1pdChudWxsKTtcbiAgICB9XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAvKiogU2VsZWN0LiAqKi9cblxuICBwcml2YXRlIHNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xuICAgIGlmICghb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0KG9wdGlvbiwgdGhpcy5tdWx0aXBsZSk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xuICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KG9wdGlvbi51bmRlY29yYXRlZENvcHkoKSk7XG4gICAgICAvLyBJcyB0aGlzIG5vdCBhbGxyZWFkeSBkb25lIHdoZW4gc2V0dGluZyB0aGUgdmFsdWU/P1xuICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7Ki9cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc2VsZWN0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmRlc2VsZWN0KG9wdGlvbik7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xuICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQob3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIC8vIHRoaXMudXBkYXRlRmlsdGVyV2lkdGgoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodCgpO1xuICAgICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbigpIHtcbiAgICBjb25zdCBzZWxlY3Rpb246IEFycmF5PE9wdGlvbj4gPSB0aGlzLm9wdGlvbkxpc3Quc2VsZWN0aW9uO1xuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZCgpO1xuXG4gICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChzZWxlY3Rpb25bMF0udW5kZWNvcmF0ZWRDb3B5KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQoXG4gICAgICAgICAgc2VsZWN0aW9uLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnVuZGVjb3JhdGVkQ29weSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVTZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcbiAgICBvcHRpb24uc2VsZWN0ZWQgPyB0aGlzLmRlc2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpIHtcbiAgICBjb25zdCBvcHRpb246IE9wdGlvbiA9IHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRlZE9wdGlvbjtcbiAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVzZWxlY3RMYXN0KCkge1xuICAgIGNvbnN0IHNlbDogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gc2VsW3NlbC5sZW5ndGggLSAxXTtcbiAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dChvcHRpb24ubGFiZWwgKyAnICcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGaWx0ZXIuICoqL1xuXG4gIHByaXZhdGUgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLmNsZWFyRmlsdGVySW5wdXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldE11bHRpcGxlRmlsdGVySW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmZpbHRlckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU2VsZWN0Q29udGFpbmVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG5cbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHwgKGtleSA9PT0gdGhpcy5LRVlTLlVQICYmIGV2ZW50LmFsdEtleSkpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5UQUIpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0SGlnaGxpZ2h0ZWRPcHRpb24oKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuVVApIHtcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodFByZXZpb3VzT3B0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlckVuYWJsZWQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkRPV04pIHtcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE5leHRPcHRpb24oKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICBrZXkgPT09IHRoaXMuS0VZUy5FTlRFUiB8fFxuICAgICAgICBrZXkgPT09IHRoaXMuS0VZUy5TUEFDRSB8fFxuICAgICAgICAoa2V5ID09PSB0aGlzLktFWVMuRE9XTiAmJiBldmVudC5hbHRLZXkpXG4gICAgICApIHtcbiAgICAgICAgLyogRklSRUZPWCBIQUNLOlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgc2V0VGltZW91dCBpcyBhZGRlZCB0byBwcmV2ZW50IHRoZSBlbnRlciBrZXlkb3duIGV2ZW50XG4gICAgICAgICAqIHRvIGJlIHRyaWdnZXJlZCBmb3IgdGhlIGZpbHRlciBpbnB1dCBmaWVsZCwgd2hpY2ggY2F1c2VzXG4gICAgICAgICAqIHRoZSBkcm9wZG93biB0byBiZSBjbG9zZWQgYWdhaW4uXG4gICAgICAgICAqL1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU11bHRpcGxlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuQkFDS1NQQUNFKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaGFzU2VsZWN0ZWQgJiZcbiAgICAgICAgdGhpcy5maWx0ZXJFbmFibGVkICYmXG4gICAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9PT0gJydcbiAgICAgICkge1xuICAgICAgICB0aGlzLmRlc2VsZWN0TGFzdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoXG4gICAgICBrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHxcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLlRBQiB8fFxuICAgICAga2V5ID09PSB0aGlzLktFWVMuVVAgfHxcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLkRPV04gfHxcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSXG4gICAgKSB7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBWaWV3LiAqKi9cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIHVwZGF0ZVdpZHRoKCkge1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfVxuXG4gIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgIGNvbnN0IGUgPSB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxlZnQgPSBlLm9mZnNldExlZnQ7XG4gICAgdGhpcy50b3AgPSBlLm9mZnNldFRvcCArIGUub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgdXBkYXRlRmlsdGVyV2lkdGgoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXRXaWR0aCA9XG4gICAgICAgIHZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gMSArIHRoaXMucGxhY2Vob2xkZXJWaWV3Lmxlbmd0aCAqIDEwXG4gICAgICAgICAgOiAxICsgdmFsdWUubGVuZ3RoICogMTA7XG4gICAgfVxuICB9XG59XG4iXX0=