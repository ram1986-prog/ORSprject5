import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseCtl } from "../base.component";
import { ServiceLocatorService } from "../service-locator.service";

@Component({
    selector:'app-change-password',
    templateUrl:'change-password.component.html',
})
export class ChangePasswordComponent extends BaseCtl {
    
    constructor(public serviceLocator: ServiceLocatorService, public route: ActivatedRoute,public httpClient: HttpClient) {
        super(serviceLocator.endpoints.USER, serviceLocator, route);
      }
    
    submit(){
        var _self = this;
        this.serviceLocator.httpService.post(this.api.endpoint+"/changePassword",this.form.data,function(res){
            if(res.success){
                _self.form.error= false;
                _self.form.message = "Password Changed successfully";
                
                
            }else {
                _self.form.inputerror =res.result.inputerror;
               // _self.form.error = true;
               // _self.form.message = "Error";
            }
        })
    }
    populateForm(form,data){
        form.oldPassword = data.oldPassword
        form.password = data.password;
        form.confirmPassword = form.confirmPassword;
    }
}