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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9waXBlcy9tb21lbnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFLQSxDQUFDO0lBSEMsOEJBQVMsR0FBVCxVQUFVLE1BQWMsRUFBRSxNQUFlO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7Z0JBSkYsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs7SUFLeEIsaUJBQUM7Q0FBQSxBQUxELElBS0M7U0FKWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtb21lbnQucGlwZVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG5AUGlwZSh7IG5hbWU6ICdtb21lbnQnIH0pXG5leHBvcnQgY2xhc3MgTW9tZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0obW9tZW50OiBNb21lbnQsIGZvcm1hdD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdCA/IG1vbWVudC5mb3JtYXQoZm9ybWF0KSA6IG1vbWVudC5mb3JtYXQoJ01NTSBERCwgWVlZWScpO1xuICB9XG59XG4iXX0=