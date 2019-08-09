import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCardModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatCardModule, FormsModule, MatInputModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-header').textContent).toContain('Login');
  });

// it('test form submit', () => {
//   const testForm = {
//     value: {
//       username: 'user',
//       password: 'pass'
//     }
//   };
//   fixture.detectChanges();
//   component.loginForm.setValue(testForm.value);
//   console.log(component.loginForm.value.username);
//   console.log(component.loginForm.value.password);
// });
});
