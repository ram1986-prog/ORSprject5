import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { EndpointServiceService } from '../endpoint-service.service';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  firstName = '';
  roleName = '';
  menu = {}
  constructor(private translate: TranslateService, private cookie: CookieService, private serviceLocator: ServiceLocatorService, private endpoint: EndpointServiceService) {
    this.changeLocale("en");
    translate.setDefaultLang(localStorage.getItem("locale"));
  }

  changeLocale(locale: string) {
    localStorage.setItem("locale", locale);
    this.translate.use(localStorage.getItem("locale"));

    this.ngOnInit();
  }

  ngOnInit() {


  }
  checkLogin() {
    var _self = this;
    var session = ''
    session = localStorage.getItem('firstName');
    if (session != null) {
      this.firstName = localStorage.getItem('firstName');
      this.roleName = localStorage.getItem('roleName');
      return true;
    }
    return false;
  }
  logout() {
    var _self = this
    this.serviceLocator.httpService.post(this.endpoint.AUTH + "/logout",null, function (res) {
      if (res.success) {
        console.log("true")
        localStorage.removeItem('firstName');
       
        localStorage.removeItem('roleName');

        _self.serviceLocator.forward('login/logout');
        _self.ngOnInit();
      } else {
        console.log('inelse');
      }
    })
    _self.cookie.delete('connect.sid');
  }

}
