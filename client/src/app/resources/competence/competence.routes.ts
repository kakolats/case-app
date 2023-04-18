import { Route } from '@angular/router'

import { AuthGuard, PermissionGuard, ResourceMode  } from '@casejs/angular-library'

import { CompetenceCreateEditComponent } from './competence-create-edit/competence-create-edit.component'
import { CompetenceListComponent } from './competence-list/competence-list.component'
import { CompetenceDetailComponent } from './competence-detail/competence-detail.component'
import { competenceDefinition } from './competence.definition'

export const competenceRoutes: Route[] = [
  {
    path: 'competences',
    component: CompetenceListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'browseCompetences'
    }
  },
  {
    path: 'competences/create',
    component: CompetenceCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Create,
      permission: 'addCompetences'
    },
  },
  {
    path: 'competences/:id/edit',
    component: CompetenceCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Edit,
      permission: 'editCompetences'
    },
  },
]

if(competenceDefinition.hasDetailPage) {
  competenceRoutes.push(
    {
      path: 'competences/:id',
      component: CompetenceDetailComponent,
      canActivate: [AuthGuard, PermissionGuard],
      data: {
        permission: 'readCompetences'
      }
    }
  )
}
