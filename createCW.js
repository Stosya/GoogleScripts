function createCW() {
  var courseId = 31962962261;
  var corsework = {
    "title" : "Другие печатающие устройства",
    "description" : "В этом уроке вы познакомитесь с другими представителями печатающих устройств, помимо принтеров.",
    "materials" : [{'link':{'url':'https://docs.google.com/forms/d/1CsYkNNLYHwDF_D6p3b3VJQeJlU2NArVGaBDQlKCazis/edit'}}],
    'state' : 'PUBLISHED',
    'maxPoints' : 2,
    'workType' : 'ASSIGNMENT'
  }
  Classroom.Courses.CourseWork.create(corsework, courseId);
}
