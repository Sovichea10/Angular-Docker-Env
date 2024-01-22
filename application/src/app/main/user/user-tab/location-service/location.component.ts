import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { UserService as Service } from '../../user.service';
import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';
import { TableColumnInfo } from 'app/shared/table/table.component';
import {MatDialog} from '@angular/material/dialog';

import { ConfiremDialogComponent } from '../../../../shared/confirm-dialog/confirm.component';
import { MatStepper } from '@angular/material/stepper';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
    selector: 'location',
    templateUrl: './location.component.html',
    providers: [MyDateAdapter, MyDateProvider]

})
export class LocationUserComponent implements OnInit {
  @Output()
  selectedStep = new EventEmitter<string>();
  displayedColumns: string[] = ['select','index', 'name','role','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

    hidePassword: Boolean = true;
    public isLoading: Boolean = false;
    public form: FormGroup;
    public validationData:any; 
    public src: string = "assets/mpwt/person-placeholder.jpg"; 
    public minDate: Date;
    public maxDate: Date;
    service_types:any = [];
    bussiness_types:any = [];
    @Input() locations:any = {};
    @Input() data:any = {};
     
    code:any = '';
    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private router: ActivatedRoute
    ) {
      this.router.paramMap.subscribe(params => {
        this.code = params.get('id');
      }) 
    }
    ngOnInit(): void {
      
       this.selectedStep.emit(this.locations);
      //  this.listlocationService();
    }
    mapData(){
      
    }

    listlocationService(){
      this.service.Listlocation(this.code).subscribe(res=>{
         this.locations = res;
      }); 
    }
    
    // change(row, i:number = -1){
    //       this.service.checkLocation(this.code,{user: row.id }).subscribe(res=>{
    //           this.locations[i].check = res.enable; 
    //           // this.selectedStep.emit(this.steps);
    //       }); 
    // }
    onDelete(element:any, i:any){
      const dialogRef = this.dialog.open(ConfiremDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
         
          this.service.deleteLocation(element.id).subscribe(
            (response) => {

              this.listlocationService();
                  this._snackBar.open(response.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
              }
          );
        }
      });
  }

}


