import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { TodoComponent } from './todo/todo.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { NewQuestionnaireComponent } from './questionnaires/new-questionnaire/new-questionnaire.component';
import { EditQuestionnairesComponent } from './questionnaires/edit-questionnaires/edit-questionnaires.component';
import { ShowQuestionnairesComponent } from './questionnaires/show-questionnaires/show-questionnaires.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { QuestionnaireCreatorComponent } from './questionnaires/new-questionnaire/questionnaire-creator/questionnaire-creator.component';
import { ObjectPipePipe } from './services/object-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AuthComponent,
    DashboardComponent,
    CalendarComponent,
    QuestionnairesComponent,
    NewQuestionnaireComponent,
    EditQuestionnairesComponent,
    ShowQuestionnairesComponent,
    QuestionnaireCreatorComponent,
    ObjectPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
