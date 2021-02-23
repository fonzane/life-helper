import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  newQuestionnaire(questionnaire: Questionnaire) {
    return this.http.post(this.apiUrl + '/questionnaire', questionnaire);
  }
}
