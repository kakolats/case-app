import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  BreadcrumbService,
  CaseDetailComponent,
  FlashMessageService,
  ResourceDefinition,
  ResourceService,
} from '@casejs/angular-library'

import { langueDefinition } from '../langue.definition'

@Component({ 
  templateUrl: './langue-detail.component.html',
  styleUrls: ['./langue-detail.component.scss']
 })
export class LangueDetailComponent extends CaseDetailComponent implements OnInit {
  definition: ResourceDefinition = langueDefinition

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
