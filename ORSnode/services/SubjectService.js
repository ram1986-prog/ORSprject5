var Subject = require("../bean/Subject");
var BaseService = require("./BaseService");
var ServiceLocator = require("./ServiceLocator");


class SubjectService extends BaseService{
    
    /**
     * 
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
/**
 * finds subject by primary key id
 * returns course object
 */
/**
 * finds record by primary key id
 */
findByPk(id,callback,ctx){
    var sql="SELECT * FROM st_subject WHERE ID= ?";
    var params =[id];
    super.executeSQLForObject(sql,params,new Subject(),callback);


};
/**
 * Searches and returns list, Applies pagination as well.
 * @param {*} subject
 * @param {*} callback
 */
search(subject,pageNo,callback ,ctx){
    var sql="SELECT * FROM st_subject where 1=1";
    if(subject.id){
        sql +=" and ID = '" + subject.id + "'";
    }
    if(subject.Name){
        sql += " and SUBJECT_NAME like '" + subject.Name + "%'";
    }
    
super.executeSQLForList(sql, { "pageNo": pageNo }, new Subject() , callback);
}
/**
 * Adds a subject and returns primary key 
 * @param {*} subject
 * @param {*} callback
 * @param {*} ctx
 */
add(subject,callback,ctx){
    var sql = "SELECT * FROM st_subject WHERE SUBJECT_ID= ?";
    var params = [subject.Id];
    super.executeSQLForObject(sql,params,new Subject(),function(err,result){
        if(result){
            callback("subject name allready exhists");
        }else if(err="Record not found"){
          
         var sql ="INSERT INTO st_subject (CREATED_DATETIME,MODIFIED_DATETIME,SUBJECT_NAME,SUBJECT_ID,COURSE_NAME,COURSE_ID,DESCRIPTION,CREATED_BY,MODIFIED_BY)"
       + "VALUES (NOW(),NOW(),?,?,?,?,?,?,?)";
       var params =[subject.subjectName,subject.subjectId,subject.courseName,subject.courseId,subject.description,subject.createdby,subject.modifiedby];
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
     * @param {*} subject
     * @param {*} callback
     * @param {*} ctx
     */
    
    update(subject,callback,ctx){
        var sql = "UPDATE st_subject SET MODIFIED_DATETIME = NOW(),CREATED_DATETIME=?,SUBJECT_NAME=? ,SUBJECT_ID=?,COURSE_NAME=?,COURSE_ID=?,DESCRIPTION=? WHERE ID=?" 
        var params =[subject.subjectName,subject.subjectId,subject.courseName,subject.courseId,subject.description,subject.id];
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
    super.delete(id,'st_subject',callback,ctx);
}

}
//Export subject service
module.exports = SubjectService;









