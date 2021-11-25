import { Component, OnInit } from '@angular/core';
import { EndpointServiceService } from '../endpoint-service.service';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  




  constructor(public route: ActivatedRoute, public endpoint: EndpointServiceService, public serviceLocator: ServiceLocatorService) {
    var s = "in"
    var _self = this
    this.serviceLocator.getPathVariable(this.route, function (params) {
      s = params["in"];
      console.log(s + "uri------------");
    })


    if (s == "logout") {
      _self.form.message = "Logout Successfull"
    } else if (s != undefined) {
      _self.form.error = true;
      _self.form.message = "Session Expired Please Login";

    }
  }

  ngOnInit() {

  }


  public form = {
    error: false,
    message: null,
    inputerror: {},
    data: {},

  };
  signIn() {
    console.log("login");
    var _self = this;
    var uri = "in"
    this.serviceLocator.httpService.post('http://localhost:8080/auth/login', this.form.data, function (res) {
      if (res.success) {
        localStorage.setItem('firstName', res.result.data.firstName);
        localStorage.setItem('roleName', res.result.data.roleName)
        console.log(uri + "uri")
        _self.serviceLocator.getPathVariable(_self.route, function (params) {
          uri = params["in"];
          console.log(uri + "uri------------");
        })
        if (uri == undefined) {
          console.log("1")
          _self.serviceLocator.forward('dashboard');
        } else if (uri == "logout") {
          _self.serviceLocator.forward('dashboard');
        }
        else if (uri != undefined) {
          _self.serviceLocator.forward(uri);
        }



      } else {
        console.log('inelse');
        _self.populateForm(_self.form.data, res.result.data);
        _self.form.inputerror = res.result.inputerror;
        console.log("------------------", res.result.inputerror)
        _self.form.error = false;
        if (res.result.message) {
          _self.form.error = true;
          _self.form.message = res.result.message
          
        } else {
          _self.form.message = null
        }

      }
    })
  }
  signUp() {
    this.serviceLocator.forward('signup')
  }
  


  populateForm(form, data) {
    form.login = data.login;
    form.password = data.password;

  }

}
