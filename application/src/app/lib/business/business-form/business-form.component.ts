import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { UserService as Service } from '../business.service';
import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;
// Import Helper function 
import { FunctionService } from '../../../../app/helper/function.service';

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

export interface Customer {
    kh_name: string;
}

import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'business-form-lib',
  templateUrl: './business-form.component.html',
  providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],

})

export class BusinessFormComponent implements OnInit {
    customers: Customer[] = [];
    filteredCustomer: Observable<Customer[]>;
    // declar bussiness type
    bussiness_types:any = [];
    public provinces :any =[];
    public districts :any =[];
    public communes :any =[];
    public villages :any =[];
    //public customers:any = [];
    public form: FormGroup;
    public validationData:any; 
    public src: string = "assets/mpwt/idcard.png"; 
    public minDate: Date;
    public maxDate: Date;
    isLoading:boolean = false;
    @Input() data:any = {};
    @Input() action:string = "CREATE";
    TypeControl: FormControl = new FormControl();
    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private snackBar: MatSnackBar,
        public fs: FunctionService
    ) { 
    }

    ngOnInit(): void {
        this.listingBussiness();
        this.listingProvinces();
        this.listingCustomers();
        let x = this.validatorService.getFormValidator("create-user"); 
        this.form = this._formBuilder.group({
            owner_id        : [this.data ? this.data.owner_id : '',[] ],
            owner           : ['',[Validators.required] ],
            type_id        : [this.data ? this.data.type_id : '',[Validators.required] ],
            kh_name        : [this.data ? this.data.kh_name : '',[Validators.required, Validators.maxLength(60)] ],
            en_name        : [this.data ? this.data.en_name : '',[Validators.required, Validators.maxLength(60)] ],
            patien_number  : [this.data ? this.data.patien_number : '',[Validators.required, Validators.minLength(6), Validators.maxLength(13)] ],
            tax_number     : [this.data ? this.data.tax_number : '',[Validators.minLength(6), Validators.maxLength(13)] ],
            province : [this.data ? this.data.province_id : '', Validators.required],
            district : [this.data ? this.data.district_id : '', Validators.required],
            commune : [this.data ? this.data.commune_id : '', Validators.required],
            place_id : [this.data ? this.data.place_id : '', Validators.required],
            image       : [this.data ? this.data.image : ''],
        });
        if(this.data){
          this.src = this.fs.imgUrl(this.data.url);
          this.form.get('type_id').setValue(parseInt(this.data.type_id));
          let province_id = {'value': this.data.province_id};
          this.districtFillter(province_id);
          let district_id = {'value': this.data.district_id};
          this.communeFillter(district_id);
          let commune_id = {'value': this.data.commune_id};
          this.villageFillter(commune_id);
          this.form.get('owner').setValue(this.data.owner);
          this.displayFn(this.data.owner);
        }
    }

    /**
     * Get staff list
    */
    listingBussiness() {
        this.service.listingBussiness().subscribe(res => {
            this.bussiness_types = res;
        });
    }

    /**
     * Provinces
     */
    listingProvinces() {
        this.service.listingProvinces().subscribe(res => {
            this.provinces = res;
        });
    }

    /**
     * Customers
     */
    listingCustomers() {
        this.service.customers({'pangination': 'no'}).subscribe(res => {
            this.customers = res;
            this.filteredCustomer= this.form.controls.owner.valueChanges
            .pipe(
              startWith(''),
              map(val => this._filterCustomer(val))
            );
        });
    }
   
    displayFn(row: Customer): string {
        return row && row.kh_name ? row.kh_name : '';
    }

    private _filterCustomer(id: string): Customer[] {
        const filterValue = id;
        return this.customers.filter(option => option.kh_name.indexOf(filterValue) === 0);
    }


    submit(){
        if(this.form.valid){
          this.isLoading = true;
          this.form.get('owner_id').setValue(this.form.get('owner').value['id']); 
            this.service.action(this.action, this.data ? this.data.id : '',this.form.value).subscribe(res => {
              this.isLoading = false;
              this.snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
              // this.route.navigate([`businesses`]);
            }, err => {
                this.isLoading = false;
                for(let key in err.error.errors){
                  let control = this.form.get(key);
                  control.setErrors({'servererror':true});
                  control.errors.servererror = err.error.errors[key][0];
                }
            });
        }else{
          this.snackBar.open('សូមបំពេញព័ត៌មានឪ្យបានត្រឹមត្រូវ', 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000,  panelClass: ['red-snackbar']});
        }
        
    }

    srcChange(src){
       this.form.get('image').setValue(src); 
    }

    districtFillter($event){
        if(this.provinces.length == 0){
          this.service.provinces().subscribe(res => {
              this.provinces = res;
              this.provinces.forEach(el =>{
            
                if( el.province_id == $event.value ){
                  if('districts' in el){
                    this.districts = el.districts; 
                      // this.communes = []; 
                      // this.villages = []; 
                   
                  }else{
                    this.service.locationFillter({ province: $event.value}).subscribe(res =>{
                      el.districts = res; 
          
                      this.districts = res; 
                        // this.communes = []; 
                        // this.villages = []; 
                      
                    })
                  }
                  
                }
          
              });
          });
        }
  
          this.provinces.forEach(el =>{
            
            if( el.province_id == $event.value ){
              if('districts' in el){
                this.districts = el.districts; 
                  this.communes = []; 
                  this.villages = []; 
               
              }else{
                this.service.locationFillter({ province: $event.value}).subscribe(res =>{
                  el.districts = res; 
      
                  this.districts = res; 
                    this.communes = []; 
                    this.villages = []; 
                  
                })
              }
              
            }
      
          });
    }
  
  
    communeFillter($event){
  
          let districts = this.districts; 
          let communes = []; 
  
          if(districts.length == 0 ){
            this.service.locationFillter({ district: $event.value}).subscribe(res =>{
      
              // el.communes = res; 
              communes = res; 
  
              this.communes = communes;
              // this.villages = [];
              
            })
          }
        
          districts.forEach(el =>{
            if( el.code == $event.value ){
              
              if('communes' in el){
                communes = el.communes; 
      
                this.communes = communes;
                  this.villages = [];
               
              }else{
                this.service.locationFillter({ district: $event.value}).subscribe(res =>{
      
                  el.communes = res; 
                  communes = res; 
      
                  this.communes = communes;
                  this.villages = [];
                  
                })
              }
              
            }
      
          });
         
    }
  
    villageFillter($event){
          //this.locationData.commune = $event.value;
          let communes = this.communes; 
          let villages = []; 
  
          if(communes.length == 0){
            this.service.locationFillter({ commune: $event.value}).subscribe(res =>{
      
              // el.villages = res; 
              this.villages = res;
  
            })
          }
  
          let i = 0; 
          this.communes.forEach(el =>{
      
            if( el.code == $event.value ){
              if('villages' in el){
      
                villages = el.villages; 
                this.villages = villages;
      
              }else{
                this.service.locationFillter({ commune: $event.value}).subscribe(res =>{
      
                  el.villages = res; 
                  this.villages = res;
      
                })
              }
            }
      
        
          });
      
         
    }

    updateData(data:any){

        this.data = data; 
  
        // this.src = this.fs.imgUrl(data.image);
        // this.form.get('kh_name').setValue(data.kh_name); 
        // this.form.get('en_name').setValue(data.en_name); 
        // this.form.get('sex').setValue(data.sex); 
        // this.form.get('occupation').setValue(data.occupation); 
        // this.form.get('date_of_birth').setValue(data.date_of_birth); 
        // this.form.get('document_type_id').setValue(data.document_type_id);
        // this.form.get('document_number').setValue(data.document_number);
  
        // this.form.get('nationality_id').setValue(data.nationality_id); 
        // this.form.get('nationality').setValue(data.nationality_id);
        // this.form.get('document_number').setValue(data.document_number);
        // this.form.get('phone').setValue(data.phone); 
        // this.form.get('email').setValue(data.email);
        // this.form.get('province').setValue(data.province_id);
        // this.form.get('district').setValue(data.district_id); 
        // this.form.get('commune').setValue(data.commune_id);
        // this.form.get('place_id').setValue(data.place_id);
        // this.form.get('address').setValue(data.address);
  
    }
}


