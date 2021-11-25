var BaseCtl = require("../controller/BaseCtl");
var Faculty = require("../bean/Faculty");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require('../bean/Response');
var DataValidator =require("../utility/DataValidator");
/**
 * Contains Faculty REST APIs
 */
class FacultyCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getFacultyService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
     preload(request, response) {
        var courseService = ServiceLocator.getCourseService();
        var subjectService = ServiceLocator.getSubjectService();
       var collegeService = ServiceLocator.getCollegeService();
        var result = {}
        courseService.search('', null, function (err, course) {
            if (!err) {
                result.courseList = course;
                subjectService.search('', null, function (err, subject) {
                   if(!err){
                    result.subjectList = subject;
                       collegeService.search('',null,function(err,college){
                   
                                    if (!err) {
                                        result.collegelist = college;
                                        
                                        var res = new Response(err, result);
                                        response.json(res);
                    }
                });
            }
                });
            }
        });
    }

    validate(body,callback){
        var pass = true;
        var result = {};
        result.inputerror ={};
        if(!body.firstName){
            result.inputerror.firstName =" firstname is required";
            pass =false
        }else if(!DataValidator.isName(body.firstName)){

            result.inputerror.firstName =" firstname only contains charactor";
            pass =false
        }
        if(!body.lastName){
            result.inputerror.lastName ="lastName is required";
            pass =false
        }else if(!DataValidator.islastName(body.address)){

            result.inputerror.lastName ="lastName only contains charactor ";
            pass =false
        }
        if(!body.emailId){
            result.inputerror.emailId ="Email Id is required";
            pass =false
        }
        if(!body.mobileNo){
            result.inputerror.mobileNo ="mobileNo is required";
            pass =false
        }
        if(!body.collegeId){
            result.inputerror.collegeId ="college Name is required";
            pass =false
        }
        if(!body.courseId){
            result.inputerror.courseId ="course Name is required";
            pass =false
        }
        if(!body.subjectId){
            result.inputerror.subjectId ="Subject Name is required";
            pass =false
        }
       
        if(!body.gender){
            result.inputerror.gender ="Gender  is required";
            pass =false
        }
        if(!body.dob){
            result.inputerror.dob ="dob  is required";
            pass =false
        }
        
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }

    /**
     * Returns faculty bean populated from request parameters. 
     */
    getBean(request) {
        var faculty = new Faculty();
        faculty.populateRequest(request.body);
        return faculty;
    };
 
    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = FacultyCtl;
