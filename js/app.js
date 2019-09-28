// TODO: Check for page load???
//document.addEventListener('DOMContentLoaded', function () {
let testMode = false;
/*
 * Create a list that holds all of your cards
 */
 const allCards = document.querySelectorAll('.card');
 const deck = document.querySelector('.deck');
 const moveTracker = document.querySelector('.moves');
 const reloader = document.querySelector('.restart');
 const stars = this.stars = document.querySelectorAll('.fa-star');
 const modal = document.querySelector('.modal');
 const openCardLimit = 2;
 const totalCards = 16;

 let totalMatchedCards = 0;
 let moveCounter = 0;
 let timeInSeconds = 0;
 let timer = new Timer();
 let scorer = new StarRatings();
 let totalStars = 3;
 let mode = 'easy';




 resetGame();

///////////////////////////////////
// Listeners
///////////////////////////////////

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 deck.addEventListener('click', clickResponseAction);
 reloader.addEventListener('click', resetGame);

 window.onclick = function(event) {
  if (event.target == modal) {
    resetGame();
  }
}






 ///////////////////////////////////
 // Actions
 ///////////////////////////////////

 /*
  * Click Response Action
  *    - An event listener function to trigger all other actions
  *
  * Verifies that a card is the event target then checks if the card is already open.
  * If the card is not already open 'showCardAction' is called.
  * Else the 'hideCardAction' function is called
  */
function clickResponseAction() {
  if(event.target.classList.contains("card")) {
    timer.start();
    scorer.start(mode);
    showCardAction(event.target);

    if(openCards.isFull()) {
      updateMoveCounter();
      if(isMatchPair()) {
        displayCardMatchAction();
        if(totalMatchedCards == totalCards) {
          timer.stop();
          scorer.stop();
          displayWinnerScore();
       }
     }//debug: can still turn over a 3rd card during time interval
      else {   hideCardAction();   }
    }
  }

}


/*
 * Show Card Action
 *      - Displays the card symbol and changes the card colorif the card is
 *        NOT opened or matched
 *
 * Takes in a card element as a parameter and checks class list of
 * the given element for 'open' and 'match' classes. If neither class is present:
 *    - the card element is pushed onto the openCards array unless the array is full.
 *    - the 'open' and 'show' classes are added to the elements class list unless
 *      openCards array is full
 */
function showCardAction(cardElement) {
  if(!cardElement.classList.contains("open") &&
     !cardElement.classList.contains("match")) {

    if(openCards.pushToLimit(cardElement)) {
      log('Open cards: '+openCards.length);
      cardElement.classList.add("open","show");
    }
  }
}

/*
 * Hide Card Action
 *      - Hides the card symbol and changes the card color
 *
 * Calls the resetOpenCards funtion after 1 second to hide the cards.
 */
function hideCardAction() {
    console.log("hideCardAction: num cards = ",openCards.length);
    setTimeout(resetOpenCards, 1000);

}


/*
 * Display Card Match Action
 *      - This action changes the card color to indicate a match.
 *
 * The function loops through openCards, removes 'open' and 'show' classes'
 * and adds 'match' class to each card element in openCards array.
 */
function displayCardMatchAction() {
  openCards.forEach(function(card) {
    card.classList.remove('open','show');
    card.classList.add('match');
  });

  totalMatchedCards += openCards.length;
  log("totalMatchedCards = "+totalMatchedCards);
  // TODO: Add animation
  openCards = [];
}


function resetGame(cards){
  //Reset Timer and Star Ratings
  timer.reset();
  scorer.reset();

  //Reset Move counter
    moveCounter = 0;
    moveTracker.textContent = moveCounter;

  //Reset Deck
  allCards.forEach(function(card) {
    card.className = "card";
  });

  shuffleDeck();
  totalMatchedCards = 0;
  openCards = [];

  //Hide modal
  modal.style.display = "none";

}

///////////////////////////////////
// Deck Functionality
///////////////////////////////////

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function shuffleDeck() {
   let cardSymbols = deck.querySelectorAll('i');
   cardSymbols = shuffle(cardSymbols);
   log(cardSymbols);

 }



