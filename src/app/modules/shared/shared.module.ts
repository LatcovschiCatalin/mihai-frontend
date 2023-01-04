import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderService} from "./loader/loader.service";


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  providers: [LoaderService]
})
export class SharedModule {
}
