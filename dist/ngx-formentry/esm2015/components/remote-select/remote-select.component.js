import { Component, Input, forwardRef, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
export class RemoteSelectComponent {
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
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
        if (this._dataSource && this._dataSource.dataFromSourceChanged) {
            this.subscribeToDataSourceDataChanges();
        }
    }
    ngOnInit() { }
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
    typed(value) {
        this.search(value);
    }
    search(value) {
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value).subscribe((result) => {
                if (result.length > 0) {
                    const existing = _.map(this.value, _.clone);
                    const concat = existing.concat(result);
                    this.items = _.uniqBy(concat, 'value');
                }
                this.notFoundMsg = '';
            }, (error) => {
                this.notFoundMsg = 'Errored';
            });
        }
    }
    restoreSelectedValue(value, results) {
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
    canSearch(searchText) {
        return ((searchText.length - this.searchText.length >= 2 ||
            (searchText.length - this.searchText.length <= 2 &&
                searchText !== '')) &&
            this.loading === false);
    }
    // this is the initial value set to the component
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
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    registerOnTouched() { }
    // change events from the textarea
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    removed(event) {
        console.log('Removed');
        this.propagateChange('');
    }
    selected(event) {
        this.propagateChange(event.value);
    }
}
RemoteSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'remote-select',
                template: `<div>
  <ng-select
    [id]="componentID"
    [noFilter]="0"
    (selected)="selected($event)"
    (deselected)="removed($event)"
    [options]="items"
    [allowClear]="true"
    [placeholder]="placeholder"
    [notFoundMsg]="notFoundMsg"
    (typed)="typed($event)"
    tabindex="0"
  >
  </ng-select>
  <div *ngIf="loading">resolving....</div>
</div>
`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => RemoteSelectComponent),
                        multi: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBNEI1QixNQUFNO0lBMEJKLFlBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUF6QnZDLG1DQUFtQztRQUMxQixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUVuQyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBQ3JCLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1RCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBaUloQixpREFBaUQ7UUFDakQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUNyQyxvQkFBZSxHQUFHLENBQUMsTUFBVyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFySEosQ0FBQztJQVgzQyxJQUNXLFVBQVU7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDakMsSUFBSSxD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QWU7eUJBR3pCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIGZvcndhcmRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncmVtb3RlLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPG5nLXNlbGVjdFxuICAgIFtpZF09XCJjb21wb25lbnRJRFwiXG4gICAgW25vRmlsdGVyXT1cIjBcIlxuICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAoZGVzZWxlY3RlZCk9XCJyZW1vdmVkKCRldmVudClcIlxuICAgIFtvcHRpb25zXT1cIml0ZW1zXCJcbiAgICBbYWxsb3dDbGVhcl09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIFtub3RGb3VuZE1zZ109XCJub3RGb3VuZE1zZ1wiXG4gICAgKHR5cGVkKT1cInR5cGVkKCRldmVudClcIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gID5cbiAgPC9uZy1zZWxlY3Q+XG4gIDxkaXYgKm5nSWY9XCJsb2FkaW5nXCI+cmVzb2x2aW5nLi4uLjwvZGl2PlxuPC9kaXY+XG5gLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJlbW90ZVNlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLy8gQElucHV0KCkgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnU2VhcmNoLi4uJztcbiAgQElucHV0KCkgY29tcG9uZW50SUQ6IHN0cmluZztcbiAgaXRlbXMgPSBbXTtcbiAgdmFsdWUgPSBbXTtcbiAgbG9hZGluZyA9IGZhbHNlO1xuICBzZWFyY2hUZXh0ID0gJyc7XG4gIG5vdEZvdW5kTXNnID0gJ21hdGNoIG5vIGZvdW5kJztcbiAgQE91dHB1dCgpIGRvbmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY2hhcmFjdGVycyA9IFtdO1xuICBAVmlld0NoaWxkKFNlbGVjdENvbXBvbmVudCkgcHJpdmF0ZSBzZWxlY3RDOiBTZWxlY3RDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICB9XG4gIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IHY7XG4gICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgJiYgdGhpcy5fZGF0YVNvdXJjZS5kYXRhRnJvbVNvdXJjZUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9EYXRhU291cmNlRGF0YUNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIHN1YnNjcmliZVRvRGF0YVNvdXJjZURhdGFDaGFuZ2VzKCkge1xuICAgIHRoaXMuX2RhdGFTb3VyY2UuZGF0YUZyb21Tb3VyY2VDaGFuZ2VkLnN1YnNjcmliZSgocmVzdWx0cykgPT4ge1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICcnO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndXBkYXRpbmcgaXRlbXMnLCByZXN1bHRzLCB0aGlzLnNlbGVjdEMudmFsdWUpO1xuICAgICAgICB0aGlzLnJlc3RvcmVTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0Qy52YWx1ZSwgcmVzdWx0cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ05vdCBmb3VuZCc7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0eXBlZCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2godmFsdWUpO1xuICB9XG4gIHNlYXJjaCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gdmFsdWU7XG4gICAgICB0aGlzLm5vdEZvdW5kTXNnID0gJ0xvYWRpbmcuLi4uLi4uLi4nO1xuICAgICAgdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnModmFsdWUpLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBfLm1hcCh0aGlzLnZhbHVlLCBfLmNsb25lKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmNhdCA9IGV4aXN0aW5nLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IF8udW5pcUJ5KGNvbmNhdCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubm90Rm91bmRNc2cgPSAnJztcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5ub3RGb3VuZE1zZyA9ICdFcnJvcmVkJztcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXN0b3JlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSwgcmVzdWx0cykge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIF8uZWFjaChyZXN1bHRzLCAoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Qy5zZWxlY3QodmFsdWUpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0Qy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdub3QgZm91bmQgYWZ0ZXIgbG9hZGluZyBpdGVtcycsIHZhbHVlLCByZXN1bHRzKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdEMuc2VsZWN0KCcnKTtcbiAgICAgICAgdGhpcy5zZWxlY3RDLnZhbHVlID0gJyc7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjYW5TZWFyY2goc2VhcmNoVGV4dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChzZWFyY2hUZXh0Lmxlbmd0aCAtIHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPj0gMiB8fFxuICAgICAgICAoc2VhcmNoVGV4dC5sZW5ndGggLSB0aGlzLnNlYXJjaFRleHQubGVuZ3RoIDw9IDIgJiZcbiAgICAgICAgICBzZWFyY2hUZXh0ICE9PSAnJykpICYmXG4gICAgICB0aGlzLmxvYWRpbmcgPT09IGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW3Jlc3VsdF07XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDLnNlbGVjdChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEMudmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIHJlZ2lzdGVycyAnZm4nIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGNoYW5nZXMgYXJlIG1hZGVcbiAgLy8gdGhpcyBpcyBob3cgd2UgZW1pdCB0aGUgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLy8gbm90IHVzZWQsIHVzZWQgZm9yIHRvdWNoIGlucHV0XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCgpIHt9XG4gIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC5pZCk7XG4gICAgLy8gLi4uLi5cbiAgICAvLyB1cGRhdGUgdGhlIGZvcm1cbiAgICAvLyB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmRhdGEpO1xuICB9XG4gIHJlbW92ZWQoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnUmVtb3ZlZCcpO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKCcnKTtcbiAgfVxuICBzZWxlY3RlZChldmVudCkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LnZhbHVlKTtcbiAgfVxuXG4gIC8vIHRoZSBtZXRob2Qgc2V0IGluIHJlZ2lzdGVyT25DaGFuZ2UsIGl0IGlzIGp1c3RcbiAgLy8gYSBwbGFjZWhvbGRlciBmb3IgYSBtZXRob2QgdGhhdCB0YWtlcyBvbmUgcGFyYW1ldGVyLFxuICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoY2hhbmdlOiBhbnkpID0+IHt9O1xufVxuIl19