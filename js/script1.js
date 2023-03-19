/*
    author : @Farman Saleh
 	  created date   : March 19/2023
 	  github : github.com/farmansaleh
**/


//this function will call when we key up 
function findAndHighlightWords() {
      
    //hold value which we enter in search box
    var searchword = $("#search-question").val();
    var reg=new RegExp(searchword,"ig");

    //iterate loop on every card
    $("#faq-question-list > div.card").each(function(i){
      //target question and answer in that card
      var target = $(this).children("div").find("span.question,span.answer");
      
      if(target!=null){
        //iterate loop on all question and answer
        for(var i=0;i<target.length;i++){
  
          if(reg){
            //it will check that entered word is match or not in this particular target element
            $(target[i]).html($(target[i]).text().replace(reg,function(match){
                //replace match word into tag for apply css if it's matched otherwise it will replaced original content
                if(match){ 
                  return "<span class='highlight'>"+match+"</span>";
                }else{
                  return match;
                }
              })
            );
          }
        }
      }

    });
}