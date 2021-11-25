import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent extends BaseListCtl {
  flag: boolean;
  

  constructor(public serviceLocator: ServiceLocatorService,public route:ActivatedRoute) {
    super(serviceLocator.endpoints.USER,serviceLocator,route);
  }

  populateForm(form,searchParams){
    form.firstName = searchParams.firstName;
  
    form.login = searchParams.login;
    
    form.roleId = searchParams.roleId;
  }

 
  
  //  search(){
    
  //     this.form.data.pageSize=5;
  //   super.search();
  //   }
  //Modify later for image
//  search() {
//     var _self = this;
//     _self.populateForm(_self.form.data,_self.form.searchParams)
//     _self.form.searchParams["pageNo"] = _self.form.data.pageNo;
//     _self.form.searchParams["pageSize"] = _self.form.data;
//     //console.log("Search Form", _self.form.searchParams);
//     this.serviceLocator.httpService.post(_self.api.search, _self.form.searchParams, function (res) {

//       if (res.success) {
//         _self.form.list = res.result.data;
//         _self.form.pageNo = res.result.pageNo;
//         _self.form.pageSize = res.result.pageSize;
//         _self.form.count = res.result.count;
//         _self.form.searchParams = res.result.searchParams;
        
//         if (_self.form.count == 0) {
//           console.log("gardad------------------------------")
//           _self.form.message = "No record found";
//           _self.form.error = true;
//         }
//         //console.log("List Size", _self.form.count,"Page No",_self.form.pageNo,"page Size",_self.form.pageSize,"count",_self.form.count);
//       } else {
//         _self.form.error = false;
//         }
      
//       console.log("form ----------------------"+_self.form.message);
//     });
//   }


}