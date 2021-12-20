import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PeriodService } from './period.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
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

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiReq = request.clone({
      url: `${this.baseUrl}/${request.url}`,
    });
    return next.handle(apiReq);
  }
}
