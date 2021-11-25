import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent extends BaseCtl {

  constructor(public serviceLocator:ServiceLocatorService,public route:ActivatedRoute) {
    super(serviceLocator.endpoints.SUBJECT,serviceLocator,route );
  }
  cancel(){
    this.forward('/subjectlist')
  }

    populateForm(form,data){
      form.id=data.id
      form.courseId = data.courseId
      form.subjectName = data.subjectName
      form.Description = data.Description
      

    }

}
