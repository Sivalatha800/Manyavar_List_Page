import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: ':param1',
    component: ListComponent,
    data: {
      breadcrumb: '',
    },
  },
  {
    path: ':param1/:param2',
    component: ListComponent,
    data: {
      breadcrumb: '',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
