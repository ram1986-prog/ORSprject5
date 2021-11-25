var Course = require("../bean/Course");
var BaseService = require("./BaseService");
var ServiceLocator = require("./ServiceLocator");


class CourseService extends BaseService{
    
    /** 
     * 
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
/**
 * finds course by primary key id
 * returns course object
 */
/**
 * finds record by primary key id
 */
findByPk(id,callback,ctx){
    var sql="SELECT * FROM st_course WHERE ID= ?";
    var params =[id];
    super.executeSQLForObject(sql,params,new Course(),callback);


};
/**
 * Searches and returns list, Applies pagination as well.
 * @param {*} faculty
 * @param {*} callback
 */
search(course,pageNo,callback ,ctx){
    var sql="SELECT * FROM st_course where 1=1";
    if(course.id){
        sql +=" and ID = '" + course.id + "'";
    }
    if(course.name){
        sql += " and COURSE_NAME like '" + course.name + "%'";
    }

    
super.executeSQLForList(sql, { "pageNo": pageNo }, new Course() , callback);
}
/**
 * Adds a course and returns primary key 
 * @param {*} faculty
 * @param {*} callback
 * @param {*} ctx
 */
add(course,callback,ctx){
    var sql = "SELECT * FROM st_course WHERE NAME= ?";
    var params = [course.name];
    super.executeSQLForObject(sql,params,new Course(),function(err,result){
        if(result){
            callback("course name allready exhists");
        }else if(err="Record not found"){
          
         var sql ="INSERT INTO st_course (CREATED_DATETIME,MODIFIED_DATETIME,COURSE_NAME,DURATION,DESCRIPTION,CREATED_BY,MODIFIED_BY)"
       + "VALUES (NOW(),NOW(),?,?,?,?,?)";
         var params =[course.name,course.duration,course.description,course.createdby,course.modifiedby];
            var baseService =  new BaseService();
         baseService.executeSQL(sql,params,function(err,result){
              if(err){
            callback(err);
            }else{
            callback(err,result.insertId);
            }
    });
}else{
    callback(err);
}
    });
}
    /**
     * Updates a course
     * @param {*} course
     * @param {*} callback
     * @param {*} ctx
     */
    
    update(course,callback,ctx){
        var sql = "UPDATE st_course SET MODIFIED_DATETIME = NOW(),NAME=?,DURATION=?,DESCRIPTION=? WHERE ID=?" 
        var params =[course.name,course.duration,course.description,course.id];
        super.executeSQL(sql,params,function(err,result){

            if(err){
                callback(err);
            }else{
                callback(err,result.affectedRows);
            }
        });

    }
/**
 * Delete a course and return deleted bean
 * @param {*} id
 * @param {*} callback
 * @param {*} ctx
 */
delete(id,callback,ctx){
    super.delete(id,'st_course',callback,ctx);
}

}
//Export course service
module.exports = CourseService;









