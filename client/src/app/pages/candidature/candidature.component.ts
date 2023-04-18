import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'

import { CaseCreateEditComponent, ResourceDefinition, Field, InputType, BreadcrumbService, FlashMessageService, ResourceService, caseCreateEditTemplate } from '@casejs/angular-library'
import { postulantDefinition } from '../../resources/postulant/postulant.definition';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent extends CaseCreateEditComponent implements OnInit {
  isOnboarding = environment.isOnboarding
  val:FormGroup = new FormGroup({})
  definition: ResourceDefinition = postulantDefinition
  fields: Field[] = [
    {
      label: 'Nom',
      property: 'name',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'Prenom',
      property: 'prenom',
      required: true,
      inputType: InputType.Text
    },
    {
      label: 'Age',
      property: 'age',
      required: true,
      inputType: InputType.Number
    },
    {
      label: 'Sexe',
      property: 'sexe',
      required: true,
      selectOptions: [
        {
          label : 'Masculin',
          value : 'Masculin'
        },
        {
          label : 'Feminin',
          value : 'Feminin'
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
      label: 'Github',
      property: 'github',
      required: false,
      inputType: InputType.Text
    },
    {
      label: 'Compétences',
      property: 'competences',
      selectOptions: [{
        label: 'Label 1',
        value: 'Value 1',
      }, {
        label: 'Label 2',
        value: 'Value 2'
      }
      ],
      required: true,
      inputType: InputType.MultiSelect
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
    flashMessageService: FlashMessageService
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
    this.initCreateEditView().then((data)=>{
      //console.log(data)
      this.val=data
      data.valueChanges.subscribe((dat)=>{
        console.log(dat)
        if(data.valid){
          console.log("Zehahahha")
        }
      })
    })
    console.log(this.fields[3])
    /* this.submitSuccessful.subscribe(()=>{
      console.log('Done');
    }) */
  }
}
