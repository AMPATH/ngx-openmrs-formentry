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
import { concat, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
var FormRendererComponent = /** @class */ (function () {
    function FormRendererComponent(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.itemsLoading = false;
        this.itemsInput$ = new Subject();
        this.activeTab = 0;
    }
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            /** @type {?} */
            var tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe(function (error) {
                _this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !((/** @type {?} */ (this.node.question))).isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    };
    /**
     * @param {?} child
     * @return {?}
     */
    FormRendererComponent.prototype.addChildComponent = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        this.childComponents.push(child);
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setUpRemoteSelect = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            /** @type {?} */
            var selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            /** @type {?} */
            var defaltValues = of([]);
            if (this.dataSource.resolveSelectedValue(selectQuestion.control.value)) {
                defaltValues = this.dataSource.resolveSelectedValue(selectQuestion.control.value).pipe(catchError(function () { return of([]); }));
            }
            this.items$ = concat(defaltValues, this.itemsInput$.pipe(debounceTime(200), distinctUntilChanged(), tap(function () { return _this.itemsLoading = true; }), switchMap(function (term) { return _this.dataSource.searchOptions(term).pipe(catchError(function () { return of([]); }), // empty list on error
            tap(function () {
                _this.itemsLoading = false;
            })); })));
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setUpFileUpload = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.checkSection = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.question.renderingType === 'section') {
            /** @type {?} */
            var groupChildrenHidden_1 = false;
            /** @type {?} */
            var allSectionControlsHidden = Object.keys(node.children).every(function (k) {
                /** @type {?} */
                var innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden_1 = Object.keys(innerNode.children).every(function (i) { return innerNode.children[i].control.hidden; });
                }
                return node.children[k].control.hidden || groupChildrenHidden_1;
            });
            return !allSectionControlsHidden;
        }
        return true;
    };
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    FormRendererComponent.prototype.clickTab = /**
     * @param {?} tabNumber
     * @return {?}
     */
    function (tabNumber) {
        this.activeTab = tabNumber;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.loadPreviousTab = /**
     * @return {?}
     */
    function () {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.isCurrentTabFirst = /**
     * @return {?}
     */
    function () {
        return this.activeTab === 0;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.isCurrentTabLast = /**
     * @return {?}
     */
    function () {
        return this.activeTab === this.node.question['questions'].length - 1;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.loadNextTab = /**
     * @return {?}
     */
    function () {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormRendererComponent.prototype.tabSelected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.activeTab = $event.index;
        this.setPreviousTab();
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setPreviousTab = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.hasErrors = /**
     * @return {?}
     */
    function () {
        return this.node.control.touched && !this.node.control.valid;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.errors = /**
     * @return {?}
     */
    function () {
        return this.getErrors(this.node);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    FormRendererComponent.prototype.scrollToControl = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        var _this = this;
        /** @type {?} */
        var tab = +error.split(',')[0];
        /** @type {?} */
        var elSelector = error.split(',')[1] + 'id';
        // the tab components
        /** @type {?} */
        var tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(function () {
            // expand all sections
            tabComponent.childComponents.forEach(function (section) {
                section.isCollapsed = false;
                setTimeout(function () {
                    /** @type {?} */
                    var element = _this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.onDateChanged = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        // console.log('Node', node);
        this.node = node;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FormRendererComponent.prototype.upload = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    };
    /**
     * @param {?} infoId
     * @return {?}
     */
    FormRendererComponent.prototype.toggleInformation = /**
     * @param {?} infoId
     * @return {?}
     */
    function (infoId) {
        /** @type {?} */
        var e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.getErrors = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    FormRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'form-renderer',
                    template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div>\n  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n        <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\"></form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\" [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n    [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section' && checkSection(node)\"> \n  <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div>\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\" [attr.for]=\"node.question.key\">\n      {{node.question.required === true ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n\n      <remote-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        (fileChanged)=\"upload($event)\">\n      </remote-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"items$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"{{node.question.placeholder}}\"\n        [hideSelected]=\"true\" [loading]=\"itemsLoading\"  [typeahead]=\"itemsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n      <!-- <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\"\n        [dataSource]=\"dataSource\" [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"></remote-select> -->\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList' (onDateChange)=\"onDateChanged(node)\"\n        [showWeeks]=\"node.question.showWeeksAdder\"></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" tabindex=\"0\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        bindLabel=\"label\" bindValue=\"value\" [items]=\"node.question.options\" [multiple]=\"true\" placeholder=\"{{node.question.placeholder}}\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" bindLabel=\"label\" bindValue=\"value\" tabindex=\"0\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" [items]=\"node.question.options\" [multiple]=\"false\" placeholder=\"{{node.question.placeholder}}\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"'number'\" [id]=\"node.question.key + 'id' \" [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"node.question.renderingType\" [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\">\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [options]=\"node.question.options\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\" style=\"margin-top: 2px;\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}} </strong>\n                <span class=\"text-primary\" *ngIf=\"node.question.historicalDisplay && node.question.historicalDisplay._date \"> ({{node.question.historicalDisplay._date | timeAgo}})</span>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use\n              Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\" *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>",
                    styles: ['../../style/app.css', DEFAULT_STYLES]
                }] }
    ];
    /** @nocollapse */
    FormRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory },
        { type: DataSources },
        { type: FormErrorsService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    FormRendererComponent.propDecorators = {
        parentComponent: [{ type: Input }],
        node: [{ type: Input }],
        parentGroup: [{ type: Input }]
    };
    return FormRendererComponent;
}());
export { FormRendererComponent };
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
    /** @type {?} */
    FormRendererComponent.prototype.items$;
    /** @type {?} */
    FormRendererComponent.prototype.itemsLoading;
    /** @type {?} */
    FormRendererComponent.prototype.itemsInput$;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQWMsT0FBTyxFQUFtQixNQUFNLE1BQU0sQ0FBQztBQUd4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFHckc7SUF1QkUsK0JBQ1UsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNsQixRQUFhO1FBSC9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNsQixhQUFRLEdBQVIsUUFB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NUMseUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlLCBHcm91cE5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IGNvbmNhdCwgb2YsIE9ic2VydmFibGUsIFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCwgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybS1yZW5kZXJlcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybS1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogWycuLi8uLi9zdHlsZS9hcHAuY3NzJywgREVGQVVMVF9TVFlMRVNdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50Q29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBub2RlOiBOb2RlQmFzZTtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gIHB1YmxpYyBjaGlsZENvbXBvbmVudHM6IEZvcm1SZW5kZXJlckNvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBzaG93VGltZTogYm9vbGVhbjtcbiAgcHVibGljIHNob3dXZWVrczogYm9vbGVhbjtcbiAgcHVibGljIGFjdGl2ZVRhYjogbnVtYmVyO1xuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGlzQ29sbGFwc2VkID0gZmFsc2U7XG4gIHB1YmxpYyBhdXRvOiBhbnk7XG5cbiAgaXRlbXMkOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgaXRlbXNMb2FkaW5nID0gZmFsc2U7XG4gIGl0ZW1zSW5wdXQkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LFxuICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzLFxuICAgIHByaXZhdGUgZm9ybUVycm9yc1NlcnZpY2U6IEZvcm1FcnJvcnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldFVwUmVtb3RlU2VsZWN0KCk7XG4gICAgdGhpcy5zZXRVcEZpbGVVcGxvYWQoKTtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmxhc3RGb3JtVGFiO1xuICAgICAgaWYgKHRhYiAmJiB0YWIgIT09IHRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybScpIHtcbiAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkJC5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Db250cm9sKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICB0aGlzLmlzQ29sbGFwc2VkID0gISh0aGlzLm5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cCkuaXNFeHBhbmRlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGFyZW50Q29tcG9uZW50LmFkZENoaWxkQ29tcG9uZW50KHRoaXMpO1xuICAgIH1cbiAgfVxuXG5cblxuICBwdWJsaWMgYWRkQ2hpbGRDb21wb25lbnQoY2hpbGQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzLnB1c2goY2hpbGQpO1xuICB9XG5cbiAgcHVibGljIHNldFVwUmVtb3RlU2VsZWN0KCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgbGV0IHNlbGVjdFF1ZXN0aW9uID0gdGhpcy5ub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZCh0aGlzLm5vZGUucXVlc3Rpb24ua2V5KVswXTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgbGV0IGRlZmFsdFZhbHVlcyA9IG9mKFtdKTtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUoc2VsZWN0UXVlc3Rpb24uY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgZGVmYWx0VmFsdWVzID0gdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHNlbGVjdFF1ZXN0aW9uLmNvbnRyb2wudmFsdWUpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihbXSkpLCAvLyBlbXB0eSBsaXN0IG9uIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXRlbXMkID0gY29uY2F0KFxuICAgICAgICBkZWZhbHRWYWx1ZXMsXG4gICAgICAgIHRoaXMuaXRlbXNJbnB1dCQucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLml0ZW1zTG9hZGluZyA9IHRydWUpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHRlcm0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKFtdKSksIC8vIGVtcHR5IGxpc3Qgb24gZXJyb3JcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhU291cmNlT3B0aW9ucyA9IHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VXBGaWxlVXBsb2FkKCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdLZXknLCB0aGlzLm5vZGUucXVlc3Rpb24pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0RhdGEgc291cmNlJywgdGhpcy5kYXRhU291cmNlKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrU2VjdGlvbihub2RlOiBOb2RlQmFzZSkge1xuICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJykge1xuICAgICAgbGV0IGdyb3VwQ2hpbGRyZW5IaWRkZW4gPSBmYWxzZTtcbiAgICAgIGxldCBhbGxTZWN0aW9uQ29udHJvbHNIaWRkZW4gPSBPYmplY3Qua2V5cyhub2RlLmNoaWxkcmVuKS5ldmVyeSgoaykgPT4ge1xuICAgICAgICBsZXQgaW5uZXJOb2RlID0gbm9kZS5jaGlsZHJlbltrXTtcbiAgICAgICAgaWYgKGlubmVyTm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgIGdyb3VwQ2hpbGRyZW5IaWRkZW4gPSBPYmplY3Qua2V5cyhpbm5lck5vZGUuY2hpbGRyZW4pLmV2ZXJ5KChpKSA9PiBpbm5lck5vZGUuY2hpbGRyZW5baV0uY29udHJvbC5oaWRkZW4pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW5ba10uY29udHJvbC5oaWRkZW4gfHwgZ3JvdXBDaGlsZHJlbkhpZGRlbjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICFhbGxTZWN0aW9uQ29udHJvbHNIaWRkZW47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsaWNrVGFiKHRhYk51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiRmlyc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiAtIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0N1cnJlbnRUYWJGaXJzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWIgPT09IDA7XG4gIH1cblxuICBwdWJsaWMgaXNDdXJyZW50VGFiTGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWIgPT09IHRoaXMubm9kZS5xdWVzdGlvblsncXVlc3Rpb25zJ10ubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkTmV4dFRhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiTGFzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiICsgMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG4gIHB1YmxpYyB0YWJTZWxlY3RlZCgkZXZlbnQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9ICRldmVudC5pbmRleDtcbiAgICB0aGlzLnNldFByZXZpb3VzVGFiKCk7XG4gIH1cbiAgcHVibGljIHNldFByZXZpb3VzVGFiKCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm9bJ2xhc3RGb3JtVGFiJ10gPSB0aGlzLmFjdGl2ZVRhYjtcbiAgICB9XG5cbiAgfVxuICBwdWJsaWMgaGFzRXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUuY29udHJvbC50b3VjaGVkICYmICF0aGlzLm5vZGUuY29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHB1YmxpYyBlcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JzKHRoaXMubm9kZSk7XG4gIH1cblxuXG4gIHB1YmxpYyBzY3JvbGxUb0NvbnRyb2woZXJyb3I6IHN0cmluZykge1xuXG4gICAgY29uc3QgdGFiOiBudW1iZXIgPSArZXJyb3Iuc3BsaXQoJywnKVswXTtcbiAgICBjb25zdCBlbFNlbGVjdG9yID0gZXJyb3Iuc3BsaXQoJywnKVsxXSArICdpZCc7XG5cbiAgICAvLyB0aGUgdGFiIGNvbXBvbmVudHNcbiAgICBjb25zdCB0YWJDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRzW3RhYl07XG5cbiAgICB0aGlzLmNsaWNrVGFiKHRhYik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gZXhwYW5kIGFsbCBzZWN0aW9uc1xuICAgICAgdGFiQ29tcG9uZW50LmNoaWxkQ29tcG9uZW50cy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICAgIHNlY3Rpb24uaXNDb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsU2VsZWN0b3IpO1xuICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQuZm9jdXMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBwdWJsaWMgb25EYXRlQ2hhbmdlZChub2RlOiBMZWFmTm9kZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdOb2RlJywgbm9kZSk7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnRXZlbnQnLCBldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ0RhdGEnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKGluZm9JZCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmZvSWQpO1xuXG4gICAgaWYgKGUuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuXG4gICAgY29uc29sZS5sb2coJ0luZm9JZCcsIGluZm9JZCk7XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0RXJyb3JzKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgY29uc3QgZXJyb3JzOiBhbnkgPSBub2RlLmNvbnRyb2wuZXJyb3JzO1xuXG4gICAgaWYgKGVycm9ycykge1xuXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uRmFjdG9yeS5lcnJvcnMoZXJyb3JzLCBub2RlLnF1ZXN0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cbn1cbiJdfQ==