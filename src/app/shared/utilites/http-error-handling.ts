import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Error code ${error.status}, message: `, error.error);
  }
  return throwError(error.error);
}
