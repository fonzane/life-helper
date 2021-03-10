import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { QuestionnaireService } from '../questionnaire.service';
import { QuestionnaireCreatorComponent } from './questionnaire-creator/questionnaire-creator.component';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.sass']
})
export class NewQuestionnaireComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { 
    let dialogRef = this.dialog.open(QuestionnaireCreatorComponent, {
      width: (window.innerWidth * 0.75) + "px"
    });
  }
}