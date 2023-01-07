import {Component} from '@angular/core';
import {CompanyDetailsPopupComponent} from "./company-details-popup/company-details-popup.component";
import {QueryParamsService} from "../../../services/query-params.service";
import {CompanyDetailsService} from "../company-details.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent {
  popup = CompanyDetailsPopupComponent;
  columns = [
    {
      key: '_id',
      name: 'Id',
    },
    {
      key: 'name',
      name: 'Company Name',
    },
    {
      key: 'tel',
      name: 'Phone',
    },
    {
      key: 'email',
      name: 'Gmail',
    },
  ];
  actions = [
    {
      key: 'edit',
      icon: '/assets/icons/edit.png'
    },
    {
      key: 'delete',
      icon: '/assets/icons/trash.png'
    }
  ]

  constructor(
    public qpService: QueryParamsService,
    public service: CompanyDetailsService
  ) {
  }

  ngOnInit() {
    this.qpService.deleteParam('id');
  }
}
