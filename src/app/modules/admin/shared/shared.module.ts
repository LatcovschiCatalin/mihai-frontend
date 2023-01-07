import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule,} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CustomTableComponent} from './custom-table/custom-table.component';
import {CustomFileUploadComponent} from './custom-file-upload/custom-file-upload.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {CustomFileUploadService} from "./custom-file-upload/custom-file-upload.service";
import {MatRadioModule} from "@angular/material/radio";
import {QuillEditorComponent} from './quill-editor/quill-editor.component';
import {NgxEditorModule} from 'ngx-editor';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    PipesModule,
    NgxEditorModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  exports: [CommonModule, CustomTableComponent, CustomFileUploadComponent, QuillEditorComponent],
  declarations: [CustomTableComponent, CustomFileUploadComponent, QuillEditorComponent],
  providers: [CustomFileUploadService],
})
export class AdminSharedModule {
}
