import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EndpointServiceService {
  
  

  constructor() { }

  public SERVER_URL = "http://localhost:8080";
  public MESSAGE = this.SERVER_URL + "/Message";
  public USER = this.SERVER_URL + "/User";
  public ROLE = this.SERVER_URL + "/Role";
  public AUTH = this.SERVER_URL + "/auth";
  public COLLEGE = this.SERVER_URL + "/College";
  public MARKSHEET = this.SERVER_URL + "/Marksheet";
  public STUDENT = this.SERVER_URL + "/Student";
  public COURSE =this.SERVER_URL + "/Course";
  public FACULTY =this.SERVER_URL + "/Faculty";
  public TIMETABLE =this.SERVER_URL + "/TimeTable";
  public LOGIN =this.SERVER_URL + "/login";
  public SIGNUP =this.SERVER_URL + "/Signup";
  public MYPROFILE =this.SERVER_URL + "/myProfile";
  public SUBJECT =this.SERVER_URL + "/Subject";
  
  

}


