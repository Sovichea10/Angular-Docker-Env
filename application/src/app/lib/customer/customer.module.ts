import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule, MatAutocompleteModule} from '@angular/material';

import {
  FuseCountdownModule,
  FuseWidgetModule,
  FuseHighlightModule,
  FuseProgressBarModule,
  FuseShortcutsModule
} from '@fuse/components';

import { SharedModule } from 'app/shared/shared.module';


import { CustomerFormComponent } from './customer-form/customer-form.component';
import { FormAutoCompleteComponent } from './customer-form/autocomplete';

@NgModule({
  declarations: [

    CustomerFormComponent,
    FormAutoCompleteComponent

  ],
  imports: [
 
    TranslateModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMenuModule, 

    FuseSharedModule,
    FuseCountdownModule,
    FuseWidgetModule,
    FuseHighlightModule,
    FuseProgressBarModule,
    FuseShortcutsModule,
    SharedModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  exports: [
    CustomerFormComponent
  ], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CustomerLibModule { }
