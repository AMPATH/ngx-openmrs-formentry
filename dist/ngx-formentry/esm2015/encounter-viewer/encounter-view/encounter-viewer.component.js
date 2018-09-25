/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources';
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
        console.log(this.rootNode);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
        const /** @type {?} */ $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    questionAnswered(node) {
        const /** @type {?} */ answered = this.encounterViewerService.hasAnswer(node);
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
/** @nocollapse */
EncounterViewerComponent.ctorParameters = () => [
    { type: EncounterViewerService, },
    { type: DataSources, },
];
EncounterViewerComponent.propDecorators = {
    "parentGroup": [{ type: Input },],
    "parentComponent": [{ type: Input },],
    "node": [{ type: Input },],
    "schema": [{ type: Input },],
    "encounter": [{ type: Input },],
    "form": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLHlDQUF5QyxDQUFDO0FBR3hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUE0RzVELE1BQU07Ozs7O0lBMEJGLFlBQW9CLHNCQUE4QyxFQUMvQztRQURDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDL0MsZ0JBQVcsR0FBWCxXQUFXO0tBQzdCOzs7OztRQW5CWSxJQUFJLENBQUMsUUFBa0I7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Ozs7OztRQUdULE1BQU0sQ0FBQyxNQUFXO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7Ozs7UUFHTixTQUFTLENBQUMsR0FBUTtRQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7Ozs7O1FBRUwsSUFBSSxDQUFDLElBQVM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7SUFPekIsUUFBUTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTTtlQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkU7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNO2VBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQ3ZEOzs7Ozs7SUFHRixpQkFBaUIsQ0FBQyxJQUFTO1FBQzlCLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0lBR2QsZ0JBQWdCLENBQUMsSUFBYztRQUNsQyx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7SUFHYixhQUFhLENBQUMsYUFBcUI7UUFDdEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FBRTs7OztZQWhLckYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9HYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxvUkFBb1IsQ0FBQzthQUNqUzs7OztZQTdHUSxzQkFBc0I7WUFFdEIsV0FBVzs7OzRCQW1IZixLQUFLO2dDQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFJTCxLQUFLOzBCQUlMLEtBQUs7cUJBR0osS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1ncm91cCc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZW5jb3VudGVyLXZpZXdlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWV3ZXJcIj5cclxuXHJcblxyXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIiBjbGFzcz1cImZvcm1cIj5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cInF1ZXN0aW9uc0Fuc3dlcmVkKHJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0pXCI+XHJcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCIncGFnZScraVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJwYWdlLWxhYmVsIHBhbmVsLWhlYWRpbmcgdGV4dC1wcmltYXJ5XCI+e3txdWVzdGlvbi5sYWJlbH19PC9wPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sXCI+PC9lbmNvdW50ZXItdmlld2VyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZSdcIiBjbGFzcz1cInBhZ2VcIj5cclxuICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcclxuICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCIgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9lbmNvdW50ZXItdmlld2VyPlxyXG4gIDwvZGl2PlxyXG5cclxuXHJcbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJyYmIHF1ZXN0aW9uc0Fuc3dlcmVkKHJvb3ROb2RlKVwiXHJcbiAgICBjbGFzcz1cInNlY3Rpb25cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcbiAgICAgIDxwIGNsYXNzPVwicGFuZWwtaGVhZGluZyBzZWN0aW9uLWxhYmVsXCI+e3sgcm9vdE5vZGUucXVlc3Rpb24ubGFiZWwgfX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiPlxyXG4gICAgICA8ZW5jb3VudGVyLXZpZXdlciBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW3NjaGVtYV09XCJfc2NoZW1hXCIgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9lbmNvdW50ZXItdmlld2VyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDwhLS1MZWFmIENvbnRyb2xzLS0+XHJcbiAgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjEwcHg7XCI+XHJcbiAgPGZvcm0gKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIj5cclxuICAgIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5jb250cm9sLnZhbHVlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24tYW5zd2VyXCI+XHJcbiAgICAgIDxsYWJlbCAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsXCIgW2F0dHIuZm9yXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6NDAwO1wiPlxyXG4gICAgICAgICAge3sgcm9vdE5vZGUucXVlc3Rpb24ubGFiZWwgfX1cclxuICAgICAgPC9sYWJlbD5cclxuICAgICAgPHNwYW4gKm5nSWY9XCJjaGVja0ZvckNvbG9uKHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsKVwiPjo8L3NwYW4+XHJcbiAgICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyBmb250LXdlaWdodDpib2xkO1wiPlxyXG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdmaWxlJyBcIj5cclxuICAgICAgICAgICAgPGZpbGUtcHJldmlldyBbZm9ybUNvbnRyb2xOYW1lXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2RhdGFTb3VyY2VdPVwiZmlsZURhdGFTb3VyY2VcIj48L2ZpbGUtcHJldmlldz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JlbW90ZS1zZWxlY3QnXCI+XHJcbiAgICAgICAgICAgIDxyZW1vdGUtYW5zd2VyIFtmb3JtQ29udHJvbE5hbWVdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZGF0YVNvdXJjZV09XCJyZW1vdGVEYXRhU291cmNlXCI+PC9yZW1vdGUtYW5zd2VyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaERlZmF1bHQgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgIDxxdWVzdGlvbi1jb250cm9sIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFt2YWx1ZV09XCJyb290Tm9kZS5jb250cm9sLnZhbHVlXCIgW2RhdGFTb3VyY2VdPVwiY3VzdG9tRGF0YVNvdXJjZVwiPjwvcXVlc3Rpb24tY29udHJvbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgIFxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Zvcm0+XHJcbjwvZGl2PlxyXG5cclxuICA8IS0tQXJyYXkgQ29udHJvbHMtLT5cclxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDEgJiYgcXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUpXCI+XHJcbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCI+XHJcbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAncmVwZWF0aW5nJyBcIj5cclxuICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZVwiPlxyXG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Rlc3RPcmRlcidcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt7cm9vdE5vZGUucXVlc3Rpb24ubGFiZWx9fTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiByb290Tm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XHJcbiAgICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXHJcbiAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidvYnNHcm91cCdcIj5cclxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygcm9vdE5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxyXG4gICAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxyXG4gICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDJcIj5cclxuXHJcbiAgICA8IS0tR1JPVVAtLT5cclxuICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XHJcbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZ3JvdXAnIFwiPlxyXG4gICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxyXG4gICAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2ZpZWxkLXNldCcgXCI+XHJcbiAgICAgICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXHJcbiAgICAgICAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sIFwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiPjwvZW5jb3VudGVyLXZpZXdlcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcblxyXG5cclxuICA8L2Rpdj5cclxuYCxcclxuICAgIHN0eWxlczogW2AucGFnZS1sYWJlbHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo3MDB9LnNlY3Rpb24tbGFiZWx7Zm9udC1zaXplOjE4cHg7Zm9udC13ZWlnaHQ6NTAwfS5wYW5lbC1wcmltYXJ5e2JvcmRlcjpub25lIWltcG9ydGFudH0ucXVlc3Rpb24tYW5zd2Vye2ZvbnQtc2l6ZToxNnB4fS5wYW5lbHttYXJnaW4tYm90dG9tOjVweH1kaXYuc2VjdGlvbnttYXJnaW4tYm90dG9tOjE1cHghaW1wb3J0YW50fS5saW5lLWJyZWFrZXJ7d2hpdGUtc3BhY2U6cHJlLWxpbmV9aHJ7bWFyZ2luOjEwcHh9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljIHJvb3ROb2RlOiBOb2RlQmFzZTtcclxuICAgIHB1YmxpYyBlbmM6IGFueTtcclxuICAgIHB1YmxpYyBmaWxlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICAgIHB1YmxpYyByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gICAgcHVibGljIGN1c3RvbURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgICBwdWJsaWMgX3NjaGVtYTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRHcm91cDogQWZlRm9ybUdyb3VwO1xyXG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudENvbXBvbmVudDogRW5jb3VudGVyVmlld2VyQ29tcG9uZW50O1xyXG4gICAgQElucHV0KCkgc2V0IG5vZGUocm9vdE5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICAgICAgdGhpcy5yb290Tm9kZSA9IHJvb3ROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbmMgPSBlbmM7XHJcbiAgICB9XHJcbiAgICAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogYW55KSB7XHJcbiAgICAgICAgIHRoaXMucm9vdE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xyXG4gICAgICAgICB0aGlzLl9zY2hlbWEgPSBmb3JtLnNjaGVtYTtcclxuICAgICAgICAgY29uc29sZS5sb2codGhpcy5yb290Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcykge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5yb290Tm9kZSAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhc1xyXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlRGF0YVNvdXJjZSA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMucm9vdE5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXHJcbiAgICAgICAgICAgICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhU291cmNlID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0ICRhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChub2RlKTtcclxuICAgICAgICByZXR1cm4gJGFuc3dlcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBxdWVzdGlvbkFuc3dlcmVkKG5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICAgICAgY29uc3QgYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuaGFzQW5zd2VyKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBhbnN3ZXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tGb3JDb2xvbihxdWVzdGlvbkxhYmVsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAocXVlc3Rpb25MYWJlbC5pbmRleE9mKCc6JykgPT09IC0xKSB7IHJldHVybiB0cnVlOyB9IGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19