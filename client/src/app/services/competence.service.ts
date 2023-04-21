import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Competence } from '../models/competence';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Option } from '../models/option';


const APIURL = `${environment.apiBaseUrl}/competences`;
@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http:HttpClient) { }


  getSelectOptions():Observable<Option[]>{
    return this.http.get<Option[]>(`${APIURL}/select-options`);
  }

  getCompetenceByPostulant(postulantId:string):Observable<Competence[]>{
    return this.http.get<Competence[]>(`${APIURL}?postulantId=${postulantId}&withoutPagination=true`);
  }

}
