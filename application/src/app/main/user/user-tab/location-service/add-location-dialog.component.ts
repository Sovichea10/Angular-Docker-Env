import { Component, OnInit, Input, ViewChild, TemplateRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService as Service } from '../../user.service';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { subscribeOn } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
    id: number;
    name: string;
    
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, name: 'Hydrogen'},
    {id: 2, name: 'Helium'},
    {id: 3, name: 'Lithium'},
    {id: 4, name: 'Beryllium'},
    {id: 5, name: 'Boron'},
    {id: 6, name: 'Carbon'},
    {id: 7, name: 'Nitrogen'},
    {id: 8, name: 'Oxygen'},
    {id: 9, name: 'Fluorine'},
    {id: 10, name: 'Neon'},
  ];
@Component({
    templateUrl: './add-location-dialog.component.html'

})
export class AddLocationDialogComponent implements OnInit {
    displayedColumns: string[] = ['name', 'level','select'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    public setup:any = [];
    public isLoading:boolean = false;
    public showData:boolean = false;
    public form: FormGroup;
    public id:any = '';
    public permissions:any;
    public types:any = [];
    public role:any = [];
    public level:any = [];

    public locations:any = [];
    public key:string = ""; 
    public limit:any[];
    public page:any[];
    public selectedUser:any = [];

    constructor(
        public dialogRef: MatDialogRef<AddLocationDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any, 
        private service: Service,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) { 
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }
    

    ngOnInit(): void {        
        this._buildForm();
        this.listLocation();
    }
   
    private _buildForm() {
        this.form = new FormGroup({
            key: new FormControl('', [ ]),
            level: new FormControl('0', [ ]),

        });
        
    }
    listingLevel() {
        
        this.service.setup().subscribe(res => {
            this.level = res.levels;
            
        });
    }
    listLocation(limit: number = 10, page: number = 1) {
        this.isLoading = true;
          let x:any = {
              limit: limit,
              page: page
          }
  
          if(this.form.get('key').value != ""){
              x.key = this.form.get('key').value; 
          }
                 
          if(this.form.get('level').value != 0){
              x.level = this.form.get('level').value;
          }
          
          this.service.ListLocationService(this.data.location_id,x).subscribe(res => {
            this.isLoading = false;
            this.locations = res;
          },err=>{
              console.log('res location err',err);
          });
          
      }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
      }
   
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
          return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
      }
    
    submit(){
        
        let params: any = {};
            if(this.form.valid){
                this.isLoading = true;

                // Convert to array to json string
                
                let data = {
                    location: JSON.stringify(this.selection.selected)
                }
                this.service.addLocation(this.data.location_id, data).subscribe(res => {
                    this.isLoading = false;
                    this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
                   this.dialogRef.close();
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
   
}


