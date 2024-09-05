import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressCircleComponent } from '../../progess-circle/progress-circle.component';
import { TimeEntriesStatCardComponent } from './time-entries-stat-card/time-entries-stat-card.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CosplanCategories, CosplanCategory } from '../../../types/cosplan-category';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Cosplan } from '../../../models/cosplan';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSnackbarImgComponent } from './snackbar/simple-snackbar-img.component';
import { CosplanApiService } from '../../../services/cosplan-api.service';
import { CosplanService } from '../../../services/cosplan.service';
import { MatDialog } from '@angular/material/dialog';
import { CropFileUploadComponent } from '../../file-upload/crop-file-upload/crop-file-upload.component';
import { DialogService } from '../../../services/dialog.service';
import { AddCosplanDialogComponent } from './add-cosplan-dialog/add-cosplan-dialog.component';
import { DialogMaxWidth } from '../../../enums/dialog.enum';
import { filter, first } from 'rxjs';
import { AddCosplanDialogRes } from './add-cosplan-dialog/add-cosplan.dialog.d';
import { CosplanForm } from '../../../types/cosplan-form';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ProgressCircleComponent,
    NgOptimizedImage,
    TimeEntriesStatCardComponent,
    StatCardComponent,
    MatListModule,
    MatDivider,
    MatLabel,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOption,
    MatIcon,
    MatButtonModule,
    MatTooltipModule,
    CropFileUploadComponent,
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainComponent {
  private cosplanApiService = inject(CosplanApiService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly dialogService = inject(DialogService);

  protected cosplan = inject(CosplanService).cosplan;
  protected viewMode = inject(CosplanService).viewMode;
  protected editView = signal(false);
  protected readonly cosplanCategories = CosplanCategories;

  cosplanForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    fandom: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    category: new FormControl<CosplanCategory>('OTHER', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor() {
    effect(() => {
      const cosplan = this.cosplan();
      if (cosplan) {
        this.initFormValue(cosplan);
      } else {
        this.dialog
          .open<AddCosplanDialogComponent, never, AddCosplanDialogRes>(
            AddCosplanDialogComponent,
            {
              width: '100%',
              maxWidth: DialogMaxWidth.md,
              enterAnimationDuration: 200,
              exitAnimationDuration: 100,
              disableClose: true,
            }
          )
          .afterClosed()
          .pipe(first())
          .subscribe((res) => {
            if (res?.status) {
              this.createCosplan(res.formValue);
            }
          });
      }
    });
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.snackBar.dismiss();
      });
  
  }

  toggleEditView(message?: string): void {
    if (message) {
      this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
        data: {
          snackbarLabel: message,
        },
      });

      this.editView.set(true);
    } else {
      this.editView.set(false);
      this.snackBar.dismiss();
    }
  }

  editCosplan(): void {
    const currentCosplanId = this.cosplan()?.id;
    if (currentCosplanId) {
      this.cosplanApiService
        .updateCosplan$(currentCosplanId, this.cosplanForm.getRawValue())
        .subscribe({
          next: (updatedCosplan) => {
            this.cosplan.set(updatedCosplan);
            this.toggleEditView();
          },
          error: (err) => {
            console.error(`Error while upading cosplan: ${err}`);
          },
        });
    }
  }

  createCosplan(formValue: CosplanForm): void {
    this.cosplanApiService.createCosplan$(formValue).subscribe({
      next: (createdCosplan) => {
        this.cosplan.set(createdCosplan);
        this.toggleEditView();
      },
      error: (err) => {
        console.error(`Error while upading cosplan: ${err}`);
      },
    });
  }

  private initFormValue(cosplan: Cosplan): void {
    this.cosplanForm.setValue({
      name: cosplan.name,
      fandom: cosplan.fandom,
      category: cosplan.category,
    });
  }
}
