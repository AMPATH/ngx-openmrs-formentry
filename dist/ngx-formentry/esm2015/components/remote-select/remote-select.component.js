/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
export class RemoteSelectComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        // @Input() dataSource: DataSource;
        this.placeholder = 'Search...';
        this.items = [];
        this.value = [];
        this.loading = false;
        this.searchText = '';
        this.notFoundMsg = 'match no found';
        this.done = new EventEmitter();
        this.characters = [];
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = (change) => { };
    }
    /**
     * @return {?}
     */
    get dataSource() {
        return this._dataSource;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dataSource(v) {
        this._dataSource = v;
        if (this._dataSource && this._dataSource.dataFromSourceChanged) {
            this.subscribeToDataSourceDataChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    subscribeToDataSourceDataChanges() {
        this._dataSource.dataFromSourceChanged.subscribe((results) => {
            if (results.length > 0) {
                this.items = results;
                this.notFoundMsg = '';
                // console.log('updating items', results, this.selectC.value);
                this.restoreSelectedValue(this.selectC.value, results);
            }
            else {
                this.notFoundMsg = 'Not found';
                this.items = [];
            }
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    typed(value) {
        this.search(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    search(value) {
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value)
                .subscribe((result) => {
                if (result.length > 0) {
                    /** @type {?} */
                    const existing = _.map(this.value, _.clone);
                    /** @type {?} */
                    const concat = existing.concat(result);
                    this.items = _.uniqBy(concat, 'value');
                }
                this.notFoundMsg = '';
            }, (error) => {
                this.notFoundMsg = 'Errored';
            });
        }
    }
    /**
     * @param {?} value
     * @param {?} results
     * @return {?}
     */
    restoreSelectedValue(value, results) {
        /** @type {?} */
        let found = false;
        _.each(results, (item) => {
            if (item.value === value) {
                setTimeout(() => {
                    this.selectC.select(value);
                    this.selectC.value = value;
                });
                found = true;
            }
        });
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout(() => {
                this.selectC.select('');
                this.selectC.value = '';
            });
        }
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    canSearch(searchText) {
        return (searchText.length - this.searchText.length >= 2 ||
            (searchText.length - this.searchText.length <= 2 && searchText !== '')) && this.loading === false;
    }
    // this is the initial value set to the component
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe((result) => {
                    this.items = [result];
                    setTimeout(() => {
                        this.selectC.select(result.value);
                        this.selectC.value = result.value;
                    });
                    this.loading = false;
                }, (error) => {
                    this.loading = false;
                });
            }
        }
    }
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    /**
     * @return {?}
     */
    registerOnTouched() { }
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    removed(event) {
        console.log('Removed');
        this.propagateChange('');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selected(event) {
        this.propagateChange(event.value);
    }
}
RemoteSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'remote-select',
                template: "<div>\n    <ng-select [id]=\"componentID\" [noFilter]=\"0\" (selected)=\"selected($event)\" (deselected)=\"removed($event)\" [options]=\"items\" [allowClear]=\"true\"\n        [placeholder]=\"placeholder\" [notFoundMsg]=\"notFoundMsg\" (typed)=\"typed($event)\" tabindex=\"0\">\n    </ng-select>\n    <div *ngIf=\"loading\">\n        resolving....\n    </div>\n</div>\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => RemoteSelectComponent),
                        multi: true,
                    }
                ]
            }] }
];
/** @nocollapse */
RemoteSelectComponent.ctorParameters = () => [
    { type: Renderer2 }
];
RemoteSelectComponent.propDecorators = {
    placeholder: [{ type: Input }],
    componentID: [{ type: Input }],
    done: [{ type: Output }],
    selectC: [{ type: ViewChild, args: [SelectComponent,] }],
    dataSource: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    RemoteSelectComponent.prototype.placeholder;
    /** @type {?} */
    RemoteSelectComponent.prototype.componentID;
    /** @type {?} */
    RemoteSelectComponent.prototype.items;
    /** @type {?} */
    RemoteSelectComponent.prototype.value;
    /** @type {?} */
    RemoteSelectComponent.prototype.loading;
    /** @type {?} */
    RemoteSelectComponent.prototype.searchText;
    /** @type {?} */
    RemoteSelectComponent.prototype.notFoundMsg;
    /** @type {?} */
    RemoteSelectComponent.prototype.done;
    /** @type {?} */
    RemoteSelectComponent.prototype.characters;
    /**
     * @type {?}
     * @private
     */
    RemoteSelectComponent.prototype.selectC;
    /**
     * @type {?}
     * @private
     */
    RemoteSelectComponent.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    RemoteSelectComponent.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    RemoteSelectComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQVc1QixNQUFNLE9BQU8scUJBQXFCOzs7O0lBNEI5QixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXOztRQTFCOUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFbkMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUNyQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUQsZUFBVSxHQUFHLEVBQUUsQ0FBQzs7OztRQStIUixvQkFBZSxHQUFHLENBQUMsTUFBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUE5R0osQ0FBQzs7OztJQVo1QyxJQUNXLFVBQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBQ0QsSUFBVyxVQUFVLENBQUMsQ0FBYTtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNy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LFFBQVEsQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixtQ0FBbUM7SUFDdkMsQ0FBQzs7Ozs7SUFDRCxPQUFPLENBQUMsS0FBSztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUNELFFBQVEsQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBL0lKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsNlhBQTJDO2dCQUMzQyxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDcEQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQUM7YUFDVDs7OztZQWpCK0UsU0FBUzs7OzBCQW9CcEYsS0FBSzswQkFDTCxLQUFLO21CQU1MLE1BQU07c0JBR04sU0FBUyxTQUFDLGVBQWU7eUJBSXpCLEtBQUs7Ozs7SUFkTiw0Q0FBbUM7O0lBQ25DLDRDQUE2Qjs7SUFDN0Isc0NBQVc7O0lBQ1gsc0NBQVc7O0lBQ1gsd0NBQWdCOztJQUNoQiwyQ0FBZ0I7O0lBQ2hCLDRDQUErQjs7SUFDL0IscUNBQTREOztJQUU1RCwyQ0FBZ0I7Ozs7O0lBQ2hCLHdDQUE2RDs7Ozs7SUFHN0QsNENBQWdDOzs7OztJQTJIaEMsZ0RBQStDOzs7OztJQTlHbkMseUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBOR19WQUxVRV9BQ0NFU1NPUlxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3JlbW90ZS1zZWxlY3QnLFxuICAgIHRlbXBsYXRlVXJsOiAncmVtb3RlLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmVtb3RlU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvLyBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1NlYXJjaC4uLic7XG4gICAgQElucHV0KCkgY29tcG9uZW50SUQ6IHN0cmluZztcbiAgICBpdGVtcyA9IFtdO1xuICAgIHZhbHVlID0gW107XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIHNlYXJjaFRleHQgPSAnJztcbiAgICBub3RGb3VuZE1zZyA9ICdtYXRjaCBubyBmb3VuZCc7XG4gICAgQE91dHB1dCgpIGRvbmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjaGFyYWN0ZXJzID0gW107XG4gICAgQFZpZXdDaGlsZChTZWxlY3RDb21wb25lbnQpIHByaXZhdGUgc2VsZWN0QzogU2VsZWN0Q29tcG9uZW50O1xuXG5cbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHY7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHRoaXMuX2RhdGFTb3VyY2UuZGF0YUZyb21Tb3VyY2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIHN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJyc7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VwZGF0aW5nIGl0ZW1zJywgcmVzdWx0cywgdGhpcy5zZWxlY3RDLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0Qy52YWx1ZSwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTm90IGZvdW5kJztcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0eXBlZCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoKHZhbHVlKTtcbiAgICB9XG4gICAgc2VhcmNoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0xvYWRpbmcuLi4uLi4uLi4nO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnModmFsdWUpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBfLm1hcCh0aGlzLnZhbHVlLCBfLmNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmNhdCA9IGV4aXN0aW5nLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IF8udW5pcUJ5KGNvbmNhdCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0Vycm9yZWQnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZVNlbGVjdGVkVmFsdWUodmFsdWUsIHJlc3VsdHMpIHtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZWFjaChyZXN1bHRzLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbm90IGZvdW5kIGFmdGVyIGxvYWRpbmcgaXRlbXMnLCB2YWx1ZSwgcmVzdWx0cyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU2VhcmNoKHNlYXJjaFRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gKHNlYXJjaFRleHQubGVuZ3RoIC0gdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA+PSAyIHx8XG4gICAgICAgICAgICAoc2VhcmNoVGV4dC5sZW5ndGggLSB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDw9IDIgJiYgc2VhcmNoVGV4dCAhPT0gJycpKSAmJiB0aGlzLmxvYWRpbmcgPT09IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW3Jlc3VsdF07XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlZ2lzdGVycyAnZm4nIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGNoYW5nZXMgYXJlIG1hZGVcbiAgICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gbm90IHVzZWQsIHVzZWQgZm9yIHRvdWNoIGlucHV0XG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XG4gICAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcbiAgICAgICAgLy8gLi4uLi5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBmb3JtXG4gICAgICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XG4gICAgfVxuICAgIHJlbW92ZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlbW92ZWQnKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoJycpO1xuICAgIH1cbiAgICBzZWxlY3RlZChldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChjaGFuZ2U6IGFueSkgPT4geyB9O1xufVxuIl19