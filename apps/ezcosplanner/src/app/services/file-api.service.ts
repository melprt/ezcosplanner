import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FileType } from '../types/file-type';
import { UploadedFile } from '../models/uploaded-file';

@Injectable()
export class FileApiService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';

  uploadFile$(file: File): Observable<number> {
    const formData = new FormData();

    formData.append('file', file, file.name);
    return this.http
      .post<number>(`${this.apiBaseUrl}/file/upload`, formData)
      .pipe(first());
  }

  saveFile$(
    file: File,
    fileType: FileType,
    entityId?: number
  ): Observable<UploadedFile> {
    const formData = new FormData();

    if (entityId) {
      formData.append('entityId', entityId.toString());
    }
    formData.append('fileType', fileType);
    formData.append('file', file, file.name);

    return this.http
      .post<UploadedFile>(`${this.apiBaseUrl}/file/save`, formData)
      .pipe(first());
  }

  deleteFile$(id: number, path: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiBaseUrl}/file/${id}`, {body: {path}})
      .pipe(first());
  }
}
