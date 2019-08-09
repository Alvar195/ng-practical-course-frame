import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { MatCardModule, MatInputModule } from '@angular/material';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

// const mockAuthService = {
//   validateUsername({ username }: User): Observable<UserValidation> {
//     return of({ exists: false });
//   }
// };

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let formDe: DebugElement;
  let formEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [MatCardModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, HttpClientModule],
      providers: [
        // { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    formDe = fixture.debugElement.query(By.css('form'));
    formEl = formDe.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-header').textContent).toContain('Sign Up');
  });

  it('can not submit invalid form', () => {
    spyOn(component, 'onSubmit');
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();
    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it('form invalid by default', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('form invalid with incorrect values', () => {
    component.signUpForm.controls.username.clearAsyncValidators();
    component.signUpForm.controls.username.setAsyncValidators((control: AbstractControl) => of({ exists: true }));
    component.signUpForm.controls.username.setValue('bob');
    component.signUpForm.controls.password.setValue('aa');
    component.signUpForm.controls.confirmPassword.setValue('bb');
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('form valid with valid values', () => {
    component.signUpForm.controls.username.clearAsyncValidators();
    component.signUpForm.controls.username.setAsyncValidators((control: AbstractControl) => of(null));
    component.signUpForm.controls.username.setValue('username');
    component.signUpForm.controls.password.setValue('asdasd1');
    component.signUpForm.controls.confirmPassword.setValue('asdasd1');

    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('test password match validation rule', () => {
    component.signUpForm.controls.password.setValue('asdasd1');
    component.signUpForm.controls.confirmPassword.setValue('asdasd1');

    expect(component.passwordsMatch(component.signUpForm)).toBeNull();

    component.signUpForm.controls.password.setValue('asdasd1');
    component.signUpForm.controls.confirmPassword.setValue('not the same');

    expect(component.passwordsMatch(component.signUpForm)).toEqual({ NoPasswordMatch: true });
  });

  // it('test username valid validation rule', async () => {
  //   const authService = fixture.debugElement.injector.get(AuthService);
  //   const userValidation: UserValidation = { exists: true };
  //   spyOn(authService, 'validateUsername').and.returnValue(of(userValidation));
  //
  //   const exp = of({ exists: true });
  //   const expected = hot('a', { a: { exists: true } });
  //
  //   expect(component.usernameValid(component.signUpForm)).toBeObservable(expected);
  // });

  // TODO test invalid form mat-error display contains(err)
  // TODO
});
