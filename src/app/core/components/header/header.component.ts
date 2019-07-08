import { Component, Input, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isLoggedIn: boolean;

  constructor() {}

  ngOnInit() {}
}
