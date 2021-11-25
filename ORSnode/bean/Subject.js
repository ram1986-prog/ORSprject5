var BaseBean = require('../bean/BaseBean');

class Subject extends BaseBean {

    constructor() {
        super();
        
        this.subjectName = '';
        this.subjectId = '';
        this.courseName = '';
        this.courseId = '';
        this.description = '';


        
       
    };

    /**
     * Set populateResult into bean.
     * @param {*} res 
     */
    populateResult(res) {
        this.id = res.ID;
        this.subjectName = res.SUBJECT_NAME;
        this.courseId =res.COURSE_ID;
        this.courseName =res.COURSE_NAME;
        this.description =res.DESCRIPTION ;
        this.createdBy = res.CREATED_BY;
        this.modifiedBy = res.MODIFIED_BY;
        this.createdDateTime = res.CREATED_DATETIME;
        
    }

    /**
     * Get request data from body.
     * @param {*} body 
     */
    populateRequest(body) {
        if (body.id) {
            this.id = body.id;
        }
        if (body.subjectName) {
            this.subjectName = body.subjectName;
        }
        if(body.subjectId){
            this.subjectId = body.subjectId;
        }
        if(body.courseId){
            this.courseId =body.courseId;
        }
        if(body.courseName){
            this.courseName = body.courseName;
        }
        if(body.description){
            this.description = body.description;
        }
       
        if (body.size) {
            this.size = body.size;
        }
        if (body.pageNo) {
            this.pageNo = body.pageNo;
        }
    }
}

module.exports = Subject;