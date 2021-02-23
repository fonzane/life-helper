import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.sass']
})
export class QuestionnairesComponent implements OnInit {

  weekdays: Array<string> = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  questionCount: number = 1;
  questionnarieForm = this.fb.group({
    questions: this.fb.array([]),
    weekdays: this.fb.control('')
  })

  questionCountArray(count: number) {
    this.questions.clear();
    for (let i = 0; i < count; i++) {
      this.questions.push(this.fb.control(''));
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get questions() {
    return this.questionnarieForm.get('questions') as FormArray;
  }

  clearQuestions() {
    this.questions.clear();
  }

  onCreateQuestionnaire() {
    console.log(this.questionnarieForm);
  }

}
