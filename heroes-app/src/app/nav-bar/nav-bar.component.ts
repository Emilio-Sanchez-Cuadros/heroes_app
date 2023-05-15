import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
// import { DialogComponent } from '../shared/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  token: any = undefined;

  constructor(
    // private _userService: UserService,
    private matDialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit() {
    // this.token = this._userService.getToken();
    // this._userService.getToken().subscribe(token => {
    //   console.log('navbar this._userService', token);
    //   this.token = token;
    // });
  }

  async login(action: string) {
  //   console.log('login()', action);
  //   const dialogRef = this.matDialog.open(DialogComponent, {
  //     data: {
  //       action
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe(async result => {
  //     console.log('login data', result);
  //     if (result) {
  //       try {
  //         const res = await lastValueFrom(this._userService.login(result.user));
  //         this.token = res.token;
  //         this._userService.setToken(this.token)
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
      
  //   })
  }

  logout() {
    // console.log('logout()');
    // const token = localStorage.getItem("token");
    // if (token) {
    //   this._userService.removeToken();
    // };
    // this.router.navigateByUrl('/')
  }
}
