import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  apiUrl: string = environment.apiURL;
  questionnaires: Questionnaire[];
  newQuestionnaireEvent: BehaviorSubject<Questionnaire | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getQuestionnaires() {
    return this.http.get(this.apiUrl + '/questionnaires');
  }

  newQuestionnaire(questionnaire: Questionnaire) {
    return this.http.post(this.apiUrl + '/questionnaire', questionnaire);
  }

  editQuestionnaire(questionnaire: Questionnaire) {
    return this.http.patch(this.apiUrl + '/questionnaire', questionnaire);
  }

  deleteQuestionnaire(id: string) {
    const headers = new HttpHeaders().set('id', id);
    return this.http.delete(this.apiUrl + '/questionnaire', {headers});
  }
}
