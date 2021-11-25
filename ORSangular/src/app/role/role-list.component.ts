import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../base-list.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleListComponent extends BaseListCtl {
  flag: boolean;

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.ROLE, locator, route);
  }

  populateForm(form,searchParams){
        
    form.name = searchParams.name;
    form.description = searchParams.description;
  }

 select(){
     this.flag = true;
  }

}