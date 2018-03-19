/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, previousDice, scorePrompt, targetScore;

function init() {
    scores = [0,0];
    roundScore = 0,
    activePlayer = 0;
    gamePlaying = true;
    targetScore = scorePrompt;
    previousDice = 0;

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
    document.querySelector('.btn-start').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    //document.querySelector('.btn-setScore').classList.remove = ':Hover';

}

function nextPlayer() {
    previousDice = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
  }

function updateScore() {
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer] + roundScore;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
  }

function declareWinner() {
  document.getElementById('name-' + activePlayer).textContent = 'you win';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
  document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
  gamePlaying = false;
}

function setGame() {
    scorePrompt = prompt('Enter the winning score and your bank details');
    var parseScore = parseInt(scorePrompt);

    if (parseScore.toString() === scorePrompt) {
        targetScore = scorePrompt;
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.btn-setScore').textContent = 'target: ' + scorePrompt + ' points';
        document.querySelector('.btn-setScore').style.top = '-3rem';
        document.querySelector('.btn-start').style.display = 'block'

    } else {
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.btn-start').style.display = 'none'
        alert('enter a valid number');
    }
}

// CODE STARTS

document.querySelector('.btn-setScore').addEventListener('click', setGame);
document.querySelector('.btn-new').addEventListener('click', setGame);

//  GAME BEGINS
document.querySelector('.dice').style.display = 'none';
document.querySelector('.btn-roll').style.display = 'none';
document.querySelector('.btn-hold').style.display = 'none';
document.querySelector('.btn-start').style.display = 'none';
document.querySelector('.btn-start').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        if ((scores[activePlayer] + roundScore) >= targetScore) {

            console.log('you win');
            declareWinner();

            //3. update score if number higher than 1
        } else if (dice !== 1 && previousDice !== 6) {
            //add score
            previousDice = dice;
            roundScore += dice;
            updateScore();
            console.log('previous dice :' + previousDice);
            if ((scores[activePlayer] + roundScore) >= targetScore) {
              declareWinner();
            }
        } else if (dice === 1) {
            previousDice = dice;
            console.log('this is 1')
            updateScore();
            nextPlayer();
        } else if (dice === 6 && previousDice === 6) {
            scores[activePlayer] = 0;
            updateScore();
            nextPlayer();

            console.log('BOOM. you hit the second 6');
        } else if (previousDice === 6) {
            previousDice = dice;
            roundScore += dice;
            updateScore();
            console.log('previous dice :' + previousDice);
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      previousDice = 0;
      // add score to global score
      scores[activePlayer] += roundScore;
      // add score to top window
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      //reset current score to 0
      document.getElementById('current-' + activePlayer).textContent = 0;

      // check if player has hit target
      if (scores[activePlayer] >= targetScore) {
        declareWinner();

      } else {
        // change player?
        nextPlayer();
      }

    }
});
