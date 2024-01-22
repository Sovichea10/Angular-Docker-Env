import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { SampleComponent } from './main/sample/sample.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  //{ path: '', component: SampleComponent },
  //{ path: 'sample', component: SampleComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthGuard]
  },
  // {
  //   path: 'staff',
  //   loadChildren: () => import('./main/staff/staff.module').then(m => m.StaffModule),
  //   canLoad: [AuthGuard]
  // },
  
  // {
  //   path: 'transactions',
  //   loadChildren: () => import('./main/operation/operation.module').then(m => m.OperationModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'services',
  //   loadChildren: () => import('./main/service/service.module').then(m => m.ServiceModule),
  //   canLoad: [AuthGuard]
  // },
  // {
  //   path: 'police-station',
  //   loadChildren: () => import('./main/location-service/location-service.module').then(m => m.LocationServiceModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'setup',
  //   loadChildren: () => import('./main/setup/setup.module').then(m => m.SetupModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'customers',
  //   loadChildren: () => import('./main/customer/customer.module').then(m => m.CustomerModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'businesses',
  //   loadChildren: () => import('./main/business/business.module').then(m => m.BusinessModule),
  //   canLoad: [AuthGuard]
  // },

  {
    path: 'my-profile',
    loadChildren: () => import('./main/my-profile/my-profile.module').then(m => m.MyProfileModule),
    canLoad: [AuthGuard]
  },

  // {
  //   path: 'users',
  //   loadChildren: () => import('./main/user/user.module').then(m => m.UserModule),
  //   canLoad: [AuthGuard]
  // },

  {
    path: 'reports',
    loadChildren: () => import('./main/report/report.module').then(m => m.ReportModule),
    canLoad: [AuthGuard]
  },

  {
    path: 'report-monthly',
    loadChildren: () => import('./main/report-monthly/module').then(m => m.Module),
    canLoad: [AuthGuard]
  },

  // {
  //   path: 'about-app',
  //   loadChildren: () => import('./main/about-app/about-app.module').then(m => m.AboutAppModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'contact',
  //   loadChildren: () => import('./main/contact/main.module').then(m => m.ContactModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'feedback',
  //   loadChildren: () => import('./main/feedback/main.module').then(m => m.FeedbackModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'driver-request-point',
  //   loadChildren: () => import('./main/driver-request-point/main.module').then(m => m.DriverRequestPointModule),
  //   canLoad: [AuthGuard]
  // },
  // {
  //   path: 'driver-request-point-search',
  //   loadChildren: () => import('./main/driver-request-point/main.module').then(m => m.DriverRequestPointModule),
  //   canLoad: [AuthGuard]
  // },

  // {
  //   path: 'rules',
  //   loadChildren: () => import('./main/rule/main.module').then(m => m.RuleMainModule),
  //   canLoad: [AuthGuard]
  // },

  {
    path: 'function',
    loadChildren: () => import('./search-financial-report/search-financial-report.module').then(m => m.SearchFinancialReportModule),
    canLoad: [AuthGuard]
  },

  {
    path: '**',
    loadChildren: () => import('./main/my-profile/my-profile.module').then(m => m.MyProfileModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true}
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }