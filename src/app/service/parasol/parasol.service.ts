import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { FileData } from 'src/app/model/file';
import { Parasol, ParasolHttp } from 'src/app/model/parasol';

@Injectable({
  providedIn: 'root'
})
export class ParasolService {

  private apiUrl = 'http://localhost:8180/api'
  private baseUrl;
  private parasolsSubject: BehaviorSubject<Parasol[]> = new BehaviorSubject<Parasol[]>([]);
  private parasols$: Observable<Parasol[]> = this.parasolsSubject.asObservable();


  constructor(private http: HttpClient) {
    this.baseUrl = `${this.apiUrl}/parasols`;
    this.fetchParasols();
  }

  private fetchParasols(): void {
    this.getAll()
      .then((data: Parasol[]) => {
        this.parasolsSubject.next(data);
      });
  }

  getFiles(): Promise<FileData[]> {
    return firstValueFrom(
      this.http.get<FileData[]>(`${this.apiUrl}/files`)
        .pipe(
          map(res => res || [])
        )
    );
  }

  getAll(): Promise<Parasol[]> {
    return firstValueFrom(
      this.http.get<{ content: ParasolHttp[] }>(this.baseUrl)
        .pipe(
          map((res) => {
            return res.content.map(Parasol.mapperFromHttp);
          })
        )
    );
  }
  getParasolsByFileId(fileId: number): Promise<Parasol[]> {
    return firstValueFrom(
      this.http.get<{ content: ParasolHttp[] }>(`${this.baseUrl}?ID_FILE=${fileId}`)
        .pipe(
          map((res) => {
            return res.content.map(Parasol.mapperFromHttp);
          })
        )
    );
  }
}
