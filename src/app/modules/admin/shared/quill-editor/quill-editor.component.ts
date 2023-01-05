import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Editor, Toolbar} from 'ngx-editor';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent implements OnInit {
  @Input() quillConfig;
  text = false;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor() {
  }

  getFormControl() {
    if (this.quillConfig?.groupKey) {
      let formControl = this.quillConfig?.formGroup;

      this.quillConfig?.groupKey?.split('.').forEach(el => {
        formControl = formControl.controls[el];
      });
      return formControl;
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  checkBoxValue(e) {
    this.text = e.checked;
  }
}
