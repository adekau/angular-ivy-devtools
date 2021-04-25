import { Component } from '@angular/core';

declare const chrome: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DevTools';
  constructor() {
    const connection = chrome?.runtime?.connect();
  }
}
