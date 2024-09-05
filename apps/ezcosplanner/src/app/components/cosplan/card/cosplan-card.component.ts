import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { Cosplan } from '../../../models/cosplan';
import { MatDivider } from '@angular/material/divider';
import { DialogService } from '../../../services/dialog.service';
import { CosplanApiService } from '../../../services/cosplan-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSnackbarImgComponent } from '../../dashboard/main/snackbar/simple-snackbar-img.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ezc-cosplan-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage,
    MatIconModule,
    RouterLink,
    MatDivider,
  ],
  templateUrl: './cosplan-card.component.html',
  styleUrl: './cosplan-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanCardComponent {
  @Input({ required: true }) cosplan!: Cosplan;
  onDelete = output<void>(); 

  private dialogService = inject(DialogService);
  private cosplanApiService = inject(CosplanApiService);
  private snackBar = inject(MatSnackBar);

  toggleAlertDialog(): void {
    this.dialogService.openAnimatedDialog(
      'Suppression cosplan',
      'Es-tu sûr(e) de vouloir suprimer ton cosplan ?',
      (res) => res && this.deleteCosplan()
    );
  }

  private deleteCosplan() {
    const currentCosplanId = this.cosplan.id;
    if (currentCosplanId) {
      this.cosplanApiService.deleteCosplan$(currentCosplanId).subscribe({
        next: () => {
          this.onDelete.emit();
          this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
            data: {
              snackbarLabel: 'Ton cosplan a bien été supprimé',
            },
            duration: 3000,
          });
        },
        error: (err) => {
          console.error(`Error while upading cosplan: ${err}`);
        },
      });
    }
  }
}
