import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment'; 
import { duration } from 'moment';
import * as CryptoJS from 'crypto-js';
import { UserService } from '../../shared/services/index';
import { AuthGuard } from '../auth.guard';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public isLoading: Boolean = false; 
    public form: FormGroup;


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
        private _authService: AuthService,
        private route: Router, 
        private _snackBar: MatSnackBar,
        private guard: AuthGuard, 
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


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if(localStorage.getItem('temp-token')){
            this.route.navigate(['my-profile']);
        }
        let x = this.validatorService.getFormValidator("create-customer"); 
        this._buildForm();
        // this.form = this._formBuilder.group({

        //     username  : ['', Validators.required, Validators.pattern('(^[0][0-9].{7}$)|(^[0][0-9].{8}$)')],
        //     password  : ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)]
        // });
    }

    // tslint:disable-next-line:typedef
    onLogin() {

        // localStorage.setItem('temp-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODg5MS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTYzNzAzMjYxOCwiZXhwIjoxNjM5NjI0NjE4LCJuYmYiOjE2MzcwMzI2MTgsImp0aSI6IlFtejdFNzFZT3lkcVMzbkYifQ.QorJUViLnptq5r2oIrfusPaKtCiHGd1fw8uM3D7tsRc');
        // localStorage.setItem('name', 'admin');
        // localStorage.setItem('avatar', 'avatar');

        this.isLoading = true; 
        let body = this.loginForm.value;
        body.type = 'office';

        this._authService.login(body).subscribe(res => {
            localStorage.setItem('temp-token', res.token);
            localStorage.setItem('name', res.user.name);
            localStorage.setItem('avatar', res.user.avatar);

            localStorage.setItem('role', res.role);
            localStorage.setItem('type_id', res.type_id);
            let encPassword = 'U821I@()';
            let Encytext = CryptoJS.AES.encrypt(JSON.stringify(res.permissions), encPassword.trim());
            localStorage.setItem('permisions', Encytext);

           
            // localStorage.setItem('userStep', CryptoJS.AES.encrypt(JSON.stringify(res.step), encPassword.trim()));
            // localStorage.setItem('userAction', CryptoJS.AES.encrypt(JSON.stringify(res.action), encPassword.trim()));

            this._userService.send(res); 

           
            this.isLoading = false; 
            this._snackBar.open(res.message, 'Close', {duration: 2500, panelClass: ['green-bg']});

            // if(res.role_id == 41){
            //     this.route.navigateByUrl('/reports/daily-report');
            // }else{
            //     this.route.navigateByUrl('/transactions/list');
            // }
            this.route.navigateByUrl('/my-profile');

        }, err => {
            this.isLoading = false; 
            this._snackBar.open(err.error.message, 'Close', {duration: 2500, panelClass: ['red-bg']});
        });
    }

    /**
     * Build from
     */
    // tslint:disable-next-line:typedef
    private _buildForm() {
        this.loginForm = new FormGroup({
            phone: new FormControl( '', [ Validators.required, Validators.pattern('^[0]{1}[1-9]{1}[0-9]{7,8}$') ]),
            password: new FormControl( '', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ])
        });
    }
}
