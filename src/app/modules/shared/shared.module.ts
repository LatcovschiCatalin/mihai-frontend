import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderService} from "./loader/loader.service";
import {CustomFormComponent} from './custom-form/custom-form.component';
import {CustomFormService} from "./custom-form/custom-form.service";


@NgModule({
  declarations: [
    LoaderComponent,
    CustomFormComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  providers: [LoaderService, CustomFormService]
})
export class SharedModule {
}
