import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule, MatAutocompleteModule, MatProgressSpinnerModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {
  FuseCountdownModule,
  FuseWidgetModule,
  FuseHighlightModule,
  FuseProgressBarModule,
  FuseShortcutsModule
} from '@fuse/components';

import { ReportRoutingModule as RoutingModule } from './report.routing.module';
import { ReportComponent as MainComponent } from './report.component';
import { IncentiveIncomeComponent } from './incentive-income/list.component';
import { CustomerLibModule } from '../../lib/customer/customer.module';
/** Monthly Report */
import { TransferIncomeComponent } from './transfer-income/list.component';
/** Weekly Report */
import { CompanyReportComponent } from './company-report/list.component';

/** Semesterly Report */
import { TidReportComponent } from './tid-report/list.component';

import { BankTidReportComponent } from './bank-tid-report/list.component';

import { NonTaxComponent } from './non-tax/list.component';

// Import Pdf View 
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [

    MainComponent,
    IncentiveIncomeComponent,
    TransferIncomeComponent,
    CompanyReportComponent,
    TidReportComponent,
    NonTaxComponent,
    BankTidReportComponent

  ],
  imports: [
    RoutingModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMenuModule, 
    FuseSharedModule,
    FuseCountdownModule,
    FuseWidgetModule,
    FuseHighlightModule,
    FuseProgressBarModule,
    FuseShortcutsModule,
    MatSlideToggleModule,
    MatAutocompleteModule, 
    MatProgressSpinnerModule,
    CustomerLibModule,
    MatCardModule,
    SharedModule,
    PdfViewerModule,
    MatCheckboxModule
  ],
  exports: [
   
  ], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReportModule { }
