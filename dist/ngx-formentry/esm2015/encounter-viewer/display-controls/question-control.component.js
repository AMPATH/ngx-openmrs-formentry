/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
export class QuestionControlComponent {
    constructor() {
        // The internal data model
        this.innerValue = '';
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    set schema(schema) {
        this._schema = schema;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
    }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    set dataSource(dataSource) {
        this._dataSource = dataSource;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.writeValue(this._value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUuid(value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Current time string.
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    writeValue(v, arrayElement) {
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
                    /** @type {?} */
                    const val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                    if (val) {
                        this.innerValue = val.toUpperCase();
                    }
                    else {
                        this.innerValue = v;
                    }
                }
                else {
                    return this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                }
            }
            else if (_.isArray(v)) {
                /** @type {?} */
                const arr = [];
                _.forEach(v, (/**
                 * @param {?} el
                 * @return {?}
                 */
                (el) => {
                    arr.push(this.writeValue(el, true));
                }));
                this.innerValue = arr;
            }
            else if (this.isDate(v)) {
                if (!arrayElement) {
                    this.innerValue = this._dataSource.convertTime(v);
                }
                else {
                    return this._dataSource.convertTime(v);
                }
            }
            else {
                if (!arrayElement) {
                    this.innerValue = v;
                }
                else {
                    return v;
                }
            }
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    isDate(str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    }
}
QuestionControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'question-control',
                styles: [`input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}`],
                template: `<div>
    {{innerValue}}
</div>`,
            },] },
];
QuestionControlComponent.ctorParameters = () => [];
QuestionControlComponent.propDecorators = {
    schema: [{ type: Input }],
    value: [{ type: Input }],
    dataSource: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    QuestionControlComponent.prototype.innerValue;
    /**
     * @type {?}
     * @private
     */
    QuestionControlComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    QuestionControlComponent.prototype._schema;
    /**
     * @type {?}
     * @private
     */
    QuestionControlComponent.prototype._dataSource;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBUzVCLE1BQU07SUFlRjtRQUxBLDBCQUEwQjtRQUNuQixlQUFVLEdBQVEsRUFBRSxDQUFDO0lBSWIsQ0FBQzs7Ozs7SUFkaEIsSUFBb0IsTUFBTSxDQUFDLE1BQVc7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFvQixLQUFLLENBQUMsS0FBSztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7OztJQUNELElBQW9CLFVBQVUsQ0FBQyxVQUFlO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFRRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFDTSxNQUFNLENBQUMsS0FBYTtRQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFD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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3F1ZXN0aW9uLWNvbnRyb2wnLFxyXG4gICAgc3R5bGVzOiBbYGlucHV0e2JvcmRlcjpub25lO2JveC1zaGFkb3c6bm9uZTtjb2xvcjojMDAwO2JhY2tncm91bmQ6I2ZmZiFpbXBvcnRhbnQ7cGFkZGluZy10b3A6MjNweDtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfWBdLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxyXG4gICAge3tpbm5lclZhbHVlfX1cclxuPC9kaXY+YCxcclxuICB9KVxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XHJcbiAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgdmFsdWUodmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBhbnkpIHtcclxuICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcbiAgICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxyXG4gICAgcHVibGljIGlubmVyVmFsdWU6IGFueSA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcclxuICAgIHByaXZhdGUgX3NjaGVtYTogYW55O1xyXG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRW5jb3VudGVyVmlld2VyU2VydmljZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuX3ZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1V1aWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAzNiAmJiB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmIHZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXHJcblxyXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55LCBhcnJheUVsZW1lbnQ/OiBib29sZWFuKSB7XHJcbiAgICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmlzVXVpZCh2KSkge1xyXG4gICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9XHJcbiAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTtcclxuICAgICAgICAgICAgICBpZiAodmFsKSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHZhbC50b1VwcGVyQ2FzZSgpOyB9IGVsc2UgeyB0aGlzLmlubmVyVmFsdWUgPSB2OyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IHJldHVybiB0aGlzLl9kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSh2LCB0aGlzLl9zY2hlbWEpOyB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKHYsIChlbCkgPT4ge1xyXG4gICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMud3JpdGVWYWx1ZShlbCwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gYXJyO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZSh2KSkge1xyXG4gICAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuX2RhdGFTb3VyY2UuY29udmVydFRpbWUodik7IH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fZGF0YVNvdXJjZS5jb252ZXJ0VGltZSh2KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHY7IH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRGF0ZShzdHI6IHN0cmluZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5pc0RhdGUoc3RyKSAmJiAhXy5pc051bWJlcihzdHIpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbiJdfQ==