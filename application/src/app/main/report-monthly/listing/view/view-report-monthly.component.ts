//=====================================================>> Angular Core
import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'app/helper/function.service';
import { Service } from '../../service';

@Component({
    selector: 'view-report-monthly',
    templateUrl: './view-report-monthly.component.html',   
})

export class ViewReportMonthlyComponent implements OnInit {

  public data: any = null;
  public unpaid_order:any [] = [];
  public all_order:any [] = [];
  public isLoading:boolean = true; 
  public form: FormGroup;


  constructor(
    private _activatedRoute: ActivatedRoute,
    public fs: FunctionService,
    private _service: Service,

    
  ) { }

  ngOnInit() { 
    let id  = this._activatedRoute.snapshot.params['id'];      
    this.isLoading=true;
    this._service.view(id).subscribe(res => {
        this.isLoading = false; 
        this.data = res;
                
    });
  }

  
}