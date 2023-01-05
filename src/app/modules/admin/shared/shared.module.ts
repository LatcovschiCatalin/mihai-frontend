import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomFileUploadComponent} from './custom-file-upload/custom-file-upload.component';
import {CustomTableComponent} from './custom-table/custom-table.component';
import {QuillEditorComponent} from './quill-editor/quill-editor.component';
import {CustomFileUploadService} from "./custom-file-upload/custom-file-upload.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    CustomFileUploadComponent,
    CustomTableComponent,
    QuillEditorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [CustomFileUploadService]
})
export class SharedModule {
}
