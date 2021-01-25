import { Component, ElementRef, EmbeddedViewRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { ShoutboxMessage } from '../models/shoutboxMessage';
import { Task } from '../models/task';
import { TaskService } from '../todo/task.service';
import { ShoutboxService } from './shoutbox.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  @ViewChild('messageContent') messageInput: ElementRef;
  @ViewChild('customSnackBar') customSnackBar: TemplateRef<any>;

  username: string;
  date: Date = new Date();
  timeInterval;
  undone: number = 0;
  messages: ShoutboxMessage[] = [];
  editMode: boolean = false;
  messageEdit: ShoutboxMessage;
  snackBarRef: MatSnackBarRef<EmbeddedViewRef<any>>;

  constructor(private authService: AuthService, private taskService: TaskService, private shoutbox: ShoutboxService, private snackBar: MatSnackBar) { }

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
    this.shoutbox.getMessages().subscribe((resp: ShoutboxMessage[]) => {
      this.messages = resp;
    })
  }

  onMessageSubmit(message: string) {
    if(!this.editMode && message) {
      this.onNewMessage(message);
    } else if (this.editMode && this.messageEdit) {
      this.messageEdit.content = this.messageInput.nativeElement.value;
      this.shoutbox.updateMessage(this.messageEdit).subscribe((resp: {messageCreation: boolean, message: string, content?: ShoutboxMessage, reason?: string}) => {
        console.log(resp);
        if(resp.messageCreation) {
          this.snackBar.open(resp.message, 'OK', { duration: 3000});
        } else if (!resp.messageCreation) {
          this.snackBar.open(`${message} Grund: ${resp.reason}`, 'OK', {duration: 3000});
        }
      })
    } else if (!message) {
      this.snackBar.open('Bitte gib eine Nachricht ein.', 'OK', {duration: 3000});
    }
  }

  onNewMessage(content: string) {
    const message: ShoutboxMessage = { content: content, username: this.username, submittedAt: new Date(), userID: this.authService.getUserID() }
    this.shoutbox.newMessage(message).subscribe((resp: { messageCreation: boolean, message: string, reason?: string, content?: ShoutboxMessage}) => {
      if(resp.messageCreation) {
        this.snackBar.open(resp.message, 'OK', { duration: 3000});
        this.messages.push(resp.content);
        this.messageInput.nativeElement.value = '';
      } else if (!resp.messageCreation) {
        this.snackBarRef = this.snackBar.openFromTemplate(this.customSnackBar);
      }
    })
  }

  onEditMode(message: ShoutboxMessage) {
    const messages: ShoutboxMessage[] = this.messages.filter((message: ShoutboxMessage) => {
      return message.userID === this.authService.getUserID();
    });
    if(message.userID === this.authService.getUserID() && messages.indexOf(message) === messages.length - 1) {
      this.editMode = true;
      this.messageInput.nativeElement.value = message.content;
      this.messageEdit = message;
      let snackBarRef = this.snackBar.open('Du kannst deine Nachricht jetzt editieren.', 'Abbruch');
      snackBarRef.afterDismissed().subscribe(() => {
        this.editMode = false;
        this.messageInput.nativeElement.value = '';
        this.messageEdit = null;
        this.snackBar.open('Editieren abgebrochen.', 'OK', {duration: 3000});
      })
    } else if (message.userID === this.authService.getUserID() && !(messages.indexOf(message) === messages.length - 1)) {
      this.snackBar.open('Bitte wähle deine zuletzt gesendete Nachricht aus.', 'OK', {duration: 3000});
    } else if (message.userID !== this.authService.getUserID()) {
      this.snackBar.open('Bitte wähle eine deiner Nachrichten aus.', 'OK', {duration: 3000});
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  getDate(): Date {
    return new Date();
  }

  onSnackbarClick() {
    this.snackBarRef.dismiss();
  }

}

// @Component({
//   selector:'custom-snack-bar-component',
//   template: `
//   <div class="snack-bar-container">
//     <span class="message">{{data.message}} Grund: {{data.reason}}</span>
//     <i class="material-icons" title="Du kannst deine letzte Nachricht editiere, wenn du sie anklickst.">info</i>
//     <button mat-raised-button>OK</button>
//   </div> 
//   `,
//   styles: [`
//     .snack-bar-container {

//     }
//     .message {
//     }
//     .material-icons {
//       cursor: default;
//       color: white;
//     }
//   `]
// })
// export class CustomSnackBar implements OnInit {
//   constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
//   ngOnInit() {
//     console.log(this.data);
//   }
// }