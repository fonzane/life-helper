import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    name: this.fb.control(''),
    questions: this.fb.array([]),
    weekdays: this.fb.control(''),
    hour: this.fb.control(''),
    questionCount: this.fb.control('')
  })

  questionCountArray(count: number) {
    this.questions.clear();
    for (let i = 0; i < count; i++) {
      this.questions.push(
        this.fb.group({
          name: this.fb.control(''),
          open: this.fb.control('')
        })
      );
    }
  }

  constructor(private fb: FormBuilder, private questionnaireService: QuestionnaireService) { }

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
    console.log(questionnaire);
    this.questionnaireService.newQuestionnaire(this.questionnarieForm.value).subscribe(resp => {
      console.log(resp);
    })
  }

}
