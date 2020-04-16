
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/csv',
  })
};
const url = environment.apiURL + "lidar/";

@Injectable({
  providedIn: 'root'
})
export class BokehService {

  constructor(private http: HttpClient) { }

  getBokeh(csvFile): Observable<any> {
    return this.http.post(url, csvFile);
  }
}
