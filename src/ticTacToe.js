const constants = require("./constants.js");


class TicTacToe {
	constructor() {
		// this._isStarted = false;
		this._gameState = 0;
		this._playerSymbol = null;
		this._playerBSymbol = null;
		this._computerSymbol = null;
		this._computerBSymbol = null;
		this._currentUserPosition = null;
		this._board= [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
		this._emptyPosition = [];

		this._gameType = null;
	}

	get board() {
		return this._board;
	}

	get isStarted() {
		return this._isStarted;
	}

	set gameLevels(level) {

	}

	get gameType() {
		return this._gameType;

	}
	set gameType(gameType) {
		this._gameType = gameType;
	}

	

	set currentUserPosition(currentPosition) {
		this._currentUserPosition = currentPosition;
	}
	get currentUserPosition() {
		return this._currentUserPosition;
	}
	

	/** Set and Get for gameState */
	get gameState() {
		return this._gameState;
	}
	set gameState(gameState) {
		this._gameState = gameState;
	}
	incrementGameState() {
		if(this._gameType == 1 || this._gameType == 2){
			return this._gameState += 1;
		} else if(this._gameType == 3) {
			return this._gameState = 3;	
		}		
	}



	/** Initialise the symbol for player and computer */
	get computerSymbol() {
		return this._computerSymbol;
	}
	get computerBSymbol() {
		return this._computerBSymbol;
	}
	get playerSymbol() {
		return this._playerSymbol;
	}
	get playerBSymbol() {
		return this._playerBSymbol;
	}
	initialise_symbols(firstPlayerSymbol) {
		/** symbols will be initialised based on the type of the game that player picked
         * 1. Human vs Computer
         * 2. Human vs Human
         * 3. Computer vs Computer
         */
		if(this._gameType == 1){
			this._playerSymbol = firstPlayerSymbol;	
			this._computerSymbol = (this._playerSymbol === constants.X)? constants.O : constants.X;

		} else if(this._gameType == 2) {
			this._playerSymbol = firstPlayerSymbol;
			this._playerBSymbol = (this._playerSymbol === constants.X)? constants.O : constants.X;

		} else if(this._gameType == 3) {
			this._computerSymbol = constants.X;
			this._computerBSymbol = constants.O;
		}
		
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


	comp(computerSymbol){
	  let computerMove = this.get_pattern_O_move();
	  if(computerMove==-1){
	    computerMove = this.get_pattern_X_move();
	    if(computerMove==-1){
	      computerMove = this.get_available_space_move();
	    }
	  }
	  this.move(computerMove, computerSymbol);
	}


	move(pos, currentSymbol){
	  if(pos>=0 && pos<=8 && !isNaN(pos) && this._board[pos]==' '){
	    this._board.splice(pos, 1, currentSymbol);
	    return true;
	  }
	  return false;
	}

	/** Get the move for O based on pattern 1 */
	get_pattern_O_move(){
	  	let board_string= this._board.join('')
	  	for(let i=0 ; i<constants.patterns_O.length ; i++){
	    	let array= board_string.match(constants.patterns_O[i][0]);
	    	if(array){
	      		return constants.patterns_O[i][1];
	    	}
	  	}
	  	/**
      	 * return -1 in case the current pattern does not match the patter_1_move
      	 * this case, current turn is X, it will never get matched with patter_1 which is O
       	 */
	  	return -1;
	}


	/** Get the move for X (user pattern) based on pattern 2 */
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

	get_available_space_move(){
		/**
      	 * this is the default value saying that if no one started or taken the middle one
      	 * computer will choose the middle point
       	 */
	  	if(this._board[4] == ' '){
	    	return 4;
	  	};
	  	/**
      	 * this is for when no pattern is found,
      	 * next turn will take the first index value of the empty space
       	 */
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

