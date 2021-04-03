import { animate, state, style, transition, trigger } from '@angular/animations';
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Question, Questionnaire } from '../models/questionnaire';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class QuestionnairesComponent implements OnInit {
  linksArray: string[] = ['Fragebogen erstellen', 'Fragebögen editieren', "Fragebögen anzeigen"];
  links = { new: 'Fragebogen erstellen', edit: 'Fragebögen editieren', show: 'Fragebögen anzeigen' };
  questionnaires: Questionnaire[] = [];
  displayedColumns = ['Name', 'Erstellt'];
  expandedElement: Questionnaire | null;

  constructor(private router: Router,
              private questionnaireService: QuestionnaireService,
              private snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.questionnaireService.getQuestionnaires().subscribe((questionnaires: Questionnaire[]) => {
      this.questionnaires = questionnaires;
      console.log(this.questionnaires);
    })
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  onEditQuestionnaire(questionnaire: Questionnaire) {
    questionnaire.lastModified = new Date().toISOString();
    this.questionnaireService.editQuestionnaire(questionnaire).subscribe((resp: {message: string, success: boolean, questionnaire?: Questionnaire}) => {
      if(resp.success) {
        this.snackBar.open(resp.message, 'OK', {duration: 3000});
        console.log(resp.questionnaire);
      } else if (!resp.success) {
        this.snackBar.open(resp.message, 'OK', {duration: 3000});
      }
    })
  }

  onDeleteQuestionnaire(id: string, event: Event) {
    event.stopPropagation();
    this.questionnaireService.deleteQuestionnaire(id).subscribe((resp: {Questionnaire?, message: string }) => {
      console.log(resp);
      this.snackBar.open(resp.message, 'OK', {duration: 2500});
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/questionnaires']);
      }); 
    });
  }
}
