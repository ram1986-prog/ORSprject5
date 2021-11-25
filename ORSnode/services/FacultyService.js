var Faculty = require("../bean/Faculty");
var BaseService = require("./BaseService");
var ServiceLocator = require("./ServiceLocator");
var CourseService = require("./CourseService");
var SubjectService = require("./SubjectService");
var CollegeService = require("./CollegeService");

class FacultyService extends BaseService {

    /**
     * 
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    /**
     * finds faculty by primary key id
     * returns Faculty object
     */
    /**
     * finds record by primary key id
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_faculty WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new Faculty(), callback);


    };

    /**
     * Searches and returns list, Applies pagination as well.
     * @param {*} faculty
     * @param {*} callback
     */
    search(faculty, pageNo, callback, ctx) {
        var sql = "SELECT * FROM st_faculty where 1=1";


        if (faculty.firstName) {
            sql += " and FIRST_NAME like '" + faculty.firstName + "%' ";
        }
        if (faculty.emailId) {
            sql += " and EMAIL_ID like '" + faculty.emailId + "%' ";
        }
        if (faculty.courseId) {
            sql += " and COURSE_ID = " + faculty.courseId;
        }
        if (faculty.collegeId) {
            sql += " and COLLEGE_ID = " + faculty.collegeId;
        }
        if (faculty.subjectId) {
            sql += " and SUBJECT_ID = " + faculty.subjectId;
        }
        super.executeSQLForList(sql, { "pageNo": pageNo }, new Faculty(), callback);
    }
    /**
     * Adds a faculty and returns primary key 
     * @param {*} faculty
     * @param {*} callback
     * @param {*} ctx
     */
    add(faculty, callback, ctx) {
        var sql = "SELECT * FROM st_faculty WHERE EMAIL_ID= ?";
        var params = [faculty.emailId];
        super.executeSQLForObject(sql, params, new Faculty(), function (err, result) {

            var courseService = new CourseService();
            courseService.findByPk(faculty.courseId, function (err, course) {
                if (err) {
                    callback(err);
                } else {
                    faculty.courseName = course.name;
                    var collegeService = new CollegeService();
                    collegeService.findByPk(faculty.collegeId, function (err, college) {
                        if (err) {
                            callback(err);
                        } else {
                            faculty.collegeName = college.collegeName;
                            var subjectService = new SubjectService();
                            subjectService.findByPk(faculty.subjectId, function (err, subject) {
                                if (err) {
                                    callback(err);
                                } else {
                                    faculty.subjectName = subject.subjectName;
                                    if (result == undefined) {
                                        var sql = "INSERT INTO st_faculty (CREATED_DATETIME,MODIFIED_DATETIME,FIRST_NAME,LAST_NAME,EMAIL_ID,MOBILE_NO,COLLEGE_ID,COLLEGE_NAME,COURSE_ID,COURSE_NAME,SUBJECT_ID,SUBJECT_NAME,GENDER,DOB,CREATED_BY,MODIFIED_BY)"
                                            + "VALUES (NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                                        var params = [faculty.firstName, faculty.lastName, faculty.emailId, faculty.mobileNo, faculty.collegeId, faculty.collegeName, faculty.courseId, faculty.courseName, faculty.subjectId, faculty.subjectName, faculty.gender, faculty.dob, faculty.createdBy,faculty.modifiedBy];
                                        var serv = new BaseService();
                                        serv.executeSQL(sql, params, function (err, result) {
                                            if (err) {
                                                callback(err);
                                            } else {
                                                callback(err, result.insertId);
                                            }
                                        })
                                    } else {
                                        callback(result);
                                    }
                                }
                            });

                        }
                    });
                }
            });

        });
    };

    /**
     * Updates a faculty
     * @param {*} faculty
     * @param {*} callback
     * @param {*} ctx
     */

    update(faculty, callback, ctx) {
        var courseService = new courseService();
        courseService.findByPk(faculty.courseId, function (err, course) {
            if (err) {
                callback(err);
            } else {
                faculty.courseName = course.collegeName;
                var collegeService = new CollegeService();
                collegeService.findByPk(faculty.collegeId, function (err, college) {
                    if (err) {
                        callback(err);
                    } else {
                        faculty.collegeName = college.collegeName;
                        var subjectService = new SubjetServie();
                        subjectService.findByPk(faculty.subjectId, function (err, subject) {
                            if (err) {
                                callback(err);

                            } else {
                                faculty.subjectName = subject.subjectName;
                                var sql = "UPDATE st_faculty SET MODIFIED_DATETIME = NOW(),CREATED_DATETIME=NOW(),FIRST_NAME=?,LAST_NAME=?,EMAIL_ID=?,MOBILE_NO=?,COLLEGE_ID=?,COLLEGE_NAME=?,COURSE_ID=?,COURSE_NAME=?,SUBJECT_ID=?,SUBJECT_NAME=?,GENDER=?,DOB=?,CREATED_BY=?,MODIFIED_BY=NOW() WHERE ID=?"
                                var params = [faculty.firstName, faculty.lastName, faculty.emailId, faculty.mobileNo, faculty.collegeId, faulty.collegeName, faculty.courseId, faculty.courseName, faculty.subjectId, faculty.subjectName, faculty.gender, faculty.dob, faculty.createdBy, faculty.id];
                                serv = new BaseService();
                                serv.executeSQL(sql, params, function (err, result) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(err, result.insertId);
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    }



    /**
     * Delete a faculty and return deleted bean
     * @param {*} id
     * @param {*} callback
     * @param {*} ctx
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_faculty', callback, ctx);
    }

}
//Export faculty service
module.exports = FacultyService;









