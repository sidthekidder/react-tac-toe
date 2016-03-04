'use strict';


////////////////////////////////////
///// LOAD REACT DEPENDENCIES
////////////////////////////////////

var ReactDOM = require('react-dom')
var React = require('react')


////////////////////////////////////
///// LOAD GAME MODEL
////////////////////////////////////

var TicTacToeGame = require('./game.js').TicTacToeGame


////////////////////////////////////
///// LOAD REACT COMPONENTS
////////////////////////////////////

var Cell = require('./component.js').Cell
var GameButton = require('./component.js').GameButton
var Scoreboard = require('./component.js').Scoreboard
var InformationBox = require('./component.js').InformationBox


////////////////////////////////////
///// CONTROLLER CODE
////////////////////////////////////

var Controller = {}
var game = new TicTacToeGame()

Controller.cellClicked = function(index) {
  if (game.isGameCompleted() != -1) {
    alert('Game finished! Please start a new game')
    return
  }
  game.updateCells(index)
  this.renderCells()
}

Controller.newGameClicked = function() {
  game.finishGame()
  this.renderCells()
}

Controller.resetGameClicked = function() {
  game.resetGame()
  this.renderCells()
}

Controller.renderCells = function() {
  var msgItems = game.getCells().map(function(value, index) {
    return <Cell key={index}
                  key1={index}
                  Controller={this}
                  status={value} />
  }, this)

  var restartButton = [0].map(function(i) {
    return <GameButton key={i} messageText='New Game!' Controller={this} />
  }, this)

  var resetButton = [0].map(function(i) {
    return <GameButton key={i} messageText='Reset Game!' Controller={this} />
  }, this)
  
  var result = game.isGameCompleted()
  if (result != -1) {

    var winMessage = ''
    if (result == -9) {
      // game has tied
      winMessage += 'The game has tied.'
    } else if (result == 0) {
      winMessage += 'The winner is Player A!!'
    } else if (result == 1) {
      winMessage += 'The winner is Player B!!'
    }
    game.setGameStatus()

    ReactDOM.render(
      <div className="game">
        <InformationBox curPlayer={-1} winner={winMessage} />
        <div className="row" style={{maxWidth: '210px'}}>{msgItems}</div>
        {restartButton}
        {resetButton}
        <Scoreboard scoreboardInfo={game.getScoreboardInfo()} />
      </div>,
      document.getElementById('content')
    )
  } else {
    ReactDOM.render(
      <div className="game">
        <InformationBox curPlayer={game.getCurrentPlayer()} winner={-1} />
        <div className="row" style={{maxWidth: '210px'}}>{msgItems}</div>
        {restartButton}
        {resetButton}
        <Scoreboard scoreboardInfo={game.getScoreboardInfo()} />
      </div>,
      document.getElementById('content')
    )
  }
}


////////////////////////////////////
///// START THE GAME
////////////////////////////////////

game.resetGame()
Controller.renderCells()
