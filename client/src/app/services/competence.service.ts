import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Competence } from '../models/competence';
import { HttpClient } from '@angular/common/http';
import { Option } from '../models/option';


const APIURL = `${environment.apiBaseUrl}/competences`;
@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http:HttpClient) { }

  getCompetences():Option[]{
    let competences:Option[];
    this.http.get<Competence[]>(APIURL).subscribe(data=>{
      competences = data['data'].map((comp)=>({
        label: comp.libelle,
        value: comp.id
      }));
      console.log(competences)
    }
    );
    return competences; 
  }

  getSelectOptions():Observable<Option[]>{
    return this.http.get<Option[]>(`${APIURL}/select-options`);
  }
}
