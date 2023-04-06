import { NgModule } from '@angular/core';
import { TableInputComponent } from './components/table-input/table-input.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingInterceptor } from './interceptors/http-loading.interceptor';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoadingDialogComponent } from './services/loading/loading-dialog/loading-dialog.component';
import { LoadingDialogService } from './services/loading/loading-dialog.service';

@NgModule({
  declarations: [LoadingDialogComponent],
  imports: [CommonModule, MaterialModule, TableInputComponent],
  exports: [TableInputComponent, LoadingDialogComponent],
  providers: [
    LoadingDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
  ],
  entryComponents: [LoadingDialogComponent],
})
export class SharedModule {}
