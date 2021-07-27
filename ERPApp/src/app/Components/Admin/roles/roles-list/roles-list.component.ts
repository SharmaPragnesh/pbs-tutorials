import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Institution } from 'src/app/Models/institution.model';
import { PageParameter, Roles } from 'src/app/Models/roles.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { RolesService } from 'src/app/Services/roles.service';
import { environment } from 'src/environments/environment';
import { RolesComponent } from '../roles.component';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'Name';
  reverse: boolean = false;

  rolesList: Roles[] = null;
  pageParameter: PageParameter;

  constructor(private router: Router, private translate: TranslateService,
    private notifyService: NotificationService, private dialog: MatDialog, private deleteConfirmDialog: MatDialog,
    public rolesService: RolesService) { }

  ngOnInit(): void {
    this.GetFormModel();
    this.GetRolesList();

    this.config = {
      id: 'paginationUserList',
      itemsPerPage: environment.pageSize,
      currentPage: 1,
      totalItems: this.rolesList != undefined ? this.rolesList.length : 0
    };
  }

  GetFormModel() {
    if (this.pageParameter === undefined) {
      this.pageParameter = {
        Search: "",
        SortColumn: "Name",
        SortOrder: "asc",
        PageStart: 1,
        PageSize: 100
      };
    }
  }

  GetRolesList() {
    this.rolesService.RolesList(this.pageParameter).subscribe(
      res => {
        console.log(res);
        this.rolesList = res["List"];
        console.log(this.rolesList);
      },
      err => {
        console.log(err);
      }
    );
  }

  ShowStudies(institution: Institution) {
  }

  AddOrEditInstitution(RoleId: number) {
    var RolesList = this.rolesList;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";
    dialogConfig.data = { RoleId, RolesList };//passed the multiple parameter using comma (,)
    this.dialog.open(RolesComponent, dialogConfig).afterClosed().subscribe(res => {
      this.GetRolesList();
    });
  }

  DeleteConfirmDialog(institution: Institution): void {
  }

  sort(key) {
    if (this.key == key) {
      this.reverse = !this.reverse;
    }
    else {
      this.reverse = false;
    }
    this.key = key;
    if (environment.ShowConsoleLogs) {
      console.log(key);
      console.log(this.reverse);
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }


  MoveUp(index: number) {
  }

  MoveDown(index: number) {
  }

  UpdateInstitutionSorting() {
  }
}
