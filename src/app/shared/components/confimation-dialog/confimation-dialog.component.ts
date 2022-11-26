import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confimation-dialog',
  templateUrl: './confimation-dialog.component.html',
  styleUrls: ['./confimation-dialog.component.scss']
})
export class ConfimationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,) { }

  public confirm(res: boolean) {
    this.dialogRef.close(res);
  }
}
