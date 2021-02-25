import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'life-helper';
  linksArray: string[] = ['dashboard', 'calendar', 'todo', 'questionnaires/new'];
  links: any = { dashboard: 'Dashboard', todo: 'Aufgaben', calendar: 'Kalender', "questionnaires/new": 'Fragebögen' };

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {
      this.authService.token = token;
      this.authService.isLoggedIn = true;
    }
  }

  isLoggedIn() {
    return this.authService.validateToken();
  }

  onLogout() {
    this.authService.token = '';
    this.authService.isLoggedIn = false;
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }
}
