import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Questionnaire } from 'src/app/models/questionnaire';

@Component({
  selector: 'app-edit-questionnaires',
  templateUrl: './edit-questionnaires.component.html',
  styleUrls: ['./edit-questionnaires.component.sass'],
  viewProviders: [MatExpansionPanel]
})
export class EditQuestionnairesComponent implements OnInit {
  @Input() questionnaire: Questionnaire;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    
  }

}
