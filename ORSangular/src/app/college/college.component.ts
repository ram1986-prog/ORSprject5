import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent extends BaseCtl {

  constructor(public serviceLocator:ServiceLocatorService,public route:ActivatedRoute) {
    super(serviceLocator.endpoints.COLLEGE,serviceLocator,route );
  }
  validate() {
    return this.validateForm(this.form.data);
  }

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.name);
    flag = flag && validator.isNotNullObject(form.address);
    flag = flag && validator.isNotNullObject(form.city);
    flag = flag && validator.isNotNullObject(form.state);
    flag = flag && validator.isNotNullObject(form.phoneNo);
    return flag;
  }


  populateForm(form,data){
    form.id=data.id
    form.name=data.name
    form.address=data.address
    form.city=data.city
    form.state=data.state
    form.phoneNo =data.phoneNo
  }
  cancel(){
    this.forward('/dashboard')
  }
  
}
