/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
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

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
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
            console.log('this is a 5');
        } else if (dice === 6) {
            if (sixesCount === 0) {
                sixesCount++;
                roundScore += dice;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                console.log('this is the first 6');
            } else {
              sixesCount++;
              scores[activePlayer] = 0;
              roundScore = 0;
              document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
              document.getElementById('current-' + activePlayer).textContent = roundScore;

              nextPlayer();
              console.log('this is the second 6');
              sixesCount = 0;
            }
        }
        console.log('sixesCount: ' + sixesCount);
    }
});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      sixesCount = 0;
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


/*



  if (dice === 6) {
        if (dice === 6) {
              -RESET TOTAL SCORE-
        } else
  } else play game

 */

//document.getElementById('score-' + activePlayer += roundScore).textContent = roundScore;

//document.querySelector('#current-' + activePlayer).innerHTML =  '<em>' + dice + '</em>';
//document.querySelector('#current-' + activePlayer).textContent = dice;
