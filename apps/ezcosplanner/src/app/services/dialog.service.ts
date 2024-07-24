import { MatDialog } from '@angular/material/dialog';
import { SimpleAlertDialogComponent } from '../components/Dialog/SimpleAlertDialog/simple-alert-dialog.component';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

interface DialogData {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  openAnimatedDialog(
    title: string,
    message: string,
    callback: (res?: boolean) => void
  ): void {
    const dialogRef = this.dialog.open<
      SimpleAlertDialogComponent,
      DialogData,
      boolean
    >(SimpleAlertDialogComponent, {
      data: {
        title,
        message,
      },
      width: '450px',
      enterAnimationDuration: 200,
      exitAnimationDuration: 100,
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((res) => callback(res));
  }
}
