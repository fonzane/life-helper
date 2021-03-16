import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Question, Questionnaire, Schedule } from 'src/app/models/questionnaire';
import { QuestionnaireService } from '../../../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire-creator',
  templateUrl: './questionnaire-creator.component.html',
  styleUrls: ['./questionnaire-creator.component.sass']
})
export class QuestionnaireCreatorComponent implements OnInit {
  weekdays: Array<string> = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  questionsArray: Question[] = new Array();
  dialogRef: MatDialogRef<TemplateRef<any>>;

  questionnaireForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    weekdays: this.fb.control([]),
    questionCount: this.fb.control(1),
    schedule: this.fb.array(new Array(), Validators.required),
  })

  get schedule() {
    return this.questionnaireForm.get('schedule') as FormArray;
  }

  get questions() {
    return this.questionnaireForm.get('questions') as FormArray;
  }

  setScheduleArray(count: number) {
    this.schedule.clear();
    for (let i = 0; i < count; i++) {
      this.schedule.push(
        this.fb.control('00:00')
      )
    }
  }

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private auth: AuthService,
              private questionnaireServie: QuestionnaireService) { }

  ngOnInit(): void {
  }

  async onAddQuestions(value: number, templateRef: TemplateRef<any>) {
    let count = 0;
    while (count < value) {
      this.dialogRef = this.dialog.open(templateRef, {
        width: "450px"
      });
      const response: Question = await this.dialogRef.afterClosed().toPromise();
      this.questionsArray.push(response);
      count++;
    }
    if (count === value) {
      // Logic to get the schedule
      let schedule: Schedule[] = new Array();
      for (let i = 0; i < this.questionnaireForm.controls.weekdays.value.length; i++) {
        const weekday: string = this.questionnaireForm.controls.weekdays.value[i];
        const time = this.questionnaireForm.controls.schedule.value[i];
        let newSchedule: Schedule = {
          [weekday]: time
        };
        schedule.push(newSchedule);
      }
      const questionnaire: Questionnaire = {
        name: this.questionnaireForm.controls.name.value,
        questions: this.questionsArray,
        userID: this.auth.getUserID(),
        schedule: schedule,
        weekdays: this.questionnaireForm.controls.weekdays.value
      }
      this.questionnaireServie.newQuestionnaire(questionnaire).subscribe(response => {
        console.log(response);
        this.questionnaireServie.newQuestionnaireEvent.next(questionnaire);
      })
    }
  }

  closeQuestionDialog(phrase, open) {
    const question: Question = {phrase: phrase, open: open};
    this.dialogRef.close(question);
  }
}