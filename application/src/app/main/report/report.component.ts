import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './i18n/en';
import { locale as navigationkh} from './i18n/kh';
@Component({
  
    templateUrl: './report.component.html',
  
})
export class ReportComponent implements OnInit {

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ){
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationkh);
    }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }
}
