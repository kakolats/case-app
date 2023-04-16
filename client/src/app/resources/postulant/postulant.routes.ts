import { Route } from '@angular/router'

import { AuthGuard, PermissionGuard, ResourceMode  } from '@casejs/angular-library'

import { PostulantCreateEditComponent } from './postulant-create-edit/postulant-create-edit.component'
import { PostulantListComponent } from './postulant-list/postulant-list.component'
import { PostulantDetailComponent } from './postulant-detail/postulant-detail.component'
import { postulantDefinition } from './postulant.definition'

export const postulantRoutes: Route[] = [
  {
    path: 'postulants',
    component: PostulantListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'browsePostulants'
    }
  },
  {
    path: 'postulants/create',
    component: PostulantCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Create,
      permission: 'addPostulants'
    },
  },
  {
    path: 'postulants/:id/edit',
    component: PostulantCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Edit,
      permission: 'editPostulants'
    },
  },
]

if(postulantDefinition.hasDetailPage) {
  postulantRoutes.push(
    {
      path: 'postulants/:id',
      component: PostulantDetailComponent,
      canActivate: [AuthGuard, PermissionGuard],
      data: {
        permission: 'readPostulants'
      }
    }
  )
}
