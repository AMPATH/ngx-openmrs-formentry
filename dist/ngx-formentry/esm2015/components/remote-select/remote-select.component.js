/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.propagateChange = (/**
         * @param {?} change
         * @return {?}
         */
        (change) => { });
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
        this._dataSource.dataFromSourceChanged.subscribe((/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
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
        }));
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
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            (result) => {
                if (result.length > 0) {
                    /** @type {?} */
                    const existing = _.map(this.value, _.clone);
                    /** @type {?} */
                    const concat = existing.concat(result);
                    this.items = _.uniqBy(concat, 'value');
                }
                this.notFoundMsg = '';
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.notFoundMsg = 'Errored';
            }));
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
        _.each(results, (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (item.value === value) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.selectC.select(value);
                    this.selectC.value = value;
                }));
                found = true;
            }
        }));
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.selectC.select('');
                this.selectC.value = '';
            }));
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
                this.dataSource.resolveSelectedValue(value).subscribe((/**
                 * @param {?} result
                 * @return {?}
                 */
                (result) => {
                    this.items = [result];
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.selectC.select(result.value);
                        this.selectC.value = result.value;
                    }));
                    this.loading = false;
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.loading = false;
                }));
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
                template: `<div>
    <ng-select [id]="componentID" [noFilter]="0" (selected)="selected($event)" (deselected)="removed($event)" [options]="items" [allowClear]="true"
        [placeholder]="placeholder" [notFoundMsg]="notFoundMsg" (typed)="typed($event)" tabindex="0">
    </ng-select>
    <div *ngIf="loading">
        resolving....
    </div>
</div>
`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => RemoteSelectComponent)),
                        multi: true,
                    }
                ]
            },] },
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQW1CNUIsTUFBTTs7OztJQTRCRixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBM0J2QyxtQ0FBbUM7UUFDMUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFbkMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUNyQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQTRIaEIsaURBQWlEO1FBQ2pELHVEQUF1RDtRQUN2RCw2Q0FBNkM7UUFDckMsb0JBQWU7Ozs7UUFBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBOUdKLENBQUM7Ozs7SUFaNUMsSUFDVyxVQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBQ0QsSUFBVyxVQUFVLENBQUMs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QUFLOzs7O0lBZE4sNENBQW1DOztJQUNuQyw0Q0FBNkI7O0lBQzdCLHNDQUFXOztJQUNYLHNDQUFXOztJQUNYLHdDQUFnQjs7SUFDaEIsMkNBQWdCOztJQUNoQiw0Q0FBK0I7O0lBQy9CLHFDQUE0RDs7SUFFNUQsMkNBQWdCOzs7OztJQUNoQix3Q0FBNkQ7Ozs7O0lBRzdELDRDQUFnQzs7Ozs7SUEySGhDLGdEQUErQzs7Ozs7SUE5R25DLHlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdyZW1vdGUtc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPG5nLXNlbGVjdCBbaWRdPVwiY29tcG9uZW50SURcIiBbbm9GaWx0ZXJdPVwiMFwiIChzZWxlY3RlZCk9XCJzZWxlY3RlZCgkZXZlbnQpXCIgKGRlc2VsZWN0ZWQpPVwicmVtb3ZlZCgkZXZlbnQpXCIgW29wdGlvbnNdPVwiaXRlbXNcIiBbYWxsb3dDbGVhcl09XCJ0cnVlXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW25vdEZvdW5kTXNnXT1cIm5vdEZvdW5kTXNnXCIgKHR5cGVkKT1cInR5cGVkKCRldmVudClcIiB0YWJpbmRleD1cIjBcIj5cbiAgICA8L25nLXNlbGVjdD5cbiAgICA8ZGl2ICpuZ0lmPVwibG9hZGluZ1wiPlxuICAgICAgICByZXNvbHZpbmcuLi4uXG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmVtb3RlU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvLyBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1NlYXJjaC4uLic7XG4gICAgQElucHV0KCkgY29tcG9uZW50SUQ6IHN0cmluZztcbiAgICBpdGVtcyA9IFtdO1xuICAgIHZhbHVlID0gW107XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIHNlYXJjaFRleHQgPSAnJztcbiAgICBub3RGb3VuZE1zZyA9ICdtYXRjaCBubyBmb3VuZCc7XG4gICAgQE91dHB1dCgpIGRvbmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjaGFyYWN0ZXJzID0gW107XG4gICAgQFZpZXdDaGlsZChTZWxlY3RDb21wb25lbnQpIHByaXZhdGUgc2VsZWN0QzogU2VsZWN0Q29tcG9uZW50O1xuXG5cbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHY7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHRoaXMuX2RhdGFTb3VyY2UuZGF0YUZyb21Tb3VyY2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIHN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJyc7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VwZGF0aW5nIGl0ZW1zJywgcmVzdWx0cywgdGhpcy5zZWxlY3RDLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0Qy52YWx1ZSwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTm90IGZvdW5kJztcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0eXBlZCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoKHZhbHVlKTtcbiAgICB9XG4gICAgc2VhcmNoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0xvYWRpbmcuLi4uLi4uLi4nO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnModmFsdWUpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBfLm1hcCh0aGlzLnZhbHVlLCBfLmNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmNhdCA9IGV4aXN0aW5nLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IF8udW5pcUJ5KGNvbmNhdCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0Vycm9yZWQnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZVNlbGVjdGVkVmFsdWUodmFsdWUsIHJlc3VsdHMpIHtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZWFjaChyZXN1bHRzLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbm90IGZvdW5kIGFmdGVyIGxvYWRpbmcgaXRlbXMnLCB2YWx1ZSwgcmVzdWx0cyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU2VhcmNoKHNlYXJjaFRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gKHNlYXJjaFRleHQubGVuZ3RoIC0gdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA+PSAyIHx8XG4gICAgICAgICAgICAoc2VhcmNoVGV4dC5sZW5ndGggLSB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDw9IDIgJiYgc2VhcmNoVGV4dCAhPT0gJycpKSAmJiB0aGlzLmxvYWRpbmcgPT09IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW3Jlc3VsdF07XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlZ2lzdGVycyAnZm4nIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGNoYW5nZXMgYXJlIG1hZGVcbiAgICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gbm90IHVzZWQsIHVzZWQgZm9yIHRvdWNoIGlucHV0XG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XG4gICAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcbiAgICAgICAgLy8gLi4uLi5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBmb3JtXG4gICAgICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XG4gICAgfVxuICAgIHJlbW92ZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlbW92ZWQnKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoJycpO1xuICAgIH1cbiAgICBzZWxlY3RlZChldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChjaGFuZ2U6IGFueSkgPT4geyB9O1xufVxuIl19