import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { UserService as Service } from '../user.service';
import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';

import { FunctionService } from '../../../../app/helper/function.service';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    providers: [MyDateAdapter, MyDateProvider]

})
export class UserFormComponent implements OnInit {
    @Output()
    emitSetupData = new EventEmitter<string>();
    hidePassword: Boolean = true;

    public mode:any;
    public isLoading: Boolean = false;
    public form: FormGroup;
    public validationData:any; 
    public src: string = "assets/mpwt/person-placeholder.jpg"; 
    public minDate: Date;
    public maxDate: Date;
    public setup: any;
    @Input() data:any = {};
    @Input() action:string = "CREATE";

    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        public fs: FunctionService
    ) { 
    }

    ngOnInit(): void {
        this._buildForm();
        this.setupFn();
    }

    setupFn(){
        this.service.setup().subscribe(res => {
            this.setup = res;
            this.emitSetupData.emit(this.setup);
        });
    }
 
    submit(){
        if(this.form.valid){

            this.isLoading = true;
            let data = this.form.value;
            if(this.data){
                data.id = this.data.id
            }
            
            console.log('frm',this.form);

            this.service.action(this.action, this.form.value).subscribe(res => {
                this.isLoading = false;
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
                this.route.navigate([`users/`+res.data.id+'/overview']);
              }, err => {
                  this.isLoading = false;
                  for(let key in err.error.errors){
                    let control = this.form.get(key);
                    control.setErrors({'servererror':true});
                    control.errors.servererror = err.error.errors[key][0];
                  }
              });
        }else{
            this._snackBar.open('សូមបំពេញព័ត៌មានឪ្យបានត្រឹមត្រូវ', 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000,  panelClass: ['red-snackbar']});
        }
        
    }

    srcChange(src){
       this.form.get('avatar').setValue(src); 
    }


    private _buildForm() {
        this.form = new FormGroup({
            name: new FormControl(this.data ? this.data.name : '', [ Validators.required,Validators.maxLength(60)]),
            role_id: new FormControl(this.data ? parseInt(this.data.role_id) : '', [ ]),
            police_station_id: new FormControl(this.data ? parseInt(this.data.police_station_id) : '', [ ]),
            phone: new FormControl(this.data ? this.data.phone :'', [ Validators.required, Validators.pattern('(^[0][0-9].{7}$)|(^[0][0-9].{8}$)|(^[855][0-9].{9}$)|(^[855][0-9].{10}$)|(.+@.+\..+)') ]),
            password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
            avatar: new FormControl('', []),
            officer_id: new FormControl( this.data ? this.data.officer_id : '', [ ]),
            national_id: new FormControl( this.data ? this.data.national_id : '', [ ]),
            position: new FormControl( this.data ? this.data.position : '', [ ]),
            title: new FormControl( this.data ? this.data.title : '', [ ]),
            is_active: new FormControl('', [ ]),
        });

        if(this.data){
            this.src = this.data.avatar;
            if(this.data.is_active == 1){
                this.form.get('is_active').setValue(true);
            }else{
                this.form.get('is_active').setValue(false);
            }
        }

        if(this.action != 'CREATE'){
            this.form.get('password').clearValidators(); 
        }
    }

   

   
   
}


