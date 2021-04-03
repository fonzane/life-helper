import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { QuestionnaireCreatorComponent } from './questionnaire-creator/questionnaire-creator.component';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.sass']
})
export class NewQuestionnaireComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router,
              private questionnaireService: QuestionnaireService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void { 
    let dialogRef = this.dialog.open(QuestionnaireCreatorComponent, {
      width: (window.innerWidth * 0.75) + "px"
    });
    const newQuestionnaireEvent = this.questionnaireService.newQuestionnaireEvent.subscribe((questionnaire) => {
      if(questionnaire) {
        console.log(questionnaire);
        dialogRef.close();
      }
    })
    dialogRef.afterClosed().subscribe(resp => {
      console.log(resp);
      newQuestionnaireEvent.unsubscribe();
      console.log('new questionnaire dialog closed');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/questionnaires']);
      }); 
    })
  }
}