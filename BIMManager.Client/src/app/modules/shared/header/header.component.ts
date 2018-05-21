import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() onLogoutClicked: EventEmitter<{}> = new EventEmitter();

  logOut(): void {
    this.onLogoutClicked.emit({});
  }
}
