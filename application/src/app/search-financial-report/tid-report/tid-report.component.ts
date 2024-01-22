import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { SFRService } from '../search-financial-report.service';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment'; 
import { duration } from 'moment';
import * as CryptoJS from 'crypto-js';
import { UserService } from '../../shared/services/index';
import { AuthGuard } from '../search-financial-report.guard';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as _moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading.component';
import { MatDialog } from '@angular/material';
const moment = _moment;
@Component({
    selector: 'tid-report',
    templateUrl: './tid-report.component.html',
    styleUrls: ['./tid-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TidReportComponent implements OnInit {

    public loginForm: FormGroup;
    public isLoading: Boolean = false; 
    public form: FormGroup;

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
    public url: string = '';

    public public_service_groups:any = [];
    public levels:any = [];
    public profitCenters:any = [];
    public provinces:any = [];
    public src: any = false;
    public setup: any;
    public from: any;
    public to: any;
    public public_service_group_code: string = '';
    public systemCode : any = [];
    public level: string = '';
    public profit_center: string = '';
    public province: string = '';

    public pdfSrc:any;
    public pdfUrl:string = '';
    public token:string = '';
    public tem_token:string = '';
    public system:string = '';
    scrHeight:any;
    scrWidth:any;
    public isMobile:string = 'false';
    public files:any;
    public cookieValue:any;
    public broswer:string = '';
    public isAdmin: Boolean = true; 
    public company:string = '';
    public company_show:string = '';
    public companies:any = [];
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _userService: UserService, 
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private validatorService: ValidatorService,
        private service: SFRService,
        private route: Router, 
        private _snackBar: MatSnackBar,
        private guard: AuthGuard, 
        private _sanitizer: DomSanitizer,
        private activeRouter: ActivatedRoute, 
        private cookieService: CookieService,
        private dialog: MatDialog,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        // this.activeRouter.queryParams.subscribe(params => {
        //     this.token = params['token'];
        // });
        this.activeRouter.queryParams.subscribe(params => {
            this.tem_token = params['tem_token'];
            this.token = this.tem_token;
        });
        // this.activeRouter.queryParams.subscribe(params => {
        //     this.profit_center = params['profitCenterCode'];
        //     this.date_cycle = '3';
        //     this.isAdmin = false;
        // });

        // Find Devices 
        let ua = navigator.userAgent;
        this.broswer = ua;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
            // $('a.mobile-other').show();
            // this.isMobile = 'true';
        }else if(/Chrome/i.test(ua)){
            // $('a.chrome').show();
        }
        else{
            // $('a.desktop-other').show();
        }

        // this.cookieService.set('Test', 'Hello World');
        // this.cookieValue = this.cookieService.get('Test');
        // console.log('cookie', this.cookieValue);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if(!this.tem_token){
            this.token = '';
        }
        if(this.tem_token){
            this.updateTemToken();
            // this.getSetup();
            // this.getDateSetupCycle();
            // this.getPdfUrl('');
            // this.getKey();
        }
        
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;
          console.log(this.scrHeight, this.scrWidth);
    }
    updateTemToken(){
        this.service.updateTemToken({'token': this.tem_token, 'broswer': this.broswer}, this.token).subscribe( res => {
            this.profit_center = res.data.profit_center;
            this.system = res.data.system;
            this.date_cycle = '3';
            this.isAdmin = false;
            this.company        = res.data.company;
            this.company_show   = res.data.company;
            this.getSetup();
            this.getDateSetupCycle();
            // this.getPdfUrl('');
            this.system = res.data.system;
            if(this.system == 'MPWT_VRDL'){
                this.companies = [
                    { name: 'KTS'},
                    { name: 'CMS'},
                ];
            }
            if(this.system == 'MPWT_VTIS'){
                this.companies = [
                    { name: 'CMVIC'},
                    { name: 'HK'},
                    { name: 'FAI'},
                ];
            }
            
        }, err => {
            console.log('err', err);
            this.token = '';
        });
    }
    getSrc(url) {
       
        this.isLoading = true;
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl(url);
        
        setTimeout(() => {
            this.isLoading = false;
        }, 2500);
        return this.src.changingThisBreaksApplicationSecurity;
    }
    checkNullData(value){
        if(value == null){
          return '';
        }
        return value;
    }
    getSetup(){
        this.service.getSetup('system='+this.checkNullData(this.system)+'&profit_center='+this.checkNullData(this.profit_center),this.token).subscribe(res => {
            this.setup = res;
            this.profitCenters = res.profitCenters;
        }, err => {
            console.log('err', err);
            this.token = '';
        });
    }

    // getSetup(){
    //     this.service.getSetup('', this.token).subscribe(res => {
    //         this.setup = res;
    //         this.public_service_groups = res.public_service_groups;
    //         this.levels = res.levels;
    //         this.profitCenters = res.profitCenters;
    //         this.provinces = res.provinces;
    //     }, err => {
    //         console.log('err', err);
    //         this.token = '';
    //     });
    // }

    getDateSetupCycle(){
        this.service.getDateCycle({}, this.token).subscribe( res => {
            this.date_cycles = res;
        });
    }

    dateSetupChange(){
        // alert(this.date_cycle);
        if(this.date_cycle == '1'){
            this.getYearFrom();
        }
        if(this.date_cycle == '2'){
            this.getMonthFrom();
        }
    }

    getYearFrom(){
        this.service.getYearFrom({},this.token).subscribe( res => {
            this.year_froms = res;
        });
    }

    getYearTo(){
        this.service.getYearTo({'from':this.year_from},this.token).subscribe( res => {
            this.year_tos = res;
        });
    }

    getMonthFrom(){
        this.service.getMonthFrom({}, this.token).subscribe( res => {
            this.month_froms = res;
        });
    }

    getMonthTo(){
        this.service.getMonthTo({'from':this.month_from}, this.token).subscribe( res => {
            this.month_tos = res;
        });
    }
    getPdfUrl(url){
        this.dialog.open(LoadingDialogComponent, { disableClose: true });
        this.service.getTidReport({'url': url, 'mobile':this.isMobile, 'tem_token':this.tem_token}, this.token).subscribe( res => {
            this.pdfSrc = res.data.url;
            this.files = res.data.files;
            this.getSrc(this.pdfSrc);
            this.dialog.closeAll();
            // this.pdfSrc = this._sanitizer.bypassSecurityTrustResourceUrl(res.data.url);
            // return this.pdfSrc.changingThisBreaksApplicationSecurity;
        });
    }

    getKey(){
        this.service.getKey({'token': this.token}, this.token).subscribe( res => {
            this.system = res.data.key;
            if(this.system == 'MPWT_VRDL'){
                this.companies = [
                    { name: 'KTS'},
                    { name: 'CMS'},
                ];
            }
            if(this.system == 'MPWT_VTIS'){
                this.companies = [
                    { name: 'CMVIC'},
                    { name: 'HK'},
                    { name: 'FAI'},
                ];
            }
        });
    }

    downloadExcel(url){
        this.dialog.open(LoadingDialogComponent, { disableClose: true });
        this.service.getTidReportExcel({'url': url, 'mobile':this.isMobile, 'tem_token':this.tem_token}, this.token).subscribe( res => {
            window.open(res.data.url );
            this.dialog.closeAll();
        });
    }

    listing(action){
        let from    = '';
        let to      = '';
    //    if(this.from || this.to){
        from = moment(this.from).format("YYYY-MM-DD"); 
        to  = moment(this.to).format("YYYY-MM-DD"); 
    
        // this.url = env.pdfUrl+'financial-reportx'+'?from='+from+'&to='+to+'&public_service_group_code='+this.public_service_group_code+'&province='+this.province+'&profit_center='+this.profit_center+'&level='+this.level;
        // console.log(this.url);

        let new_url = '';
        if(this.date_cycle == '1'){
            this.pdfUrl = 'level='+this.level+'&profit_center='+this.profit_center+'&public_service_group_code='+this.public_service_group_code+'&date_cycle='+this.date_cycle+'&from='+this.year_from+'&to='+this.year_to+'&system='+this.system+'&company='+this.company;
        }
        if(this.date_cycle == '2'){
            this.pdfUrl = 'level='+this.level+'&profit_center='+this.profit_center+'&public_service_group_code='+this.public_service_group_code+'&date_cycle='+this.date_cycle+'&from='+this.month_from+'&to='+this.month_to+'&system='+this.system+'&company='+this.company;
        }
        if(this.date_cycle == '3'){
            this.pdfUrl = 'level='+this.level+'&profit_center='+this.profit_center+'&public_service_group_code='+this.public_service_group_code+'&date_cycle='+this.date_cycle+'&from='+from+'&to='+to+'&system='+this.system+'&company='+this.company;
        }

        if(action == 'download'){
            this.downloadExcel(this.pdfUrl);
        }else{
            this.getPdfUrl(this.pdfUrl);
        }
    }

    onFileSelected() {
        let $img: any = document.querySelector('#file');
      
        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
      
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
          };
      
           reader.readAsArrayBuffer($img.files[0]);
        }
      }

      printReportPDF(){ 
        // let w = window.open('about:blank'); 
        // w.document.body.appendChild(w.document.createElement('iframe')).src = this.pdfSrc;  
        // w.document.getElementsByTagName("iframe")[0].style.width = '100%'; 
        // w.document.getElementsByTagName("iframe")[0].style.height = '100%'; 
        // w.focus(); 
        var link = document.createElement('a');
        link.href = this.pdfSrc;
        link.download = this.pdfSrc;
        link.dispatchEvent(new MouseEvent('click'));
    }
}
