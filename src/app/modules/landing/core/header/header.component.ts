import {Component} from '@angular/core';
import {MENU_LIST} from "../menu";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuList = MENU_LIST
}
