*This extension has been based off of another extension: [Card Colors for Trello](https://chrome.google.com/webstore/detail/card-colors-for-trello/nodlpencjjlohojddhflnahnfpfanbjm?hl=en). Therefore, most of the credit for this extension goes to that developer*

In Card Colors for Trello, there are only two options for coloring cards: "Use first label" or "Merge all label colors". I didn't want that. I wanted my Trello cards to be colored based on only two things: whether the label says "Feature" or "Bug".

The way I did this was to implement a "label priority" list ([content.js](https://github.com/derekantrican/TrelloBugFeatureColors/blob/master/js/content.js) line 22). Because of this, you can technically adjust this to accommodate any priority and the cards will be colored based on the color of the label matched first in the priority list.
