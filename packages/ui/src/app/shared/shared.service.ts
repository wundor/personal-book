import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class SharedService {
  handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) {
      this.notification.create(
        'warning',
        'Error!',
        `An error occured: ${error.error.message}`,
      );
    } else {
      this.notification.create(
        'error',
        'Error!',
        `API returned code ${error.status} with message ${error.error.message}`,
      );
    }
    return throwError('Something bad happened; please try again later.');
  };

  constructor(private notification: NzNotificationService) {}
}
