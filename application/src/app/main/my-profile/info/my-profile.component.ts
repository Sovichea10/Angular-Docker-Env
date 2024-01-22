import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Service as ServiceCls } from '../my-profile';
import { MyProfileService as Service } from '../my-profile.service';
import { MatSort } from '@angular/material';
import { TableColumnInfo } from 'app/shared/table/table.component';
import { Router } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'service-list',
    templateUrl: './my-profile.component.html',   
})

export class MyProfileComponent implements OnInit, AfterViewInit {


    public data: any = null;
    public isSearching:boolean = false; 

    /** end template for table column */

    tableColumnInfo: TableColumnInfo[];

    constructor(
        private service: Service
    ) { }

    ngOnInit() {

      
       
      this.getData()
  
    }

    ngAfterViewInit() {
    }

    getData() {
      this.isSearching = true; 
      this.service.viewProfile().subscribe( 
        // ======================>> Response Success 200
        res =>{
          this.isSearching = false;  
          this.data = res.data; 
        }, 
        // ====================>> Response Error
        err => {
          
        }
  
      );
    }
}


