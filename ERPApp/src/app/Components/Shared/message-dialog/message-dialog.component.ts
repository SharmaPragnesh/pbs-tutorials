import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
//https://firstclassjs.com/create-a-reusable-confirmation-dialog-in-angular-7-using-angular-material/
export class MessageDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
