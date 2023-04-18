import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'

import { CaseCreateEditComponent, ResourceDefinition, Field, InputType, BreadcrumbService, FlashMessageService, ResourceService, caseCreateEditTemplate } from '@casejs/angular-library'

import { environment } from '../../../../environments/environment'
import { competenceDefinition } from '../competence.definition'

@Component({ template: caseCreateEditTemplate })
export class CompetenceCreateEditComponent extends CaseCreateEditComponent implements OnInit {

  // Remove this property to hide onboarding message.
  isOnboarding = environment.isOnboarding

  definition: ResourceDefinition = competenceDefinition
  fields: Field[] = [
    {
      label: 'libelle',
      property: 'libelle',
      required: true,
      inputType: InputType.Text
    },
  ]

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService
  ) {
    super(
      formBuilder,
      router,
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
  }

  ngOnInit() {
    this.initCreateEditView()
  }
}
