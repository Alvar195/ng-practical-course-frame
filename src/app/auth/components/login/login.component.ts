import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserCredentials } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // ng8 @ViewChild('form', {static:false})
  @ViewChild('form') loginForm: NgForm;
  @Output() loginRequested = new Subject<UserCredentials>();

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    this.loginRequested.next(this.loginForm.value as UserCredentials);
  }

}
