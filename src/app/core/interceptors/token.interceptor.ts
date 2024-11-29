import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IHttpError } from '../models/http-error-model';
import { CommonService } from '../../shared/services/common/common.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const commonService = inject(CommonService); // Inject CommonService dynamically
  const token = commonService.getAccessToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return next(req).pipe(
    retry(3), // Retry failed requests up to 3 times
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMsg = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
      }
      console.error(errorMsg);

      const err: IHttpError = {
        ...error.error,
      };
      return throwError(() => err); // Wrap error for re-throwing
    })
  );
};
