import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CaseCreateEditComponent, ResourceDefinition, Field, InputType, BreadcrumbService, FlashMessageService, ResourceService, caseCreateEditTemplate } from '@casejs/angular-library'

import { environment } from '../../../../environments/environment'
import { postulantDefinition } from '../postulant.definition'
import { CompetenceService } from 'src/app/services/competence.service'
import { Competence } from 'src/app/models/competence'
import { Option } from 'src/app/models/option'
import { NiveauService } from 'src/app/services/niveau.service'
import { LangueService } from 'src/app/services/langue.service'


export enum Sexe {
  Homme = "Masculin",
  Femme = "Feminin"
}

@Component({ template: caseCreateEditTemplate })
export class PostulantCreateEditComponent extends CaseCreateEditComponent implements OnInit {
  items: {
    label:string,
    value:number
  };
  competences:Option[]|[]=[];
  // Remove this property to hide onboarding message.
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
      required: false,
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
      required: false,
      inputType: InputType.Text
    },
    {
      label: 'Photo',
      property: 'photo',
      required: false,
      inputType: InputType.Image
    },
    {
      label: 'Curriculum Vitae',
      property: 'cv',
      required: false,
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
    private langueService:LangueService
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
    //console.log(this.competenceService.getCompetences())
    /* this.competenceService.getCompetences().subscribe(data=>{
      this.competences = data['data'].map((comp)=>({
        label: comp.libelle,
        value: comp.id
      }));
      this.fields.concat(
        {
          label: 'Competences',
          property: 'competences',
          required: true,
          selectOptions: this.competences,
          inputType: InputType.MultiSelect
        },
      )
    }) */
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
    /* .then((data)=>{
      //this.initCreateEditView()
      //console.log(data)
      this.val=data
      data.valueChanges.subscribe((dat)=>{
        console.log(dat)
        if(data.valid){
          console.log("Zehahahha")
        }
      })
    }) */
    /* this.submitSuccessful.subscribe(()=>{
      console.log('Done');
    }) */
  }
}
