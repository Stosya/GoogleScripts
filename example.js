function check() {
  // открытие нужной формы
  var form = FormApp.openById('1MLTycWQx-9KmmTLK21ido5iUrv-AN15j5co7ThkacO4');
  var items = form.getItems(); // получение всех вопросов
  
  // варианты ответов на 1ый и 2ой вопрос
  answer1 = ['<circle cx=50px cy=70px r=40px stroke=grey/>', '<circle cx=40px cy=70px r=50px stroke=grey>', 
             '<circle cx=50px r=40px stroke=grey>', '<circle cx=50px cy=70px r=40px stroke=grey/>',
             '<circle cx=50px cy=70px r=40px stroke=grey/>', 'circle cx=50px cy=70px stroke=grey>',
             '<circle cy=70px r=40px stroke=grey/>', '<circle cx=50px cy=70px r=40px stroke=grey>'];
  answer2 = ['<polygon stroke-width=4px fill=lightgreen points=(110,199 200,43 290,199)/>', 
             '<polygon stroke-width=4 fill=lightgreen points=(110,199 200,43 290,199)/>', 
             'polygon stroke-width=4px points=(110,199 200,43 290,199)/>', 
             '<polygon stroke-width=4px fill=lightgreen />', 
             '<polygon stroke-width=4px fill=lightgreen points=(110,199 200,43 290,199)/', 
             '<polygon stroke-width fill=light points=(110,199 200,43)>'];
  
  // симуляция нагрузки в 200 студентов
  for(var i = 0; i < 200; i++) {
    // обращение к первому вопросу и создание ответа
    var question1 = items[0].asParagraphItem();
    var response1 = question1.createResponse(random(answer1));
    
    // обращение ко второму вопросу и создание ответа
    var question2 = items[1].asParagraphItem();
    var response2 = question2.createResponse(random(answer2));
    
    var formResponse = form.createResponse(); // создание объекта ответа
    
    // включение в объект ответов на 1ый и 2ой вопрос
    formResponse.withItemResponse(response1); 
    formResponse.withItemResponse(response2);
    
    formResponse.submit(); // подверждение создание ответа
  }
  
}



