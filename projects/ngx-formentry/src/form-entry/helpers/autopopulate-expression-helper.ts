import * as _ from 'lodash';
import { Injectable } from '@angular/core';

Injectable();

export class JsExpressionAutopopulate {
  autopopHtsTest(initialTest, confirmatoryTest) {
    let finalTest;
    if (
      initialTest === '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' &&
      confirmatoryTest === '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    ) {
      finalTest = '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (
      (initialTest === '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' &&
        confirmatoryTest === '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') ||
      (initialTest === '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' &&
        confirmatoryTest === '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    ) {
      finalTest = '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (
      initialTest === '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' &&
      confirmatoryTest === '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    ) {
      finalTest = '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (
      (initialTest === '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' &&
        confirmatoryTest === '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') ||
      (initialTest === '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' &&
        confirmatoryTest === '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    ) {
      finalTest = '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    }
    return initialTest && confirmatoryTest ? finalTest : null;
  }

  autopopNutritionStatus(bmi) {
    let nutritionStatus;
    if (bmi < 16 && bmi > 1) {
      nutritionStatus = '163302AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (bmi > 16 && bmi < 18.5) {
      nutritionStatus = '163303AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (bmi > 18.5 && bmi < 25) {
      nutritionStatus = '1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    } else if (bmi >= 25) {
      nutritionStatus = '114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    }

    return bmi ? nutritionStatus : null;
  }

  get autopopulateFunctions() {
    const autopopulate = this;
    return {
      autopopHtsTest: autopopulate.autopopHtsTest,
      autopopNutritionStatus: autopopulate.autopopNutritionStatus
    };
  }
}
