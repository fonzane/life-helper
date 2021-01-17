import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Task } from '../models/task';
import { TaskService } from '../todo/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  username: string;
  date: Date = new Date();
  timeInterval;
  undone: number = 0;

  constructor(private authService: AuthService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.timeInterval = setInterval(() => {
      this.date = this.getDate();
    }, 1000);
    this.taskService.getTasks().subscribe((resp: Task[]) => {
      resp.forEach((task: Task) => {
        if(!task.done) {
          this.undone++;
        }
      })
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  getDate(): Date {
    return new Date();
  }

}
