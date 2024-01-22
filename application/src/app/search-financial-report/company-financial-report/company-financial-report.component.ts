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
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading.component';
const moment = _moment;
@Component({
    selector: 'company-financial-report',
    templateUrl: './company-financial-report.component.html',
    styleUrls: ['./company-financial-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompanyFinancialComponent implements OnInit {

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

    public pdfSrc:any = '';
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
    public company:string = '';
    public company_show:string = '';
    public companies:any = [];
    public isAdmin: Boolean = true; 
    public isDownload: Boolean = false; 
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private dialog: MatDialog,
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
        private cookieService: CookieService
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
        
        this.activeRouter.queryParams.subscribe(params => {
            this.tem_token = params['tem_token'];
            this.token = this.tem_token;
        });
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
           
            // if(this.system == 'MPWT_VRDL'){
            //     this.companies = [
            //         { name: 'KTS'},
            //         { name: 'CMS'},
            //     ];
            // }
            // if(this.system == 'MPWT_VTIS'){
            //     this.companies = [
            //         { name: 'CMVIC'},
            //         { name: 'HK'},
            //         { name: 'FAI'},
            //     ];
            // }
        }, err => {
            console.log('err', err);
            this.token = '';
        });
    }
    getSrc(url) {
       
        this.dialog.open(LoadingDialogComponent, { disableClose: true });
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl(url);
        
        setTimeout(() => {
            this.dialog.closeAll();
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
        this.service.getSetup('system='+this.checkNullData(this.system)+'&company='+this.checkNullData(this.company),this.token).subscribe(res => {
            this.setup = res;
            this.profitCenters = res.profitCenters;
            this.companies      = res.companies;
        }, err => {
            console.log('err', err);
            this.token = '';
        });
    }

    getDateSetupCycle(){
        this.service.getDateCycle({}, this.token).subscribe( res => {
            this.date_cycles = res;
        });
    }

    

    // getKey(){
    //     this.service.getKey({'token': this.token}, this.token).subscribe( res => {
    //         this.system = res.data.key;
    //         if(this.system == 'MPWT_VRDL'){
    //             this.companies = [
    //                 { name: 'KTS'},
    //                 { name: 'CMS'},
    //             ];
    //         }
    //         if(this.system == 'MPWT_VTIS'){
    //             this.companies = [
    //                 { name: 'CMVIC'},
    //                 { name: 'HK'},
    //                 { name: 'FAI'},
    //             ];
    //         }
    //     });
    // }

  
}
