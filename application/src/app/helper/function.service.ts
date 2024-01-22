import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
import { environment as env } from '../../environments/environment';
@Injectable()
export class FunctionService{
    
    checkPermission(permission){
        if (permission == 'allow' ) {
            return true;
        }
        let permissions = localStorage.getItem('permisions');
        if(permissions){
            let decPassword = 'U821I@()';
            permissions  = CryptoJS.AES.decrypt(permissions.trim(), decPassword.trim()).toString(CryptoJS.enc.Utf8);
            console.log(permissions);
            const  array_permissions = JSON.parse(permissions);
    
            for (var i = 0; i < array_permissions.length; i++) {
                if (array_permissions[i] == permission ) {
                    return true;
                }
            }
            return false;
        }else{
            return false;
        }
       
        
    }

    imgUrl(str){
        if(str){
            return env.fileUrl+'v2/'+ str;
        }else{
            return 'assets/mpwt/patin.png'
        }
    }

    

   
}
