
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSystemComponent } from './user-system/user-system.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ec',
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'user-system',
        component: UserSystemComponent,
        data: {
          title: 'User System',
          breadcrumb: 'User System'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECRoutingModule { }
