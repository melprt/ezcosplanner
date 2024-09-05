import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CosplanService } from '../../../../services/cosplan.service';
import { AddPartDialogRes } from './add-part.dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ezc-add-part-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatLabel,
    MatButtonModule,
  ],
  templateUrl: './add-part-dialog.component.html',
  styleUrl: './add-part-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CosplanService],
})
export class AddPartDialogComponent {
  cosplanService = inject(CosplanService);
  data = inject(MAT_DIALOG_DATA);
  partForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  private dialogRef: MatDialogRef<AddPartDialogComponent, AddPartDialogRes> =
    inject(MatDialogRef);

  close(status: boolean, event = null) {
    if (status || event) {
      if (this.partForm.valid) {
        this.dialogRef.close({
          status,
          formValue: this.partForm.getRawValue(),
        });
      }
    } else {
      this.dialogRef.close({
        status: false,
      });
    }
  }
}
