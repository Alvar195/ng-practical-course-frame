import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  title = 'Nortal Todo application';

}
