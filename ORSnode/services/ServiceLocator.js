var CollegeService = require("./CollegeService");
var CourseService = require("./CourseService");
var FacultyService = require("./FacultyService");
var MarksheetService = require("./MarksheetService");
var RoleService = require("./RoleService");
var StudentService = require("./StudentService");
var SubjectService = require("./SubjectService");
var UserService = require("./UserService");
var TimeTableService =require("./TimeTableService");



/**
 * Locate service 
 */
class ServiceLocator {

  constructor() {
    this.db = 'MySQL';
  }
  static getCollegeService() {
    return new CollegeService();
  }
  static getMarksheetService() {
    return new MarksheetService();
  }
    static getRoleService() {
    return new RoleService();
  }
  static getStudentService() {
    return new StudentService();
  }
  static getUserService() {
    return new UserService();
  }
  static getFacultyService(){
      return new FacultyService();
  }
  static getCourseService(){
    return new CourseService();
  }
  static getSubjectService(){
    return new SubjectService();
  }
  static getTimeTableService(){
    return new TimeTableService();
  }


}
module.exports = ServiceLocator;
