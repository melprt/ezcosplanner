import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, switchMap } from 'rxjs';
import { CosplanService } from './cosplan.service';
import { Cosplan } from '../models/cosplan';

@Injectable()
export class PartApiService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';
  private baseCosplanUrl = `${this.apiBaseUrl}/timeentry`;
  private cosplanService = inject(CosplanService);

  /**
   * Delete a time entry based on her given id
   * Also retrive updated cosplan and update it in CosplanService
   *
   * @see CosplanService
   * @param id of timeEntry to delete
   * @returns Updated cosplan related to deleted timeEntry
   */
  deletePart$(id: number): Observable<Cosplan | null> {
    return this.http.delete<void>(`${this.baseCosplanUrl}/${id}`).pipe(
      switchMap(() => this.cosplanService.refreshCosplan$()),
      first()
    );
  }
}
