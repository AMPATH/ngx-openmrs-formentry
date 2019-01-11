/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
var RemoteSelectComponent = /** @class */ (function () {
    function RemoteSelectComponent(renderer) {
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
        this.propagateChange = function (change) { };
    }
    Object.defineProperty(RemoteSelectComponent.prototype, "dataSource", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSource;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._dataSource = v;
            if (this._dataSource && this._dataSource.dataFromSourceChanged) {
                this.subscribeToDataSourceDataChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RemoteSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    RemoteSelectComponent.prototype.subscribeToDataSourceDataChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dataSource.dataFromSourceChanged.subscribe(function (results) {
            if (results.length > 0) {
                _this.items = results;
                _this.notFoundMsg = '';
                // console.log('updating items', results, this.selectC.value);
                _this.restoreSelectedValue(_this.selectC.value, results);
            }
            else {
                _this.notFoundMsg = 'Not found';
                _this.items = [];
            }
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RemoteSelectComponent.prototype.typed = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.search(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RemoteSelectComponent.prototype.search = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value)
                .subscribe(function (result) {
                if (result.length > 0) {
                    /** @type {?} */
                    var existing = _.map(_this.value, _.clone);
                    /** @type {?} */
                    var concat = existing.concat(result);
                    _this.items = _.uniqBy(concat, 'value');
                }
                _this.notFoundMsg = '';
            }, function (error) {
                _this.notFoundMsg = 'Errored';
            });
        }
    };
    /**
     * @param {?} value
     * @param {?} results
     * @return {?}
     */
    RemoteSelectComponent.prototype.restoreSelectedValue = /**
     * @param {?} value
     * @param {?} results
     * @return {?}
     */
    function (value, results) {
        var _this = this;
        /** @type {?} */
        var found = false;
        _.each(results, function (item) {
            if (item.value === value) {
                setTimeout(function () {
                    _this.selectC.select(value);
                    _this.selectC.value = value;
                });
                found = true;
            }
        });
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout(function () {
                _this.selectC.select('');
                _this.selectC.value = '';
            });
        }
    };
    /**
     * @param {?} searchText
     * @return {?}
     */
    RemoteSelectComponent.prototype.canSearch = /**
     * @param {?} searchText
     * @return {?}
     */
    function (searchText) {
        return (searchText.length - this.searchText.length >= 2 ||
            (searchText.length - this.searchText.length <= 2 && searchText !== '')) && this.loading === false;
    };
    // this is the initial value set to the component
    // this is the initial value set to the component
    /**
     * @param {?} value
     * @return {?}
     */
    RemoteSelectComponent.prototype.writeValue = 
    // this is the initial value set to the component
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe(function (result) {
                    _this.items = [result];
                    setTimeout(function () {
                        _this.selectC.select(result.value);
                        _this.selectC.value = result.value;
                    });
                    _this.loading = false;
                }, function (error) {
                    _this.loading = false;
                });
            }
        }
    };
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    /**
     * @param {?} fn
     * @return {?}
     */
    RemoteSelectComponent.prototype.registerOnChange = 
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    // not used, used for touch input
    // not used, used for touch input
    /**
     * @return {?}
     */
    RemoteSelectComponent.prototype.registerOnTouched = 
    // not used, used for touch input
    /**
     * @return {?}
     */
    function () { };
    // change events from the textarea
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    RemoteSelectComponent.prototype.onChange = 
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    RemoteSelectComponent.prototype.removed = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('Removed');
        this.propagateChange('');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    RemoteSelectComponent.prototype.selected = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.propagateChange(event.value);
    };
    RemoteSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'remote-select',
                    template: "<div>\n    <ng-select [id]=\"componentID\" [noFilter]=\"0\" (selected)=\"selected($event)\" (deselected)=\"removed($event)\" [options]=\"items\" [allowClear]=\"true\"\n        [placeholder]=\"placeholder\" [notFoundMsg]=\"notFoundMsg\" (typed)=\"typed($event)\" tabindex=\"0\">\n    </ng-select>\n    <div *ngIf=\"loading\">\n        resolving....\n    </div>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return RemoteSelectComponent; }),
                            multi: true,
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    RemoteSelectComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    RemoteSelectComponent.propDecorators = {
        placeholder: [{ type: Input }],
        componentID: [{ type: Input }],
        done: [{ type: Output }],
        selectC: [{ type: ViewChild, args: [SelectComponent,] }],
        dataSource: [{ type: Input }]
    };
    return RemoteSelectComponent;
}());
export { RemoteSelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QjtJQXNDSSwrQkFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVzs7UUExQjlCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBRW5DLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7UUFDckIsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTVELGVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7UUErSFIsb0JBQWUsR0FBRyxVQUFDLE1BQVcsSUFBTyxDQUFDLENBQUM7SUE5R0osQ0FBQztJQVo1QyxzQkFDVyw2Q0FBVTs7OztRQURyQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7OztRQUNELFVBQXNCLENBQWE7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUks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Ozs7O0lBRzdELDRDQUFnQzs7Ozs7SUEySGhDLGdEQUErQzs7Ozs7SUE5R25DLHlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdyZW1vdGUtc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3JlbW90ZS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJlbW90ZVNlbGVjdENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgUmVtb3RlU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLy8gQElucHV0KCkgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xuICAgIEBJbnB1dCgpIGNvbXBvbmVudElEOiBzdHJpbmc7XG4gICAgaXRlbXMgPSBbXTtcbiAgICB2YWx1ZSA9IFtdO1xuICAgIGxvYWRpbmcgPSBmYWxzZTtcbiAgICBzZWFyY2hUZXh0ID0gJyc7XG4gICAgbm90Rm91bmRNc2cgPSAnbWF0Y2ggbm8gZm91bmQnO1xuICAgIEBPdXRwdXQoKSBkb25lOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY2hhcmFjdGVycyA9IFtdO1xuICAgIEBWaWV3Q2hpbGQoU2VsZWN0Q29tcG9uZW50KSBwcml2YXRlIHNlbGVjdEM6IFNlbGVjdENvbXBvbmVudDtcblxuXG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICAgICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0RhdGFTb3VyY2VEYXRhQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBzdWJzY3JpYmVUb0RhdGFTb3VyY2VEYXRhQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5kYXRhRnJvbVNvdXJjZUNoYW5nZWQuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGluZyBpdGVtcycsIHJlc3VsdHMsIHRoaXMuc2VsZWN0Qy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlU2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdEMudmFsdWUsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ05vdCBmb3VuZCc7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHlwZWQodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaCh2YWx1ZSk7XG4gICAgfVxuICAgIHNlYXJjaCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICdMb2FkaW5nLi4uLi4uLi4uJztcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHZhbHVlKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gXy5tYXAodGhpcy52YWx1ZSwgXy5jbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25jYXQgPSBleGlzdGluZy5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBfLnVuaXFCeShjb25jYXQsICd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnJztcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICdFcnJvcmVkJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVTZWxlY3RlZFZhbHVlKHZhbHVlLCByZXN1bHRzKSB7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBfLmVhY2gocmVzdWx0cywgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ25vdCBmb3VuZCBhZnRlciBsb2FkaW5nIGl0ZW1zJywgdmFsdWUsIHJlc3VsdHMpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdCgnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhblNlYXJjaChzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIChzZWFyY2hUZXh0Lmxlbmd0aCAtIHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPj0gMiB8fFxuICAgICAgICAgICAgKHNlYXJjaFRleHQubGVuZ3RoIC0gdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA8PSAyICYmIHNlYXJjaFRleHQgIT09ICcnKSkgJiYgdGhpcy5sb2FkaW5nID09PSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHRoZSBpbml0aWFsIHZhbHVlIHNldCB0byB0aGUgY29tcG9uZW50XG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtyZXN1bHRdO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXG4gICAgLy8gdGhpcyBpcyBob3cgd2UgZW1pdCB0aGUgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC5pZCk7XG4gICAgICAgIC8vIC4uLi4uXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgICAgICAvLyB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmRhdGEpO1xuICAgIH1cbiAgICByZW1vdmVkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZW1vdmVkJyk7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKCcnKTtcbiAgICB9XG4gICAgc2VsZWN0ZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQudmFsdWUpO1xuICAgIH1cblxuICAgIC8vIHRoZSBtZXRob2Qgc2V0IGluIHJlZ2lzdGVyT25DaGFuZ2UsIGl0IGlzIGp1c3RcbiAgICAvLyBhIHBsYWNlaG9sZGVyIGZvciBhIG1ldGhvZCB0aGF0IHRha2VzIG9uZSBwYXJhbWV0ZXIsXG4gICAgLy8gd2UgdXNlIGl0IHRvIGVtaXQgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoY2hhbmdlOiBhbnkpID0+IHsgfTtcbn1cbiJdfQ==