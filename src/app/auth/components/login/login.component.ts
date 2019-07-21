import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // ng8 @ViewChild('form', {static:false})
  @ViewChild('form') loginForm: NgForm;

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.loginForm);
  }

}
