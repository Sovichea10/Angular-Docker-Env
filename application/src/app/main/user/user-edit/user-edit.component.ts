import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { UserService as Service } from '../user.service';
import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';

import { ActivatedRoute } from '@angular/router';

@Component({
    
    templateUrl: './user-edit.component.html',
    providers: [MyDateAdapter, MyDateProvider]

})
export class UserEditComponent implements OnInit {

    hidePassword: Boolean = true;
    public setup:any;
    public id:number = 0;
    public data:any;
    public code:string = "";
    public isLoading: Boolean = false;
    public form: FormGroup;
    public validationData:any; 
    public src: string = "assets/mpwt/person-placeholder.jpg"; 
    public minDate: Date;
    public maxDate: Date;

    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        private router: ActivatedRoute, 
    ) { 
        this.router.paramMap.subscribe(params => {
            this.code = params.get('id');
          })
    }

    ngOnInit(): void {
     this.getData();
       
    }
 
    getData(){
        this.isLoading = true;
        this.service.view(this.code).subscribe(
            (response) => {
                this.isLoading = false;
                this.data = response;
            }
          );
    }

    getSetupData(val){
        this.setup = val;
    }
   
}


