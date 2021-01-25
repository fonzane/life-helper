import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ShoutboxMessage } from '../models/shoutboxMessage';

@Injectable({
  providedIn: 'root'
})
export class ShoutboxService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  newMessage(message: ShoutboxMessage) {
    return this.http.post(this.apiURL + '/messages', message);
  }

  getMessages() {
    return this.http.get(this.apiURL + '/messages');
  }

  updateMessage(message: ShoutboxMessage) {
    return this.http.patch(this.apiURL + '/messages', message);
  }
}
