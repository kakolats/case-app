import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { caseRoutes, AuthGuard, ResourceMode } from '@casejs/angular-library'
import { HomeComponent } from './pages/home/home.component'
import { userRoutes } from './resources/user/user.routes'

import { postulantRoutes } from './resources/postulant/postulant.routes'
import { CandidatureComponent } from './pages/candidature/candidature.component'
import { DefaultLayoutComponent } from './default-layout/default-layout.component'

import { competenceRoutes } from './resources/competence/competence.routes'
const routes: Routes = [
  {
    path: 'candidature',
    component: CandidatureComponent,
    data: {
      mode: ResourceMode.Create,
      permission: 'addPostulants'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children:[{
      path: 'home',
      component:HomeComponent
      },
      ...userRoutes,
      ...postulantRoutes,
        ...competenceRoutes,
...(caseRoutes as Routes),
      
    ]
  },
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
