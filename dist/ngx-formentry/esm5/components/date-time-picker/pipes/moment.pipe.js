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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9waXBlcy9tb21lbnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRDtJQUFBO0lBSUEsQ0FBQztJQUhHLDhCQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsTUFBZTtRQUNyQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBSFEsVUFBVTtRQUZ0QixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7T0FFVixVQUFVLENBSXRCO0lBQUQsaUJBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtb21lbnQucGlwZVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG5AUGlwZSh7bmFtZTogJ21vbWVudCd9KVxuXG5leHBvcnQgY2xhc3MgTW9tZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShtb21lbnQ6IE1vbWVudCwgZm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IG1vbWVudC5mb3JtYXQoZm9ybWF0KSA6IG1vbWVudC5mb3JtYXQoJ01NTSBERCwgWVlZWScpO1xuICAgIH1cbn1cbiJdfQ==