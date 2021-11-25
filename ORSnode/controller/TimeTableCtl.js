var BaseCtl = require("../controller/BaseCtl");
var TimeTable = require("../bean/TimeTable");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require('../bean/Response');

/**
 * Contains timetable REST APIs.
 */

class TimeTableCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getTimeTableService();
    }

    /**
     * Returns preload data.
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
        if(!body.collegeId){
            result.inputerror.collegeId =" college name is required";
            pass =false
        }
        if(!body.courseId){
            result.inputerror.courseId =" course name is required";
            pass =false
        }
        if(!body.subjectIdId){
            result.inputerror.subjectId =" subject name is required";
            pass =false
        }
        if(!body.semester){
            result.inputerror.semester =" semester is required";
            pass =false
        }
        if(!body.examDate){
            result.inputerror.examDate ="ExamDate is required";
            pass =false
        }
         if(!body.examTime){
            result.inputerror.examTime ="examTime is required";
            pass=false
        }
        
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }
    /**
     * Return bean of timetable controller.
     * @param {*} request 
     */
    getBean(request) {
        var timetable = new TimeTable();
        timetable.populateRequest(request.body);
        return timetable;
    };

    /**
     * return service of Role controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = TimeTableCtl;