///////////////////////////////////
// Active Card(s) Functionality
//
// TODO: Encapsulate in CardHolder Object
///////////////////////////////////

/*
 * The 'isMatchPair' method returns TRUE when two cards have the
 * same symbol - a match!
 */
function isMatchPair() {
  const firstCardSymbol = openCards[0].firstElementChild.className;
  const secondCardSymbol = openCards[1].firstElementChild.className;
  log(firstCardSymbol+"?"+secondCardSymbol);
  return firstCardSymbol === secondCardSymbol;

}

/*
 * Resets the open cards by restoring their original 'hidden' state
 * Reassigns openCards to empty array.
 */
function resetOpenCards() {
  openCards.forEach(function(card) {
    card.className = "card";
  });

  openCards = [];
}




///////////////////////////////////
// Scoring Functionality
///////////////////////////////////

/*
 * The 'updateMoveCounter' function increments the moveCounter and updates
 * the text content of the moves element with the new value.
 */
function updateMoveCounter(){
    moveCounter++;
    moveTracker.textContent = moveCounter;
}




function displayWinnerScore() {
  // TODO: Show modal with congratulatory message, stats,
  //       and play again option
  console.log("Congratulations! You won!");
  console.log("with ", moveCounter, " Moves and ", totalStars, " Stars!");
  const modalMessage = document.querySelector(".message");
  const modalBody = document.querySelector('.modal-body');

  let message = "You won with " + moveCounter + " Moves";
//

  const list = modalBody.getElementsByClassName('stars')[0];
  let currentStars = list.children;
  //In case of Reset, remove any previous Star Ratings
  console.log('list length = ',list.children.length);
  /*for (let i = 0; i <= list.children.length; i++) {
    list.children[i].remove();
    console.log('remove child');
  }*/
  while (list.children.length > 0){
    list.lastElementChild.remove();
  }

  if(totalStars){
      message = message + " and " + totalStars + " Stars";



      stars.forEach(function(star) {
        let classes = star.classList;
        let listItem = document.createElement('li');
        let mStar = document.createElement('i');
        for (let i = 0; i<classes.length; i++) {
          mStar.classList.add(classes[i]);
        }

        //mStar.setAttribute('style', starStyle);
        listItem.appendChild(mStar);

      //  listItem.setAttribute('style', listStyle);
        list.appendChild(listItem);
      });


  }

//Update message
  message = message+"!";
  modalMessage.textContent = message;

//display modal
  modal.style.display = "flex";

}


///////////////////////////////////
// Timer Functionality
///////////////////////////////////
// TODO: Consider reset game after 5 min lapse/count-down timer instead
function Timer() {
  //this.timeDisplay = 0;
  let intervalId = 0;
  let hours = minutes= seconds = 0;
  let totalSecs = totalMins = 60;


  let padTime = function(i) {
    //log(i);
    return ('00'+i).substr(-2);
  };

  let displayTime = function(h,m,s) {
    h = padTime(h);
    m = padTime(m);
    s = padTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    log("after pad: "+h+ ":"+ m+ ":"+ s);
  };

  let update = function() {

    if(seconds == totalSecs-1) {
      seconds = 0;
      minutes++;
    }
    else{  seconds++;  }

    if(minutes == totalMins-1) {
      minutes=0;
      hours++;
    }

    displayTime(hours,minutes,seconds);
    timeInSeconds++;
  };


  this.start = function() {
    if(!intervalId) {
      intervalId = setInterval(update, 1000);
    }
  };

  this.stop = function() {
    if(intervalId) {
      clearInterval(intervalId);
      intervalId = 0;
    }
  };

  this.reset = function() {
    stop();
    hours = minutes = seconds = 0;
    displayTime(hours,minutes,seconds);
  };

}

