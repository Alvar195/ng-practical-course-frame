import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private login = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('AuthComponent');
  }

  loginToggle() {
    this.login = !this.login;
  }

  onLoginRequested(user: UserCredentials) {
    this.authService.login(user).subscribe(next => {
        console.log(next);
      },
      error => {
        console.error(error);
      });
  }

  onSignUpRequested(user: UserCredentials) {
    this.authService.signUp(user).subscribe(next => {
        console.log(next);
      },
      error => {
        console.error(error);
      });
  }
}
