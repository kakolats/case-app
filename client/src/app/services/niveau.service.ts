import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../models/option';

const APIURL = `${environment.apiBaseUrl}/niveaus`

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private http:HttpClient) { }

  getSelectOptions():Observable<Option[]>{
    return this.http.get<Option[]>(`${APIURL}/select-options`);
  }
}
