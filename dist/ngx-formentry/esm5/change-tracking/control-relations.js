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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRDtJQUtFLDBCQUNFLFdBQTRCLEVBQzVCLFNBQStDO1FBSnpDLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBTWhDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxzQkFBSSwwQ0FBWTthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVM7YUFBYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWM7YUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELDZDQUFrQixHQUFsQixVQUFtQixTQUE4QztRQUMvRCxFQUFFLENBQUMsQ0FBQyxTQUFTLFlBQVksZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDakIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDckQsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAnLi9jb250cm9sLXJlbGF0aW9uJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnMge1xuICBwcml2YXRlIF9yZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sO1xuICBwcml2YXRlIF9yZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbltdO1xuICBwcml2YXRlIF9vdGhlclJlbGF0aW9uczogYW55ID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVsYXRpb25Gb3I6IEFic3RyYWN0Q29udHJvbCxcbiAgICByZWxhdGVkVG8/OiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXVxuICApIHtcbiAgICB0aGlzLl9yZWxhdGlvbkZvciA9IHJlbGF0aW9uRm9yO1xuICAgIHRoaXMuX3JlbGF0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHJlbGF0ZWRUbykge1xuICAgICAgdGhpcy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZFRvKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcmVsYXRpb25zRm9yKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9uRm9yO1xuICB9XG5cbiAgZ2V0IHJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9ucztcbiAgfVxuXG4gIGdldCBvdGhlclJlbGF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3RoZXJSZWxhdGlvbnM7XG4gIH1cblxuICBhZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xuICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlbGF0ZWRUbyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbGF0ZWRUby5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlbGF0aW9ucy5wdXNoKFxuICAgICAgICAgIG5ldyBDb250cm9sUmVsYXRpb24odGhpcy5fcmVsYXRpb25Gb3IsIHJlbGF0ZWRUb1tpXSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==