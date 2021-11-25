var College = require("../bean/College");
var BaseService = require("./BaseService");

class CollegeService extends BaseService {

    /**
     * Finds college by primary key id
     * returns College object
     */

    /**
    * Finds record by primary key id
    */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_college WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new College(), callback);
    };

    /**
    * Searches and returns list. Applies pagination as well.
     * 
     * @param {*} college 
     * @param {*} callback 
     */
    search(college, pageNo, callback, ctx) {

        var sql = "SELECT * FROM st_college where 1=1 ";

       
        if (college.collegeName) {
            sql += " and COLLEGE_NAME like '" + college.collegeName + "%'";
        }
        
        if (college.city) {
            sql += "and CITY like '" + college.city + "%'";
        }
        if (college.state) {
            sql += "and STATE'" + college.state + "%'";
        }

        super.executeSQLForList(sql, { "pageNo": pageNo }, new College(), callback);

    }

    /**
     * Adds a college and returns primary key
     * 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */


    add(college, callback, ctx) {


//duplicacy.
        var sql = "SELECT * FROM st_college WHERE COLLEGE_NAME= ?";
        var params = [college.collegeName];
        
        super.executeSQLForObject(sql, params, new College(), function (err, result) {
             if (result) {
                callback("college name allready exhists");
            } else if(err="Record not found") {
                var sql = "INSERT INTO st_college (CREATED_DATETIME,MODIFIED_DATETIME,COLLEGE_NAME,COLLEGE_ID,ADDRESS,STATE,CITY,PHONE_NO,CREATED_BY,MODIFIED_BY) "
                    + " VALUES (NOW(),NOW(),?,?,?,?,?,?,?,?)";
                var params = [college.collegeName,college.collegeId, college.address, college.state,
                college.city, college.phoneNo,college.createdBy,college.modifiedBy];
                var baseService = new BaseService();
                baseService.executeSQL(sql, params, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, result.insertId);
                    }

                });
            } else{
                callback(err);
            }
        });





    };

    /**
     * Updates a college 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(college, callback, ctx) {
        var sql = "UPDATE st_college SET  MODIFIED_DATETIME = NOW(),COLLEGE_NAME=?,,COLLEGE_ID=?,ADDRESS=?,STATE=?,CITY=?,PHONE_NO=?,CREATED_BY=?,MODIFIED_BY=?  WHERE ID=?"
        var params = [college.collegeName,college.collegeId, college.address, college.state,
        college.city, college.phoneNo,college.createdBy,college.modifiedBy, college.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }



    /**
     * Delete a college and return deleted bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_college', callback, ctx);
    }
}

//Export college service
module.exports = CollegeService;

