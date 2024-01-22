import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;

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
    selector: 'lts-date-select-field',
    templateUrl: './date-select.component.html',
    // styleUrls:['../../operation-step.component.scss'], 
    providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class DateSelectComponent implements OnInit, AfterViewInit, OnChanges {
  
  @Input() code:string = '';
  @Input() title:string = '';
  @Input() icon:string = '';
  @Input() mode:string = 'EDIT';
  @Input() userAction:any = null;
  @Input() commentColor:string = 'red';
  @Input() roleId:any = null; 
  @Output() getOutput: EventEmitter<any> = new EventEmitter();
  @Input() value:any = false; 
  @Input() comment:any = null; 
  @Input() field:string = ''; 
  @Input() from:string = ''; 

  public form: FormGroup;
  public formatValue:string = ''; 

  constructor(

    public _dialog: MatDialog,
    private _formBuilder: FormBuilder,

  ) { 
  }

  ngOnInit(): void {
    
  } 

  ngOnChanges(){
    
    //console.log(this.from, this.mode, this.title, this.value);

    this.form = this._formBuilder.group({
      control      : this.value ? this.value : ''
    });
  
    this.formatValue = moment(this.form.get('control').value ? this.form.get('control').value : moment()).format('DD-MM-YYYY'); 

    
  }
  
  ngAfterViewInit(){
    
  }

  getValue(){
    this.form.markAllAsTouched(); 

    return { valid:this.form.valid, value: moment(this.form.get('control').value).format('YYYY-MM-DD') }; 
  }


  refreshValue(value){
    //console.log(value); 
    this.form.get('control').setValue(value); 
  }

  getCommentColor(){
    if(this.comment){
      return 'orange'; 
    }else{
      return 'blue'; 
    }
  }
  
  canSeeComment(){
    let status = false;
    if(this.userAction){
      if(this.roleId == 2 ){//Data Entry
        if(this.comment && this.userAction.read_checker_feedback ){
          if(this.comment.approver_comment != '' || this.comment.checker_comment != ''){
            status = true; 
          }
          
        }
      }else{
        //console.log('Here', this.roleId); 
        if(this.userAction.read_checker_feedback || this.userAction.read_approver_feedback ){
          status = true; 
        }
      }
    }
    return status; 
  }


   
}


