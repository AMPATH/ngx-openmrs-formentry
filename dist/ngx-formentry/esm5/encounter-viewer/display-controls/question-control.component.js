import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
var QuestionControlComponent = /** @class */ (function () {
    function QuestionControlComponent() {
        // The internal data model
        this.innerValue = '';
    }
    Object.defineProperty(QuestionControlComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "value", {
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "dataSource", {
        set: function (dataSource) {
            this._dataSource = dataSource;
        },
        enumerable: true,
        configurable: true
    });
    QuestionControlComponent.prototype.ngOnInit = function () {
        this.writeValue(this._value);
    };
    QuestionControlComponent.prototype.isUuid = function (value) {
        if (value.length === 36 &&
            value.indexOf(' ') === -1 &&
            value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    // Current time string.
    QuestionControlComponent.prototype.writeValue = function (v, arrayElement) {
        var _this = this;
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
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
                var arr_1 = [];
                _.forEach(v, function (el) {
                    arr_1.push(_this.writeValue(el, true));
                });
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
    QuestionControlComponent.prototype.isDate = function (str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    };
    QuestionControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'question-control',
                    styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"],
                    template: "<div>\n  {{ innerValue }}\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    QuestionControlComponent.ctorParameters = function () { return []; };
    QuestionControlComponent.propDecorators = {
        schema: [{ type: Input }],
        value: [{ type: Input }],
        dataSource: [{ type: Input }]
    };
    return QuestionControlComponent;
}());
export { QuestionControlComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QjtJQXVCRTtRQUxBLDBCQUEwQjtRQUNuQixlQUFVLEdBQVEsRUFBRSxDQUFDO0lBSWIsQ0FBQztJQWRoQixzQkFBb0IsNENBQU07YUFBMUIsVUFBMkIsTUFBVztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQiwyQ0FBSzthQUF6QixVQUEwQixLQUFLO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQW9CLGdEQUFVO2FBQTlCLFVBQStCLFVBQWU7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFRRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNNLHlDQUFNLEdBQWIsVUFBYyxLQUFhO1FBQ3pCLEVBQUUsQ0FBQyxDQUNELEtBQUssQ0FBQyxNQUFNLEtBQUssRUFBRTtZQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FDMUIsQ0FBQyxDQUFDLENBQUM7WUFDRCxNQUFN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QUdMLEtBQUs7NkJBR0wsS0FBSzs7SUFzRVIsK0JBQUM7Q0FBQSxBQXJGRCxJQXFGQztTQTdFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdxdWVzdGlvbi1jb250cm9sJyxcbiAgc3R5bGVzOiBbYGlucHV0e2JvcmRlcjpub25lO2JveC1zaGFkb3c6bm9uZTtjb2xvcjojMDAwO2JhY2tncm91bmQ6I2ZmZiFpbXBvcnRhbnQ7cGFkZGluZy10b3A6MjNweDtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfWBdLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIHt7IGlubmVyVmFsdWUgfX1cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xuICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgfVxuICBASW5wdXQoKSBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBASW5wdXQoKSBwdWJsaWMgc2V0IGRhdGFTb3VyY2UoZGF0YVNvdXJjZTogYW55KSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gIH1cbiAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHVibGljIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICBwcml2YXRlIF92YWx1ZTogYW55O1xuICBwcml2YXRlIF9zY2hlbWE6IGFueTtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRW5jb3VudGVyVmlld2VyU2VydmljZTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gIH1cbiAgcHVibGljIGlzVXVpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKFxuICAgICAgdmFsdWUubGVuZ3RoID09PSAzNiAmJlxuICAgICAgdmFsdWUuaW5kZXhPZignICcpID09PSAtMSAmJlxuICAgICAgdmFsdWUuaW5kZXhPZignLicpID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnksIGFycmF5RWxlbWVudD86IGJvb2xlYW4pIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5pc1V1aWQodikpIHtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLl9kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShcbiAgICAgICAgICAgIHYsXG4gICAgICAgICAgICB0aGlzLl9zY2hlbWFcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoXG4gICAgICAgICAgICB2LFxuICAgICAgICAgICAgdGhpcy5fc2NoZW1hXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkodikpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIF8uZm9yRWFjaCh2LCAoZWwpID0+IHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLndyaXRlVmFsdWUoZWwsIHRydWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IGFycjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGUodikpIHtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEYXRlKHN0cjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UuaXNEYXRlKHN0cikgJiYgIV8uaXNOdW1iZXIoc3RyKTtcbiAgfVxufVxuIl19