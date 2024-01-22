import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// openDialog
@Component({
  selector: 'loading-example-dialog',
  templateUrl: './loading.component.html'
})
export class LoadingDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<LoadingDialogComponent>,
    public atProgressSpinnerModule: MatProgressSpinnerModule

    ) {

  }
}
