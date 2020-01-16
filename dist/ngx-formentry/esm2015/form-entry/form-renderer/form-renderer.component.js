import * as tslib_1 from "tslib";
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
let FormRendererComponent = class FormRendererComponent {
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
    setUpFileUpload() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
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
};
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: DataSources },
    { type: FormErrorsService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", FormRendererComponent)
], FormRendererComponent.prototype, "parentComponent", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", NodeBase)
], FormRendererComponent.prototype, "node", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", AfeFormGroup)
], FormRendererComponent.prototype, "parentGroup", void 0);
FormRendererComponent = tslib_1.__decorate([
    Component({
        selector: 'form-renderer',
        template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <!-- <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div> -->\n  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n        <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\">\n        </form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\"\n      [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\"\n    [node]=\"node.children[question.key]\" [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section' && checkSection(node)\">\n  <!-- <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div> -->\n  <mat-expansion-panel style=\"border: 1px solid lightgray; margin-top: 5px; border-radius: 1px;\"\n    [expanded]=\"!isCollapsed\">\n    <mat-expansion-panel-header style=\"font-size: 18px; font-weight: bolder; background-color: aliceblue; height: 40px;\">\n      {{node.question.label}}\n    </mat-expansion-panel-header>\n    <ng-template matExpansionPanelContent>\n      <div style=\"padding-top: 15px; padding-left: 5px;\">\n        <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\"\n          [node]=\"node.children[question.key]\" [parentGroup]=\"parentGroup\"></form-renderer>\n      </div>\n    </ng-template>\n  </mat-expansion-panel>\n\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\"\n      [attr.for]=\"node.question.key\">\n      {{node.question.required ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n\n      <app-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" (fileChanged)=\"upload($event)\">\n      </app-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n      <!--\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"items$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"{{node.question.placeholder}}\"\n        [hideSelected]=\"true\" [loading]=\"itemsLoading\"  [typeahead]=\"itemsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n    -->\n      <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\"\n        [dataSource]=\"dataSource\" [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></remote-select>\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\"></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" [style.height]=\"'auto'\" [style.overflow-x]=\"'hidden'\" tabindex=\"0\"\n        [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\"\n        [multiple]=\"true\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" [style.height]='auto' tabindex=\"0\"\n        [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\"\n        [multiple]=\"false\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \"\n        [attr.placeholder]=\"node.question.placeholder \" [type]=\"'number'\" [id]=\"node.question.key + 'id' \"\n        [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \"\n        [attr.placeholder]=\"node.question.placeholder \" [type]=\"node.question.renderingType\"\n        [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\">\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\"\n          [options]=\"node.question.options\" [selected]=\"node.control.value\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\" style=\"margin-top: 2px;\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}} </strong>\n                <span class=\"text-primary\"\n                  *ngIf=\"node.question.historicalDisplay && node.question.historicalDisplay._date \">\n                  ({{node.question.historicalDisplay._date | timeAgo}})</span>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use\n              Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \" [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \" [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \" [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \" [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>",
        styles: ['../../style/app.css', DEFAULT_STYLES]
    }),
    tslib_1.__param(3, Inject(DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [ValidationFactory,
        DataSources,
        FormErrorsService, Object])
], FormRendererComponent);
export { FormRendererComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1yZW5kZXJlci9mb3JtLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUNqQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFZLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRSwyRUFBMkU7QUFDM0UsK0JBQStCO0FBRS9CLHdHQUF3RztBQUN4RyxxREFBcUQ7QUFPckQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFjaEMsNkJBQTZCO0lBQzdCLHdCQUF3QjtJQUN4Qix1Q0FBdUM7SUFFdkMsWUFDVSxpQkFBb0MsRUFDcEMsV0FBd0IsRUFDeEIsaUJBQW9DLEVBQ2xCLFFBQWE7UUFIL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFoQmxDLG9C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QUcsT0FBTyxDQUFDO1NBQzNCO1FBR0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUdPLFNBQVMsQ0FBQyxJQUFjO1FBQzlCLE1BQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLElBQUksTUFBTSxFQUFFO1lBRVYsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FDRixDQUFBOztZQXpNOEIsaUJBQWlCO1lBQ3ZCLFdBQVc7WUFDTCxpQkFBaUI7NENBQzNDLE1BQU0sU0FBQyxRQUFROztBQW5CVDtJQUFSLEtBQUssRUFBRTtzQ0FBeUIscUJBQXFCOzhEQUFDO0FBQzlDO0lBQVIsS0FBSyxFQUFFO3NDQUFjLFFBQVE7bURBQUM7QUFDdEI7SUFBUixLQUFLLEVBQUU7c0NBQXFCLFlBQVk7MERBQUM7QUFML0IscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLG11WUFBMkM7aUJBQ2xDLHFCQUFxQixFQUFFLGNBQWM7S0FDL0MsQ0FBQztJQXVCRyxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7NkNBSFUsaUJBQWlCO1FBQ3ZCLFdBQVc7UUFDTCxpQkFBaUI7R0FyQm5DLHFCQUFxQixDQTROakM7U0E1TlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlLCBHcm91cE5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbi8vIGltcG9ydCB7IGNvbmNhdCwgb2YsIE9ic2VydmFibGUsIFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLy8gaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG4vLyBpbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCwgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybS1yZW5kZXJlcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybS1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogWycuLi8uLi9zdHlsZS9hcHAuY3NzJywgREVGQVVMVF9TVFlMRVNdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50Q29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBub2RlOiBOb2RlQmFzZTtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gIHB1YmxpYyBjaGlsZENvbXBvbmVudHM6IEZvcm1SZW5kZXJlckNvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBzaG93VGltZTogYm9vbGVhbjtcbiAgcHVibGljIHNob3dXZWVrczogYm9vbGVhbjtcbiAgcHVibGljIGFjdGl2ZVRhYjogbnVtYmVyO1xuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGlzQ29sbGFwc2VkID0gZmFsc2U7XG4gIHB1YmxpYyBhdXRvOiBhbnk7XG5cbiAgLy8gaXRlbXMkOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgLy8gaXRlbXNMb2FkaW5nID0gZmFsc2U7XG4gIC8vIGl0ZW1zSW5wdXQkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LFxuICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzLFxuICAgIHByaXZhdGUgZm9ybUVycm9yc1NlcnZpY2U6IEZvcm1FcnJvcnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldFVwUmVtb3RlU2VsZWN0KCk7XG4gICAgdGhpcy5zZXRVcEZpbGVVcGxvYWQoKTtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmxhc3RGb3JtVGFiO1xuICAgICAgaWYgKHRhYiAmJiB0YWIgIT09IHRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybScpIHtcbiAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkJC5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Db250cm9sKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICB0aGlzLmlzQ29sbGFwc2VkID0gISh0aGlzLm5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cCkuaXNFeHBhbmRlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGFyZW50Q29tcG9uZW50LmFkZENoaWxkQ29tcG9uZW50KHRoaXMpO1xuICAgIH1cbiAgfVxuXG5cblxuICBwdWJsaWMgYWRkQ2hpbGRDb21wb25lbnQoY2hpbGQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzLnB1c2goY2hpbGQpO1xuICB9XG5cbiAgcHVibGljIHNldFVwUmVtb3RlU2VsZWN0KCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgLy8gbGV0IHNlbGVjdFF1ZXN0aW9uID0gdGhpcy5ub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZCh0aGlzLm5vZGUucXVlc3Rpb24ua2V5KVswXTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAvKlxuICAgICAgbGV0IGRlZmFsdFZhbHVlcyA9IG9mKFtdKTtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUoc2VsZWN0UXVlc3Rpb24uY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgZGVmYWx0VmFsdWVzID0gdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHNlbGVjdFF1ZXN0aW9uLmNvbnRyb2wudmFsdWUpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihbXSkpLCAvLyBlbXB0eSBsaXN0IG9uIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLml0ZW1zJCA9IGNvbmNhdChcbiAgICAgICAgZGVmYWx0VmFsdWVzLFxuICAgICAgICB0aGlzLml0ZW1zSW5wdXQkLnBpcGUoXG4gICAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5pdGVtc0xvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyh0ZXJtKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihbXSkpLCAvLyBlbXB0eSBsaXN0IG9uIGVycm9yXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICAqL1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGFTb3VyY2VPcHRpb25zID0gdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcEZpbGVVcGxvYWQoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0tleScsIHRoaXMubm9kZS5xdWVzdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRGF0YSBzb3VyY2UnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICAgIH1cblxuICB9XG5cbiAgY2hlY2tTZWN0aW9uKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICBsZXQgZ3JvdXBDaGlsZHJlbkhpZGRlbiA9IGZhbHNlO1xuICAgICAgY29uc3QgYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikuZXZlcnkoKGspID0+IHtcbiAgICAgICAgY29uc3QgaW5uZXJOb2RlID0gbm9kZS5jaGlsZHJlbltrXTtcbiAgICAgICAgaWYgKGlubmVyTm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgIGdyb3VwQ2hpbGRyZW5IaWRkZW4gPSBPYmplY3Qua2V5cyhpbm5lck5vZGUuY2hpbGRyZW4pLmV2ZXJ5KChpKSA9PiBpbm5lck5vZGUuY2hpbGRyZW5baV0uY29udHJvbC5oaWRkZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuW2tdLmNvbnRyb2wuaGlkZGVuIHx8IGdyb3VwQ2hpbGRyZW5IaWRkZW47XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAhYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbGlja1RhYih0YWJOdW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk51bWJlcjtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudFRhYkZpcnN0KCkpIHtcbiAgICAgIHRoaXMuY2xpY2tUYWIodGhpcy5hY3RpdmVUYWIgLSAxKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljIGlzQ3VycmVudFRhYkxhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSB0aGlzLm5vZGUucXVlc3Rpb25bJ3F1ZXN0aW9ucyddLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwdWJsaWMgbG9hZE5leHRUYWIoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudFRhYkxhc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiArIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgdGFiU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAkZXZlbnQ7XG4gICAgdGhpcy5zZXRQcmV2aW91c1RhYigpO1xuICB9XG4gIHB1YmxpYyBzZXRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvWydsYXN0Rm9ybVRhYiddID0gdGhpcy5hY3RpdmVUYWI7XG4gICAgfVxuXG4gIH1cbiAgcHVibGljIGhhc0Vycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmNvbnRyb2wudG91Y2hlZCAmJiAhdGhpcy5ub2RlLmNvbnRyb2wudmFsaWQ7XG4gIH1cblxuICBwdWJsaWMgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cblxuICBwdWJsaWMgc2Nyb2xsVG9Db250cm9sKGVycm9yOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHRhYjogbnVtYmVyID0gK2Vycm9yLnNwbGl0KCcsJylbMF07XG4gICAgY29uc3QgZWxTZWxlY3RvciA9IGVycm9yLnNwbGl0KCcsJylbMV0gKyAnaWQnO1xuXG4gICAgLy8gdGhlIHRhYiBjb21wb25lbnRzXG4gICAgY29uc3QgdGFiQ29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50c1t0YWJdO1xuXG4gICAgdGhpcy5jbGlja1RhYih0YWIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGV4cGFuZCBhbGwgc2VjdGlvbnNcbiAgICAgIHRhYkNvbXBvbmVudC5jaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbFNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICB9LCAyMDApO1xuICB9XG5cbiAgcHVibGljIG9uRGF0ZUNoYW5nZWQobm9kZTogTGVhZk5vZGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnTm9kZScsIG5vZGUpO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0V2ZW50JywgZXZlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhJywgdGhpcy5kYXRhU291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVJbmZvcm1hdGlvbihpbmZvSWQpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5mb0lkKTtcblxuICAgIGlmIChlLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcbiAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cblxuICAgIGNvbnNvbGUubG9nKCdJbmZvSWQnLCBpbmZvSWQpO1xuICB9XG5cblxuICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=