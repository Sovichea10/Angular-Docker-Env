import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './financial-report/financial-report.component';
import { CompanyFinancialComponent } from './company-financial-report/company-financial-report.component';
import { TransferFinancialComponent } from './transfer-financial-report/transfer-financial-report.component';
import { TidReportComponent } from './tid-report/tid-report.component';
import { NonTaxReportComponent } from './nontax-report/nontax-report.component';

const authRoutes: Routes = [
    { path: 'financial-report', component: FinancialComponent },
    { path: 'company-financial-report', component: CompanyFinancialComponent },
    { path: 'transfer-financial-report', component: TransferFinancialComponent },
    { path: 'tid-report', component: TidReportComponent },
    { path: 'non-tax-report', component: NonTaxReportComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/