import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post(this.apiURL + '/tasks', task);
  }

  getTasks(userID: string) {
    const headers = new HttpHeaders().set('userid', userID);
    return this.http.post(this.apiURL + '/tasks', {headers});
  }

  getCategories(userID: string) {
    const headers = new HttpHeaders().set('userid', userID);
    return this.http.get(this.apiURL + '/category', {headers});
  }

  newCategory(userID: string, category: string) {
    const params = new HttpParams().set('userid', userID).set('name', category);
    return this.http.post(this.apiURL + '/category', params);
  }

  deleteCategory(userID: string, category: string) {
    const headers = new HttpHeaders().set('userid', userID).set('name', category);
    return this.http.delete(this.apiURL + '/category', {headers});
  }
}
