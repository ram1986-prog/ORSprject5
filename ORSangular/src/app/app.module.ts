import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MarksheetComponent } from './marksheet/marksheet.component';
import { StudentComponent } from './student/student.component';
import { CollegeComponent } from './college/college.component';
import { CourseListComponent} from './course/course-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FacultyListComponent } from './faculty/faculty-list.component';
import { HttpServiceService } from './http-service.service';
import { LoginComponent } from './login/login.component';
import { BasicsComponent } from './basics/basics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataValidator } from './utility/data-validator';
import { ForgetPasswordComponent } from './login/forget-password.component';
import { SignUpComponent } from './login/signup.component';
import { MessageComponent } from './message/message.component';
import { CookieService } from 'ngx-cookie-service';
import { MessageListComponent } from './message/message-list.component';
import { MarksheetListComponent } from './marksheet/marksheet-list.component';
import { CollegeListComponent } from './college/college-list.component';
import { StudentListComponent } from './student/student-list.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserListComponent } from './user/user-list.component';

import { FootComponent } from './foot/foot.component';
import { NavComponent } from './nav/nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RoleListComponent} from './role/role-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChangePasswordComponent } from './user/change-password.component';
import { MyProfileComponent } from './user/my-profile.component';
import { RoleComponent } from './role/role.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectListComponent } from './subject/subject-list.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CourseComponent } from './course/course.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TimetableListComponent } from './timetable/timetable-list.component';
import { MeritListComponent } from './marksheet/merit-list.component';
import { GetMarksheetComponent } from './marksheet/get-marksheet.component';
import { UserRegistrationComponent } from './login/user-registration.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export function myHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    
    MyProfileComponent,
    FacultyListComponent,
    CourseListComponent,
    AppComponent,
    MarksheetComponent,
    MarksheetListComponent,
    StudentComponent,
    StudentListComponent,
    CollegeComponent,
    CollegeListComponent,
    LoginComponent,
    BasicsComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    SignUpComponent,
    MessageComponent,
    MessageListComponent,
    UserComponent,
    UserListComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    FootComponent,
    NavComponent,
    WelcomeComponent,
    RoleListComponent,
    RoleComponent,
    SubjectComponent,
    SubjectListComponent,
    FacultyComponent,
    FacultyListComponent,
    CourseComponent,
    TimetableComponent,
    TimetableListComponent,
    MeritListComponent,
    GetMarksheetComponent,
    UserRegistrationComponent,
   
  ],         
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: myHttpLoader, 
          deps: [HttpClient]
      }
    }),
    
  ],
  providers: [
    HttpServiceService,
    DataValidator,
    CookieService,
    { provide: LocationStrategy, 
      useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
