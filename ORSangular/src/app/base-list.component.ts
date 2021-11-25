import { OnInit } from '@angular/core';
import { ServiceLocatorService } from './service-locator.service';
import { HttpServiceService } from './http-service.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from './base.component';

export class BaseListCtl extends BaseCtl {
  flag: boolean;

  constructor(public endpoint, public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(endpoint, locator, route);
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.form.data.pageNo=0;
    this.preload();
    this.search();
  }

  display() {
    this.search();
  }

  submit() {
    this.search();
  }

  delete(id){
    super.delete(id,function(){
      this.search();
    });
  }


  next() {
    this.form.pageNo++;
    if(this.form.pageNo==0){
      this.form.pageNo=1;
    }
    this.display();
  }

  previous() {
    if (this.form.pageNo > 0) {
      this.form.pageNo--
      this.display();
    }
  }
  
  reset() {
    this.flag = false;
    this.form.data={id:'',pageNo:0}
    this.form.searchParams = {};
    this.form.error=false;
    this.form.message=null;
    this.submit()
}
    
}



