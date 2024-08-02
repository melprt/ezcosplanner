import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FileApiService } from '../../services/file-api.service';
import { MatButtonModule } from '@angular/material/button';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { blobToFile } from '../../utils/file.utils';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSnackbarImgComponent } from '../dashboard/main/snackbar/simple-snackbar-img.component';
import { FileType } from '../../types/file-type';
import { FileActionButtonsComponent } from './file-action-buttons/file-action-buttons.component';
import { UploadedFile } from '../../models/uploaded-file';
import { FileUploadStatus, FileUploadAction } from './file-upload.component.d';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'ezc-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    ImageCropperComponent,
    MatIcon,
    FileActionButtonsComponent,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input({ required: true }) fileType!: FileType;
  @Input({ required: true }) entityId!: number;
  existingFile = input<UploadedFile | null>(null);

  displayedFile = computed(
    () => this.uploadedFileId() ?? this.existingFile()?.id
  );

  uploadedFileId = signal<number | null>(null);

  status = computed<FileUploadStatus>(() => this.computeStatus());
  cropping = signal<boolean>(false);
  editing = signal<boolean>(false);

  imageChangedEvent: Event | null = null;

  @ViewChild('fileDropRef') inputImgRef?: ElementRef<HTMLInputElement>;
  private blob: Blob | null = null;
  private fileUploadService = inject(FileApiService);
  private fileName: string | null = null;
  private snackBar = inject(MatSnackBar);
  private dialogService = inject(DialogService);

  openFileBrowser(): void {
    this.inputImgRef?.nativeElement?.click();
  }

  selectFile(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.fileName = file.name;
    }

    if (file?.type?.startsWith('image/')) {
      this.imageChangedEvent = event;
    } else {
      this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
        data: {
          snackbarLabel: "Ton image n'est pas valide",
          error: true,
        },
        duration: 3000,
      });
    }
  }

  imageLoaded(): void {
    this.cropping.set(true);
  }

  imageCropped({ blob }: ImageCroppedEvent): void {
    if (blob) {
      this.blob = blob;
    }
  }

  uploadFile(): void {
    if (this.blob && this.fileName) {
      this.fileUploadService
        .saveFile$(
          blobToFile(this.blob, this.fileName),
          this.entityId,
          this.fileType
        )
        .subscribe((fileRes) => {
          this.editing.set(false);
          this.cropping.set(false);
          this.uploadedFileId.set(fileRes);
          this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
            data: {
              snackbarLabel: 'Ton image a bien été enregistrée',
            },
            duration: 3000,
          });
        });
    }
  }

  cancel(): void {
    if (this.blob && this.fileName) {
      this.cropping.set(false);
    }
  }

  actionImage($event: FileUploadAction): void {
    if ($event == 'replace') {
      this.openFileBrowser();
    } else {
      this.toggleAlertDialog();
    }
  }

  private deleteImage (): void {
    const fileId = this.displayedFile();
    if (fileId) {
      // Suggestion: on delete or other operations should trigger whole cosplan dashboard refresh data
      this.fileUploadService.deleteFile$(fileId).subscribe(() => {
        this.resetImgBrowse();
        this.snackBar.openFromComponent(SimpleSnackbarImgComponent, {
          data: {
            snackbarLabel: 'Ton image a bien été supprimée',
          },
          duration: 3000,
        });
      });
    }
  }

  private toggleAlertDialog(): void {
    this.dialogService.openAnimatedDialog(
      'Suppression image',
      'Es-tu sûr(e) de vouloir suprimer ton image ?',
      (res) => res && this.deleteImage()
    );
  }

  private computeStatus(): FileUploadStatus {
    if (this.cropping()) {
      return 'cropping';
    }
    // If click on edit action force uploading state even if file is already present
    if (this.editing()) {
      return 'uploading';
    }
    return this.displayedFile() ? 'viewing' : 'uploading';
  }

  private resetImgBrowse(): void {
    this.uploadedFileId.set(null);
    this.blob = null;
    this.editing.set(true);
  }
}
