import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
import { EncounterViewerService } from '../encounter-viewer.service';
var EncounterViewerComponent = /** @class */ (function () {
    function EncounterViewerComponent(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
    }
    Object.defineProperty(EncounterViewerComponent.prototype, "node", {
        set: function (rootNode) {
            this.rootNode = rootNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "encounter", {
        set: function (enc) {
            this.enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "form", {
        set: function (form) {
            this.rootNode = form.rootNode;
            this._schema = form.schema;
            console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
        },
        enumerable: true,
        configurable: true
    });
    EncounterViewerComponent.prototype.getQuestionNodes = function (pages) {
        var merged = [];
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
    EncounterViewerComponent.prototype.ngOnInit = function () {
        if (this.rootNode) {
        }
        if (this.rootNode &&
            this.rootNode.question.extras &&
            this.rootNode.question.renderingType === 'file') {
            this.fileDataSource = this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else if (this.rootNode &&
            this.rootNode.question.extras &&
            this.rootNode.question.renderingType === 'remote-select') {
            this.remoteDataSource = this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else {
            this.customDataSource = this.encounterViewerService;
        }
    };
    EncounterViewerComponent.prototype.questionsAnswered = function (node) {
        var $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    };
    EncounterViewerComponent.prototype.questionAnswered = function (node) {
        var answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    };
    EncounterViewerComponent.prototype.checkForColon = function (questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerComponent.prototype.traverse = function (o, type) {
        var questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                var returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (var key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                var page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                var section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                var qs = this.traverse(o.children[key]);
                                questions.push({
                                    node: o.children[key],
                                    question: o.children[key].question,
                                    groupMembers: qs
                                });
                                break;
                            case 'repeating':
                                var rep = this.repeatingGroup(o.children[key].children);
                                questions.push({
                                    node: o.children[key],
                                    question: o.children[key].question,
                                    groupMembers: rep
                                });
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
    EncounterViewerComponent.prototype.repeatingGroup = function (nodes) {
        var toReturn = [];
        try {
            for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                toReturn.push({
                    question: node.question,
                    groupMembers: this.traverse(node)
                });
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
                    template: "<div class=\"viewer\">\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page' + i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">\n            {{ question.label }}\n          </p>\n          <div class=\"panel-body\">\n            <encounter-viewer\n              [node]=\"rootNode.children[question.key]\"\n              [schema]=\"_schema\"\n              [parentComponent]=\"this\"\n              [parentGroup]=\"rootNode.control\"\n            ></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer\n      *ngFor=\"let question of rootNode.question.questions\"\n      [parentComponent]=\"this\"\n      [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\"\n      [parentGroup]=\"parentGroup\"\n    ></encounter-viewer>\n  </div>\n\n  <div\n    *ngIf=\"\n      rootNode.question.renderingType === 'section' &&\n      questionsAnswered(rootNode)\n    \"\n    class=\"section\"\n  >\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer\n        [node]=\"rootNode.children[question.key]\"\n        [parentComponent]=\"this\"\n        [schema]=\"_schema\"\n        [parentGroup]=\"parentGroup\"\n      ></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left: 10px\">\n    <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n      <div *ngIf=\"rootNode.control.value\">\n        <div class=\"question-answer\">\n          <label\n            *ngIf=\"rootNode.question.label\"\n            [attr.for]=\"rootNode.question.key\"\n            style=\"font-weight: 400\"\n          >\n            {{ rootNode.question.label }}\n          </label>\n          <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n          <div\n            [ngSwitch]=\"rootNode.question.renderingType\"\n            style=\"display: inline-block; font-weight: bold\"\n          >\n            <div *ngSwitchCase=\"'file'\">\n              <file-preview\n                [formControlName]=\"rootNode.question.key\"\n                [id]=\"rootNode.question.key + 'id'\"\n                [dataSource]=\"fileDataSource\"\n              ></file-preview>\n            </div>\n            <div *ngSwitchCase=\"'remote-select'\">\n              <remote-answer\n                [formControlName]=\"rootNode.question.key\"\n                [id]=\"rootNode.question.key + 'id'\"\n                [dataSource]=\"remoteDataSource\"\n              ></remote-answer>\n            </div>\n            <div *ngSwitchDefault style=\"display: inline-block\">\n              <question-control\n                [schema]=\"_schema\"\n                [value]=\"rootNode.control.value\"\n                [dataSource]=\"customDataSource\"\n              ></question-control>\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <!--Array Controls-->\n  <div\n    *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\"\n  >\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\"'repeating'\">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{ rootNode.question.label }}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i = index\">\n              <encounter-viewer\n                *ngFor=\"let question of child.question.questions\"\n                [parentComponent]=\"this\"\n                [node]=\"child.children[question.key]\"\n                [parentGroup]=\"child.control\"\n                [schema]=\"_schema\"\n              ></encounter-viewer>\n            </div>\n          </div>\n\n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i = index\">\n              <encounter-viewer\n                *ngFor=\"let question of child.question.questions\"\n                [parentComponent]=\"this\"\n                [node]=\"child.children[question.key]\"\n                [parentGroup]=\"child.control\"\n                [schema]=\"_schema\"\n              ></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\"'group'\">\n        <encounter-viewer\n          *ngFor=\"let question of rootNode.question.questions\"\n          [parentComponent]=\"this\"\n          [node]=\"rootNode.children[question.key]\"\n          [parentGroup]=\"rootNode.control\"\n          [schema]=\"_schema\"\n        ></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\"'field-set'\">\n        <encounter-viewer\n          *ngFor=\"let question of rootNode.question.questions\"\n          [parentComponent]=\"this\"\n          [node]=\"rootNode.children[question.key]\"\n          [parentGroup]=\"rootNode.control\"\n          [schema]=\"_schema\"\n        ></encounter-viewer>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"]
                },] },
    ];
    /** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFDTCxRQUFRLEVBR1QsTUFBTSx5Q0FBeUMsQ0FBQztBQUlqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBR3pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXJFO0lBMExFLGtDQUNVLHNCQUE4QyxFQUM5QyxXQUF3QjtRQUR4QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQy9CLENBQUM7SUFwQkosc0JBQWEsMENBQUk7YUFBakIsVUFBa0IsUUFBa0I7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBb0IsNENBQU07YUFBMUIsVUFBMkIsTUFBVztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFvQiwrQ0FBUzthQUE3QixVQUE4QixHQUFRO1lBQ3BDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQWEsMENBQUk7YUFBakIsVUFBa0IsSUFBUztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxD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LEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQ2xDLENBQUMsQ0FBQzthQUNKOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDOztJQUNsQixDQUFDOztnQkExU0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxrL0tBMkpYO29CQUNDLE1BQU0sRUFBRSxDQUFDLG9SQUFvUixDQUFDO2lCQUMvUjs7OztnQkFqS1Esc0JBQXNCO2dCQUh0QixXQUFXOzs7OEJBNEtqQixLQUFLO2tDQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFJTCxLQUFLOzRCQUlMLEtBQUs7dUJBR0wsS0FBSzs7SUF1SFIsK0JBQUM7Q0FBQSxBQTNTRCxJQTJTQztTQTNJWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTm9kZUJhc2UsXG4gIEdyb3VwTm9kZSxcbiAgTGVhZk5vZGVcbn0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW5jb3VudGVyLXZpZXdlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpZXdlclwiPlxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nXCIgY2xhc3M9XCJmb3JtXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwicXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XSlcIj5cbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCIncGFnZScgKyBpXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwYWdlLWxhYmVsIHBhbmVsLWhlYWRpbmcgdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICB7eyBxdWVzdGlvbi5sYWJlbCB9fVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXJcbiAgICAgICAgICAgICAgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgICAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiXG4gICAgICAgICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgICAgICAgIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sXCJcbiAgICAgICAgICAgID48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZSdcIiBjbGFzcz1cInBhZ2VcIj5cbiAgICA8ZW5jb3VudGVyLXZpZXdlclxuICAgICAgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIlxuICAgICAgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICBbc2NoZW1hXT1cIl9zY2hlbWFcIlxuICAgICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCJcbiAgICA+PC9lbmNvdW50ZXItdmlld2VyPlxuICA8L2Rpdj5cblxuICA8ZGl2XG4gICAgKm5nSWY9XCJcbiAgICAgIHJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJyAmJlxuICAgICAgcXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUpXG4gICAgXCJcbiAgICBjbGFzcz1cInNlY3Rpb25cIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cbiAgICAgIDxwIGNsYXNzPVwicGFuZWwtaGVhZGluZyBzZWN0aW9uLWxhYmVsXCI+e3sgcm9vdE5vZGUucXVlc3Rpb24ubGFiZWwgfX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCI+XG4gICAgICA8ZW5jb3VudGVyLXZpZXdlclxuICAgICAgICBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCJcbiAgICAgID48L2VuY291bnRlci12aWV3ZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDwhLS1MZWFmIENvbnRyb2xzLS0+XG4gIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDogMTBweFwiPlxuICAgIDxmb3JtICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDBcIiBbZm9ybUdyb3VwXT1cInBhcmVudEdyb3VwXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUuY29udHJvbC52YWx1ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24tYW5zd2VyXCI+XG4gICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgIFthdHRyLmZvcl09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICAgICAgc3R5bGU9XCJmb250LXdlaWdodDogNDAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyByb290Tm9kZS5xdWVzdGlvbi5sYWJlbCB9fVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaGVja0ZvckNvbG9uKHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsKVwiPjo8L3NwYW4+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIlxuICAgICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtd2VpZ2h0OiBib2xkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZmlsZSdcIj5cbiAgICAgICAgICAgICAgPGZpbGUtcHJldmlld1xuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgICAgICAgICBbaWRdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICAgICAgICAgICAgW2RhdGFTb3VyY2VdPVwiZmlsZURhdGFTb3VyY2VcIlxuICAgICAgICAgICAgICA+PC9maWxlLXByZXZpZXc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiPlxuICAgICAgICAgICAgICA8cmVtb3RlLWFuc3dlclxuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgICAgICAgICBbaWRdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICAgICAgICAgICAgW2RhdGFTb3VyY2VdPVwicmVtb3RlRGF0YVNvdXJjZVwiXG4gICAgICAgICAgICAgID48L3JlbW90ZS1hbnN3ZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdCBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9ja1wiPlxuICAgICAgICAgICAgICA8cXVlc3Rpb24tY29udHJvbFxuICAgICAgICAgICAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cInJvb3ROb2RlLmNvbnRyb2wudmFsdWVcIlxuICAgICAgICAgICAgICAgIFtkYXRhU291cmNlXT1cImN1c3RvbURhdGFTb3VyY2VcIlxuICAgICAgICAgICAgICA+PC9xdWVzdGlvbi1jb250cm9sPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cblxuICA8IS0tQXJyYXkgQ29udHJvbHMtLT5cbiAgPGRpdlxuICAgICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDEgJiYgcXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUpXCJcbiAgPlxuICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyZXBlYXRpbmcnXCI+XG4gICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlXCI+XG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Rlc3RPcmRlcidcIj5cbiAgICAgICAgICAgIDxsYWJlbD57eyByb290Tm9kZS5xdWVzdGlvbi5sYWJlbCB9fTo8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygcm9vdE5vZGUuY2hpbGRyZW47IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zXCJcbiAgICAgICAgICAgICAgICBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIlxuICAgICAgICAgICAgICAgIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgICAgICAgICAgICAgIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sXCJcbiAgICAgICAgICAgICAgICBbc2NoZW1hXT1cIl9zY2hlbWFcIlxuICAgICAgICAgICAgICA+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInb2JzR3JvdXAnXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiByb290Tm9kZS5jaGlsZHJlbjsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgICAgICAgICAgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgICAgICAgICAgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiXG4gICAgICAgICAgICAgID48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAyXCI+XG4gICAgPCEtLUdST1VQLS0+XG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2dyb3VwJ1wiPlxuICAgICAgICA8ZW5jb3VudGVyLXZpZXdlclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIlxuICAgICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgICAgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgICAgW3BhcmVudEdyb3VwXT1cInJvb3ROb2RlLmNvbnRyb2xcIlxuICAgICAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiXG4gICAgICAgID48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidmaWVsZC1zZXQnXCI+XG4gICAgICAgIDxlbmNvdW50ZXItdmlld2VyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgICBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgICBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbFwiXG4gICAgICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCJcbiAgICAgICAgPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLWxhYmVse2ZvbnQtc2l6ZToyMHB4O2ZvbnQtd2VpZ2h0OjcwMH0uc2VjdGlvbi1sYWJlbHtmb250LXNpemU6MThweDtmb250LXdlaWdodDo1MDB9LnBhbmVsLXByaW1hcnl7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS5xdWVzdGlvbi1hbnN3ZXJ7Zm9udC1zaXplOjE2cHh9LnBhbmVse21hcmdpbi1ib3R0b206NXB4fWRpdi5zZWN0aW9ue21hcmdpbi1ib3R0b206MTVweCFpbXBvcnRhbnR9LmxpbmUtYnJlYWtlcnt3aGl0ZS1zcGFjZTpwcmUtbGluZX1ocnttYXJnaW46MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgcm9vdE5vZGU6IE5vZGVCYXNlO1xuICBwdWJsaWMgZW5jOiBhbnk7XG4gIHB1YmxpYyBmaWxlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBjdXN0b21EYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgX3NjaGVtYTtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEVuY291bnRlclZpZXdlckNvbXBvbmVudDtcbiAgQElucHV0KCkgc2V0IG5vZGUocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgdGhpcy5yb290Tm9kZSA9IHJvb3ROb2RlO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHNldCBzY2hlbWEoc2NoZW1hOiBhbnkpIHtcbiAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmM6IGFueSkge1xuICAgIHRoaXMuZW5jID0gZW5jO1xuICB9XG4gIEBJbnB1dCgpIHNldCBmb3JtKGZvcm06IGFueSkge1xuICAgIHRoaXMucm9vdE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xuICAgIHRoaXMuX3NjaGVtYSA9IGZvcm0uc2NoZW1hO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0UXVlc3Rpb25Ob2Rlcyh0aGlzLnRyYXZlcnNlKHRoaXMucm9vdE5vZGUpKSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVuY291bnRlclZpZXdlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXNcbiAgKSB7fVxuXG4gIGdldFF1ZXN0aW9uTm9kZXMocGFnZXMpIHtcbiAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICBjb25zdCBhcnJheXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgIGFycmF5cy5wdXNoKHBhZ2UucGFnZSk7XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWQuY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xuICB9XG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5yb290Tm9kZSkge1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLnJvb3ROb2RlICYmXG4gICAgICB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZSdcbiAgICApIHtcbiAgICAgIHRoaXMuZmlsZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW1xuICAgICAgICB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucm9vdE5vZGUgJiZcbiAgICAgIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0J1xuICAgICkge1xuICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tcbiAgICAgICAgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1c3RvbURhdGFTb3VyY2UgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSkge1xuICAgIGNvbnN0ICRhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChub2RlKTtcbiAgICByZXR1cm4gJGFuc3dlcmVkO1xuICB9XG5cbiAgcHVibGljIHF1ZXN0aW9uQW5zd2VyZWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5oYXNBbnN3ZXIobm9kZSk7XG4gICAgcmV0dXJuIGFuc3dlcmVkO1xuICB9XG5cbiAgcHVibGljIGNoZWNrRm9yQ29sb24ocXVlc3Rpb25MYWJlbDogc3RyaW5nKSB7XG4gICAgaWYgKHF1ZXN0aW9uTGFiZWwuaW5kZXhPZignOicpID09PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0cmF2ZXJzZShvLCB0eXBlPykge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgfVxuICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgIGlmIChvLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHBhZ2U6IHBhZ2UgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBzZWN0aW9uOiBzZWN0aW9uIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgbm9kZTogby5jaGlsZHJlbltrZXldLFxuICAgICAgICAgICAgICAgICAgcXVlc3Rpb246IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbixcbiAgICAgICAgICAgICAgICAgIGdyb3VwTWVtYmVyczogcXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICAgICAgICBjb25zdCByZXAgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW5ba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgbm9kZTogby5jaGlsZHJlbltrZXldLFxuICAgICAgICAgICAgICAgICAgcXVlc3Rpb246IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbixcbiAgICAgICAgICAgICAgICAgIGdyb3VwTWVtYmVyczogcmVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25zb2xlLmxvZycsIG8pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgcmVwZWF0aW5nR3JvdXAobm9kZXMpIHtcbiAgICBjb25zdCB0b1JldHVybiA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgdG9SZXR1cm4ucHVzaCh7XG4gICAgICAgIHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLFxuICAgICAgICBncm91cE1lbWJlcnM6IHRoaXMudHJhdmVyc2Uobm9kZSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdG9SZXR1cm47XG4gIH1cbn1cbiJdfQ==