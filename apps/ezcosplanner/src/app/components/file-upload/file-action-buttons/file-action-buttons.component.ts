import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FileUploadAction } from '../file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'ezc-file-action-buttons',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule, MatTooltip],
  templateUrl: './file-action-buttons.component.html',
  styleUrl: './file-action-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileActionButtonsComponent {
  onClickAction = output<FileUploadAction>();

  setAction (action: FileUploadAction) {
    this.onClickAction.emit(action);
  }
}
