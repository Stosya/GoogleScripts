function createResponses() {
  var form = FormApp.openByUrl("https://docs.google.com/forms/d/1FL8HfFepp8pLJHdPc-oN6GRj1AbWUCgupx_lwV56MCc/edit");
  var itemId1 = 1.93574675E8;
  var itemId2 = 7.82547036E8;
  var item1 = form.getItemById(itemId1).asParagraphTextItem();
  var item2 = form.getItemById(itemId2).asParagraphTextItem();
  
  var answerVariants1 = ['<circle cx="50" cy="70" r="40" style="stroke: red; stroke-width: 3; fill: #000080; stroke-dasharray: 15 5"/>',
                         '<circle r="40" cx="50" cy="70" style="stroke: red; stroke-width: 3; fill: #000080; stroke-dasharray: 15 5"/>',
                         'circle', '<circle cx="50" cy="70" r="40" style="stroke: red; stroke-width: 3; fill: #000080; stroke-dasharray: 15 5"/', 
                         '<circle cx="50" cy="70" r="40" style="stroke: red; stroke-width: 3: fill: #000080; stroke-dasharray: 15 5"/>', 
                         'svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" version="1.1"><rect width="200" height="100" stroke="black" stroke-width="6" fill="green"/></svg>'];
  var answerVariants2 = ['<svg width="400" height="200">',
                         '<rect x="1" y="1" width="180" height="180" stroke="gray" stroke-dasharray="10 5" fill="tomato" stroke-width="2"/>',
                         '<circle cx="309" cy="91" r="90" stroke="gray" fill="lightblue" stroke-dasharray="10 5" stroke-width="2"/>',
                         '<polygon points="200,43 290,199 110,199" stroke="darkgray" fill="lightgreen" stroke-width="4"/>', '</svg>',
                         '<svg width="400" height="200">\n<rect x="1" y="1" width="180" height="180" stroke="gray" stroke-dasharray="10 5" fill="tomato" stroke-width="2"/>\n<circle cx="309" cy="91" r="90" stroke="gray" fill="lightblue" stroke-dasharray="10 5" stroke-width="2"/>\n<polygon points="200,43 290,199 110,199" stroke="darkgray" fill="lightgreen" stroke-width="4"/>\n</svg>'];
  
  for(var i = 0; i < 150; i ++) {
    var formResponse = form.createResponse();
    var index1 = Math.floor(Math.random() * answerVariants1.length);
    var index2 = Math.floor(Math.random() * answerVariants2.length);
    
    var itemResponse1 = item1.createResponse(answerVariants1[index1]);
    var itemResponse2 = item2.createResponse(answerVariants2[index2]);
    
    formResponse.withItemResponse(itemResponse1);
    formResponse.withItemResponse(itemResponse2);
    formResponse.submit();
    
    Utilities.sleep(5*1000);
  }
  
}

