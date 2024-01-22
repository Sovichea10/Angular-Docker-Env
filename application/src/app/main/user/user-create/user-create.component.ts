import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { UserService as Service } from '../user.service';
import { MyDateAdapter, MyDateProvider } from 'app/shared/format/date.format';



@Component({
    templateUrl: './user-create.component.html',
    providers: [MyDateAdapter, MyDateProvider]

})
export class UserCreateComponent implements OnInit {


    constructor(
       

    ) { 
    }

    ngOnInit(): void {

    }

 
    

   

   

   
   
}


