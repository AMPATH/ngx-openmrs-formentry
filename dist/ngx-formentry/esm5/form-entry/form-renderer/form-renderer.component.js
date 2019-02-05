/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var FormRendererComponent = /** @class */ (function () {
    function FormRendererComponent(validationFactory, dataSources, formErrorsService, document) {
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
            this.formErrorsService.announceErrorField$.subscribe((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.scrollToControl(error);
            }));
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
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
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
            var allSectionControlsHidden = Object.keys(node.children).every((/**
             * @param {?} k
             * @return {?}
             */
            function (k) {
                /** @type {?} */
                var innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden_1 = Object.keys(innerNode.children).every((/**
                     * @param {?} i
                     * @return {?}
                     */
                    function (i) { return innerNode.children[i].control.hidden; }));
                }
                return node.children[k].control.hidden || groupChildrenHidden_1;
            }));
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
        this.activeTab = $event;
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
        setTimeout((/**
         * @return {?}
         */
        function () {
            // expand all sections
            tabComponent.childComponents.forEach((/**
             * @param {?} section
             * @return {?}
             */
            function (section) {
                section.isCollapsed = false;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var element = _this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }), 100);
            }));
        }), 200);
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
                    template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div>\n  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n        <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n          <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\"></form-renderer>\n        </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\" [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n    [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section' && checkSection(node)\"> \n  <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div>\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\" *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\" [attr.for]=\"node.question.key\">\n      {{node.question.required === true ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n      <remote-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        (fileChanged)=\"upload($event)\">\n      </remote-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\" *ngSwitchCase=\"'textarea'\"\n        [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n      <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\" [dataSource]=\"dataSource\"\n        [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"></remote-select>\n  <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\" \n            [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList'\n            (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" ></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" [style.height]=\"'auto'\"  [style.overflow-x]=\"'hidden'\" tabindex=\"0\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\" [multiple]=\"true\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" [style.height]='auto' tabindex=\"0\" [formControlName]=\"node.question.key\"\n      [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\" [multiple]=\"false\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"'number'\" [id]=\"node.question.key + 'id' \" [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"node.question.renderingType\" [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\"> {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [options]=\"node.question.options\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}}</strong>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\" *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \" [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br/>\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \" [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br/>\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \" [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \" [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>\n",
                    styles: ['../../style/app.css', DEFAULT_STYLES]
                },] },
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHcEU7SUFpTkUsK0JBQ1EsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNsQixRQUFhO1FBSC9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBWmhDLG9CQUFlLEdBQTRCLEVBQUUsQ0FBQztRQUs5QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQVF6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU0sd0NBQVE7OztJQUFmO1FBQUEsaUJBdUJDO1FBdEJD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QU0sU0FBQyxRQUFROzs7a0NBZmYsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7O0lBNExSLDRCQUFDO0NBQUEsQUFwWUQsSUFvWUM7U0FqTVkscUJBQXFCOzs7SUFHaEMsZ0RBQXVEOztJQUN2RCxxQ0FBK0I7O0lBQy9CLDRDQUEwQzs7SUFDMUMsZ0RBQXFEOztJQUNyRCx5Q0FBeUI7O0lBQ3pCLDBDQUEwQjs7SUFDMUIsMENBQXlCOztJQUN6QiwyQ0FBOEI7O0lBQzlCLDRDQUEyQjs7SUFDM0IscUNBQWlCOzs7OztJQUdqQixrREFBNEM7Ozs7O0lBQzVDLDRDQUFnQzs7Ozs7SUFDaEMsa0RBQTRDOzs7OztJQUM1Qyx5Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBERUZBVUxUX1NUWUxFUyB9IGZyb20gJy4vZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWdyb3VwJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGU6IGA8IS0tQ09OVEFJTkVSUy0tPlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nXCI+XG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi10YWJzIGZvcm1zLWRyb3Bkb3duXCI+XG4gICAgPGEgY2xhc3M9XCJidG4gZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtZG93blwiPjwvaT5cbiAgICA8L2E+XG4gICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0IGZvcm1zLWRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRyb3Bkb3duTWVudVwiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwiY2xpY2tUYWIoaSlcIj5cbiAgICAgICAge3txdWVzdGlvbi5sYWJlbH19XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuICA8bWF0LXRhYi1ncm91cCAoc2VsZWN0ZWRJbmRleENoYW5nZSk9J3RhYlNlbGVjdGVkKCRldmVudCknIFtzZWxlY3RlZEluZGV4XT0nYWN0aXZlVGFiJz5cbiAgICA8bWF0LXRhYiBbbGFiZWxdPSdxdWVzdGlvbi5sYWJlbCcgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICA8ZGl2IChzd2lwZUxlZnQpPSdsb2FkTmV4dFRhYigpJyAoc3dpcGVSaWdodCk9J2xvYWRQcmV2aW91c1RhYigpJz5cbiAgICAgICAgICA8Zm9ybS1yZW5kZXJlciBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L21hdC10YWI+XG4gIDwvbWF0LXRhYi1ncm91cD5cblxuICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cImxvYWRQcmV2aW91c1RhYigpXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBpc0N1cnJlbnRUYWJGaXJzdCgpfVwiPiZsdDsmbHQ7PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwibG9hZE5leHRUYWIoKVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogaXNDdXJyZW50VGFiTGFzdCgpfVwiPlxuICAgICAgJmd0OyZndDs8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJ1wiPlxuICA8IS0tPGgyPnt7bm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oMj4tLT5cbiAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIj48L2Zvcm0tcmVuZGVyZXI+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJyAmJiBjaGVja1NlY3Rpb24obm9kZSlcIj4gXG4gIDxkaXYgY2xhc3M9XCJwYW5lbCAgcGFuZWwtcHJpbWFyeVwiPlxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgKGNsaWNrKT1cImlzQ29sbGFwc2VkID0gIWlzQ29sbGFwc2VkXCI+XG4gICAgICAgIHt7aXNDb2xsYXBzZWQgPyAnU2hvdycgOiAnSGlkZSd9fVxuICAgICAgPC9idXR0b24+IHt7bm9kZS5xdWVzdGlvbi5sYWJlbH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBbY29sbGFwc2VdPVwiaXNDb2xsYXBzZWRcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBNRVNTQUdFUyAtLT5cbjxkaXYgKm5nSWY9XCJub2RlLmNvbnRyb2wgJiYgbm9kZS5jb250cm9sLmFsZXJ0ICYmIG5vZGUuY29udHJvbC5hbGVydCAhPT0gJydcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj5cbiAgPGEgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCI+JnRpbWVzOzwvYT4ge3tub2RlLmNvbnRyb2wuYWxlcnR9fVxuPC9kaXY+XG5cbjwhLS1DT05UUk9MUy0tPlxuXG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiIGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIlxuICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cbiAgPCEtLUxFQUYgQ09OVFJPTC0tPlxuICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24tYXJlYVwiPlxuICAgIDxhIGNsYXNzPVwiZm9ybS10b29sdGlwIHB1bGwtcmlnaHRcIiAoY2xpY2spPVwidG9nZ2xlSW5mb3JtYXRpb24obm9kZS5xdWVzdGlvbi5leHRyYXMuaWQpXCIgZGF0YS1wbGFjZW1lbnQ9XCJyaWdodFwiICpuZ0lmPVwibm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJyAnXCI+XG4gICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L2E+XG5cbiAgICA8bGFiZWwgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmxhYmVsXCIgW3N0eWxlLmNvbG9yXT1cImhhc0Vycm9ycygpPyAncmVkJyA6JydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIiBbYXR0ci5mb3JdPVwibm9kZS5xdWVzdGlvbi5rZXlcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5yZXF1aXJlZCA9PT0gdHJ1ZSA/ICcqJzonJ319IHt7bm9kZS5xdWVzdGlvbi5sYWJlbH19XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFtuZ1ZhbHVlXT1cIm8udmFsdWVcIj57e28ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPHJlbW90ZS1maWxlLXVwbG9hZCAqbmdTd2l0Y2hDYXNlPVwiJ2ZpbGUnXCIgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgKGZpbGVDaGFuZ2VkKT1cInVwbG9hZCgkZXZlbnQpXCI+XG4gICAgICA8L3JlbW90ZS1maWxlLXVwbG9hZD5cbiAgICAgIDx0ZXh0YXJlYSBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIFtyb3dzXT1cIm5vZGUucXVlc3Rpb24ucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgPC90ZXh0YXJlYT5cbiAgICAgIDxyZW1vdGUtc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIiBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIHRhYmluZGV4PVwiMFwiIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIlxuICAgICAgICBbY29tcG9uZW50SURdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L3JlbW90ZS1zZWxlY3Q+XG4gIDwhLS0gIFxuICAgICAgPGRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgdGFiaW5kZXg9XCIwXCIgW3dlZWtzXT0nbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCdcbiAgICAgICAgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCIgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L2RhdGUtdGltZS1waWNrZXI+XG4gIC0tPlxuXG4gICAgICA8bmd4LWRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFxuICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFt3ZWVrc109J25vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy53ZWVrc0xpc3QnXG4gICAgICAgICAgICAob25EYXRlQ2hhbmdlKT1cIm9uRGF0ZUNoYW5nZWQobm9kZSlcIiBbc2hvd1dlZWtzXT1cIm5vZGUucXVlc3Rpb24uc2hvd1dlZWtzQWRkZXJcIiA+PC9uZ3gtZGF0ZS10aW1lLXBpY2tlcj5cbiAgICAgIDxuZy1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidtdWx0aS1zZWxlY3QnXCIgW3N0eWxlLmhlaWdodF09XCInYXV0bydcIiAgW3N0eWxlLm92ZXJmbG93LXhdPVwiJ2hpZGRlbidcIiB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAgICA8L25nLXNlbGVjdD5cbiAgICAgIDxuZy1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidzaW5nbGUtc2VsZWN0J1wiIFtzdHlsZS5oZWlnaHRdPSdhdXRvJyB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIiBbbXVsdGlwbGVdPVwiZmFsc2VcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleSBcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyIFwiXG4gICAgICAgIFt0eXBlXT1cIidudW1iZXInXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJyBcIiBbc3RlcF09XCInYW55J1wiIFttaW5dPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1pblwiXG4gICAgICAgIFttYXhdPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1heFwiPlxuICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoRGVmYXVsdCBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5IFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXIgXCJcbiAgICAgICAgW3R5cGVdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJyBcIj5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbCBuby1ib3JkZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFt2YWx1ZV09XCJvLnZhbHVlXCI+IHt7IG8ubGFiZWwgfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCI+XG4gICAgICAgIDxjaGVja2JveCBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPjwvY2hlY2tib3g+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtOVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2FybmluZ1wiPlByZXZpb3VzIFZhbHVlOiA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmc+e3tub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Py50ZXh0fX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+IHwgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj57e25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/Ll9kYXRlfX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtub2RlXT1cIm5vZGVcIiBbbmFtZV09XCInaGlzdG9yeVZhbHVlJ1wiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbWFsbCBjb2wteHMtM1wiPlVzZSBWYWx1ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YXBwb2ludG1lbnRzLW92ZXJ2aWV3IFtub2RlXT1cIm5vZGVcIj48L2FwcG9pbnRtZW50cy1vdmVydmlldz5cbiAgICAgIDxkaXYgKm5nSWY9XCJoYXNFcnJvcnMoKSBcIj5cbiAgICAgICAgPHAgKm5nRm9yPVwibGV0IGUgb2YgZXJyb3JzKCkgXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlciBcIj57e2V9fTwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24taW5mbyBjb2wtbWQtMTIgY29sLWxnLTEyIGNvbC1zbS0xMlwiIGlkPVwie3tub2RlLnF1ZXN0aW9uLmV4dHJhcy5pZH19XCIgKm5nSWY9XCJub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnJyAgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICE9PSAnICdcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvfX1cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uY29udHJvbFR5cGUgPT09IDFcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cblxuXG4gIDwhLS1BUlJBWSBDT05UUk9MLS0+XG4gIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSBcIj5cbiAgICA8ZGl2IGNsYXNzPSd3ZWxsJyBzdHlsZT1cInBhZGRpbmc6IDJweDsgXCIgKm5nU3dpdGNoQ2FzZT1cIiAncmVwZWF0aW5nJyBcIj5cbiAgICAgIDxoNCBzdHlsZT1cIm1hcmdpbjogMnB4OyBmb250LXdlaWdodDogYm9sZDtcIj57e25vZGUucXVlc3Rpb24ubGFiZWx9fTwvaDQ+XG4gICAgICA8aHIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMnB4OyBtYXJnaW4tcmlnaHQ6LTJweDsgbWFyZ2luLWJvdHRvbTo0cHg7IG1hcmdpbi10b3A6OHB4OyBib3JkZXItd2lkdGg6MnB4O1wiIC8+XG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlXCI+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXN0T3JkZXInXCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgICAgIDxkaXY+e3tjaGlsZC5vcmRlck51bWJlcn19PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tc20gYnRuLWRhbmdlcicgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSkgXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjFweDtcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInb2JzR3JvdXAnXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOjIwcHg7XCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGFuZ2VyJyAoY2xpY2spPVwibm9kZS5yZW1vdmVBdChpKSBcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aHIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMnB4OyBtYXJnaW4tcmlnaHQ6LTJweDsgbWFyZ2luLWJvdHRvbTo0cHg7IG1hcmdpbi10b3A6OHB4OyBib3JkZXItd2lkdGg6MXB4O1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tcHJpbWFyeScgKGNsaWNrKT1cIm5vZGUuY3JlYXRlQ2hpbGROb2RlKCkgXCI+QWRkPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAyXCIgW2hpZGRlbl09XCJub2RlLmNvbnRyb2wuaGlkZGVuXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBub2RlLmNvbnRyb2wuZGlzYWJsZWR9XCI+XG5cbiAgPCEtLUdST1VQLS0+XG4gIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSBcIj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2dyb3VwJyBcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiIFtwYXJlbnRHcm91cF09XCJub2RlLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIiAnZmllbGQtc2V0JyBcIiBzdHlsZT1cImJvcmRlcjogMXB4IHNvbGlkICNlZWVlZWU7IHBhZGRpbmc6IDJweDsgbWFyZ2luOiAycHg7XCI+XG4gICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbJy4uLy4uL3N0eWxlL2FwcC5jc3MnLCBERUZBVUxUX1NUWUxFU11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybVJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG5vZGU6IE5vZGVCYXNlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgcHVibGljIGNoaWxkQ29tcG9uZW50czogRm9ybVJlbmRlcmVyQ29tcG9uZW50W10gPSBbXTtcbiAgcHVibGljIHNob3dUaW1lOiBib29sZWFuO1xuICBwdWJsaWMgc2hvd1dlZWtzOiBib29sZWFuO1xuICBwdWJsaWMgYWN0aXZlVGFiOiBudW1iZXI7XG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHVibGljIGF1dG86IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzLFxuICBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZSxcbiAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0VXBSZW1vdGVTZWxlY3QoKTtcbiAgICB0aGlzLnNldFVwRmlsZVVwbG9hZCgpO1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIGNvbnN0IHRhYiA9IHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ubGFzdEZvcm1UYWI7XG4gICAgICBpZiAodGFiICYmIHRhYiAhPT0gdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJykge1xuICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQkLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0NvbnRyb2woZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhKHRoaXMubm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwKS5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudENvbXBvbmVudCkge1xuICAgICAgdGhpcy5wYXJlbnRDb21wb25lbnQuYWRkQ2hpbGRDb21wb25lbnQodGhpcyk7XG4gICAgfVxuICB9XG5cblxuXG4gIHB1YmxpYyBhZGRDaGlsZENvbXBvbmVudChjaGlsZDogRm9ybVJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMucHVzaChjaGlsZCk7XG4gIH1cblxuICBwdWJsaWMgc2V0VXBSZW1vdGVTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwRmlsZVVwbG9hZCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAvLyBjb25zb2xlLmxvZygnS2V5JywgdGhpcy5ub2RlLnF1ZXN0aW9uKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhIHNvdXJjZScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1NlY3Rpb24obm9kZTogTm9kZUJhc2UpIHtcbiAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIGxldCBncm91cENoaWxkcmVuSGlkZGVuID0gZmFsc2U7XG4gICAgICBsZXQgYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikuZXZlcnkoKGspID0+IHtcbiAgICAgICAgbGV0IGlubmVyTm9kZSA9IG5vZGUuY2hpbGRyZW5ba107XG4gICAgICAgIGlmIChpbm5lck5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICBncm91cENoaWxkcmVuSGlkZGVuID0gT2JqZWN0LmtleXMoaW5uZXJOb2RlLmNoaWxkcmVuKS5ldmVyeSgoaSkgPT4gaW5uZXJOb2RlLmNoaWxkcmVuW2ldLmNvbnRyb2wuaGlkZGVuKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuW2tdLmNvbnRyb2wuaGlkZGVuIHx8IGdyb3VwQ2hpbGRyZW5IaWRkZW47XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAhYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gcHVibGljIGNsaWNrVGFiKHRhYk51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiRmlyc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiAtIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyAgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljICBpc0N1cnJlbnRUYWJMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5ub2RlLnF1ZXN0aW9uWydxdWVzdGlvbnMnXS5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljICBsb2FkTmV4dFRhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiTGFzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiICsgMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG4gIHB1YmxpYyAgdGFiU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAkZXZlbnQ7XG4gICAgdGhpcy5zZXRQcmV2aW91c1RhYigpO1xuICB9XG4gIHB1YmxpYyAgc2V0UHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuZm9ybSkge1xuICAgICAgdGhpcy5ub2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mb1snbGFzdEZvcm1UYWInXSA9IHRoaXMuYWN0aXZlVGFiO1xuICAgIH1cblxuICB9XG4gcHVibGljICAgaGFzRXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUuY29udHJvbC50b3VjaGVkICYmICF0aGlzLm5vZGUuY29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHB1YmxpYyAgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cblxuICBwdWJsaWMgc2Nyb2xsVG9Db250cm9sKGVycm9yOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHRhYjogbnVtYmVyID0gK2Vycm9yLnNwbGl0KCcsJylbMF07XG4gICAgY29uc3QgZWxTZWxlY3RvciA9IGVycm9yLnNwbGl0KCcsJylbMV0gKyAnaWQnO1xuXG4gICAgLy8gdGhlIHRhYiBjb21wb25lbnRzXG4gICAgY29uc3QgdGFiQ29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50c1t0YWJdO1xuXG4gICAgdGhpcy5jbGlja1RhYih0YWIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGV4cGFuZCBhbGwgc2VjdGlvbnNcbiAgICAgIHRhYkNvbXBvbmVudC5jaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbFNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICB9LCAyMDApO1xuICB9XG5cbiAgcHVibGljIG9uRGF0ZUNoYW5nZWQobm9kZTogTGVhZk5vZGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnTm9kZScsIG5vZGUpO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0V2ZW50JywgZXZlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhJywgdGhpcy5kYXRhU291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVJbmZvcm1hdGlvbihpbmZvSWQpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5mb0lkKTtcblxuICAgIGlmIChlLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcbiAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICB9IGVsc2Uge1xuICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICB9XG5cblxuICAgIGNvbnNvbGUubG9nKCdJbmZvSWQnLCBpbmZvSWQpO1xuICB9XG5cblxuICAgcHJpdmF0ZSBnZXRFcnJvcnMobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBlcnJvcnM6IGFueSA9IG5vZGUuY29udHJvbC5lcnJvcnM7XG5cbiAgICBpZiAoZXJyb3JzKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19