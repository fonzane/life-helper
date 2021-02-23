import { HttpClient, HttpHeaders, HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.apiURL + '/tasks');
  }

  addTask(task: Task) {
    return this.http.post(this.apiURL + '/tasks', task);
  }
  
  updateTask(task: Task | Task[], categoryName: string = null) {
    const payload = { task, categoryName };
    return this.http.patch(this.apiURL + '/tasks', payload);
  }

  deleteTask(taskID: string) {
    const params = new HttpParams().set('taskID', taskID);
    return this.http.delete(this.apiURL + '/delete', {params});
  }

  getCategories() {
    return this.http.get(this.apiURL + '/category');
  }

  newCategory(category: string): Observable<Object> {
    const params = new HttpParams().set('name', category);
    return this.http.post(this.apiURL + '/category', params);
  }

  deleteCategory(category: string) {
    const headers = new HttpHeaders().set('name', category);
    return this.http.delete(this.apiURL + '/category', {headers});
  }
}
