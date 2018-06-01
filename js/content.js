// Looking up the css background color is expensive, so cache the results
var colorValueCache = {};
function getColorValues(label) {
  var classes = label.className;
  if (!colorValueCache[classes]) {
    var color = $(label).css("background-color");
    colorValueCache[classes] = color.replace("rgb", "").replace("(", "").replace(")", "").split(",");
    
    colorValueCache[classes][0] = parseInt(colorValueCache[classes][0]);
    colorValueCache[classes][1] = parseInt(colorValueCache[classes][1]);
    colorValueCache[classes][2] = parseInt(colorValueCache[classes][2]);
  }
  
  return colorValueCache[classes];
}

function colorizeCards($cards) {
  $cards.each(function (i, card) {
    var $card = $(card);
    var $labels = $card.find('span.card-label');
	
	var labelPriority = ['Feature', 'Bug'];
	var $labelToUse = null;
  
	for (var i = 0; i < labelPriority.length; i++){
		for (var j = 0; j < $labels.length; j++){
			if ($labels[j].title == labelPriority[i]){
				$labelToUse = $labels[j];
				break;
			}
		}
		
		if ($labelToUse != null)
			break;
	}
	
	if ($labelToUse == null)
		return;

    if ($labels.size()) {
      var r = 0;
      var g = 0;
      var b = 0;
	
	  var colorArray = getColorValues($labelToUse);
      
	  r = colorArray[0];
	  g = colorArray[1];
	  b = colorArray[2];

      // Averaging with #e3e3e3 to lighten the colour and make it appropriate for a background
      r = (r + 227) / 2;
      g = (g + 227) / 2;
      b = (b + 227) / 2;

      var rgb = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';

      if ($card.data('cardColorsForTrello.bgColor') !== rgb) {
        $card.css("background-color", rgb);
        
        $card.data('cardColorsForTrello.bgColor', rgb);
      }

      var $cardDetails = $card.find('.list-card-details');
      if (!$cardDetails.data('cardColorsForTrello.initStyles')) {
        $cardDetails.css("background-color", "transparent");
        
        $cardDetails.data('cardColorsForTrello.initStyles', true);
      }
      
      var $stickers = $card.find('.sticker');
      $.each($stickers, function(i, sticker){
        var $sticker = $(sticker);
        var stickerOpacity = parseInt($sticker.css("top")) > 5 ? ".4" : "1";
        
        if ($sticker.data('cardColorsForTrello.opacity') !== stickerOpacity) {
          $sticker.css("opacity", stickerOpacity);
          
          $sticker.data('cardColorsForTrello.opacity', stickerOpacity);
        }
      });

      var $badges = $card.find('.badges');
      if (!$badges.data('cardColorsForTrello.initStyles')) {
        $badges.css("background-color", "rgba(255,255,255,0.7)");
        $badges.css("padding", "2px 2px 0 2px");
        $badges.css("margin-bottom", "2px");
        $badges.css("border-radius", "3px");
        
        $badges.data('cardColorsForTrello.initStyles', true);
      }

        if ($labels.data('cardColorsForTrello.hidden')) {
          $labels.show();
          
          $labels.data('cardColorsForTrello.hidden', false);
        }
    } else {
      if ($card.data('cardColorsForTrello.bgColor')) {
        $card.css("background-color", "");
        
        $card.data('cardColorsForTrello.bgColor', null);
      }
    }
  });
}

var iteration = 0;
function colorize() {
  // Only process "pirate-aged" cards every 10th iteration
  // When a label is applied, the card should become de-pirated anyway and get processed immediately
  if (iteration % 10 === 0) {
    colorizeCards($('a.list-card'));
  } else {
    colorizeCards($('a.list-card:not(.aging-pirate), a.list-card.aging-level-0'));
  }
  
  iteration++;
  
  setTimeout(colorize, 500);
};

$(document).ready(function() {
  colorize();
});
