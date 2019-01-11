/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                _.forEach(v, (el) => {
                    arr.push(this.writeValue(el, true));
                });
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
                template: "<div>\n    {{innerValue}}\n</div>",
                styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"]
            }] }
];
/** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBTzVCLE1BQU0sT0FBTyx3QkFBd0I7SUFlakM7O1FBSk8sZUFBVSxHQUFRLEVBQUUsQ0FBQztJQUliLENBQUM7Ozs7O0lBZGhCLElBQW9CLE1BQU0sQ0FBQyxNQUFXO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBQ0QsSUFBb0IsS0FBSyxDQUFDLEtBQUs7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFDRCxJQUFvQixVQUFVLENBQUMsVUFBZTtRQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUNoQyxDQUFDOzs7O0lBUUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBQ00sTUFBTSxDQUFDLEtBQWE7UUFDekIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakYsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7Ozs7SUFHTSxVQUFVLENBQUMsQ0FBTSxFQUFFLFlBQXNCO1FBQzlDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFOzswQkFDWCxHQUFHLEdBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDaEUsSUFBSSxHQUFHLEVBQUU7d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQUU7eUJBQU07d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7cUJBQUU7aUJBQ2hGO3FCQUFNO29CQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUFFO2FBQ3BGO2lCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7c0JBQ2pCLEdBQUcsR0FBRyxFQUFFO2dCQUNkLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7b0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFO29CQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQUU7cUJBQU07b0JBQzNFLE9BQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNDO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztpQkFBRTtxQkFBTTtvQkFDL0MsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7YUFDSjtTQUVKO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7WUEvREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBRTVCLDZDQUFnRDs7YUFDakQ7Ozs7O3FCQUVFLEtBQUs7b0JBR0wsS0FBSzt5QkFHTCxLQUFLOzs7O0lBSU4sOENBQTRCOzs7OztJQUM1QiwwQ0FBb0I7Ozs7O0lBQ3BCLDJDQUFxQjs7Ozs7SUFDckIsK0NBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncXVlc3Rpb24tY29udHJvbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3F1ZXN0aW9uLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICB9KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHNldCBzY2hlbWEoc2NoZW1hOiBhbnkpIHtcbiAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IGFueSkge1xuICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuICAgIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gICAgcHVibGljIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBfc2NoZW1hOiBhbnk7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRW5jb3VudGVyVmlld2VyU2VydmljZTtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHB1YmxpYyBpc1V1aWQodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMzYgJiYgdmFsdWUuaW5kZXhPZignICcpID09PSAtMSAmJiB2YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55LCBhcnJheUVsZW1lbnQ/OiBib29sZWFuKSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNVdWlkKHYpKSB7XG4gICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPVxuICAgICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSh2LCB0aGlzLl9zY2hlbWEpO1xuICAgICAgICAgICAgICBpZiAodmFsKSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHZhbC50b1VwcGVyQ2FzZSgpOyB9IGVsc2UgeyB0aGlzLmlubmVyVmFsdWUgPSB2OyB9XG4gICAgICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTsgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KHYpKSB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIF8uZm9yRWFjaCh2LCAoZWwpID0+IHtcbiAgICAgICAgICAgICAgYXJyLnB1c2godGhpcy53cml0ZVZhbHVlKGVsLCB0cnVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IGFycjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuX2RhdGFTb3VyY2UuY29udmVydFRpbWUodik7IH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuX2RhdGFTb3VyY2UuY29udmVydFRpbWUodik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2OyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZShzdHI6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UuaXNEYXRlKHN0cikgJiYgIV8uaXNOdW1iZXIoc3RyKTtcbiAgICB9XG5cbiAgfVxuIl19