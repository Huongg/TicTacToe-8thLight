
class TicTacToe {
	constructor() {
		this._isStarted = false;
		this._userSymbol = null;
		this._computerSymbol = null;
		this._currentUserPosition = null;
	}


	initialiseSymbols(symbol) {
		this._isStarted = true;
		this._userSymbol = symbol;	
		this._computerSymbol = (this._userSymbol === "X")? "O" : "X";;
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

}

module.exports.TicTacToe = TicTacToe;