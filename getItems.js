function getItems() {
  var form = FormApp.openByUrl('https://docs.google.com/forms/d/1MLTycWQx-9KmmTLK21ido5iUrv-AN15j5co7ThkacO4/edit'); 
  var formItems = form.getItems(); //все айтемы формы
  for(var i = 0; i < formItems.length; i++) {
    var item = formItems[i];
    Logger.log('item #%s is: %s', item.getId(), item.getTitle()); //выводим id и название каждого айтема
  }
}
