import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { Category } from '../models/category';
import { Task } from '../models/task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  categories: Category[] = [];
  tasks: Task[] = [];
  startDate: Date;

  constructor(private taskService: TaskService, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskService.getCategories(this.authService.getUserID()).subscribe((resp: Category[]) => {
      this.categories = resp.sort((el1, el2) => {
        if(el1.name > el2.name) {
          return 1;
        } else {
          return -1;
        }
      });
      this.taskService.getTasks(this.authService.getUserID()).subscribe((resp: any) => {
        this.tasks = resp;
        console.log(this.tasks);
      })
    });
  }

  onAddTask(categoryName: string, taskName: string, dueDate: Date) {
    const userID: string = this.authService.getUserID();
    const category: Category = { name: categoryName, userID: userID };
    const task : Task = { category: category, name: taskName, dueDate: dueDate ? new Date(dueDate.setHours(dueDate.getHours()+1)).toISOString() : '', userID: userID }
    this.taskService.addTask(task).subscribe((resp: any) => {
      if(resp.taskCreation) {
        this.snackBar.open(`${resp.message}`, 'OK');
      } else if (!resp.taskCreation) {
        this.snackBar.open(`${resp.message} Grund: ${resp.reason}`, 'OK');
      }
    })
  }

  onAddCategory(category: string) {
    this.taskService.newCategory(this.authService.getUserID(), category).subscribe((resp: Category) => {
      this.categories.push(resp);
    });
  }

  onDeleteCategory(category: string) {
    this.taskService.deleteCategory(this.authService.getUserID(), category).subscribe((resp: Category) => {
      console.log(resp);
      this.categories.splice(this.categories.indexOf({ userID: this.authService.getUserID(), name: category}), 1);
    })
  }

}
