import { Injectable } from '@angular/core';

import { Form } from '../form-entry/form-factory/form';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { EncounterViewerService } from './encounter-viewer.service';

import * as moment_ from 'moment';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})

export class EncounterPdfViewerService {
  public innerValue: any = '';

  constructor(
    private encounterViewerService: EncounterViewerService,
    private obsValueAdapter: ObsValueAdapter
  ) {}

  getPages(pages: any, form: Form): any[] {
    let content = [];
    for (let page of pages) {
      for (let question of form.rootNode.question.questions) {
        if (
          page.label === form.rootNode.children[question.key].question.label &&
          this.encounterViewerService.questionsAnswered(
            form.rootNode.children[question.key]
          )
        ) {
          content.push({
            style: 'tableExample',
            table: {
              widths: ['*'],
              headerRows: 1,
              keepWithHeaderRows: 1,
              body: [
                [{ text: page.label, style: 'tableHeader' }],
                [
                  {
                    style: 'tableExample',
                    table: {
                      widths: ['*'],
                      body: this.getSections(page.page, form)
                    },
                    layout: 'noBorders',
                    margin: [5, 0, 0, 0]
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: function(i, node) {
                 return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
              },
              vLineWidth: function(i, node) {
                return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
              },
              hLineColor: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
              },
              vLineColor: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
              }
            }
          });
        }
      }
    }
    return content;
  }

  getSections(sections: any, form: Form): any[] {
    let content = [];
    let answeredSections = [];

    sections.map(s => { 
      if (this.encounterViewerService.questionsAnswered(s.node)) {
        answeredSections.push(s);
      }
    });

    for (let section of answeredSections) {
      content.push([
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: section.label, style: 'tableSubheader' }],
              [ this.getSectionData(section.section, form) ]
            ]
          },
          layout: 'noBorders'
        }
      ]);
    }  
    return content;
  }

  getSectionData(nodes: any, form: Form): any {
    let questions = {
      stack: []
    };

    for (let node of nodes) {
      switch (node.question.renderingType) {
        case 'group':
          if (node.groupMembers) {
            questions.stack.push(this.getSectionData(node.groupMembers, form));
            break;
          }

        case 'field-set':
          if (node.children) {
            const groupMembers = [];
            var result = Object.keys(node.children).map((key) => node.children[key]);

            if (result) {
              groupMembers.push(result);
              questions.stack.push(this.getSectionData(groupMembers[0], form));
            }
            break;
          }

        case 'repeating':
          if (node.groupMembers) {
            questions.stack.push(this.getSectionData(node.groupMembers, form));
            break;
          }

        default:
          let answer = node.control.value;
          this.resolveValue(answer, form);

          if (this.innerValue) {
            questions.stack.push({
              text: [
                `${node.question.label}${
                  node.question.label.indexOf(':') > 1 ? '' : ':'
                } `,
                { text: `${this.innerValue}`, bold: true }
              ], style: 'answers'
            });
          }
      }
    }
    return questions;
  }

  resolveValue(value: any, form: Form, arrayElement?: boolean): any {
    if (value !== this.innerValue) {
      if (this.isUuid(value)) {
        const val = this.encounterViewerService.resolveSelectedValueFromSchema(value, form.schema);
        if (!arrayElement) {
          if (val) {
            this.innerValue = val.toUpperCase();
          } else {
            this.innerValue = value;
          }
        } else {
          return val;
        }
      } else if (_.isArray(value)) {
        const arr = [];
        _.forEach(value, elem => {
          arr.push(this.resolveValue(elem, form, true));
        });
        this.innerValue = arr;
      } else if (this.isDate(value)) {
        if (!arrayElement) {
          this.innerValue = this.encounterViewerService.convertTime(value);
        } else {
          return this.encounterViewerService.convertTime(value);
        }
      } else if (typeof value === 'object') {
        const values = [];
        let result = Object.keys(value).map((key) => [key, value[key]]);

        values.push(result);
        this.innerValue = values;
      } else {
        if (!arrayElement) {
          this.innerValue = value;
        } else {
          return value;
        }
      }
    }
  }

  generatePdfDefinition(form: Form): any {
    const docDefinition = {
      content: this.getPages(
        this.obsValueAdapter.traverse(form.rootNode),
        form
      ),
      styles: {
        answers: {
          fontSize: 8
        },
        confidential: {
          color: 'red',
          fontSize: 8,
          bold: true,
          margin: [60, 0, 0, 0]
        },
        header: {
          fontSize: 9,
          bold: true,
          margin: [5, 5, 5, 5]
        },
        tableExample: {
          fontSize: 10,
          margin: [5, 0, 0, 5]
        },
        tableHeader: {
          fillColor: '#f5f5f5',
          width: ['100%'],
          borderColor: '#333',
          fontSize: 9,
          bold: true,
          margin: [5, 0, 5, 0]
        },
        tableSubheader: {
          fillColor: '#337ab7',
          width: ['100%'],
          fontSize: 9,
          color: 'white',
          margin: [5, 0, 5, 0]
        },
        banner: {
          fillColor: '#d9edf7',
          fontSize: 10,
          bold: true,
          margin: [45, 20, 20, 20]
        },
        bannerLabel: {
          color: '#a9a9a9'
        },
        bannerItem: {
          margin: [20, 0, 10, 0]
        },
        timestamp: {
          alignment: 'center',
          bold: true
        },
        pageNumber: {
          alignment: 'right',
          margin: [0, 0, 5, 5]
        }
      },
      defaultStyle: {
        fontSize: 7
      }
    };

    return docDefinition;
  }

  displayPdf(form) {
    let pdf = pdfMake;
    pdf.vfs = pdfFonts.pdfMake.vfs;
    const dataSources = form.dataSourcesContainer.dataSources;
    const patient = dataSources['patient'];
    let docDefinition = this.generatePdfDefinition(form);

    docDefinition.header = {
      style: 'banner',
      table: {
        body: [
          [
            { 
              text: [
                { text: 'Name: ', style: 'bannerLabel' },
                { text: `${patient.name}` }
              ],
              style: 'bannerItem'
            }, {
              text: [
                { text: 'NID: ', style: 'bannerLabel' },
                { text: `${patient.nid}` }
              ],
              style: 'bannerItem'
            }, {
              text: [
                { text: 'MUI: ', style: 'bannerLabel' },
                { text: `${patient.mui}` }
              ],
              style: 'bannerItem'
            }, { 
              text: [
                { text: 'Birthdate: ', style: 'bannerLabel' },
                { text: `${patient.birthdate} (${patient.age} yo)` }
              ],
              style: 'bannerItem'
            }
          ]
        ]
      },
      layout: 'noBorders'
    }

    docDefinition.footer = (currentPage, pageCount) => {
      return {
        columns: [
	        {
            widths: ['*', '*', '*'],
            stack: [
              {
                text: 
                  `Note: Confidentiality is one of the core duties of all medical practitioners. Patients' personal health information should be kept private.`,
                style: 'confidential'
              }, {
                text: currentPage.toString() + ' of ' + pageCount,
                style: 'pageNumber'
              }, {
                text: `Generated on ` + new Date(),
                style: 'timestamp'
              }
            ]
          }
	      ]
      };
    }

    var win = window.open('', '_blank');
    pdf.createPdf(docDefinition).open({}, win);
  }

  isDate(val: any) {
    return moment(val, moment.ISO_8601, true).isValid();
  }

  isUuid(value: string) {
    return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
  }
}
