import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomFileUploadComponent} from './custom-file-upload/custom-file-upload.component';
import {CustomTableComponent} from './custom-table/custom-table.component';
import {QuillEditorComponent} from './quill-editor/quill-editor.component';
import {CustomFileUploadService} from "./custom-file-upload/custom-file-upload.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    CustomFileUploadComponent,
    CustomTableComponent,
    QuillEditorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [CustomFileUploadService]
})
export class SharedModule {
}
