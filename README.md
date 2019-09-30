# Memory Game Project

![alt text](/img/memorygame.png)

### Table of Contents

* [Game Play](#gameplay)
* [Installation](#installation)
* [Know Bugs](#bugs)
* [Instructions](#instructions)
* [Contributing](#contributing)


Memory Game is a simple card memory game based in JavaScript. It is a project created as part of the [Udacity Front-end Nanaodegree] program. The game randomly shuffles the cards. A player wins once all cards have successfully been matched. It tests a player's ability to memorize card placement and allows multiple tries until all the cards have been matched.


# Game Play

  - Start a game by clicking on a card. The card will "turn over", displaying it's symbol.
  - Once the first card is turned over the timer starts. Once the game is won, the timer stops.
  - The game is won, when all of the cards are turned over and matched (turn green).
  - When two cards are turned over, if both cards have the same symbol, they are a match. Matched cards remain turned over.
  - When two cards are turned over, if they have different symbols, they do NOT match and will be turn back over to their blank side.
  - Every time two cards are turned over, it counts as 1 move, whether the cards match or not.
  - The game displays a star rating (from 0 to 3). At the beginning of a game, it starts 3 stars and goes down based on player performance. At some point, error moves will result in half star deductions.
  - When a player wins the game, a popup appears to congratulate, provide stats and offer to play again.
  - Reset the game at any point by pressing the restart button.


## Installation



Download the [zip] from GitHub or clone from the repository
```sh
$ git clone https://github.com/katriJS/fend-prjt-memory-game
```


## Bugs

This memory game projects currently has the following known bug(s):
  - Allows 3rd card to be turned over but does not affect game play.



## Project Starter

### Instructions
The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

### Contributing

This repository includes the starter code for _all_ Udacity students.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).


## Todos

 - Add card 'turn', 'match' and 'error' animation
 - Add game modes i.e. 'Easy' and 'Difficult'
 - Use logger
 - Optimize for mobile browsers



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Udacity Front-end Nanaodegree]: <https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [zip]: <https://github.com/katriJS/fend-prjt-memory-game/archive/master.zip>
