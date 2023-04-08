import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingDialogService } from '../../shared/services/loading-dialog.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  numberOfRequests = 0;
  constructor(private loadingDialogService: LoadingDialogService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.numberOfRequests++;
    this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      finalize(() => {
        if (--this.numberOfRequests === 0)
          this.loadingDialogService.hideDialog();
      })
    ) as Observable<HttpEvent<unknown>>;
  }
}
