function checkTask() {
  var form = FormApp.openByUrl('https://docs.google.com/forms/d/1MLTycWQx-9KmmTLK21ido5iUrv-AN15j5co7ThkacO4/edit');
  var formResponses = form.getResponses();
  var responseNumber = formResponses.length - 1;
  
  var itemId = 1.023562151E9;
  var formResponse = formResponses[responseNumber];
  var item = form.getItemById(itemId);
  var points = item.asParagraphTextItem().getPoints();
  var itemResponse = formResponse.getGradableResponseForItem(item);
  var answer = itemResponse.getResponse().toLowerCase();

  itemResponse.setScore(checkAnswer(answer, points, item));
  formResponse.withItemGrade(itemResponse);
  form.submitGrades(formResponses);
  
 
  function checkAnswer(answer, points, item) {
    var feedback;
    if(answer.length === 0) {
      feedback = FormApp.createFeedback().setText("Пусто :(").build();
      item.asParagraphTextItem().setGeneralFeedback(feedback);
      return 0
    }
    
    var parameters = [/out\.mp4"?$/, /^ffmpeg /, /-i +in\.[\w\d]{3,4}/, /-c:v +(h264|libx264)/, /-b:v +(5000k|5m|5000000) /, 
                      /-minrate +(5000k|5m|5000000) /, /-maxrate +(5000k|5m|5000000) /, /-bufsize +(\d{3,4}k|\dm|\d{5,7}) /, 
                      /-profile:v +high /, /-level(:v)? +4\.?2 /, /-s +1280x720 /, /-r +25 /, /-bf +2 /, /-g(op)? +(12|13|25\/2|12[,\.]5) /,
                      /-b:a +128(k|000) /, /-(ar|r:a) +96(k|000) /];
    var feedbackMessages = ["Неверно указан выходной файл.", "Ошибка в начале команды.", "Неверно указан входной файл.",
                            "Неверно указан видео кодек.", "Неверно указан видео битрейт.", "Неверно указан видео битрейт.",
                            "Неверно указан видео битрейт.", "Неверно указан видео битрейт.", "Неверно указан профиль.",
                            "Неверно указан уровень.", "Неверно указан размер.", "Неверно указана частота кадров.", "Неверно указаны В-кадры.", 
                            "Неверно указана длина GOP.", "Неверно указан аудио битрейт.", "Неверно указана аудио дискретизация."];
    var patt;
    for(var i = 0; i < 16; i++) {
      patt = parameters[i];
      patt.compile(patt);
      if(answer.search(patt) === -1) {
        feedback = FormApp.createFeedback().setText(feedbackMessages[i]).build();
        item.asParagraphTextItem().setGeneralFeedback(feedback);
        return 0
      }
      answer = answer.replace(patt, '');
    }
    
    //аудио кодек
    var matching = answer.match(/-c:a +(aac|libvo_aacenc|libfdk_aac|libfaac) /);
    if(answer.search(/-c:a +(aac|libvo_aacenc|libfdk_aac|libfaac) /) === -1) {
      feedback = FormApp.createFeedback().setText("Неверно указан аудио кодек.").build();
      item.asParagraphTextItem().setGeneralFeedback(feedback);
      return 0
    }
    answer = answer.replace(/-c:a +(aac|libvo_aacenc|libfdk_aac|libfaac) /, '');
    if(matching[0] === '-c:a aac ') {
      if(answer.search(/-strict /) != -1) 
        answer = answer.replace(/-strict /, '');
      if(answer.search(/(-2|experimental) +/) != -1) 
        answer = answer.replace(/(-2|experimental) +/, '');
    }
    
    if(answer.length != 0 && answer.search(/^\s*(-f\s+mp4)?\s*$/) === -1) {
      feedback = FormApp.createFeedback().setText("В команде есть что-то лишнее.").build();
      item.asParagraphTextItem().setGeneralFeedback(feedback);
      return 0
    }
    
    feedback = FormApp.createFeedback().setText("Вы великолепны!").build();
    item.asParagraphTextItem().setGeneralFeedback(feedback);
    return points 
  }

}


