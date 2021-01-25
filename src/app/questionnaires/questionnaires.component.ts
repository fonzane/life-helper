import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.sass']
})
export class QuestionnairesComponent implements OnInit {

  questionCount: number = 1;
  questionnarieForm = this.fb.group({
    questions: this.fb.array([
      this.fb.control('')
    ])
  })

  questionCountArray(count: number) {
    this.clearQuestions();
    let arr = [];
    let tempArr = [];

    for (let i = 1; i <= count; i++) {
      this.questions.push(this.fb.control(''));
      if(i%2) {
        tempArr.push(i);
        if(i === count) {
          arr.push(tempArr);
          return arr;
        }
      } else if (!(i%2)) {
        tempArr.push(i);
        arr.push(tempArr);
        tempArr = [];
      }
    }
    return arr;
    // [[1,2], [3,4], [5,6], [7,8]];
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
