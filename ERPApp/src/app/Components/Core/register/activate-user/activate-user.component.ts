import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public userService: UserService,
    private translate: TranslateService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const activateUser = {
        UserGuId: params.get('id')
      };
      this.userService.ActivateUser(activateUser as User).subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
        if (data) {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.ActivatedSuccess'), "", environment.timeSpanLarge);
        } else {
          this.notifyService.showErrorWithTimeout(this.translate.instant('Messages.ActivatedError'), "", environment.timeSpanLarge);
        }
      });
    });
  }
}
