import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CheckboxControlComponent = /** @class */ (function () {
    function CheckboxControlComponent() {
        this._value = [];
        this.onChange = function (change) { };
        this.onTouched = function () { };
    }
    CheckboxControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = this.options.map(function (option) {
            if (_this.selected.indexOf(option.value) !== -1) {
                Object.assign(option, { checked: true });
            }
            return option;
        });
    };
    CheckboxControlComponent.prototype.ngAfterViewInit = function () { };
    CheckboxControlComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    CheckboxControlComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CheckboxControlComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Object.defineProperty(CheckboxControlComponent.prototype, "value", {
        get: function () {
            if (this._value.length === 0) {
                return '';
            }
            else {
                return this._value || this._value[0];
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
        },
        enumerable: true,
        configurable: true
    });
    CheckboxControlComponent.prototype.selectOpt = function (option, event) {
        var _this = this;
        if (event.target.checked) {
            this._value.push(option.value);
        }
        else {
            this.options.forEach(function (o) {
                if (o.value === option.value) {
                    _this._value.splice(o, 1);
                }
            });
        }
        this.onChange(this.value);
    };
    CheckboxControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkbox',
                    template: "<div *ngFor=\"let option of options; let i = index\">\n  <label class=\"form-control no-border\">\n    <input\n      type=\"checkbox\"\n      id=\"i + 'id'\"\n      (change)=\"selectOpt(option, $event)\"\n      value=\"option.value\"\n      [checked]=\"option.checked\"\n    />\n    {{ option.label }}\n  </label>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CheckboxControlComponent; }),
                            multi: true
                        }
                    ],
                    styles: [
                        "\n      .no-border {\n        border: 0;\n        box-shadow: none;\n      }\n    "
                    ]
                },] },
    ];
    CheckboxControlComponent.propDecorators = {
        options: [{ type: Input }],
        selected: [{ type: Input }]
    };
    return CheckboxControlComponent;
}());
export { CheckboxControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFHWCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekU7SUFBQTtRQWtDUyxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBeUR2QixhQUFRLEdBQUcsVUFBQyxNQUFXLElBQU0sQ0FBQyxDQUFDO1FBQy9CLGNBQVMsR0FBRyxjQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBekRRLDJDQUFRLEdBQWY7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sa0RBQWUsR0FBdEIsY0FBMEIsQ0FBQztJQUVwQiw2Q0FBVSxHQUFqQixVQUFrQixLQUFVO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxtREFBZ0IsR0FBdkIsVUFBd0IsRUFBb0I7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLG9EQUFpQixHQUF4QixVQUF5QixFQUFjO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQkFBSSwyQ0FBSzthQUFUO1lBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNaLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDO2FBRUQsVUFBVSxDQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsR0FBRyxFQUFFLENBQUM7WUFDVCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLElBQUksU0FBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDN0QsQ0FBQztRQUNILENBQUM7OztPQVZBO0lBWU0sNENBQVMsR0FBaEIsVUFBaUIsTUFBTSxFQUFFLEtBQUs7UUFBOUIsaUJBWUM7UUFYQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Z0JBekZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLHFVQVlYO29CQUNDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQzs0QkFDdkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLG9GQUtDO3FCQUNGO2lCQUNGOzs7MEJBRUUsS0FBSzsyQkFDTCxLQUFLOztJQTREUiwrQkFBQztDQUFBLEFBN0ZELElBNkZDO1NBOURZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIGZvcndhcmRSZWYsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGVja2JveCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7IGxldCBpID0gaW5kZXhcIj5cbiAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sIG5vLWJvcmRlclwiPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgIGlkPVwiaSArICdpZCdcIlxuICAgICAgKGNoYW5nZSk9XCJzZWxlY3RPcHQob3B0aW9uLCAkZXZlbnQpXCJcbiAgICAgIHZhbHVlPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgIFtjaGVja2VkXT1cIm9wdGlvbi5jaGVja2VkXCJcbiAgICAvPlxuICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICA8L2xhYmVsPlxuPC9kaXY+XG5gLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94Q29udHJvbENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLm5vLWJvcmRlciB7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM6IEFycmF5PGFueT47XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWxlY3RlZDogQXJyYXk8YW55PjtcbiAgcHVibGljIF92YWx1ZTogQXJyYXk8YW55PiA9IFtdO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb24sIHsgY2hlY2tlZDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcHRpb247XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge31cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWUgfHwgdGhpcy5fdmFsdWVbMF07XG4gICAgfVxuICB9XG5cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcgfHwgdiA9PT0gbnVsbCB8fCB2ID09PSAnJykge1xuICAgICAgdiA9IFtdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2ID0gW3ZdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkuJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdE9wdChvcHRpb24sIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICB0aGlzLl92YWx1ZS5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgIGlmIChvLnZhbHVlID09PSBvcHRpb24udmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl92YWx1ZS5zcGxpY2UobywgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhbmdlID0gKGNoYW5nZTogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7fTtcbn1cbiJdfQ==