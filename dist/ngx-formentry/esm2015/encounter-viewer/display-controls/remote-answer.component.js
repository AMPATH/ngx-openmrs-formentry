/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => { });
const ɵ0 = noop;
export class RemoteAnswerComponent {
    constructor() {
        this.innerValue = null;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
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
    }
    // get accessor
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    // set accessor including call the onchange callback
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    // Current time string.
    /**
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        if (v !== this.innerValue) {
            if (this._dataSource) {
                this._dataSource.resolveSelectedValue(v).subscribe((/**
                 * @param {?} ans
                 * @return {?}
                 */
                (ans) => {
                    this.innerValue = ans.label;
                }));
            }
            else {
                this.innerValue = v;
            }
        }
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
    }
}
RemoteAnswerComponent.decorators = [
    { type: Component, args: [{
                selector: 'remote-answer',
                styles: [],
                template: `
    <div *ngIf="innerValue">
      {{innerValue}}
      </div>
`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => RemoteAnswerComponent)),
                        multi: true
                    }
                ]
            },] },
];
RemoteAnswerComponent.ctorParameters = () => [];
RemoteAnswerComponent.propDecorators = {
    source: [{ type: Input }],
    dataSource: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    RemoteAnswerComponent.prototype.source;
    /** @type {?} */
    RemoteAnswerComponent.prototype.innerValue;
    /**
     * @type {?}
     * @private
     */
    RemoteAnswerComponent.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    RemoteAnswerComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    RemoteAnswerComponent.prototype.onChangeCallback;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWFuc3dlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcmVtb3RlLWFuc3dlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFFckMsTUFBTSxlQUFlLENBQUM7QUFDekIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztNQUVuRSxJQUFJOzs7QUFBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7O0FBa0JyQixNQUFNO0lBZUY7UUFiTyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBU3pCLDJEQUEyRDtRQUMzRCxnQ0FBZ0M7UUFDeEIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFxQixJQUFJLENBQUM7SUFDbkMsQ0FBQzs7OztJQVhoQixJQUNXLFVBQVU7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFDRCxJQUFXLFVBQVUsQ0FBQyxDQUFhO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBT0QsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBR0QsSUFBSSxLQUFLLENBQUMsQ0FBTTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQzs7Ozs7O0lBR00sVUFBVSxDQUFDLENBQU07UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7Z0JBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNoQyxDQUFDLEVBQUMsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Ozs7OztJQUdNLGdCQUFnQixDQUFDLEVBQU87UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFHTSxpQkFBaUIsQ0FBQyxFQUFPO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVNLFFBQVEsQ0FBQyxLQUFVO0lBQzFCLENBQUM7OztZQXhFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTs7OztDQUliO2dCQUNHLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFDO3dCQUNwRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjthQUNGOzs7O3FCQUVFLEtBQUs7eUJBR0wsS0FBSzs7OztJQUhOLHVDQUE0Qjs7SUFDNUIsMkNBQXlCOzs7OztJQUN6Qiw0Q0FBZ0M7Ozs7O0lBVWhDLGtEQUE2Qzs7Ozs7SUFDN0MsaURBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXG4gICAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3JlbW90ZS1hbnN3ZXInLFxuICAgIHN0eWxlczogW10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaW5uZXJWYWx1ZVwiPlxuICAgICAge3tpbm5lclZhbHVlfX1cbiAgICAgIDwvZGl2PlxuYCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJlbW90ZUFuc3dlckNvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9KVxuZXhwb3J0IGNsYXNzIFJlbW90ZUFuc3dlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gICAgcHVibGljIGlubmVyVmFsdWUgPSBudWxsO1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG4gICAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIC8vIGdldCBhY2Nlc3NvclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2KS5zdWJzY3JpYmUoKGFucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gYW5zLmxhYmVsO1xuICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIG9uQmx1cigpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIH1cbiAgfVxuIl19