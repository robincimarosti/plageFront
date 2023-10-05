import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ParasolService {

  private apiUrl = 'http://localhost:8180/'
  private baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = `${this.apiUrl}/parasol`
  }
}
