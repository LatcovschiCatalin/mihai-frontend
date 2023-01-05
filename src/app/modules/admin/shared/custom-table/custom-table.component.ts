import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {QueryParamsService} from "../../services/query-params.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CustomFormService} from "../../../shared/custom-form/custom-form.service";
import {LoaderService} from "../../../shared/loader/loader.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CustomTableComponent implements OnInit, OnDestroy {
  @Input() tableConfig;

  @Input() set columns(event) {
    this.sourceColumns = event;
    this.displayedColumns = [...this.sourceColumns?.map(el => el.key), 'actions'];
  };


  displayedColumns;
  sourceColumns;

  limit = [10, 20, 50, 100];
  limit_docs = 10;
  docs = 0;
  page = 1;
  data;
  show_sort = false;
  searchTerm = '';
  sort = '';
  order = 'ASC'
  observables: Subscription[] = [];
  width = window.innerWidth - 370;
  fieldWidth;

  constructor(public dialog: MatDialog, private loaderService: LoaderService, private qpService: QueryParamsService, private route: ActivatedRoute, public customFormService: CustomFormService) {
  }

  ngOnInit(): void {
    this.showSort(false);
    this.fieldWidth = (this.width - 126) / this.width * 100 / (this.displayedColumns.length - 1) / 100 * this.width;
    this.observables.push(this.route.queryParams.subscribe(res => {
      this.sort = res['sort'] || '';
      this.order = res['order'] || 'ASC';
      this.searchTerm = res['searchTerm'] || '';
      if (res['page']) {
        this.page = Number(res['page']);
      } else {
        this.qpService.updateParam('page', 1);
        this.page = 1;
      }

      if (res['limit']) {
        this.limit_docs = Number(res['limit']);
      } else {
        this.qpService.updateParam('limit', 10);
        this.limit_docs = 10;
      }
    }))
    this.getData();

  }

  showSort(show: boolean) {
    this.show_sort = show;
    if (!this.show_sort) {
      this.qpService.deleteParams({'sort': null, 'order': null});
      this.sort = 'createdAt';
      this.order = 'DES';
      this.getData();
    }
  }

  sortData(sort, order?) {
    if (this.show_sort) {
      let field = '';
      let ord = '';
      this.observables.push(this.route.queryParams.subscribe(res => {
        field = res['sort'] || '';
        ord = res['order'] === 'ASC' && field === sort ? 'DES' : 'ASC';
      }));
      ord = order ? order : ord;
      this.qpService.updateParams({sort: sort, order: ord});
      this.sort = sort;
      this.order = ord;
      this.getData();
    }
  }

  search() {
    this.qpService.updateParam('searchTerm', this.searchTerm);
    this.getData();
  }

  getData() {
    this.tableConfig?.service.get({
      page: this.page,
      limit: this.limit_docs,
      sort: this.sort,
      order: this.order,
      searchTerm: this.searchTerm
    }).subscribe((data) => {
      this.docs = data.totalDocs;
      this.qpService.updateParam('totalItems', this.docs);
      this.data = data?.docs || [];
    });
  }

  onDelete(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.tableConfig?.service.deleteById(id).subscribe(() => {
        this.getData();
      });
    }
  }

  onPaginateChange(e) {
    if (e.pageSize !== this.limit_docs) {
      this.limit_docs = e.pageSize;
      this.qpService.updateParam('limit', this.limit_docs);
    } else if (e.pageIndex + 1 !== this.page) {
      this.page = Number(e.pageIndex) + 1;
      this.qpService.updateParam('page', this.page);
    }
    this.getData();
  }

  onAction(key, id?) {
    if (key.toLowerCase() === 'delete') {
      this.onDelete(id);
    } else if (key.toLowerCase() === 'edit' || key.toLowerCase() === 'get') {
      this.qpService.updateParam('id', id);
      const dialogRef = this.dialog.open(this.tableConfig?.popup, {
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.qpService.deleteParam('id');
        this.getData();
      });
    }
  }


  ngOnDestroy() {
    this.observables.forEach(obs => {
      obs.unsubscribe();
    })
  }
}
