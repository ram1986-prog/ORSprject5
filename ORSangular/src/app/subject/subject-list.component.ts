import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseListCtl } from "../base-list.component";
import { ServiceLocatorService } from "../service-locator.service";

@Component({
    selector:'app-subject-list',
    templateUrl:"subject-list.component.html",
})
export class SubjectListComponent extends BaseListCtl{
    
    constructor(public serviceLocator: ServiceLocatorService,public route:ActivatedRoute) {
        super(serviceLocator.endpoints.SUBJECT,serviceLocator,route);
      }
      populateForm(form,searchParams){
        form.subjectName = searchParams.subjectName;
        form.courseId = searchParams.courseId;
      }
}