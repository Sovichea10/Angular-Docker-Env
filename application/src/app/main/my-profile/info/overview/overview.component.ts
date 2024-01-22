import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Service as ServiceCls } from '../../my-profile';
import { MyProfileService as Service } from '../../my-profile.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FunctionService } from '../../../../../app/helper/function.service';
@Component({
    // selector: 'service-list',
    selector: 'overview',
    templateUrl: './overview.component.html',   
})

export class OverviewComponent implements OnInit, AfterViewInit {
    public mode:any;
    public isLoading: Boolean = false;
    public form: FormGroup;
    public src: string = "assets/mpwt/person-placeholder.jpg"; 
    @Input() data; 

    /** end template for table column */

    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        public fs: FunctionService
    ) { }

    ngOnInit() {

        // console.log(this.data)
        this._buildForm();
        if(this.data){
            this.src = this.data.avatar;
        }
        
    }

    ngAfterViewInit() {
    }

    submit(){
        if(this.form.valid){
            this.isLoading = true;
            const data = new FormData();
            data.append('name', this.form.get('name').value);
            data.append('phone', this.form.get('phone').value);
            data.append('gender', this.form.get('gender').value);
            data.append('officer_id', this.form.get('officer_id').value);
            data.append('national_id', this.form.get('national_id').value);
            data.append('position', this.form.get('position').value);
            data.append('title', this.form.get('title').value);
            data.append('avatar', this.form.get('avatar').value);
            this.service.updateUser(this.form.value).subscribe(res => {
                this.isLoading = false;
                localStorage.setItem('name', res.user.name);
                localStorage.setItem('avatar', res.user.avatar);
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
            }, 
            err => {
                this.isLoading = false;
                // console.log(err); 
                // ================= sever error
                const errors = JSON.parse(err._body).errors;
                for(let key in errors){
                  let control = this.form.get(key);
                  control.setErrors({'servererror':true});
                  control.errors.servererror = errors[key][0];
                } 
                // console.log(err.error.message);
            });
        }else{
            //console.log(this.form.valid); 
        }
        
    }

    srcChange(src, i){
        this.form.get('avatar').setValue(src); 
    }

    private _buildForm() {
        this.form = new FormGroup({
            name: new FormControl(this.data.name, [ Validators.required,]),
            phone: new FormControl(this.data.phone, [ Validators.required, Validators.pattern('(^[0][0-9].{7}$)|(^[0][0-9].{8}$)|(^[855][0-9].{9}$)|(^[855][0-9].{10}$)|(.+@.+\..+)') ]),
            gender: new FormControl(this.data.gender, [ ]),
            officer_id: new FormControl(this.data.officer_id, [ ]),
            national_id: new FormControl(this.data.national_id, [ ]),
            position: new FormControl(this.data.position, [ ]),
            title: new FormControl(this.data.title, [ ]),
            avatar: new FormControl(this.data.avatar, [ ]),
        });
    }
}


