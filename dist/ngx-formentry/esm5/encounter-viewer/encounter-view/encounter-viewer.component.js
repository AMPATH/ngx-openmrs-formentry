/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
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
            console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} pages
     * @return {?}
     */
    EncounterViewerComponent.prototype.getQuestionNodes = /**
     * @param {?} pages
     * @return {?}
     */
    function (pages) {
        /** @type {?} */
        var merged = [];
        /** @type {?} */
        var arrays = [];
        try {
            for (var pages_1 = tslib_1.__values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                arrays.push(page.page);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return)) _a.call(pages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return merged.concat.apply([], arrays);
        var e_1, _a;
    };
    /**
     * @return {?}
     */
    EncounterViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.rootNode) {
        }
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
        /** @type {?} */
        var $answered = this.encounterViewerService.questionsAnswered(node);
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
        /** @type {?} */
        var answered = this.encounterViewerService.hasAnswer(node);
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
    /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    EncounterViewerComponent.prototype.traverse = /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    function (o, type) {
        /** @type {?} */
        var questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                /** @type {?} */
                var returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (var key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                /** @type {?} */
                                var page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                /** @type {?} */
                                var section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                /** @type {?} */
                                var qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                /** @type {?} */
                                var rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;
                        }
                    }
                }
            }
            else {
                console.log('Console.log', o);
            }
        }
        return questions;
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    EncounterViewerComponent.prototype.repeatingGroup = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        /** @type {?} */
        var toReturn = [];
        try {
            for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return toReturn;
        var e_2, _a;
    };
    EncounterViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-viewer',
                    template: "<div class=\"viewer\">\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n          <div class=\"panel-body\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n  </div>\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n    class=\"section\">\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left:10px;\">\n  <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n    <div *ngIf=\"rootNode.control.value\">\n    <div class=\"question-answer\">\n      <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n          {{ rootNode.question.label }}\n      </label>\n      <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n      <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n          <div *ngSwitchCase=\" 'file' \">\n            <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n          </div>\n          <div *ngSwitchCase=\"'remote-select'\">\n            <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n          </div>\n          <div *ngSwitchDefault style=\"display:inline-block\">\n              <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n            </div>\n      </div>\n     \n    </div>\n    </div>\n  </form>\n</div>\n\n  <!--Array Controls-->\n  <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\" 'repeating' \">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{rootNode.question.label}}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n          \n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType \">\n      <div *ngSwitchCase=\" 'group' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\" 'field-set' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n    </div>\n  </div>\n\n\n\n  </div>\n",
                    styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"],
                },] },
    ];
    EncounterViewerComponent.ctorParameters = function () { return [
        { type: EncounterViewerService },
        { type: DataSources }
    ]; };
    EncounterViewerComponent.propDecorators = {
        parentGroup: [{ type: Input }],
        parentComponent: [{ type: Input }],
        node: [{ type: Input }],
        schema: [{ type: Input }],
        encounter: [{ type: Input }],
        form: [{ type: Input }]
    };
    return EncounterViewerComponent;
}());
export { EncounterViewerComponent };
if (false) {
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
    /**
     * @type {?}
     * @private
     */
    EncounterViewerComponent.prototype.encounterViewerService;
    /**
     * @type {?}
     * @private
     */
    EncounterViewerComponent.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSx5Q0FBeUMsQ0FBQztBQUd4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBR3pFO0lBbUlJLGtDQUFvQixzQkFBOEMsRUFDL0MsV0FBd0I7UUFEdkIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUMzQyxDQUFDO0lBbkJELHNCQUFhLDBDQUFJOzs7OztRQUFqQixVQUFrQixRQUFrQjtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFvQiw0Q0FBTTs7Ozs7UUFBMUIsVUFBMkIsTUFBVztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVELHNCQUFvQiwrQ0FBUzs7Ozs7UUFBN0IsVUFBOEIsR0FBUTtZQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUNBLHNCQUFhLDBDQUFJOzs7OztRQUFqQixVQUFrQixJQUFTO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5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Ozs7Ozs7O1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7SUFDcEIsQ0FBQzs7Z0JBL05KLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUseXVKQW9HYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxvUkFBb1IsQ0FBQztpQkFDalM7OztnQkE3R1Esc0JBQXNCO2dCQUV0QixXQUFXOzs7OEJBbUhmLEtBQUs7a0NBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUlMLEtBQUs7NEJBSUwsS0FBSzt1QkFHSixLQUFLOztJQW9HWCwrQkFBQztDQUFBLEFBak9ELElBaU9DO1NBeEhZLHdCQUF3Qjs7O0lBQ2pDLDRDQUEwQjs7SUFDMUIsdUNBQWdCOztJQUNoQixrREFBa0M7O0lBQ2xDLG9EQUFvQzs7SUFDcEMsb0RBQW9DOztJQUNwQywyQ0FBZTs7SUFDZiwrQ0FBMEM7O0lBQzFDLG1EQUEwRDs7Ozs7SUFrQjlDLDBEQUFzRDs7Ozs7SUFDdkQsK0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci12aWV3ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpZXdlclwiPlxuXG5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJ1wiIGNsYXNzPVwiZm9ybVwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldKVwiPlxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cIidwYWdlJytpXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwYWdlLWxhYmVsIHBhbmVsLWhlYWRpbmcgdGV4dC1wcmltYXJ5XCI+e3txdWVzdGlvbi5sYWJlbH19PC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCIgW3NjaGVtYV09XCJfc2NoZW1hXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW3BhcmVudEdyb3VwXT1cInJvb3ROb2RlLmNvbnRyb2xcIj48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZSdcIiBjbGFzcz1cInBhZ2VcIj5cbiAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICBbc2NoZW1hXT1cIl9zY2hlbWFcIiBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIj48L2VuY291bnRlci12aWV3ZXI+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJyYmIHF1ZXN0aW9uc0Fuc3dlcmVkKHJvb3ROb2RlKVwiXG4gICAgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cbiAgICAgIDxwIGNsYXNzPVwicGFuZWwtaGVhZGluZyBzZWN0aW9uLWxhYmVsXCI+e3sgcm9vdE5vZGUucXVlc3Rpb24ubGFiZWwgfX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCI+XG4gICAgICA8ZW5jb3VudGVyLXZpZXdlciBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW3NjaGVtYV09XCJfc2NoZW1hXCIgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8IS0tTGVhZiBDb250cm9scy0tPlxuICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6MTBweDtcIj5cbiAgPGZvcm0gKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIj5cbiAgICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUuY29udHJvbC52YWx1ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1hbnN3ZXJcIj5cbiAgICAgIDxsYWJlbCAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsXCIgW2F0dHIuZm9yXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6NDAwO1wiPlxuICAgICAgICAgIHt7IHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsIH19XG4gICAgICA8L2xhYmVsPlxuICAgICAgPHNwYW4gKm5nSWY9XCJjaGVja0ZvckNvbG9uKHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsKVwiPjo8L3NwYW4+XG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgZm9udC13ZWlnaHQ6Ym9sZDtcIj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2ZpbGUnIFwiPlxuICAgICAgICAgICAgPGZpbGUtcHJldmlldyBbZm9ybUNvbnRyb2xOYW1lXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2RhdGFTb3VyY2VdPVwiZmlsZURhdGFTb3VyY2VcIj48L2ZpbGUtcHJldmlldz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIj5cbiAgICAgICAgICAgIDxyZW1vdGUtYW5zd2VyIFtmb3JtQ29udHJvbE5hbWVdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZGF0YVNvdXJjZV09XCJyZW1vdGVEYXRhU291cmNlXCI+PC9yZW1vdGUtYW5zd2VyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdCBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICAgIDxxdWVzdGlvbi1jb250cm9sIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFt2YWx1ZV09XCJyb290Tm9kZS5jb250cm9sLnZhbHVlXCIgW2RhdGFTb3VyY2VdPVwiY3VzdG9tRGF0YVNvdXJjZVwiPjwvcXVlc3Rpb24tY29udHJvbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgIFxuICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Zvcm0+XG48L2Rpdj5cblxuICA8IS0tQXJyYXkgQ29udHJvbHMtLT5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAxICYmIHF1ZXN0aW9uc0Fuc3dlcmVkKHJvb3ROb2RlKVwiPlxuICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAncmVwZWF0aW5nJyBcIj5cbiAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGVcIj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGVzdE9yZGVyJ1wiPlxuICAgICAgICAgICAgPGxhYmVsPnt7cm9vdE5vZGUucXVlc3Rpb24ubGFiZWx9fTo8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygcm9vdE5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInb2JzR3JvdXAnXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiByb290Tm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDJcIj5cblxuICAgIDwhLS1HUk9VUC0tPlxuICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2dyb3VwJyBcIj5cbiAgICAgICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZmllbGQtc2V0JyBcIj5cbiAgICAgICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cblxuXG4gIDwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLnBhZ2UtbGFiZWx7Zm9udC1zaXplOjIwcHg7Zm9udC13ZWlnaHQ6NzAwfS5zZWN0aW9uLWxhYmVse2ZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OjUwMH0ucGFuZWwtcHJpbWFyeXtib3JkZXI6bm9uZSFpbXBvcnRhbnR9LnF1ZXN0aW9uLWFuc3dlcntmb250LXNpemU6MTZweH0ucGFuZWx7bWFyZ2luLWJvdHRvbTo1cHh9ZGl2LnNlY3Rpb257bWFyZ2luLWJvdHRvbToxNXB4IWltcG9ydGFudH0ubGluZS1icmVha2Vye3doaXRlLXNwYWNlOnByZS1saW5lfWhye21hcmdpbjoxMHB4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyByb290Tm9kZTogTm9kZUJhc2U7XG4gICAgcHVibGljIGVuYzogYW55O1xuICAgIHB1YmxpYyBmaWxlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBwdWJsaWMgcmVtb3RlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBwdWJsaWMgY3VzdG9tRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBwdWJsaWMgX3NjaGVtYTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFyZW50Q29tcG9uZW50OiBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQ7XG4gICAgQElucHV0KCkgc2V0IG5vZGUocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIHRoaXMucm9vdE5vZGUgPSByb290Tm9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xuICAgICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jOiBhbnkpIHtcbiAgICAgICAgdGhpcy5lbmMgPSBlbmM7XG4gICAgfVxuICAgICBASW5wdXQoKSBzZXQgZm9ybShmb3JtOiBhbnkpIHtcbiAgICAgICAgIHRoaXMucm9vdE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xuICAgICAgICAgdGhpcy5fc2NoZW1hID0gZm9ybS5zY2hlbWE7XG4gICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldFF1ZXN0aW9uTm9kZXModGhpcy50cmF2ZXJzZSh0aGlzLnJvb3ROb2RlKSkpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICAgICAgICAgICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzKSB7XG4gICAgfVxuXG4gICAgXG4gICAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgY29uc3QgYXJyYXlzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgICAgICAgYXJyYXlzLnB1c2gocGFnZS5wYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgICB9XG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZih0aGlzLnJvb3ROb2RlKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZURhdGFTb3VyY2UgPVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGFTb3VyY2UgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSkge1xuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQobm9kZSk7XG4gICAgICAgIHJldHVybiAkYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uQW5zd2VyZWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3QgYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuaGFzQW5zd2VyKG5vZGUpO1xuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrRm9yQ29sb24ocXVlc3Rpb25MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbkxhYmVsLmluZGV4T2YoJzonKSA9PT0gLTEpIHsgcmV0dXJuIHRydWU7IH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKG8sIHR5cGU/KSB7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoby5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHBhZ2U6IHBhZ2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHNlY3Rpb246IHNlY3Rpb24gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHFzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXAgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW5ba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHJlcCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25zb2xlLmxvZycsbyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlc3Rpb25zO1xuICAgIH1cblxuICAgIHJlcGVhdGluZ0dyb3VwKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IHRvUmV0dXJuID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgdG9SZXR1cm4ucHVzaCh7IHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHRoaXMudHJhdmVyc2Uobm9kZSkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cblxufVxuIl19