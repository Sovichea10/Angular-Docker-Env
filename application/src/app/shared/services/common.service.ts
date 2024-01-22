import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class CommonService {

    @Output() TextcallOut = new EventEmitter<string>();

    callOut(text:string=''){
        this.TextcallOut.emit(text);
    }

}