const BaseBean = require("../bean/BaseBean");
var TimeTable = require("../bean/TimeTable");
var BaseService = require("./BaseService");
//var TimeTableService = require("./TimeTableService");

class TimeTableService extends BaseService {

    

    /**
     *Finds student by primary key id
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_timetable WHERE ID= ?";
        var params = [id];
        console.log('findByPk--');
        super.executeSQLForObject(sql, params, new TimeTable(), callback);
    };

    add(timetable, callback, ctx) {


           var sql = "INSERT INTO st_timetable (CREATED_DATETIME,MODIFIED_DATETIME,COLLEGE_NAME,COURSE_NAME,SUBJECT_NAME,SEMESTER,EXAM_DATE,EXAM_TIME) "
                       + " VALUES (NOW(),NOW(),?,?,?,?,?,?)";
                        var params = [timetable.collegeName, timetable.courseName,timetable.subjectName,timetable.semester,timetable.examDate,timetable.examTime];
                        var baseService = new BaseService();
                        baseService.executeSQL(sql, params, function (err, result) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(err, result.insertId);
                            }
        
                        });
                
                        
                
            
             
        
        
        
            };

           
        
            /**
             * Updates a timetable 
             * @param {*} timetable
             * @param {*} callback 
             * @param {*} ctx 
             */
            update(timetable, callback, ctx) {
                var sql = "UPDATE st_timetable SET  MODIFIED_DATETIME = NOW(),COLLEGE_NAME=?,COURSE_NAME=?,SUBJECT_NAME=?,SEMESTER=?,EXAM_DATE=?,EXAM_TIME=?  WHERE ID=?"
                var params = [timetable.collegeName, timetable.courseName,timetable.subjectName,timetable.semester,timetable.examDate,timetable.examTime,timetable.id];
                super.executeSQL(sql, params, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, result.affectedRows);
                    }
                });
            }

    /**
     * Search timetable by CollegeId,CollegeName,StudentId,StudentName
     * 
     * returns timetable Object
     * @param {*} timetable 
     * @param {*} callback 
     */
    search(timetable, pageNo, callback) {
        var sql = "SELECT * FROM st_timetable where 1=1 ";
        
        if (timetable.subjectName) {
            sql += " and SUBJECT_NAME LIKE '" + timetable.subjectName + "%' ";
        }
        if (timetable.semester) {
            sql += " and SEMESTER = '" + timetable.semester + "%'";
        }
       
        if (timetable.collegeId) {
            sql += " and COLLEGE_ID = '" + timetable.collegeId + "'";
        }
        
        if (timetable.studentId) {
            sql += " and STUDENT_ID = '" + timetable.studentId + "'";
        }
        if (timetable.courseId) {
            sql += " and COURSE_ID = '" + timetable.courseId + "'";
        }
                 
        super.executeSQLForList(sql, { "pageNo": pageNo }, new TimeTable(), function(err,list){
            callback(err,list);
        });




        
    }
  
    
}


module.exports = TimeTableService;

