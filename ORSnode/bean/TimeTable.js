var BaseBean = require('../bean/BaseBean');
var DataUtility = require("../utility/DataUtility");

class TimeTable extends BaseBean{
    constructor(){
        super();
        this.Id = '';
        this.collegeName='';
        this.collegeId ='';
        this.courseName ='';
        this.courseId = '';
        this.subjectName ='';
        this.subjectId ='';
        this.semester = '';
        this.examDate ='' ;
        this.examTime = '';
        

    }
    /**
     * ser populate result into bean.
     * @param {*} res
     */
     populateResult(res){
    console.log('hello');
this.id = res.ID;
this.collegeName=res.COLLEGE_NAME;
this.collegeId=res.COLLEGE_ID;
this.courseName =res.COURSE_NAME;
this.courseId =res.COURSE_ID;
this.subjectName =res.SUBJECT_NAME;
this.subjectId =res.SUBJECT_NAME ;
this.semester =res.SEMESTER;
this.examDate = res.EXAM_DATE;
this.examTime = res.EXAM_TIME;

this.modifiedBy =res.MODIFIED_BY;
this.createdBy =res.CREATED_BY;
this.createdDateTime =res.CREATED_DATETIME;
this.modifiedDateTime =res.MODIFIED_DATETIME;

};
/**
 * 
 * get request data from body.
 * @param {*} body
 */
populateRequest(body){
    if(body.id){
        this.id = body.id;
    }
    if(body.collegeId){
        this.collegeId = body.collegeId;
    }
    if(body.collegeName){
        this.collegeName =body.collegeName;

    }
    if(body.courseId){
        this.courseId =body.courseId;
    }
    if(body.courseName){
        this.courseName = body.courseName;
    }
    if(body.subjectName){
        this.subjectName = body.subjectName;
    }
    if(body.subjectId){
        this.subjectId = body.subjectId;
    }
    if(body.semester){
        this.semester = body.semester;
   }
    if(body.examDate){
        this.examDate = body.examDate;
    }
    if(body.examTime){
        this.examTime = body.examTime;
    }
    
};

}
module.exports = TimeTable;