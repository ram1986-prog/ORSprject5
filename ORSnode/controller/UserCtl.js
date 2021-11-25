var formidable = require('formidable');
var fs = require('fs');

var BaseCtl = require("../controller/BaseCtl");
var EmailService = require('../utility/EmailService');
var MailMessage = require('../utility/MailMessage');
var EmailBuilder = require('../utility/EmailBuilder');
var User = require("../bean/User");
var Response = require("../bean/Response");
var ServiceLocator = require("../services/ServiceLocator");
var DataValidator = require("../utility/DataValidator");
/**
 * Contains User REST APIs.
 */
class UserCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getUserService();
    }

    /**
     * Get preload data.
     * @param {*} request 
     * @param {*} response 
     */

     preload(request, response) {
        console.log('subject preload');
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
        if(!body.roleId){
            result.inputerror.roleId ="role name is required";
            pass =false
        }


        if(!body.firstName){
            result.inputerror.firstName ="first name is required";
            pass =false
        }else if(!DataValidator.isfirstName(body.firstName)){

            result.inputerror.firstName ="First name only contains charactor";
            pass =false
        }
        if(!body.lastName){
            result.inputerror.lastName ="last name is required";
            pass =false
        }else if(!DataValidator.islastName(body.lastName)){

            result.inputerror.lastName ="last name only contains charactor";
            pass =false
        }
        if(!body.login){
            result.inputerror.login ="login id is required";
            pass=false
        }else if(!DataValidator.islogin(body.login)){
            result.inputerror.login ="login id must contain alfaneumeric and special characters ";
            pass=false
        }
        if(!body.password){
            result.inputerror.password ="password is required";
            pass=false
        }else if(!DataValidator.ispassword(body.password)){
            result.inputerror.password ="password must contain alfaneumeric and special characters ";
            pass=false
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
        if(!body.gender){
            result.inputerror.gender ="Gender is required";
            pass=false
        }

        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }

    /**
     * Authenticates a User. 
     * @param {*} request 
     * @param {*} response 
     */
    // login(request, response) {
    //     var bean = this.getBean(request); 
    //     // this.validate(req.body,function(pass,data)
    //     //  {
    //     // var pass = true;
    //     // var result = {};
    //     // result.inputerror ={};
    //     // if(!body.login){
    //     //     result.inputerror.login ="login id is required";
    //     //     pass =false
    //     // } 
    //     // if(!body.password){
    //     //     result.inputerror.password ="password  is required";
    //     //     pass =false
    //     // } 
    //     // if(pass==false){
    //     //     callback(req.body,function(pass,result);
    //     // }else{
    //     //     function(pass);
    //     // }
    
    //     this.service.authenticate(bean, function (err, result) {
            
    //         console.log(err);
    //         if (!err) {
    //             request.session.user = result;
    //             console.log("---->" + request.session.user);
    //         }
    //         var r = new Response(err, result);
    //         response.json(r);
    //     });
    // }
    // // --------------------------------
    login(request, response) {
        var pass = true;
        var result = {};
        result.inputerror = {};
        var body = request.body;
        if (!body.login) {
            result.inputerror.login = "Login Id is required";
            pass = false;
        } else if (!DataValidator.isEmail(body.login)) {
            result.inputerror.login = "Login Id is invalid";
            pass = false;
        }
        if (!body.password) {
            result.inputerror.password = "Password is required";
            pass = false;
        }/* else if (!DataValidator.isPassword(body.password.trim())) {
            result.inputerror.password = "Password is Invalid"
            pass = false;
        }*/
        if (!pass) {
            result.data = {}
            result.data.login = request.body.login;
            result.data.password = request.body.password;
            result.message = '';
            var res = new Response(result);
            response.json(res);
        } else {
            var user = new User();
            user.populateRequest(request.body);
            this.service.authenticate(user, function (err, bean) {
                if (bean) {
                    request.session.user = bean;//set session
                    result.data = request.session.user
                    var res = new Response(err, result);
                    response.json(res);
                } if (err) {
                    result.data = user;
                    result.message = 'LoginId and Password is incorrect';
                    var res = new Response(result);
                    response.json(res);
                }

                //result.sid = request.session.id;//setting session id
               // result.session = request.sessionID;

            });
        }
    }
    // ------------------------------

    /**
     * Sends email of forgotten  password
     * @param {*} request 
     * @param {*} response 
     */
    forgotPassword(request, response) {
        this.service.findByLogin(request.body.login, function (err, user) {
            //console.log(user);
            if (!err) {
                //test code 
                var m = {
                    login: user.login,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName
                };

                var msg = EmailBuilder.getForgetPasswordMessage(m);
                msg.to = user.login;
                var ser = new EmailService()
                ser.sendEmail(msg, function (err, result) {
                    if (err) {
                        var r = new Response(err, result);
                        response.json(r);
                    } else {
                        var r = new Response(err, "Password has been sent to your registred email id");
                        response.json(r);
                    }
                });
            } else {
                var r = new Response(err, user);
                response.json(r);
            }
        });
    }

    /**
     * Changes user password
     * @param {*} req 
     * @param {*} res 
     */
    // changePassword(req, res) {
    //     var u = {};
    //     u.id = req.session.user.id;//get user from session
    //     u.password = req.body.password;
    //     u.oldPassword = req.body.oldPassword;
    //     this.service.changePassword(u, function (err, result) {
    //         if (err) {
    //             res.json(new Response(err, result));
    //         } else {

    //             res.json(new Response(err, result));
    //         }
    //     });
    // }
    //----------------
    changePassword(req, res) {
        var form = {};
       // form.id = req.body.id;//not from session
        form.id = req.session.user.id;
        form.password = req.body.password;
        form.oldPassword = req.body.oldPassword;
        form.confirmPassword = req.body.confirmPassword;
        var pass = true;
        var result = {};
        result.inputerror = {}
        if (!req.body.password) {
            result.inputerror.password = "Password is required";
            pass = false;
            
        }
        if (!req.body.oldPassword) {
            result.inputerror.oldPassword = "old password is required";
            pass = false;
            
        }
        if (!req.body.confirmPassword) {
            result.inputerror.confirmPassword = "confirm Password is required";
            pass = false;
            
        } else if (!DataValidator.isPassword(req.body.password.trim())) {
            result.inputerror.password = "Password is Invalid"
            pass = false;
        }
        if (!pass) {
            result.data = {}
            result.data.oldPassword = req.body.oldPassword;
            result.data.password = req.body.password;
            result.data.confirmPassword = req.body.confirmPassword;
            result.message = 'Input Error';
            var resf = new Response(result);
            res.json(resf);
        } else {
            this.service.changePassword(form, function (err, result) {
                if (err) {
                    res.json(new Response(err, result));
                } else {
                    res.json(new Response(err, result));
                }
            })
        }
    };
   // ------------------

    /**
     * returns user profile data
     * @param {*} req 
     * @param {*} res 
     */
    myProfile(req, res) {
        var service = this.getService();
        var id = req.session.user.id; //get user from session
        service.findByPk(id, function (err, bean) {
            var r = new Response(err, bean);;
            res.json(r);
        });
    }

    /**
     * Destroys current session.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    logout(request, response) {
        request.session.destroy();
        response.json(new Response(null, 'ok'));
    }

    /**
     * Returns menu items 
     * 
     * @param {*} request 
     * @param {*} response 
     */
    menu(request, response) {
        var bar = [];
        if (request.session.user) {
            bar =
                [
                    { text: 'User', link: '#!user' },
                    { text: 'Role', link: '#!role' },
                    { text: 'College', link: '#!college' },
                    { text: 'Student', link: '#!student' },
                    { text: 'Marksheet', link: '#!marksheet' }
                ]
        } else {
            bar =
                [
                    { text: 'Login', link: '#!login' }
                ]
        }
        var r = new Response(null, bar);
        response.json(r);
    }


    /**
     * Updates profile picture
     * 
     * @param {*} request 
     * @param {*} response 
     */
    profilePic(request, response) {

        console.log('...profilePic');
        var form = new formidable.IncomingForm();

        var self = this;

        form.parse(request, function (err, params, files) {

            //Parse multipart data
            console.log('id', request.params.id);
            console.log('file', files.pic);

            var pic = {
                id: request.params.id,
                data: fs.readFileSync(files.pic.path),
                type: files.pic.type,
                name: files.pic.name
            };

            self.service.updatePicture(pic, function (err, result) {
                var r = new Response(err, result);
                response.json(r);
            });
        });
    }

    /**
     * Gets profile picture
     * 
     * @param {*} request 
     * @param {*} response 
     */
    getPic(request, response) {
        var id = request.params.id;
        this.service.getPicture(id, function (err, pic) {
            if (err) {
                //If picture is not found then send default picture
                var rootPath = { root: '.' };
                response.sendFile('unknown.png', rootPath);
            } else {
                response.writeHead(200, { 'Content-Type': pic.type });
                response.write(pic.data);
                response.end();
            }
        })
    }
    register(request, response) {
        var user = this.getBean(request);
        user.roleId = 2;//hard Code For Student
        this.validate(user, function (pass, data) {
            if (!request.body.password) {
                data.inputerror.confirmPassword = "Confirm Password is required";
                data.data = request.body;
                var result = new Response(data);
                response.json(result);
            }
            else if (request.body.confirmPassword == request.body.password) {
                if (pass) {
                    var userService = new UserService();
                    userService.register(user, function (err, pk) {

                        var resp = new Response(err, pk);
                        response.json(resp);
                    })
                } else {
                    data.data = request.body;
                    var result = new Response(data);
                    response.json(result);
                }
            } else {
                data.inputerror.confirmPassword = "Passwords do not match"
                data.data = request.body;
                var result = new Response(data);
                response.json(result);
            }
        })
    }

    /**
     * Returns bean of User controller.
     * @param {*} request 
     */
    getBean(request) {
        var user = new User();
        user.populateRequest(request.body);
        return user;
    };

    /**
     * Returns service of User controller.
     */
    getService() {
        return this.service;
    };
}
module.exports = UserCtl;
