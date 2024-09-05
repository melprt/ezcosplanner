import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { DialogMaxWidth } from '../../../../enums/dialog.enum';
import { AddPartDialogComponent } from '../add-dialog/add-part-dialog.component';
import { AddPartDialogRes } from '../add-dialog/add-part.dialog';
import { CreatePartData } from '../../../../models/part';
import { PartApiService } from '../../../../services/part-api.service';

@Component({
  selector: 'ezc-add-part-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterLink],
  templateUrl: './add-part-card.component.html',
  styleUrl: './add-part-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPartCardComponent {
  @Input({'required': true}) cosplanId!: number;

  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private partApiService = inject(PartApiService);

  toggleDialogCreate() : void {
    this.dialog
    .open<AddPartDialogComponent, never, AddPartDialogRes>(
      AddPartDialogComponent,
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
        this.createPart({...res.formValue, cosplanId: this.cosplanId});
      }
    });
  }

  createPart(formValue: CreatePartData): void {
    this.partApiService.createPart$(formValue).subscribe({
      next: (createdPart) => {
        this.router.navigate(['./', createdPart.id], { relativeTo: this.route });
      },
      error: (err) => {
        console.error(`Error while upading cosplan: ${err}`);
      },
    });
  }



}
