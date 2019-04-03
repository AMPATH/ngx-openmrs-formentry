/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.propagateChange = (/**
         * @param {?} change
         * @return {?}
         */
        function (change) { });
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
        this._dataSource.dataFromSourceChanged.subscribe((/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
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
        }));
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
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                if (result.length > 0) {
                    /** @type {?} */
                    var existing = _.map(_this.value, _.clone);
                    /** @type {?} */
                    var concat = existing.concat(result);
                    _this.items = _.uniqBy(concat, 'value');
                }
                _this.notFoundMsg = '';
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.notFoundMsg = 'Errored';
            }));
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
        _.each(results, (/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item.value === value) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.selectC.select(value);
                    _this.selectC.value = value;
                }));
                found = true;
            }
        }));
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.selectC.select('');
                _this.selectC.value = '';
            }));
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
                this.dataSource.resolveSelectedValue(value).subscribe((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    _this.items = [result];
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.selectC.select(result.value);
                        _this.selectC.value = result.value;
                    }));
                    _this.loading = false;
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.loading = false;
                }));
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
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return RemoteSelectComponent; })),
                            multi: true,
                        }
                    ]
                },] },
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QjtJQThDSSwrQkFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTNCdkMsbUNBQW1DO1FBQzFCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBRW5DLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7UUFDckIsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTVELGVBQVUsR0FBRyxFQUFFLENBQUM7UUE0SGhCLGlEQUFpRDtRQUNqRCx1REFBdUQ7UUFDdkQsNkNBQTZDO1FBQ3JDLG9CQUFlOzs7O1FBQUcsVUFBQyxNQUFXLElBQU8sQ0FBQyxFQUFDO0lBOUdKLENBQUM7SUFaNUMsc0JBQ1csNkNBQVU7Ozs7UUFEckI7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7OztRQUNELFVBQXNCLENBQWE7WUFDL0IsSUFBSSxDQUFD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Q0FBcUIsRUFBQzs0QkFDcEQsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQUM7aUJBQ1Q7OztnQkF6QitFLFNBQVM7Ozs4QkE0QnBGLEtBQUs7OEJBQ0wsS0FBSzt1QkFNTCxNQUFNOzBCQUdOLFNBQVMsU0FBQyxlQUFlOzZCQUl6QixLQUFLOztJQTJIViw0QkFBQztDQUFBLEFBN0pELElBNkpDO1NBM0lZLHFCQUFxQjs7O0lBRTlCLDRDQUFtQzs7SUFDbkMsNENBQTZCOztJQUM3QixzQ0FBVzs7SUFDWCxzQ0FBVzs7SUFDWCx3Q0FBZ0I7O0lBQ2hCLDJDQUFnQjs7SUFDaEIsNENBQStCOztJQUMvQixxQ0FBNEQ7O0lBRTVELDJDQUFnQjs7Ozs7SUFDaEIsd0NBQTZEOzs7OztJQUc3RCw0Q0FBZ0M7Ozs7O0lBMkhoQyxnREFBK0M7Ozs7O0lBOUduQyx5Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgTkdfVkFMVUVfQUNDRVNTT1JcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncmVtb3RlLXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgICA8bmctc2VsZWN0IFtpZF09XCJjb21wb25lbnRJRFwiIFtub0ZpbHRlcl09XCIwXCIgKHNlbGVjdGVkKT1cInNlbGVjdGVkKCRldmVudClcIiAoZGVzZWxlY3RlZCk9XCJyZW1vdmVkKCRldmVudClcIiBbb3B0aW9uc109XCJpdGVtc1wiIFthbGxvd0NsZWFyXT1cInRydWVcIlxyXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFtub3RGb3VuZE1zZ109XCJub3RGb3VuZE1zZ1wiICh0eXBlZCk9XCJ0eXBlZCgkZXZlbnQpXCIgdGFiaW5kZXg9XCIwXCI+XHJcbiAgICA8L25nLXNlbGVjdD5cclxuICAgIDxkaXYgKm5nSWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgcmVzb2x2aW5nLi4uLlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmVtb3RlU2VsZWN0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlbW90ZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gICAgLy8gQElucHV0KCkgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1NlYXJjaC4uLic7XHJcbiAgICBASW5wdXQoKSBjb21wb25lbnRJRDogc3RyaW5nO1xyXG4gICAgaXRlbXMgPSBbXTtcclxuICAgIHZhbHVlID0gW107XHJcbiAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBzZWFyY2hUZXh0ID0gJyc7XHJcbiAgICBub3RGb3VuZE1zZyA9ICdtYXRjaCBubyBmb3VuZCc7XHJcbiAgICBAT3V0cHV0KCkgZG9uZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBjaGFyYWN0ZXJzID0gW107XHJcbiAgICBAVmlld0NoaWxkKFNlbGVjdENvbXBvbmVudCkgcHJpdmF0ZSBzZWxlY3RDOiBTZWxlY3RDb21wb25lbnQ7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdWJzY3JpYmVUb0RhdGFTb3VyY2VEYXRhQ2hhbmdlcygpIHtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJyc7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBkYXRpbmcgaXRlbXMnLCByZXN1bHRzLCB0aGlzLnNlbGVjdEMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlU2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdEMudmFsdWUsIHJlc3VsdHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICdOb3QgZm91bmQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHR5cGVkKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlYXJjaCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzZWFyY2godmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTG9hZGluZy4uLi4uLi4uLic7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gXy5tYXAodGhpcy52YWx1ZSwgXy5jbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmNhdCA9IGV4aXN0aW5nLmNvbmNhdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gXy51bmlxQnkoY29uY2F0LCAndmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICdFcnJvcmVkJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSwgcmVzdWx0cykge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIF8uZWFjaChyZXN1bHRzLCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdub3QgZm91bmQgYWZ0ZXIgbG9hZGluZyBpdGVtcycsIHZhbHVlLCByZXN1bHRzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KCcnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FuU2VhcmNoKHNlYXJjaFRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAoc2VhcmNoVGV4dC5sZW5ndGggLSB0aGlzLnNlYXJjaFRleHQubGVuZ3RoID49IDIgfHxcclxuICAgICAgICAgICAgKHNlYXJjaFRleHQubGVuZ3RoIC0gdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA8PSAyICYmIHNlYXJjaFRleHQgIT09ICcnKSkgJiYgdGhpcy5sb2FkaW5nID09PSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGlzIHRoZSBpbml0aWFsIHZhbHVlIHNldCB0byB0aGUgY29tcG9uZW50XHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKS5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtyZXN1bHRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9IHJlc3VsdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXHJcbiAgICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XHJcbiAgICAvLyBjaGFuZ2UgZXZlbnRzIGZyb20gdGhlIHRleHRhcmVhXHJcbiAgICBvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcclxuICAgICAgICAvLyAuLi4uLlxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxyXG4gICAgICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JlbW92ZWQnKTtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSgnJyk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RlZChldmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGUgbWV0aG9kIHNldCBpbiByZWdpc3Rlck9uQ2hhbmdlLCBpdCBpcyBqdXN0XHJcbiAgICAvLyBhIHBsYWNlaG9sZGVyIGZvciBhIG1ldGhvZCB0aGF0IHRha2VzIG9uZSBwYXJhbWV0ZXIsXHJcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cclxuICAgIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKGNoYW5nZTogYW55KSA9PiB7IH07XHJcbn1cclxuIl19