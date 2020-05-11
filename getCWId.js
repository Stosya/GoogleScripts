function getCWId(courseId) {
  var courseworks = Classroom.Courses.Courseworks.list(courseId).courseworks;
  for each (var cw in courseworks) {
    if(cw.title === "Видео кодеки")
      return cw.id;
  }
}
