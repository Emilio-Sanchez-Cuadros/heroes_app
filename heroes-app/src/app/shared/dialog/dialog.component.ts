import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/models';

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {

  firstName: string = this.data?.user?.name?.split(' ').slice(0, -1).join(' ');
  lastName: string = this.data?.user?.name?.split(' ').slice(-1).join(' ');
  submitText: string = '';
  userForm: any;

  // userForm = new FormGroup({
  //   firstName: new FormControl(this.firstName || '', Validators.required),
  //   lastName: new FormControl(this.lastName || '', Validators.required),
  //   email: new FormControl(this.data?.user?.email || '', Validators.required),
  //   password: new FormControl(this.data?.user ? '****' : '', Validators.required),
  // });

  // loginForm = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  // });

  @Output()
  userValues = new EventEmitter<User>();

  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
    switch (this.data.action) {
      case 'edit':
        this.submitText = 'Update';
        this.userForm = new FormGroup({
          firstName: new FormControl(this.firstName || '', Validators.required),
          lastName: new FormControl(this.lastName || '', Validators.required),
          email: new FormControl(this.data?.user?.email || '', Validators.required),
          password: new FormControl(this.data?.user ? '****' : '', Validators.required),
        });
        break;
      case 'delete':
        this.submitText = 'Confirm'
        break;
      case 'login':
        this.submitText = 'Login';
        this.userForm = new FormGroup({
          email: new FormControl(this.data?.user?.email || '', Validators.required),
          password: new FormControl(this.data?.user ? '****' : '', Validators.required),
        });
        break;
      default:
        this.submitText = 'Create';
        this.userForm = new FormGroup({
          firstName: new FormControl(this.firstName || '', Validators.required),
          lastName: new FormControl(this.lastName || '', Validators.required),
          email: new FormControl(this.data?.user?.email || '', Validators.required),
          password: new FormControl(this.data?.user ? '****' : '', Validators.required),
        });
        break;
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit() {
    console.log('submitForm', this.userForm?.value);
    let user = this.transformData(this.userForm?.value);
    if (!['delete', 'login'].includes(this.data.action)) {
      this.dialogRef.close({user: user, action: this.data.action });
    } else {
      this.dialogRef.close({ user: user });
    }
  }

  transformData(user: any) {
    if (user) {
      user.name = user.firstName + ' ' + user.lastName;
      if (this.data.user) {
        user.id = this.data.user.id;
      }
      if (this.data.action === 'login') {
        delete user.name;
      }
      delete user.firstName
      delete user.lastName
    }
    return user;
  }
}