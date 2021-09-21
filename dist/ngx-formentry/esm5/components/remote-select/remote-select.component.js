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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCO0lBcURFLCtCQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBekJ2QyxtQ0FBbUM7UUFDMUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFbkMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUNyQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQWlJaEIsaURBQWlEO1FBQ2pELHVEQUF1RDtRQUN2RCw2Q0FBNkM7UUFDckMsb0JBQWUsR0FBRyxVQUFDLE1BQVcsSUFBTSxDQUFDLENBQUM7SUFySEosQ0FBQztJQVgzQyxzQkFDVyw2Q0FBVTthQURyQjtZQUVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFDRCxVQUFzQixDQUFhO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQzFDLENBQUM7UUFDSCxDQUFDOzs7T0FOQTtJQVVELHdDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRWIsZ0VBQWdDLEdBQWhDO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQU87WUFDdkQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDckIsS0FBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLDhEQUE4RDtnQkFDOUQsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDbEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHFDQUFLLEdBQVosVUFBYSxLQUFVO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELHNDQUFNLEdBQU4sVUFBTyxLQUFhO1FBQXBCLGlCQWtCQztRQWpCQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FDNUMsVUFBQyxNQUFNO2dCQUNMLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkMsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNKLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQy9CLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxvREFBb0IsR0FBcEIsVUFBcUIsS0FBSyxFQUFFLE9BQU87UUFBbkMsaUJBa0JDO1FBakJDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQUk7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixVQUFVLENBQUM7b0JBQ1QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNYLGdFQUFnRTtZQUNoRSxVQUFVLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLFVBQWtCO1FBQzFCLE1BQU0sQ0FBQyxDQUNMLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQzlDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUM5QyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRUQsaURBQWlEO0lBQzFDLDBDQUFVLEdBQWpCLFVBQWtCLEtBQVU7UUFBNUIsaUJBbUJDO1FBbEJDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUNuRCxVQUFDLE1BQVc7b0JBQ1YsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0QixVQUFVLENBQUM7d0JBQ1QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsQyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQyxFQUNELFVBQUMsS0FBSztvQkFDSixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQyxDQUNGLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCwwREFBMEQ7SUFDMUQsbURBQW1EO0lBQzVDLGdEQUFnQixHQUF2QixVQUF3QixFQUFPO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQ0FBaUM7SUFDMUIsaURBQWlCLEdBQXhCLGNBQTRCLENBQUM7SUFDN0Isa0NBQWtDO0lBQ2xDLHdDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixtQ0FBbUM7SUFDckMsQ0FBQztJQUNELHVDQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCx3Q0FBUSxHQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQXJLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSwwWUFnQlg7b0JBQ0MsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixDQUFDOzRCQUNwRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRjs7O2dCQWhDQyxTQUFTOzs7OEJBbUNSLEtBQUs7OEJBQ0wsS0FBSzt1QkFNTCxNQUFNOzBCQUdOLFNBQVMsU0FBQyxlQUFlOzZCQUd6QixLQUFLOztJQWlJUiw0QkFBQztDQUFBLEFBM0tELElBMktDO1NBaEpZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyZW1vdGUtc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8bmctc2VsZWN0XG4gICAgW2lkXT1cImNvbXBvbmVudElEXCJcbiAgICBbbm9GaWx0ZXJdPVwiMFwiXG4gICAgKHNlbGVjdGVkKT1cInNlbGVjdGVkKCRldmVudClcIlxuICAgIChkZXNlbGVjdGVkKT1cInJlbW92ZWQoJGV2ZW50KVwiXG4gICAgW29wdGlvbnNdPVwiaXRlbXNcIlxuICAgIFthbGxvd0NsZWFyXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgW25vdEZvdW5kTXNnXT1cIm5vdEZvdW5kTXNnXCJcbiAgICAodHlwZWQpPVwidHlwZWQoJGV2ZW50KVwiXG4gICAgdGFiaW5kZXg9XCIwXCJcbiAgPlxuICA8L25nLXNlbGVjdD5cbiAgPGRpdiAqbmdJZj1cImxvYWRpbmdcIj5yZXNvbHZpbmcuLi4uPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmVtb3RlU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlbW90ZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvLyBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xuICBASW5wdXQoKSBjb21wb25lbnRJRDogc3RyaW5nO1xuICBpdGVtcyA9IFtdO1xuICB2YWx1ZSA9IFtdO1xuICBsb2FkaW5nID0gZmFsc2U7XG4gIHNlYXJjaFRleHQgPSAnJztcbiAgbm90Rm91bmRNc2cgPSAnbWF0Y2ggbm8gZm91bmQnO1xuICBAT3V0cHV0KCkgZG9uZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjaGFyYWN0ZXJzID0gW107XG4gIEBWaWV3Q2hpbGQoU2VsZWN0Q29tcG9uZW50KSBwcml2YXRlIHNlbGVjdEM6IFNlbGVjdENvbXBvbmVudDtcblxuICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLmRhdGFGcm9tU291cmNlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb0RhdGFTb3VyY2VEYXRhQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgc3Vic2NyaWJlVG9EYXRhU291cmNlRGF0YUNoYW5nZXMoKSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZS5kYXRhRnJvbVNvdXJjZUNoYW5nZWQuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJyc7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGluZyBpdGVtcycsIHJlc3VsdHMsIHRoaXMuc2VsZWN0Qy52YWx1ZSk7XG4gICAgICAgIHRoaXMucmVzdG9yZVNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RDLnZhbHVlLCByZXN1bHRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTm90IGZvdW5kJztcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHR5cGVkKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaCh2YWx1ZSk7XG4gIH1cbiAgc2VhcmNoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNlYXJjaFRleHQgPSB2YWx1ZTtcbiAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnTG9hZGluZy4uLi4uLi4uLic7XG4gICAgICB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyh2YWx1ZSkuc3Vic2NyaWJlKFxuICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IF8ubWFwKHRoaXMudmFsdWUsIF8uY2xvbmUpO1xuICAgICAgICAgICAgY29uc3QgY29uY2F0ID0gZXhpc3RpbmcuY29uY2F0KHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gXy51bmlxQnkoY29uY2F0LCAndmFsdWUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0Vycm9yZWQnO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVTZWxlY3RlZFZhbHVlKHZhbHVlLCByZXN1bHRzKSB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgXy5lYWNoKHJlc3VsdHMsIChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdCh2YWx1ZSk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ25vdCBmb3VuZCBhZnRlciBsb2FkaW5nIGl0ZW1zJywgdmFsdWUsIHJlc3VsdHMpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QoJycpO1xuICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSAnJztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNhblNlYXJjaChzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHNlYXJjaFRleHQubGVuZ3RoIC0gdGhpcy5zZWFyY2hUZXh0Lmxlbmd0aCA+PSAyIHx8XG4gICAgICAgIChzZWFyY2hUZXh0Lmxlbmd0aCAtIHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPD0gMiAmJlxuICAgICAgICAgIHNlYXJjaFRleHQgIT09ICcnKSkgJiZcbiAgICAgIHRoaXMubG9hZGluZyA9PT0gZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLy8gdGhpcyBpcyB0aGUgaW5pdGlhbCB2YWx1ZSBzZXQgdG8gdGhlIGNvbXBvbmVudFxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpLnN1YnNjcmliZShcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbcmVzdWx0XTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gcmVnaXN0ZXJzICdmbicgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gY2hhbmdlcyBhcmUgbWFkZVxuICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICAvLyBub3QgdXNlZCwgdXNlZCBmb3IgdG91Y2ggaW5wdXRcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cbiAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcbiAgICAvLyAuLi4uLlxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XG4gIH1cbiAgcmVtb3ZlZChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW1vdmVkJyk7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoJycpO1xuICB9XG4gIHNlbGVjdGVkKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQudmFsdWUpO1xuICB9XG5cbiAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAvLyBhIHBsYWNlaG9sZGVyIGZvciBhIG1ldGhvZCB0aGF0IHRha2VzIG9uZSBwYXJhbWV0ZXIsXG4gIC8vIHdlIHVzZSBpdCB0byBlbWl0IGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChjaGFuZ2U6IGFueSkgPT4ge307XG59XG4iXX0=