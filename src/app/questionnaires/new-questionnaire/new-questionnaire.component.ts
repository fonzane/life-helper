import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  weekdays: Array<string> = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];


  constructor(private questionnaireService: QuestionnaireService,
              private snackBar: MatSnackBar,
              private auth: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void { 
    const dialogRef = this.dialog.open(QuestionnaireCreatorComponent);
  }
}