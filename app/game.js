'use strict'

class TicTacToeGame {
  constructor() {
    this._gameStatus = 0
    this._playerTurn = 0
    this._cellsStatus = [0,0,0,0,0,0,0,0,0]
    this._player1wins = 0
    this._player2wins = 0
    this._totalGames = 0
  }

  // reset the game infomation till now
  resetGame() {
    let emptyCells = []
    for(var i = 0 ; i < 9 ; i++)
      emptyCells.push(0)

    TicTacToeGame._gameStatus = 0
    TicTacToeGame._playerTurn = 0
    TicTacToeGame._cellsStatus = [0,0,0,0,0,0,0,0,0]
    TicTacToeGame._player1wins = 0
    TicTacToeGame._player2wins = 0
    TicTacToeGame._totalGames = 0
  }

  // finish the game and start a new one
  finishGame() {
    let emptyCells = []
    for(var i = 0 ; i < 9 ; i++)
      emptyCells.push(0)

    if (TicTacToeGame._gameStatus == 1 && TicTacToeGame._playerTurn == 1) {
      TicTacToeGame._player1wins++
    } else if (TicTacToeGame._gameStatus == 1 && TicTacToeGame._playerTurn == 0) {
      TicTacToeGame._player2wins++
    }

    TicTacToeGame._gameStatus = 0
    TicTacToeGame._playerTurn = 0
    TicTacToeGame._cellsStatus = [0,0,0,0,0,0,0,0,0]
    TicTacToeGame._totalGames++
  }

  // helper function to determine if 3 values are checked and same
  _checked(i, j, k) {
    if (TicTacToeGame._cellsStatus[i] != 0) {
      if (TicTacToeGame._cellsStatus[i] == TicTacToeGame._cellsStatus[j]
        && TicTacToeGame._cellsStatus[j] == TicTacToeGame._cellsStatus[k]) {
        if (TicTacToeGame._cellsStatus[i] == 1)
          return 0
        else
          return 1
      }
    }
    return -1
  }

  // after a click, give the next player the turn
  // if anybody has won return 0 or 1
  // if game has tied return 0
  // if nothing happened return -1
  isGameCompleted() {
    // check the status of all cells to see if anybody has won
    // if anybody has won return 0 or 1
    // check all rows
    for(var i = 0 ; i < 9 ; i += 3) {
      if (this._checked(i, i+1, i+2) != -1) {
        return this._checked(i, i+1, i+2)
      }
    }
    // check all columns
    for(var i = 0 ; i < 3 ; i++) {
      if (this._checked(i, i+3, i+6) != -1) {
        return this._checked(i, i+3, i+6)
      }
    }
    // check the 2 diagonals
    if (this._checked(0, 4, 8) != -1) {
      return this._checked(0, 4, 8)
    }
    if (this._checked(2, 4, 6) != -1) {
      return this._checked(2, 4, 6)
    }

    // check all cells to see if the game has tied - atleast 1 cell should be 0 for the game to continue
    // if game has tied return 0
    var gameDrawFlag = true
    for(var i = 0 ; i < 9 ; i++)
    {
      if (TicTacToeGame._cellsStatus[i] == 0) {
        gameDrawFlag = false
        break
      }
    }
    if (gameDrawFlag) {
      return -9
    }

    // finally return -1 if nothing has happened
    return -1
  }

  // return the array of cells
  getCells() {
    return TicTacToeGame._cellsStatus
  }

  // set the _gameStatus property - 0 if playing, 1 if completed
  setGameStatus() {
    TicTacToeGame._gameStatus = 1
  }

  // update the cell at [index] into the currentPlayer's possession
  updateCells(index) {
    if (TicTacToeGame._cellsStatus[index] == 0) {
      TicTacToeGame._cellsStatus[index] = TicTacToeGame._playerTurn + 1
      TicTacToeGame._playerTurn = ( TicTacToeGame._playerTurn + 1 ) % 2
    }
  }

  // return the current player in string format
  getCurrentPlayer() {
    return (TicTacToeGame._playerTurn == 0)? 'Player A' : 'Player B'
  }

  // return the info about number of wins of each player and total games so far
  getScoreboardInfo() {
    return {
      'player1wins': TicTacToeGame._player1wins,
      'player2wins': TicTacToeGame._player2wins,
      'totalGames': TicTacToeGame._totalGames
    }
  }
}

module.exports.TicTacToeGame = TicTacToeGame