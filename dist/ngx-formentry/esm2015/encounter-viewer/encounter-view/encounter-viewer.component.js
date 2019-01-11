/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
export class EncounterViewerComponent {
    /**
     * @param {?} encounterViewerService
     * @param {?} dataSources
     */
    constructor(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    set node(rootNode) {
        this.rootNode = rootNode;
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    set schema(schema) {
        this._schema = schema;
    }
    /**
     * @param {?} enc
     * @return {?}
     */
    set encounter(enc) {
        this.enc = enc;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this.rootNode = form.rootNode;
        this._schema = form.schema;
        console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
    }
    /**
     * @param {?} pages
     * @return {?}
     */
    getQuestionNodes(pages) {
        /** @type {?} */
        const merged = [];
        /** @type {?} */
        const arrays = [];
        for (const page of pages) {
            arrays.push(page.page);
        }
        return merged.concat.apply([], arrays);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @param {?} node
     * @return {?}
     */
    questionsAnswered(node) {
        /** @type {?} */
        const $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    questionAnswered(node) {
        /** @type {?} */
        const answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    }
    /**
     * @param {?} questionLabel
     * @return {?}
     */
    checkForColon(questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    traverse(o, type) {
        /** @type {?} */
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                /** @type {?} */
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                /** @type {?} */
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                /** @type {?} */
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                /** @type {?} */
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                /** @type {?} */
                                const rep = this.repeatingGroup(o.children[key].children);
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
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    repeatingGroup(nodes) {
        /** @type {?} */
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }
}
EncounterViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-viewer',
                template: "<div class=\"viewer\">\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n          <div class=\"panel-body\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n  </div>\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n    class=\"section\">\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left:10px;\">\n  <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n    <div *ngIf=\"rootNode.control.value\">\n    <div class=\"question-answer\">\n      <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n          {{ rootNode.question.label }}\n      </label>\n      <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n      <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n          <div *ngSwitchCase=\" 'file' \">\n            <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n          </div>\n          <div *ngSwitchCase=\"'remote-select'\">\n            <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n          </div>\n          <div *ngSwitchDefault style=\"display:inline-block\">\n              <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n            </div>\n      </div>\n     \n    </div>\n    </div>\n  </form>\n</div>\n\n  <!--Array Controls-->\n  <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\" 'repeating' \">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{rootNode.question.label}}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n          \n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType \">\n      <div *ngSwitchCase=\" 'group' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\" 'field-set' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n    </div>\n  </div>\n\n\n\n  </div>\n",
                styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"]
            }] }
];
/** @nocollapse */
EncounterViewerComponent.ctorParameters = () => [
    { type: EncounterViewerService },
    { type: DataSources }
];
EncounterViewerComponent.propDecorators = {
    parentGroup: [{ type: Input }],
    parentComponent: [{ type: Input }],
    node: [{ type: Input }],
    schema: [{ type: Input }],
    encounter: [{ type: Input }],
    form: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLHlDQUF5QyxDQUFDO0FBR3hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFRekUsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7SUEwQmpDLFlBQW9CLHNCQUE4QyxFQUMvQyxXQUF3QjtRQUR2QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQy9DLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzNDLENBQUM7Ozs7O0lBbkJELElBQWEsSUFBSSxDQUFDLFFBQWtCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsSUFBb0IsTUFBTSxDQUFDLE1BQVc7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFvQixTQUFTLENBQUMsR0FBUTtRQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDOzs7OztJQUNBLElBQWEsSUFBSSxDQUFDLElBQVM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0s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QUNKO2lCQUNKO2FBQ0o7aUJBQUk7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7U0FFSjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLEtBQUs7O2NBQ1YsUUFBUSxHQUFHLEVBQUU7UUFDbkIsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqRjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7OztZQTNISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsbXZKQUFnRDs7YUFFbkQ7Ozs7WUFUUSxzQkFBc0I7WUFFdEIsV0FBVzs7OzBCQWVmLEtBQUs7OEJBQ0wsS0FBSzttQkFDTCxLQUFLO3FCQUlMLEtBQUs7d0JBSUwsS0FBSzttQkFHSixLQUFLOzs7O0lBbkJQLDRDQUEwQjs7SUFDMUIsdUNBQWdCOztJQUNoQixrREFBa0M7O0lBQ2xDLG9EQUFvQzs7SUFDcEMsb0RBQW9DOztJQUNwQywyQ0FBZTs7SUFDZiwrQ0FBMEM7O0lBQzFDLG1EQUEwRDs7Ozs7SUFrQjlDLDBEQUFzRDs7Ozs7SUFDdkQsK0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci12aWV3ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9lbmNvdW50ZXItdmlld2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9lbmNvdW50ZXItdmlld2VyLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgcm9vdE5vZGU6IE5vZGVCYXNlO1xuICAgIHB1YmxpYyBlbmM6IGFueTtcbiAgICBwdWJsaWMgZmlsZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgcHVibGljIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgcHVibGljIGN1c3RvbURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgcHVibGljIF9zY2hlbWE7XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudENvbXBvbmVudDogRW5jb3VudGVyVmlld2VyQ29tcG9uZW50O1xuICAgIEBJbnB1dCgpIHNldCBub2RlKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgICAgICB0aGlzLnJvb3ROb2RlID0gcm9vdE5vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHVibGljIHNldCBzY2hlbWEoc2NoZW1hOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYzogYW55KSB7XG4gICAgICAgIHRoaXMuZW5jID0gZW5jO1xuICAgIH1cbiAgICAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICB0aGlzLnJvb3ROb2RlID0gZm9ybS5yb290Tm9kZTtcbiAgICAgICAgIHRoaXMuX3NjaGVtYSA9IGZvcm0uc2NoZW1hO1xuICAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRRdWVzdGlvbk5vZGVzKHRoaXMudHJhdmVyc2UodGhpcy5yb290Tm9kZSkpKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVuY291bnRlclZpZXdlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcykge1xuICAgIH1cblxuICAgIFxuICAgIGdldFF1ZXN0aW9uTm9kZXMocGFnZXMpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VkID0gW107XG4gICAgICAgIGNvbnN0IGFycmF5cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgICAgICAgIGFycmF5cy5wdXNoKHBhZ2UucGFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lcmdlZC5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG4gICAgfVxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYodGhpcy5yb290Tm9kZSl7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yb290Tm9kZSAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhc1xuICAgICAgICAgICAgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVEYXRhU291cmNlID1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMucm9vdE5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb290Tm9kZSAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhc1xuICAgICAgICAgICAgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVtb3RlLXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhU291cmNlID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVzdGlvbnNBbnN3ZXJlZChub2RlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgJGFuc3dlcmVkID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGUpO1xuICAgICAgICByZXR1cm4gJGFuc3dlcmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBxdWVzdGlvbkFuc3dlcmVkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IGFuc3dlcmVkID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmhhc0Fuc3dlcihub2RlKTtcbiAgICAgICAgcmV0dXJuIGFuc3dlcmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGVja0ZvckNvbG9uKHF1ZXN0aW9uTGFiZWw6IHN0cmluZykge1xuICAgICAgICBpZiAocXVlc3Rpb25MYWJlbC5pbmRleE9mKCc6JykgPT09IC0xKSB7IHJldHVybiB0cnVlOyB9IGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG5cbiAgICB0cmF2ZXJzZShvLCB0eXBlPykge1xuICAgICAgICBjb25zdCBxdWVzdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5lZCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBwYWdlOiBwYWdlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBzZWN0aW9uOiBzZWN0aW9uIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IG5vZGU6IG8uY2hpbGRyZW5ba2V5XSwgcXVlc3Rpb246IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiBxcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVwID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuW2tleV0uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IG5vZGU6IG8uY2hpbGRyZW5ba2V5XSwgcXVlc3Rpb246IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiByZXAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uc29sZS5sb2cnLG8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICByZXBlYXRpbmdHcm91cChub2Rlcykge1xuICAgICAgICBjb25zdCB0b1JldHVybiA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiB0aGlzLnRyYXZlcnNlKG5vZGUpIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICB9XG5cbn1cbiJdfQ==