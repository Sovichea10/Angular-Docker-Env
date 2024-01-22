import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { ReportService as Service } from '../report.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { LoadingDialogComponent } from '../../../shared/loading-dialog/loading.component';
import { locale as localeKh } from 'app/navigation/i18n/kh';
const moment = _moment;

export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
@Component({
    selector: 'non-tax',
    templateUrl: './list.component.html', 
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],  
})

export class NonTaxComponent implements OnInit {
    
    public from:any; 
    public to:any; 
    public src:any = false; 
    public isLoading:boolean = false;
    public token: string = 'bearer '+localStorage.getItem('temp-token');
    public public_service_groups:any = [];
    public levels:any = [];
    public profitCenters:any = [];
    public provinces:any = [];
    public serviceTypes:any = [];
    public public_service_type: string = '';
    public date_cycles:any;
    public date_cycle: string = '';
    public year_froms:any;
    public year_tos:any;
    public year_from: string = '';
    public year_to: string  = '';
    public month_froms:any;
    public month_tos:any;
    public month_from: string = '';
    public month_to: string = '';
    public setup: any;
    public public_service_group_code: string = '';
    public systemCode : any = [];
    public level: string = '';
    public profit_center: string = '';
    public province: string = '';
    public files:any;
    public isMobile:string = 'false';
    public pdfSrc:any;
    public pdfUrl:any;
    public localeKh:any;
    constructor(
        private service: Service,
        private dialog: MatDialog,
        
    ) { 
      this.localeKh = localeKh;
    }

    ngOnInit() {
      this.getDateSetupCycle();
      this.getSetup();
    }
  
    getSetup(){
      this.dialog.open(LoadingDialogComponent, { disableClose: true });
      this.service.getSetup().subscribe(res => {
        this.setup = res;
        this.public_service_groups = res.public_service_groups;
        this.levels = res.levels;
        this.profitCenters = res.profitCenters;
        this.provinces = res.provinces;
        this.serviceTypes = res.service_types;
        this.dialog.closeAll();
      },err => {
        this.dialog.closeAll();
      });
    }
  
    getDateSetupCycle(){
      this.service.getDateCycle({}).subscribe( res => {
          this.date_cycles = res;
      });
    }

    
}


