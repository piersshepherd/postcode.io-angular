import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostcodeService } from './services/postcode.service';
import { PostcodeRoutingModule } from './postcode-routing.module';
import { PostcodeIndexComponent } from './routes/postcode-index/postcode-index.component';
import { SearchComponent } from './components/search/search.component';
import { ErrorComponent } from './components/error/error.component';
import { ResultComponent } from './components/result/result.component';
import { FindNearestComponent } from './components/find-nearest/find-nearest.component';

@NgModule({
  declarations: [
    PostcodeIndexComponent,
    SearchComponent,
    ErrorComponent,
    ResultComponent,
    FindNearestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PostcodeRoutingModule
  ],
  providers: [
    PostcodeService
  ]
})
export class PostcodeModule { }
