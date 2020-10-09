import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PostcodeService } from './services/postcode.service';
import { PostcodeRoutingModule } from './postcode-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    PostcodeRoutingModule
  ],
  providers: [
    PostcodeService
  ]
})
export class PostcodeModule { }
