var BaseCtl = require("../controller/BaseCtl");
var Role = require("../bean/Role");
var ServiceLocator = require("../services/ServiceLocator");
var DataValidator = require("../utility/DataValidator");
var Response = require("../bean/Response");

/**
 * Contains Role REST APIs
 */

class RoleCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getRoleService();
    }
    
    preload(request, response) {
        var roleService = ServiceLocator.getRoleService();
        roleService.search('', null, function (err, result) {
            var res = new Response(err,result);
            response.json(res)
        })
    };

    validate(body,callback){
        var pass = true;
        var result = {};
        result.inputerror ={};
        if(!body.name){
            result.inputerror.name =" name is required";
            pass =false
        }else if(!DataValidator.isname(body.name)){

            result.inputerror.name =" name only contains charactor";
            pass =false
        }
        if(!body.description){
            result.inputerror.description ="discription is required";
            pass =false
        }
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }


    /**
     * Return bean of Role controller.
     * @param {*} request 
     */
    getBean(request) {
        var role = new Role();
        role.populateRequest(request.body);
        return role;
    };

    /**
     * return service of Role controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = RoleCtl;
