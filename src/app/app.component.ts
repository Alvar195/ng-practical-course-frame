import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Nortal Todo application';
  isLoggedIn: boolean;
  loggedInSubscription$: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInSubscription$ = this.authService.isLoggedIn$.subscribe(loginStatus => {
      this.isLoggedIn = !!loginStatus;
      console.log(loginStatus);
    });
  }

  ngOnDestroy(): void {
    this.loggedInSubscription$.unsubscribe();
  }
}
