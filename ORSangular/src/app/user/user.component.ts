// import { Component, OnInit } from '@angular/core';
// import { BaseCtl } from '../base.component';
// import { ServiceLocatorService } from '../service-locator.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent extends BaseCtl {

//   constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
//     super(locator.endpoints.USER, locator, route);
//   }

//   validateForm(form) {
//     let flag = true;
//     let validator = this.serviceLocator.dataValidator;
//     flag = flag && validator.isNotNullObject(form.firstName);
//     flag = flag && validator.isNotNullObject(form.lastName);
//     flag = flag && validator.isNotNullObject(form.loginId);
//     flag = flag && validator.isNotNullObject(form.password);
//     return flag;
//   }

//   populateForm(form, data) {
//     form.id = data.id;
//     form.firstName = data.firstName;
//     form.lastName = data.lastName;
//     form.email  = data.email;
//     form.loginId = data.loginId;
//     form.password = data.password;
//     form.gender = data.gender;
//     form.alternateMobile = data.alternateMobile;
//     form.roleId = data.roleId;
//     form.status = data.status;
//     console.log('Populated Form', form);
//   }

//   test(){
  
//   }

// }
import { Component, OnInit } from '@angular/core';
import { BaseCtl } from 'src/app/base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseCtl {
  uploadId = 0;
  getKey = false;
  selected = null;
  fileToUpload: File = null;
  userForm: FormGroup = null;
  uploadForm: FormGroup;
  constructor(public serviceLocator: ServiceLocatorService, public route: ActivatedRoute, public httpClient: HttpClient) {
    super(serviceLocator.endpoints.USER, serviceLocator, route);
  }
  validateForm(form) {
        let flag = true;
        let validator = this.serviceLocator.dataValidator;
        flag = flag && validator.isNotNullObject(form.firstName);
        flag = flag && validator.isNotNullObject(form.lastName);
        flag = flag && validator.isNotNullObject(form.loginId);
        flag = flag && validator.isNotNullObject(form.password);
        return flag;
      }

  populateForm(form, data) {
    form.id = data.id;
    form.firstName = data.firstName;
    form.lastName = data.lastName;
    form.login = data.login;
    form.password = data.password;
    form.gender = data.gender;
    form.mobileNo = data.mobileNo;
    form.dob = data.dob;
    form.status = data.status;
    form.roleId = data.roleId;
  }

  submit() {
    var _self = this;

    this.serviceLocator.httpService.post(this.api.save, this.form.data, function (res) {
      _self.form.message = null;
      _self.form.inputerror = {};

      if (res.success) {

        _self.uploadId = res.result;
        if (_self.fileToUpload!=null) {
           _self.myFile();
       }
        _self.form.error = false;

        _self.form.message = "Data is saved";
        _self.forward('/user/'+res.result)
      } else {
        _self.form.error = true;
        _self.form.inputerror = res.result.inputerror;
        _self.form.message = res.result.message;

      }
      //console.log('FORM', _self.form);
    });
  }
  myFile() {
    console.log(this.form.data.id + 'after super.submit-----');
    this.onSubmitProfile(this.fileToUpload, this.userForm).subscribe(data => {
      console.log(this.fileToUpload);
    }, error => {
      console.log(error);
    });

  }
  onSubmitProfile(fileToUpload: File, userform: FormGroup) {
    const formData = new FormData();

    var _self = this;
    formData.append('pic', fileToUpload);
    console.log(this.uploadId + 'this id number ======');
    return this.httpClient.post("http://localhost:8080/User/profilePic/" + this.uploadId, formData, { withCredentials: true });
  }
  onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);

  }

  onUpload(userform: FormData) {
    this.submit();
    console.log(this.form.data.id + '---- after submit');

  }
  cancel() {
    this.forward('/userlist')
  }
}

