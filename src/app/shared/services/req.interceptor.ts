import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const serverUrl = environment.endpoint;
    request = request.clone({
      url: `${serverUrl}${request.url}`,
      setHeaders: {
        'x-rapidapi-host': environment.host,
        'x-rapidapi-key': environment.apiKey,
      },
    });

    return next.handle(request).pipe(
      catchError((response) => {
        if ([500, 499].includes(response.status)) {
          alert(
            response?.error ? response.error.message : 'Internal Server Error!'
          );
        }
        return throwError(response);
      })
    ) as Observable<HttpEvent<unknown>>;
  }
}
