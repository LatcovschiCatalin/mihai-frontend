import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CustomFileUploadService} from "./custom-file-upload.service";
import {environment} from "../../../../../environments/environment";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

class fileSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-custom-file-upload',
  templateUrl: './custom-file-upload.component.html',
  styleUrls: ['./custom-file-upload.component.scss']
})
export class CustomFileUploadComponent implements OnInit, OnDestroy {
  @Output() getFile = new EventEmitter<any>();
  @Input() uploadConfig;
  selectedFile: fileSnippet;
  fileUrl;
  name;
  observables: Subscription[] = [];
  json;
  fileToUpload: File;
  userId;
  attachments: object[] = []

  constructor(private fileService: CustomFileUploadService, private domSanitizer: DomSanitizer) {
  }


  ngOnInit() {
    this.fileUrl = environment.google_cloud_file_url + this.uploadConfig.url;
  }

  processFile(fileInput: any, e) {

    for (let i = 0; i < fileInput.files.length; i++) {
      const file: File = fileInput.files[i];
      const reader = new FileReader();
      this.name = file?.name;
      if (this.uploadConfig.multiple) {

        this.selectedFile = new fileSnippet(e.target.result, file);
        // this.getFile.emit({files: this.attachments});
      } else {
        reader.addEventListener('load', (event: any) => {
          this.selectedFile = new fileSnippet(event.target.result, file);

          this.fileUrl = this.domSanitizer.bypassSecurityTrustUrl(this.selectedFile.src);
          this.getFile.emit({selectedFile: this.selectedFile, json: [], name: this.name});

        });
        reader.readAsDataURL(file)
      }
    }
  }


  deleteFile() {
    this.fileUrl = '';
    this.getFile.emit({selectedFile: this.selectedFile, json: [], name: ''})
  }

  deleteSelectedFile(name) {
    this.attachments = this.attachments.filter(el => (
      el['fileName'] !== name
    ))
    this.getFile.emit({files: this.attachments});
  }

  ngOnDestroy() {
    this.observables.forEach(obs => {
      obs.unsubscribe();
    })
  }
}
