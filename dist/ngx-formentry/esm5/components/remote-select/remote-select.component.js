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
        get: function () {
            return this._dataSource;
        },
        set: function (v) {
            this._dataSource = v;
            if (this._dataSource && this._dataSource.dataFromSourceChanged) {
                this.subscribeToDataSourceDataChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    RemoteSelectComponent.prototype.ngOnInit = function () { };
    RemoteSelectComponent.prototype.subscribeToDataSourceDataChanges = function () {
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
    RemoteSelectComponent.prototype.typed = function (value) {
        this.search(value);
    };
    RemoteSelectComponent.prototype.search = function (value) {
        var _this = this;
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value).subscribe(function (result) {
                if (result.length > 0) {
                    var existing = _.map(_this.value, _.clone);
                    var concat = existing.concat(result);
                    _this.items = _.uniqBy(concat, 'value');
                }
                _this.notFoundMsg = '';
            }, function (error) {
                _this.notFoundMsg = 'Errored';
            });
        }
    };
    RemoteSelectComponent.prototype.restoreSelectedValue = function (value, results) {
        var _this = this;
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
    RemoteSelectComponent.prototype.canSearch = function (searchText) {
        return ((searchText.length - this.searchText.length >= 2 ||
            (searchText.length - this.searchText.length <= 2 &&
                searchText !== '')) &&
            this.loading === false);
    };
    // this is the initial value set to the component
    RemoteSelectComponent.prototype.writeValue = function (value) {
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
    RemoteSelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // not used, used for touch input
    RemoteSelectComponent.prototype.registerOnTouched = function () { };
    // change events from the textarea
    RemoteSelectComponent.prototype.onChange = function (event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    };
    RemoteSelectComponent.prototype.removed = function (event) {
        console.log('Removed');
        this.propagateChange('');
    };
    RemoteSelectComponent.prototype.selected = function (event) {
        this.propagateChange(event.value);
    };
    RemoteSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'remote-select',
                    template: "<div>\n  <ng-select\n    [id]=\"componentID\"\n    [noFilter]=\"0\"\n    (selected)=\"selected($event)\"\n    (deselected)=\"removed($event)\"\n    [options]=\"items\"\n    [allowClear]=\"true\"\n    [placeholder]=\"placeholder\"\n    [notFoundMsg]=\"notFoundMsg\"\n    (typed)=\"typed($event)\"\n    tabindex=\"0\"\n  >\n  </ng-select>\n  <div *ngIf=\"loading\">resolving....</div>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return RemoteSelectComponent; }),
                            multi: true
                        }
                    ]
                },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcmVtb3RlLXNlbGVjdC9yZW1vdGUtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMzRSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUI7SUFxREUsK0JBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUF6QnZDLG1DQUFtQztRQUMxQixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUVuQyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBQ3JCLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1RCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBaUloQixpREFBaUQ7UUFDakQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUNyQyxvQkFBZSxHQUFHLFVBQUMsTUFBVyxJQUFNLENBQUMsQ0FBQztJQXJISixDQUFDO0lBWDNDLHNCQUNXLDZDQUFVO2FBRHJCO1lBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzthQUNELFVBQXNCLENBQWE7WUFDakMsSUFBSSxDQUFD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Q0wsS0FBSzt1QkFNTCxNQUFNOzBCQUdOLFNBQVMsU0FBQyxlQUFlOzZCQUd6QixLQUFLOztJQWlJUiw0QkFBQztDQUFBLEFBM0tELElBMktDO1NBaEpZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyZW1vdGUtc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8bmctc2VsZWN0XG4gICAgW2lkXT1cImNvbXBvbmVudElEXCJcbiAgICBbbm9GaWx0ZXJdPVwiMFwiXG4gICAgKHNlbGVjdGVkKT1cInNlbGVjdGVkKCRldmVudClcIlxuICAgIChkZXNlbGVjdGVkKT1cInJlbW92ZWQoJGV2ZW50KVwiXG4gICAgW29wdGlvbnNdPVwiaXRlbXNcIlxuICAgIFthbGxvd0NsZWFyXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgW25vdEZvdW5kTXNnXT1cIm5vdEZvdW5kTXNnXCJcbiAgICAodHlwZWQpPVwidHlwZWQoJGV2ZW50KVwiXG4gICAgdGFiaW5kZXg9XCIwXCJcbiAgPlxuICA8L25nLXNlbGVjdD5cbiAgPGRpdiAqbmdJZj1cImxvYWRpbmdcIj5yZXNvbHZpbmcuLi4uPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmVtb3RlU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlbW90ZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvLyBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xuICBASW5wdXQoKSBjb21wb25lbnRJRDogc3RyaW5nO1xuICBpdGVtcyA9IFtdO1xuICB2YWx1ZSA9IFtdO1xuICBsb2FkaW5nID0gZmFsc2U7XG4gIHNlYXJjaFRleHQgPSAnJztcbiAgbm90Rm91bmRNc2cgPSAnbWF0Y2ggbm8gZm91bmQnO1xuICBAT3V0cHV0KCkgZG9uZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjaGFyYWN0ZXJzID0gW107XG4gIEBWaWV3Q2hpbGQoU2VsZWN0Q29tcG9uZW50KSBwcml2YXRlIHNlbGVjdEM6IFNlbGVjdENvbXBvbmVudDtcblxuICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb0RhdGFTb3VyY2VEYXRhQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgc3Vic2NyaWJlVG9EYXRhU291cmNlRGF0YUNoYW5nZXMoKSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZS5kYXRhRnJvbVNvdXJjZUNoYW5nZWQuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJyc7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGluZyBpdGVtcycsIHJlc3VsdHMsIHRoaXMuc2VsZWN0Qy52YWx1ZSk7XG4gICAgICAgIHRoaXMucmVzdG9yZVNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RDLnZhbHVlLCByZXN1bHRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTm90IGZvdW5kJztcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHR5cGVkKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaCh2YWx1ZSk7XG4gIH1cbiAgc2VhcmNoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNlYXJjaFRleHQgPSB2YWx1ZTtcbiAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTG9hZGluZy4uLi4uLi4uLic7XG4gICAgICB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyh2YWx1ZSkuc3Vic2NyaWJlKFxuICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IF8ubWFwKHRoaXMudmFsdWUsIF8uY2xvbmUpO1xuICAgICAgICAgICAgY29uc3QgY29uY2F0ID0gZXhpc3RpbmcuY29uY2F0KHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gXy51bmlxQnkoY29uY2F0LCAndmFsdWUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0Vycm9yZWQnO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVTZWxlY3RlZFZhbHVlKHZhbHVlLCByZXN1bHRzKSB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgXy5lYWNoKHJlc3VsdHMsIChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdCh2YWx1ZSk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ25vdCBmb3VuZCBhZnRlciBsb2FkaW5nIGl0ZW1zJywgdmFsdWUsIHJlc3VsdHMpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QoJycpO1xuICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSAnJztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNhblNlYXJjaChzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHNlYXJjaFRleHQubGVuZ3RoIC0gdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA+PSAyIHx8XG4gICAgICAgIChzZWFyY2hUZXh0Lmxlbmd0aCAtIHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPD0gMiAmJlxuICAgICAgICAgIHNlYXJjaFRleHQgIT09ICcnKSkgJiZcbiAgICAgIHRoaXMubG9hZGluZyA9PT0gZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLy8gdGhpcyBpcyB0aGUgaW5pdGlhbCB2YWx1ZSBzZXQgdG8gdGhlIGNvbXBvbmVudFxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpLnN1YnNjcmliZShcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbcmVzdWx0XTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gcmVnaXN0ZXJzICdmbicgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gY2hhbmdlcyBhcmUgbWFkZVxuICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICAvLyBub3QgdXNlZCwgdXNlZCBmb3IgdG91Y2ggaW5wdXRcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cbiAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcbiAgICAvLyAuLi4uLlxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XG4gIH1cbiAgcmVtb3ZlZChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW1vdmVkJyk7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoJycpO1xuICB9XG4gIHNlbGVjdGVkKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQudmFsdWUpO1xuICB9XG5cbiAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAvLyBhIHBsYWNlaG9sZGVyIGZvciBhIG1ldGhvZCB0aGF0IHRha2VzIG9uZSBwYXJhbWV0ZXIsXG4gIC8vIHdlIHVzZSBpdCB0byBlbWl0IGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChjaGFuZ2U6IGFueSkgPT4ge307XG59XG4iXX0=