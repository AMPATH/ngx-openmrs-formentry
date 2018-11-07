/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLHlDQUF5QyxDQUFDO0FBR3hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUE0R3pFLE1BQU07Ozs7O0lBMEJGLFlBQW9CLHNCQUE4QyxFQUMvQztRQURDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDL0MsZ0JBQVcsR0FBWCxXQUFXO0tBQzdCOzs7OztRQW5CWSxJQUFJLENBQUMsUUFBa0I7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Ozs7OztRQUdULE1BQU0sQ0FBQyxNQUFXO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7Ozs7UUFHTixTQUFTLENBQUMsR0FBUTtRQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7Ozs7O1FBRUwsSUFBSSxDQUFDLElBQVM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7SUFPekIsUUFBUTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTTtlQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkU7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNO2VBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQ3ZEOzs7Ozs7SUFHRixpQkFBaUIsQ0FBQyxJQUFTO1FBQzlCLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0lBR2QsZ0JBQWdCLENBQUMsSUFBYztRQUNsQyx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7SUFHYixhQUFhLENBQUMsYUFBcUI7UUFDdEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FBRTs7OztZQWhLckYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9HYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxvUkFBb1IsQ0FBQzthQUNqUzs7OztZQTdHUSxzQkFBc0I7WUFFdEIsV0FBVzs7OzRCQW1IZixLQUFLO2dDQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFJTCxLQUFLOzBCQUlMLEtBQUs7cUJBR0osS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWdyb3VwJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlbmNvdW50ZXItdmlld2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWV3ZXJcIj5cblxuXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIiBjbGFzcz1cImZvcm1cIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwicXVlc3Rpb25zQW5zd2VyZWQocm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XSlcIj5cbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCIncGFnZScraVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwicGFnZS1sYWJlbCBwYW5lbC1oZWFkaW5nIHRleHQtcHJpbWFyeVwiPnt7cXVlc3Rpb24ubGFiZWx9fTwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnXCIgY2xhc3M9XCJwYWdlXCI+XG4gICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCIgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICA8L2Rpdj5cblxuXG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicmJiBxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZSlcIlxuICAgIGNsYXNzPVwic2VjdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XG4gICAgICA8cCBjbGFzcz1cInBhbmVsLWhlYWRpbmcgc2VjdGlvbi1sYWJlbFwiPnt7IHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsIH19PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiPlxuICAgICAgPGVuY291bnRlci12aWV3ZXIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtzY2hlbWFdPVwiX3NjaGVtYVwiIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPCEtLUxlYWYgQ29udHJvbHMtLT5cbiAgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjEwcHg7XCI+XG4gIDxmb3JtICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDBcIiBbZm9ybUdyb3VwXT1cInBhcmVudEdyb3VwXCI+XG4gICAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLmNvbnRyb2wudmFsdWVcIj5cbiAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24tYW5zd2VyXCI+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5sYWJlbFwiIFthdHRyLmZvcl09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIiBzdHlsZT1cImZvbnQtd2VpZ2h0OjQwMDtcIj5cbiAgICAgICAgICB7eyByb290Tm9kZS5xdWVzdGlvbi5sYWJlbCB9fVxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxzcGFuICpuZ0lmPVwiY2hlY2tGb3JDb2xvbihyb290Tm9kZS5xdWVzdGlvbi5sYWJlbClcIj46PC9zcGFuPlxuICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IGZvbnQtd2VpZ2h0OmJvbGQ7XCI+XG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdmaWxlJyBcIj5cbiAgICAgICAgICAgIDxmaWxlLXByZXZpZXcgW2Zvcm1Db250cm9sTmFtZV09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwicm9vdE5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtkYXRhU291cmNlXT1cImZpbGVEYXRhU291cmNlXCI+PC9maWxlLXByZXZpZXc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JlbW90ZS1zZWxlY3QnXCI+XG4gICAgICAgICAgICA8cmVtb3RlLWFuc3dlciBbZm9ybUNvbnRyb2xOYW1lXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2RhdGFTb3VyY2VdPVwicmVtb3RlRGF0YVNvdXJjZVwiPjwvcmVtb3RlLWFuc3dlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaERlZmF1bHQgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPlxuICAgICAgICAgICAgICA8cXVlc3Rpb24tY29udHJvbCBbc2NoZW1hXT1cIl9zY2hlbWFcIiBbdmFsdWVdPVwicm9vdE5vZGUuY29udHJvbC52YWx1ZVwiIFtkYXRhU291cmNlXT1cImN1c3RvbURhdGFTb3VyY2VcIj48L3F1ZXN0aW9uLWNvbnRyb2w+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICBcbiAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9mb3JtPlxuPC9kaXY+XG5cbiAgPCEtLUFycmF5IENvbnRyb2xzLS0+XG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMSAmJiBxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZSlcIj5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCI+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ3JlcGVhdGluZycgXCI+XG4gICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlXCI+XG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Rlc3RPcmRlcidcIj5cbiAgICAgICAgICAgIDxsYWJlbD57e3Jvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsfX06PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIHJvb3ROb2RlLmNoaWxkcmVuOyBsZXQgaT1pbmRleCBcIj5cbiAgICAgICAgICAgICAgPGVuY291bnRlci12aWV3ZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ29ic0dyb3VwJ1wiPlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygcm9vdE5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIiBbc2NoZW1hXT1cIl9zY2hlbWFcIj48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAyXCI+XG5cbiAgICA8IS0tR1JPVVAtLT5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlIFwiPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdncm91cCcgXCI+XG4gICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cInJvb3ROb2RlLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2ZpZWxkLXNldCcgXCI+XG4gICAgICAgIDxlbmNvdW50ZXItdmlld2VyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwicm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cInJvb3ROb2RlLmNvbnRyb2wgXCIgW3NjaGVtYV09XCJfc2NoZW1hXCI+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG5cblxuICA8L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5wYWdlLWxhYmVse2ZvbnQtc2l6ZToyMHB4O2ZvbnQtd2VpZ2h0OjcwMH0uc2VjdGlvbi1sYWJlbHtmb250LXNpemU6MThweDtmb250LXdlaWdodDo1MDB9LnBhbmVsLXByaW1hcnl7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS5xdWVzdGlvbi1hbnN3ZXJ7Zm9udC1zaXplOjE2cHh9LnBhbmVse21hcmdpbi1ib3R0b206NXB4fWRpdi5zZWN0aW9ue21hcmdpbi1ib3R0b206MTVweCFpbXBvcnRhbnR9LmxpbmUtYnJlYWtlcnt3aGl0ZS1zcGFjZTpwcmUtbGluZX1ocnttYXJnaW46MTBweH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgcm9vdE5vZGU6IE5vZGVCYXNlO1xuICAgIHB1YmxpYyBlbmM6IGFueTtcbiAgICBwdWJsaWMgZmlsZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgcHVibGljIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgcHVibGljIGN1c3RvbURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgcHVibGljIF9zY2hlbWE7XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudENvbXBvbmVudDogRW5jb3VudGVyVmlld2VyQ29tcG9uZW50O1xuICAgIEBJbnB1dCgpIHNldCBub2RlKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgICAgICB0aGlzLnJvb3ROb2RlID0gcm9vdE5vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHVibGljIHNldCBzY2hlbWEoc2NoZW1hOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYzogYW55KSB7XG4gICAgICAgIHRoaXMuZW5jID0gZW5jO1xuICAgIH1cbiAgICAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICB0aGlzLnJvb3ROb2RlID0gZm9ybS5yb290Tm9kZTtcbiAgICAgICAgIHRoaXMuX3NjaGVtYSA9IGZvcm0uc2NoZW1hO1xuICAgICAgICAgY29uc29sZS5sb2codGhpcy5yb290Tm9kZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZURhdGFTb3VyY2UgPVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb3ROb2RlICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzXG4gICAgICAgICAgICAmJiB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGFTb3VyY2UgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSkge1xuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQobm9kZSk7XG4gICAgICAgIHJldHVybiAkYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uQW5zd2VyZWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3QgYW5zd2VyZWQgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuaGFzQW5zd2VyKG5vZGUpO1xuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrRm9yQ29sb24ocXVlc3Rpb25MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbkxhYmVsLmluZGV4T2YoJzonKSA9PT0gLTEpIHsgcmV0dXJuIHRydWU7IH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cblxufVxuIl19