import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SignUpFormInterface } from './sign-up-form.interface';
import { debounceTime, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Output() signUpRequested = new Subject<SignUpFormInterface>();
  @Output() isValidUsername = new Subject<string>();
  private signUpForm: FormGroup;
  private usernameSubscription$: Subscription;

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

    this.usernameSubscription$ = this.signUpForm.get('username').valueChanges
      .pipe(debounceTime(250))
      .subscribe((value: string) => {
        console.log(value);
        this.isValidUsername.next(value);
      });
  }

  ngOnDestroy(): void {
    this.usernameSubscription$.unsubscribe();
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpRequested.next(this.signUpForm.value as SignUpFormInterface);
  }

  usernameValid(control: FormControl): Promise<any> | Observable<any> {
    // return this.authService.validateUsername({ username: control.value }).toPromise().then(res => {
    //   return new Promise((resolve, reject) => {
    //     if (res.exists) {
    //       return resolve(res);
    //     } else {
    //       return resolve(null);
    //     }
    //   });
    // });
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
