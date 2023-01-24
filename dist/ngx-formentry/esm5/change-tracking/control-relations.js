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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJEO0lBS0UsMEJBQ0UsV0FBNEIsRUFDNUIsU0FBK0M7UUFKekMsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFNaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVELHNCQUFJLDBDQUFZO2FBQWhCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBUzthQUFiO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBYzthQUFsQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsNkNBQWtCLEdBQWxCLFVBQW1CLFNBQThDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNyRCxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICcuL2NvbnRyb2wtcmVsYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9ucyB7XG4gIHByaXZhdGUgX3JlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2w7XG4gIHByaXZhdGUgX3JlbGF0aW9uczogQ29udHJvbFJlbGF0aW9uW107XG4gIHByaXZhdGUgX290aGVyUmVsYXRpb25zOiBhbnkgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sLFxuICAgIHJlbGF0ZWRUbz86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdXG4gICkge1xuICAgIHRoaXMuX3JlbGF0aW9uRm9yID0gcmVsYXRpb25Gb3I7XG4gICAgdGhpcy5fcmVsYXRpb25zID0gW107XG5cbiAgICBpZiAocmVsYXRlZFRvKSB7XG4gICAgICB0aGlzLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG8pO1xuICAgIH1cbiAgfVxuXG4gIGdldCByZWxhdGlvbnNGb3IoKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25Gb3I7XG4gIH1cblxuICBnZXQgcmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25zO1xuICB9XG5cbiAgZ2V0IG90aGVyUmVsYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9vdGhlclJlbGF0aW9ucztcbiAgfVxuXG4gIGFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XG4gICAgaWYgKHJlbGF0ZWRUbyBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG8pKTtcbiAgICB9XG5cbiAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsYXRlZFRvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2goXG4gICAgICAgICAgbmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvW2ldKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19