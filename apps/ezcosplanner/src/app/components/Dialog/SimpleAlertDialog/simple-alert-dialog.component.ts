import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ezc-simple-alert-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './simple-alert-dialog.component.html',
  styleUrl: './simple-alert-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleAlertDialogComponent {
  data = inject(MAT_DIALOG_DATA);   
}
