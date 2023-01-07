import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CompanyDetailsService} from "../../company-details.service";
import {phoneNumberRegex, validationMessages} from "../../../../../../constants";

@Component({
  selector: 'app-company-details-popup',
  templateUrl: './company-details-popup.component.html',
  styleUrls: ['./company-details-popup.component.scss']
})
export class CompanyDetailsPopupComponent {
  validationMessages = validationMessages;
  validators = {
    required: {
      type: 'required',
      message: validationMessages.requiredField,
    },
    phone: {
      type: 'pattern',
      message: validationMessages.invalidPhone,
      args: phoneNumberRegex
    },
    email: {
      type: 'email',
      message: validationMessages.email,
    }
  }
  request = {
    labels: [
      [
        {
          title: 'Company name',
          key: 'name',
          type: 'text',
          default: '',
          validators: [
            this.validators.required,
          ]
        },
      ],
      [
        {
          title: 'Upload your logo here!',
          key: 'logo',
          type: 'image',
          default: '',
          validators: [
            this.validators.required
          ]
        },

      ],
      [
        {
          title: 'Active',
          key: 'active',
          type: 'checkbox',
          default: false
        },
      ],
      [
        {
          title: 'Phone number',
          key: 'tel',
          type: 'text',
          default: '',
          validators: [
            this.validators.required,
            this.validators.phone
          ]
        },
      ],
      [
        {
          title: 'Email',
          key: 'email',
          type: 'text',
          default: '',
          validators: [
            this.validators.required,
            this.validators.email
          ]
        },
      ],
      [
        {
          title: 'Address',
          key: 'address',
          type: 'text',
          default: '',
          validators: [
            this.validators.required
          ]
        },
      ],
      [
        {
          title: 'Whatsapp',
          key: 'whatsapp',
          type: 'text',
          default: '',
        },
      ],
      [
        {
          title: 'Facebook',
          key: 'facebook',
          type: 'text',
          default: '',
        },
      ],
      [
        {
          title: 'Instagram',
          key: 'instagram',
          type: 'text',
          default: '',
        },
      ],

    ],
  };

  constructor(
    public service: CompanyDetailsService,
    public dialogRef: MatDialogRef<CompanyDetailsPopupComponent>
  ) {
  }


  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
