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

@Component({ 
  templateUrl: './postulant-detail.component.html',
  styleUrls: ['./postulant-detail.component.scss']
 })
export class PostulantDetailComponent extends CaseDetailComponent implements OnInit {
  definition: ResourceDefinition = postulantDefinition

  constructor(
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
  }

  async ngOnInit(): Promise<void> {
    await this.initDetailView()
  }
}