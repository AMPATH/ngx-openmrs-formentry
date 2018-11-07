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

      <ngx-date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" [id]="node.question.key + 'id'" 
            [formControlName]="node.question.key" [weeks]='node.question.extras.questionOptions.weeksList'
            (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" ></ngx-date-time-picker>
      <ng-select *ngSwitchCase="'multi-select'" [style.height]="'auto'"  [style.overflow-x]="'hidden'" tabindex="0" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'" [options]="node.question.options" [multiple]="true">
      </ng-select>
      <ng-select *ngSwitchCase="'single-select'" [style.height]='auto' tabindex="0" [formControlName]="node.question.key"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQXNNcEUsTUFBTTs7Ozs7OztJQWFKLFlBQ1EsbUJBQ0EsYUFDQSxtQkFDa0I7UUFIbEIsc0JBQWlCLEdBQWpCLGlCQUFpQjtRQUNqQixnQkFBVyxHQUFYLFdBQVc7UUFDWCxzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ0MsYUFBUSxHQUFSLFFBQVE7K0JBWmdCLEVBQUU7MkJBSy9CLEtBQUs7UUFReEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDcEI7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxD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SW5wdXQsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm0tcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDwhLS1DT05UQUlORVJTLS0+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXRhYnMgZm9ybXMtZHJvcGRvd25cIj5cbiAgICA8YSBjbGFzcz1cImJ0biBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWRvdWJsZS1kb3duXCI+PC9pPlxuICAgIDwvYT5cbiAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQgZm9ybXMtZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZHJvcGRvd25NZW51XCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJjbGlja1RhYihpKVwiPlxuICAgICAgICB7e3F1ZXN0aW9uLmxhYmVsfX1cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG4gIDxtYXQtdGFiLWdyb3VwIChzZWxlY3RDaGFuZ2UpPSd0YWJTZWxlY3RlZCgkZXZlbnQpJyBbc2VsZWN0ZWRJbmRleF09J2FjdGl2ZVRhYic+XG4gICAgPG1hdC10YWIgW2xhYmVsXT0ncXVlc3Rpb24ubGFiZWwnICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgPGRpdiAoc3dpcGVMZWZ0KT0nbG9hZE5leHRUYWIoKScgKHN3aXBlUmlnaHQpPSdsb2FkUHJldmlvdXNUYWIoKSc+XG4gICAgICAgICAgPGZvcm0tcmVuZGVyZXIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtdGFiPlxuICA8L21hdC10YWItZ3JvdXA+XG5cbiAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJsb2FkUHJldmlvdXNUYWIoKVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogaXNDdXJyZW50VGFiRmlyc3QoKX1cIj4mbHQ7Jmx0OzwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cImxvYWROZXh0VGFiKClcIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGlzQ3VycmVudFRhYkxhc3QoKX1cIj5cbiAgICAgICZndDsmZ3Q7PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZSdcIj5cbiAgPCEtLTxoMj57e25vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDI+LS0+XG4gIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9mb3JtLXJlbmRlcmVyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbidcIj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsICBwYW5lbC1wcmltYXJ5XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiAoY2xpY2spPVwiaXNDb2xsYXBzZWQgPSAhaXNDb2xsYXBzZWRcIj5cbiAgICAgICAge3tpc0NvbGxhcHNlZCA/ICdTaG93JyA6ICdIaWRlJ319XG4gICAgICA8L2J1dHRvbj4ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIFtjb2xsYXBzZV09XCJpc0NvbGxhcHNlZFwiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIE1FU1NBR0VTIC0tPlxuPGRpdiAqbmdJZj1cIm5vZGUuY29udHJvbCAmJiBub2RlLmNvbnRyb2wuYWxlcnQgJiYgbm9kZS5jb250cm9sLmFsZXJ0ICE9PSAnJ1wiIGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiPlxuICA8YSBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIj4mdGltZXM7PC9hPiB7e25vZGUuY29udHJvbC5hbGVydH19XG48L2Rpdj5cblxuPCEtLUNPTlRST0xTLS0+XG5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAwXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJwYXJlbnRHcm91cFwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiXG4gIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuICA8IS0tTEVBRiBDT05UUk9MLS0+XG4gIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1hcmVhXCI+XG4gICAgPGEgY2xhc3M9XCJmb3JtLXRvb2x0aXAgcHVsbC1yaWdodFwiIChjbGljayk9XCJ0b2dnbGVJbmZvcm1hdGlvbihub2RlLnF1ZXN0aW9uLmV4dHJhcy5pZClcIiBkYXRhLXBsYWNlbWVudD1cInJpZ2h0XCIgKm5nSWY9XCJub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcIj5cbiAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1xdWVzdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvYT5cblxuICAgIDxsYWJlbCAqbmdJZj1cIm5vZGUucXVlc3Rpb24ubGFiZWxcIiBbc3R5bGUuY29sb3JdPVwiaGFzRXJyb3JzKCk/ICdyZWQnIDonJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIFthdHRyLmZvcl09XCJub2RlLnF1ZXN0aW9uLmtleVwiPlxuICAgICAge3tub2RlLnF1ZXN0aW9uLnJlcXVpcmVkID09PSB0cnVlID8gJyonOicnfX0ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2xhYmVsPlxuICAgIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiPlxuICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2Ygbm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW25nVmFsdWVdPVwiby52YWx1ZVwiPnt7by5sYWJlbH19XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8cmVtb3RlLWZpbGUtdXBsb2FkICpuZ1N3aXRjaENhc2U9XCInZmlsZSdcIiBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICAoZmlsZUNoYW5nZWQpPVwidXBsb2FkKCRldmVudClcIj5cbiAgICAgIDwvcmVtb3RlLWZpbGUtdXBsb2FkPlxuICAgICAgPHRleHRhcmVhIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCIgW3Jvd3NdPVwibm9kZS5xdWVzdGlvbi5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICA8L3RleHRhcmVhPlxuICAgICAgPHJlbW90ZS1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidyZW1vdGUtc2VsZWN0J1wiIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCIgdGFiaW5kZXg9XCIwXCIgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgIFtjb21wb25lbnRJRF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPjwvcmVtb3RlLXNlbGVjdD5cbiAgPCEtLSAgXG4gICAgICA8ZGF0ZS10aW1lLXBpY2tlciAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgW3Nob3dUaW1lXT1cIm5vZGUucXVlc3Rpb24uc2hvd1RpbWVcIiB0YWJpbmRleD1cIjBcIiBbd2Vla3NdPSdub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0J1xuICAgICAgICAob25EYXRlQ2hhbmdlKT1cIm9uRGF0ZUNoYW5nZWQobm9kZSlcIiBbc2hvd1dlZWtzXT1cIm5vZGUucXVlc3Rpb24uc2hvd1dlZWtzQWRkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPjwvZGF0ZS10aW1lLXBpY2tlcj5cbiAgLS0+XG5cbiAgICAgIDxuZ3gtZGF0ZS10aW1lLXBpY2tlciAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgW3Nob3dUaW1lXT1cIm5vZGUucXVlc3Rpb24uc2hvd1RpbWVcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgXG4gICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW3dlZWtzXT0nbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCdcbiAgICAgICAgICAgIChvbkRhdGVDaGFuZ2UpPVwib25EYXRlQ2hhbmdlZChub2RlKVwiIFtzaG93V2Vla3NdPVwibm9kZS5xdWVzdGlvbi5zaG93V2Vla3NBZGRlclwiID48L25neC1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgPG5nLXNlbGVjdCAqbmdTd2l0Y2hDYXNlPVwiJ211bHRpLXNlbGVjdCdcIiBbc3R5bGUuaGVpZ2h0XT1cIidhdXRvJ1wiICBbc3R5bGUub3ZlcmZsb3cteF09XCInaGlkZGVuJ1wiIHRhYmluZGV4PVwiMFwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgPG5nLXNlbGVjdCAqbmdTd2l0Y2hDYXNlPVwiJ3NpbmdsZS1zZWxlY3QnXCIgW3N0eWxlLmhlaWdodF09J2F1dG8nIHRhYmluZGV4PVwiMFwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFttdWx0aXBsZV09XCJmYWxzZVwiPlxuICAgICAgPC9uZy1zZWxlY3Q+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5IFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXIgXCJcbiAgICAgICAgW3R5cGVdPVwiJ251bWJlcidcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnIFwiIFtzdGVwXT1cIidhbnknXCIgW21pbl09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMubWluXCJcbiAgICAgICAgW21heF09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMubWF4XCI+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hEZWZhdWx0IFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXkgXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlciBcIlxuICAgICAgICBbdHlwZV09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnIFwiPlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmFkaW8nXCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG8gb2Ygbm9kZS5xdWVzdGlvbi5vcHRpb25zXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sIG5vLWJvcmRlclwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW3ZhbHVlXT1cIm8udmFsdWVcIj4ge3sgby5sYWJlbCB9fVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidjaGVja2JveCdcIj5cbiAgICAgICAgPGNoZWNrYm94IFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCI+PC9jaGVja2JveD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy05XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13YXJuaW5nXCI+UHJldmlvdXMgVmFsdWU6IDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHN0cm9uZz57e25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/LnRleHR9fTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uc2hvd0hpc3RvcmljYWxWYWx1ZURhdGVcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4gfCA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRleHQtcHJpbWFyeVwiPnt7bm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheT8uX2RhdGV9fTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW25vZGVdPVwibm9kZVwiIFtuYW1lXT1cIidoaXN0b3J5VmFsdWUnXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtYWxsIGNvbC14cy0zXCI+VXNlIFZhbHVlXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxhcHBvaW50bWVudHMtb3ZlcnZpZXcgW25vZGVdPVwibm9kZVwiPjwvYXBwb2ludG1lbnRzLW92ZXJ2aWV3PlxuICAgICAgPGRpdiAqbmdJZj1cImhhc0Vycm9ycygpIFwiPlxuICAgICAgICA8cCAqbmdGb3I9XCJsZXQgZSBvZiBlcnJvcnMoKSBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyIFwiPnt7ZX19PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1pbmZvIGNvbC1tZC0xMiBjb2wtbGctMTIgY29sLXNtLTEyXCIgaWQ9XCJ7e25vZGUucXVlc3Rpb24uZXh0cmFzLmlkfX1cIiAqbmdJZj1cIm5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gIT09ICcnICAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gIT09ICcgJ1wiPlxuICAgICAge3tub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm99fVxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMVwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuXG5cbiAgPCEtLUFSUkFZIENPTlRST0wtLT5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlIFwiPlxuICAgIDxkaXYgY2xhc3M9J3dlbGwnIHN0eWxlPVwicGFkZGluZzogMnB4OyBcIiAqbmdTd2l0Y2hDYXNlPVwiICdyZXBlYXRpbmcnIFwiPlxuICAgICAgPGg0IHN0eWxlPVwibWFyZ2luOiAycHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPnt7bm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oND5cbiAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoycHg7XCIgLz5cbiAgICAgIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGVcIj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Rlc3RPcmRlcidcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuOyBsZXQgaT1pbmRleCBcIj5cbiAgICAgICAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgICAgICAgPGRpdj57e2NoaWxkLm9yZGVyTnVtYmVyfX08L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGFuZ2VyJyAoY2xpY2spPVwibm9kZS5yZW1vdmVBdChpKSBcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aHIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMnB4OyBtYXJnaW4tcmlnaHQ6LTJweDsgbWFyZ2luLWJvdHRvbTo0cHg7IG1hcmdpbi10b3A6OHB4OyBib3JkZXItd2lkdGg6MXB4O1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidvYnNHcm91cCdcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206MjBweDtcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuOyBsZXQgaT1pbmRleCBcIj5cbiAgICAgICAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uIFwiIGNsYXNzPSdidG4gYnRuLXNtIGJ0bi1kYW5nZXInIChjbGljayk9XCJub2RlLnJlbW92ZUF0KGkpIFwiPlJlbW92ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoxcHg7XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5JyAoY2xpY2spPVwibm9kZS5jcmVhdGVDaGlsZE5vZGUoKSBcIj5BZGQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDJcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cblxuICA8IS0tR1JPVVAtLT5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlIFwiPlxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZ3JvdXAnIFwiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdmaWVsZC1zZXQnIFwiIHN0eWxlPVwiYm9yZGVyOiAxcHggc29saWQgI2VlZWVlZTsgcGFkZGluZzogMnB4OyBtYXJnaW46IDJweDtcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJub2RlLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFsnLi4vLi4vc3R5bGUvYXBwLmNzcycsIERFRkFVTFRfU1RZTEVTXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG5vZGU6IE5vZGVCYXNlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgcHVibGljIGNoaWxkQ29tcG9uZW50czogRm9ybVJlbmRlcmVyQ29tcG9uZW50W10gPSBbXTtcbiAgcHVibGljIHNob3dUaW1lOiBib29sZWFuO1xuICBwdWJsaWMgc2hvd1dlZWtzOiBib29sZWFuO1xuICBwdWJsaWMgYWN0aXZlVGFiOiBudW1iZXI7XG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHVibGljIGF1dG86IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzLFxuICBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZSxcbiAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0VXBSZW1vdGVTZWxlY3QoKTtcbiAgICB0aGlzLnNldFVwRmlsZVVwbG9hZCgpO1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIGNvbnN0IHRhYiA9IHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ubGFzdEZvcm1UYWI7XG4gICAgICBpZiAodGFiICYmIHRhYiAhPT0gdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJykge1xuICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQkLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0NvbnRyb2woZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhKHRoaXMubm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwKS5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudENvbXBvbmVudCkge1xuICAgICAgdGhpcy5wYXJlbnRDb21wb25lbnQuYWRkQ2hpbGRDb21wb25lbnQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZENoaWxkQ29tcG9uZW50KGNoaWxkOiBGb3JtUmVuZGVyZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cy5wdXNoKGNoaWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRVcFJlbW90ZVNlbGVjdCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhU291cmNlT3B0aW9ucyA9IHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VXBGaWxlVXBsb2FkKCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdLZXknLCB0aGlzLm5vZGUucXVlc3Rpb24pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0RhdGEgc291cmNlJywgdGhpcy5kYXRhU291cmNlKTtcbiAgICB9XG5cbiAgfVxuXG5cbiBwdWJsaWMgY2xpY2tUYWIodGFiTnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOdW1iZXI7XG4gIH1cblxuICBwdWJsaWMgbG9hZFByZXZpb3VzVGFiKCkge1xuICAgIGlmICghdGhpcy5pc0N1cnJlbnRUYWJGaXJzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiIC0gMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljICBpc0N1cnJlbnRUYWJGaXJzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWIgPT09IDA7XG4gIH1cblxuICBwdWJsaWMgIGlzQ3VycmVudFRhYkxhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSB0aGlzLm5vZGUucXVlc3Rpb25bJ3F1ZXN0aW9ucyddLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwdWJsaWMgIGxvYWROZXh0VGFiKCkge1xuICAgIGlmICghdGhpcy5pc0N1cnJlbnRUYWJMYXN0KCkpIHtcbiAgICAgIHRoaXMuY2xpY2tUYWIodGhpcy5hY3RpdmVUYWIgKyAxKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cbiAgcHVibGljICB0YWJTZWxlY3RlZCgkZXZlbnQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9ICRldmVudC5pbmRleDtcbiAgICB0aGlzLnNldFByZXZpb3VzVGFiKCk7XG4gIH1cbiAgcHVibGljICBzZXRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvWydsYXN0Rm9ybVRhYiddID0gdGhpcy5hY3RpdmVUYWI7XG4gICAgfVxuXG4gIH1cbiBwdWJsaWMgICBoYXNFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5jb250cm9sLnRvdWNoZWQgJiYgIXRoaXMubm9kZS5jb250cm9sLnZhbGlkO1xuICB9XG5cbiAgcHVibGljICBlcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JzKHRoaXMubm9kZSk7XG4gIH1cblxuXG4gIHB1YmxpYyBzY3JvbGxUb0NvbnRyb2woZXJyb3I6IHN0cmluZykge1xuXG4gICAgY29uc3QgdGFiOiBudW1iZXIgPSArZXJyb3Iuc3BsaXQoJywnKVswXTtcbiAgICBjb25zdCBlbFNlbGVjdG9yID0gZXJyb3Iuc3BsaXQoJywnKVsxXSArICdpZCc7XG5cbiAgICAvLyB0aGUgdGFiIGNvbXBvbmVudHNcbiAgICBjb25zdCB0YWJDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRzW3RhYl07XG5cbiAgICB0aGlzLmNsaWNrVGFiKHRhYik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gZXhwYW5kIGFsbCBzZWN0aW9uc1xuICAgICAgdGFiQ29tcG9uZW50LmNoaWxkQ29tcG9uZW50cy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICAgIHNlY3Rpb24uaXNDb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsU2VsZWN0b3IpO1xuICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQuZm9jdXMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBwdWJsaWMgb25EYXRlQ2hhbmdlZChub2RlOiBMZWFmTm9kZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdOb2RlJywgbm9kZSk7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnRXZlbnQnLCBldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ0RhdGEnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKGluZm9JZCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmZvSWQpO1xuXG4gICAgaWYgKGUuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgIH1cblxuXG4gICAgY29uc29sZS5sb2coJ0luZm9JZCcsIGluZm9JZCk7XG4gIH1cblxuXG4gICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=