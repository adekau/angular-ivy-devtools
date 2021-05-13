import { ChangeDetectorRef, Component } from '@angular/core';

declare const chrome: any;
@Component({
  selector: 'app-test2',
  template: `<p>test</p>`
})
export class TestComponent2 {
}

@Component({
  selector: 'app-test',
  template: '<div>a test component, <input [(ngModel)]="inp" /></div>'
})
export class TestComponent {
  public inp: string = '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DevTools';
  t: any = 'a';
  response: any;

  constructor(private _ref: ChangeDetectorRef) {
    const connection = chrome?.runtime?.connect({ name: 'devtools' });
    if (connection) {
      connection.onMessage.addListener((resp: any) => {
        this.response = resp.result;
        this._ref.detectChanges();
        console.log(this.response);
      });
    }
  }
}
