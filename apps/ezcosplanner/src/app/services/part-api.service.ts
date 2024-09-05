import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, switchMap, tap } from 'rxjs';
import { CreatePartData, Part } from '../models/part';
import { CosplanService } from './cosplan.service';
import { Cosplan } from '../models/cosplan';

@Injectable()
export class PartApiService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';
  private baseCosplanUrl = `${this.apiBaseUrl}/part`;
  private cosplanService = inject(CosplanService);

  createPart$(data: CreatePartData): Observable<Part> {
    return this.http
      .post<Part & { cosplan: Cosplan }>(`${this.baseCosplanUrl}`, data)
      .pipe(
        tap((res) => this.cosplanService.cosplan.set(res.cosplan)),
        first()
      );
  }

  /**
   * Delete a part based on her given id
   * Also retrive updated cosplan and update it in CosplanService
   *
   * @see CosplanService
   * @param id of part to delete
   * @returns Updated cosplan related to deleted part
   */
  deletePart$(id: number): Observable<Cosplan | null> {
    return this.http.delete<void>(`${this.baseCosplanUrl}/${id}`).pipe(
      switchMap(() => this.cosplanService.refreshCosplan$()),
      first()
    );
  }
}
