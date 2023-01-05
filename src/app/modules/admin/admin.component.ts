import {Component} from '@angular/core';
import {MENU_ITEMS} from "./admin-menu";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  menu = MENU_ITEMS;
  name = 'Master Krass';


  constructor(private authService: AuthService) {
  }

  logout() {
    return this.authService.logout();
  }

  ngOnInit() {
  }
}
