import { Injectable } from '@angular/core';

import { Alert } from '../control-alerts/can-generate-alert';

import {
  ExpressionRunner,
  Runnable
} from '../expression-runner/expression-runner';
import {
  AfeFormControl,
  AfeFormArray,
  AfeFormGroup
} from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form } from './form';
import { JsExpressionAutopopulate } from '../helpers/autopopulate-expression-helper';

@Injectable()
export class AlertsFactory {
  constructor(
    private expressionRunner: ExpressionRunner,
    private expressionHelper: JsExpressionHelper,
    private expressionAutopopulate: JsExpressionAutopopulate,
  ) {}
  getJsExpressionshowAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert {
    const runnable: Runnable = this.expressionRunner.getRunnable(
      question.alert.alertWhenExpression,
      control,
      this.expressionHelper.helperFunctions,
      this.expressionAutopopulate.autopopulateFunctions,
      {},
      form
    );
    const showAlert: Alert = {
      shown: false,
      alertWhenExpression: question.alert.alertWhenExpression,
      alertMessage: question.alert.message,
      reEvaluateAlertExpression: () => {
        const result = runnable.run();
        showAlert.shown = result;
      }
    };
    return showAlert;
  }
}
