//var listReply = document.getElementsByClassName("reply_content");
var listReply = $("div.reply_content")
var listFloor = $("div.reply_content").parents('div.cell');
var pattAta = new RegExp("<\\s*a\\s*href=\"/member/.*?\".*?>(.*?)<\/a>",'g');
var idTopic = RegExp("www\.v2ex\.com/t/(\\d+)").exec(window.location.href)[1];

var mapNameFloorId = {};
var mapNameFloorElem = {};

var url = window.location.pathname;

for (var i=0;i<listFloor.length;i++)
{
  var name = $(listFloor[i]).find('strong').text();
  mapNameFloorId[name] = $(listFloor[i]).attr("id");
  mapNameFloorElem[name] = $(listFloor[i])
}

var $listAt = listReply.children().filter('a[href^=\'/member\']');

for (var i=0;i<$listAt.length;i++)
{
  let atName = $listAt[i].text;
  var jumpLink = document.createElement('a');
  jumpLink.text  = 'Jump';
  jumpLink.href = "/t/"+ idTopic + "#" + mapNameFloorId[atName];
  $listAt[i].after(jumpLink)
  $listAt[i].after(' ')

  $(jumpLink).click(function() {
    var $rpl_text = mapNameFloorElem[atName].find("div.reply_content");
    $rpl_text.fadeTo('fast', 0.3, function(){
      $rpl_text.css("background-color","#E0E0FF")
    });
    $rpl_text.fadeTo('fast', 1);
    $rpl_text.fadeTo('fast', 0.3, function(){
      $rpl_text.css("background-color","white");
    });
    $rpl_text.fadeTo('fast', 1);
  });
}
