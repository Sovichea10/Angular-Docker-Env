import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthRoutingModule } from './search-financial-report-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
// Import Pdf View 
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FinancialComponent } from './financial-report/financial-report.component';
import { CompanyFinancialComponent } from './company-financial-report/company-financial-report.component';
import { TransferFinancialComponent } from './transfer-financial-report/transfer-financial-report.component';
import { TidReportComponent } from './tid-report/tid-report.component';
import { NonTaxReportComponent } from './nontax-report/nontax-report.component';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
    declarations: [
        FinancialComponent,
        CompanyFinancialComponent,
        TransferFinancialComponent,
        TidReportComponent,
        NonTaxReportComponent
    ],
    imports: [
        MatProgressSpinnerModule, 
        MatProgressBarModule, 
        MatSnackBarModule, 
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        SharedModule,
        AuthRoutingModule,
        MatSelectModule,
        MatDatepickerModule,
        PdfViewerModule
    ]
})

export class SearchFinancialReportModule {
}
