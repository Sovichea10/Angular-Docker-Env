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
    selector: 'financial-report',
    templateUrl: './financial-report.component.html',
    styleUrls: ['./financial-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FinancialComponent implements OnInit {

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
    public profit_center_group: string = '';
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
    public profitCenter:string = '';
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
        // this.activeRouter.queryParams.subscribe(params => {
        //     this.token = params['token'];
        // });
        this.activeRouter.queryParams.subscribe(params => {
            this.tem_token = params['tem_token'];
            this.token = this.tem_token;
        });
        // this.activeRouter.queryParams.subscribe(params => {
          
        // });

        // Find Devices 
        // let ua = navigator.userAgent;
        // this.broswer = ua;
        // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        //     // $('a.mobile-other').show();
        //     // this.isMobile = 'true';
        //     this.isDownload = true;
        // }else if(/Chrome/i.test(ua)){
        //     // $('a.chrome').show();
        // }
        // else{
        //     // $('a.desktop-other').show();
        // }

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
            console.log('res', res.data.profit_center);
            this.profit_center = res.data.profit_center;
            this.profit_center_group = 'PROVINCIAL';
            this.system = res.data.system;
            this.date_cycle = '3';
            this.isAdmin = false;

            this.getSetup();
            this.getDateSetupCycle();
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

    // getSetup(){
    //     this.service.getSetupProfitCenter(this.token, this.profit_center).subscribe(res => {
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

    getDateSetupCycle(){
        this.service.getDateCycle({}, this.token).subscribe( res => {
            this.date_cycles = res;
        });
    }


}
