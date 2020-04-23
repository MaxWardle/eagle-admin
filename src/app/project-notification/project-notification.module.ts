// modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ProjectNotificationRoutingModule } from './project-notification-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

// components
import { ProjectNotificationComponent } from './project-notification.component';
import { ProjectNotificationDocumentsComponent } from './documents/project-notification-documents.component';
import { PnDocumentTableRowsComponent } from './documents/project-notification-document-table-rows/project-notification-document-table-rows.component';
import { UploadComponent } from './documents/upload/upload.component';
// services
import { ApiService } from 'app/services/api';
import { ExcelService } from 'app/services/excel.service';
import { StorageService } from 'app/services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ProjectNotificationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    ProjectNotificationDocumentsComponent,
    PnDocumentTableRowsComponent,
    UploadComponent
  ],
  entryComponents: [
    ProjectNotificationComponent,
    PnDocumentTableRowsComponent,
    UploadComponent,
    ProjectNotificationComponent
  ],
  exports: [

  ],
  providers: [
    ApiService,
    ExcelService,
    StorageService
  ]
})

export class ProjectNotificationModule { }
