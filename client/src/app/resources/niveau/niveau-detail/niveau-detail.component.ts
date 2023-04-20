import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  BreadcrumbService,
  CaseDetailComponent,
  FlashMessageService,
  ResourceDefinition,
  ResourceService,
} from '@casejs/angular-library'

import { niveauDefinition } from '../niveau.definition'

@Component({ 
  templateUrl: './niveau-detail.component.html',
  styleUrls: ['./niveau-detail.component.scss']
 })
export class NiveauDetailComponent extends CaseDetailComponent implements OnInit {
  definition: ResourceDefinition = niveauDefinition

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
