import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateSetupService as Service } from '../date-setup-service/date-setup.service';
import { LoadingDialogComponent } from '../loading-dialog/loading.component';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ExcelDownloadService } from './excel-download.service';

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
  selector: 'form-search-report',
  templateUrl: './form-search-report.component.html',
  styleUrls: ['./form-search-report.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class FormSearchReportComponent implements OnInit, AfterViewInit, OnChanges {
  // ---------- Declar Varaible 
  public date_cycle: string = '';
  public isLoading: boolean = false;
  public year_froms:any;
  public year_tos:any;
  public year_from: string = '';
  public year_to: string  = '';
  public month_froms:any;
  public month_tos:any;
  public month_from: string = '';
  public month_to: string = '';
  public midMonthLists:any = [];
  public months:any = [];
  public month:string = '';
  public monthList:string = '';
  public bank:string = '';
  public from: any;
  public to: any;
  public min_from:any;
  public max_to:any;
  public pdfUrl:any;
  public pdfSrc:any;

  //----------- get data from pareant component
  @Input() profitCenters :any = [];
  @Input() companies :any = [];
  @Input() date_cycles :any = [];
  @Input() setup:any = [];
  @Input() banks:any = [];
  @Input() title:string = '';
  @Input() formReport:string = '';
  @Input() showButton:string = ''; //--- have (all,pdf,excel)
  @Input() apiUrlPdf:string = '';
  @Input() apiUrlPdfList:string = '';
  @Input() apiUrlExcel:string = '';
  @Input() token:string = '';
  @Input() system:string = '';
  @Input() profit_center:string = '';
  @Input() company:string = '';
  @Input() profit_center_admin:string = '';
  constructor(
    private service: Service,
    private dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private http: HttpClient,
    private excelDownloadService: ExcelDownloadService
  ) { 
  }

  ngOnInit(): void {
    
  } 

  ngOnChanges(){
    
  }
  
  ngAfterViewInit(){
    
  }

  dateSetupChange(){
    //=== clear all validate
      this.year_to    = '';
      this.year_from  = '';
      this.month_from = '';
      this.month_to   = '';
      this.from       = '';
      this.to         = '';
    //=== end of clear all validate

    /** In case date_cycle = Year */
    if(this.date_cycle == '1'){
      this.getYearFrom();
    }
    /** End in case date_cycle = Year */
    /** In case date_cycle = month */
      if(this.date_cycle == '2'){
        this.getMonthFrom();
      }
    /** End in case date_cycle = month */
    /** In case date_cycle = mid-month */
      if(this.date_cycle == '4'){
        this.midMonthLists = this.setup.midMonthLists;
        this.getMonths();
      }
  } 

  getYearFrom(){
      this.dialog.open(LoadingDialogComponent, { disableClose: true });
      this.service.getYearFrom({}, '').subscribe( res => {
        this.year_froms = res;
        this.dialog.closeAll();
      },err => {
        this.dialog.closeAll();
      });
  }

  getYearTo(){
    this.year_to = '';
      this.service.getYearTo({'from':this.year_from}, '').subscribe( res => {
          this.year_tos = res;
      });
  }

  getMonthFrom(){
      this.dialog.open(LoadingDialogComponent, { disableClose: true });
      this.service.getMonthFrom({}, '').subscribe( res => {
        this.month_froms = res;
        this.dialog.closeAll();
      },err => {
        this.dialog.closeAll();
      });
  }
  getMonths(){
    this.dialog.open(LoadingDialogComponent, { disableClose: true });
    this.service.getMonthFrom({}, '').subscribe( res => {
        this.months = res;
      this.dialog.closeAll();
    },err => {
      this.dialog.closeAll();
    });
  }

  getMonthTo(){
      this.month_to = '';
      this.service.getMonthTo({'from':this.month_from}, '').subscribe( res => {
          this.month_tos = res;
      });
  }

  validateToDate(){
    this.min_from = this.from;

    var contractMoment = moment(this.min_from, 'DD/MM/YYYY');
    this.max_to = moment(contractMoment).add(1, 'M').format("YYYY-MM-DD");
    this.to         = '';
  }

  listing(action){
    let from    = '';
    let to      = '';
    from = moment(this.from).format("YYYY-MM-DD"); 
    to  = moment(this.to).format("YYYY-MM-DD"); 

    if(this.date_cycle == '1'){
        this.pdfUrl = 'profit_center='+this.checkProfitCenter(this.profit_center)+'&date_cycle='+this.date_cycle+'&from='+this.year_from+'&to='+this.year_from+'&company='+this.checkNullData(this.company)+'&system='+this.checkNullData(this.system)+'&bank='+this.checkNullData(this.bank);
    }
    if(this.date_cycle == '2'){
        this.pdfUrl = 'profit_center='+this.checkProfitCenter(this.profit_center)+'&date_cycle='+this.date_cycle+'&from='+this.month_from+'&to='+this.month_from+'&company='+this.checkNullData(this.company)+'&system='+this.checkNullData(this.system)+'&bank='+this.checkNullData(this.bank);
    }
    if(this.date_cycle == '3'){
        this.pdfUrl = 'profit_center='+this.checkProfitCenter(this.profit_center)+'&date_cycle='+this.date_cycle+'&from='+from+'&to='+to+'&company='+this.checkNullData(this.company)+'&system='+this.checkNullData(this.system)+'&bank='+this.checkNullData(this.bank);
    }
    if(this.date_cycle == '4'){
      this.pdfUrl = 'profit_center='+this.checkProfitCenter(this.profit_center)+'&date_cycle='+this.date_cycle+'&month='+this.month+'&monthList='+this.monthList+'&company='+this.checkNullData(this.company)+'&system='+this.checkNullData(this.system)+'&bank='+this.checkNullData(this.bank);
    }


    if(action == 'download'){
      this.downloadExcel(this.pdfUrl);
    }else if(action == 'download-pdf'){
        this.getdownloadPdfUrl(this.pdfUrl);
    }else{
        this.getPdfUrl(this.pdfUrl);
    }
  }

  getPdfUrl(url){
    this.dialog.open(LoadingDialogComponent, { disableClose: true });
    if(!this.apiUrlPdfList){
      this.service.getReport(this.apiUrlPdf,{'url': url, 'mobile':false}, this.token).subscribe( res => {
        this.pdfSrc = this._sanitizer.bypassSecurityTrustResourceUrl(res.data.url);
        this.dialog.closeAll();
      },err => {
        this.dialog.closeAll();
      });
    }else{
      this.service.getReport(this.apiUrlPdfList,{'url': url, 'mobile':false}, this.token).subscribe( res => {
        this.pdfSrc = this._sanitizer.bypassSecurityTrustResourceUrl(res.data.url);
        this.dialog.closeAll();
      },err => {
        this.dialog.closeAll();
      });
    }
    
  }
  
  getdownloadPdfUrl(url){
    this.dialog.open(LoadingDialogComponent, { disableClose: true });
    this.service.getReport(this.apiUrlPdf,{'url': url, 'mobile':false}, this.token).subscribe( res => {
        window.open(res.data.url );
        this.dialog.closeAll();
        this.pdfSrc = '';
    },err => {
      this.dialog.closeAll();
    });
  }

  // downloadExcel(url){
  //   this.dialog.open(LoadingDialogComponent, { disableClose: true });
  //   this.service.getReport(this.apiUrlExcel,{'url': url, 'mobile':false}, this.token).subscribe( res => {
  //       window.open(res.data.url );
  //       this.dialog.closeAll();
  //       this.pdfSrc = '';
  //   },err => {
  //     this.dialog.closeAll();
  //   });
  // }

  
  downloadExcel(url) {
   


    this.dialog.open(LoadingDialogComponent, { disableClose: true });

     this.service.getReport(this.apiUrlExcel,{'url': url, 'mobile':false}, this.token).subscribe( res => {

      let excelUrl = res.data.url;
      // if(!excelUrl.startsWith('https')) excelUrl = excelUrl.replace('http', 'https')
      // console.log(excelUrl)
      this.excelDownloadService.downloadExcelFile(excelUrl)

      // this.excelDownloadService.downloadExcelFile(excelUrl)
      //   .subscribe(data => {
      //     const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //     const url = window.URL.createObjectURL(blob);
  
      //     const link = document.createElement('a');
      //     link.href = url;
         
      //     link.download = 'financial-report.xlsx';
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //   });
      

      this.dialog.closeAll();
    },err => {
      this.dialog.closeAll();
    });

      
  

  }


  checkProfitCenter(value){
    if(this.system && value == null){
      value = this.profit_center_admin;
    }
    if(!this.system && value == null){
      return '';
    }
    return value;
  }

  checkNullData(value){
    if(value == null){
      return '';
    }
    return value;
  }

  validate(){
    if(this.date_cycle){
      if(this.date_cycle == '1' && this.year_from ){
        return false;
      }
      if(this.date_cycle == '2' && this.month_from ){
        return false;
      }
      if(this.date_cycle == '3' && this.from && this.to){
        return false;
      }
      if(this.date_cycle == '4' && this.month && this.monthList){
        return false;
      }
    }
    return true;
  }

  checkValidData(array){
   let nativeIsArray = Array.isArray(array);
   if(nativeIsArray){
    if(array.length > 0){
      return true;
    }else{
      return false;
    }
   }
   return false;
  }
   
}


