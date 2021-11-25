import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseCtl } from "../base.component";
import { ServiceLocatorService } from "../service-locator.service";
import { UserComponent } from "./user.component";

@Component({
    selector:'app-my-profile',
    templateUrl:'my-profile.component.html',
})
export class MyProfileComponent extends BaseCtl {
  uploadId = 0;
  getKey = false;
  selected = null;
  fileToUpload: File = null;
  userForm : FormGroup = null;
  uploadForm: FormGroup; 
  constructor(public serviceLocator: ServiceLocatorService, public route: ActivatedRoute,public httpClient: HttpClient) {
    super(serviceLocator.endpoints.USER, serviceLocator, route);
  }
      ngOnInit(){
        var _self = this;

        this.serviceLocator.httpService.get(_self.api.endpoint+"/myProfile",function(res){
          if(res.success){
            _self.populateForm(_self.form.data,res.result);

          }else {
            _self.form.error = true;
            _self.form.message = "error"
            _self.form.inputerror = res.result.inputerror;

          }
        })
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
        form.picName =data.picName
      }
      myFile(){
         this.onSubmitProfile(this.fileToUpload, this.userForm).subscribe(data => {
           console.log(this.fileToUpload);
           }, error => {
             console.log(error);
           });
     
         }
         onSubmitProfile(fileToUpload: File, userform : FormGroup) {
          const formData = new FormData();
          
        var _self= this;
          formData.append('pic', fileToUpload);
          return this.httpClient.post(this.endpoint.USER+"/profilePic/"+this.uploadId, formData,{withCredentials:true});
      }
      onFileSelect(files: FileList) {
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
    
      }
    
      onUpload(userform : FormData) {
       this.submit();
     
      }
}