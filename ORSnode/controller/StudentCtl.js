var BaseCtl = require("../controller/BaseCtl");
var Student = require("../bean/Student");
var ServiceLocator = require("../services/ServiceLocator");
var DataValidator = require("../utility/DataValidator");
var Response = require("../bean/Response");

/**
 * Contains Student REST APIs.
 */

class StudentCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getStudentService();
    }

    /**
     * Returns preload data.
     * @param {*} request 
     * @param {*} response 
     */
     preload(request, response) {
        console.log('subject preload');
        var clgService = ServiceLocator.getCollegeService();
        clgService.search('', null, function (err, result) {
            var res = new Response(err,result);

            response.json(res)
        })
    };

    


    validate(body,callback){
        var pass = true;
        var result = {};
        result.inputerror ={};
        if(!body.collegeId){
            result.inputerror.collegeId =" college name is required";
            pass =false
        }
        if(!body.firstName){
            result.inputerror.firstName =" firstname is required";
            pass =false
        }
        if(!body.lastName){
            result.inputerror.lastName ="lastName is required";
            pass =false
        }
         if(!body.dob){
            result.inputerror.dob ="dob is required";
            pass=false
        }
        if(!body.mobileNo){
            result.inputerror.mobileNo ="mobileNo is required";
            pass=false
        }else if(!DataValidator.ismobileNo(body.mobileNo)){
            result.inputerror.mobileNo ="mobileNo neumeric value 0-9 ";
            pass=false
        }
        if(!body.emailId){
            result.inputerror.emailId ="email  is required";
            pass=false
        }
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }

    /**
     * Return bean of Sudent controller.
     * @param {*} request 
     */
    getBean(request) {
        var student = new Student();
        student.populateRequest(request.body);
        return student;
    };

    /**
     * return service of Role controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = StudentCtl;