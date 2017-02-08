//var listReply = $("div.reply_content")
var listFloor = $("div.reply_content").parents('div.cell');
//var pattAta = new RegExp("<\\s*a\\s*href=\"/member/.*?\".*?>(.*?)<\/a>",'g');
var idTopic = RegExp("www\.v2ex\.com/t/(\\d+)").exec(window.location.href)[1];

var mapNameFloorId = {};
var mapNameFloorElem = {};
var hoverDisp = document.createElement('div');
hoverDisp.style.display = 'none';
hoverDisp.id = 'v2athelper_hover';
hoverDisp.style.position = 'fixed';
hoverDisp.style.border = '1px solid gray';
hoverDisp.style.background = 'white'
hoverDisp.classList.add('cell')
document.body.append(hoverDisp);

function genJumpLink(atName, idTopic, jumpFloor){
    var jumpLink = document.createElement('a');
    jumpLink.text  = 'Jump';
    jumpLink.href = "/t/"+ idTopic + "#" + jumpFloor;
    return jumpLink;
}

for (var i=listFloor.length-1;i>=0;i--)
{
  $listAt = $(listFloor[i]).find('div.reply_content').children().filter('a[href^=\'/member\']');
  for (var j=0;j<$listAt.length;j++)
  {
    let atName = $listAt[j].text;
    jumpLink = genJumpLink(atName, idTopic, mapNameFloorId[atName])

    $listAt[j].after(jumpLink)
    $listAt[j].after(' ')

    let rplContElm = mapNameFloorElem[atName];
    $(jumpLink).click(function() {
      $(rplContElm).fadeTo('fast', 0.5, function(){
        $(rplContElm).css("background-color","#E0E0FF")
      });
      $(rplContElm).fadeTo('fast', 1);
      $(rplContElm).fadeTo('fast', 0.5, function(){
        $(rplContElm).css("background-color","white");
      });
      $(rplContElm).fadeTo('fast', 1);
    });

    $(jumpLink).mouseenter(function(){
      with ($(hoverDisp)){  
        css("display","block"); 
        css("left", event.clientX); 
        css("top", event.clientY + 10); 
      }
      $(hoverDisp).html(rplContElm.parents('.cell').html())
    });

    $(jumpLink).mouseleave(function(){
      $(hoverDisp).css("display","none"); 
    });
  }

  var name = $(listFloor[i]).find('strong').text();
  mapNameFloorId[name] = $(listFloor[i]).attr("id");
  mapNameFloorElem[name] = $(listFloor[i]).find("div.reply_content");
}

