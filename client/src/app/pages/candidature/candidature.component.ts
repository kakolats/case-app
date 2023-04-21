import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'

import { CaseCreateEditComponent, ResourceDefinition, Field, InputType, BreadcrumbService, FlashMessageService, ResourceService, caseCreateEditTemplate } from '@casejs/angular-library'
import { postulantDefinition } from '../../resources/postulant/postulant.definition';
import { environment } from 'src/environments/environment';
import { Option } from 'src/app/models/option';
import { CompetenceService } from 'src/app/services/competence.service';
import { Sexe } from 'src/app/resources/postulant/postulant-create-edit/postulant-create-edit.component';
import { LangueService } from 'src/app/services/langue.service';
import { NiveauService } from 'src/app/services/niveau.service';


@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent extends CaseCreateEditComponent implements OnInit {
  items: {
    label:string,
    value:number
  };
  competences:Option[]|[]=[];
  redirectTo: string = '/forgot-password';
  isOnboarding = environment.isOnboarding
  val:FormGroup = new FormGroup({})
  definition: ResourceDefinition = postulantDefinition
  fields: Field[] = [
    {
      label: 'nom',
      property: 'name',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'prenom',
      property: 'prenom',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'Age',
      property: 'age',
      required: true,
      inputType: InputType.Number,
    },
    {
      label: 'Sexe',
      property: 'sexe',
      required: true,
      selectOptions: [
        {
          label : 'Masculin',
          value : Sexe.Homme
        },
        {
          label : 'Feminin',
          value : Sexe.Femme
        }
      ],
      inputType: InputType.Radio
    },
    {
      label: 'Email',
      property: 'email',
      required: true,
      inputType: InputType.Email
    },
    {
      label: 'Adresse',
      property: 'adresse',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'Pays',
      property: 'pays',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'Competences',
      property: 'competenceIds',
      required: true,
      selectOptions: [ 
      ],
      inputType: InputType.MultiSelect
    },
    {
      label: 'Niveau Fullstack',
      property: 'niveauId',
      required: true,
      retrievedItemProperties:{
        niveauId: 'niveauId'
      },
      selectOptions:[],
      inputType: InputType.Select
    },
    {
      label: 'Langue parlée',
      property: 'langueId',
      required: true,
      retrievedItemProperties:{
        niveauId: 'langueId'
      },
      selectOptions:[],
      inputType: InputType.Select
    },
    {
      label: 'Github',
      property: 'github',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'Photo',
      property: 'photo',
      required: true,
      inputType: InputType.Image
    },
    {
      label: 'Curriculum Vitae',
      property: 'cv',
      required: true,
      inputType: InputType.File
    },
  ]

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    private competenceService:CompetenceService,
    private niveauService:NiveauService,
    private langueService:LangueService,
    private routerS:Router
  ) {
    super(
      formBuilder,
      router,
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute,
      
    )
  }

  ngOnInit() {
    this.competenceService.getSelectOptions().subscribe(data=>{
      this.fields[7].selectOptions=data;
    })
    this.niveauService.getSelectOptions().subscribe(data=>{
      this.fields[8].selectOptions=data;
    })
    this.langueService.getSelectOptions().subscribe(data=>{
      this.fields[9].selectOptions=data;
    })
    this.initCreateEditView()
  }
}
