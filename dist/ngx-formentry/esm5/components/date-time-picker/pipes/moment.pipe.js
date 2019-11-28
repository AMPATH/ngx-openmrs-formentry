/**
 * moment.pipe
 */
import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var MomentPipe = /** @class */ (function () {
    function MomentPipe() {
    }
    MomentPipe.prototype.transform = function (moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    };
    MomentPipe = tslib_1.__decorate([
        Pipe({ name: 'moment' })
    ], MomentPipe);
    return MomentPipe;
}());
export { MomentPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFLcEQ7SUFBQTtJQUlBLENBQUM7SUFIRyw4QkFBUyxHQUFULFVBQVUsTUFBYyxFQUFFLE1BQWU7UUFDckMsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUhRLFVBQVU7UUFGdEIsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO09BRVYsVUFBVSxDQUl0QjtJQUFELGlCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9tZW50LnBpcGVcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcblxuQFBpcGUoe25hbWU6ICdtb21lbnQnfSlcblxuZXhwb3J0IGNsYXNzIE1vbWVudFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0obW9tZW50OiBNb21lbnQsIGZvcm1hdD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBtb21lbnQuZm9ybWF0KGZvcm1hdCkgOiBtb21lbnQuZm9ybWF0KCdNTU0gREQsIFlZWVknKTtcbiAgICB9XG59XG4iXX0=