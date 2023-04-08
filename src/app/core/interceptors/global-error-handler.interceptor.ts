import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../../shared/services/error-dialog-service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private errorDialogService: ErrorDialogService,
    private zone: NgZone
  ) {}

  handleError(error: Error) {
    this.zone.run(() =>
      this.errorDialogService.openDialog(
        error?.message || 'Undefined client error',
        error instanceof HttpErrorResponse ? error.status : undefined
      )
    );

    console.error('Error from global error handler', error);
  }
}
