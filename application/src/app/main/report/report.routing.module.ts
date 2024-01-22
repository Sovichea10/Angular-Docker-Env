import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportComponent as MainComponent } from './report.component';

import { IncentiveIncomeComponent } from './incentive-income/list.component';

import { CompanyReportComponent } from './company-report/list.component';

import { TransferIncomeComponent } from './transfer-income/list.component';

import { TidReportComponent } from './tid-report/list.component';
import { BankTidReportComponent } from './bank-tid-report/list.component';

import { NonTaxComponent } from './non-tax/list.component';


const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
         
            {
                path: 'incentive-income',
                children: [
                    { path: '', component: IncentiveIncomeComponent }
                ]
            },
            {
                path: 'company-income',
                children: [
                    { path: '', component: CompanyReportComponent }
                ]
            },
            {
                path: 'transfer-income',
                children: [
                    { path: '', component: TransferIncomeComponent }
                ]
            },
            {
                path: 'tid-report',
                children: [
                    { path: '', component: TidReportComponent }
                ]
            },
            {
                path: 'bank-tid-report',
                children: [
                    { path: '', component: BankTidReportComponent }
                ]
            },
            {
                path: 'non-tax',
                children: [
                    { path: '', component: NonTaxComponent }
                ]
            }
          
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReportRoutingModule { }
