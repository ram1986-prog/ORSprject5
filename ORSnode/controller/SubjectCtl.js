var BaseCtl = require("../controller/BaseCtl");
var Course = require("../bean/Subject");
var ServiceLocator = require("../services/ServiceLocator");
const Subject = require("../bean/Subject");
var DataValidator = require("../utility/DataValidator");
var Response = require('../bean/Response');

/**
 * Contains Subject REST APIs
 */
class SubjectCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getSubjectService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    //  preload(request, response) {
    //     console.log('subject preload');
    //     var courseService = ServiceLocator.getCourseService();
    //     courseService.search('', null, function (err, result) {
    //         response.json(result.list)
    //     })
    // };

  

    preload(request, response) {
        console.log('subject preload');
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
        if(!body.courseId){
            result.inputerror.courseId ="course name is required";
            pass =false
        }
        if(!body.subjectName){
            result.inputerror.subjectName ="subject name is required";
            pass =false
        }else if(!DataValidator.issubjectName(body.firstName)){

            result.inputerror.firstName ="subject name only contains charactor and neumeric value";
            pass =false
        }
        if(!body.description){
            result.inputerror.description ="description is required";
            pass =false
        }
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }

    /**
     * Returns subject bean populated from request parameters. 
     */
    getBean(request) {
        var subject = new Subject();
        subject.populateRequest(request.body);
        return subject;
    };
 
    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = SubjectCtl;
