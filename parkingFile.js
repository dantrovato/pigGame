


var scores, roundScore, activePlayer, gamePlaying, sixesCount;

function init() {
    scores = [0,0];
    roundScore = 0,
    activePlayer = 0;
    gamePlaying = true;
    sixesCount = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
  }


  //if (&& sixesCount < 2)

function playRound() {
    if (gamePlaying){
        // 1. random number
        var dice = Math.floor(Math.random() * 2) + 5;
        // 2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update score if number higher than 1
        if (dice !== 1 && dice !== 6) {
            sixesCount = 0;
            //add score
            roundScore += dice;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            console.log('first if');
        } else if (dice === 6) {
            if (sixesCount === 0) {
                sixesCount++;
                roundScore += dice;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                console.log('this is the first 6');
            } else {

              // PROBLEM CHILD
              sixesCount++;
              scores[activePlayer] = 0;
              roundScore = 0;
              document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
              document.getElementById('current-' + activePlayer).textContent = roundScore;

              nextPlayer();
              console.log('FUCKING FINALLY!!!');
            }

        }
    }
  console.log(sixesCount);
}


init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    sixesCount = 0;
    if (gamePlaying && sixesCount < 2) {
        playRound();
    } else if (sixesCount === 2) {
          scores[activePlayer] = 0;
          document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    }
});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add score to global score
        scores[activePlayer] += roundScore;
        // add score to top window
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //reset current score to 0
        document.getElementById('current-' + activePlayer).textContent = 0;

        // check if player has hit 100
        if (scores[activePlayer] >= 100) {

        document.getElementById('name-' + activePlayer).textContent = 'you win';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gamePlaying = false;
      } else {
            // change player?
            nextPlayer();
      }
    }


});

document.querySelector('.btn-new').addEventListener('click', init);


/*  PARKED CODE FROM LESSON 44
var scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores = [0,0];
    roundScore = 0,
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
  }

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update score if number higher than 1
        if (dice !== 1) {
          //add score
          roundScore += dice;
          document.getElementById('current-' + activePlayer).textContent = roundScore;

        } else {
          // continue
          nextPlayer();
          //document.getElementById('current-1' + activePlayer).textContent = 0;
        }
    }



});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      // add score to global score
      scores[activePlayer] += roundScore;
      // add score to top window
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      //reset current score to 0
      document.getElementById('current-' + activePlayer).textContent = 0;

      // check if player has hit 100
      if (scores[activePlayer] >= 20) {

        document.getElementById('name-' + activePlayer).textContent = 'you win';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        // change player?
        nextPlayer();
      }
    }


});

document.querySelector('.btn-new').addEventListener('click', init);
/*
