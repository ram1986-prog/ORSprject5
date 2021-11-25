import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseListCtl } from "../base-list.component";
import { ServiceLocatorService } from "../service-locator.service";

@Component({
    selector:'app-faculty-list',
    templateUrl:'faculty-list.component.html',
})
export class FacultyListComponent extends BaseListCtl{
    constructor(public serviceLocator: ServiceLocatorService,public route:ActivatedRoute) {
        super(serviceLocator.endpoints.FACULTY,serviceLocator,route);
      
      }
      validate() {
        return this.validateForm(this.form.data);
      }
    
      validateForm(form) {
        let flag = true;
        let validator = this.serviceLocator.dataValidator;
        flag = flag && validator.isNotNullObject(form.firstName);
        flag = flag && validator.isNotNullObject(form.emailId);
        flag = flag && validator.isNotNullObject(form.collegeId);
        return flag;
      }
      populateForm(form,searchParams){
        form.firstName = searchParams.firstName;
        form.emailId = searchParams.emailId;
        form.collegeId = searchParams.collegeId;
        
      }
}

