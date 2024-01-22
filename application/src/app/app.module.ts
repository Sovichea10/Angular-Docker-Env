import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import 'hammerjs';
import { fuseConfig } from 'app/fuse-config';

import { UserService } from './shared/services/index';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { MatTableModule, MatDialog, MatDialogModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpConfigInterceptor } from './core/httpconfig.interceptor';
import { ErrorDialogService } from './shared/error-dialog/errordialog.service';
import { StateStream, Store, NgxsModule, State } from '@ngxs/store';
import { environment } from 'environments/environment';
import { RouterModule } from '@angular/router';
import { ErrorDialogComponent } from './shared/error-dialog/errordialog.component';
import { ErrorDialogComponent as ErrorShareDialogComponent } from './main/error-dialog/errordialog.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { ConfiremDialogComponent } from './shared/confirm-dialog/confirm.component';
import { LoadingDialogComponent } from './shared/loading-dialog/loading.component';

// Import Helper 
import { FunctionService } from './helper/function.service';

// Import guird function
import { GuardService } from '@fuse/guard/guard.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterModule,
        SharedModule,
        // Material
        MatMomentDateModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        HttpClientModule,
        MatDialogModule,
        
        RouterModule,

        // App modules
        LayoutModule,
        AppRoutingModule,
        AuthModule,

        NgxsModule.forRoot([], { developmentMode: !environment.production })
    ],
    declarations: [
        AppComponent,
        ErrorDialogComponent,
        ErrorShareDialogComponent,
        PageNotFoundComponent,
        ConfiremDialogComponent,
        LoadingDialogComponent
    ],
    providers: [
        ErrorDialogService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        Store, 
        StateStream,
        FunctionService, 
        UserService,
        GuardService
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [ErrorDialogComponent, ErrorShareDialogComponent, PageNotFoundComponent, ConfiremDialogComponent, LoadingDialogComponent],
})
export class AppModule { }
