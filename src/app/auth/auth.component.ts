import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  type: string;
  startDate = new Date(1990, 0, 1);

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigateByUrl('dashboard');
    }
    this.route.queryParams.subscribe(params => {
      if(params.type) {
        this.type = params.type;
      } else {
        this.type = 'login';
      }
    })
  }

  onRegister(email, password, username, birthday) {
    if(email && password && username && birthday) {
      birthday = new Date(birthday.setHours(birthday.getHours()+1));
      const user: User = { email: email, password: password, username: username, birthday: birthday };
      this.authService.onRegister(user).subscribe((resp: any) => {
        if(resp.auth) {
          localStorage.setItem('token', resp.token);
          this.authService.token = resp.token;
          this.authService.isLoggedIn = true;
          this.router.navigateByUrl('dashboard');
        } else {
          this.snackBar.open(resp.message, 'OK');
        }
      })
    } else {
      this.snackBar.open('Bitte füllen Sie alle Felder aus.', 'OK');
    }
  }

  onLogin(email, password) {
    if(email && password) {
      const user: User = {email: email, password: password};
      this.authService.onLogin(user).subscribe((resp: any) => {
        if(resp.auth) {
          localStorage.setItem('token', resp.token);
          this.authService.token = resp.token;
          this.authService.isLoggedIn = true;
          this.router.navigateByUrl('dashboard');
        } else {
          this.snackBar.open(resp.message, 'OK');
        }
      })
    } else {
      this.snackBar.open("Bitte füllen Sie alle Felder aus.", "OK");
    }
  }

}
