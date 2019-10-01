// TODO: Check for page load???
//document.addEventListener('DOMContentLoaded', function () {}
 const TEST_MODE = false;
 const TEST_LEVEL = 1;


 const allCards = document.querySelectorAll('.card');
 const deck = document.querySelector('.deck');
 const moveTracker = document.querySelector('.moves');
 const reloader = document.querySelector('.restart');
 const stars = this.stars = document.querySelectorAll('.fa-star');
 const modal = document.querySelector('.modal');
 const TOTAL_CARDS = 16;
 const CARD_CLOSE_STATE = 'card';
 const CARD_MATCH_STATE = 'match';
 const CARD_OPEN_STATE = 'open';
 const CARD_SHOW_STATE = 'show';

 let totalMatchedCards = 0;
 let moveCounter = 0;
 //let timeInSeconds = 0; //use when difficult mode implemented
 let openCards = new CardHolder(2);
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
};



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
  if(event.target.classList.contains(CARD_CLOSE_STATE)) {
    timer.start();
    scorer.start(mode);
    showCardAction(event.target);

    if(openCards.isFull()) {
      updateMoveCounter();
      if(openCards.isMatch()) {
        displayCardMatchAction();
        if(totalMatchedCards == TOTAL_CARDS) {
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
  if(!cardElement.classList.contains(CARD_OPEN_STATE) &&
     !cardElement.classList.contains(CARD_MATCH_STATE)) {

    if(openCards.pushCard(cardElement)) {
      log('Open cards: '+openCards.length(),1);
      cardElement.classList.add(CARD_OPEN_STATE,CARD_SHOW_STATE);
    }
  }
}

/*
 * Hide Card Action
 *      - Hides the card symbol and changes the card color
 *
 * Calls the Card Holder reset method after 1 second to hide the cards.
 */
function hideCardAction() {
    log("hideCardAction: num cards = "+openCards.length(),1);
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
   let cardArray = openCards.getCards();

   cardArray.forEach(function(card) {
     card.classList.remove(CARD_OPEN_STATE,CARD_SHOW_STATE);
     card.classList.add(CARD_MATCH_STATE);
   });

   totalMatchedCards += openCards.length();
   log("totalMatchedCards = "+totalMatchedCards,1);
   // TODO: Add animation
   // TODO: Add animation
   openCards.removeAllCards();
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
    card.className = CARD_CLOSE_STATE;
  });

  shuffleDeck();
  totalMatchedCards = 0;
  resetOpenCards();// = [];

  //Hide modal
  modal.style.display = 'none';

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
   log(cardSymbols,0);

 }



///////////////////////////////////
// Active Card(s) Functionality
///////////////////////////////////
/*
 * Creates a CardHolder object
 * @class
 */
function CardHolder(cardLimit){
  this.cardLimit = cardLimit;
  this.matchFound = false;
  this.array = [];


  /*
  * Method "pushToLimit" enforces given parameter as array size constraint
  * This method will push objects onto the array and return TRUE
  * until the predefined limit of 2 is reach. At which point the method will NOT
  * add the object to the array and will return FALSE.
  *
  * @param {object} - card element
  * @returns {boolean}
  */
  this.pushCard = function(value){

    if (this.array.length >= this.cardLimit) {
      console.log('CardHolder Limit reached: length= ', this.array.length);
      return false;
    }

    return this.array.push(value);
  };


  /*
   * The 'isMatch' method returns TRUE when two cards have the
   * same symbol - a match!
   * @returns {boolean}
   */
  this.isMatch = function() {

       if(this.isFull()){
         const firstCardSymbol = this.array[0].firstElementChild.className;
         const secondCardSymbol = this.array[1].firstElementChild.className;

         this.matchFound = (firstCardSymbol === secondCardSymbol);
         log("CardHolder.isMatch:"+ firstCardSymbol+"=="+secondCardSymbol+" : "+this.matchFound,1);
       }
       return this.matchFound;
     };


  this.removeAllCards = function() {  this.array = [];  };

  this.getCards = function() {  return this.array;  };

  this.isFull = function() {  return this.array.length == this.cardLimit; };

  this.length = function() {  return this.array.length; };

}

/*
 * Loops through openCards and removes 'open' and 'show' classes
 * Reassigns openCards to empty array.
 */
function resetOpenCards() {
  let cardArray = openCards.getCards();
  cardArray.forEach(function(card) {
    card.className = "card";
  });

  //KS openCards = [];
  openCards.removeAllCards();
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
  const modalMessage = document.querySelector('.message');
  const modalBody = document.querySelector('.modal-body');
  const list = modalBody.getElementsByClassName('stars')[0];
  let message = "You won with " + moveCounter + " Moves";
  let currentStars = list.children;

  log('list length = '+list.children.length,0);

  //In case of Reset, remove any previous Star Ratings
  while (list.children.length > 0){
    list.lastElementChild.remove();
  }

  if(totalStars){
      message = message + " and " + totalStars + " Stars";

      //Add each star from the Star Ratings to the modal
      stars.forEach(function(star) {
        let classes = star.classList;
        let listItem = document.createElement('li');
        let mStar = document.createElement('i');

        for (let i = 0; i<classes.length; i++) {
          mStar.classList.add(classes[i]);
        }

        listItem.appendChild(mStar); //star
        list.appendChild(listItem); //list of stars

      });
  }

  //Update message
  message = message+"!";
  modalMessage.textContent = message;
  modalMessage.insertAdjacentHTML('beforeend','<br> Your Time: '+
                  document.querySelector('#time').textContent);

  //display modal
  modal.style.display = 'flex';

}


///////////////////////////////////
// Timer Functionality
///////////////////////////////////
/*
 *Creates a Timer object
 * @class
 */
function Timer() {
  let intervalId = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let MAX_SECONDS = 60;
  let MAX_MINUTES = 60;

  /*
   * The Timer 'padTime' method adds leading zero
   * to numbers less than 10
   */
  let padTime = function(i) {
    return ('00'+i).substr(-2);
  };


  let displayTime = function(h,m,s) {
    h = padTime(h);
    m = padTime(m);
    s = padTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    log("after pad: "+h+ ":"+ m+ ":"+ s,0);
  };


  /*
   * The Timer 'update' method increments the timer's
   * hours, minutes, and seconds
   */
  let update = function() {

    if(seconds == MAX_SECONDS-1) {
      seconds = 0;
      minutes++;
    }
    else{  seconds++;  }

    if(minutes == MAX_MINUTES-1) {
      minutes=0;
      hours++;
    }

    displayTime(hours,minutes,seconds);
    //timeInSeconds++;
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

/*
 *Creates a StarRatings object
 * @class
 */
function StarRatings() {

  let starsArray = Array.from(stars);
  let intervalId = 0;
  let errorThreshold = 4;   //the number of errors possible before losing a point


  /*
   * The StarRatings 'update' method decrements half a point
   * for moves that result in a mismatch depending on the
   * error threshold. The threshold is increase by 2 after it is reached.
   */
  let update = function() {

    //Do if totalStars != 0
    if(totalStars > 1) {
      let matchedCards = deck.querySelectorAll('.match');
      let correctMoves = matchedCards.length > 0 ? matchedCards.length/2 : 0;
      let errorMoves = Math.abs(moveCounter - correctMoves);
      log("# of Moves: "+moveCounter+"  errors made: "+errorMoves+"  error threshold: "+errorThreshold,0);

        if( errorMoves > errorThreshold) {
          //dock half a point
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

          //increase error threshold
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
  };

  /*
   * The StarRatings 'start' method sets mode and the time interval for updating
   * the star ratings. Currently only default mode is coded.
   */
  this.start = function(mode) {
    if(!intervalId) {
      switch (mode){
        case 'difficult':
            intervalId = setInterval(updateDifficultMode, 1000);
          break;

        default:
          intervalId = setInterval(update, 1000);
          break;

      }
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

    //Display all stars in score panel
    stars.forEach(function(star) {
      star.className = 'fa fa-star';
    });

    //reset counters
    totalStars = 3;
    errorThreshold = 4;
    starsArray = Array.from(stars);
  };


}

 ///////////////////////////////////
 // Helpers
 ///////////////////////////////////


//Replaced with CardHolder Object
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
/* Object.defineProperties(Array.prototype, {
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
*/


 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  // Shuffle function from http://stackoverflow.com/a/2450976. Modified to traverse
  //nodelist instead of array. Is less costly though tightly coupled now.
  function shuffle(nodeList) {
      let currentIndex = nodeList.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = nodeList.item(currentIndex).className;
          nodeList.item(currentIndex).className = nodeList.item(randomIndex).className;
          nodeList.item(randomIndex).className = temporaryValue;
      }

      return nodeList;
  }

/*
 * Temporary Logger - Prints param to console if TEST_MODE set to true
 * @param {string} message - string to be printed to console
 */
function log(message, level) {
  if(TEST_MODE && level == TEST_LEVEL)
    console.debug(message);
}
