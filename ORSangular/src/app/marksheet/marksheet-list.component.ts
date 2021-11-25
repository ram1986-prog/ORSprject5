import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseListCtl } from "../base-list.component";
import { ServiceLocatorService } from "../service-locator.service";

@Component({
    selector:'app-marksheet-list',
    templateUrl:'marksheet-list.component.html',
})
export class MarksheetListComponent extends BaseListCtl{
    constructor(public serviceLocator: ServiceLocatorService,public route:ActivatedRoute) {
        super(serviceLocator.endpoints.MARKSHEET,serviceLocator,route);

      }
      
      populateForm(form,searchParams){
        form.firstName = searchParams.firstName;
        
        form.rollNo =searchParams.rollNo;
        
      }
      result(physics,maths,chemistry){
        if((physics+maths+chemistry)/3>=35.0 && physics >=35 && maths >=35 && chemistry >=35 ){
          return true;
        } else {
          return false;
        }
      }
      percentage(physics,maths,chemistry){
        var per = 0.00;
        per = (physics+chemistry+maths)/3

      }
      
}