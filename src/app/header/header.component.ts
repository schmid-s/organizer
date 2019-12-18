import { Component, OnInit, Input } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  /* 
  getTitle(): string{

  }
  */
  ngOnInit() {

  }

}
