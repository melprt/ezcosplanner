import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMaxWidth } from '../../../../../enums/dialog.enum';
import { first } from 'rxjs';
import { AddWipPictureDialogComponent } from '../add-dialog/add-wip-picture-dialog.component';
import { AddWipPictureDialogRes } from '../add-dialog/add-wip-picture-dialog';

@Component({
  selector: 'ezc-add-wip-picture-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './add-wip-picture-card.component.html',
  styleUrl: './add-wip-picture-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWipPictureCardComponent {
  @Input({ required: true }) partId!: number;

  private dialog = inject(MatDialog);

  toggleDialogCreate(): void {
    this.dialog
      .open<AddWipPictureDialogComponent, never, AddWipPictureDialogRes>(
        AddWipPictureDialogComponent,
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
          // this.createWipPicture({ ...res.formValue, partId: this.partId });
        }
      });
  }

  // createWipPicture(formValue: CreatePartData): void {
  //   this.partApiService.createPart$(formValue).subscribe({
  //     next: (createdPart) => {
  //       //maj view
  //     },
  //     error: (err) => {
  //       console.error(`Error while upading cosplan: ${err}`);
  //     },
  //   });
  // }
}
