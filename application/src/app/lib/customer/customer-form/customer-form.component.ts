import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { ServiceService as Service } from '../customer.service';
// Import Helper function 
import { FunctionService } from '../../../../app/helper/function.service';

import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
export interface Nationality {
    description_in_khmer: string;
    id: string;
}

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;

import { MatSnackBar} from '@angular/material';

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
    selector: 'customer-form-lib',
    templateUrl: './customer-form.component.html',
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],

})
export class CustomerFormComponent implements OnInit {

    nationalities: Nationality[] = [];
    filteredNationality: Observable<Nationality[]>;

    public form: FormGroup;
    public validationData:any; 
    public src: string = "assets/mpwt/person-placeholder.jpg"; 
    public minDate: Date;
    public maxDate: Date;
    public ValidatorKhname:any; 
    public documentNumberLabel: string = " អត្តសញ្ញាណបណ្ណ "; 
    public provinces :any =[];
    public districts :any =[];
    public communes :any =[];
    public villages :any =[];
    public owner_document_types :any =[];
    isLoading:boolean = false;
    
    @Input() data:any;
    @Input() action:string = "CREATE";
    @Input() showActionButton:boolean = false;

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
      
      this.getNationalities();
      this.getProvinces();
      this.getOwnerDocumentType();

      this.form = this._formBuilder.group({

          kh_name     : [this.data ? this.data.kh_name : 'Khouch Koeun', [Validators.required,  Validators.maxLength(150)] ],
          en_name     : [this.data ? this.data.en_name : 'Khouch Koeun',  [Validators.required,  Validators.maxLength(150)]​ ],
          sex         : [ this.data ? this.data.sex : 'Male', Validators.required],
          occupation  : [this.data ? this.data.occupation : 'Student',  [Validators.required,  Validators.maxLength(150)]],
          image       : [this.data ? this.data.image : ''],

          document_type_id      : [this.data ? this.data.document_type_id : 1, Validators.required],
          document_number             : [this.data ? this.data.document_number : 1, Validators.required],

          date_of_birth       : [ this.data ? this.data.date_of_birth :'1991-12-06', Validators.required],
          nationality_id      : [this.data ? this.data.nationality_id : '', Validators.required],
          nationality      : [this.data ? this.data.nationality_id : ''],
          phone : [ this.data ? this.data.phone : '098777733', [ Validators.required, Validators.pattern('^[0]{1}[1-9]{1}[0-9]{7,8}$') ]],
          email : [this.data ? this.data.email : 'khh@gmail.com'],
          province : [this.data ? this.data.province_id : '', Validators.required],
          district : [this.data ? this.data.district_id : '', Validators.required],
          commune : [this.data ? this.data.commune_id : '', Validators.required],
          place_id : [this.data ? this.data.place_id : '', Validators.required],
          address   : [this.data ? this.data.address : ''], 

      });

      this.form.get('document_type_id').valueChanges.subscribe(res => {
          this.documentNumberLabel = res == 1 ? ' អត្តសញ្ញាណបណ្ណ ' : ' លិខិតឆ្លងដែន '; 
      });

      if(this.data){
        
        this.src = this.fs.imgUrl(this.data.image);
        this.form.get('document_type_id').setValue(parseInt(this.data.document_type_id));
        let province_id = {'value': this.data.province_id};
        this.districtFillter(province_id);
        let district_id = {'value': this.data.district_id};
        this.communeFillter(district_id);
        let commune_id = {'value': this.data.commune_id};
        this.villageFillter(commune_id);
        this.form.get('nationality_id').setValue(this.data.nationality);
        this.displayNationalityFn(this.data.nationality);
      }
        
       
    }

    getProvinces(){
        this.service.provinces().subscribe(res => {
            this.provinces = res;
        });
    }

    getOwnerDocumentType(){
      this.service.ownerDocmentTypes().subscribe(res => {
        this.owner_document_types = res.owner_types;

        this.getViewData();   
    });
    }

    getNationalities(){
        // this.service.nationalities().subscribe(res => {
        //     this.nationalities = res;
        // });
        this.service.nationalities().subscribe(res => {
            this.nationalities = res;
            this.filteredNationality = this.form.controls.nationality_id.valueChanges
            .pipe(
              startWith(''),
              map(val => this._filterNationality(val))
            );
            this.getViewnationality();
        });

        
    }

    displayNationalityFn(row: Nationality): string {
        return row && row.description_in_khmer ? row.description_in_khmer : '';
    }

    private _filterNationality(id: string): Nationality[] {
        const filterValue = id;
        return this.nationalities.filter(option => option.description_in_khmer.indexOf(filterValue) === 0);
    }
 
    submit(){
        if(this.form.valid){
          this.isLoading = true;
          this.form.get('date_of_birth').setValue(moment(this.form.get('date_of_birth').value).format("YYYY-MM-DD")); 
          this.form.get('nationality').setValue(this.form.get('nationality_id').value['id']); 
            this.service.action(this.action, this.data ? this.data.id : '',this.form.value).subscribe(res => {
              this.isLoading = false;
              this.snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
             
              this.route.navigate([`customers/`+res.data.id+'/overview']);
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

      this.src = this.fs.imgUrl(data.image);
      this.form.get('kh_name').setValue(data.kh_name); 
      this.form.get('en_name').setValue(data.en_name); 
      this.form.get('sex').setValue(data.sex); 
      this.form.get('occupation').setValue(data.occupation); 
      this.form.get('date_of_birth').setValue(data.date_of_birth); 
      this.form.get('document_type_id').setValue(data.document_type_id);
      this.form.get('document_number').setValue(data.document_number);

      this.form.get('nationality_id').setValue(data.nationality_id); 
      this.form.get('nationality').setValue(data.nationality_id);
      this.form.get('document_number').setValue(data.document_number);
      this.form.get('phone').setValue(data.phone); 
      this.form.get('email').setValue(data.email);
      this.form.get('province').setValue(data.province_id);
      this.form.get('district').setValue(data.district_id); 
      this.form.get('commune').setValue(data.commune_id);
      this.form.get('place_id').setValue(data.place_id);
      this.form.get('address').setValue(data.address);

    }

    // =======================
    public documentTypeStr:string = ''; 

    getViewData(){

      if(this.data){
        this.owner_document_types.forEach(el => {
          if(this.form.get('document_type_id').value == el.id){
            this.documentTypeStr  = el.name_kh; 
          }

        });
      }

    }
    // =======================
    public nationalityTypeStr:string = ''; 

    getViewnationality(){

      if(this.data){
        this.nationalities.forEach(el => {
          // if(this.form.get('nationality').value == el.id){
          //   this.nationalityTypeStr  = el.description_in_khmer; 
          // }

        });
      }

    }
   
}


