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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRDtJQU1JLDBCQUFZLFdBQTRCLEVBQUUsU0FBK0M7UUFGakYsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQsc0JBQUksMENBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBUzthQUFiO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWM7YUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCw2Q0FBa0IsR0FBbEIsVUFBbUIsU0FBOEM7UUFDN0QsSUFBSSxTQUFTLFlBQVksZUFBZSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUVELElBQUksU0FBUyxZQUFZLEtBQUssRUFBRTtZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICcuL2NvbnRyb2wtcmVsYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9ucyB7XG5cbiAgICBwcml2YXRlIF9yZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sO1xuICAgIHByaXZhdGUgX3JlbGF0aW9uczogQ29udHJvbFJlbGF0aW9uW107XG4gICAgcHJpdmF0ZSBfb3RoZXJSZWxhdGlvbnM6IGFueSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocmVsYXRpb25Gb3I6IEFic3RyYWN0Q29udHJvbCwgcmVsYXRlZFRvPzogQWJzdHJhY3RDb250cm9sIHwgQWJzdHJhY3RDb250cm9sW10pIHtcbiAgICAgICAgdGhpcy5fcmVsYXRpb25Gb3IgPSByZWxhdGlvbkZvcjtcbiAgICAgICAgdGhpcy5fcmVsYXRpb25zID0gW107XG5cbiAgICAgICAgaWYgKHJlbGF0ZWRUbykge1xuICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCByZWxhdGlvbnNGb3IoKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9uRm9yO1xuICAgIH1cblxuICAgIGdldCByZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25zO1xuICAgIH1cblxuICAgIGdldCBvdGhlclJlbGF0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vdGhlclJlbGF0aW9ucztcbiAgICB9XG5cbiAgICBhZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xuICAgICAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLnJlbGF0aW9ucy5wdXNoKG5ldyBDb250cm9sUmVsYXRpb24odGhpcy5fcmVsYXRpb25Gb3IsIHJlbGF0ZWRUbykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbGF0ZWRUbyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbGF0ZWRUby5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=