import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title)
  }

  showSuccessWithTimeout(message, title, timespan) {
    this.toastr.success(message, title, {
      timeOut: timespan
    })
  }

  showSuccessHTML(message, title) {
    this.toastr.success(message, title, {
      enableHtml: true
    })
  }

  showError(message, title) {
    this.toastr.error(message, title)
  }

  showErrorWithTimeout(message, title, timespan) {
    this.toastr.error(message, title, {
      timeOut: timespan
    })
  }

  showErrorHTMLWithTimeout(message, title, timespan) {
    this.toastr.error(message, title, {
      enableHtml: true,
      timeOut: timespan
    })
  }

  showErrorCenter(message, title) {
    this.toastr.error(message, title, {
      enableHtml: true,
      positionClass: 'toast-center-center',
    });
  }

  showInfo(message, title) {
    this.toastr.info(message, title)
  }

  showInfoWithTimeout(message, title, timespan) {
    this.toastr.info(message, title, {
      enableHtml: true,
      timeOut: timespan
    })
  }

  showInfoCenter(message, title) {
    this.toastr.info(message, title, {
      enableHtml: true,
      positionClass: 'toast-center-center',
    });
  }

  showWarning(message, title) {
    this.toastr.warning(message, title)
  }

  showWarningWithTimeout(message, title, timespan) {
    this.toastr.warning(message, title, {
      timeOut: timespan
    })
  }

  showFullWidthBottom(message, title) {
    this.toastr.info(message, title, {
      enableHtml: true,
      positionClass: 'toast-bottom-full-width',
    });
  }
}