import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'


@Injectable()

export class HttpServiceService {


  constructor(private router: Router, private httpClient: HttpClient, private cookie: CookieService) {

  }
  isLogout() {
    var _self = this
    let SessionID = localStorage.getItem('firstName');
    console.log(this.router.url+"------------------------------------------------")
    if ((SessionID == "" || SessionID == null) &&
      (    this.router.url != "/login"
        && this.router.url != "/auth"
        && this.router.url != "/login/logout"
        && this.router.url != "/forgotpassword"
        && this.router.url != "/signup"
        && !this.router.url.includes("/login/")
      )) {
      if (_self.router.url.includes("login")) {
        var uri = _self.router.url;
      } else {
        var uri = '/login' + _self.router.url;
      }
      _self.router.navigateByUrl(uri)
      return true;
    } else {
      return false;
    }
    
  }

  get(endpoint, callback) {
    var _self = this;
    if (this.isLogout()) {
      return true;
    }
    return _self.httpClient.get(endpoint, { withCredentials: true }).subscribe((data) => {
      console.log(data);
      callback(data);

    });
  }

  post(endpoint, bean, callback) {
    var _self = this
    if (this.isLogout()) {
      return true;
    }
    return _self.httpClient.post(endpoint, bean, { withCredentials: true }).subscribe((data) => {
      console.log(data);
      callback(data);

    }, error => {
      console.log('ORS Error', error);
    });
  }


}




/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointServiceService } from './endpoint-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceLocatorService } from './service-locator.service';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient, public endpoint: EndpointServiceService,private cookie:CookieService,private router: Router,public login:LoginComponent ) {
  }
  isLogout() {
    var session = this.cookie.get('connect.sid');
    console.log('-------------------session----------------'+session);
    console.log('---------------------url------------------'+this.router.url);
    if ((session == "") && (this.router.url != "/login"
    && this.router.url != "/Auth"
    && this.router.url != "/logout"
    && this.router.url != "/forgotpassword"
    && this.router.url != "/register"
    ) ) {
      this.login.form.message="Session Expired Please Login";
      this.login.form.error=true;
  this.router.navigateByUrl('/login');
  return true;
} else {
  return false;
}

  }





*/
/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()

export class HttpServiceService {

  sessionid = '1BD5F72D01F0164ADBDE1776CD6SUNIL';

  setSessionId(sid) {
    this.sessionid = sid;
    console.log('Session Id', this.sessionid);

  }

  constructor(private httpClient: HttpClient) {

  }

  getHeader() {
    let sesCookiee = 'JSESSIONID=' + this.sessionid;
    //'cookie' :   sesCookiee,
    let httpOptions = {
      headers: new HttpHeaders({
        "withCredentials": "true"
      })
    };
    console.log(httpOptions);
    return httpOptions;
  }

  get(endpoint, callback) {
    return this.httpClient.get(endpoint, this.getHeader()).subscribe((data) => {
      console.log(data);
      callback(data);
    });;
  }


  post(endpoint, bean, callback) {
    return this.httpClient.post(endpoint, bean, this.getHeader()).subscribe((data) => {
      console.log(data);
      callback(data);
    }, error => {
      console.log('ORS Error', error);
    });
  }

}
*/
