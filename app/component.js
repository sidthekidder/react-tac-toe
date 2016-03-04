'use strict'

var React = require('react');

/*
 * Cell
 * prop: Controller {object}
 * prop: status {number}
 * renders the base square of the tic tac toe grid
 */
module.exports.Cell = React.createClass({
  clicked: function() {
    this.props.Controller.cellClicked(this.props.key1)
  },
  render: function() {
    // set classname depending on whether its empty/O/X
    var className1 = "cell "
    if (this.props.status == 0)
      className1 += "empty"
    else if (this.props.status == 1)
      className1 += "X"
    else if (this.props.status == 2)
      className1 += "O"

    return (
      <div className={"col-sm-4 " + className1} onClick={this.clicked}></div>
    )
  }
})

/*
 * GameButton
 * prop: Controller {object}
 * prop: messageText {string}
 * renders the New Game / Reset Game button
 */
module.exports.GameButton = React.createClass({
  clicked: function() {
    if (this.props.messageText == 'New Game!') {
      this.props.Controller.newGameClicked()
    } else if (this.props.messageText == 'Reset Game!') {
      this.props.Controller.resetGameClicked()
    }
  },
  render: function() {
    return (
      <button className='gameButton btn btn-primary' onClick={this.clicked}>{this.props.messageText}</button>
    )
  }
})

/*
 * Scoreboard
 * prop: scoreboardInfo { totalGames {number}, player1wins {number}, player2wins {number} }
 * renders the Total Games / PlayerAWins / PlayerBWins values
 */
module.exports.Scoreboard = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">Total Games: {this.props.scoreboardInfo.totalGames}</div>
        <div className="col-sm-12">Player A Wins: {this.props.scoreboardInfo.player1wins}</div>
        <div className="col-sm-12">Player B Wins: {this.props.scoreboardInfo.player2wins}</div>
      </div>
    )
  }
})

/*
 * InformationBox
 * prop: winner {string}
 * prop: curPlayer {string}
 * renders the text showing the next player's turn / current winner
 * at the top of the UI
 */
module.exports.InformationBox = React.createClass({
  render: function() {
    if (this.props.curPlayer == -1) {
      // game has been won or tied
      return (
        <div>{this.props.winner}</div>
      )
    } else {
      return (
        <div>{this.props.curPlayer}</div>
      )
    }
  }
})

