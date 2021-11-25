import { Component, OnInit } from "@angular/core";
import { EndpointServiceService } from "../endpoint-service.service";
import { HttpServiceService } from "../http-service.service";

@Component({
    selector:'app-get-marksheet',
    templateUrl:'get-marksheet.component.html'
})
export class GetMarksheetComponent implements OnInit{
    flag: boolean;
    ngOnInit() {
    }
    constructor(private httpService : HttpServiceService,private endpoint : EndpointServiceService){

    }
    public form={
        error:false,
        message:null,
        data:{},
        searchParams : {},
        inputerror : {}
    }
    submit(){
        var _self = this;
        this.flag = false;
        this.httpService.post(_self.endpoint.MARKSHEET+"/getMarksheet",this.form,function(res){
            if(res.success){
                _self.flag = true;
                _self.form.data = res.result;
            }else {
                _self.flag = false;
                _self.form.error=true;
                _self.form.inputerror = res.inputerror
                
            }

        })
    }
    result(physics,maths,chemistry){
        if((physics+maths+chemistry)/3>=35.0 && physics >=35 && maths >=35 && chemistry >=35 ){
          return true;
        } else {
          return false;
        }
      }
    populateForm(form,data){
        
    }
    reset(){
        this.form.data = {}
        this.form.searchParams={};
        this.flag = false;
        this.form.error=false;
        this.form.message=null;
        
    }
    
}