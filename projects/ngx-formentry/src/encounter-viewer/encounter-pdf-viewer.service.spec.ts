import { TestBed, async } from '@angular/core/testing';

import { EncounterPdfViewerService } from './encounter-pdf-viewer.service';
import { EncounterViewerService } from './encounter-viewer.service';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { ObsAdapterHelper } from '../form-entry/value-adapters/obs-adapter-helper';
import { Form } from '../form-entry/form-factory/form';
import { FormFactory } from '../form-entry/form-factory/form.factory';
import { QuestionFactory, ControlRelationsFactory, ValidationFactory } from '../form-entry/form-factory';
import { FormControlService } from '../form-entry/form-factory/form-control.service';
import { HidersDisablersFactory } from '../form-entry/form-factory/hiders-disablers.factory';
import { AlertsFactory } from '../form-entry/form-factory/show-messages.factory';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
import { JsExpressionHelper } from '../form-entry/helpers/js-expression-helper';
import { DebugModeService } from '../form-entry/services/debug-mode.service';

const adultForm = require('../mock/schema/compiled-adult-return.json');

describe('EncounterPdfViewerService', () => {
  let service: EncounterPdfViewerService;
  let obsAdapter: any;
  let formFactory: any;
  let form: Form;
  let adultFormSchema: any;
  let pages: any;
  let sections: any;
  let nodes: any;

  beforeEach(async() => {
    adultFormSchema = JSON.parse(JSON.stringify(adultForm));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EncounterViewerService,
        ObsValueAdapter,
        ObsAdapterHelper,
        FormFactory,
        FormControlService,
        QuestionFactory,
        ValidationFactory,
        ControlRelationsFactory,
        HidersDisablersFactory,
        ExpressionRunner,
        JsExpressionHelper,
        DebugModeService,
        AlertsFactory
      ]
    });

    formFactory = TestBed.get(FormFactory);
    obsAdapter = TestBed.get(ObsValueAdapter);
    service = TestBed.get(EncounterPdfViewerService);

    form = formFactory.createForm(adultFormSchema);
    form.dataSourcesContainer.dataSources['patient'] = {
      name: 'Test Patient',
      mui: '447062073-5',
      birthdate: '7/7/1982',
      age: '43',
      nid: '1234567'
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a generatePdfDefinition function that returns a document definition object', () => {
    let failResult = service.generatePdfDefinition(form);
    expect(failResult.content.length).not.toBeGreaterThan(0); // empty content array
    expect(failResult.styles).toBeTruthy();

    form.rootNode.children['ART History'].children['ART History'].children['current_art_regimen_adult'].initialValue = [
      {
        concept: { 
          name: {
            display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
          },
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: null,
        obsDateTime: '2016-12-01T11:33:57.000+0300',
        uuid: '81dd8e5c-2a77-4296-ac7e-bb57ca3d9add',
        value: {
          display: 'LAMIVUDINE AND TENOFOVIR',
          uuid: 'a89cc876-1350-11df-a1f1-0026b9348838'
        }
      },
      {
        concept: {
          name: {
            display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
          },
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: null,
        obsDatetime: '2016-12-01T11:33:57.000+0300',
        uuid: "d240d15d-d60a-444c-8def-0de6e932f7d8",
        value: {
          display: 'NEVIRAPINE LAMIVUDINE AND ZIDOVUDINE',
          uuid: "6a73f32d-1870-4527-af6e-74443251ded2"
        }
      },
      {
        concept: {
          name: {
            display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
          },
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: null,
        obsDatetime: '2016-12-01T11:33:57.000+0300',
        uuid: '0e3c1864-11b7-4a32-8c10-5462b5e79210',
        value: {
          display: 'TENOFOVIR AND LAMIVUDINE AND EFAVIRENZ',
          uuid: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
        }
      }
    ]

    form.rootNode.children['ART History'].children['ART History'].children['current_art_regimen_adult'].control.value = [
      'a89cc876-1350-11df-a1f1-0026b9348838', '6a73f32d-1870-4527-af6e-74443251ded2', '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
    ]

    let successResult = service.generatePdfDefinition(form);
    expect(successResult.content.length).toBeGreaterThan(0);
    expect(successResult.styles).toBeTruthy();
  });

  it('should have a displayPdf function that appends patient and confidentiality information to the PDF footer and creates the eventual PDF document', () => {
    let failResult = service.displayPdf(form);

    expect(failResult).not.toBeDefined(); // empty document definition

    form.rootNode.children['ART History'].children['ART History'].children['current_art_regimen_adult'].initialValue = [
      {
        concept: { 
          name: {
            display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
          },
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: null,
        obsDateTime: '2016-12-01T11:33:57.000+0300',
        uuid: '81dd8e5c-2a77-4296-ac7e-bb57ca3d9add',
        value: {
          display: 'LAMIVUDINE AND TENOFOVIR',
          uuid: 'a89cc876-1350-11df-a1f1-0026b9348838'
        }
      },
      {
        concept: {
          name: {
            display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
          },
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: null,
        obsDatetime: '2016-12-01T11:33:57.000+0300',
        uuid: "d240d15d-d60a-444c-8def-0de6e932f7d8",
        value: {
          display: 'NEVIRAPINE LAMIVUDINE AND ZIDOVUDINE',
          uuid: "6a73f32d-1870-4527-af6e-74443251ded2"
        }
      },
      {
        concept: {
          name: {
            display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
          },
          uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
        },
        groupMembers: null,
        obsDatetime: '2016-12-01T11:33:57.000+0300',
        uuid: '0e3c1864-11b7-4a32-8c10-5462b5e79210',
        value: {
          display: 'TENOFOVIR AND LAMIVUDINE AND EFAVIRENZ',
          uuid: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
        }
      }
    ]

    form.rootNode.children['ART History'].children['ART History'].children['current_art_regimen_adult'].control.value = [
      'a89cc876-1350-11df-a1f1-0026b9348838', '6a73f32d-1870-4527-af6e-74443251ded2', '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
    ]

    let successResult = service.displayPdf(form);
  });

  it('should have a getPages function that appends pages whose sections have answered questions to the PDF document recursively', () => {  
    pages = obsAdapter.traverse(form.rootNode);
    let failResult = service.getPages(pages, form);

    // form does not have any pages initially
    expect(failResult).toEqual([]);

    form.rootNode.children['ART History'].children['ART History'].children['current_art_regimen_adult'].initialValue = [
        {
          concept: { 
            name: {
              display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
            },
            uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
          },
          groupMembers: null,
          obsDateTime: '2016-12-01T11:33:57.000+0300',
          uuid: '81dd8e5c-2a77-4296-ac7e-bb57ca3d9add',
          value: {
            display: 'LAMIVUDINE AND TENOFOVIR',
            uuid: 'a89cc876-1350-11df-a1f1-0026b9348838'
          }
        },
        {
          concept: {
            name: {
              display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
            },
            uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
          },
          groupMembers: null,
          obsDatetime: '2016-12-01T11:33:57.000+0300',
          uuid: "d240d15d-d60a-444c-8def-0de6e932f7d8",
          value: {
            display: 'NEVIRAPINE LAMIVUDINE AND ZIDOVUDINE',
            uuid: "6a73f32d-1870-4527-af6e-74443251ded2"
          }
        },
        {
          concept: {
            name: {
              display: 'CURRENT ANTIRETROVIRAL DRUGS USED FOR TREATMENT'
            },
            uuid: 'a899cf5e-1350-11df-a1f1-0026b9348838'
          },
          groupMembers: null,
          obsDatetime: '2016-12-01T11:33:57.000+0300',
          uuid: '0e3c1864-11b7-4a32-8c10-5462b5e79210',
          value: {
            display: 'TENOFOVIR AND LAMIVUDINE AND EFAVIRENZ',
            uuid: '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
          }
        }
      ]

      form.rootNode.children['ART History'].children['ART History'].children['current_art_regimen_adult'].control.value = [
        'a89cc876-1350-11df-a1f1-0026b9348838', '6a73f32d-1870-4527-af6e-74443251ded2', '1c4a75d0-cc91-4752-b0a5-4b833326ff7a'
      ]

      let successResult = service.getPages(pages, form);
      let pageLabel = successResult['0'].table.body[0][0].text;
      expect(pageLabel).toEqual('ART History');
  });

  it('should have a getSections function that appends sections with answered questions to the PDF document recursively', () => {
    for (let page of pages) {
      sections = page.page;
    }

    let result = service.getSections(sections, form);
    let sectionLabel = result[0][0].table.body[0][0].text;
    expect(sectionLabel).toEqual('ART History');
  });

  it('should have a getSectionData function that recursively appends question labels and answers to the PDF document', () => {
    for (let section of sections) {
      nodes = section.section;
    }

    let result = service.getSectionData(nodes, form);
    let answer = result.stack[0].text[1].text;
    expect(answer).toEqual('3TC300mg/TDF300mg,NVP200/ZDV300/3TC150,TDF300mg/3TC300mg/EFV600mg');
  });

  it('should have a resolveValue function that resolves answers recursively', () => {
    const testAnswer1 = 'a899b35c-1350-11df-a1f1-0026b9348838';    
    const testAnswer2 = '2016-12-01T00:00:00.000+0300';
    const testAnswer3 = '["a89cc876-1350-11df-a1f1-0026b9348838", "6a73f32d-1870-4527-af6e-74443251ded2", "1c4a75d0-cc91-4752-b0a5-4b833326ff7a"]'
    const testAnswer4 = 1000;
    const testAnswer5 = '';
    const testAnswer6 = false;

    const testResult1 = 'YES';
    const testResult2 = '1 Dec 2016';
    const testResult3 = '["3TC300mg/TDF300mg", "NVP200/ZDV300/3TC150", "TDF300mg/3TC300mg/EFV600mg"]'
    const testResult4 = 1000;
    const testResult5 = '';
    const testResult6 = false;

    service.resolveValue(testAnswer1, form);
    expect(service.innerValue).toEqual(testResult1);
    
    service.resolveValue(testAnswer2, form);
    expect(service.innerValue).toEqual(testResult2);
    
    service.resolveValue(testAnswer3, form);
    expect(service.innerValue).toContain(testResult3[0]);
    expect(service.innerValue).toContain(testResult3[1]);
    expect(service.innerValue).toContain(testResult3[2]);
    
    service.resolveValue(testAnswer4, form);
    expect(service.innerValue).toEqual(testResult4);

    service.resolveValue(testAnswer5, form);
    expect(service.innerValue).toEqual(testResult5);

    service.resolveValue(testAnswer6, form);
    expect(service.innerValue).toEqual(testResult6);
  });

  it('should have an isDate function that determines whether the value passed is a valid ISO 8601 Date', () => {
    const testValue1 = '2019-01-01T00:00:00.00Z'
    const testValue2 = '2019-01-01';
    const testValue3 = '20190101';
    const testValue4 = 'is not a real date';
  
    expect(service.isDate(testValue1)).toBeTruthy();
    expect(service.isDate(testValue2)).toBeTruthy();
    expect(service.isDate(testValue3)).toBeTruthy();
    expect(service.isDate(testValue4)).toBeFalsy();
  });

  it('should have an isUuid function that determines whether the value passed is a valid uuid', () => {
    const testValue1 = '0cd16e94-c6dd-4211-bbae-b9bc4487ca08';
    const testValue2 = 'abcde';

    expect(service.isUuid(testValue1)).toBeTruthy();
    expect(service.isUuid(testValue2)).toBeFalsy();
  });
});