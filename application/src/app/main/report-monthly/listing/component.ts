// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// ===================================================================>> Third Library
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

// ===================================================================>> Custom Library
import { Service } from '../service';
import { CreateDialogComponent } from './create/component'; 
import { EditDialogComponent } from './edit/component'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    
  public key:string           = '';
  public type:number          = 0; 
  public types:any[]          = []; 
  public data:any[]           = [];
  public total: number        = 10;
  limit: number               = 10;
  page: number                = 1;
  public isSearching:boolean  = false; 

  constructor(

      private _service: Service,
      private _snackBar: MatSnackBar,
      private _dialog: MatDialog,

  ){}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void
  {
    this.listing();       
  }

  openCreateForm():void {

    const dialogRef = this._dialog.open(CreateDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      
      if(result){
          
        this.listing();
      }
        
    });

  }

  openEditForm(row:any = null):void {
    console.log(row);

    const dialogRef = this._dialog.open(EditDialogComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      
      if(result){
          
        row.name = result.name;
        row.phone = result.phone;
        row.address = result.address;
        row.created_at = result.created_at;
        row.updated_at = result.updated_at;

      }
        
    });

  }

  listing() {
      
    this.isSearching = true;
    
    this._service.listing().subscribe(res => {
    
      
      this.isSearching = false; 
      this.data = res;
      this.total = res.total;
      this.page = res.current_page;
      this.limit = res.per_page;
    })
      
  }

  onPageChanged(event) {
    if (event && event.pageSize) {
      this.limit = event.pageSize;
      this.page = event.pageIndex + 1;

      let params: any = {
        limit: this.limit,
        page: this.page,
      }

      this._service.listing().subscribe(res => {
        this.isSearching = false;
        this.data = res.data;
        this.total = res.total;
        this.page = res.current_page;
        this.limit = res.per_page;
      });
    }
  }

}

