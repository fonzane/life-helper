import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @ViewChild('taskName') taskName: ElementRef;
  @ViewChild('newCategory') newCategory: ElementRef;
  @ViewChild('picker') datePicker;

  categories: Category[] = [];
  tasks: Task[] = [];
  categorisedTasks: {[key: string] : Task[]} = {};
  startDate: Date;
  task: Task;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.getCategories().subscribe((resp: Category[]) => {
      this.categories = resp.sort((el1, el2) => {
        if(el1.name > el2.name) {
          return 1;
        } else {
          return -1;
        }
      });
      this.taskService.getTasks().subscribe((resp: any) => {
        if(resp.length) {
          this.tasks = resp;
          this.categorisedTasks = this.categoriseTasks(this.tasks);
          // Object.keys(this.categorisedTasks).forEach(category => {
          //   this.categorisedTasks[category].sort((task1: Task, task2: Task): number => {
          //     if(task1.listSort > task2.listSort) {
          //       return 1;
          //     } else if (task1.listSort < task2.listSort) {
          //       return -1;
          //     }
          //   });
          // })
          console.log(this.categorisedTasks);
        }
      })
    });
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);

    dialogRef.afterClosed().subscribe(() => {
      this.taskService.addTask(this.task).subscribe((resp: any) => {
        if(resp.taskCreation) {
          console.log(resp);
          this.snackBar.open(`${resp.message}`, 'OK', { duration: 3000 });
          this.categorisedTasks[resp.task.category.name] ? this.categorisedTasks[resp.task.category.name].push(this.task) : this.categorisedTasks[resp.task.category.name] = [this.task];
          console.log(this.categorisedTasks);
        } else if (!resp.taskCreation) {
          console.log(resp);
          this.snackBar.open(`${resp.message} Grund: ${resp.reason}`, 'OK', { duration: 3000 });
        }
      })
    })
  }

  onElDrop(event, categoryName) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    console.log(event, categoryName);
    this.taskService.updateTask(event.container.data, categoryName).subscribe((resp) => {
      console.log(resp);
    })
  }

  doneChange(task: Task) {
    console.log(task);
    this.taskService.updateTask(task).subscribe((resp: Task) => {
      console.log(resp);
    });
  }

  categoriseTasks(tasks: Task[]) {
    let categorisedTasks = {};
    tasks.forEach(task => {
      if(!Object.keys(categorisedTasks).includes(task.category.name)) {
        categorisedTasks[task.category.name] = [task];
      } else if (Object.keys(categorisedTasks).includes(task.category.name)) {
        categorisedTasks[task.category.name].push(task);
      }
    })
    return categorisedTasks;
  }

  onAddTask(categoryName: string, taskName: string, dueDate: Date) {
    const userID: string = this.authService.getUserID();
    const category: Category = this.categories.find(category => category.name === categoryName);
    if(!category) {
      this.snackBar.open('Bitte die Kategorie erst hinzufügen.', 'OK', { duration: 3000 });
      return
    }
    const task : Task = { 
      category: category,
      categoryID: category._id,
      name: taskName,
      dueDate: dueDate ? new Date(dueDate.setHours(dueDate.getHours()+1)).toISOString() : '',
      userID: userID,
      done: false
    }
    this.task = task;
  }

  onDeleteTask(task: Task) {
    const index = this.categorisedTasks[task.category.name].indexOf(task);
    this.categorisedTasks[task.category.name].splice(index, 1);
    if(!this.categorisedTasks[task.category.name].length) {
      delete this.categorisedTasks[task.category.name];
    }
    console.log(this.categorisedTasks);
    this.taskService.deleteTask(task._id).subscribe(resp => {
      console.log(resp);
    })
  }

  onAddCategory(categoryName: string) {
    if(categoryName) {
      this.taskService.newCategory(categoryName).subscribe((resp: { message: string, categoryCreation: boolean, newCategory?: Category, reason: string }) => {
        console.log(resp);
        if(resp.categoryCreation) {
          this.categories.push(resp.newCategory);
          this.snackBar.open('Kategorie wurde hinzugefügt', 'OK' , { duration: 3000 });
          this.newCategory.nativeElement.value = '';
        } else if (!resp.categoryCreation) {
          this.newCategory.nativeElement.value = '';
          this.snackBar.open(`${resp.message} Grund: ${resp.reason}`, 'OK', {duration: 3000});
        }
      });
    } else {
      this.snackBar.open('Bitte gib eine gültige Kateogrie an.', 'OK' , { duration: 3000 });
    }
  }

  onDeleteCategory(category: string) {
    this.taskService.deleteCategory(category).subscribe((resp: Category) => {
      console.log(resp);
      this.categories.splice(this.categories.indexOf({ userID: this.authService.getUserID(), name: category}), 1);
      this.newCategory.nativeElement.value = "";
      this.snackBar.open('Kategorie wurde entfernt', 'OK', { duration: 3000 });
    })
  }

  // clearInput() {
  //   this.taskName.nativeElement.value = '';
  //   this.newCategory.nativeElement.value = '';
  //   this.datePicker._datepickerInput['value'] = '';
  // }

}
