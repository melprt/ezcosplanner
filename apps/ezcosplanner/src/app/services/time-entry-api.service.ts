import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, map, switchMap } from 'rxjs';
import { CosplanService } from './cosplan.service';
import { Cosplan } from '../models/cosplan';
import { TimeEntry, TimeEntryApiResult } from '../models/time-entry';

@Injectable()
export class TimeEntryApiService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';
  private baseTimeEntryUrl = `${this.apiBaseUrl}/timeentry`;
  private cosplanService = inject(CosplanService);

  getAllByCosplan$(
    cosplanId: number,
    offset: number,
    limit: number
  ): Observable<TimeEntryApiResult> {
    return this.http
      .get<TimeEntryApiResult>(`${this.baseTimeEntryUrl}/${cosplanId}`, {
        params: {
          'offset': offset,
          'limit': limit
        }
      })
      .pipe(map((res) => res));
  }

  /**
   * Delete a time entry based on given list of ids
   * Also retrive updated cosplan and update it in CosplanService
   *
   * @see CosplanService
   * @param ids ids of timeEntry to delete
   * @returns Updated cosplan related to deleted timeEntry
   */
  deleteTimeEntries$(ids: number[]): Observable<Cosplan | null> {
    return this.http
      .delete<void>(`${this.baseTimeEntryUrl}`, {
        body: { ids: ids },
      })
      .pipe(
        switchMap(() => this.cosplanService.refreshCosplan$()),
        first()
      );
  }
}
