import {NgModule, Pipe} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderService} from "./loader/loader.service";
import {CustomFormComponent} from './custom-form/custom-form.component';
import {CustomFormService} from "./custom-form/custom-form.service";
import {AdminSharedModule} from "../admin/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    LoaderComponent,
    CustomFormComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AdminSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    PipesModule
  ],
  exports: [
    CustomFormComponent
  ],
  providers: [LoaderService, CustomFormService]
})
export class SharedModule {
}
