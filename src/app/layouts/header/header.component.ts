import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentification.service';
import {Router} from '@angular/router';
import {UserModel} from '../../_models/user.model';
import {UserService} from '../../_services/user.service';
import {BASE_API} from '../../_globals/vars';
import {CrudService} from '../../_services/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title;
  @Input() id = 1;

  currentUser: UserModel;
  getData: any;
  userName: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private crudService: CrudService
  ) {
    this.userService.getCurrentUser()
      .subscribe((x: any) => {
          this.currentUser = x.user;
          this.userName = this.currentUser.name;

        },
        error => {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        });
  }

  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
