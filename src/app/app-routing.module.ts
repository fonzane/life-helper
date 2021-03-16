import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditQuestionnairesComponent } from './questionnaires/edit-questionnaires/edit-questionnaires.component';
import { NewQuestionnaireComponent } from './questionnaires/new-questionnaire/new-questionnaire.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { ShowQuestionnairesComponent } from './questionnaires/show-questionnaires/show-questionnaires.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch:"full" },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'todo', component: TodoComponent, canActivate: [AuthService] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthService] },
  { path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthService], children: [
    { path: 'new', component: NewQuestionnaireComponent },
    { path: 'edit', component: EditQuestionnairesComponent },
    { path: 'show', component: ShowQuestionnairesComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
