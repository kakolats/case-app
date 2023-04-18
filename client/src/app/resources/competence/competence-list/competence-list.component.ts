import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AuthService,
  BreadcrumbService,
  CaseConfig,
  CaseListComponent,
  caseListTemplate,
  Filter,
  FilterService,
  FlashMessageService,
  ResourceDefinition,
  ResourceService,
  Yield, YieldType
} from '@casejs/angular-library'

import { environment } from '../../../../environments/environment'
import { competenceDefinition } from '../competence.definition'

@Component({ template: caseListTemplate })
export class CompetenceListComponent extends CaseListComponent implements OnInit {
  
  // Remove this property to hide onboarding message.
  isOnboarding = environment.isOnboarding

  definition: ResourceDefinition = competenceDefinition
  yields: Yield[] = [
    {
        label: 'libelle',
        property: 'libelle',
        type: YieldType.Text
    },
  ]

  filters: Filter[] = []

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    authService: AuthService,
    filterService: FilterService,
    @Inject('CASE_CONFIG_TOKEN') config: CaseConfig
  ) {
    super(
      router,
      activatedRoute,
      breadcrumbService,
      resourceService,
      flashMessageService,
      authService,
      filterService,
      config
    )
  }

  ngOnInit() {
    this.initListView()
  }
}
