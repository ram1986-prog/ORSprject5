var BaseBean = require("../bean/BaseBean");
var DataUtility = require("../utility/Datautility");

class Faculty extends BaseBean {

        constructor() {
                super();
                this.id='0';
                this.firstName = "";
                this.lastName = "";
                this.emailId = "";
                this.mobileNo = "";
                this.collegeId = "";
                this.collgeName = "";
                this.courseId = "";
                this.courseName = "";
                this.subjectId = "";
                this.subjectName = "";
                this.gender = "";
                this.dob = "";


        };
        /**
         * Set populateResult into bean
         * @param {*} response
         */
        populateResult(res) {
                this.id = res.ID;
                this.firstName = res.FIRST_NAME;
                this.lastName = res.LAST_NAME;
                this.emailId = res.EMAIL_ID;
                this.mobileNo = res.MOBILE_NO;
                this.collegeId = res.COLLEGE_ID;
                this.collegeName = res.COLLEGE_NAME;
                this.courseId = res.COURSE_ID;
                this.courseName = res.COURSE_NAME;
                this.subjectId = res.SUBJECT_ID;
                this.subjectName = res.SUBJECT_NAME;
                this.gender = res.GENDER;
                this.dob = res.DOB;
                this.createdBy = res.CREATED_BY;
                this.modifiedBy = res.MODIFIED_BY;
                this.createdDateTime = res.CREATED_DATETIME;
                this.modifiedDateTime = res.MODIFIED_DATETIME;




        };
        /**
         * Get request data from body
         * @param {*} body
         * 
         */
        populateRequest(body) {

                if (body.id) {
                        this.id = body.id;
                }
                if (body.firstName) {
                        this.firstName = body.firstName;
                }
                if (body.lastName) {
                        this.lastName = body.lastName;
                }

                if (body.emailId) {
                        this.emailId = body.emailId;
                }
                if (body.mobileNo) {
                        this.mobileNo = body.mobileNo;
                }
                if (body.collegeId) {
                        this.collegeId = body.collegeId;
                }
                if (body.collegeName) {
                        this.collegeName = body.collegeName;
                }
                if (body.courseId) {
                        this.courseId = body.courseId;
                }
                if (body.courseName) {
                        this.courseName = body.courseName;
                }
                if (body.subjectId) {
                        this.subjectId = body.subjectId;
                }
                if (body.subjectName) {
                        this.subjectName = body.subjectName;
                }
                if (body.gender) {
                        this.gender = body.gender;
                }
                if (body.dob) {
                        this.dob = body.dob;
                }
                if (body.size) {
                        this.size = body.size;
                }
                if (body.pageNo) {
                        this.pageNo = body.pageNo;
                }


        };


}
module.exports = Faculty;