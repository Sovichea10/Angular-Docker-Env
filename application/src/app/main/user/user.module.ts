import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { MatSlideToggleModule} from '@angular/material'

import {
  FuseCountdownModule,
  FuseWidgetModule,
  FuseHighlightModule,
  FuseProgressBarModule,
  FuseShortcutsModule
} from '@fuse/components';
import {MatDialogModule,  } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { SharedModule } from 'app/shared/shared.module';

import { CustomerRoutingModule as RoutingModule } from './user.routing.module';
import { UserComponent as MainComponent } from './user.component';
import { UserListComponent as ListComponent } from './user-list/user-list.component';
import { UserEditComponent as EditComponent} from './user-edit/user-edit.component';
import { UserCreateComponent as CreateComponent } from './user-create/user-create.component';
import { UserFormComponent  } from './user-form/user-form.component';

//User Tap Component
import { UserTabComponent  } from './user-tab/user-tab.component';
import { LocationUserComponent  } from './user-tab/location-service/location.component';
import { AddLocationDialogComponent  } from './user-tab/location-service/add-location-dialog.component';

//NgxPagination
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

@NgModule({
  declarations: [

    MainComponent,
    ListComponent,
    EditComponent,
    CreateComponent,
    UserFormComponent,
    LocationUserComponent,
    AddLocationDialogComponent,
    UserTabComponent

  ],
  imports: [
    RoutingModule,
    TranslateModule,
    MatProgressSpinnerModule, 
 
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatSlideToggleModule,
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
    NgxPaginationModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  entryComponents: [
    AddLocationDialogComponent
  ],
  exports: [
   
  ]
})
export class UserModule { }
