//var listReply = $("div.reply_content")
var listFloor = $("div.reply_content").parents('div.cell');
//var pattAta = new RegExp("<\\s*a\\s*href=\"/member/.*?\".*?>(.*?)<\/a>",'g');
var idTopic = RegExp("www\.v2ex\.com/t/(\\d+)").exec(window.location.href)[1];

var mapNameFloorId = {};
var mapNameFloorElem = {};

var url = window.location.pathname;

for (var i=listFloor.length-1;i>=0;i--)
{
  $listAt = $(listFloor[i]).find('div.reply_content').children().filter('a[href^=\'/member\']');
  for (var j=0;j<$listAt.length;j++)
  {
    let atName = $listAt[j].text;
    var jumpLink = document.createElement('a');
    jumpLink.text  = 'Jump';
    jumpLink.href = "/t/"+ idTopic + "#" + mapNameFloorId[atName];
    $listAt[j].after(jumpLink)
    $listAt[j].after(' ')
    let rpl_text = mapNameFloorElem[atName];
    $(jumpLink).click(function() {
      $(rpl_text).fadeTo('fast', 0.3, function(){
        $(rpl_text).css("background-color","#E0E0FF")
      });
      $(rpl_text).fadeTo('fast', 1);
      $(rpl_text).fadeTo('fast', 0.3, function(){
        $(rpl_text).css("background-color","white");
      });
      $(rpl_text).fadeTo('fast', 1);
    });
  }

  var name = $(listFloor[i]).find('strong').text();
  mapNameFloorId[name] = $(listFloor[i]).attr("id");
  mapNameFloorElem[name] = $(listFloor[i]).find("div.reply_content");
}
