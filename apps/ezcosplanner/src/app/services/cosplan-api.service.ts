import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cosplan, CosplanStatusUpdateData, CosplanUpdateData } from '../models/cosplan';
import { Observable, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CosplanApiService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000';
  private baseCosplanUrl = `${this.apiBaseUrl}/cosplan`;

  getAllCosplans$(): Observable<Cosplan[]> {
    return this.http
      .get<{ cosplans: Cosplan[] }>(this.baseCosplanUrl)
      .pipe(map((res) => res.cosplans));
  }

  getCosplanbyId$(id: number): Observable<Cosplan> {
    return this.http
      .get<Cosplan>(`${this.baseCosplanUrl}/${id}`)
      .pipe(first());
  }

  updateCosplan$(id: number, data: CosplanUpdateData): Observable<Cosplan> {
    return this.http
      .put<Cosplan>(`${this.baseCosplanUrl}/${id}`, data)
      .pipe(first());
  }

  updateCosplanStatus$(id: number, data: CosplanStatusUpdateData): Observable<Cosplan> {
    return this.http
      .patch<Cosplan>(`${this.baseCosplanUrl}/${id}/status`, data)
      .pipe(first());
  }

  deleteCosplan$(id: number) : Observable<void> {
    return this.http
      .delete<void>(`${this.baseCosplanUrl}/${id}`)
      .pipe(first());
  }
}
