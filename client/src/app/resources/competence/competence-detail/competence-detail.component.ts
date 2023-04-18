import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  BreadcrumbService,
  CaseDetailComponent,
  FlashMessageService,
  ResourceDefinition,
  ResourceService,
} from '@casejs/angular-library'

import { competenceDefinition } from '../competence.definition'

@Component({ 
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.scss']
 })
export class CompetenceDetailComponent extends CaseDetailComponent implements OnInit {
  definition: ResourceDefinition = competenceDefinition

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
