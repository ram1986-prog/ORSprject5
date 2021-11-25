import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { EndpointServiceService } from "../endpoint-service.service";
import { ServiceLocatorService } from "../service-locator.service";

@Component({
    selector:'app-forget-password',
    templateUrl:'forget-password.component.html',
})
export class ForgetPasswordComponent implements OnInit {
    constructor(private serviceLocator: ServiceLocatorService, private endpoint: EndpointServiceService ) { }

  ngOnInit() {
  }
  
  public form = {
    error: false,
    message: null,
    data:{},
    inputerror: {},
    

  };

  forget(){
      var _self = this;
      this.serviceLocator.httpService.post(this.endpoint.AUTH+"/forgotPassword",this.form.data,function(res){
        if(res.success){
          _self.populateForm(this.form.data,res.result.data);
          _self.form.message=res.result.message;
          // _self.form.message=res.result.message;

        }else{
          _self.form.inputerror=_self.form.inputerror;
          _self.form.message = _self.form.message;

        }
      })
  }

  populateForm(form, data) {
    form.login = data.login;
  }
}