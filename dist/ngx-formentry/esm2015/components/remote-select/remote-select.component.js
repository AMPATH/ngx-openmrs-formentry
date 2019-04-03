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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQW1CNUIsTUFBTTs7OztJQTRCRixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBM0J2QyxtQ0FBbUM7UUFDMUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFbkMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUNyQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQTRIaEIsaURBQWlEO1FBQ2pELHVEQUF1RDtRQUN2RCw2Q0FBNkM7UUFDckMsb0JBQWU7Ozs7UUFBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBOUdKLENBQUM7Ozs7SUFaNUMsSUFDVyxVQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBQ0QsSUFBVyxVQUFVLENBQUMs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QUFLOzs7O0lBZE4sNENBQW1DOztJQUNuQyw0Q0FBNkI7O0lBQzdCLHNDQUFXOztJQUNYLHNDQUFXOztJQUNYLHdDQUFnQjs7SUFDaEIsMkNBQWdCOztJQUNoQiw0Q0FBK0I7O0lBQy9CLHFDQUE0RDs7SUFFNUQsMkNBQWdCOzs7OztJQUNoQix3Q0FBNkQ7Ozs7O0lBRzdELDRDQUFnQzs7Ozs7SUEySGhDLGdEQUErQzs7Ozs7SUE5R25DLHlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgICBOR19WQUxVRV9BQ0NFU1NPUlxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdyZW1vdGUtc2VsZWN0JyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdj5cclxuICAgIDxuZy1zZWxlY3QgW2lkXT1cImNvbXBvbmVudElEXCIgW25vRmlsdGVyXT1cIjBcIiAoc2VsZWN0ZWQpPVwic2VsZWN0ZWQoJGV2ZW50KVwiIChkZXNlbGVjdGVkKT1cInJlbW92ZWQoJGV2ZW50KVwiIFtvcHRpb25zXT1cIml0ZW1zXCIgW2FsbG93Q2xlYXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW25vdEZvdW5kTXNnXT1cIm5vdEZvdW5kTXNnXCIgKHR5cGVkKT1cInR5cGVkKCRldmVudClcIiB0YWJpbmRleD1cIjBcIj5cclxuICAgIDwvbmctc2VsZWN0PlxyXG4gICAgPGRpdiAqbmdJZj1cImxvYWRpbmdcIj5cclxuICAgICAgICByZXNvbHZpbmcuLi4uXHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSZW1vdGVTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVtb3RlU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICAvLyBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnU2VhcmNoLi4uJztcclxuICAgIEBJbnB1dCgpIGNvbXBvbmVudElEOiBzdHJpbmc7XHJcbiAgICBpdGVtcyA9IFtdO1xyXG4gICAgdmFsdWUgPSBbXTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuICAgIHNlYXJjaFRleHQgPSAnJztcclxuICAgIG5vdEZvdW5kTXNnID0gJ21hdGNoIG5vIGZvdW5kJztcclxuICAgIEBPdXRwdXQoKSBkb25lOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGNoYXJhY3RlcnMgPSBbXTtcclxuICAgIEBWaWV3Q2hpbGQoU2VsZWN0Q29tcG9uZW50KSBwcml2YXRlIHNlbGVjdEM6IFNlbGVjdENvbXBvbmVudDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHRoaXMuX2RhdGFTb3VyY2UuZGF0YUZyb21Tb3VyY2VDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9EYXRhU291cmNlRGF0YUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UuZGF0YUZyb21Tb3VyY2VDaGFuZ2VkLnN1YnNjcmliZSgocmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnJztcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGluZyBpdGVtcycsIHJlc3VsdHMsIHRoaXMuc2VsZWN0Qy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0Qy52YWx1ZSwgcmVzdWx0cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ05vdCBmb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHlwZWQodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHNlYXJjaCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICdMb2FkaW5nLi4uLi4uLi4uJztcclxuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnModmFsdWUpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBfLm1hcCh0aGlzLnZhbHVlLCBfLmNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uY2F0ID0gZXhpc3RpbmcuY29uY2F0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBfLnVuaXFCeShjb25jYXQsICd2YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0Vycm9yZWQnO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVTZWxlY3RlZFZhbHVlKHZhbHVlLCByZXN1bHRzKSB7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgXy5lYWNoKHJlc3VsdHMsIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZm91bmQpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ25vdCBmb3VuZCBhZnRlciBsb2FkaW5nIGl0ZW1zJywgdmFsdWUsIHJlc3VsdHMpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QoJycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYW5TZWFyY2goc2VhcmNoVGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIChzZWFyY2hUZXh0Lmxlbmd0aCAtIHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPj0gMiB8fFxyXG4gICAgICAgICAgICAoc2VhcmNoVGV4dC5sZW5ndGggLSB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDw9IDIgJiYgc2VhcmNoVGV4dCAhPT0gJycpKSAmJiB0aGlzLmxvYWRpbmcgPT09IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW3Jlc3VsdF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJlZ2lzdGVycyAnZm4nIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGNoYW5nZXMgYXJlIG1hZGVcclxuICAgIC8vIHRoaXMgaXMgaG93IHdlIGVtaXQgdGhlIGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbm90IHVzZWQsIHVzZWQgZm9yIHRvdWNoIGlucHV0XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cclxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcclxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQuaWQpO1xyXG4gICAgICAgIC8vIC4uLi4uXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBmb3JtXHJcbiAgICAgICAgLy8gdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5kYXRhKTtcclxuICAgIH1cclxuICAgIHJlbW92ZWQoZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmVtb3ZlZCcpO1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKCcnKTtcclxuICAgIH1cclxuICAgIHNlbGVjdGVkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoZSBtZXRob2Qgc2V0IGluIHJlZ2lzdGVyT25DaGFuZ2UsIGl0IGlzIGp1c3RcclxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcclxuICAgIC8vIHdlIHVzZSBpdCB0byBlbWl0IGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxyXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoY2hhbmdlOiBhbnkpID0+IHsgfTtcclxufVxyXG4iXX0=