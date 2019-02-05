/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
import { EncounterViewerService } from '../encounter-viewer.service';
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
        // console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
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
                // console.log('Console.log',o);
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
                template: `<div class="viewer">

  <div *ngIf="rootNode.question.renderingType === 'form'" class="form">
    <div *ngFor="let question of rootNode.question.questions; let i = index;">
      <div *ngIf="questionsAnswered(rootNode.children[question.key])">
        <div [attr.id]="'page'+i" class="panel panel-default">
          <p class="page-label panel-heading text-primary">{{question.label}}</p>
          <div class="panel-body">
            <encounter-viewer [node]="rootNode.children[question.key]" [schema]="_schema" [parentComponent]="this" [parentGroup]="rootNode.control"></encounter-viewer>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="rootNode.question.renderingType === 'page'" class="page">
    <encounter-viewer *ngFor="let question of rootNode.question.questions" [parentComponent]="this" [node]="rootNode.children[question.key]"
      [schema]="_schema" [parentGroup]="parentGroup"></encounter-viewer>
  </div>


  <div *ngIf="rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)"
    class="section">
    <div class="panel panel-primary">
      <p class="panel-heading section-label">{{ rootNode.question.label }}</p>
    </div>
    <div *ngFor="let question of rootNode.question.questions">
      <encounter-viewer [node]="rootNode.children[question.key]" [parentComponent]="this" [schema]="_schema" [parentGroup]="parentGroup"></encounter-viewer>
    </div>
  </div>

  <!--Leaf Controls-->
  <div style="margin-left:10px;">
  <form *ngIf="rootNode.question.controlType === 0" [formGroup]="parentGroup">
    <div *ngIf="rootNode.control.value">
    <div class="question-answer">
      <label *ngIf="rootNode.question.label" [attr.for]="rootNode.question.key" style="font-weight:400;">
          {{ rootNode.question.label }}
      </label>
      <span *ngIf="checkForColon(rootNode.question.label)">:</span>
      <div [ngSwitch]="rootNode.question.renderingType" style="display:inline-block; font-weight:bold;">
          <div *ngSwitchCase=" 'file' ">
            <file-preview [formControlName]="rootNode.question.key" [id]="rootNode.question.key + 'id'" [dataSource]="fileDataSource"></file-preview>
          </div>
          <div *ngSwitchCase="'remote-select'">
            <remote-answer [formControlName]="rootNode.question.key" [id]="rootNode.question.key + 'id'" [dataSource]="remoteDataSource"></remote-answer>
          </div>
          <div *ngSwitchDefault style="display:inline-block">
              <question-control [schema]="_schema" [value]="rootNode.control.value" [dataSource]="customDataSource"></question-control>
            </div>
      </div>
     
    </div>
    </div>
  </form>
</div>

  <!--Array Controls-->
  <div *ngIf="rootNode.question.controlType === 1 && questionsAnswered(rootNode)">
    <div [ngSwitch]="rootNode.question.renderingType">
      <div *ngSwitchCase=" 'repeating' ">
        <div [ngSwitch]="rootNode.question.extras.type">
          <div *ngSwitchCase="'testOrder'">
            <label>{{rootNode.question.label}}:</label>
            <div *ngFor="let child of rootNode.children; let i=index ">
              <encounter-viewer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
                " [parentGroup]="child.control " [schema]="_schema"></encounter-viewer>
            </div>
          </div>
          
          <div *ngSwitchCase="'obsGroup'">
            <div *ngFor="let child of rootNode.children; let i=index ">
              <encounter-viewer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
                " [parentGroup]="child.control " [schema]="_schema"></encounter-viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="rootNode.question.controlType === 2">

    <!--GROUP-->
    <div [ngSwitch]="rootNode.question.renderingType ">
      <div *ngSwitchCase=" 'group' ">
        <encounter-viewer *ngFor="let question of rootNode.question.questions " [parentComponent]="this" [node]="rootNode.children[question.key]
                  " [parentGroup]="rootNode.control " [schema]="_schema"></encounter-viewer>
      </div>
      <div *ngSwitchCase=" 'field-set' ">
        <encounter-viewer *ngFor="let question of rootNode.question.questions " [parentComponent]="this" [node]="rootNode.children[question.key]
                  " [parentGroup]="rootNode.control " [schema]="_schema"></encounter-viewer>
      </div>
    </div>
  </div>



  </div>
`,
                styles: [`.page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}`],
            },] },
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLHlDQUF5QyxDQUFDO0FBSXhGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUEwR3JFLE1BQU07Ozs7O0lBMEJGLFlBQ1ksc0JBQThDLEVBQzlDLFdBQXdCO1FBRHhCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDOzs7OztJQW5CeEMsSUFBYSxJQUFJLENBQUMsUUFBa0I7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxJQUFvQixNQUFNLENBQUMsTUFBVztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELElBQW9CLFNBQVMsQ0FBQyxHQUFRO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0EsSUFBYSxJQUFJLENBQUMsSUFBUztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLG9F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QUFLO3FCQUlMLEtBQUs7d0JBSUwsS0FBSzttQkFHSixLQUFLOzs7O0lBbkJQLDRDQUEwQjs7SUFDMUIsdUNBQWdCOztJQUNoQixrREFBa0M7O0lBQ2xDLG9EQUFvQzs7SUFDcEMsb0RBQW9DOztJQUNwQywyQ0FBZTs7SUFDZiwrQ0FBMEM7O0lBQzFDLG1EQUEwRDs7Ozs7SUFtQnRELDBEQUFzRDs7Ozs7SUFDdEQsK0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlbmNvdW50ZXItdmlld2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWV3ZXJcIj5cblxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nXCIgY2xhc3M9XCJmb3JtXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgPGRpdiAqbmdJZj1cInF1ZXN0aW9uc0Fuc3dlcmVkKHJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0pXCI+XG4gICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiJ3BhZ2UnK2lcIiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInBhZ2UtbGFiZWwgcGFuZWwtaGVhZGluZyB0ZXh0LXByaW1hcnlcIj57e3F1ZXN0aW9uLmxhYmVsfX08L3A+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIiBbc2NoZW1hXT1cIl9zY2hlbWFcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbFwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJ1wiIGNsYXNzPVwicGFnZVwiPlxuICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgPC9kaXY+XG5cblxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nJiYgcXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUpXCJcbiAgICBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuICAgICAgPHAgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIHNlY3Rpb24tbGFiZWxcIj57eyByb290Tm9kZS5xdWVzdGlvbi5sYWJlbCB9fTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIj5cbiAgICAgIDxlbmNvdW50ZXItdmlld2VyIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIiBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIj48L2VuY291bnRlci12aWV3ZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDwhLS1MZWFmIENvbnRyb2xzLS0+XG4gIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDoxMHB4O1wiPlxuICA8Zm9ybSAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAwXCIgW2Zvcm1Hcm91cF09XCJwYXJlbnRHcm91cFwiPlxuICAgIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5jb250cm9sLnZhbHVlXCI+XG4gICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uLWFuc3dlclwiPlxuICAgICAgPGxhYmVsICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ubGFiZWxcIiBbYXR0ci5mb3JdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5XCIgc3R5bGU9XCJmb250LXdlaWdodDo0MDA7XCI+XG4gICAgICAgICAge3sgcm9vdE5vZGUucXVlc3Rpb24ubGFiZWwgfX1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8c3BhbiAqbmdJZj1cImNoZWNrRm9yQ29sb24ocm9vdE5vZGUucXVlc3Rpb24ubGFiZWwpXCI+Ojwvc3Bhbj5cbiAgICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyBmb250LXdlaWdodDpib2xkO1wiPlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZmlsZScgXCI+XG4gICAgICAgICAgICA8ZmlsZS1wcmV2aWV3IFtmb3JtQ29udHJvbE5hbWVdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZGF0YVNvdXJjZV09XCJmaWxlRGF0YVNvdXJjZVwiPjwvZmlsZS1wcmV2aWV3PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiPlxuICAgICAgICAgICAgPHJlbW90ZS1hbnN3ZXIgW2Zvcm1Db250cm9sTmFtZV09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtkYXRhU291cmNlXT1cInJlbW90ZURhdGFTb3VyY2VcIj48L3JlbW90ZS1hbnN3ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0IHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj5cbiAgICAgICAgICAgICAgPHF1ZXN0aW9uLWNvbnRyb2wgW3NjaGVtYV09XCJfc2NoZW1hXCIgW3ZhbHVlXT1cInJvb3ROb2RlLmNvbnRyb2wudmFsdWVcIiBbZGF0YVNvdXJjZV09XCJjdXN0b21EYXRhU291cmNlXCI+PC9xdWVzdGlvbi1jb250cm9sPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgXG4gICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZm9ybT5cbjwvZGl2PlxuXG4gIDwhLS1BcnJheSBDb250cm9scy0tPlxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDEgJiYgcXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUpXCI+XG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdyZXBlYXRpbmcnIFwiPlxuICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZVwiPlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXN0T3JkZXInXCI+XG4gICAgICAgICAgICA8bGFiZWw+e3tyb290Tm9kZS5xdWVzdGlvbi5sYWJlbH19OjwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiByb290Tm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidvYnNHcm91cCdcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIHJvb3ROb2RlLmNoaWxkcmVuOyBsZXQgaT1pbmRleCBcIj5cbiAgICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMlwiPlxuXG4gICAgPCEtLUdST1VQLS0+XG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSBcIj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZ3JvdXAnIFwiPlxuICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sIFwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdmaWVsZC1zZXQnIFwiPlxuICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sIFwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG5cbiAgPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AucGFnZS1sYWJlbHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo3MDB9LnNlY3Rpb24tbGFiZWx7Zm9udC1zaXplOjE4cHg7Zm9udC13ZWlnaHQ6NTAwfS5wYW5lbC1wcmltYXJ5e2JvcmRlcjpub25lIWltcG9ydGFudH0ucXVlc3Rpb24tYW5zd2Vye2ZvbnQtc2l6ZToxNnB4fS5wYW5lbHttYXJnaW4tYm90dG9tOjVweH1kaXYuc2VjdGlvbnttYXJnaW4tYm90dG9tOjE1cHghaW1wb3J0YW50fS5saW5lLWJyZWFrZXJ7d2hpdGUtc3BhY2U6cHJlLWxpbmV9aHJ7bWFyZ2luOjEwcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIHJvb3ROb2RlOiBOb2RlQmFzZTtcbiAgICBwdWJsaWMgZW5jOiBhbnk7XG4gICAgcHVibGljIGZpbGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIHB1YmxpYyByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIHB1YmxpYyBjdXN0b21EYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIHB1YmxpYyBfc2NoZW1hO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRHcm91cDogQWZlRm9ybUdyb3VwO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEVuY291bnRlclZpZXdlckNvbXBvbmVudDtcbiAgICBASW5wdXQoKSBzZXQgbm9kZShyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgdGhpcy5yb290Tm9kZSA9IHJvb3ROb2RlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XG4gICAgICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGVuY291bnRlcihlbmM6IGFueSkge1xuICAgICAgICB0aGlzLmVuYyA9IGVuYztcbiAgICB9XG4gICAgIEBJbnB1dCgpIHNldCBmb3JtKGZvcm06IGFueSkge1xuICAgICAgICAgdGhpcy5yb290Tm9kZSA9IGZvcm0ucm9vdE5vZGU7XG4gICAgICAgICB0aGlzLl9zY2hlbWEgPSBmb3JtLnNjaGVtYTtcbiAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ2V0UXVlc3Rpb25Ob2Rlcyh0aGlzLnRyYXZlcnNlKHRoaXMucm9vdE5vZGUpKSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMpIHt9XG4gICAgXG4gICAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgY29uc3QgYXJyYXlzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgICAgICAgYXJyYXlzLnB1c2gocGFnZS5wYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgICB9XG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZih0aGlzLnJvb3ROb2RlKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZURhdGFTb3VyY2UgPVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGFTb3VyY2UgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSkge1xuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQobm9kZSk7XG4gICAgICAgIHJldHVybiAkYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uQW5zd2VyZWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3QgYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuaGFzQW5zd2VyKG5vZGUpO1xuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrRm9yQ29sb24ocXVlc3Rpb25MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbkxhYmVsLmluZGV4T2YoJzonKSA9PT0gLTEpIHsgcmV0dXJuIHRydWU7IH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKG8sIHR5cGU/KSB7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoby5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHBhZ2U6IHBhZ2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHNlY3Rpb246IHNlY3Rpb24gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHFzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXAgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW5ba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHJlcCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDb25zb2xlLmxvZycsbyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlc3Rpb25zO1xuICAgIH1cblxuICAgIHJlcGVhdGluZ0dyb3VwKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IHRvUmV0dXJuID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgdG9SZXR1cm4ucHVzaCh7IHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHRoaXMudHJhdmVyc2Uobm9kZSkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cblxufVxuIl19