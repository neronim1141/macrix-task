import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ErrorDialogService } from './services/error-dialog-service';
import { LoadingDialogService } from './services/loading-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LoadingDialogComponent,
    ErrorDialogComponent,
  ],
  exports: [LoadingDialogComponent, ErrorDialogComponent],
  providers: [ErrorDialogService, LoadingDialogService],
  declarations: [],
})
export class SharedModule {}
