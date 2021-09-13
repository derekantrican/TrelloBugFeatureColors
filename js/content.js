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

    if (element.classList.contains("list-card-labels")) {
        if (element.parentElement != null) {
            assignColorFromLabels(element.parentElement, element.querySelectorAll("span.card-label"));
        }
    }

    if (element.classList.contains("list-card")) {
        var cardElement = element.querySelector(".list-card-details");
        if (cardElement != null) {
            assignColorFromLabels(cardElement, element.querySelectorAll(".list-card-labels > span.card-label"));
        }
    }
}

function assignColorFromLabels(cardElement, labels){
    if (labels != null){
        var matchingLabels = Array.from(labels).filter(l => l.title == 'Bug' || l.title == 'Feature');
        if (matchingLabels.length > 0){
            var labelForColor = matchingLabels[0];
            cardElement.style.background = "";
            cardElement.style.backgroundColor = window.getComputedStyle(labelForColor).backgroundColor.replace("rgb", "rgba").replace(")", ",0.5)");
        }
        else{
            cardElement.style.background = "";
            cardElement.style.backgroundColor = "";
        }
    }
}

init();