import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Hero } from '../models/models'
import { DialogComponent } from '../shared/dialog/dialog.component';
// import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
// import { UserService } from '../services/user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource: any;
  toasterMessage: string = '';
  token: any = undefined;

  private token$ = new Subject<String>();
  // tokenObservable$: Observable<String>();

  constructor(
    public matDialog: MatDialog,
    // private _usersService: UsersService,
    // private _userService: UserService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    // lastValueFrom(this._usersService.getUsers()).then(users => {
      this.dataSource = [
        { id: 1,
          name: 'Spiderman'
        }
      ];
    // });

    // this._usersService.getUsers().subscribe(users => {
    //   console.log('The usersService observable', users);
    //   this.dataSource = users;
    // });
    
    // this._userService.getToken().subscribe(token => {
    //   console.log('users.component this._userService', token);
    //   this.token = token;
    //   if (token) {
    //     this.displayedColumns.push('edit-button', 'delete-button');
    //   }

    //   if (!token && this.displayedColumns.includes('edit-button')) {
    //     this.displayedColumns.filter(column => column !== 'edit-button' && column !== 'delete-button');
    //   } 
    // });
  }


  viewUser(hero: Hero | null, action: string) {
    console.log('viewHero()', hero);
    // const dialogRef = this.matDialog.open(DialogComponent, {
    //   data: {
    //     user,
    //     action
    //   },
    // });

    // dialogRef.afterClosed().subscribe(async result => {
    //   if (result?.user) {
    //     try {
    //       console.log('The dialog was closed: ', result.user);
    //       this.dataSource.push(result.user);
    //       if (result.action === 'add') {
    //         await lastValueFrom(this._usersService.createUser(result.user));
    //         this.toasterMessage = 'User created succesfully';
    //       } else if (result.action === 'edit') {
    //         await lastValueFrom(this._usersService.updateUser(result.user, result.user.id));
    //         this.toasterMessage = 'User updated succesfully';
    //       } 
    //       this.toaster.success(this.toasterMessage);
    //       lastValueFrom(this._usersService.getUsers()).then(users => {
    //         this.dataSource = users;
    //       });
    //     } catch (error: any) {
    //       console.log(error);
    //       switch (error.error.code) {
    //         case 'P2002':
    //           this.toaster.error('email already exists');
    //           break;
    //         default:
    //           this.toaster.error('Something went wrong, please review the data and try again');
    //           break;
    //       }
    //     }
    //   }
    // });
  }

  async deleteUser(heroId: number, action: string) {
    console.log('deleteHero()', heroId);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        action
      },
    });
    // dialogRef.afterClosed().subscribe(async result => {
    //   try {
    //     await lastValueFrom(this._usersService.deleteUser(userId));
    //     this.toasterMessage = 'User deleted succesfully';
    //     this.toaster.success(this.toasterMessage);
    //     lastValueFrom(this._usersService.getUsers()).then(users => {
    //       this.dataSource = users;
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     this.toaster.error('Something went wrong, please try again');
    //   }
    // })
  }

}
