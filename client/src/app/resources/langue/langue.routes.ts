import { Route } from '@angular/router'

import { AuthGuard, PermissionGuard, ResourceMode  } from '@casejs/angular-library'

import { LangueCreateEditComponent } from './langue-create-edit/langue-create-edit.component'
import { LangueListComponent } from './langue-list/langue-list.component'
import { LangueDetailComponent } from './langue-detail/langue-detail.component'
import { langueDefinition } from './langue.definition'

export const langueRoutes: Route[] = [
  {
    path: 'langues',
    component: LangueListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'browseLangues'
    }
  },
  {
    path: 'langues/create',
    component: LangueCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Create,
      permission: 'addLangues'
    },
  },
  {
    path: 'langues/:id/edit',
    component: LangueCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Edit,
      permission: 'editLangues'
    },
  },
]

if(langueDefinition.hasDetailPage) {
  langueRoutes.push(
    {
      path: 'langues/:id',
      component: LangueDetailComponent,
      canActivate: [AuthGuard, PermissionGuard],
      data: {
        permission: 'readLangues'
      }
    }
  )
}
