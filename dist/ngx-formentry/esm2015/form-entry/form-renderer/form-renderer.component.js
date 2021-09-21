import { Component, Input, Inject } from '@angular/core';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
// import { concat, of, Observable, Subject, BehaviorSubject } from 'rxjs';
// import * as _ from 'lodash';
// import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
// import { QuestionBase } from '../question-models';
export class FormRendererComponent {
    // items$: Observable<any[]>;
    // itemsLoading = false;
    // itemsInput$ = new Subject<string>();
    constructor(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.activeTab = 0;
    }
    ngOnInit() {
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            const tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe((error) => {
                this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !this.node.question.isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    }
    addChildComponent(child) {
        this.childComponents.push(child);
    }
    setUpRemoteSelect() {
        if (this.node &&
            this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            // let selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            /*
            let defaltValues = of([]);
            if (this.dataSource.resolveSelectedValue(selectQuestion.control.value)) {
              defaltValues = this.dataSource.resolveSelectedValue(selectQuestion.control.value).pipe(
                catchError(() => of([])), // empty list on error
              );
            }
            this.items$ = concat(
              defaltValues,
              this.itemsInput$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.itemsLoading = true),
                switchMap(term => this.dataSource.searchOptions(term).pipe(
                  catchError(() => of([])), // empty list on error
                  tap(() => {
                    this.itemsLoading = false
                  })
                ))
              )
            );
            */
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }
    setUpFileUpload() {
        if (this.node &&
            this.node.question.extras &&
            this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    }
    checkSection(node) {
        if (node.question.renderingType === 'section') {
            let groupChildrenHidden = false;
            const allSectionControlsHidden = Object.keys(node.children).every((k) => {
                const innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden = Object.keys(innerNode.children).every((i) => innerNode.children[i].control.hidden);
                }
                return node.children[k].control.hidden || groupChildrenHidden;
            });
            return !allSectionControlsHidden;
        }
        return true;
    }
    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }
    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }
    isCurrentTabFirst() {
        return this.activeTab === 0;
    }
    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }
    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    tabSelected($event) {
        this.activeTab = $event;
        this.setPreviousTab();
    }
    setPreviousTab() {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    }
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }
    errors() {
        return this.getErrors(this.node);
    }
    scrollToControl(error) {
        const tab = +error.split(',')[0];
        const elSelector = error.split(',')[1] + 'id';
        // the tab components
        const tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    const element = this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    }
    onDateChanged(node) {
        // console.log('Node', node);
        this.node = node;
    }
    upload(event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    }
    toggleInformation(infoId) {
        const e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    getErrors(node) {
        const errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
}
FormRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'form-renderer',
                template: `<!--CONTAINERS-->
<div *ngIf="node.question.renderingType === 'form'">
  <div class="dropdown dropdown-tabs forms-dropdown">
    <a class="btn dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-angle-double-down"></i>
    </a>
    <ul
      class="dropdown-menu dropdown-menu-right forms-dropdown-menu"
      role="menu"
      aria-labelledby="dropdownMenu"
    >
      <li
        *ngFor="let question of node.question.questions; let i = index"
        (click)="clickTab(i)"
      >
        {{ question.label }}
      </li>
    </ul>
  </div>
  <mat-tab-group
    (selectedIndexChange)="tabSelected($event)"
    [selectedIndex]="activeTab"
  >
    <mat-tab
      [label]="question.label"
      *ngFor="let question of node.question.questions; let i = index"
    >
      <div (swipeLeft)="loadNextTab()" (swipeRight)="loadPreviousTab()">
        <form-renderer
          [node]="node.children[question.key]"
          [parentComponent]="this"
          [parentGroup]="node.control"
        ></form-renderer>
      </div>
    </mat-tab>
  </mat-tab-group>

  <div style="text-align: center">
    <button
      type="button"
      class="btn btn-default"
      (click)="loadPreviousTab()"
      [ngClass]="{ disabled: isCurrentTabFirst() }"
    >
      &lt;&lt;
    </button>
    <button
      type="button"
      class="btn btn-default"
      (click)="loadNextTab()"
      [ngClass]="{ disabled: isCurrentTabLast() }"
    >
      &gt;&gt;
    </button>
  </div>
</div>
<div *ngIf="node.question.renderingType === 'page'">
  <!--<h2>{{node.question.label}}</h2>-->
  <form-renderer
    *ngFor="let question of node.question.questions"
    [parentComponent]="this"
    [node]="node.children[question.key]"
    [parentGroup]="parentGroup"
  ></form-renderer>
</div>
<div *ngIf="node.question.renderingType === 'section' && checkSection(node)">
  <div class="panel panel-primary">
    <div class="panel-heading">
      <button
        type="button"
        class="btn btn-primary pull-right"
        (click)="isCollapsed = !isCollapsed"
      >
        {{ isCollapsed ? 'Show' : 'Hide' }}
      </button>
      {{ node.question.label }}
    </div>
    <div class="panel-body" [collapse]="isCollapsed">
      <form-renderer
        *ngFor="let question of node.question.questions"
        [parentComponent]="this"
        [node]="node.children[question.key]"
        [parentGroup]="parentGroup"
      ></form-renderer>
    </div>
  </div>
</div>

<!-- MESSAGES -->
<div
  *ngIf="node.control && node.control.alert && node.control.alert !== ''"
  class="alert alert-warning"
>
  <a class="close" data-dismiss="alert">&times;</a> {{ node.control.alert }}
</div>

<!--CONTROLS-->

<div
  *ngIf="node.question.controlType === 0"
  class="form-group"
  [formGroup]="parentGroup"
  [hidden]="node.control.hidden"
  [ngClass]="{ disabled: node.control.disabled }"
>
  <!--LEAF CONTROL-->
  <div class="question-area">
    <a
      class="form-tooltip pull-right"
      (click)="toggleInformation(node.question.extras.id)"
      data-placement="right"
      *ngIf="
        node.question &&
        node.question.extras.questionInfo &&
        node.question.extras.questionInfo !== '' &&
        node.question.extras.questionInfo !== ' '
      "
    >
      <i class="glyphicon glyphicon-question-sign" aria-hidden="true"></i>
    </a>

    <label
      *ngIf="node.question.label"
      [style.color]="hasErrors() ? 'red' : ''"
      class="control-label"
      [attr.for]="node.question.key"
    >
      {{ node.question.required ? '*' : '' }} {{ node.question.label }}
    </label>
    <div [ngSwitch]="node.question.renderingType">
      <select
        class="form-control"
        *ngSwitchCase="'select'"
        [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"
      >
        <option *ngFor="let o of node.question.options" [ngValue]="o.value">
          {{ o.label }}
        </option>
      </select>

      <app-file-upload
        *ngSwitchCase="'file'"
        [dataSource]="dataSource"
        [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"
        (fileChanged)="upload($event)"
      >
      </app-file-upload>
      <textarea
        [placeholder]="node.question.placeholder"
        [rows]="node.question.rows"
        class="form-control"
        *ngSwitchCase="'textarea'"
        [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"
      >
      </textarea>
      <!--
      <ng-select *ngSwitchCase="'remote-select'" [items]="items$ | async" bindLabel="label" bindValue="value" placeholder="{{node.question.placeholder}}"
        [hideSelected]="true" [loading]="itemsLoading"  [typeahead]="itemsInput$" [formControlName]="node.question.key" [id]="node.question.key + 'id'">
      </ng-select>
    -->
      <remote-select
        *ngSwitchCase="'remote-select'"
        [placeholder]="node.question.placeholder"
        tabindex="0"
        [dataSource]="dataSource"
        [componentID]="node.question.key + 'id'"
        [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"
      ></remote-select>
      <!--  
      <date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" tabindex="0" [weeks]='node.question.extras.questionOptions.weeksList'
        (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"></date-time-picker>
  -->

      <ngx-date-time-picker
        *ngSwitchCase="'date'"
        [showTime]="node.question.showTime"
        [id]="node.question.key + 'id'"
        [formControlName]="node.question.key"
        [weeks]="node.question.extras.questionOptions.weeksList"
        (onDateChange)="onDateChanged(node)"
        [showWeeks]="node.question.showWeeksAdder"
      ></ngx-date-time-picker>
      <ng-select
        *ngSwitchCase="'multi-select'"
        [style.height]="'auto'"
        [style.overflow-x]="'hidden'"
        tabindex="0"
        [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"
        [options]="node.question.options"
        [multiple]="true"
      >
      </ng-select>
      <ng-select
        *ngSwitchCase="'single-select'"
        [style.height]="auto"
        tabindex="0"
        [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"
        [options]="node.question.options"
        [multiple]="false"
      >
      </ng-select>
      <input
        class="form-control"
        *ngSwitchCase="'number'"
        [formControlName]="node.question.key"
        [attr.placeholder]="node.question.placeholder"
        [type]="'number'"
        [id]="node.question.key + 'id'"
        [step]="'any'"
        [min]="node.question.extras.questionOptions.min"
        [max]="node.question.extras.questionOptions.max"
      />
      <input
        class="form-control"
        *ngSwitchDefault
        [formControlName]="node.question.key"
        [attr.placeholder]="node.question.placeholder"
        [type]="node.question.renderingType"
        [id]="node.question.key + 'id'"
      />

      <div *ngSwitchCase="'radio'">
        <div *ngFor="let o of node.question.options">
          <label class="form-control no-border">
            <input
              type="radio"
              [formControlName]="node.question.key"
              [id]="node.question.key + 'id'"
              [value]="o.value"
            />
            {{ o.label }}
          </label>
        </div>
      </div>

      <div *ngSwitchCase="'checkbox'">
        <checkbox
          [id]="node.question.key + 'id'"
          [formControlName]="node.question.key"
          [options]="node.question.options"
          [selected]="node.control.value"
        ></checkbox>
      </div>

      <div
        *ngIf="
          node.question.enableHistoricalValue && node.question.historicalDisplay
        "
        style="margin-top: 2px"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9">
              <span class="text-warning">Previous Value: </span>
              <strong>{{ node.question.historicalDisplay?.text }}</strong>
              <span *ngIf="node.question.showHistoricalValueDate">
                <span> | </span>
                <strong class="text-primary"
                  >{{ node.question.historicalDisplay?._date }}
                </strong>
                <span
                  class="text-primary"
                  *ngIf="
                    node.question.historicalDisplay &&
                    node.question.historicalDisplay._date
                  "
                >
                  ({{ node.question.historicalDisplay._date | timeAgo }})</span
                >
              </span>
            </div>
            <button
              type="button"
              [node]="node"
              [name]="'historyValue'"
              class="btn btn-primary btn-small col-xs-3"
            >
              Use Value
            </button>
          </div>
        </div>
      </div>
      <appointments-overview [node]="node"></appointments-overview>
      <div *ngIf="hasErrors()">
        <p *ngFor="let e of errors()">
          <span class="text-danger">{{ e }}</span>
        </p>
      </div>
    </div>

    <div
      class="question-info col-md-12 col-lg-12 col-sm-12"
      id="{{ node.question.extras.id }}"
      *ngIf="
        node.question &&
        node.question.extras.questionInfo &&
        node.question.extras.questionInfo !== '' &&
        node.question.extras.questionInfo !== ' '
      "
    >
      {{ node.question.extras.questionInfo }}
    </div>
  </div>
</div>
<div
  *ngIf="node.question.controlType === 1"
  [hidden]="node.control.hidden"
  [ngClass]="{ disabled: node.control.disabled }"
>
  <!--ARRAY CONTROL-->
  <div [ngSwitch]="node.question.renderingType">
    <div class="well" style="padding: 2px" *ngSwitchCase="'repeating'">
      <h4 style="margin: 2px; font-weight: bold">{{ node.question.label }}</h4>
      <hr
        style="
          margin-left: -2px;
          margin-right: -2px;
          margin-bottom: 4px;
          margin-top: 8px;
          border-width: 2px;
        "
      />
      <div [ngSwitch]="node.question.extras.type">
        <div *ngSwitchCase="'testOrder'">
          <div *ngFor="let child of node.children; let i = index">
            <form-renderer
              *ngFor="let question of child.question.questions"
              [parentComponent]="this"
              [node]="child.children[question.key]"
              [parentGroup]="child.control"
            ></form-renderer>
            <div>{{ child.orderNumber }}</div>
            <button
              type="button "
              class="btn btn-sm btn-danger"
              (click)="node.removeAt(i)"
            >
              Remove
            </button>
            <br />
            <hr
              style="
                margin-left: -2px;
                margin-right: -2px;
                margin-bottom: 4px;
                margin-top: 8px;
                border-width: 1px;
              "
            />
          </div>
        </div>

        <div *ngSwitchCase="'obsGroup'" style="margin-bottom: 20px">
          <div *ngFor="let child of node.children; let i = index">
            <form-renderer
              *ngFor="let question of child.question.questions"
              [parentComponent]="this"
              [node]="child.children[question.key]"
              [parentGroup]="child.control"
            ></form-renderer>
            <button
              type="button "
              class="btn btn-sm btn-danger"
              (click)="node.removeAt(i)"
            >
              Remove
            </button>
            <br />
            <hr
              style="
                margin-left: -2px;
                margin-right: -2px;
                margin-bottom: 4px;
                margin-top: 8px;
                border-width: 1px;
              "
            />
          </div>
        </div>
      </div>
      <button
        type="button "
        class="btn btn-primary"
        (click)="node.createChildNode()"
      >
        Add
      </button>
    </div>
  </div>
</div>
<div
  *ngIf="node.question.controlType === 2"
  [hidden]="node.control.hidden"
  [ngClass]="{ disabled: node.control.disabled }"
>
  <!--GROUP-->
  <div [ngSwitch]="node.question.renderingType">
    <div *ngSwitchCase="'group'">
      <form-renderer
        *ngFor="let question of node.question.questions"
        [parentComponent]="this"
        [node]="node.children[question.key]"
        [parentGroup]="node.control"
      ></form-renderer>
    </div>
    <div
      *ngSwitchCase="'field-set'"
      style="border: 1px solid #eeeeee; padding: 2px; margin: 2px"
    >
      <form-renderer
        *ngFor="let question of node.question.questions"
        [parentComponent]="this"
        [node]="node.children[question.key]"
        [parentGroup]="node.control"
      ></form-renderer>
    </div>
  </div>
</div>
`,
                styles: ['../../style/app.css', DEFAULT_STYLES]
            },] },
];
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: DataSources },
    { type: FormErrorsService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
FormRendererComponent.propDecorators = {
    parentComponent: [{ type: Input }],
    node: [{ type: Input }],
    parentGroup: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsTUFBTSxFQUdQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQVksU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXBFLDJFQUEyRTtBQUMzRSwrQkFBK0I7QUFFL0Isd0dBQXdHO0FBQ3hHLHFEQUFxRDtBQWdickQsTUFBTTtJQVlKLDZCQUE2QjtJQUM3Qix3QkFBd0I7SUFDeEIsdUNBQXVDO0lBRXZDLFlBQ1UsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNsQixRQUFhO1FBSC9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBaEJsQyxvQkFBZSxHQUE0QixFQUFFLENBQUM7UUFLOUMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFhekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUEwQixDQUFDLFVBQVUsQ0FBQztRQUN2RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEtBQTRCO1FBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxpQkFBaUI7UUFDdEIsRUFBRSxDQUFDLENBQ0QsSUFBSSxDQUFDLElBQUk7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxlQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNELHlGQUF5RjtZQUN6RixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQzlCLENBQUM7WUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBcUJFO1lBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7WUFDM0UsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sZUFBZTtRQUNwQixFQUFFLENBQUMsQ0FDRCxJQUFJLENBQUMsSUFBSTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUM5QixDQUFDO1lBQ0YsMENBQTBDO1lBQzFDLCtDQUErQztRQUNqRCxDQUFDO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFjO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDaEMsTUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FDekQsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDNUMsQ0FBQztnQkFDSixDQUFDO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksbUJBQW1CLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxRQUFRLENBQUMsU0FBUztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRU0sZUFBZTtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRU0saUJBQWlCO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLFdBQVc7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUNNLFdBQVcsQ0FBQyxNQUFNO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ00sY0FBYztRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JFLENBQUM7SUFDSCxDQUFDO0lBQ00sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDL0QsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLGVBQWUsQ0FBQyxLQUFhO1FBQ2xDLE1BQU0sR0FBRyxHQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU5QyxxQkFBcUI7UUFDckIsTUFBTSxZQUFZLEdBQTBCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2Qsc0JBQXNCO1lBQ3RCLFlBQVksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUU1QixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5RCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2hCLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNsRSxDQUFDO2dCQUNILENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVNLGFBQWEsQ0FBQyxJQUFjO1FBQ2pDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUs7UUFDakIsK0JBQStCO1FBQy9CLHdDQUF3QztJQUMxQyxDQUFDO0lBRU0saUJBQWlCLENBQUMsTUFBTTtRQUM3QixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM1QixDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLFNBQVMsQ0FBQyxJQUFjO1FBQzlCLE1BQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQzs7O1lBem9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F5YVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDO2FBQ2hEOzs7WUF2YlEsaUJBQWlCO1lBSGpCLFdBQVc7WUFLWCxpQkFBaUI7NENBMGNyQixNQUFNLFNBQUMsUUFBUTs7OzhCQW5CakIsS0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBERUZBVUxUX1NUWUxFUyB9IGZyb20gJy4vZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWdyb3VwJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuLy8gaW1wb3J0IHsgY29uY2F0LCBvZiwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vLyBpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8vIGltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwLCBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGU6IGA8IS0tQ09OVEFJTkVSUy0tPlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nXCI+XG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi10YWJzIGZvcm1zLWRyb3Bkb3duXCI+XG4gICAgPGEgY2xhc3M9XCJidG4gZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtZG93blwiPjwvaT5cbiAgICA8L2E+XG4gICAgPHVsXG4gICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBmb3Jtcy1kcm9wZG93bi1tZW51XCJcbiAgICAgIHJvbGU9XCJtZW51XCJcbiAgICAgIGFyaWEtbGFiZWxsZWRieT1cImRyb3Bkb3duTWVudVwiXG4gICAgPlxuICAgICAgPGxpXG4gICAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIChjbGljayk9XCJjbGlja1RhYihpKVwiXG4gICAgICA+XG4gICAgICAgIHt7IHF1ZXN0aW9uLmxhYmVsIH19XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuICA8bWF0LXRhYi1ncm91cFxuICAgIChzZWxlY3RlZEluZGV4Q2hhbmdlKT1cInRhYlNlbGVjdGVkKCRldmVudClcIlxuICAgIFtzZWxlY3RlZEluZGV4XT1cImFjdGl2ZVRhYlwiXG4gID5cbiAgICA8bWF0LXRhYlxuICAgICAgW2xhYmVsXT1cInF1ZXN0aW9uLmxhYmVsXCJcbiAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgPlxuICAgICAgPGRpdiAoc3dpcGVMZWZ0KT1cImxvYWROZXh0VGFiKClcIiAoc3dpcGVSaWdodCk9XCJsb2FkUHJldmlvdXNUYWIoKVwiPlxuICAgICAgICA8Zm9ybS1yZW5kZXJlclxuICAgICAgICAgIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgICBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sXCJcbiAgICAgICAgPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWF0LXRhYj5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG4gIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgIChjbGljayk9XCJsb2FkUHJldmlvdXNUYWIoKVwiXG4gICAgICBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBpc0N1cnJlbnRUYWJGaXJzdCgpIH1cIlxuICAgID5cbiAgICAgICZsdDsmbHQ7XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAoY2xpY2spPVwibG9hZE5leHRUYWIoKVwiXG4gICAgICBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBpc0N1cnJlbnRUYWJMYXN0KCkgfVwiXG4gICAgPlxuICAgICAgJmd0OyZndDtcbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJ1wiPlxuICA8IS0tPGgyPnt7bm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oMj4tLT5cbiAgPGZvcm0tcmVuZGVyZXJcbiAgICAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIlxuICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIlxuICA+PC9mb3JtLXJlbmRlcmVyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicgJiYgY2hlY2tTZWN0aW9uKG5vZGUpXCI+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIlxuICAgICAgICAoY2xpY2spPVwiaXNDb2xsYXBzZWQgPSAhaXNDb2xsYXBzZWRcIlxuICAgICAgPlxuICAgICAgICB7eyBpc0NvbGxhcHNlZCA/ICdTaG93JyA6ICdIaWRlJyB9fVxuICAgICAgPC9idXR0b24+XG4gICAgICB7eyBub2RlLnF1ZXN0aW9uLmxhYmVsIH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBbY29sbGFwc2VdPVwiaXNDb2xsYXBzZWRcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyXG4gICAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiXG4gICAgICA+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIE1FU1NBR0VTIC0tPlxuPGRpdlxuICAqbmdJZj1cIm5vZGUuY29udHJvbCAmJiBub2RlLmNvbnRyb2wuYWxlcnQgJiYgbm9kZS5jb250cm9sLmFsZXJ0ICE9PSAnJ1wiXG4gIGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiXG4+XG4gIDxhIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiPiZ0aW1lczs8L2E+IHt7IG5vZGUuY29udHJvbC5hbGVydCB9fVxuPC9kaXY+XG5cbjwhLS1DT05UUk9MUy0tPlxuXG48ZGl2XG4gICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiXG4gIGNsYXNzPVwiZm9ybS1ncm91cFwiXG4gIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIlxuICBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIlxuICBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBub2RlLmNvbnRyb2wuZGlzYWJsZWQgfVwiXG4+XG4gIDwhLS1MRUFGIENPTlRST0wtLT5cbiAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uLWFyZWFcIj5cbiAgICA8YVxuICAgICAgY2xhc3M9XCJmb3JtLXRvb2x0aXAgcHVsbC1yaWdodFwiXG4gICAgICAoY2xpY2spPVwidG9nZ2xlSW5mb3JtYXRpb24obm9kZS5xdWVzdGlvbi5leHRyYXMuaWQpXCJcbiAgICAgIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIlxuICAgICAgKm5nSWY9XCJcbiAgICAgICAgbm9kZS5xdWVzdGlvbiAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gIT09ICcgJ1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L2E+XG5cbiAgICA8bGFiZWxcbiAgICAgICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5sYWJlbFwiXG4gICAgICBbc3R5bGUuY29sb3JdPVwiaGFzRXJyb3JzKCkgPyAncmVkJyA6ICcnXCJcbiAgICAgIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiXG4gICAgICBbYXR0ci5mb3JdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgID5cbiAgICAgIHt7IG5vZGUucXVlc3Rpb24ucmVxdWlyZWQgPyAnKicgOiAnJyB9fSB7eyBub2RlLnF1ZXN0aW9uLmxhYmVsIH19XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICA+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2Ygbm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW25nVmFsdWVdPVwiby52YWx1ZVwiPlxuICAgICAgICAgIHt7IG8ubGFiZWwgfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cblxuICAgICAgPGFwcC1maWxlLXVwbG9hZFxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2ZpbGUnXCJcbiAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgKGZpbGVDaGFuZ2VkKT1cInVwbG9hZCgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgIDwvYXBwLWZpbGUtdXBsb2FkPlxuICAgICAgPHRleHRhcmVhXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgW3Jvd3NdPVwibm9kZS5xdWVzdGlvbi5yb3dzXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgID5cbiAgICAgIDwvdGV4dGFyZWE+XG4gICAgICA8IS0tXG4gICAgICA8bmctc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIiBbaXRlbXNdPVwiaXRlbXMkIHwgYXN5bmNcIiBiaW5kTGFiZWw9XCJsYWJlbFwiIGJpbmRWYWx1ZT1cInZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ7e25vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXJ9fVwiXG4gICAgICAgIFtoaWRlU2VsZWN0ZWRdPVwidHJ1ZVwiIFtsb2FkaW5nXT1cIml0ZW1zTG9hZGluZ1wiICBbdHlwZWFoZWFkXT1cIml0ZW1zSW5wdXQkXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgIC0tPlxuICAgICAgPHJlbW90ZS1zZWxlY3RcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgIFtjb21wb25lbnRJRF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICA+PC9yZW1vdGUtc2VsZWN0PlxuICAgICAgPCEtLSAgXG4gICAgICA8ZGF0ZS10aW1lLXBpY2tlciAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgW3Nob3dUaW1lXT1cIm5vZGUucXVlc3Rpb24uc2hvd1RpbWVcIiB0YWJpbmRleD1cIjBcIiBbd2Vla3NdPSdub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0J1xuICAgICAgICAob25EYXRlQ2hhbmdlKT1cIm9uRGF0ZUNoYW5nZWQobm9kZSlcIiBbc2hvd1dlZWtzXT1cIm5vZGUucXVlc3Rpb24uc2hvd1dlZWtzQWRkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPjwvZGF0ZS10aW1lLXBpY2tlcj5cbiAgLS0+XG5cbiAgICAgIDxuZ3gtZGF0ZS10aW1lLXBpY2tlclxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCJcbiAgICAgICAgW3Nob3dUaW1lXT1cIm5vZGUucXVlc3Rpb24uc2hvd1RpbWVcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFt3ZWVrc109XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0XCJcbiAgICAgICAgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCJcbiAgICAgICAgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCJcbiAgICAgID48L25neC1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgPG5nLXNlbGVjdFxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ211bHRpLXNlbGVjdCdcIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0XT1cIidhdXRvJ1wiXG4gICAgICAgIFtzdHlsZS5vdmVyZmxvdy14XT1cIidoaWRkZW4nXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIlxuICAgICAgICBbbXVsdGlwbGVdPVwidHJ1ZVwiXG4gICAgICA+XG4gICAgICA8L25nLXNlbGVjdD5cbiAgICAgIDxuZy1zZWxlY3RcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidzaW5nbGUtc2VsZWN0J1wiXG4gICAgICAgIFtzdHlsZS5oZWlnaHRdPVwiYXV0b1wiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCJcbiAgICAgICAgW211bHRpcGxlXT1cImZhbHNlXCJcbiAgICAgID5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgPGlucHV0XG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCJcbiAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXJcIlxuICAgICAgICBbdHlwZV09XCInbnVtYmVyJ1wiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICBbc3RlcF09XCInYW55J1wiXG4gICAgICAgIFttaW5dPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1pblwiXG4gICAgICAgIFttYXhdPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1heFwiXG4gICAgICAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgKm5nU3dpdGNoRGVmYXVsdFxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiXG4gICAgICAgIFt0eXBlXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgLz5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbCBuby1ib3JkZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJvLnZhbHVlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7eyBvLmxhYmVsIH19XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2NoZWNrYm94J1wiPlxuICAgICAgICA8Y2hlY2tib3hcbiAgICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgICBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIlxuICAgICAgICAgIFtzZWxlY3RlZF09XCJub2RlLmNvbnRyb2wudmFsdWVcIlxuICAgICAgICA+PC9jaGVja2JveD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheVxuICAgICAgICBcIlxuICAgICAgICBzdHlsZT1cIm1hcmdpbi10b3A6IDJweFwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTlcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5QcmV2aW91cyBWYWx1ZTogPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nPnt7IG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/LnRleHQgfX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+IHwgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgPnt7IG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/Ll9kYXRlIH19XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXkgJiZcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheS5fZGF0ZVxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAoe3sgbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheS5fZGF0ZSB8IHRpbWVBZ28gfX0pPC9zcGFuXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICAgICAgICBbbmFtZV09XCInaGlzdG9yeVZhbHVlJ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbWFsbCBjb2wteHMtM1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVzZSBWYWx1ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YXBwb2ludG1lbnRzLW92ZXJ2aWV3IFtub2RlXT1cIm5vZGVcIj48L2FwcG9pbnRtZW50cy1vdmVydmlldz5cbiAgICAgIDxkaXYgKm5nSWY9XCJoYXNFcnJvcnMoKVwiPlxuICAgICAgICA8cCAqbmdGb3I9XCJsZXQgZSBvZiBlcnJvcnMoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIj57eyBlIH19PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicXVlc3Rpb24taW5mbyBjb2wtbWQtMTIgY29sLWxnLTEyIGNvbC1zbS0xMlwiXG4gICAgICBpZD1cInt7IG5vZGUucXVlc3Rpb24uZXh0cmFzLmlkIH19XCJcbiAgICAgICpuZ0lmPVwiXG4gICAgICAgIG5vZGUucXVlc3Rpb24gJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICYmXG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcbiAgICAgIFwiXG4gICAgPlxuICAgICAge3sgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvIH19XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2XG4gICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMVwiXG4gIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiXG4gIFtuZ0NsYXNzXT1cInsgZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZCB9XCJcbj5cbiAgPCEtLUFSUkFZIENPTlRST0wtLT5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCI+XG4gICAgPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInBhZGRpbmc6IDJweFwiICpuZ1N3aXRjaENhc2U9XCIncmVwZWF0aW5nJ1wiPlxuICAgICAgPGg0IHN0eWxlPVwibWFyZ2luOiAycHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+e3sgbm9kZS5xdWVzdGlvbi5sYWJlbCB9fTwvaDQ+XG4gICAgICA8aHJcbiAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICBtYXJnaW4tbGVmdDogLTJweDtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IC0ycHg7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlXCI+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXN0T3JkZXInXCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgPGZvcm0tcmVuZGVyZXJcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICAgICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgICAgICAgIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgICAgICAgICAgICBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbFwiXG4gICAgICAgICAgICA+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgICAgICAgPGRpdj57eyBjaGlsZC5vcmRlck51bWJlciB9fTwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uIFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBSZW1vdmVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8aHJcbiAgICAgICAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogLTJweDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IC0ycHg7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAgICAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidvYnNHcm91cCdcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHhcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlclxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zXCJcbiAgICAgICAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgICAgICAgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgICAgICAgIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sXCJcbiAgICAgICAgICAgID48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b24gXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kYW5nZXJcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwibm9kZS5yZW1vdmVBdChpKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxoclxuICAgICAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtMnB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogLTJweDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci13aWR0aDogMXB4O1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvbiBcIlxuICAgICAgICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgIChjbGljayk9XCJub2RlLmNyZWF0ZUNoaWxkTm9kZSgpXCJcbiAgICAgID5cbiAgICAgICAgQWRkXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXZcbiAgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAyXCJcbiAgW2hpZGRlbl09XCJub2RlLmNvbnRyb2wuaGlkZGVuXCJcbiAgW25nQ2xhc3NdPVwieyBkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkIH1cIlxuPlxuICA8IS0tR1JPVVAtLT5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCI+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2dyb3VwJ1wiPlxuICAgICAgPGZvcm0tcmVuZGVyZXJcbiAgICAgICAgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCJcbiAgICAgICAgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCJcbiAgICAgICAgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbFwiXG4gICAgICA+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXZcbiAgICAgICpuZ1N3aXRjaENhc2U9XCInZmllbGQtc2V0J1wiXG4gICAgICBzdHlsZT1cImJvcmRlcjogMXB4IHNvbGlkICNlZWVlZWU7IHBhZGRpbmc6IDJweDsgbWFyZ2luOiAycHhcIlxuICAgID5cbiAgICAgIDxmb3JtLXJlbmRlcmVyXG4gICAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiXG4gICAgICAgIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiXG4gICAgICAgIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgIFtwYXJlbnRHcm91cF09XCJub2RlLmNvbnRyb2xcIlxuICAgICAgPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogWycuLi8uLi9zdHlsZS9hcHAuY3NzJywgREVGQVVMVF9TVFlMRVNdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG5vZGU6IE5vZGVCYXNlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgcHVibGljIGNoaWxkQ29tcG9uZW50czogRm9ybVJlbmRlcmVyQ29tcG9uZW50W10gPSBbXTtcbiAgcHVibGljIHNob3dUaW1lOiBib29sZWFuO1xuICBwdWJsaWMgc2hvd1dlZWtzOiBib29sZWFuO1xuICBwdWJsaWMgYWN0aXZlVGFiOiBudW1iZXI7XG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHVibGljIGF1dG86IGFueTtcblxuICAvLyBpdGVtcyQ6IE9ic2VydmFibGU8YW55W10+O1xuICAvLyBpdGVtc0xvYWRpbmcgPSBmYWxzZTtcbiAgLy8gaXRlbXNJbnB1dCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMsXG4gICAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldFVwUmVtb3RlU2VsZWN0KCk7XG4gICAgdGhpcy5zZXRVcEZpbGVVcGxvYWQoKTtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmxhc3RGb3JtVGFiO1xuICAgICAgaWYgKHRhYiAmJiB0YWIgIT09IHRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybScpIHtcbiAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkJC5zdWJzY3JpYmUoKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Db250cm9sKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJykge1xuICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9ICEodGhpcy5ub2RlLnF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXApLmlzRXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyZW50Q29tcG9uZW50KSB7XG4gICAgICB0aGlzLnBhcmVudENvbXBvbmVudC5hZGRDaGlsZENvbXBvbmVudCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkQ2hpbGRDb21wb25lbnQoY2hpbGQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzLnB1c2goY2hpbGQpO1xuICB9XG5cbiAgcHVibGljIHNldFVwUmVtb3RlU2VsZWN0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubm9kZSAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0J1xuICAgICkge1xuICAgICAgLy8gbGV0IHNlbGVjdFF1ZXN0aW9uID0gdGhpcy5ub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZCh0aGlzLm5vZGUucXVlc3Rpb24ua2V5KVswXTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbXG4gICAgICAgIHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXG4gICAgICBdO1xuICAgICAgLypcbiAgICAgIGxldCBkZWZhbHRWYWx1ZXMgPSBvZihbXSk7XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHNlbGVjdFF1ZXN0aW9uLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIGRlZmFsdFZhbHVlcyA9IHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShzZWxlY3RRdWVzdGlvbi5jb250cm9sLnZhbHVlKS5waXBlKFxuICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoW10pKSwgLy8gZW1wdHkgbGlzdCBvbiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5pdGVtcyQgPSBjb25jYXQoXG4gICAgICAgIGRlZmFsdFZhbHVlcyxcbiAgICAgICAgdGhpcy5pdGVtc0lucHV0JC5waXBlKFxuICAgICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgdGFwKCgpID0+IHRoaXMuaXRlbXNMb2FkaW5nID0gdHJ1ZSksXG4gICAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4gdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnModGVybSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoW10pKSwgLy8gZW1wdHkgbGlzdCBvbiBlcnJvclxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgKi9cbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhU291cmNlT3B0aW9ucyA9IHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VXBGaWxlVXBsb2FkKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubm9kZSAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJ1xuICAgICkge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tcbiAgICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VcbiAgICAgIF07XG4gICAgICAvLyBjb25zb2xlLmxvZygnS2V5JywgdGhpcy5ub2RlLnF1ZXN0aW9uKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhIHNvdXJjZScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTZWN0aW9uKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICBsZXQgZ3JvdXBDaGlsZHJlbkhpZGRlbiA9IGZhbHNlO1xuICAgICAgY29uc3QgYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikuZXZlcnkoKGspID0+IHtcbiAgICAgICAgY29uc3QgaW5uZXJOb2RlID0gbm9kZS5jaGlsZHJlbltrXTtcbiAgICAgICAgaWYgKGlubmVyTm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgIGdyb3VwQ2hpbGRyZW5IaWRkZW4gPSBPYmplY3Qua2V5cyhpbm5lck5vZGUuY2hpbGRyZW4pLmV2ZXJ5KFxuICAgICAgICAgICAgKGkpID0+IGlubmVyTm9kZS5jaGlsZHJlbltpXS5jb250cm9sLmhpZGRlblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW5ba10uY29udHJvbC5oaWRkZW4gfHwgZ3JvdXBDaGlsZHJlbkhpZGRlbjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICFhbGxTZWN0aW9uQ29udHJvbHNIaWRkZW47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsaWNrVGFiKHRhYk51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiRmlyc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiAtIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0N1cnJlbnRUYWJGaXJzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWIgPT09IDA7XG4gIH1cblxuICBwdWJsaWMgaXNDdXJyZW50VGFiTGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWIgPT09IHRoaXMubm9kZS5xdWVzdGlvblsncXVlc3Rpb25zJ10ubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkTmV4dFRhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiTGFzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiICsgMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG4gIHB1YmxpYyB0YWJTZWxlY3RlZCgkZXZlbnQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9ICRldmVudDtcbiAgICB0aGlzLnNldFByZXZpb3VzVGFiKCk7XG4gIH1cbiAgcHVibGljIHNldFByZXZpb3VzVGFiKCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm9bJ2xhc3RGb3JtVGFiJ10gPSB0aGlzLmFjdGl2ZVRhYjtcbiAgICB9XG4gIH1cbiAgcHVibGljIGhhc0Vycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmNvbnRyb2wudG91Y2hlZCAmJiAhdGhpcy5ub2RlLmNvbnRyb2wudmFsaWQ7XG4gIH1cblxuICBwdWJsaWMgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cbiAgcHVibGljIHNjcm9sbFRvQ29udHJvbChlcnJvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgdGFiOiBudW1iZXIgPSArZXJyb3Iuc3BsaXQoJywnKVswXTtcbiAgICBjb25zdCBlbFNlbGVjdG9yID0gZXJyb3Iuc3BsaXQoJywnKVsxXSArICdpZCc7XG5cbiAgICAvLyB0aGUgdGFiIGNvbXBvbmVudHNcbiAgICBjb25zdCB0YWJDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRzW3RhYl07XG5cbiAgICB0aGlzLmNsaWNrVGFiKHRhYik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGV4cGFuZCBhbGwgc2VjdGlvbnNcbiAgICAgIHRhYkNvbXBvbmVudC5jaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbFNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRhdGVDaGFuZ2VkKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ05vZGUnLCBub2RlKTtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdFdmVudCcsIGV2ZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnRGF0YScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlSW5mb3JtYXRpb24oaW5mb0lkKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZm9JZCk7XG5cbiAgICBpZiAoZS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ0luZm9JZCcsIGluZm9JZCk7XG4gIH1cblxuICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19