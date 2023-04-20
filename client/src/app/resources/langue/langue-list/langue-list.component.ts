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
import { langueDefinition } from '../langue.definition'

@Component({ template: caseListTemplate })
export class LangueListComponent extends CaseListComponent implements OnInit {
  
  // Remove this property to hide onboarding message.
  isOnboarding = environment.isOnboarding

  definition: ResourceDefinition = langueDefinition
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
