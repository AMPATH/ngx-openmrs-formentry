import { QuestionBase } from './question-base';
import { TimeQuestionOptions } from './interfaces/time-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class TimeQuestion extends QuestionBase {
    constructor(options: TimeQuestionOptions) {
        super(options);
        this.renderingType = 'time';
        this.controlType = AfeControlType.AfeFormControl;
    }
}
