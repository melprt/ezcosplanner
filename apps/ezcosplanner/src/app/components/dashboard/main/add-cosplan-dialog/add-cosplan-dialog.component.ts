import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosplanService } from '../../../../services/cosplan.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { CosplanCategories } from '../../../../types/cosplan-category';
import { CropFileUploadComponent } from '../../../file-upload/crop-file-upload/crop-file-upload.component';
import { FileApiService } from '../../../../services/file-api.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AddCosplanDialogRes } from './add-cosplan.dialog.d';
import { InferedFormGroup } from '../../../../utils/form.utils';
import { CosplanForm } from '../../../../types/cosplan-form';


@Component({
  selector: 'ezc-add-cosplan-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatLabel,
    MatOption,
    CropFileUploadComponent,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './add-cosplan-dialog.component.html',
  styleUrl: './add-cosplan-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CosplanService, FileApiService]
})
export class AddCosplanDialogComponent {
  cosplanService = inject(CosplanService);
  data = inject(MAT_DIALOG_DATA);
  private dialogRef: MatDialogRef<AddCosplanDialogComponent, AddCosplanDialogRes> =
    inject(MatDialogRef);
  protected readonly cosplanCategories = CosplanCategories;

  cosplanForm =  new FormGroup<InferedFormGroup<CosplanForm>>({
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    fandom: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    category: new FormControl('OTHER', {
      validators: Validators.required,
      nonNullable: true,
    }),
    fileId: new FormControl(),
  });
  

  close(status: boolean) {
    if (status) {
      this.dialogRef.close({
        status,
        formValue: this.cosplanForm.getRawValue(),
      });
    } else {
      this.dialogRef.close({
        status: false,
      })
    }
  }

  setFileId(fileIdOutput: number) {
    this.cosplanForm?.controls['fileId']?.setValue(fileIdOutput);
  }
}
