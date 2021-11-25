class DataValidator{

    static isfirstName(str){
        var patt = new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static islastName(str){
        var patt = new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static islogin(str){
        var patt =new RegExp('[.a-zA-Z,0-9,@#]');
        return patt.test(str);
    }
    static isEmail(str) {
        var patt = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        return patt.test(str);
    }
    static isdiscription(str){
        var patt =new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static isstate(str){
        var patt =new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static iscity(str){
        var patt =new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static ismobileNo(str){
        var patt =new RegExp('[.0-9]');
        return patt.test(str);
    }
    static isphoneNo(str){
        var patt =new RegExp('[.0-9]');
        return patt.test(str);
    }
    static isName(str){
        var patt =new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static isname(str){
        var patt =new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static isrollNo(str){
        var patt =new RegExp('[.a-zA-Z,0-9]');
        return patt.test(str);
    }
    static isstudentId(str){
        var patt =new RegExp('[.a-zA-Z,0-9]');
        return patt.test(str);
    }
    static isphysics(str){
        var patt =new RegExp('[.0-9]');
        return patt.test(str);
    }
    static ischemistry(str){
        var patt =new RegExp('[.0-9]');
        return patt.test(str);
    }
    static ismaths(str){
        var patt =new RegExp('[.0-9]');
        return patt.test(str);
    }
    static ispassword(str){
        return true;
    }
    static isPassword(str) {
        var patt = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
        return patt.test(str);
    }



}
module.exports = DataValidator;

