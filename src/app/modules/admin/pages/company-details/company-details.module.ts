import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyDetailsRoutingModule} from './company-details-routing.module';
import {CompanyDetailsComponent} from './company-details/company-details.component';
import {CompanyDetailsPopupComponent} from './company-details/company-details-popup/company-details-popup.component';
import {CompanyDetailsService} from "./company-details.service";
import {SharedModule} from "../../../shared/shared.module";
import {AdminSharedModule} from "../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CompanyDetailsComponent,
    CompanyDetailsPopupComponent
  ],
  imports: [
    CommonModule,
    CompanyDetailsRoutingModule,
    SharedModule,
    AdminSharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CompanyDetailsService]
})
export class CompanyDetailsModule {
}
