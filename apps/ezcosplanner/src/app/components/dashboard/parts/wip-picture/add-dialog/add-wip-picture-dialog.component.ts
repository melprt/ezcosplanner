import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CosplanService } from '../../../../../services/cosplan.service';
import { CropFileUploadComponent } from '../../../../file-upload/crop-file-upload/crop-file-upload.component';
import { AddWipPictureDialogRes } from './add-wip-picture-dialog';
import { FileApiService } from '../../../../../services/file-api.service';

@Component({
  selector: 'ezc-add-wip-picture-dialog',
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
    CropFileUploadComponent,
  ],
  templateUrl: './add-wip-picture-dialog.component.html',
  styleUrl: './add-wip-picture-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CosplanService, FileApiService],
})
export class AddWipPictureDialogComponent {
  cosplanService = inject(CosplanService);
  data = inject(MAT_DIALOG_DATA);
  wipPictureForm = new FormGroup({
    title: new FormControl<string>(''),
    smallDesc: new FormControl<string>(''),
    fileId: new FormControl<number | null>(null,
      {
        validators: Validators.required,
        nonNullable: true,
      }
    ),
  });

  private dialogRef: MatDialogRef<
    AddWipPictureDialogComponent,
    AddWipPictureDialogRes
  > = inject(MatDialogRef);

  close(status: boolean, event = null) {
    if (status || event) {
      if (this.wipPictureForm.valid) {
        this.dialogRef.close({
          status,
          formValue: this.wipPictureForm.getRawValue(),
        });
      }
    } else {
      this.dialogRef.close({
        status: false,
      });
    }
  }

  setFileId(fileIdOutput: number) {
    if (fileIdOutput) {
      this.wipPictureForm?.controls['fileId']?.setValue(fileIdOutput);
    } else if(this.wipPictureForm?.controls['fileId']?.value) {
      this.wipPictureForm?.controls['fileId']?.reset();
    }
  }
}
