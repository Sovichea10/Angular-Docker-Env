import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { UserService as Service } from '../user.service';
import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';
import { TableColumnInfo } from 'app/shared/table/table.component';
import {MatDialog} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { AddLocationDialogComponent } from './location-service/add-location-dialog.component';

@Component({
    selector: 'user-tab',
    templateUrl: './user-tab.component.html',
    providers: [MyDateAdapter, MyDateProvider]

})
export class UserTabComponent implements OnInit {

    hidePassword: Boolean = true;

    public isShowBusiness: Boolean = false;
    public isLoading: Boolean = false;
    public form: FormGroup;
    public validationData:any; 
    public src: string = "assets/mpwt/person-placeholder.jpg"; 
    public minDate: Date;
    public maxDate: Date;
    service_types:any = [];
    bussiness_types:any = [];
    @Input() data:any = {};
    @Input() action:string = "CREATE";
    @Input() setup:any = {};
    // User 
    users:any = [];
    isLoadUser:boolean = false;
    existingSteps:any = [];

    // Services 
    
    code:any = '';
    services:any = [];
    existingService:any = [];


    

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    /** start template for table column */
    @ViewChild('nameTpl', { static: true }) private nameTpl: TemplateRef<any>;
    @ViewChild('fieldTpl', { static: true }) private fieldTpl: TemplateRef<any>;
    @ViewChild('documentTpl', { static: true }) private documentTpl: TemplateRef<any>;
    @ViewChild('actionTpl', { static: true }) private actionTpl: TemplateRef<any>;

    tableColumnInfo: TableColumnInfo[];
    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) { 
    }

    ngOnInit(): void {
        this._initTableInfo(); 
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
    }

    private _initTableInfo():void {
        this.tableColumnInfo = [
            {
                key: 1,
                label: 'ឈ្មោះ',
                name: 'name',
                sortable: true,
                template: this.nameTpl
            },
            {
                key: 2,
                label: 'តម្រូវការបំពេញ',
                name: 'field',
                sortable: true,
                template: this.fieldTpl
            },
            {
                key: 3,
                label: 'តម្រូវការឯកសារ',
                name: 'document',
                sortable: true,
                template: this.documentTpl
            },
            {
                key: 4,
                label: 'សកម្មភាព',
                name: 'action',
                sortable: true,
                template: this.actionTpl
            }
            
        ];
    }

    /**
     * List User
    */
    listUser(){
        this.service.listing(this.data.id).subscribe(res=>{
           this.data.users = res;
        }); 
  }

    submit(){
        if(this.form.valid){
            this.isLoading = true;
            const data = new FormData();
            data.append('name', this.form.get('name').value);
            data.append('en_name', this.form.get('en_name').value);
            data.append('service_type', this.form.get('service_type').value);
            data.append('bussiness_type', this.form.get('bussiness_type').value);
            //data.append('has_expired', this.form.get('has_expired').value);

            this.service.action(this.action,this.form.value).subscribe(res => {
                this.dialog.closeAll();
                this.isLoading = false;
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
                this.route.navigate([`services/res.data.id`]);
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
            en_name: new FormControl(this.data ? this.data.en_name : '', [ Validators.required,Validators.maxLength(60)]),
            service_type: new FormControl(this.data ? parseInt(this.data.type_id) : '', [ Validators.required,Validators.maxLength(60)]),
            bussiness_type: new FormControl(this.data ? parseInt(this.data.business_type_id) : '', [ Validators.required,Validators.maxLength(60)]),
        });
    }
   
    
    goBack(stepper: MatStepper){
      stepper.previous();
    }
  
    goNext(stepper: MatStepper){
      stepper.next();
    }

  refreshAttachment(event){

  }

  openLocationDialog(action, row){
    const form = this.dialog.open(AddLocationDialogComponent, { data:{action:action, row:row, location_id: this.data.id, setup:this.setup} });
    form.afterClosed().subscribe(res=>{
       this.listLocation();
    });
  }

  listLocation(){
    this.service.Listlocation(this.data.id).subscribe(res=>{
        this.data.location_users = res;
    }); 
  }

   
}


