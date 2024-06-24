import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cosplan } from '../models/cosplan';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CosplanService {
  private http = inject(HttpClient);
  
  getAllCosplans$(): Observable<Cosplan[]> {  
    return this.http.get<{cosplans: Cosplan[]} >('http://localhost:3000/cosplan').pipe(map(res => res.cosplans));
  }
}
