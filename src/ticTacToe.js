const constants = require("./constants.js");


class TicTacToe {
	constructor() {
		// this._isStarted = false;
		this._gameState = 0;
		this._userSymbol = null;
		this._computerSymbol = null;
		this._currentUserPosition = null;
		this._board= [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
		this._emptyPosition = [];
	}

	get computerSymbol() {
		return this._computerSymbol;
	}

	get userSymbol() {
		return this._userSymbol;
	}

	get isStarted() {
		return this._isStarted;
	}

	set gameLevels(level) {

	}

	set gameType(type) {

	}

	set currentUserPosition(currentPosition) {
		this._currentUserPosition = currentPosition;
	}
	get currentUserPosition() {
		return this._currentUserPosition;
	}

	get board() {
		return this._board;
	}

	get gameState() {
		return this._gameState;
	}

	set gameState(gameState) {
		this._gameState = gameState;
	}

	incrementGameState() {
		return this._gameState +=1;
	}




	initialise_symbols(userSymbol) {
		this._isStarted = true;
		this._userSymbol = userSymbol;	
		this._computerSymbol = (this._userSymbol === constants.X)? constants.O : constants.X;;
	}


	checking_empty_position(currentBoard) {
		let emptyPosition = [];
		for (let i=0 ; i<currentBoard.length; i++) {
			if(currentBoard[i] == ' ') {
				emptyPosition.push(i);
			}
		}
		return emptyPosition;
	}


	// computer move
	comp(computerSymbol){
	  // changed the name "x" to computerMove
	  let computerMove = this.get_pattern_O_move();
	  if(computerMove==-1){
	    computerMove = this.get_pattern_X_move();
	    if(computerMove==-1){
	      computerMove = this.get_available_space_move();
	    }
	  }
	  this.move(computerMove,computerSymbol);
	}


	move(pos, currentSymbol){
	  // + before pos helps turn the pos into integer number
	  // if pos >=0 and <=8 and is a number and not on the this._board yet
	  // then go slice the this._board

	  if(pos>=0 && pos<=8 && !isNaN(pos) && this._board[pos]==' '){
	    this._board.splice(pos, 1, currentSymbol);

	      // if the current turn is X, switch to O, vice versa
	    return true;
	  }

	  // if it returns false, should be a message said
	  // "position is already taken"
	  return false;
	}

	// get the move for O based on pattern 1
	get_pattern_O_move(){
	  	let board_string= this._board.join('')
	  	for(let i=0 ; i<constants.patterns_O.length ; i++){
	    	let array= board_string.match(constants.patterns_O[i][0]);
	    	if(array){
	      		return constants.patterns_O[i][1];
	    	}
	  	}

	  	// return -1 in case the current pattern does not match the patter_1_move
	  	// this case, current turn is X, it will never get matched with patter_1 which is O
	  	return -1;
	}


	// get the move for X (user pattern) based on pattern 2
	get_pattern_X_move(){
	  	let board_string= this._board.join('')
	  	for(let i=0 ; i<constants.patterns_X.length ; i++){
	    	let array= board_string.match(constants.patterns_X[i][0]);
	    	if(array){
	      		return constants.patterns_X[i][1];
	    	}
	  	}
	  	return -1;
	}

	board_filled(){
		let nextFreeMove = this.get_available_space_move();
		  if(nextFreeMove==-1){
		    return true;
		}
		return false; 
	}

	// computer gets move
	get_available_space_move(){

	  // this is the default value saying that if no one started or taken the middle one
	  // computer will choose the middle point
	  if(this._board[4] == ' '){
	    return 4;
	  };

	  // this is for when no pattern is found,
	  // next turn will take the first index value of the empty space
	  return this._board.indexOf(' ');
	}

	winner(){
	  	let board_string= this._board.join('');
	  	let the_winner = null;
		for(let i=0 ; i<constants.patterns_winning.length ; i++){
		    let array= board_string.match(constants.patterns_winning[i][0]);
		    if(array){
		      the_winner= constants.patterns_winning[i][1];
		    }
		}
		if(the_winner){
		    return true;
		}
		return false;
	}




}

module.exports.TicTacToe = TicTacToe;

