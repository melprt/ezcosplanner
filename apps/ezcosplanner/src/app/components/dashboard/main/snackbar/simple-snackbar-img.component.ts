import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'ezc-simple-snackbar-img',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, NgOptimizedImage],
  templateUrl: './simple-snackbar-img.component.html',
  styleUrl: './simple-snackbar-img.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSnackbarImgComponent {

  data: {snackbarLabel: string} = inject(MAT_SNACK_BAR_DATA);

  snackBarRef = inject(MatSnackBarRef);
}
