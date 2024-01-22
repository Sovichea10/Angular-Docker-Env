import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent as ListComponent } from './user-list/user-list.component';
import { UserCreateComponent as CreateComponent } from './user-create/user-create.component';
import { UserComponent as MainComponent } from './user.component';
import { UserEditComponent as EditComponent} from './user-edit/user-edit.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', component: ListComponent },
                    { path: 'create', component: CreateComponent },
                    { path: ':id/overview', component: EditComponent },

                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomerRoutingModule { }
