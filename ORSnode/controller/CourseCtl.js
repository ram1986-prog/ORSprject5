var BaseCtl = require("../controller/BaseCtl");
var Course = require("../bean/Course");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require("../bean/Response");

/**
 * Contains Course REST APIs
 */
class CourseCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCourseService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
     preload(request, response) {
        console.log('Faculty preload');
        var courseService = ServiceLocator.getCourseService();
        courseService.search('', null, function (err, result) {
            var res = new Response(err,result);
            response.json(res)
        })
    };

    validate(body,callback){
        var pass = true;
        var result = {};
        result.inputerror ={};
        if(!body.name){
            result.inputerror.name =" course name is required";
            pass =false
        }
        if(!body.description){
            result.inputerror.description =" description is required";
            pass =false
        }
        if(!body.duration){
            result.inputerror.duration =" duration is required";
            pass =false
        }
              
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }


    /**
     * Returns course bean populated from request parameters. 
     */
    getBean(request) {
        var course = new Course();
        course.populateRequest(request.body);
        return course;
    };
 
    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = CourseCtl;
