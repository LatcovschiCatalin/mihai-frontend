import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CustomFormService} from "./custom-form.service";
import {Subscription} from "rxjs";
import {CustomFileUploadService} from "../../admin/shared/custom-file-upload/custom-file-upload.service";
import {FileStorageService} from "../../../services/file-storage.service";

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomFormComponent implements OnInit, OnDestroy {
  @Output() onClose = new EventEmitter;
  @Output() fileName = new EventEmitter;
  @Input() formConfig;

  customForm: FormGroup;
  show = true;
  id;
  data;
  response;
  selectedFile;
  observables: Subscription[] = [];
  multipleFiles: object[] = [];

  constructor(private route: ActivatedRoute, public customFormService: CustomFormService, private fileService: CustomFileUploadService, private fileStorageService: FileStorageService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((p: any) => {
      if (p.id) {
        this.id = p.id;
        this.formConfig?.service.getById(p.id).subscribe((data) => {
          this.data = data;
          this.setData();
        })
      }
    });
    this.setData();
  }

  setControls() {
    this.globalVariables();
    this.customForm = this.customFormService.setControls()
  }

  setData() {
    this.globalVariables();
    this.setControls();
  }

  globalVariables() {
    this.customFormService.setGlobalVariables(this.formConfig?.service, this.customForm, this.formConfig?.additionalData, this.id, this.formConfig?.formData, this.onClose, this.data);
  }

  upload(fieldName, e, multiple) {
    this.show = true;
    if (multiple) {
      this.multipleFiles = e.files;
      let finalFiles = this.multipleFiles.map(el => ({
        fileUrl: el['fileUrl'],
        fileName: el['fileName'],
        type: el['type'],
      }))
      this.customForm?.controls[fieldName].setValue(finalFiles);

    } else {
      this.selectedFile = e?.selectedFile;
      this.customForm?.controls[fieldName].setValue(e.name ? this.formConfig.gcloud_path + e?.name : '');
      this.fileName.emit(e?.name)
    }
  }

  checkBoxValue(fieldName, e) {
    this.customForm?.controls[fieldName].setValue(e.checked);
  }

  onSubmit() {
    this.globalVariables();
    this.show = this.customFormService.submit();
    if (this.show) {
      this.fileStorageService.fileStorage(this.formConfig.gcloud_path, this.formConfig.multiple, this.formConfig.multiple ? this.multipleFiles : this.selectedFile, this.formConfig.src)
      this.customForm = this.customFormService.setControls()
      this.globalVariables();
      this.show = false;
    }
  }

  ngOnDestroy() {
    this.observables.forEach(obs => {
      obs.unsubscribe();
    })
  }
}
