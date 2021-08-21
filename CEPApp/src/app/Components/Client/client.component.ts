import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientIndustry } from 'src/app/Models/client.model';
import { ClientService } from 'src/app/Services/client.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientId: number = 0;
  registerForm: FormGroup;
  formData: Client;
  isValid: boolean = true;
  clientIndustryList: ClientIndustry[];

  constructor(public clientService: ClientService, private notifyService: NotificationService,
    private formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      ClientId: [0],
      ClientName: ['', Validators.required],
      ClientCode: ['', Validators.required],
      Status: [1],
      ContactNumber: [''],
      EmailId: [''],
      Fax: [''],
      ClientIndustryId: ['', Validators.required]
    });

    if (localStorage.getItem('clientId') != null) {
      this.clientId = Number.parseInt(localStorage.getItem('clientId'));
    }
    this.GetClientIndustries();
    this.GetClientById(this.clientId);
  }

  GetClientIndustries() {
    this.clientService.GetClientIndustries().subscribe(res => {
      // console.log(res);
      this.clientIndustryList = res;
    })
  }

  GetClientById(clientId: number) {
    this.clientService.GetClientById(clientId).subscribe(res => {
      // console.log(res);
      this.formData = res;

      if (this.formData != null) {
        this.registerForm.patchValue({
          ClientId: Number(this.formData.ClientId),
          ClientName: this.formData.ClientName,
          ClientCode: this.formData.ClientCode,
          Status: this.formData.Status,
          ContactNumber: this.formData.ContactNumber,
          EmailId: this.formData.EmailId,
          Fax: this.formData.Fax,
          ClientIndustryId: this.formData.ClientIndustryId
        });
      }
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return false;
    }
    else {
      //Save the data
      this.clientService.SaveClient(this.registerForm.value).subscribe(
        res => {
          if (res == 1) {
            this.notifyService.showInfoWithTimeout("Client Info Saved successfully", "", environment.timeSpanMedium);
            this.router.navigate(['/client-list']);
          }
          else if (res == 2) {
            this.notifyService.showErrorWithTimeout("Client name already exist", "", environment.timeSpanMedium);
          }


          // this.institutionService.GetInstitutionList();
          // this.dialogRef.close();
        },
        err => {
          // if (err === "ErrorFromWebAPI")
          //   this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
          // else
          alert('save called-error');
          console.log(err);
        }
      );
    }
  }

}
