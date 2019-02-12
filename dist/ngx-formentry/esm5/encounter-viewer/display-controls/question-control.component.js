/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
var QuestionControlComponent = /** @class */ (function () {
    function QuestionControlComponent() {
        // The internal data model
        this.innerValue = '';
    }
    Object.defineProperty(QuestionControlComponent.prototype, "schema", {
        set: /**
         * @param {?} schema
         * @return {?}
         */
        function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "dataSource", {
        set: /**
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            this._dataSource = dataSource;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    QuestionControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.writeValue(this._value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    QuestionControlComponent.prototype.isUuid = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    // Current time string.
    // Current time string.
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    QuestionControlComponent.prototype.writeValue = 
    // Current time string.
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    function (v, arrayElement) {
        var _this = this;
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
                    /** @type {?} */
                    var val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
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
                var arr_1 = [];
                _.forEach(v, (/**
                 * @param {?} el
                 * @return {?}
                 */
                function (el) {
                    arr_1.push(_this.writeValue(el, true));
                }));
                this.innerValue = arr_1;
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
    };
    /**
     * @param {?} str
     * @return {?}
     */
    QuestionControlComponent.prototype.isDate = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    };
    QuestionControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'question-control',
                    styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"],
                    template: "<div>\n    {{innerValue}}\n</div>",
                },] },
    ];
    QuestionControlComponent.ctorParameters = function () { return []; };
    QuestionControlComponent.propDecorators = {
        schema: [{ type: Input }],
        value: [{ type: Input }],
        dataSource: [{ type: Input }]
    };
    return QuestionControlComponent;
}());
export { QuestionControlComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCO0lBc0JJO1FBTEEsMEJBQTBCO1FBQ25CLGVBQVUsR0FBUSxFQUFFLENBQUM7SUFJYixDQUFDO0lBZGhCLHNCQUFvQiw0Q0FBTTs7Ozs7UUFBMUIsVUFBMkIsTUFBVztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQiwyQ0FBSzs7Ozs7UUFBekIsVUFBMEIsS0FBSztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQixnREFBVTs7Ozs7UUFBOUIsVUFBK0IsVUFBZTtZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTs7OztJQVFELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBQ00seUNBQU07Ozs7SUFBYixVQUFjLEtBQWE7UUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QkFFRSxLQUFLO3dCQUdMLEtBQUs7NkJBR0wsS0FBSzs7SUFxRFIsK0JBQUM7Q0FBQSxBQW5FSCxJQW1FRztTQTVEVSx3QkFBd0I7OztJQVdqQyw4Q0FBNEI7Ozs7O0lBQzVCLDBDQUFvQjs7Ozs7SUFDcEIsMkNBQXFCOzs7OztJQUNyQiwrQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdxdWVzdGlvbi1jb250cm9sJyxcbiAgICBzdHlsZXM6IFtgaW5wdXR7Ym9yZGVyOm5vbmU7Ym94LXNoYWRvdzpub25lO2NvbG9yOiMwMDA7YmFja2dyb3VuZDojZmZmIWltcG9ydGFudDtwYWRkaW5nLXRvcDoyM3B4O2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmV9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIHt7aW5uZXJWYWx1ZX19XG48L2Rpdj5gLFxuICB9KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHNldCBzY2hlbWEoc2NoZW1hOiBhbnkpIHtcbiAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IGFueSkge1xuICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuICAgIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gICAgcHVibGljIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBfc2NoZW1hOiBhbnk7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRW5jb3VudGVyVmlld2VyU2VydmljZTtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHB1YmxpYyBpc1V1aWQodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMzYgJiYgdmFsdWUuaW5kZXhPZignICcpID09PSAtMSAmJiB2YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55LCBhcnJheUVsZW1lbnQ/OiBib29sZWFuKSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNVdWlkKHYpKSB7XG4gICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPVxuICAgICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSh2LCB0aGlzLl9zY2hlbWEpO1xuICAgICAgICAgICAgICBpZiAodmFsKSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHZhbC50b1VwcGVyQ2FzZSgpOyB9IGVsc2UgeyB0aGlzLmlubmVyVmFsdWUgPSB2OyB9XG4gICAgICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTsgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KHYpKSB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIF8uZm9yRWFjaCh2LCAoZWwpID0+IHtcbiAgICAgICAgICAgICAgYXJyLnB1c2godGhpcy53cml0ZVZhbHVlKGVsLCB0cnVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IGFycjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuX2RhdGFTb3VyY2UuY29udmVydFRpbWUodik7IH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuX2RhdGFTb3VyY2UuY29udmVydFRpbWUodik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2OyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZShzdHI6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UuaXNEYXRlKHN0cikgJiYgIV8uaXNOdW1iZXIoc3RyKTtcbiAgICB9XG5cbiAgfVxuIl19