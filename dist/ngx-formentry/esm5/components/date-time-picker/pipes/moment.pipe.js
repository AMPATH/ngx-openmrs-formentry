/**
 * moment.pipe
 */
import { Pipe } from '@angular/core';
var MomentPipe = /** @class */ (function () {
    function MomentPipe() {
    }
    MomentPipe.prototype.transform = function (moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    };
    MomentPipe.decorators = [
        { type: Pipe, args: [{ name: 'moment' },] },
    ];
    return MomentPipe;
}());
export { MomentPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBS0EsQ0FBQztJQUhDLDhCQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsTUFBZTtRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7O2dCQUpGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7O0lBS3hCLGlCQUFDO0NBQUEsQUFMRCxJQUtDO1NBSlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9tZW50LnBpcGVcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcblxuQFBpcGUoeyBuYW1lOiAnbW9tZW50JyB9KVxuZXhwb3J0IGNsYXNzIE1vbWVudFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG1vbWVudDogTW9tZW50LCBmb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXQgPyBtb21lbnQuZm9ybWF0KGZvcm1hdCkgOiBtb21lbnQuZm9ybWF0KCdNTU0gREQsIFlZWVknKTtcbiAgfVxufVxuIl19