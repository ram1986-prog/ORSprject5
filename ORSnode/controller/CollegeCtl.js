var BaseCtl = require("../controller/BaseCtl");
var College = require("../bean/College");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require("../bean/Response");

/**
 * Contains College REST APIs
 */
class CollegeCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCollegeService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    //  preload(request, response) {
    //     console.log('Faculty preload');
    //     var collegeService = ServiceLocator.getCollegeService();
    //     collegeService.search('', null, function (err, result) {
    //         response.json(result.list)
    //     })
    // };

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
        if(!body.collegeName){
            result.inputerror.collegeName ="College name is required";
            pass =false
        }
        if(!body.desription){
            result.inputerror.description ="description is required";
            pass =false
        }
        if(!body.address){
            result.inputerror.address ="address is required";
            pass =false
        }
        if(!body.city){
            result.inputerror.city ="city is required";
            pass =false
        }if(!body.state){
            result.inputerror.state ="state is required";
            pass =false
        }
        
        if(!body.phoneNo){
            result.inputerror.phoneNo ="phone No is required";
            pass =false
        }

        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }

    /**
     * Returns College bean populated from request parameters. 
     */
    getBean(request) {
        var college = new College();
        college.populateRequest(request.body);
        return college;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = CollegeCtl;
