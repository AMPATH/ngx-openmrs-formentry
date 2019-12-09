import { AbstractControl } from '@angular/forms';
import { ControlRelation } from './control-relation';
var ControlRelations = /** @class */ (function () {
    function ControlRelations(relationFor, relatedTo) {
        this._otherRelations = [];
        this._relationFor = relationFor;
        this._relations = [];
        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }
    Object.defineProperty(ControlRelations.prototype, "relationsFor", {
        get: function () {
            return this._relationFor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelations.prototype, "relations", {
        get: function () {
            return this._relations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelations.prototype, "otherRelations", {
        get: function () {
            return this._otherRelations;
        },
        enumerable: true,
        configurable: true
    });
    ControlRelations.prototype.addRelatedControls = function (relatedTo) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }
        if (relatedTo instanceof Array) {
            for (var i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    };
    return ControlRelations;
}());
export { ControlRelations };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJEO0lBTUksMEJBQVksV0FBNEIsRUFBRSxTQUErQztRQUZqRixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUc5QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLFNBQVMsRUFBRTtZQUNYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRCxzQkFBSSwwQ0FBWTthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFTO2FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBYzthQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELDZDQUFrQixHQUFsQixVQUFtQixTQUE4QztRQUM3RCxJQUFJLFNBQVMsWUFBWSxlQUFlLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBSSxTQUFTLFlBQVksS0FBSyxFQUFFO1lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0U7U0FDSjtJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zIHtcblxuICAgIHByaXZhdGUgX3JlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSBfcmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25bXTtcbiAgICBwcml2YXRlIF9vdGhlclJlbGF0aW9uczogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG8/OiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xuICAgICAgICB0aGlzLl9yZWxhdGlvbkZvciA9IHJlbGF0aW9uRm9yO1xuICAgICAgICB0aGlzLl9yZWxhdGlvbnMgPSBbXTtcblxuICAgICAgICBpZiAocmVsYXRlZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0aW9uc0ZvcigpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25Gb3I7XG4gICAgfVxuXG4gICAgZ2V0IHJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IG90aGVyUmVsYXRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX290aGVyUmVsYXRpb25zO1xuICAgIH1cblxuICAgIGFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XG4gICAgICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsYXRlZFRvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG9baV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==