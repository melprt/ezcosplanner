import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cosplan, CosplanUpdateData } from '../models/cosplan';
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
}
