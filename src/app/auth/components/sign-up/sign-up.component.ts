import { Component, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserCredentials } from '../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() signUpRequested = new Subject<UserCredentials>();
  signUpForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null,
        [Validators.required, Validators.minLength(4)],
        this.usernameValid.bind(this)
      ),
      password: new FormControl(null,
        [Validators.required, Validators.minLength(6), Validators.pattern('.*[0-9].*')]
      ),
      confirmPassword: new FormControl(null)
    }, {
      validators: this.passwordsMatch
    });
  }

  onSubmit() {
    // console.log(this.signUpForm);
    this.signUpRequested.next(this.signUpForm.value as UserCredentials);
  }

  usernameValid(control: AbstractControl): Promise<any> | Observable<any> {
    return this.authService.validateUsername({ username: control.value }).pipe(map(res => {
      if (res.exists) {
        return res;
      } else {
        return null;
      }
    }));
  }

  passwordsMatch(control: AbstractControl): { [s: string]: boolean } {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return { NoPasswordMatch: true };
    }
    return null;
  }
}
