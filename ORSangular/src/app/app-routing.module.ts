import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegeListComponent } from './college/college-list.component';
import { CollegeComponent } from './college/college.component';
import { CourseListComponent } from './course/course-list.component';
import { CourseComponent } from './course/course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyListComponent } from './faculty/faculty-list.component';
import { FacultyComponent } from './faculty/faculty.component';
import { ForgetPasswordComponent } from './login/forget-password.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './login/user-registration.component';
import { GetMarksheetComponent } from './marksheet/get-marksheet.component';
import { MarksheetListComponent } from './marksheet/marksheet-list.component';
import { MarksheetComponent } from './marksheet/marksheet.component';
import { MeritListComponent } from './marksheet/merit-list.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { RoleListComponent } from './role/role-list.component';
import { RoleComponent } from './role/role.component';
import { StudentListComponent } from './student/student-list.component';
import { StudentComponent } from './student/student.component';
import { SubjectListComponent } from './subject/subject-list.component';
import { SubjectComponent } from './subject/subject.component';
import { TimetableListComponent } from './timetable/timetable-list.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ChangePasswordComponent } from './user/change-password.component';
import { MyProfileComponent } from './user/my-profile.component';
import { UserListComponent } from './user/user-list.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {NavComponent} from './nav/nav.component';

const routes: Routes = [
 
  { path:'nav',component: NavComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'userlist', component: UserListComponent },
  { path:'changepassword', component:ChangePasswordComponent },
  { path:'myprofile', component:MyProfileComponent },
  { path: 'role', component: RoleComponent },
  { path: 'role/:id', component: RoleComponent },
  { path: 'rolelist', component: RoleListComponent },
  { path: 'subject',  component: SubjectComponent  },
  { path: 'subject/:id', component: SubjectComponent },
  { path: 'subjectlist', component: SubjectListComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'studentlist', component: StudentListComponent  },

  { path: 'faculty', component: FacultyComponent },
  { path: 'faculty/:id', component: FacultyComponent },
  { path: 'facultylist',  component: FacultyListComponent },
  { path: 'college',  component: CollegeComponent },
  { path: 'college/:id',  component: CollegeComponent },
  { path: 'collegelist', component: CollegeListComponent },
  { path: 'course', component: CourseComponent  },
  { path: 'course/:id', component: CourseComponent },
  { path: 'courselist', component: CourseListComponent },
  { path: 'timetable',  component: TimetableComponent  },
  { path: 'timetable/:id', component: TimetableComponent  },
  { path: 'timetablelist', component: TimetableListComponent },
  { path: 'marksheet', component: MarksheetComponent },
  { path: 'marksheet/:id', component: MarksheetComponent },
  { path: 'marksheetlist', component: MarksheetListComponent },
  { path: 'meritlist',  component: MeritListComponent  },
  { path:'getmarksheet', component:GetMarksheetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:in', component: LoginComponent },
  { path:'forgotpassword', component:ForgetPasswordComponent  },
  { path:'signup', component:UserRegistrationComponent  },
  
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component:WelcomeComponent },
  { path:'**', component:PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
