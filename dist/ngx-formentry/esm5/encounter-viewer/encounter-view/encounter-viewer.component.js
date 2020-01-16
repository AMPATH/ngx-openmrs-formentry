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
        var e_1, _a;
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
    };
    EncounterViewerComponent.prototype.ngOnInit = function () {
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
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
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
    EncounterViewerComponent.prototype.repeatingGroup = function (nodes) {
        var e_2, _a;
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
    };
    EncounterViewerComponent.ctorParameters = function () { return [
        { type: EncounterViewerService },
        { type: DataSources }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", AfeFormGroup)
    ], EncounterViewerComponent.prototype, "parentGroup", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", EncounterViewerComponent)
    ], EncounterViewerComponent.prototype, "parentComponent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", NodeBase),
        tslib_1.__metadata("design:paramtypes", [NodeBase])
    ], EncounterViewerComponent.prototype, "node", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], EncounterViewerComponent.prototype, "schema", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], EncounterViewerComponent.prototype, "encounter", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], EncounterViewerComponent.prototype, "form", null);
    EncounterViewerComponent = tslib_1.__decorate([
        Component({
            selector: 'encounter-viewer',
            template: "<div class=\"viewer\">\n\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n          <div class=\"panel-body\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n  </div>\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n    class=\"section\">\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left:10px;\">\n  <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n    <div *ngIf=\"rootNode.control.value\">\n    <div class=\"question-answer\">\n      <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n          {{ rootNode.question.label }}\n      </label>\n      <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n      <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n          <div *ngSwitchCase=\" 'file' \">\n            <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n          </div>\n          <div *ngSwitchCase=\"'remote-select'\">\n            <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n          </div>\n          <div *ngSwitchDefault style=\"display:inline-block\">\n              <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n            </div>\n      </div>\n     \n    </div>\n    </div>\n  </form>\n</div>\n\n  <!--Array Controls-->\n  <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\" 'repeating' \">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{rootNode.question.label}}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n          \n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType \">\n      <div *ngSwitchCase=\" 'group' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\" 'field-set' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n    </div>\n  </div>\n\n\n\n  </div>\n",
            styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [EncounterViewerService,
            DataSources])
    ], EncounterViewerComponent);
    return EncounterViewerComponent;
}());
export { EncounterViewerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0seUNBQXlDLENBQUM7QUFJeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUd6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU9yRTtJQTBCSSxrQ0FDWSxzQkFBOEMsRUFDOUMsV0FBd0I7UUFEeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFuQmhDLHNCQUFJLDBDQUFJO2FBQVIsVUFBUyxRQUFrQjtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVRLHNCQUFXLDRDQUFNO2FBQWpCLFVBQWtCLE1BQVc7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFUSxzQkFBVywrQ0FBUzthQUFwQixVQUFxQixHQUFRO1lBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBQ1Esc0JBQUksMENBQUk7YUFBUixVQUFTLElBQVM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxP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Z0Q7O1NBRW5ELENBQUM7aURBNEJzQyxzQkFBc0I7WUFDakMsV0FBVztPQTVCM0Isd0JBQXdCLENBdUhwQztJQUFELCtCQUFDO0NBQUEsQUF2SEQsSUF1SEM7U0F2SFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlbmNvdW50ZXItdmlld2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIHJvb3ROb2RlOiBOb2RlQmFzZTtcbiAgICBwdWJsaWMgZW5jOiBhbnk7XG4gICAgcHVibGljIGZpbGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIHB1YmxpYyByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIHB1YmxpYyBjdXN0b21EYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIHB1YmxpYyBfc2NoZW1hO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRHcm91cDogQWZlRm9ybUdyb3VwO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEVuY291bnRlclZpZXdlckNvbXBvbmVudDtcbiAgICBASW5wdXQoKSBzZXQgbm9kZShyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgdGhpcy5yb290Tm9kZSA9IHJvb3ROb2RlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XG4gICAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmM6IGFueSkge1xuICAgICAgICB0aGlzLmVuYyA9IGVuYztcbiAgICB9XG4gICAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgIHRoaXMucm9vdE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xuICAgICAgICB0aGlzLl9zY2hlbWEgPSBmb3JtLnNjaGVtYTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRRdWVzdGlvbk5vZGVzKHRoaXMudHJhdmVyc2UodGhpcy5yb290Tm9kZSkpKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcykgeyB9XG5cbiAgICBnZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICBjb25zdCBhcnJheXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICAgICAgICBhcnJheXMucHVzaChwYWdlLnBhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXJnZWQuY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xuICAgIH1cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvb3ROb2RlKSB7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yb290Tm9kZSAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhc1xuICAgICAgICAgICAgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZURhdGFTb3VyY2UgPVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMucm9vdE5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGFTb3VyY2UgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55KSB7XG4gICAgICAgIGNvbnN0ICRhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChub2RlKTtcbiAgICAgICAgcmV0dXJuICRhbnN3ZXJlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25BbnN3ZXJlZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5oYXNBbnN3ZXIobm9kZSk7XG4gICAgICAgIHJldHVybiBhbnN3ZXJlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tGb3JDb2xvbihxdWVzdGlvbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uTGFiZWwuaW5kZXhPZignOicpID09PSAtMSkgeyByZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuXG4gICAgdHJhdmVyc2UobywgdHlwZT8pIHtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zID0gW107XG4gICAgICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWQgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgcGFnZTogcGFnZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgc2VjdGlvbjogc2VjdGlvbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcmVwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uc29sZS5sb2cnLCBvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgcmVwZWF0aW5nR3JvdXAobm9kZXMpIHtcbiAgICAgICAgY29uc3QgdG9SZXR1cm4gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICB0b1JldHVybi5wdXNoKHsgcXVlc3Rpb246IG5vZGUucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogdGhpcy50cmF2ZXJzZShub2RlKSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgfVxuXG59XG4iXX0=