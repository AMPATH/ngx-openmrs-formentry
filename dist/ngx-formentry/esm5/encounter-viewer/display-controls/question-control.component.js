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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCO0lBc0JJO1FBTEEsMEJBQTBCO1FBQ25CLGVBQVUsR0FBUSxFQUFFLENBQUM7SUFJYixDQUFDO0lBZGhCLHNCQUFvQiw0Q0FBTTs7Ozs7UUFBMUIsVUFBMkIsTUFBVztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQiwyQ0FBSzs7Ozs7UUFBekIsVUFBMEIsS0FBSztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQixnREFBVTs7Ozs7UUFBOUIsVUFBK0IsVUFBZTtZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTs7OztJQVFELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBQ00seUNBQU07Ozs7SUFBYixVQUFjLEtBQWE7UUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QkFFRSxLQUFLO3dCQUdMLEtBQUs7NkJBR0wsS0FBSzs7SUFxRFIsK0JBQUM7Q0FBQSxBQW5FSCxJQW1FRztTQTVEVSx3QkFBd0I7OztJQVdqQyw4Q0FBNEI7Ozs7O0lBQzVCLDBDQUFvQjs7Ozs7SUFDcEIsMkNBQXFCOzs7OztJQUNyQiwrQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncXVlc3Rpb24tY29udHJvbCcsXHJcbiAgICBzdHlsZXM6IFtgaW5wdXR7Ym9yZGVyOm5vbmU7Ym94LXNoYWRvdzpub25lO2NvbG9yOiMwMDA7YmFja2dyb3VuZDojZmZmIWltcG9ydGFudDtwYWRkaW5nLXRvcDoyM3B4O2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmV9YF0sXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgICB7e2lubmVyVmFsdWV9fVxyXG48L2Rpdj5gLFxyXG4gIH0pXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgcHVibGljIHNldCBzY2hlbWEoc2NoZW1hOiBhbnkpIHtcclxuICAgICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgcHVibGljIHNldCB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgcHVibGljIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IGFueSkge1xyXG4gICAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcclxuICAgIH1cclxuICAgIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXHJcbiAgICBwdWJsaWMgaW5uZXJWYWx1ZTogYW55ID0gJyc7XHJcbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfc2NoZW1hOiBhbnk7XHJcbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzVXVpZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cclxuXHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnksIGFycmF5RWxlbWVudD86IGJvb2xlYW4pIHtcclxuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuaXNVdWlkKHYpKSB7XHJcbiAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdmFsID1cclxuICAgICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSh2LCB0aGlzLl9zY2hlbWEpO1xyXG4gICAgICAgICAgICAgIGlmICh2YWwpIHsgdGhpcy5pbm5lclZhbHVlID0gdmFsLnRvVXBwZXJDYXNlKCk7IH0gZWxzZSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHY7IH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKHYsIHRoaXMuX3NjaGVtYSk7IH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KHYpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IFtdO1xyXG4gICAgICAgICAgICBfLmZvckVhY2godiwgKGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgYXJyLnB1c2godGhpcy53cml0ZVZhbHVlKGVsLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBhcnI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKHYpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHsgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5fZGF0YVNvdXJjZS5jb252ZXJ0VGltZSh2KTsgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEYXRlKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlLmlzRGF0ZShzdHIpICYmICFfLmlzTnVtYmVyKHN0cik7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuIl19