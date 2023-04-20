import { Route } from '@angular/router'

import { AuthGuard, PermissionGuard, ResourceMode  } from '@casejs/angular-library'

import { NiveauCreateEditComponent } from './niveau-create-edit/niveau-create-edit.component'
import { NiveauListComponent } from './niveau-list/niveau-list.component'
import { NiveauDetailComponent } from './niveau-detail/niveau-detail.component'
import { niveauDefinition } from './niveau.definition'

export const niveauRoutes: Route[] = [
  {
    path: 'niveaus',
    component: NiveauListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'browseNiveaus'
    }
  },
  {
    path: 'niveaus/create',
    component: NiveauCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Create,
      permission: 'addNiveaus'
    },
  },
  {
    path: 'niveaus/:id/edit',
    component: NiveauCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Edit,
      permission: 'editNiveaus'
    },
  },
]

if(niveauDefinition.hasDetailPage) {
  niveauRoutes.push(
    {
      path: 'niveaus/:id',
      component: NiveauDetailComponent,
      canActivate: [AuthGuard, PermissionGuard],
      data: {
        permission: 'readNiveaus'
      }
    }
  )
}
