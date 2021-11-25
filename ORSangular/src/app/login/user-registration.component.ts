import { formatNumber } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCtl } from "../base.component";
import { EndpointServiceService } from "../endpoint-service.service";
import { HttpServiceService } from "../http-service.service";
import { ServiceLocatorService } from "../service-locator.service";
import { LoginComponent } from "./login.component";

@Component({
    selector:'app-user-registration',
    templateUrl:'user-registration.component.html',
})
export class UserRegistrationComponent extends LoginComponent {
    
    reset() { 
        this.form.error= false,
        this.form.message= null,
         this.form.inputerror = {};
         this.form.data = {};
      }

    constructor(public router: ActivatedRoute, public endpoint: EndpointServiceService, public serviceLocator:ServiceLocatorService) {
        super(router,endpoint, serviceLocator);
      }
    ngOnInit(){

    }
    
    submit(){
        var _self = this;

        _self.serviceLocator.httpService.post(this.endpoint.AUTH+"/register",this.form.data,function(res){
            if(res.success){
                _self.form.message="User Registered Successfull please login";
            
                _self.populateForm(_self.form.data,res.result.data);
                _self.form.inputerror = res.result.inputerror;
            } else {
                _self.populateForm(_self.form.data,res.result.data);
                _self.form.inputerror= res.result.inputerror;
                console.log(_self.form.inputerror)
            }
        });

    }
    populateForm(form, data) {
        form.firstName = data.firstName;
        form.lastName = data.lastName;    
        form.login = data.login;
        form.password = data.password;
        form.gender = data.gender;
        form.mobileNo = data.mobileNo;
        form.dob = data.dob;
       
      }
}