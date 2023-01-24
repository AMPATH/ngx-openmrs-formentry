import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
import { EncounterViewerService } from '../encounter-viewer.service';
export class EncounterViewerComponent {
    constructor(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
    }
    set node(rootNode) {
        this.rootNode = rootNode;
    }
    set schema(schema) {
        this._schema = schema;
    }
    set encounter(enc) {
        this.enc = enc;
    }
    set form(form) {
        this.rootNode = form.rootNode;
        this._schema = form.schema;
        console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
    }
    getQuestionNodes(pages) {
        const merged = [];
        const arrays = [];
        for (const page of pages) {
            arrays.push(page.page);
        }
        return merged.concat.apply([], arrays);
    }
    ngOnInit() {
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
    }
    questionsAnswered(node) {
        const $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    }
    questionAnswered(node) {
        const answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    }
    checkForColon(questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    traverse(o, type) {
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                const qs = this.traverse(o.children[key]);
                                questions.push({
                                    node: o.children[key],
                                    question: o.children[key].question,
                                    groupMembers: qs
                                });
                                break;
                            case 'repeating':
                                const rep = this.repeatingGroup(o.children[key].children);
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
    }
    repeatingGroup(nodes) {
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({
                question: node.question,
                groupMembers: this.traverse(node)
            });
        }
        return toReturn;
    }
}
EncounterViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-viewer',
                template: `<div class="viewer">
  <div *ngIf="rootNode.question.renderingType === 'form'" class="form">
    <div *ngFor="let question of rootNode.question.questions; let i = index">
      <div *ngIf="questionsAnswered(rootNode.children[question.key])">
        <div [attr.id]="'page' + i" class="panel panel-default">
          <p class="page-label panel-heading text-primary">
            {{ question.label }}
          </p>
          <div class="panel-body">
            <encounter-viewer
              [node]="rootNode.children[question.key]"
              [schema]="_schema"
              [parentComponent]="this"
              [parentGroup]="rootNode.control"
            ></encounter-viewer>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="rootNode.question.renderingType === 'page'" class="page">
    <encounter-viewer
      *ngFor="let question of rootNode.question.questions"
      [parentComponent]="this"
      [node]="rootNode.children[question.key]"
      [schema]="_schema"
      [parentGroup]="parentGroup"
    ></encounter-viewer>
  </div>

  <div
    *ngIf="
      rootNode.question.renderingType === 'section' &&
      questionsAnswered(rootNode)
    "
    class="section"
  >
    <div class="panel panel-primary">
      <p class="panel-heading section-label">{{ rootNode.question.label }}</p>
    </div>
    <div *ngFor="let question of rootNode.question.questions">
      <encounter-viewer
        [node]="rootNode.children[question.key]"
        [parentComponent]="this"
        [schema]="_schema"
        [parentGroup]="parentGroup"
      ></encounter-viewer>
    </div>
  </div>

  <!--Leaf Controls-->
  <div style="margin-left: 10px">
    <form *ngIf="rootNode.question.controlType === 0" [formGroup]="parentGroup">
      <div *ngIf="rootNode.control.value">
        <div class="question-answer">
          <label
            *ngIf="rootNode.question.label"
            [attr.for]="rootNode.question.key"
            style="font-weight: 400"
          >
            {{ rootNode.question.label }}
          </label>
          <span *ngIf="checkForColon(rootNode.question.label)">:</span>
          <div
            [ngSwitch]="rootNode.question.renderingType"
            style="display: inline-block; font-weight: bold"
          >
            <div *ngSwitchCase="'file'">
              <file-preview
                [formControlName]="rootNode.question.key"
                [id]="rootNode.question.key + 'id'"
                [dataSource]="fileDataSource"
              ></file-preview>
            </div>
            <div *ngSwitchCase="'remote-select'">
              <remote-answer
                [formControlName]="rootNode.question.key"
                [id]="rootNode.question.key + 'id'"
                [dataSource]="remoteDataSource"
              ></remote-answer>
            </div>
            <div *ngSwitchDefault style="display: inline-block">
              <question-control
                [schema]="_schema"
                [value]="rootNode.control.value"
                [dataSource]="customDataSource"
              ></question-control>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!--Array Controls-->
  <div
    *ngIf="rootNode.question.controlType === 1 && questionsAnswered(rootNode)"
  >
    <div [ngSwitch]="rootNode.question.renderingType">
      <div *ngSwitchCase="'repeating'">
        <div [ngSwitch]="rootNode.question.extras.type">
          <div *ngSwitchCase="'testOrder'">
            <label>{{ rootNode.question.label }}:</label>
            <div *ngFor="let child of rootNode.children; let i = index">
              <encounter-viewer
                *ngFor="let question of child.question.questions"
                [parentComponent]="this"
                [node]="child.children[question.key]"
                [parentGroup]="child.control"
                [schema]="_schema"
              ></encounter-viewer>
            </div>
          </div>

          <div *ngSwitchCase="'obsGroup'">
            <div *ngFor="let child of rootNode.children; let i = index">
              <encounter-viewer
                *ngFor="let question of child.question.questions"
                [parentComponent]="this"
                [node]="child.children[question.key]"
                [parentGroup]="child.control"
                [schema]="_schema"
              ></encounter-viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="rootNode.question.controlType === 2">
    <!--GROUP-->
    <div [ngSwitch]="rootNode.question.renderingType">
      <div *ngSwitchCase="'group'">
        <encounter-viewer
          *ngFor="let question of rootNode.question.questions"
          [parentComponent]="this"
          [node]="rootNode.children[question.key]"
          [parentGroup]="rootNode.control"
          [schema]="_schema"
        ></encounter-viewer>
      </div>
      <div *ngSwitchCase="'field-set'">
        <encounter-viewer
          *ngFor="let question of rootNode.question.questions"
          [parentComponent]="this"
          [node]="rootNode.children[question.key]"
          [parentGroup]="rootNode.control"
          [schema]="_schema"
        ></encounter-viewer>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`.page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}`]
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUNMLFFBQVEsRUFHVCxNQUFNLHlDQUF5QyxDQUFDO0FBSWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFrS3JFLE1BQU07SUEwQkosWUFDVSxzQkFBOEMsRUFDOUMsV0FBd0I7UUFEeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUMvQixDQUFDO0lBcEJKLElBQWEsSUFBSSxDQUFDLFFBQWtCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFvQixNQUFNLENBQUMsTUFBVztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBb0IsU0FBUyxDQUFDLEdBQVE7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUNELElBQWEsSUFBSSxDQUFDLElBQVM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixPQUFPLENBQUMsR0FB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QUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkpYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLG9SQUFvUixDQUFDO2FBQy9SOzs7O1lBaktRLHNCQUFzQjtZQUh0QixXQUFXOzs7MEJBNEtqQixLQUFLOzhCQUNMLEtBQUs7bUJBQ0wsS0FBSztxQkFJTCxLQUFLO3dCQUlMLEtBQUs7bUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOb2RlQmFzZSxcbiAgR3JvdXBOb2RlLFxuICBMZWFmTm9kZVxufSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbmNvdW50ZXItdmlld2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmlld2VyXCI+XG4gIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIiBjbGFzcz1cImZvcm1cIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldKVwiPlxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cIidwYWdlJyArIGlcIiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInBhZ2UtbGFiZWwgcGFuZWwtaGVhZGluZyB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgIHt7IHF1ZXN0aW9uLmxhYmVsIH19XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlclxuICAgICAgICAgICAgICBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCJcbiAgICAgICAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgICAgICAgW3BhcmVudEdyb3VwXT1cInJvb3ROb2RlLmNvbnRyb2xcIlxuICAgICAgICAgICAgPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cInJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJ1wiIGNsYXNzPVwicGFnZVwiPlxuICAgIDxlbmNvdW50ZXItdmlld2VyXG4gICAgICAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCJcbiAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiXG4gICAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIlxuICAgID48L2VuY291bnRlci12aWV3ZXI+XG4gIDwvZGl2PlxuXG4gIDxkaXZcbiAgICAqbmdJZj1cIlxuICAgICAgcm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nICYmXG4gICAgICBxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZSlcbiAgICBcIlxuICAgIGNsYXNzPVwic2VjdGlvblwiXG4gID5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuICAgICAgPHAgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIHNlY3Rpb24tbGFiZWxcIj57eyByb290Tm9kZS5xdWVzdGlvbi5sYWJlbCB9fTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiByb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIj5cbiAgICAgIDxlbmNvdW50ZXItdmlld2VyXG4gICAgICAgIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgICAgICBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIlxuICAgICAgICBbc2NoZW1hXT1cIl9zY2hlbWFcIlxuICAgICAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIlxuICAgICAgPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPCEtLUxlYWYgQ29udHJvbHMtLT5cbiAgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAxMHB4XCI+XG4gICAgPGZvcm0gKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJyb290Tm9kZS5jb250cm9sLnZhbHVlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1hbnN3ZXJcIj5cbiAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24ubGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuZm9yXT1cInJvb3ROb2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgICAgICBzdHlsZT1cImZvbnQtd2VpZ2h0OiA0MDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsIH19XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImNoZWNrRm9yQ29sb24ocm9vdE5vZGUucXVlc3Rpb24ubGFiZWwpXCI+Ojwvc3Bhbj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiXG4gICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC13ZWlnaHQ6IGJvbGRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidmaWxlJ1wiPlxuICAgICAgICAgICAgICA8ZmlsZS1wcmV2aWV3XG4gICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgICAgICAgICBbZGF0YVNvdXJjZV09XCJmaWxlRGF0YVNvdXJjZVwiXG4gICAgICAgICAgICAgID48L2ZpbGUtcHJldmlldz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JlbW90ZS1zZWxlY3QnXCI+XG4gICAgICAgICAgICAgIDxyZW1vdGUtYW5zd2VyXG4gICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJyb290Tm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgICAgICAgICBbZGF0YVNvdXJjZV09XCJyZW1vdGVEYXRhU291cmNlXCJcbiAgICAgICAgICAgICAgPjwvcmVtb3RlLWFuc3dlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0IHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICAgIDxxdWVzdGlvbi1jb250cm9sXG4gICAgICAgICAgICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwicm9vdE5vZGUuY29udHJvbC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW2RhdGFTb3VyY2VdPVwiY3VzdG9tRGF0YVNvdXJjZVwiXG4gICAgICAgICAgICAgID48L3F1ZXN0aW9uLWNvbnRyb2w+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG4gIDwvZGl2PlxuXG4gIDwhLS1BcnJheSBDb250cm9scy0tPlxuICA8ZGl2XG4gICAgKm5nSWY9XCJyb290Tm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMSAmJiBxdWVzdGlvbnNBbnN3ZXJlZChyb290Tm9kZSlcIlxuICA+XG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JlcGVhdGluZydcIj5cbiAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGVcIj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGVzdE9yZGVyJ1wiPlxuICAgICAgICAgICAgPGxhYmVsPnt7IHJvb3ROb2RlLnF1ZXN0aW9uLmxhYmVsIH19OjwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiByb290Tm9kZS5jaGlsZHJlbjsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICA8ZW5jb3VudGVyLXZpZXdlclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgICAgICAgICAgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgICAgICAgICAgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIFtzY2hlbWFdPVwiX3NjaGVtYVwiXG4gICAgICAgICAgICAgID48L2VuY291bnRlci12aWV3ZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidvYnNHcm91cCdcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIHJvb3ROb2RlLmNoaWxkcmVuOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgIDxlbmNvdW50ZXItdmlld2VyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICAgICAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgICAgICAgICBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgICAgICAgICBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbFwiXG4gICAgICAgICAgICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCJcbiAgICAgICAgICAgICAgPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwicm9vdE5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDJcIj5cbiAgICA8IS0tR1JPVVAtLT5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJyb290Tm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCI+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZ3JvdXAnXCI+XG4gICAgICAgIDxlbmNvdW50ZXItdmlld2VyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIHJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgICBbbm9kZV09XCJyb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgICBbcGFyZW50R3JvdXBdPVwicm9vdE5vZGUuY29udHJvbFwiXG4gICAgICAgICAgW3NjaGVtYV09XCJfc2NoZW1hXCJcbiAgICAgICAgPjwvZW5jb3VudGVyLXZpZXdlcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2ZpZWxkLXNldCdcIj5cbiAgICAgICAgPGVuY291bnRlci12aWV3ZXJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygcm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCJcbiAgICAgICAgICBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIlxuICAgICAgICAgIFtub2RlXT1cInJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgICAgICAgIFtwYXJlbnRHcm91cF09XCJyb290Tm9kZS5jb250cm9sXCJcbiAgICAgICAgICBbc2NoZW1hXT1cIl9zY2hlbWFcIlxuICAgICAgICA+PC9lbmNvdW50ZXItdmlld2VyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnBhZ2UtbGFiZWx7Zm9udC1zaXplOjIwcHg7Zm9udC13ZWlnaHQ6NzAwfS5zZWN0aW9uLWxhYmVse2ZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OjUwMH0ucGFuZWwtcHJpbWFyeXtib3JkZXI6bm9uZSFpbXBvcnRhbnR9LnF1ZXN0aW9uLWFuc3dlcntmb250LXNpemU6MTZweH0ucGFuZWx7bWFyZ2luLWJvdHRvbTo1cHh9ZGl2LnNlY3Rpb257bWFyZ2luLWJvdHRvbToxNXB4IWltcG9ydGFudH0ubGluZS1icmVha2Vye3doaXRlLXNwYWNlOnByZS1saW5lfWhye21hcmdpbjoxMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyByb290Tm9kZTogTm9kZUJhc2U7XG4gIHB1YmxpYyBlbmM6IGFueTtcbiAgcHVibGljIGZpbGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgcmVtb3RlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGN1c3RvbURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBfc2NoZW1hO1xuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudENvbXBvbmVudDogRW5jb3VudGVyVmlld2VyQ29tcG9uZW50O1xuICBASW5wdXQoKSBzZXQgbm9kZShyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICB0aGlzLnJvb3ROb2RlID0gcm9vdE5vZGU7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xuICAgIHRoaXMuX3NjaGVtYSA9IHNjaGVtYTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgZW5jb3VudGVyKGVuYzogYW55KSB7XG4gICAgdGhpcy5lbmMgPSBlbmM7XG4gIH1cbiAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogYW55KSB7XG4gICAgdGhpcy5yb290Tm9kZSA9IGZvcm0ucm9vdE5vZGU7XG4gICAgdGhpcy5fc2NoZW1hID0gZm9ybS5zY2hlbWE7XG4gICAgY29uc29sZS5sb2codGhpcy5nZXRRdWVzdGlvbk5vZGVzKHRoaXMudHJhdmVyc2UodGhpcy5yb290Tm9kZSkpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlc1xuICApIHt9XG5cbiAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgIGNvbnN0IGFycmF5cyA9IFtdO1xuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgYXJyYXlzLnB1c2gocGFnZS5wYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZC5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG4gIH1cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnJvb3ROb2RlKSB7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMucm9vdE5vZGUgJiZcbiAgICAgIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJ1xuICAgICkge1xuICAgICAgdGhpcy5maWxlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbXG4gICAgICAgIHRoaXMucm9vdE5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5yb290Tm9kZSAmJlxuICAgICAgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgIHRoaXMucm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnXG4gICAgKSB7XG4gICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW1xuICAgICAgICB0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VcbiAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YVNvdXJjZSA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55KSB7XG4gICAgY29uc3QgJGFuc3dlcmVkID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGUpO1xuICAgIHJldHVybiAkYW5zd2VyZWQ7XG4gIH1cblxuICBwdWJsaWMgcXVlc3Rpb25BbnN3ZXJlZChub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGFuc3dlcmVkID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmhhc0Fuc3dlcihub2RlKTtcbiAgICByZXR1cm4gYW5zd2VyZWQ7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tGb3JDb2xvbihxdWVzdGlvbkxhYmVsOiBzdHJpbmcpIHtcbiAgICBpZiAocXVlc3Rpb25MYWJlbC5pbmRleE9mKCc6JykgPT09IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRyYXZlcnNlKG8sIHR5cGU/KSB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0gW107XG4gICAgaWYgKG8uY2hpbGRyZW4pIHtcbiAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29uc3QgcmV0dXJuZWQgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW4pO1xuICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICB9XG4gICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKG8uY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgc3dpdGNoIChvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgcGFnZTogcGFnZSB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHNlY3Rpb246IHNlY3Rpb24gfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBxc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiByZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbnNvbGUubG9nJywgbyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICByZXBlYXRpbmdHcm91cChub2Rlcykge1xuICAgIGNvbnN0IHRvUmV0dXJuID0gW107XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICB0b1JldHVybi5wdXNoKHtcbiAgICAgICAgcXVlc3Rpb246IG5vZGUucXVlc3Rpb24sXG4gICAgICAgIGdyb3VwTWVtYmVyczogdGhpcy50cmF2ZXJzZShub2RlKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0b1JldHVybjtcbiAgfVxufVxuIl19