import { Injectable } from '@angular/core';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private  isShowMsg: any;

  constructor(
    private toasterService: ToasterService
  ) { }

  /**
   * Show error message
   */
  showError(title: string, message: string) {
    if (this.isShowMsg !== undefined) {
      this.toasterService.clear();
    }
    const toast: Toast = {
      type: 'error',
      title,
      body: `<p>${message}</p>`,
      bodyOutputType: BodyOutputType.TrustedHtml
  };
    this.isShowMsg = this.toasterService.popAsync(toast);
  }

  /**
   * Show success message
   */
  showSuccess(title: string, message: string) {
    if (this.isShowMsg !== undefined) {
      this.toasterService.clear();
    }
    this.isShowMsg = this.toasterService.popAsync('success', title, message);
  }
}
