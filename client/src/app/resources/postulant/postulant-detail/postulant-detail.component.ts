import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  BreadcrumbService,
  CaseDetailComponent,
  FlashMessageService,
  ResourceDefinition,
  ResourceService,
} from '@casejs/angular-library'

import { postulantDefinition } from '../postulant.definition'
import { environment } from 'src/environments/environment'
import { Option } from 'src/app/models/option'
import { CompetenceService } from 'src/app/services/competence.service'
import { Competence } from 'src/app/models/competence'

@Component({ 
  templateUrl: './postulant-detail.component.html',
  styleUrls: ['./postulant-detail.component.scss']
 })
export class PostulantDetailComponent extends CaseDetailComponent implements OnInit {
  definition: ResourceDefinition = postulantDefinition
  imageBase:string = environment.storagePath
  competences:Competence[] = []
  constructor(
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    activatedRoute: ActivatedRoute,
    private competenceService:CompetenceService
  ) {
    super(
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
  }

  async ngOnInit(): Promise<void> {
    /* this.competenceService.getCompetenceByPostulant(this.item.id).subscribe(data=>{
      this.competences = data
      console.log(data)
    }) */
    await this.initDetailView().then(()=>{
      this.competenceService.getCompetenceByPostulant(this.item.id).subscribe(data=>{
        this.competences = data
      })
    })
  }
}
