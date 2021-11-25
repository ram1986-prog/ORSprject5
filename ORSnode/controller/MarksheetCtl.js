var BaseCtl = require("../controller/BaseCtl");
var Marksheet = require("../bean/Marksheet");
var ServiceLocator = require("../services/ServiceLocator");
var DataValidator =require("../utility/DataValidator");
var Response = require('../bean/Response');
const MarksheetService = require("../services/MarksheetService");
/**
 * Contains Marksheet REST APIs
 */

class MarksheetCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getMarksheetService();
    }

    /**
     * Returns preload data. 
     * 
     * @param {*} request
     * @param {*} response
     */
     preload(request, response) {
        console.log('marksheet preload');
        var courseService = ServiceLocator.getStudentService();
        courseService.search('', null, function (err, result) {
            var res = new Response(err,result);

            response.json(res)
        })
    };
    meritList(request,response){
        this.service.meritList(function (err,result)
        {
            var res=new Response(err,result);
            response.json(res)
        })
        
    };
    getMarksheet(request,response){
        
       
        this.service.getMarksheet(request.body.rollNo,function(err,result)
            {
                var res =new Response(err,result);
                response.json(res)
                

            })
    };

    validate(body,callback){
        var pass = true;
        var result = {};
        result.inputerror ={};
        if(!body.rollNo){
            result.inputerror.rollNo =" rollNo is required";
            pass =false
        }else if(!DataValidator.isrollNo(body.rollNo)){

            result.inputerror.rollNo =" firstname only contains charactor and neumeric value";
            pass =false
        }
        if(!body.studentId){
            result.inputerror.studentId ="studentId is required";
            pass =false
        }else if(!DataValidator.isstudentId(body.studentId)){

            result.inputerror.studentId ="studentId only contains charactor ";
            pass =false
        }
        if(!body.physics){
            result.inputerror.physics ="state is required";
            pass =false
        }else if(!DataValidator.isphysics(body.physics)){

            result.inputerror.physics ="physics marks only contains neumeric value";
            pass =false
        }
        if(!body.chemistry){
            result.inputerror.chemistry ="chemistry marks is required";
            pass =false
        }else if(!DataValidator.ischemistry(body.chemistry)){

            result.inputerror.chemistry ="chemistry marks only contains neumeric value";
            pass =false
        }
        if(!body.maths){
            result.inputerror.maths ="maths marks is required";
            pass =false
        }else if(!DataValidator.ismaths(body.maths)){

            result.inputerror.maths ="maths marks only contains neumeric value";
            pass =false
        }
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }

    /**     
     * Returns Marksheet bean populated from request parameters.
     */
    getBean(request) {
        var marksheet = new Marksheet();
        marksheet.populateRequest(request.body);
        return marksheet;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = MarksheetCtl;
