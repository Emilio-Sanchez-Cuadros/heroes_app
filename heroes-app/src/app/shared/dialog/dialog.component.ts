import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Hero } from 'src/app/models/models';

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {

  submitText: string = '';
  userForm: any;

  heroForm: any;

  @Output()
  heroValues = new EventEmitter<Hero>();

  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
    switch (this.data.action) {
      case 'edit':
      case 'add':
        this.submitText = 'Update';
        this.heroForm = new FormGroup({
          name: new FormControl(this.data?.hero?.name || '', Validators.required),
          picture: new FormControl(this.data?.hero?.picture || '', Validators.required),
          description: new FormControl(this.data?.hero?.description || '', Validators.required),
        });
        break;
      case 'delete':
        this.submitText = 'Confirm'
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close('Cancel');
  }

  async submit() {
    console.log('submitForm', this.heroForm?.value);
    if (!['delete'].includes(this.data.action)) {
      const hero = this.heroForm?.value;
      if (['edit'].includes(this.data.action)) {
        hero.id = this.data?.hero?.id;
      }
      // hero.picture = this.data?.hero?.picture;
      this.dialogRef.close({hero: hero, action: this.data.action });
    } else {
      this.dialogRef.close('confirm');
    }
  }

}