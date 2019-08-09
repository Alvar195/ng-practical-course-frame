import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent], imports: [MatToolbarModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test inputs', () => {
    expect(component.title).toBeUndefined();
    expect(component.isLoggedIn).toBeUndefined();
    const title = 'title';
    const isLoggedIn = false;
    component.title = title;
    component.isLoggedIn = isLoggedIn;
    expect(component.title).toEqual(title);
    expect(component.isLoggedIn).toEqual(isLoggedIn);
  });
});
