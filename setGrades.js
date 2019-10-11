function setGrades(e) {
  //check if setting grades is needed
  var values = e.values[2];
  if(values !== "") {
    
    //get edited range, numbers of edited sheet and row
    var range = e.range.getValues();
    var index = e.range.getSheet().getIndex();
    var row = e.range.getRow();
    
    //get student's email
    var studentEmail = range[0][1];
    
    //get all needed parameters for setting grades
    var courseId = 23843643021;
    var courseworkId = getCWId(index);
    var subId = getSubId(courseId, courseworkId, studentEmail);
    var points = range[0][2];
    
    //set grades
    var resource = {'draftGrade' : points};
    var updateMask = {'updateMask' : 'draftGrade'};
    var result = Classroom.Courses.CourseWork.StudentSubmissions.patch(resource, courseId, courseworkId, subId, updateMask);
    Logger.log(result);
    resource = {'assignedGrade' : points};
    updateMask = {'updateMask' : 'assignedGrade'};
    result = Classroom.Courses.CourseWork.StudentSubmissions.patch(resource, courseId, courseworkId, subId, updateMask);
    Logger.log(result);
  }
}
