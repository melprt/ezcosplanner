import { MatDialog } from '@angular/material/dialog';
import { SimpleAlertDialogComponent } from '../components/Dialog/SimpleAlertDialog/simple-alert-dialog.component';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { DialogMaxWidth } from '../enums/dialog.enum';

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
    callback: (res?: boolean) => void,
  ): void {

    const dialogRef = this.dialog.open<
      SimpleAlertDialogComponent,
      DialogData,
      boolean
    >(SimpleAlertDialogComponent, {
      data: {
        title,
        message : message,
      },
      width: '100%',
      maxWidth: DialogMaxWidth.sm,
      enterAnimationDuration: 200,
      exitAnimationDuration: 100,
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((res) => callback(res));
  }

}
