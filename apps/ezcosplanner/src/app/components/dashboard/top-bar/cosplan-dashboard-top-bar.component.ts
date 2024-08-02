import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CosplanService } from '../../../services/cosplan.service';
import { CosplanApiService } from '../../../services/cosplan-api.service';
import { CosplanStatus } from '../../../types/cosplan-status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSnackbarImgComponent } from '../main/snackbar/simple-snackbar-img.component';
import { DialogService } from '../../../services/dialog.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ezc-cosplan-dashboard-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './cosplan-dashboard-top-bar.component.html',
  styleUrl: './cosplan-dashboard-top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanDashboardTopBarComponent {
  protected cosplan = inject(CosplanService).cosplan;
  protected viewMode = inject(CosplanService).viewMode;
  protected cosplanStatus = computed(() => this.cosplan()?.status);
  private cosplanApiService = inject(CosplanApiService);
  private snackBar = inject(MatSnackBar);
  private dialogService = inject(DialogService);
  private router = inject(Router);

  editCosplanStatus(status: CosplanStatus): void {
    const messageCosplanStatus = this.getMessageCosplanStatus(status);
    const currentCosplanId = this.cosplan()?.id;
    if (currentCosplanId) {
      this.cosplanApiService
        .updateCosplanStatus$(currentCosplanId, { status })
        .subscribe({
          next: (updatedCosplan) => {
            this.cosplan.set(updatedCosplan);
            this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
              data: {
                snackbarLabel: `Ton cosplan a bien été ${messageCosplanStatus}`,
                error: false,
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

  toggleAlertDialog(): void {
    this.dialogService.openAnimatedDialog(
      'Suppression cosplan',
      'Es-tu sûr(e) de vouloir suprimer ton cosplan ?',
      (res) => res && this.deleteCosplan()
    );
  }

  deleteCosplan() {
    const currentCosplanId = this.cosplan()?.id;
    if (currentCosplanId) {
      this.cosplanApiService.deleteCosplan$(currentCosplanId).subscribe({
        next: () => {
          this.router.navigate(['/']);
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

  private getMessageCosplanStatus(status: CosplanStatus): string {
    switch (status) {
      case 'COMPLETE':
        return 'terminé';
      case 'PENDING':
        return 'mis en pause';
      case 'IN_PROGRESS':
        return 'activé';
      default:
        return 'mis à jour';
    }
  }
}
