function getSubId(courseId, courseworkId, studentEmail) {
  var studentId;
  var subId;
  var listOfStudents;
  var listOfSubs;
  var response;
  
  //find student id
  var pageTokenStudents = Classroom.Courses.Students.list(courseId).nextPageToken;
  while(pageTokenStudents) {
    response = Classroom.Courses.Students.list(courseId, {pageToken: pageTokenStudents});
    listOfStudents = response.students;
    for each(var student in listOfStudents)
      if(student.profile.emailAddress === studentEmail) {
        studentId = student.profile.id;
        break;
      }
    pageTokenStudents = response.nextPageToken;
  }
  Logger.log(studentId);
  
  //find submission for this student
  var pageTokenSubs = Classroom.Courses.CourseWork.StudentSubmissions.list(courseId, courseworkId).nextPageToken;
  if(pageTokenSubs === undefined) {
    listOfSubs = Classroom.Courses.CourseWork.StudentSubmissions.list(courseId, courseworkId).studentSubmissions;
    for each(var sub in listOfSubs)
      if(sub.userId === studentId) {
        subId = sub.id;
        break;
      }
  }
  else {
    var pageTokenSubs = Classroom.Courses.CourseWork.StudentSubmissions.list(courseId, courseworkId).nextPageToken;
    Logger.log(typeof pageTokenSubs);
    while(pageTokenSubs) {
      response = Classroom.Courses.CourseWork.StudentSubmissions.list(courseId, courseworkId, {pageToken: pageTokenSubs});
      listOfSubs = response.studentSubmissions;
      for each(var sub in listOfSubs)
        if(sub.userId === studentId) {
          subId = sub.id;
          break;
        }
      pageTokenSubs = response.nextPageToken;
    }
  }
  Logger.log(subId);
  
  return subId
}
