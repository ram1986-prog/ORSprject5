import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent extends BaseCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.TIMETABLE, locator, route);
  }

  // validateForm(form) {
  //   let flag = true;
  //   let validator = this.serviceLocator.dataValidator;
  //   flag = flag && validator.isNotNullObject(form.firstName);
  //   flag = flag && validator.isNotNullObject(form.lastName);
  //   flag = flag && validator.isNotNullObject(form.mobileNo);
  //   return flag;
  // }

  populateForm(form, data) {
    form.id = data.id;
    form.collegeId = data.collegeId;
    form.courseId = data.courseId;
    form.subjetId = data.subjectId;
    form.semester = data.semester;
    form.examDate = data.examDate;
    form.examTime = data.examTime;
  }

  
}
