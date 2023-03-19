/*
    author : @Farman Saleh
 	  created date   : March 19/2023
 	  github : github.com/farmansaleh
**/

//this function will call when we key up 
$("#search-question").keyup(function(){
  findTextWithHightlight($("#search-question").val());
});
function findTextWithHightlight(text) {
    //hold value which we enter in search box
    var searchword = text;
    var reg=new RegExp(searchword,"ig");

    var count = 0;

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
                  count++;           
                  return "<span class='highlight' id='index"+count+"'>"+match+"</span>";
                }
                else{
                  return match;
                }
              })
            );
          }
        }
      }
    });
    //add class current-highligh in first searched element consider as a target starting position
    $("#index1").removeClass("highlight").addClass("current-highlight");
    //append total searched word
    $("#total_position").text(count);
    //if not matched words then appned 0 count
    $("#current_position").text(count>0?1:0);

    //if matched word count is > 0 then move up down position button is enabled otherwise disabled
    if(count > 0){
      $(".arrow-btn").prop('disabled',false);
    }else{
      $(".arrow-btn").prop('disabled',true);
    }
}

$("#upper_position").click(function() {
  //when we click on upper arrow button, it will move previous position 
  var current_position = parseInt($("*.current-highlight").attr("id").substring(5));

  toggleHighlightClass(current_position,(current_position-1));
});
$("#down_position").click(function() {
  //when we click on down arrow button, it will move next position
  var current_position = parseInt($("*.current-highlight").attr("id").substring(5));

  toggleHighlightClass(current_position,(current_position+1));
});
function toggleHighlightClass(current_position,move_position){
  var total_position = parseInt($("#total_position").text());

  //if current moved position count < 1 then move position will be reset and set total position count otherwise set 1 position
  if(move_position < 1){
      move_position = total_position;
  }else if(move_position > total_position){
      move_position = 1;
  }

  $("#current_position").text(move_position);

  $("#index"+current_position).toggleClass("highlight current-highlight");
  $("#index"+move_position).toggleClass("highlight current-highlight");
}
//close search box when we click on close button
$("#close_btn_").click(function() {
  $(".search-box").css({"display":"none"});
  findTextWithHightlight('');
});