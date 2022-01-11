import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
// import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, LeafNode, GroupNode } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { DataSource } from '../question-models/interfaces/data-source';
import { FormErrorsService } from '../services/form-errors.service';
import { QuestionGroup } from '../question-models/group-question';
import { SelectOption } from '../question-models/interfaces/select-option';

// import { concat, of, Observable, Subject, BehaviorSubject } from 'rxjs';
// import * as _ from 'lodash';

// import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
// import { QuestionBase } from '../question-models';

@Component({
  selector: 'form-renderer',
  templateUrl: 'form-renderer.component.html',
  styles: ['../../style/app.css', DEFAULT_STYLES]
})
export class FormRendererComponent implements OnInit, OnChanges {
  @Input() public parentComponent: FormRendererComponent;
  @Input() public node: NodeBase;
  @Input() public parentGroup: AfeFormGroup;
  @Input() public labelMap: Object;
  public childComponents: FormRendererComponent[] = [];
  public showTime: boolean;
  public showWeeks: boolean;
  public activeTab: number;
  public dataSource: DataSource;
  public isCollapsed = false;
  public auto: any;
  public followFocus = true;
  public cacheActive = false;
  public isNavigation = true;
  public type = 'default';
  inlineDatePicker: Date = new Date();


  constructor(
    private validationFactory: ValidationFactory,
    private dataSources: DataSources,
    private formErrorsService: FormErrorsService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.activeTab = 0;
  }

  public ngOnInit() {
    this.setUpRemoteSelect();
    this.setUpFileUpload();
    this.loadLabels();
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
      this.isCollapsed = !(this.node.question as QuestionGroup).isExpanded;
    }

    if (this.parentComponent) {
      this.parentComponent.addChildComponent(this);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.labelMap) {
      this.loadLabels();
    }
  }

  public addChildComponent(child: FormRendererComponent) {
    this.childComponents.push(child);
  }

  public setUpRemoteSelect() {
    if (
      this.node &&
      this.node.question.extras &&
      this.node.question.renderingType === 'remote-select'
    ) {
      // let selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
      this.dataSource = this.dataSources.dataSources[
        this.node.question.dataSource
      ];
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

  public setUpFileUpload() {
    if (
      this.node &&
      this.node.question.extras &&
      this.node.question.renderingType === 'file'
    ) {
      this.dataSource = this.dataSources.dataSources[
        this.node.question.dataSource
      ];
      // console.log('Key', this.node.question);
      // console.log('Data source', this.dataSource);
    }
  }

  public loadLabels() {
    if (!this.node.question.label && this.labelMap[this.node.question.extras?.questionOptions?.concept]) {
      this.node.question.label = this.labelMap[this.node.question.extras.questionOptions.concept];
    }
    if (this.node.question.options) {
      this.node.question.options.forEach((option) => {
        if (!option.label && this.labelMap[option.value]) {
          option.label = this.labelMap[option.value];
        }
      });
    }
  }

  checkSection(node: NodeBase) {
    if (node.question.renderingType === 'section') {
      let groupChildrenHidden = false;
      const allSectionControlsHidden = Object.keys(node.children).every((k) => {
        const innerNode = node.children[k];
        if (innerNode instanceof GroupNode) {
          groupChildrenHidden = Object.keys(innerNode.children).every(
            (i) => innerNode.children[i].control.hidden
          );
        }
        return node.children[k].control.hidden || groupChildrenHidden;
      });
      return !allSectionControlsHidden;
    }
    return true;
  }

  public clickTab(tabNumber) {
    this.activeTab = tabNumber;
  }

  public loadPreviousTab() {
    if (!this.isCurrentTabFirst()) {
      this.clickTab(this.activeTab - 1);
      document.body.scrollTop = 0;
    }
  }

  public isCurrentTabFirst() {
    return this.activeTab === 0;
  }

  public isCurrentTabLast() {
    return this.activeTab === this.node.question['questions'].length - 1;
  }

  public loadNextTab() {
    if (!this.isCurrentTabLast()) {
      this.clickTab(this.activeTab + 1);
      document.body.scrollTop = 0;
    }
  }
  public tabSelected($event) {
    this.activeTab = $event;
    this.setPreviousTab();
  }
  public setPreviousTab() {
    if (this.node && this.node.form) {
      this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
    }
  }
  public hasErrors() {
    return this.node.control.touched && !this.node.control.valid;
  }

  public errors() {
    return this.getErrors(this.node);
  }

  public scrollToControl(error: string) {
    const tab: number = +error.split(',')[0];
    const elSelector = error.split(',')[1] + 'id';

    // the tab components
    const tabComponent: FormRendererComponent = this.childComponents[tab];

    this.clickTab(tab);

    setTimeout(() => {
      // expand all sections
      tabComponent.childComponents.forEach((section) => {
        section.isCollapsed = false;

        setTimeout(() => {
          const element: any = this.document.getElementById(elSelector);
          if (element !== null && element.focus) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      });
    }, 200);
  }

  public onDateChanged(node: LeafNode) {
    // console.log('Node', node);
    this.node = node;
  }

  public upload(event) {
    // console.log('Event', event);
    // console.log('Data', this.dataSource);
  }

  public toggleInformation(infoId) {
    const e = document.getElementById(infoId);

    if (e.style.display === 'block') {
      e.style.display = 'none';
    } else {
      e.style.display = 'block';
    }
  }
  private getErrors(node: NodeBase) {
    const errors: any = node.control.errors;

    if (errors) {
      return this.validationFactory.errors(errors, node.question);
    }

    return [];
  }

}
