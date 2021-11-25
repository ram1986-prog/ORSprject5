import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent extends BaseCtl {
  flag: boolean;
  

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.FACULTY, locator, route);
  }


  validate() {
    return this.validateForm(this.form.data);
  }

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.name);
    flag = flag && validator.isNotNullObject(form.phoneNo);
    return flag;
  }

  populateForm(form, data) {
    form.id = data.id;
    form.firstName =data.firstName;
    form.lastName = data.lastName;
    form.emailId = data.emailId;
    form.mobileNo =data.mobileNo;
    form.collegeId = data.college;
    form.courseId =data.courseId;
    form.subjectId =data.subjectId;
    form.gender =data.gender;
    form.dob =data.dob;

    
  }
  
}
