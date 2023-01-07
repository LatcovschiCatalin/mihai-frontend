import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyDetailsComponent} from "./company-details/company-details.component";

const routes: Routes = [
  {
    path: '',
    component: CompanyDetailsComponent,
    data: {name: 'Company Details'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDetailsRoutingModule {
}
