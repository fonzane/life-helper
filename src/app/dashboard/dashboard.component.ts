import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  username: string;
  date: Date = new Date();
  timeInterval;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.timeInterval = setInterval(() => {
      this.date = this.getDate();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  getDate(): Date {
    return new Date();
  }

}
