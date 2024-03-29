import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material';
import { PaginatorComponent } from './paginator/paginator.component';
import { DynamicFormComponent } from './form/dynamic-form.component';
import { SearchComponent } from './search/search.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { PortraitComponent } from './portrait/portrait.component';
import { PortraitDialogComponent } from './portrait/portrait.component';

import { ValidatorService } from './validator/validator.service';

import { DateSelectComponent } from './date-select/date-select.component';

import { MatTableResponsiveModule } from './mat-table-responsive/mat-table-responsive.module';
import {FormAutoCompleteComponent} from './autocomplete/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormSearchReportComponent } from './form-search-report/form-search-report.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    ImageCropperModule,
    MatTableResponsiveModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [
    TableComponent, 
    PaginatorComponent, 
    DynamicFormComponent, 
    SearchComponent, 
    PortraitComponent, 
    PortraitDialogComponent,
    FormAutoCompleteComponent,
    DateSelectComponent,
    FormSearchReportComponent    
  ],
  exports: [
    TableComponent,
    PaginatorComponent, 
    DynamicFormComponent, 
    SearchComponent,
    CommonModule, 
    FormsModule, 
    PortraitComponent,
    MatTableResponsiveModule,
    DateSelectComponent,
    FormSearchReportComponent,
    FlexLayoutModule
  ], 
  entryComponents:[PortraitDialogComponent], 
  providers:[ValidatorService],
  bootstrap: [], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }