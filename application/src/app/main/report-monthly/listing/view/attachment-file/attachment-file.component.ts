import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FunctionService } from '../../../../../helper/function.service';
import { Service } from '../../../service';
@Component({
    selector: 'attachment-file',
    templateUrl: './attachment-file.component.html',   
    styleUrls:['../../style.scss'],
})

export class AttachmentFileComponent implements OnInit {
    public mode:any;
    public isLoading: Boolean = false;
    public isSearching:boolean = false; 
    public isSaving:boolean = false; 
    public src: string = 'assets/mlm/person-placeholder.jpg'; 
     
    public form: FormGroup;
    public name:string = "";
    @Input() data:any = {};


    /** end template for table column */

    constructor(

        private _activatedRoute: ActivatedRoute, 
        private _snackBar: MatSnackBar,
        public fs: FunctionService,
        private _service: Service,

    ) { }

    ngOnInit() {
        // console.log(this.data);
        this._buildForm();
        
    }

    save(){

        if(this.form.valid){
        
          this.isSaving = true; 
          this._service.uploadAttachment(this.data.id).subscribe( 
            // ========================>> HTTP Success Response 200
            (res: any) =>{ 
              this.isSaving = false; 
              this._snackBar.open(res.message, 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
    
            },  
    
            // ========================>> HTTP Error Response
            err => {  
              this.isSaving = false; 
              this._snackBar.open('Please try again.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
            }
          );
        }else{
          this._snackBar.open('Please check your input.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
        }
    
      }

    srcChange(src, i){
      this.form.get('url').setValue(src); 
    }

    private _buildForm() {
    
        // console.log(this.data);
        
        this.form   = new FormGroup({
          url:              new FormControl('', [ Validators.required ]),
          description:      new FormControl(''),
         
        });
    
    }

}


