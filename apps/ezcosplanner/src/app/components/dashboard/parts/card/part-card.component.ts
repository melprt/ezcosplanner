import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Part } from '../../../../models/part';
import { DialogService } from '../../../../services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSnackbarImgComponent } from '../../main/snackbar/simple-snackbar-img.component';
import { PartApiService } from '../../../../services/part-api.service';

@Component({
  selector: 'ezc-part-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterLink],
  templateUrl: './part-card.component.html',
  styleUrl: './part-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartCardComponent {
  private dialogService = inject(DialogService);
  private partApiService = inject(PartApiService);
  private snackBar = inject(MatSnackBar);
  @Input({'required': true}) part!: Part;

  onDelete = output<void>(); 


  toggleAlertDialog(): void {
    this.dialogService.openAnimatedDialog(
      'Suppression élément cosplan',
      'Es-tu sûr(e) de vouloir suprimer cet élément du cosplan ?',
      (res) => res && this.deletePart()
    );
  }

  private deletePart() {
    const currentPartId = this.part.id;
    if (currentPartId) {
      this.partApiService.deletePart$(currentPartId).subscribe({
        next: () => {
          this.onDelete.emit();
          this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
            data: {
              snackbarLabel: 'Ton élément a bien été supprimé',
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