///////////////////////////////////
// Star Ratings
///////////////////////////////////
function StarRatings() {

  let starsArray = Array.from(stars);
  let intervalId = 0;
  let timeThreshold = 5;
  let movesThreshold = 6;
  let errorThreshold = 4;


  let updateEasyMode = function() {

    //Do if totalStars != 0
    if(totalStars) {
      log("thres: ",timeThreshold," | time: ",timeInSeconds);

      let matchedCards = deck.querySelectorAll('.match');
      let correctMoves = matchedCards.length > 0 ? matchedCards.length/2 : 0;
      //let errorMoves = movesCounter >= correctMoves ? (movesCounter - correctMoves) : (movesCounter - correctMoves)*-1);
      let errorMoves = Math.abs(moveCounter - correctMoves);
      console.log("# of Moves: ",moveCounter,"  errors made: ",errorMoves,"  error threshold: ",errorThreshold);
      //Dock points for errors made every 5 sec interval
    //  if(timeInSeconds > timeThreshold) {
        if( errorMoves > errorThreshold) {
          //dock a point
          let star = starsArray[starsArray.length-1];

          if (star.classList.contains('fa-star')) {
            star.classList.remove('fa-star');
            star.classList.add('fa-star-half');
          }
          else{
            star.classList.remove('fa-star-half');
            starsArray.pop();
          }

          //decrement the total remaining stars counter by .5
          totalStars = totalStars - .5;

          //new threshold is the intial possible moves - current possible moves
          errorThreshold += 2;



        }

      }
      else {
        //Stop executing update since there are no stars left
        stop();
      }

  };

  let updateDifficultMode = function() {

    // TODO: decrement stars based on time and number of error moves

    /*
    if(totalStars) {
      log("thres: ",timeThreshold," | time: ",timeInSeconds);


    }
    else {
      //Stop executing update since there are no stars left
      stop();
    }
    */

  };


  this.start = function(mode) {
    if(!intervalId) {
      switch (mode){
        case 'difficult':
            intervalId = setInterval(updateDifficultMode, 1000);
          break;

        default:
          intervalId = setInterval(updateEasyMode, 1000);
          break;

      }
    }
  };

  this.stop = function() {
    if(intervalId) {
      clearInterval(intervalId);
      intervalId = 0;
      timeThreshold = 5;
      movesThreshold = 6;
      errorThreshold = 4;
    }
  };

  this.reset = function() {
    stop();

    //Display all stars in score panel
    //let allStars = stars;
    stars.forEach(function(star) {
      star.className = 'fa fa-star';
    });

    //reset counters
    totalStars = 3;
    timeInSeconds = 0;

    timeThreshold = 15;
    movesThreshold = 16;
    starsArray = Array.from(stars);
  };


}

 ///////////////////////////////////
 // Helpers
 ///////////////////////////////////


//TODO: Encapsulate in CardHolder Object
 /*
 * Add method "pushToLimit" to built-in Array Object to enforce size constraint
 * This method will push objects onto the array and return TRUE
 * until the predefined limit of 2 is reach. At which point the method will NOT
 * add the object to the array and will return FALSE.
 *
 * NOTE: While modifying native objects is generally bad practice due to possible
 * future naming collisions and maintainability particularly in a multi-developer
 * environment(Maintainable Javascript by Nicholas C. Zakas O'Reilly), the risk
 * in this instance, is minor since is it a small project maintained by a
 * single developer.
 */
 Object.defineProperties(Array.prototype, {
   pushToLimit: {
       value: function (value) {
         if (this.length >= 2) {
           return false;
         }
         return this.push(value);
       }
     },

   isFull: {
     value: function() {
       return this.length == 2;
   }
 }
 });



 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  // Shuffle function from http://stackoverflow.com/a/2450976. Modified to traverse
  //nodelist instead of array. Is less costly though tightly coupled now.
  function shuffle(nodeList) {
      var currentIndex = nodeList.length, temporaryValue, randomIndex;// TODO: change to let

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = nodeList.item(currentIndex).className;
          nodeList.item(currentIndex).className = nodeList.item(randomIndex).className;
          nodeList.item(randomIndex).className = temporaryValue;
      }

      return nodeList;
  }


function log(message) {
  if(testMode)
    console.debug(message);
}
//});
