/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Inject } from '@angular/core';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
export class FormRendererComponent {
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
            const /** @type {?} */ tab = this.node.form.valueProcessingInfo.lastFormTab;
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
            this.isCollapsed = !(/** @type {?} */ (this.node.question)).isExpanded;
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
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
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
        const /** @type {?} */ tab = +error.split(',')[0];
        const /** @type {?} */ elSelector = error.split(',')[1] + 'id';
        // the tab components
        const /** @type {?} */ tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    const /** @type {?} */ element = this.document.getElementById(elSelector);
                    element.focus();
                }, 200);
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
        const /** @type {?} */ e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getErrors(node) {
        const /** @type {?} */ errors = node.control.errors;
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
  <mat-tab-group (selectChange)='tabSelected($event)' [selectedIndex]='activeTab'>
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
<div *ngIf="node.question.renderingType === 'section'">
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
    <a class="form-tooltip pull-right" (click)="toggleInformation(node.question.extras.id)" data-placement="right" *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
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
      <textarea [placeholder]="node.question.placeholder" [rows]="node.question.rows" class="form-control" *ngSwitchCase="'textarea'"
        [formControlName]="node.question.key" [id]="node.question.key + 'id'">
      </textarea>
      <remote-select *ngSwitchCase="'remote-select'" [placeholder]="node.question.placeholder" tabindex="0" [dataSource]="dataSource"
        [componentID]="node.question.key + 'id'" [formControlName]="node.question.key" [id]="node.question.key + 'id'"></remote-select>
        
    <!--
      <date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" tabindex="0" [weeks]='node.question.extras.questionOptions.weeksList'
        (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"></date-time-picker>
    -->
    
      <ngx-date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" [id]="node.question.key + 'id'" [formControlName]="node.question.key"
            (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" ></ngx-date-time-picker>

      <ng-select *ngSwitchCase="'multi-select'" [noFilter]="50" [style.height]='auto' tabindex="0" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'" [options]="node.question.options" [multiple]="true">
      </ng-select>
      <input class="form-control" *ngSwitchCase="'number'" [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="'number'" [id]="node.question.key + 'id' " [step]="'any'" [min]="node.question.extras.questionOptions.min"
        [max]="node.question.extras.questionOptions.max">
      <input class="form-control" *ngSwitchDefault [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="node.question.renderingType" [id]="node.question.key + 'id' ">

      <div *ngSwitchCase="'radio'">
        <div *ngFor="let o of node.question.options">
          <label class="form-control no-border">
            <input type="radio" [formControlName]="node.question.key" [id]="node.question.key + 'id'" [value]="o.value"> {{ o.label }}
          </label>
        </div>
      </div>

      <div *ngSwitchCase="'checkbox'">
        <checkbox [id]="node.question.key + 'id'" [formControlName]="node.question.key" [options]="node.question.options"></checkbox>
      </div>

      <div *ngIf="node.question.enableHistoricalValue && node.question.historicalDisplay">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9">
              <span class="text-warning">Previous Value: </span>
              <strong>{{node.question.historicalDisplay?.text}}</strong>
              <span *ngIf="node.question.showHistoricalValueDate">
                <span> | </span>
                <strong class="text-primary">{{node.question.historicalDisplay?._date}}</strong>
              </span>

            </div>
            <button type="button" [node]="node" [name]="'historyValue'" class="btn btn-primary btn-small col-xs-3">Use Value
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
            " [parentGroup]="child.control "></form-renderer>
            <div>{{child.orderNumber}}</div>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br/>
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>

        <div *ngSwitchCase="'obsGroup'" style="margin-bottom:20px;">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            " [parentGroup]="child.control "></form-renderer>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br/>
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
            " [parentGroup]="node.control "></form-renderer>
    </div>
    <div *ngSwitchCase=" 'field-set' " style="border: 1px solid #eeeeee; padding: 2px; margin: 2px;">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            " [parentGroup]="node.control "></form-renderer>
    </div>
  </div>

</div>
`,
                styles: ['../../style/app.css', DEFAULT_STYLES]
            },] },
];
/** @nocollapse */
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory, },
    { type: DataSources, },
    { type: FormErrorsService, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
FormRendererComponent.propDecorators = {
    "parentComponent": [{ type: Input },],
    "node": [{ type: Input },],
    "parentGroup": [{ type: Input },],
};
function FormRendererComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormRendererComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormRendererComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormRendererComponent.propDecorators;
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
    /** @type {?} */
    FormRendererComponent.prototype.validationFactory;
    /** @type {?} */
    FormRendererComponent.prototype.dataSources;
    /** @type {?} */
    FormRendererComponent.prototype.formErrorsService;
    /** @type {?} */
    FormRendererComponent.prototype.document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQW9NcEUsTUFBTTs7Ozs7OztJQWFKLFlBQ1EsbUJBQ0EsYUFDQSxtQkFDa0I7UUFIbEIsc0JBQWlCLEdBQWpCLGlCQUFpQjtRQUNqQixnQkFBVyxHQUFYLFdBQVc7UUFDWCxzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ0MsYUFBUSxHQUFSLFFBQVE7K0JBWmdCLEVBQUU7MkJBSy9CLEtBQUs7UUFReEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDcEI7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7WUFDM0QsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDdEI7U0FDRjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FDbEQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDUixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCLENBQUMsQ0FBQztTQUNOO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsbUJBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUF5QixFQUFDLENBQUMsVUFBVSxDQUFDO1NBQ3RFO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5Qzs7Ozs7O0lBR0ksaUJBQWlCLENBQUMsS0FBNEI7UUFDbkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBRzVCLGlCQUFpQjtRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQzthQUMxRTtTQUNGOzs7OztJQUdJLGVBQWU7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7O1NBRy9FOzs7Ozs7SUFLRyxRQUFRLENBQUMsU0FBUztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7Ozs7SUFHdEIsZUFBZTtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQzdCOzs7OztJQUdLLGlCQUFpQjtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBR3RCLGdCQUFnQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUcvRCxXQUFXO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDN0I7Ozs7OztJQUVLLFdBQVcsQ0FBQyxNQUFNO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7O0lBRWhCLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNwRTs7Ozs7SUFHSyxTQUFTO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7Ozs7SUFHdkQsTUFBTTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBSTVCLGVBQWUsQ0FBQyxLQUFhO1FBRWxDLHVCQUFNLEdBQUcsR0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsdUJBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOztRQUc5Qyx1QkFBTSxZQUFZLEdBQTBCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFVLENBQUMsR0FBRyxFQUFFOztZQUdkLFlBQVksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUU1QixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLHVCQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNqQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1QsQ0FBQyxDQUFDO1NBRUosRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBR0gsYUFBYSxDQUFDLElBQWM7O1FBRWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7Ozs7SUFHWixNQUFNLENBQUMsS0FBSzs7Ozs7Ozs7SUFLWixpQkFBaUIsQ0FBQyxNQUFNO1FBQzdCLHVCQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQzNCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDNUI7UUFHRixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBSXZCLFNBQVMsQ0FBQyxJQUFjO1FBQy9CLHVCQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRVgsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3RDtRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7Ozs7WUE1V2IsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNExYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQzthQUNoRDs7OztZQXJNUSxpQkFBaUI7WUFIakIsV0FBVztZQUtYLGlCQUFpQjs0Q0FxTnZCLE1BQU0sU0FBQyxRQUFROzs7Z0NBZmYsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm0tcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDwhLS1DT05UQUlORVJTLS0+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXRhYnMgZm9ybXMtZHJvcGRvd25cIj5cbiAgICA8YSBjbGFzcz1cImJ0biBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWRvdWJsZS1kb3duXCI+PC9pPlxuICAgIDwvYT5cbiAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQgZm9ybXMtZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZHJvcGRvd25NZW51XCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJjbGlja1RhYihpKVwiPlxuICAgICAgICB7e3F1ZXN0aW9uLmxhYmVsfX1cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG4gIDxtYXQtdGFiLWdyb3VwIChzZWxlY3RDaGFuZ2UpPSd0YWJTZWxlY3RlZCgkZXZlbnQpJyBbc2VsZWN0ZWRJbmRleF09J2FjdGl2ZVRhYic+XG4gICAgPG1hdC10YWIgW2xhYmVsXT0ncXVlc3Rpb24ubGFiZWwnICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgPGRpdiAoc3dpcGVMZWZ0KT0nbG9hZE5leHRUYWIoKScgKHN3aXBlUmlnaHQpPSdsb2FkUHJldmlvdXNUYWIoKSc+XG4gICAgICAgICAgPGZvcm0tcmVuZGVyZXIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtdGFiPlxuICA8L21hdC10YWItZ3JvdXA+XG5cbiAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJsb2FkUHJldmlvdXNUYWIoKVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogaXNDdXJyZW50VGFiRmlyc3QoKX1cIj4mbHQ7Jmx0OzwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cImxvYWROZXh0VGFiKClcIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGlzQ3VycmVudFRhYkxhc3QoKX1cIj5cbiAgICAgICZndDsmZ3Q7PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZSdcIj5cbiAgPCEtLTxoMj57e25vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDI+LS0+XG4gIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9mb3JtLXJlbmRlcmVyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbidcIj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsICBwYW5lbC1wcmltYXJ5XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiAoY2xpY2spPVwiaXNDb2xsYXBzZWQgPSAhaXNDb2xsYXBzZWRcIj5cbiAgICAgICAge3tpc0NvbGxhcHNlZCA/ICdTaG93JyA6ICdIaWRlJ319XG4gICAgICA8L2J1dHRvbj4ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIFtjb2xsYXBzZV09XCJpc0NvbGxhcHNlZFwiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIE1FU1NBR0VTIC0tPlxuPGRpdiAqbmdJZj1cIm5vZGUuY29udHJvbCAmJiBub2RlLmNvbnRyb2wuYWxlcnQgJiYgbm9kZS5jb250cm9sLmFsZXJ0ICE9PSAnJ1wiIGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiPlxuICA8YSBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIj4mdGltZXM7PC9hPiB7e25vZGUuY29udHJvbC5hbGVydH19XG48L2Rpdj5cblxuPCEtLUNPTlRST0xTLS0+XG5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAwXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJwYXJlbnRHcm91cFwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiXG4gIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuICA8IS0tTEVBRiBDT05UUk9MLS0+XG4gIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1hcmVhXCI+XG4gICAgPGEgY2xhc3M9XCJmb3JtLXRvb2x0aXAgcHVsbC1yaWdodFwiIChjbGljayk9XCJ0b2dnbGVJbmZvcm1hdGlvbihub2RlLnF1ZXN0aW9uLmV4dHJhcy5pZClcIiBkYXRhLXBsYWNlbWVudD1cInJpZ2h0XCIgKm5nSWY9XCJub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcIj5cbiAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1xdWVzdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvYT5cblxuICAgIDxsYWJlbCAqbmdJZj1cIm5vZGUucXVlc3Rpb24ubGFiZWxcIiBbc3R5bGUuY29sb3JdPVwiaGFzRXJyb3JzKCk/ICdyZWQnIDonJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIFthdHRyLmZvcl09XCJub2RlLnF1ZXN0aW9uLmtleVwiPlxuICAgICAge3tub2RlLnF1ZXN0aW9uLnJlcXVpcmVkID09PSB0cnVlID8gJyonOicnfX0ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2xhYmVsPlxuICAgIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxuICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2Ygbm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW25nVmFsdWVdPVwiby52YWx1ZVwiPnt7by5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8cmVtb3RlLWZpbGUtdXBsb2FkICpuZ1N3aXRjaENhc2U9XCInZmlsZSdcIiBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICAoZmlsZUNoYW5nZWQpPVwidXBsb2FkKCRldmVudClcIj5cbiAgICAgIDwvcmVtb3RlLWZpbGUtdXBsb2FkPlxuICAgICAgPHRleHRhcmVhIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCIgW3Jvd3NdPVwibm9kZS5xdWVzdGlvbi5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICA8L3RleHRhcmVhPlxuICAgICAgPHJlbW90ZS1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCIgdGFiaW5kZXg9XCIwXCIgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgIFtjb21wb25lbnRJRF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPjwvcmVtb3RlLXNlbGVjdD5cbiAgICAgICAgXG4gICAgPCEtLVxuICAgICAgPGRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgdGFiaW5kZXg9XCIwXCIgW3dlZWtzXT0nbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCdcbiAgICAgICAgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCIgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L2RhdGUtdGltZS1waWNrZXI+XG4gICAgLS0+XG4gICAgXG4gICAgICA8bmd4LWRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICAgICAgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCIgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCIgPjwvbmd4LWRhdGUtdGltZS1waWNrZXI+XG5cbiAgICAgIDxuZy1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidtdWx0aS1zZWxlY3QnXCIgW25vRmlsdGVyXT1cIjUwXCIgW3N0eWxlLmhlaWdodF09J2F1dG8nIHRhYmluZGV4PVwiMFwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleSBcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyIFwiXG4gICAgICAgIFt0eXBlXT1cIidudW1iZXInXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJyBcIiBbc3RlcF09XCInYW55J1wiIFttaW5dPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1pblwiXG4gICAgICAgIFttYXhdPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1heFwiPlxuICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoRGVmYXVsdCBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5IFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXIgXCJcbiAgICAgICAgW3R5cGVdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJyBcIj5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbCBuby1ib3JkZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFt2YWx1ZV09XCJvLnZhbHVlXCI+IHt7IG8ubGFiZWwgfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCI+XG4gICAgICAgIDxjaGVja2JveCBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPjwvY2hlY2tib3g+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtOVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2FybmluZ1wiPlByZXZpb3VzIFZhbHVlOiA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmc+e3tub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Py50ZXh0fX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+IHwgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj57e25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/Ll9kYXRlfX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtub2RlXT1cIm5vZGVcIiBbbmFtZV09XCInaGlzdG9yeVZhbHVlJ1wiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbWFsbCBjb2wteHMtM1wiPlVzZSBWYWx1ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YXBwb2ludG1lbnRzLW92ZXJ2aWV3IFtub2RlXT1cIm5vZGVcIj48L2FwcG9pbnRtZW50cy1vdmVydmlldz5cbiAgICAgIDxkaXYgKm5nSWY9XCJoYXNFcnJvcnMoKSBcIj5cbiAgICAgICAgPHAgKm5nRm9yPVwibGV0IGUgb2YgZXJyb3JzKCkgXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlciBcIj57e2V9fTwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24taW5mbyBjb2wtbWQtMTIgY29sLWxnLTEyIGNvbC1zbS0xMlwiIGlkPVwie3tub2RlLnF1ZXN0aW9uLmV4dHJhcy5pZH19XCIgKm5nSWY9XCJub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvfX1cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDFcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cblxuXG4gIDwhLS1BUlJBWSBDT05UUk9MLS0+XG4gIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSBcIj5cbiAgICA8ZGl2IGNsYXNzPSd3ZWxsJyBzdHlsZT1cInBhZGRpbmc6IDJweDsgXCIgKm5nU3dpdGNoQ2FzZT1cIiAncmVwZWF0aW5nJyBcIj5cbiAgICAgIDxoNCBzdHlsZT1cIm1hcmdpbjogMnB4OyBmb250LXdlaWdodDogYm9sZDtcIj57e25vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDQ+XG4gICAgICA8aHIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMnB4OyBtYXJnaW4tcmlnaHQ6LTJweDsgbWFyZ2luLWJvdHRvbTo0cHg7IG1hcmdpbi10b3A6OHB4OyBib3JkZXItd2lkdGg6MnB4O1wiIC8+XG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlXCI+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXN0T3JkZXInXCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgICAgIDxkaXY+e3tjaGlsZC5vcmRlck51bWJlcn19PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tc20gYnRuLWRhbmdlcicgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSkgXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjFweDtcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInb2JzR3JvdXAnXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOjIwcHg7XCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGFuZ2VyJyAoY2xpY2spPVwibm9kZS5yZW1vdmVBdChpKSBcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aHIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMnB4OyBtYXJnaW4tcmlnaHQ6LTJweDsgbWFyZ2luLWJvdHRvbTo0cHg7IG1hcmdpbi10b3A6OHB4OyBib3JkZXItd2lkdGg6MXB4O1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tcHJpbWFyeScgKGNsaWNrKT1cIm5vZGUuY3JlYXRlQ2hpbGROb2RlKCkgXCI+QWRkPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAyXCIgW2hpZGRlbl09XCJub2RlLmNvbnRyb2wuaGlkZGVuXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBub2RlLmNvbnRyb2wuZGlzYWJsZWR9XCI+XG5cbiAgPCEtLUdST1VQLS0+XG4gIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSBcIj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2dyb3VwJyBcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJub2RlLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZmllbGQtc2V0JyBcIiBzdHlsZT1cImJvcmRlcjogMXB4IHNvbGlkICNlZWVlZWU7IHBhZGRpbmc6IDJweDsgbWFyZ2luOiAycHg7XCI+XG4gICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbJy4uLy4uL3N0eWxlL2FwcC5jc3MnLCBERUZBVUxUX1NUWUxFU11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybVJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50Q29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBub2RlOiBOb2RlQmFzZTtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gIHB1YmxpYyBjaGlsZENvbXBvbmVudHM6IEZvcm1SZW5kZXJlckNvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBzaG93VGltZTogYm9vbGVhbjtcbiAgcHVibGljIHNob3dXZWVrczogYm9vbGVhbjtcbiAgcHVibGljIGFjdGl2ZVRhYjogbnVtYmVyO1xuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGlzQ29sbGFwc2VkID0gZmFsc2U7XG4gIHB1YmxpYyBhdXRvOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gIHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LFxuICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcyxcbiAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UsXG4gIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldFVwUmVtb3RlU2VsZWN0KCk7XG4gICAgdGhpcy5zZXRVcEZpbGVVcGxvYWQoKTtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmxhc3RGb3JtVGFiO1xuICAgICAgaWYgKHRhYiAmJiB0YWIgIT09IHRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybScpIHtcbiAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkJC5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Db250cm9sKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICB0aGlzLmlzQ29sbGFwc2VkID0gISh0aGlzLm5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cCkuaXNFeHBhbmRlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGFyZW50Q29tcG9uZW50LmFkZENoaWxkQ29tcG9uZW50KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRDaGlsZENvbXBvbmVudChjaGlsZDogRm9ybVJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMucHVzaChjaGlsZCk7XG4gIH1cblxuICBwdWJsaWMgc2V0VXBSZW1vdGVTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwRmlsZVVwbG9hZCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAvLyBjb25zb2xlLmxvZygnS2V5JywgdGhpcy5ub2RlLnF1ZXN0aW9uKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhIHNvdXJjZScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgfVxuXG4gIH1cblxuXG4gcHVibGljIGNsaWNrVGFiKHRhYk51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiRmlyc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiAtIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyAgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljICBpc0N1cnJlbnRUYWJMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5ub2RlLnF1ZXN0aW9uWydxdWVzdGlvbnMnXS5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljICBsb2FkTmV4dFRhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiTGFzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiICsgMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG4gIHB1YmxpYyAgdGFiU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAkZXZlbnQuaW5kZXg7XG4gICAgdGhpcy5zZXRQcmV2aW91c1RhYigpO1xuICB9XG4gIHB1YmxpYyAgc2V0UHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuZm9ybSkge1xuICAgICAgdGhpcy5ub2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mb1snbGFzdEZvcm1UYWInXSA9IHRoaXMuYWN0aXZlVGFiO1xuICAgIH1cblxuICB9XG4gcHVibGljICAgaGFzRXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUuY29udHJvbC50b3VjaGVkICYmICF0aGlzLm5vZGUuY29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHB1YmxpYyAgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cblxuICBwdWJsaWMgc2Nyb2xsVG9Db250cm9sKGVycm9yOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHRhYjogbnVtYmVyID0gK2Vycm9yLnNwbGl0KCcsJylbMF07XG4gICAgY29uc3QgZWxTZWxlY3RvciA9IGVycm9yLnNwbGl0KCcsJylbMV0gKyAnaWQnO1xuXG4gICAgLy8gdGhlIHRhYiBjb21wb25lbnRzXG4gICAgY29uc3QgdGFiQ29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50c1t0YWJdO1xuXG4gICAgdGhpcy5jbGlja1RhYih0YWIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGV4cGFuZCBhbGwgc2VjdGlvbnNcbiAgICAgIHRhYkNvbXBvbmVudC5jaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbFNlbGVjdG9yKTtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgICB9KTtcblxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBwdWJsaWMgb25EYXRlQ2hhbmdlZChub2RlOiBMZWFmTm9kZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdOb2RlJywgbm9kZSk7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnRXZlbnQnLCBldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ0RhdGEnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKGluZm9JZCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmZvSWQpO1xuXG4gICAgaWYgKGUuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgIH1cblxuXG4gICAgY29uc29sZS5sb2coJ0luZm9JZCcsIGluZm9JZCk7XG4gIH1cblxuXG4gICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=