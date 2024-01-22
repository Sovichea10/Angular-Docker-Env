import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {  MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Service as ServiceCls } from '../user';
import { UserService as Service } from '../user.service';
import { MatSort } from '@angular/material';
import { TableColumnInfo } from 'app/shared/table/table.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ConfiremDialogComponent } from '../../../shared/confirm-dialog/confirm.component';
import { CommonService } from '../../../shared/services/common.service';

@Component({
    selector: 'service-list',
    templateUrl: './user-list.component.html',   
})

export class UserListComponent implements OnInit, AfterViewInit {
    // =============>> For Searching
    public key:string = ""; 
    public isSearching:boolean = false; 
    data: any[] = [];
    total: number;
    limit: number = 50;
    page:   number = 1;
    public setup:any;
    role:number     = 0 ;
    location:number = 0 ;
    /** start template for table column */
    @ViewChild('nameTpl', { static: true }) private nameTpl: TemplateRef<any>;
    @ViewChild('contactTpl', { static: true }) private contactTpl: TemplateRef<any>;
    @ViewChild('roleTpl', { static: true }) private roleTpl: TemplateRef<any>;
    @ViewChild('actionTpl', { static: true }) private actionTpl: TemplateRef<any>;
   
    /** end template for table column */

    tableColumnInfo: TableColumnInfo[];

    constructor(
        private service: Service,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _commonService:CommonService
    ) { }

    // tslint:disable-next-line:typedef
    ngOnInit() {
        this.getQueryParams();
        this.listing(this.limit, this.page);
        this._initTableInfo(); 
        this.setupFn();
    }

    ngAfterViewInit() {
    }

    setupFn(){
        this.service.setup().subscribe(res => {
            this.setup = res;
        });
    }

    /**
     * Get user list
     */
    // tslint:disable-next-line:typedef
    listing(limit: number = 10, page: number = 1) {
        
        this.isSearching = true; 
        let x:any = {
            limit: limit,
            page: page
        }

        if(this.role != 0){
            x.role = this.role;
        }

        if(this.location != 0){
            x.location = this.location;
        }

        if(this.key != ""){
            x.key = this.key; 
        }
        this.router.navigate([`users`], { queryParams: x});

        this.service.listing(x).subscribe(res => {

            this.isSearching = false; 
            this.data = res.data;
            this.total = res.total;
            this.page  = res.current_page;
            this.limit = res.per_page;

        });
    }

    goDetail(row){
        this.router.navigate([`users/`+row.id+`/overview`]);
    }

    getQueryParams(){
        this.activatedRoute.queryParams.subscribe(params => {
            this.limit = params['limit']? params['limit'] : 50;
            this.page = params['page']? params['page'] : 1;
            this.key = params['key']? params['key'] : '';
        });
    }

    // tslint:disable-next-line:typedef
    onSort(sort: MatSort) {
        //this.listing();
    }

    onPageChanged(event) {
        if (event && event.pageSize) {
            this.limit = event.pageSize;
            this.page = event.pageIndex + 1;
            this.listing(this.limit, this.page);
        }

    }

    // tslint:disable-next-line:typedef
    console(item?) {
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
                label: 'ទំនាក់ទំនង',
                name: 'contact',
                sortable: true,
                template: this.contactTpl
            },

            {
                key: 3,
                label: 'ប៉ុស្តិ៍/តួនាទីក្នុងប្រព័ន្ធ',
                name: 'position',
                sortable: true,
                template: this.roleTpl
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

    onDelete(element:any){
        const dialogRef = this.dialog.open(ConfiremDialogComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
           
            this.service.delete(element.id).subscribe(
              (response) => {
                this.listing(this.limit, this.page);
                  this._snackBar.open(response.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
                }
              
            );
          }
        });
    }

    /**
     * search record in list table
     * @param event key text value event
     * @param _commonService service search call out to table component
     * 
     */
    searchUser(event){
        const events = (event.target).value;
        this._commonService.callOut(events);
    }

}


