'use strict';

function init(){
  (new MutationObserver(function(wrappersTemplates){
    wrappersTemplates.forEach(colorCards);
  })).observe(document.body, {
    childList : true,
    subtree : true
  });
}

function colorCards(template) {
    var element = template.target;

    var relatedCard = getCard(element);
    if (relatedCard) {
        assignColorFromLabels(relatedCard, relatedCard.querySelectorAll(".list-card-front-labels-container button"));
    }
}

function getCard(element) {
    if (element.classList.contains('list-card-details'))
        return element;

    var parent = element.parentElement;
    while (parent != null) {
        if (parent.classList.contains('list-card-details'))
            return parent;

        parent = parent.parentElement;
    }
}

function assignColorFromLabels(cardElement, labels){
    if (labels != null && labels.length > 0){
        var matchingLabels = Array.from(labels).filter(l => l.textContent == 'Bug' || l.textContent == 'Feature');
        if (matchingLabels.length > 0){
            var labelForColor = matchingLabels[0];
            cardElement.style.background = "";
            cardElement.style.backgroundColor = window.getComputedStyle(labelForColor).backgroundColor.replace("rgb", "rgba").replace(")", ",0.5)");
        }
        else { //This is needed in case a label is removed from the card (will reset the card's color)
            cardElement.style.background = "";
            cardElement.style.backgroundColor = "";
        }
    }
}

init();