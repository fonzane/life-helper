import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.sass']
})
export class QuestionnairesComponent {

  linksArray: string[] = ['Fragebogen erstellen', 'Fragebögen editieren', "Fragebögen anzeigen"];
  links = { new: 'Fragebogen erstellen', edit: 'Fragebögen editieren', show: 'Fragebögen anzeigen' };

  constructor(private router: Router) {
    
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }
}
