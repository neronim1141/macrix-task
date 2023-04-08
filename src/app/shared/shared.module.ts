import { NgModule } from '@angular/core';
import { TableInputComponent } from './components/table-input/table-input.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ErrorDialogService } from './services/error-dialog-service';
import { LoadingDialogService } from './services/loading-dialog.service';

const sharedComponents = [LoadingDialogComponent, ErrorDialogComponent];
@NgModule({
  declarations: sharedComponents,
  imports: [CommonModule, MaterialModule, TableInputComponent],
  exports: [TableInputComponent, LoadingDialogComponent],
  providers: [ErrorDialogService, LoadingDialogService],
  entryComponents: sharedComponents,
})
export class SharedModule {}
