import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostcodeIndexComponent } from './routes/postcode-index/postcode-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search'
  },
  {
    path: 'search',
    component: PostcodeIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostcodeRoutingModule { }
