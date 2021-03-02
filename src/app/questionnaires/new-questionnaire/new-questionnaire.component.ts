import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { QuestionnaireService } from '../questionnaire.service';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.sass']
})
export class NewQuestionnaireComponent implements OnInit {

  weekdays: Array<string> = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  questionnarieForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    questions: this.fb.array([], Validators.required),
    weekdays: this.fb.control(''),
    hour: this.fb.control(0),
    questionCount: this.fb.control('')
  })

  questionCountArray(count: number) {
    this.questions.clear();
    for (let i = 0; i < count; i++) {
      this.questions.push(
        this.fb.group({
          phrase: this.fb.control('', Validators.required),
          open: this.fb.control(false)
        })
      );
    }
  }

  constructor(private fb: FormBuilder,
              private questionnaireService: QuestionnaireService,
              private snackBar: MatSnackBar,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  get questions() {
    return this.questionnarieForm.get('questions') as FormArray;
  }

  clearQuestions() {
    this.questions.clear();
  }

  onCreateQuestionnaire() {
    let questionnaire: Questionnaire = this.questionnarieForm.value;
    questionnaire.userID = this.auth.getUserID();
    if (this.questionnarieForm.valid) {
      this.questionnaireService.newQuestionnaire(this.questionnarieForm.value).subscribe((resp: { message: string, questionnaireCreation: boolean, newQuestionnaire?: Questionnaire, reason?: string }) => {
        if (resp.questionnaireCreation) {
          this.snackBar.open(`${resp.message}`, "OK", { duration: 3000 });
          console.log(resp.newQuestionnaire);
        } else if (!resp.questionnaireCreation) {
          this.snackBar.open(`${resp.message}`, "OK", { duration: 3000 });
          console.log(resp.reason);
        }
      })
    } else {
      this.snackBar.open("Bitte fülle alle Felder aus.", "OK", { duration: 3000});
    }
  }

}
