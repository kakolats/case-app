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
  InputType,
  ResourceDefinition,
  ResourceService,
  Yield, YieldType
} from '@casejs/angular-library'

import { environment } from '../../../../environments/environment'
import { postulantDefinition } from '../postulant.definition'
import { NiveauService } from 'src/app/services/niveau.service'
import { LangueService } from 'src/app/services/langue.service'
import { CompetenceService } from 'src/app/services/competence.service'

@Component({ template: caseListTemplate })
export class PostulantListComponent extends CaseListComponent implements OnInit {
  
  // Remove this property to hide onboarding message.
  isOnboarding = environment.isOnboarding

  definition: ResourceDefinition = postulantDefinition
  yields: Yield[] = [
    {
      label: 'nom',
      property: 'photo',
      secondProperty:'name',
      orderByProperty :'name',
      type: YieldType.Image,
      className: 'is-narrow'
    },
    {
      label: 'prenom',
      property: 'prenom',
      type: YieldType.Text,
      className: 'is-narrow',
    },
    {
      label: 'Mail',
      property: 'email',
      type: YieldType.Text
    },
    {
      label: 'Pays',
      property: 'pays',
      type: YieldType.Text
    },
    {
      label: 'CV',
      property: 'cv',
      orderByProperty: 'cv',
      type: YieldType.Download,
      className: 'is-narrow'
    }
  ]

  filters: Filter[] = [
    {
      label: 'Niveau FullStack',
      property: 'niveauId',
      inputType: InputType.Select,
      selectOptions: []
    },
    {
      label: 'Langue parlée',
      property: 'langueId',
      inputType: InputType.Select,
      selectOptions: []
    },
    {
      label: 'Compétences',
      property: 'competenceId',
      inputType: InputType.Select,
      selectOptions: []
    }
  ]

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    authService: AuthService,
    filterService: FilterService,
    private niveauService:NiveauService,
    private langueService:LangueService,
    private competenceService:CompetenceService,
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
    this.niveauService.getSelectOptions().subscribe(data=>{
      this.filters[0].selectOptions=data
    })
    this.langueService.getSelectOptions().subscribe(data=>{
      this.filters[1].selectOptions=data
    })
    this.competenceService.getSelectOptions().subscribe(data=>{
      this.filters[2].selectOptions=data
    })
    this.initListView()
  }
}
