/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources';
var EncounterViewerComponent = /** @class */ (function () {
    function EncounterViewerComponent(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
    }
    Object.defineProperty(EncounterViewerComponent.prototype, "node", {
        set: /**
         * @param {?} rootNode
         * @return {?}
         */
        function (rootNode) {
            this.rootNode = rootNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "schema", {
        set: /**
         * @param {?} schema
         * @return {?}
         */
        function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "encounter", {
        set: /**
         * @param {?} enc
         * @return {?}
         */
        function (enc) {
            this.enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this.rootNode = form.rootNode;
            this._schema = form.schema;
            console.log(this.rootNode);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    EncounterViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'file') {
            this.fileDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'remote-select') {
            this.remoteDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else {
            this.customDataSource = this.encounterViewerService;
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    EncounterViewerComponent.prototype.questionsAnswered = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    EncounterViewerComponent.prototype.questionAnswered = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    };
    /**
     * @param {?} questionLabel
     * @return {?}
     */
    EncounterViewerComponent.prototype.checkForColon = /**
     * @param {?} questionLabel
     * @return {?}
     */
    function (questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-viewer',
                    template: "<div class=\"viewer\">\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n          <div class=\"panel-body\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n  </div>\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n    class=\"section\">\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left:10px;\">\n  <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n    <div *ngIf=\"rootNode.control.value\">\n    <div class=\"question-answer\">\n      <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n          {{ rootNode.question.label }}\n      </label>\n      <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n      <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n          <div *ngSwitchCase=\" 'file' \">\n            <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n          </div>\n          <div *ngSwitchCase=\"'remote-select'\">\n            <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n          </div>\n          <div *ngSwitchDefault style=\"display:inline-block\">\n              <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n            </div>\n      </div>\n     \n    </div>\n    </div>\n  </form>\n</div>\n\n  <!--Array Controls-->\n  <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\" 'repeating' \">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{rootNode.question.label}}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n          \n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType \">\n      <div *ngSwitchCase=\" 'group' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\" 'field-set' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n    </div>\n  </div>\n\n\n\n  </div>\n",
                    styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"],
                },] },
    ];
    /** @nocollapse */
    EncounterViewerComponent.ctorParameters = function () { return [
        { type: EncounterViewerService, },
        { type: DataSources, },
    ]; };
    EncounterViewerComponent.propDecorators = {
        "parentGroup": [{ type: Input },],
        "parentComponent": [{ type: Input },],
        "node": [{ type: Input },],
        "schema": [{ type: Input },],
        "encounter": [{ type: Input },],
        "form": [{ type: Input },],
    };
    return EncounterViewerComponent;
}());
export { EncounterViewerComponent };
function EncounterViewerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterViewerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterViewerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    EncounterViewerComponent.propDecorators;
    /** @type {?} */
    EncounterViewerComponent.prototype.rootNode;
    /** @type {?} */
    EncounterViewerComponent.prototype.enc;
    /** @type {?} */
    EncounterViewerComponent.prototype.fileDataSource;
    /** @type {?} */
    EncounterViewerComponent.prototype.remoteDataSource;
    /** @type {?} */
    EncounterViewerComponent.prototype.customDataSource;
    /** @type {?} */
    EncounterViewerComponent.prototype._schema;
    /** @type {?} */
    EncounterViewerComponent.prototype.parentGroup;
    /** @type {?} */
    EncounterViewerComponent.prototype.parentComponent;
    /** @type {?} */
    EncounterViewerComponent.prototype.encounterViewerService;
    /** @type {?} */
    EncounterViewerComponent.prototype.dataSources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLHlDQUF5QyxDQUFDO0FBR3hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0lBc0l4RCxrQ0FBb0Isc0JBQThDLEVBQy9DO1FBREMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVc7S0FDN0I7MEJBbkJZLDBDQUFJOzs7OztrQkFBQyxRQUFrQjtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7Ozs7MEJBR1QsNENBQU07Ozs7O2tCQUFDLE1BQVc7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Ozs7OzBCQUdOLCtDQUFTOzs7OztrQkFBQyxHQUFRO1lBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOzs7OzswQkFFTCwwQ0FBSTs7Ozs7a0JBQUMsSUFBUztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7OztJQU96QiwyQ0FBUTs7OztRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTTtlQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkU7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNO2VBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQ3ZEOzs7Ozs7SUFHRixvREFBaUI7Ozs7Y0FBQyxJQUFTO1FBQzlCLHFCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0lBR2QsbURBQWdCOzs7O2NBQUMsSUFBYztRQUNsQyxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7SUFHYixnREFBYTs7OztjQUFDLGFBQXFCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQUU7OztnQkFoS3JGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUseXVKQW9HYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxvUkFBb1IsQ0FBQztpQkFDalM7Ozs7Z0JBN0dRLHNCQUFzQjtnQkFFdEIsV0FBVzs7O2dDQW1IZixLQUFLO29DQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFJTCxLQUFLOzhCQUlMLEtBQUs7eUJBR0osS0FBSzs7bUNBdElYOztTQWtIYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZGF0YS1zb3VyY2VzJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci12aWV3ZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmlld2VyXCI+XHJcblxyXG5cclxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nXCIgY2xhc3M9XCJmb3JtXCI+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXg7XCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldKVwiPlxyXG4gICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiJ3BhZ2UnK2lcIiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cclxuICAgICAgICAgIDxwIGNsYXNzPVwicGFnZS1sYWJlbCBwYW5lbC1oZWFkaW5nIHRleHQtcHJpbWFyeVwiPnt7cXVlc3Rpb24ubGFiZWx9fTwvcD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIiBbc2NoZW1hXT1cIl9zY2hlbWFcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbFwiPjwvZW5jb3VudGVyLXZpZXdlcj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnXCIgY2xhc3M9XCJwYWdlXCI+XHJcbiAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXHJcbiAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZW5jb3VudGVyLXZpZXdlcj5cclxuICA8L2Rpdj5cclxuXHJcblxyXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicmJiBxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZSlcIlxyXG4gICAgY2xhc3M9XCJzZWN0aW9uXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG4gICAgICA8cCBjbGFzcz1cInBhbmVsLWhlYWRpbmcgc2VjdGlvbi1sYWJlbFwiPnt7IHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsIH19PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIj5cclxuICAgICAgPGVuY291bnRlci12aWV3ZXIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZW5jb3VudGVyLXZpZXdlcj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8IS0tTGVhZiBDb250cm9scy0tPlxyXG4gIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDoxMHB4O1wiPlxyXG4gIDxmb3JtICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDBcIiBbZm9ybUdyb3VwXT1cInBhcmVudEdyb3VwXCI+XHJcbiAgICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUuY29udHJvbC52YWx1ZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uLWFuc3dlclwiPlxyXG4gICAgICA8bGFiZWwgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5sYWJlbFwiIFthdHRyLmZvcl09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIiBzdHlsZT1cImZvbnQtd2VpZ2h0OjQwMDtcIj5cclxuICAgICAgICAgIHt7IHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsIH19XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiY2hlY2tGb3JDb2xvbihyb290Tm9kZS5xdWVzdGlvbi5sYWJlbClcIj46PC9zcGFuPlxyXG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgZm9udC13ZWlnaHQ6Ym9sZDtcIj5cclxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZmlsZScgXCI+XHJcbiAgICAgICAgICAgIDxmaWxlLXByZXZpZXcgW2Zvcm1Db250cm9sTmFtZV09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtkYXRhU291cmNlXT1cImZpbGVEYXRhU291cmNlXCI+PC9maWxlLXByZXZpZXc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiPlxyXG4gICAgICAgICAgICA8cmVtb3RlLWFuc3dlciBbZm9ybUNvbnRyb2xOYW1lXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2RhdGFTb3VyY2VdPVwicmVtb3RlRGF0YVNvdXJjZVwiPjwvcmVtb3RlLWFuc3dlcj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0IHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj5cclxuICAgICAgICAgICAgICA8cXVlc3Rpb24tY29udHJvbCBbc2NoZW1hXT1cIl9zY2hlbWFcIiBbdmFsdWVdPVwicm9vdE5vZGUuY29udHJvbC52YWx1ZVwiIFtkYXRhU291cmNlXT1cImN1c3RvbURhdGFTb3VyY2VcIj48L3F1ZXN0aW9uLWNvbnRyb2w+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICBcclxuICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9mb3JtPlxyXG48L2Rpdj5cclxuXHJcbiAgPCEtLUFycmF5IENvbnRyb2xzLS0+XHJcbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAxICYmIHF1ZXN0aW9uc0Fuc3dlcmVkKHJvb3ROb2RlKVwiPlxyXG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ3JlcGVhdGluZycgXCI+XHJcbiAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGVcIj5cclxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXN0T3JkZXInXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD57e3Jvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsfX06PC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygcm9vdE5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxyXG4gICAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxyXG4gICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInb2JzR3JvdXAnXCI+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIHJvb3ROb2RlLmNoaWxkcmVuOyBsZXQgaT1pbmRleCBcIj5cclxuICAgICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cclxuICAgICAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiPjwvZW5jb3VudGVyLXZpZXdlcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAyXCI+XHJcblxyXG4gICAgPCEtLUdST1VQLS0+XHJcbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlIFwiPlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2dyb3VwJyBcIj5cclxuICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cclxuICAgICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cInJvb3ROb2RlLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdmaWVsZC1zZXQnIFwiPlxyXG4gICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxyXG4gICAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgPC9kaXY+XHJcbmAsXHJcbiAgICBzdHlsZXM6IFtgLnBhZ2UtbGFiZWx7Zm9udC1zaXplOjIwcHg7Zm9udC13ZWlnaHQ6NzAwfS5zZWN0aW9uLWxhYmVse2ZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OjUwMH0ucGFuZWwtcHJpbWFyeXtib3JkZXI6bm9uZSFpbXBvcnRhbnR9LnF1ZXN0aW9uLWFuc3dlcntmb250LXNpemU6MTZweH0ucGFuZWx7bWFyZ2luLWJvdHRvbTo1cHh9ZGl2LnNlY3Rpb257bWFyZ2luLWJvdHRvbToxNXB4IWltcG9ydGFudH0ubGluZS1icmVha2Vye3doaXRlLXNwYWNlOnByZS1saW5lfWhye21hcmdpbjoxMHB4fWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyByb290Tm9kZTogTm9kZUJhc2U7XHJcbiAgICBwdWJsaWMgZW5jOiBhbnk7XHJcbiAgICBwdWJsaWMgZmlsZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgICBwdWJsaWMgcmVtb3RlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICAgIHB1YmxpYyBjdXN0b21EYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gICAgcHVibGljIF9zY2hlbWE7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEVuY291bnRlclZpZXdlckNvbXBvbmVudDtcclxuICAgIEBJbnB1dCgpIHNldCBub2RlKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIHRoaXMucm9vdE5vZGUgPSByb290Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5jID0gZW5jO1xyXG4gICAgfVxyXG4gICAgIEBJbnB1dCgpIHNldCBmb3JtKGZvcm06IGFueSkge1xyXG4gICAgICAgICB0aGlzLnJvb3ROb2RlID0gZm9ybS5yb290Tm9kZTtcclxuICAgICAgICAgdGhpcy5fc2NoZW1hID0gZm9ybS5zY2hlbWE7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm9vdE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcclxuICAgICAgICAgICAgICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9vdE5vZGUgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5leHRyYXNcclxuICAgICAgICAgICAgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZURhdGFTb3VyY2UgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb290Tm9kZSAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhc1xyXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YVNvdXJjZSA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBxdWVzdGlvbnNBbnN3ZXJlZChub2RlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuICRhbnN3ZXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcXVlc3Rpb25BbnN3ZXJlZChub2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIGNvbnN0IGFuc3dlcmVkID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmhhc0Fuc3dlcihub2RlKTtcclxuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrRm9yQ29sb24ocXVlc3Rpb25MYWJlbDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uTGFiZWwuaW5kZXhPZignOicpID09PSAtMSkgeyByZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==