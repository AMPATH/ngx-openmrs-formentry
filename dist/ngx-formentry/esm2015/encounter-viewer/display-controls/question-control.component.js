import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
let QuestionControlComponent = class QuestionControlComponent {
    constructor() {
        // The internal data model
        this.innerValue = '';
    }
    set schema(schema) {
        this._schema = schema;
    }
    set value(value) {
        this._value = value;
    }
    set dataSource(dataSource) {
        this._dataSource = dataSource;
    }
    ngOnInit() {
        this.writeValue(this._value);
    }
    isUuid(value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Current time string.
    writeValue(v, arrayElement) {
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
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
    isDate(str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], QuestionControlComponent.prototype, "schema", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], QuestionControlComponent.prototype, "value", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], QuestionControlComponent.prototype, "dataSource", null);
QuestionControlComponent = tslib_1.__decorate([
    Component({
        selector: 'question-control',
        template: "<div>\n    {{innerValue}}\n</div>",
        styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], QuestionControlComponent);
export { QuestionControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFPNUIsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFlakM7UUFMQSwwQkFBMEI7UUFDbkIsZUFBVSxHQUFRLEVBQUUsQ0FBQztJQUliLENBQUM7SUFkUCxJQUFXLE1BQU0sQ0FBQyxNQUFXO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFDUSxJQUFXLEtBQUssQ0FBQyxLQUFLO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDUSxJQUFXLFVBQVUsQ0FBQyxVQUFlO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFRRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFhO1FBQ3pCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pGLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBQ0QsdUJBQXVCO0lBRWhCLFVBQVUsQ0FBQyxDQUFNLEVBQUUsWUFBc0I7UUFDOUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLE1BQU0sR0FBRyxHQUNULElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakUsSUFBSSxHQUFHLEVBQUU7d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQUU7eUJBQU07d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7cUJBQUU7aUJBQ2hGO3FCQUFNO29CQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUFFO2FBQ3BGO2lCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7b0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFO29CQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQUU7cUJBQU07b0JBQzNFLE9BQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNDO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztpQkFBRTtxQkFBTTtvQkFDL0MsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7YUFDSjtTQUVKO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FFRixDQUFBO0FBM0RVO0lBQVIsS0FBSyxFQUFFOzs7c0RBRVA7QUFDUTtJQUFSLEtBQUssRUFBRTs7O3FEQUVQO0FBQ1E7SUFBUixLQUFLLEVBQUU7OzswREFFUDtBQVRRLHdCQUF3QjtJQUxwQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBRTVCLDZDQUFnRDs7S0FDakQsQ0FBQzs7R0FDUyx3QkFBd0IsQ0E0RGxDO1NBNURVLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3F1ZXN0aW9uLWNvbnRyb2wnLFxuICAgIHN0eWxlVXJsczogWycuL3F1ZXN0aW9uLWNvbnRyb2wuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgfSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XG4gICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBhbnkpIHtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cbiAgICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICAgIHB1YmxpYyBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuICAgIHByaXZhdGUgX3NjaGVtYTogYW55O1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICBwdWJsaWMgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHY6IGFueSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbikge1xuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzVXVpZCh2KSkge1xuICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID1cbiAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTtcbiAgICAgICAgICAgICAgaWYgKHZhbCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2YWwudG9VcHBlckNhc2UoKTsgfSBlbHNlIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfVxuICAgICAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKHYsIHRoaXMuX3NjaGVtYSk7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICBfLmZvckVhY2godiwgKGVsKSA9PiB7XG4gICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMud3JpdGVWYWx1ZShlbCwgdHJ1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBhcnI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpOyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc0RhdGUoc3RyOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlLmlzRGF0ZShzdHIpICYmICFfLmlzTnVtYmVyKHN0cik7XG4gICAgfVxuXG4gIH1cbiJdfQ==