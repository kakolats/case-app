import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { caseRoutes, AuthGuard, ResourceMode } from '@casejs/angular-library'
import { HomeComponent } from './pages/home/home.component'
import { userRoutes } from './resources/user/user.routes'

import { postulantRoutes } from './resources/postulant/postulant.routes'
import { CandidatureComponent } from './pages/candidature/candidature.component'

import { competenceRoutes } from './resources/competence/competence.routes'
import { niveauRoutes } from './resources/niveau/niveau.routes'
import { langueRoutes } from './resources/langue/langue.routes'
import { ThanksComponent } from './pages/thanks/thanks.component'
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component'

const routes: Routes = [
  {
    path: 'candidature',
    component: CandidatureComponent,
    data: {
      mode: ResourceMode.Create,
      permission: 'addPostulants',
    }
  },
  {
    path: 'thanks',
    component: ThanksComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children:[{
      path: '',
      canActivate: [AuthGuard],
      component:HomeComponent
      },
      ...userRoutes,
      ...postulantRoutes,
      ...competenceRoutes,
      ...niveauRoutes,
        ...langueRoutes,
...(caseRoutes as Routes),
      
    ]
  },
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
