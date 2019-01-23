/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?} validationFactory
     * @param {?} dataSources
     * @param {?} formErrorsService
     * @param {?} document
     */
    constructor(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.activeTab = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            /** @type {?} */
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
            this.isCollapsed = !((/** @type {?} */ (this.node.question))).isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    addChildComponent(child) {
        this.childComponents.push(child);
    }
    /**
     * @return {?}
     */
    setUpRemoteSelect() {
        if (this.node && this.node.question.extras &&
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
    /**
     * @return {?}
     */
    setUpFileUpload() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    checkSection(node) {
        if (node.question.renderingType === 'section') {
            /** @type {?} */
            let groupChildrenHidden = false;
            /** @type {?} */
            let allSectionControlsHidden = Object.keys(node.children).every((k) => {
                /** @type {?} */
                let innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden = Object.keys(innerNode.children).every((i) => innerNode.children[i].control.hidden);
                }
                return node.children[k].control.hidden || groupChildrenHidden;
            });
            return !allSectionControlsHidden;
        }
        return true;
    }
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }
    /**
     * @return {?}
     */
    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @return {?}
     */
    isCurrentTabFirst() {
        return this.activeTab === 0;
    }
    /**
     * @return {?}
     */
    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }
    /**
     * @return {?}
     */
    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    tabSelected($event) {
        this.activeTab = $event.index;
        this.setPreviousTab();
    }
    /**
     * @return {?}
     */
    setPreviousTab() {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    }
    /**
     * @return {?}
     */
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }
    /**
     * @return {?}
     */
    errors() {
        return this.getErrors(this.node);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    scrollToControl(error) {
        /** @type {?} */
        const tab = +error.split(',')[0];
        /** @type {?} */
        const elSelector = error.split(',')[1] + 'id';
        // the tab components
        /** @type {?} */
        const tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    /** @type {?} */
                    const element = this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    onDateChanged(node) {
        // console.log('Node', node);
        this.node = node;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    upload(event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    }
    /**
     * @param {?} infoId
     * @return {?}
     */
    toggleInformation(infoId) {
        /** @type {?} */
        const e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    getErrors(node) {
        /** @type {?} */
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
    <ul class="dropdown-menu dropdown-menu-right forms-dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
      <li *ngFor="let question of node.question.questions; let i = index;" (click)="clickTab(i)">
        {{question.label}}
      </li>
    </ul>
  </div>
  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>
    <mat-tab [label]='question.label' *ngFor="let question of node.question.questions; let i = index;">
      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>
        <form-renderer [node]="node.children[question.key]" [parentComponent]="this" [parentGroup]="node.control"></form-renderer>
      </div>
    </mat-tab>
  </mat-tab-group>

  <div style="text-align: center;">
    <button type="button" class="btn btn-default" (click)="loadPreviousTab()" [ngClass]="{disabled: isCurrentTabFirst()}">&lt;&lt;</button>
    <button type="button" class="btn btn-default" (click)="loadNextTab()" [ngClass]="{disabled: isCurrentTabLast()}">
      &gt;&gt;</button>
  </div>
</div>
<div *ngIf="node.question.renderingType === 'page'">
  <!--<h2>{{node.question.label}}</h2>-->
  <form-renderer *ngFor="let question of node.question.questions" [parentComponent]="this" [node]="node.children[question.key]"
    [parentGroup]="parentGroup"></form-renderer>
</div>
<div *ngIf="node.question.renderingType === 'section' && checkSection(node)"> 
  <div class="panel  panel-primary">
    <div class="panel-heading">
      <button type="button" class="btn btn-primary pull-right" (click)="isCollapsed = !isCollapsed">
        {{isCollapsed ? 'Show' : 'Hide'}}
      </button> {{node.question.label}}
    </div>
    <div class="panel-body" [collapse]="isCollapsed">
      <form-renderer *ngFor="let question of node.question.questions" [parentComponent]="this" [node]="node.children[question.key]"
        [parentGroup]="parentGroup"></form-renderer>
    </div>
  </div>
</div>

<!-- MESSAGES -->
<div *ngIf="node.control && node.control.alert && node.control.alert !== ''" class="alert alert-warning">
  <a class="close" data-dismiss="alert">&times;</a> {{node.control.alert}}
</div>

<!--CONTROLS-->

<div *ngIf="node.question.controlType === 0" class="form-group" [formGroup]="parentGroup" [hidden]="node.control.hidden"
  [ngClass]="{disabled: node.control.disabled}">
  <!--LEAF CONTROL-->
  <div class="question-area">
    <a class="form-tooltip pull-right" (click)="toggleInformation(node.question.extras.id)" data-placement="right"
      *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
      <i class="glyphicon glyphicon-question-sign" aria-hidden="true"></i>
    </a>

    <label *ngIf="node.question.label" [style.color]="hasErrors()? 'red' :''" class="control-label" [attr.for]="node.question.key">
      {{node.question.required === true ? '*':''}} {{node.question.label}}
    </label>
    <div [ngSwitch]="node.question.renderingType">
      <select class="form-control" *ngSwitchCase="'select'" [formControlName]="node.question.key" [id]="node.question.key + 'id'">
        <option *ngFor="let o of node.question.options" [ngValue]="o.value">{{o.label}}
        </option>
      </select>

      <remote-file-upload *ngSwitchCase="'file'" [dataSource]="dataSource" [formControlName]="node.question.key" [id]="node.question.key + 'id'"
        (fileChanged)="upload($event)">
      </remote-file-upload>
      <textarea [placeholder]="node.question.placeholder" [rows]="node.question.rows" class="form-control"
        *ngSwitchCase="'textarea'" [formControlName]="node.question.key" [id]="node.question.key + 'id'">
      </textarea>
      <!--
      <ng-select *ngSwitchCase="'remote-select'" [items]="items$ | async" bindLabel="label" bindValue="value" placeholder="{{node.question.placeholder}}"
        [hideSelected]="true" [loading]="itemsLoading"  [typeahead]="itemsInput$" [formControlName]="node.question.key" [id]="node.question.key + 'id'">
      </ng-select>
    -->
      <remote-select *ngSwitchCase="'remote-select'" [placeholder]="node.question.placeholder" tabindex="0"
        [dataSource]="dataSource" [componentID]="node.question.key + 'id'" [formControlName]="node.question.key" [id]="node.question.key + 'id'"></remote-select>
      <!--  
      <date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" tabindex="0" [weeks]='node.question.extras.questionOptions.weeksList'
        (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"></date-time-picker>
  -->

      <ngx-date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" [id]="node.question.key + 'id'"
        [formControlName]="node.question.key" [weeks]='node.question.extras.questionOptions.weeksList' (onDateChange)="onDateChanged(node)"
        [showWeeks]="node.question.showWeeksAdder"></ngx-date-time-picker>
      <ng-select *ngSwitchCase="'multi-select'" [style.height]="'auto'"  [style.overflow-x]="'hidden'" tabindex="0" [formControlName]="node.question.key" [id]="node.question.key + 'id'"
          [options]="node.question.options" [multiple]="true">
      </ng-select>
      <ng-select *ngSwitchCase="'single-select'" [style.height]='auto'  tabindex="0" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'" [options]="node.question.options" [multiple]="false">
      </ng-select>
      <input class="form-control" *ngSwitchCase="'number'" [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="'number'" [id]="node.question.key + 'id' " [step]="'any'" [min]="node.question.extras.questionOptions.min"
        [max]="node.question.extras.questionOptions.max">
      <input class="form-control" *ngSwitchDefault [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="node.question.renderingType" [id]="node.question.key + 'id' ">

      <div *ngSwitchCase="'radio'">
        <div *ngFor="let o of node.question.options">
          <label class="form-control no-border">
            <input type="radio" [formControlName]="node.question.key" [id]="node.question.key + 'id'" [value]="o.value">
            {{ o.label }}
          </label>
        </div>
      </div>

      <div *ngSwitchCase="'checkbox'">
        <checkbox [id]="node.question.key + 'id'" [formControlName]="node.question.key" [options]="node.question.options"></checkbox>
      </div>

      <div *ngIf="node.question.enableHistoricalValue && node.question.historicalDisplay" style="margin-top: 2px;">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9">
              <span class="text-warning">Previous Value: </span>
              <strong>{{node.question.historicalDisplay?.text}}</strong>
              <span *ngIf="node.question.showHistoricalValueDate">
                <span> | </span>
                <strong class="text-primary">{{node.question.historicalDisplay?._date}} </strong>
                <span class="text-primary" *ngIf="node.question.historicalDisplay && node.question.historicalDisplay._date "> ({{node.question.historicalDisplay._date | timeAgo}})</span>
              </span>

            </div>
            <button type="button" [node]="node" [name]="'historyValue'" class="btn btn-primary btn-small col-xs-3">Use
              Value
            </button>
          </div>
        </div>
      </div>
      <appointments-overview [node]="node"></appointments-overview>
      <div *ngIf="hasErrors() ">
        <p *ngFor="let e of errors() ">
          <span class="text-danger ">{{e}}</span>
        </p>
      </div>
    </div>

    <div class="question-info col-md-12 col-lg-12 col-sm-12" id="{{node.question.extras.id}}" *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
      {{node.question.extras.questionInfo}}
    </div>

  </div>
</div>
<div *ngIf="node.question.controlType === 1" [hidden]="node.control.hidden" [ngClass]="{disabled: node.control.disabled}">


  <!--ARRAY CONTROL-->
  <div [ngSwitch]="node.question.renderingType ">
    <div class='well' style="padding: 2px; " *ngSwitchCase=" 'repeating' ">
      <h4 style="margin: 2px; font-weight: bold;">{{node.question.label}}</h4>
      <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;" />
      <div [ngSwitch]="node.question.extras.type">
        <div *ngSwitchCase="'testOrder'">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            "
              [parentGroup]="child.control "></form-renderer>
            <div>{{child.orderNumber}}</div>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br />
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>

        <div *ngSwitchCase="'obsGroup'" style="margin-bottom:20px;">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            "
              [parentGroup]="child.control "></form-renderer>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br />
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>
      </div>
      <button type="button " class='btn btn-primary' (click)="node.createChildNode() ">Add</button>
    </div>
  </div>

</div>
<div *ngIf="node.question.controlType === 2" [hidden]="node.control.hidden" [ngClass]="{disabled: node.control.disabled}">

  <!--GROUP-->
  <div [ngSwitch]="node.question.renderingType ">
    <div *ngSwitchCase=" 'group' ">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            "
        [parentGroup]="node.control "></form-renderer>
    </div>
    <div *ngSwitchCase=" 'field-set' " style="border: 1px solid #eeeeee; padding: 2px; margin: 2px;">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            "
        [parentGroup]="node.control "></form-renderer>
    </div>
  </div>

</div>`,
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
if (false) {
    /** @type {?} */
    FormRendererComponent.prototype.parentComponent;
    /** @type {?} */
    FormRendererComponent.prototype.node;
    /** @type {?} */
    FormRendererComponent.prototype.parentGroup;
    /** @type {?} */
    FormRendererComponent.prototype.childComponents;
    /** @type {?} */
    FormRendererComponent.prototype.showTime;
    /** @type {?} */
    FormRendererComponent.prototype.showWeeks;
    /** @type {?} */
    FormRendererComponent.prototype.activeTab;
    /** @type {?} */
    FormRendererComponent.prototype.dataSource;
    /** @type {?} */
    FormRendererComponent.prototype.isCollapsed;
    /** @type {?} */
    FormRendererComponent.prototype.auto;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.validationFactory;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.dataSources;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.formErrorsService;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7O0FBd05wRSxNQUFNOzs7Ozs7Ozs7O0lBa0JKLFlBQ1UsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNsQixRQUFhO1FBSC9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBaEJsQyxvQkFBZSxHQUE0QixFQUFFLENBQUM7UUFLOUMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFZekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJ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Z0JBQ0wsTUFBTSxFQUFFLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDO2FBQ2hEOzs7WUF6TlEsaUJBQWlCO1lBSGpCLFdBQVc7WUFLWCxpQkFBaUI7NENBOE9yQixNQUFNLFNBQUMsUUFBUTs7OzhCQW5CakIsS0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUs7Ozs7SUFGTixnREFBdUQ7O0lBQ3ZELHFDQUErQjs7SUFDL0IsNENBQTBDOztJQUMxQyxnREFBcUQ7O0lBQ3JELHlDQUF5Qjs7SUFDekIsMENBQTBCOztJQUMxQiwwQ0FBeUI7O0lBQ3pCLDJDQUE4Qjs7SUFDOUIsNENBQTJCOztJQUMzQixxQ0FBaUI7Ozs7O0lBT2Ysa0RBQTRDOzs7OztJQUM1Qyw0Q0FBZ0M7Ozs7O0lBQ2hDLGtEQUE0Qzs7Ozs7SUFDNUMseUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlLCBHcm91cE5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbi8vIGltcG9ydCB7IGNvbmNhdCwgb2YsIE9ic2VydmFibGUsIFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLy8gaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG4vLyBpbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCwgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybS1yZW5kZXJlcicsXG4gIHRlbXBsYXRlOiBgPCEtLUNPTlRBSU5FUlMtLT5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJ1wiPlxuICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHJvcGRvd24tdGFicyBmb3Jtcy1kcm9wZG93blwiPlxuICAgIDxhIGNsYXNzPVwiYnRuIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtZG91YmxlLWRvd25cIj48L2k+XG4gICAgPC9hPlxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBmb3Jtcy1kcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cImNsaWNrVGFiKGkpXCI+XG4gICAgICAgIHt7cXVlc3Rpb24ubGFiZWx9fVxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cbiAgPG1hdC10YWItZ3JvdXAgKHNlbGVjdGVkSW5kZXhDaGFuZ2UpPSd0YWJTZWxlY3RlZCgkZXZlbnQpJyBbc2VsZWN0ZWRJbmRleF09J2FjdGl2ZVRhYic+XG4gICAgPG1hdC10YWIgW2xhYmVsXT0ncXVlc3Rpb24ubGFiZWwnICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgIDxkaXYgKHN3aXBlTGVmdCk9J2xvYWROZXh0VGFiKCknIChzd2lwZVJpZ2h0KT0nbG9hZFByZXZpb3VzVGFiKCknPlxuICAgICAgICA8Zm9ybS1yZW5kZXJlciBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYXQtdGFiPlxuICA8L21hdC10YWItZ3JvdXA+XG5cbiAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJsb2FkUHJldmlvdXNUYWIoKVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogaXNDdXJyZW50VGFiRmlyc3QoKX1cIj4mbHQ7Jmx0OzwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cImxvYWROZXh0VGFiKClcIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGlzQ3VycmVudFRhYkxhc3QoKX1cIj5cbiAgICAgICZndDsmZ3Q7PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZSdcIj5cbiAgPCEtLTxoMj57e25vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDI+LS0+XG4gIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9mb3JtLXJlbmRlcmVyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicgJiYgY2hlY2tTZWN0aW9uKG5vZGUpXCI+IFxuICA8ZGl2IGNsYXNzPVwicGFuZWwgIHBhbmVsLXByaW1hcnlcIj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIChjbGljayk9XCJpc0NvbGxhcHNlZCA9ICFpc0NvbGxhcHNlZFwiPlxuICAgICAgICB7e2lzQ29sbGFwc2VkID8gJ1Nob3cnIDogJ0hpZGUnfX1cbiAgICAgIDwvYnV0dG9uPiB7e25vZGUucXVlc3Rpb24ubGFiZWx9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCIgW2NvbGxhcHNlXT1cImlzQ29sbGFwc2VkXCI+XG4gICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgICAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gTUVTU0FHRVMgLS0+XG48ZGl2ICpuZ0lmPVwibm9kZS5jb250cm9sICYmIG5vZGUuY29udHJvbC5hbGVydCAmJiBub2RlLmNvbnRyb2wuYWxlcnQgIT09ICcnXCIgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCI+XG4gIDxhIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiPiZ0aW1lczs8L2E+IHt7bm9kZS5jb250cm9sLmFsZXJ0fX1cbjwvZGl2PlxuXG48IS0tQ09OVFJPTFMtLT5cblxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDBcIiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbZm9ybUdyb3VwXT1cInBhcmVudEdyb3VwXCIgW2hpZGRlbl09XCJub2RlLmNvbnRyb2wuaGlkZGVuXCJcbiAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBub2RlLmNvbnRyb2wuZGlzYWJsZWR9XCI+XG4gIDwhLS1MRUFGIENPTlRST0wtLT5cbiAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uLWFyZWFcIj5cbiAgICA8YSBjbGFzcz1cImZvcm0tdG9vbHRpcCBwdWxsLXJpZ2h0XCIgKGNsaWNrKT1cInRvZ2dsZUluZm9ybWF0aW9uKG5vZGUucXVlc3Rpb24uZXh0cmFzLmlkKVwiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIlxuICAgICAgKm5nSWY9XCJub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcIj5cbiAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1xdWVzdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvYT5cblxuICAgIDxsYWJlbCAqbmdJZj1cIm5vZGUucXVlc3Rpb24ubGFiZWxcIiBbc3R5bGUuY29sb3JdPVwiaGFzRXJyb3JzKCk/ICdyZWQnIDonJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIFthdHRyLmZvcl09XCJub2RlLnF1ZXN0aW9uLmtleVwiPlxuICAgICAge3tub2RlLnF1ZXN0aW9uLnJlcXVpcmVkID09PSB0cnVlID8gJyonOicnfX0ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2xhYmVsPlxuICAgIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxuICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2Ygbm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW25nVmFsdWVdPVwiby52YWx1ZVwiPnt7by5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgIDxyZW1vdGUtZmlsZS11cGxvYWQgKm5nU3dpdGNoQ2FzZT1cIidmaWxlJ1wiIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICAgIChmaWxlQ2hhbmdlZCk9XCJ1cGxvYWQoJGV2ZW50KVwiPlxuICAgICAgPC9yZW1vdGUtZmlsZS11cGxvYWQ+XG4gICAgICA8dGV4dGFyZWEgW3BsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXJcIiBbcm93c109XCJub2RlLnF1ZXN0aW9uLnJvd3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj5cbiAgICAgIDwvdGV4dGFyZWE+XG4gICAgICA8IS0tXG4gICAgICA8bmctc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIiBbaXRlbXNdPVwiaXRlbXMkIHwgYXN5bmNcIiBiaW5kTGFiZWw9XCJsYWJlbFwiIGJpbmRWYWx1ZT1cInZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ7e25vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXJ9fVwiXG4gICAgICAgIFtoaWRlU2VsZWN0ZWRdPVwidHJ1ZVwiIFtsb2FkaW5nXT1cIml0ZW1zTG9hZGluZ1wiICBbdHlwZWFoZWFkXT1cIml0ZW1zSW5wdXQkXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgIC0tPlxuICAgICAgPHJlbW90ZS1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCIgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIFtjb21wb25lbnRJRF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPjwvcmVtb3RlLXNlbGVjdD5cbiAgICAgIDwhLS0gIFxuICAgICAgPGRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgdGFiaW5kZXg9XCIwXCIgW3dlZWtzXT0nbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCdcbiAgICAgICAgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCIgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L2RhdGUtdGltZS1waWNrZXI+XG4gIC0tPlxuXG4gICAgICA8bmd4LWRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbd2Vla3NdPSdub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0JyAob25EYXRlQ2hhbmdlKT1cIm9uRGF0ZUNoYW5nZWQobm9kZSlcIlxuICAgICAgICBbc2hvd1dlZWtzXT1cIm5vZGUucXVlc3Rpb24uc2hvd1dlZWtzQWRkZXJcIj48L25neC1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgPG5nLXNlbGVjdCAqbmdTd2l0Y2hDYXNlPVwiJ211bHRpLXNlbGVjdCdcIiBbc3R5bGUuaGVpZ2h0XT1cIidhdXRvJ1wiICBbc3R5bGUub3ZlcmZsb3cteF09XCInaGlkZGVuJ1wiIHRhYmluZGV4PVwiMFwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgICBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIiBbbXVsdGlwbGVdPVwidHJ1ZVwiPlxuICAgICAgPC9uZy1zZWxlY3Q+XG4gICAgICA8bmctc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCInc2luZ2xlLXNlbGVjdCdcIiBbc3R5bGUuaGVpZ2h0XT0nYXV0bycgIHRhYmluZGV4PVwiMFwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW211bHRpcGxlXT1cImZhbHNlXCI+XG4gICAgICA8L25nLXNlbGVjdD5cbiAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXkgXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlciBcIlxuICAgICAgICBbdHlwZV09XCInbnVtYmVyJ1wiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCcgXCIgW3N0ZXBdPVwiJ2FueSdcIiBbbWluXT1cIm5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5taW5cIlxuICAgICAgICBbbWF4XT1cIm5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5tYXhcIj5cbiAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaERlZmF1bHQgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleSBcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyIFwiXG4gICAgICAgIFt0eXBlXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCcgXCI+XG5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgbyBvZiBub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbm8tYm9yZGVyXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbdmFsdWVdPVwiby52YWx1ZVwiPlxuICAgICAgICAgICAge3sgby5sYWJlbCB9fVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidjaGVja2JveCdcIj5cbiAgICAgICAgPGNoZWNrYm94IFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCI+PC9jaGVja2JveD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheVwiIHN0eWxlPVwibWFyZ2luLXRvcDogMnB4O1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy05XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13YXJuaW5nXCI+UHJldmlvdXMgVmFsdWU6IDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHN0cm9uZz57e25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/LnRleHR9fTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uc2hvd0hpc3RvcmljYWxWYWx1ZURhdGVcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4gfCA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRleHQtcHJpbWFyeVwiPnt7bm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheT8uX2RhdGV9fSA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtcHJpbWFyeVwiICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheSAmJiBub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Ll9kYXRlIFwiPiAoe3tub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Ll9kYXRlIHwgdGltZUFnb319KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtub2RlXT1cIm5vZGVcIiBbbmFtZV09XCInaGlzdG9yeVZhbHVlJ1wiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbWFsbCBjb2wteHMtM1wiPlVzZVxuICAgICAgICAgICAgICBWYWx1ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YXBwb2ludG1lbnRzLW92ZXJ2aWV3IFtub2RlXT1cIm5vZGVcIj48L2FwcG9pbnRtZW50cy1vdmVydmlldz5cbiAgICAgIDxkaXYgKm5nSWY9XCJoYXNFcnJvcnMoKSBcIj5cbiAgICAgICAgPHAgKm5nRm9yPVwibGV0IGUgb2YgZXJyb3JzKCkgXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlciBcIj57e2V9fTwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24taW5mbyBjb2wtbWQtMTIgY29sLWxnLTEyIGNvbC1zbS0xMlwiIGlkPVwie3tub2RlLnF1ZXN0aW9uLmV4dHJhcy5pZH19XCIgKm5nSWY9XCJub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvfX1cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDFcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cblxuXG4gIDwhLS1BUlJBWSBDT05UUk9MLS0+XG4gIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSBcIj5cbiAgICA8ZGl2IGNsYXNzPSd3ZWxsJyBzdHlsZT1cInBhZGRpbmc6IDJweDsgXCIgKm5nU3dpdGNoQ2FzZT1cIiAncmVwZWF0aW5nJyBcIj5cbiAgICAgIDxoNCBzdHlsZT1cIm1hcmdpbjogMnB4OyBmb250LXdlaWdodDogYm9sZDtcIj57e25vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDQ+XG4gICAgICA8aHIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMnB4OyBtYXJnaW4tcmlnaHQ6LTJweDsgbWFyZ2luLWJvdHRvbTo0cHg7IG1hcmdpbi10b3A6OHB4OyBib3JkZXItd2lkdGg6MnB4O1wiIC8+XG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlXCI+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXN0T3JkZXInXCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgICAgIDxkaXY+e3tjaGlsZC5vcmRlck51bWJlcn19PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tc20gYnRuLWRhbmdlcicgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSkgXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoxcHg7XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ29ic0dyb3VwJ1wiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToyMHB4O1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tc20gYnRuLWRhbmdlcicgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSkgXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoxcHg7XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5JyAoY2xpY2spPVwibm9kZS5jcmVhdGVDaGlsZE5vZGUoKSBcIj5BZGQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDJcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cblxuICA8IS0tR1JPVVAtLT5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlIFwiPlxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZ3JvdXAnIFwiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdmaWVsZC1zZXQnIFwiIHN0eWxlPVwiYm9yZGVyOiAxcHggc29saWQgI2VlZWVlZTsgcGFkZGluZzogMnB4OyBtYXJnaW46IDJweDtcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiXG4gICAgICAgIFtwYXJlbnRHcm91cF09XCJub2RlLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbJy4uLy4uL3N0eWxlL2FwcC5jc3MnLCBERUZBVUxUX1NUWUxFU11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybVJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG5vZGU6IE5vZGVCYXNlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgcHVibGljIGNoaWxkQ29tcG9uZW50czogRm9ybVJlbmRlcmVyQ29tcG9uZW50W10gPSBbXTtcbiAgcHVibGljIHNob3dUaW1lOiBib29sZWFuO1xuICBwdWJsaWMgc2hvd1dlZWtzOiBib29sZWFuO1xuICBwdWJsaWMgYWN0aXZlVGFiOiBudW1iZXI7XG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHVibGljIGF1dG86IGFueTtcblxuICAvLyBpdGVtcyQ6IE9ic2VydmFibGU8YW55W10+O1xuICAvLyBpdGVtc0xvYWRpbmcgPSBmYWxzZTtcbiAgLy8gaXRlbXNJbnB1dCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMsXG4gICAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0VXBSZW1vdGVTZWxlY3QoKTtcbiAgICB0aGlzLnNldFVwRmlsZVVwbG9hZCgpO1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIGNvbnN0IHRhYiA9IHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ubGFzdEZvcm1UYWI7XG4gICAgICBpZiAodGFiICYmIHRhYiAhPT0gdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJykge1xuICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQkLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0NvbnRyb2woZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhKHRoaXMubm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwKS5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudENvbXBvbmVudCkge1xuICAgICAgdGhpcy5wYXJlbnRDb21wb25lbnQuYWRkQ2hpbGRDb21wb25lbnQodGhpcyk7XG4gICAgfVxuICB9XG5cblxuXG4gIHB1YmxpYyBhZGRDaGlsZENvbXBvbmVudChjaGlsZDogRm9ybVJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMucHVzaChjaGlsZCk7XG4gIH1cblxuICBwdWJsaWMgc2V0VXBSZW1vdGVTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICAvLyBsZXQgc2VsZWN0UXVlc3Rpb24gPSB0aGlzLm5vZGUuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKHRoaXMubm9kZS5xdWVzdGlvbi5rZXkpWzBdO1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgIC8qXG4gICAgICBsZXQgZGVmYWx0VmFsdWVzID0gb2YoW10pO1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShzZWxlY3RRdWVzdGlvbi5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICBkZWZhbHRWYWx1ZXMgPSB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUoc2VsZWN0UXVlc3Rpb24uY29udHJvbC52YWx1ZSkucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKFtdKSksIC8vIGVtcHR5IGxpc3Qgb24gZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXRlbXMkID0gY29uY2F0KFxuICAgICAgICBkZWZhbHRWYWx1ZXMsXG4gICAgICAgIHRoaXMuaXRlbXNJbnB1dCQucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLml0ZW1zTG9hZGluZyA9IHRydWUpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHRlcm0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKFtdKSksIC8vIGVtcHR5IGxpc3Qgb24gZXJyb3JcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgICovXG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwRmlsZVVwbG9hZCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAvLyBjb25zb2xlLmxvZygnS2V5JywgdGhpcy5ub2RlLnF1ZXN0aW9uKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhIHNvdXJjZScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1NlY3Rpb24obm9kZTogTm9kZUJhc2UpIHtcbiAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIGxldCBncm91cENoaWxkcmVuSGlkZGVuID0gZmFsc2U7XG4gICAgICBsZXQgYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikuZXZlcnkoKGspID0+IHtcbiAgICAgICAgbGV0IGlubmVyTm9kZSA9IG5vZGUuY2hpbGRyZW5ba107XG4gICAgICAgIGlmIChpbm5lck5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICBncm91cENoaWxkcmVuSGlkZGVuID0gT2JqZWN0LmtleXMoaW5uZXJOb2RlLmNoaWxkcmVuKS5ldmVyeSgoaSkgPT4gaW5uZXJOb2RlLmNoaWxkcmVuW2ldLmNvbnRyb2wuaGlkZGVuKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuW2tdLmNvbnRyb2wuaGlkZGVuIHx8IGdyb3VwQ2hpbGRyZW5IaWRkZW47XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAhYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbGlja1RhYih0YWJOdW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk51bWJlcjtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudFRhYkZpcnN0KCkpIHtcbiAgICAgIHRoaXMuY2xpY2tUYWIodGhpcy5hY3RpdmVUYWIgLSAxKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljIGlzQ3VycmVudFRhYkxhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSB0aGlzLm5vZGUucXVlc3Rpb25bJ3F1ZXN0aW9ucyddLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwdWJsaWMgbG9hZE5leHRUYWIoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudFRhYkxhc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiArIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgdGFiU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAkZXZlbnQuaW5kZXg7XG4gICAgdGhpcy5zZXRQcmV2aW91c1RhYigpO1xuICB9XG4gIHB1YmxpYyBzZXRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvWydsYXN0Rm9ybVRhYiddID0gdGhpcy5hY3RpdmVUYWI7XG4gICAgfVxuXG4gIH1cbiAgcHVibGljIGhhc0Vycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmNvbnRyb2wudG91Y2hlZCAmJiAhdGhpcy5ub2RlLmNvbnRyb2wudmFsaWQ7XG4gIH1cblxuICBwdWJsaWMgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cblxuICBwdWJsaWMgc2Nyb2xsVG9Db250cm9sKGVycm9yOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHRhYjogbnVtYmVyID0gK2Vycm9yLnNwbGl0KCcsJylbMF07XG4gICAgY29uc3QgZWxTZWxlY3RvciA9IGVycm9yLnNwbGl0KCcsJylbMV0gKyAnaWQnO1xuXG4gICAgLy8gdGhlIHRhYiBjb21wb25lbnRzXG4gICAgY29uc3QgdGFiQ29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50c1t0YWJdO1xuXG4gICAgdGhpcy5jbGlja1RhYih0YWIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGV4cGFuZCBhbGwgc2VjdGlvbnNcbiAgICAgIHRhYkNvbXBvbmVudC5jaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbFNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICB9LCAyMDApO1xuICB9XG5cbiAgcHVibGljIG9uRGF0ZUNoYW5nZWQobm9kZTogTGVhZk5vZGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnTm9kZScsIG5vZGUpO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0V2ZW50JywgZXZlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhJywgdGhpcy5kYXRhU291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVJbmZvcm1hdGlvbihpbmZvSWQpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5mb0lkKTtcblxuICAgIGlmIChlLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcbiAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cblxuICAgIGNvbnNvbGUubG9nKCdJbmZvSWQnLCBpbmZvSWQpO1xuICB9XG5cblxuICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=