const constants = require("./constants.js");

const TicTacToe = require("./ticTacToe.js").TicTacToe;

// TO DO:
// define scope variable


// players= [X, O];



// display grids (rows) on the console
board_display= function(board){
  return    ' '+board[0]+' |'+' '+board[1]+' |'+' '+board[2]
            +'\n===+===+===\n'+' '
            +board[3]+' |'+' '+board[4]+' |'+' '+board[5]
            +'\n===+===+===\n'+' '
            +board[6]+' |'+' '+board[7]+' |'+' '+board[8]
}


checking_valid_input= function(input, gameIsStarted, currentBoard){
    // using regex to double check again make sure the number is from 0-8
    if(gameIsStarted){
        const regex = /\b[0-8]\b/;
        if(regex.exec(input) !== null && currentBoard[input] == ' ') {
          return true;
        }
      
    } else {
        const regex = /O|X/g;
        if(regex.exec(input) !== null){
          return true;
        }
      
    }  
  }


exit= function(){
  process.exit();
}


// show the board on the console
show= function(board){
  console.log(board_display(board));
}


play= function(){
  let game = new TicTacToe(); 
  console.log("Please pick your symbol (X or O):");
  // changed openStdin. to stdin.one()
  process.stdin.on('data',function(val){ 
    
    if(!game.isStarted){
        const inputSymbol = val.toString()[0].toUpperCase();     
        if(inputSymbol !== undefined && checking_valid_input(inputSymbol, game.isStarted, game.board)) {

          game.isStarted = true; 
          console.log(`User has picked: ${inputSymbol}`);

          game.initialise_symbols(inputSymbol);
          show(game.board);
          console.log("Enter [0-8]:");

        } else {
          console.log("Invalid input, please re-enter X or O");
        }

    } else{

      // +val transfers data in Unite8arra to integer number/posion
      // change res to position (clearer understanding)
      let position = +val; 
      game.currentUserPosition = position;

      if(checking_valid_input(game.currentUserPosition, game.isStarted, game.board)) {
        game.move(game.currentUserPosition, game.userSymbol);
        console.log(`current turn is: ${game.userSymbol}`);

        if(game.winner()||game.board_filled()) {
          show(game.board);
          console.log('Game over');
          exit();
        } else {
          // added function show() here
          // so the move of player (X) will be shown seperately from the computer move
          show(game.board);
          game.comp(game.computerSymbol);
          console.log(`current turn is: ${game.computerSymbol}`);

          if (game.winner()||game.board_filled()) {
            show(game.board);
            console.log('Game over');
            exit();
          } else {
            show(game.board);
            console.log(`The current available positions are: ${game.checking_empty_position(game.board)}`);
          }
        }
      } else {
        console.log(`Invalid input, please re-enter number as listed: ${game.checking_empty_position(game.board)}`);
      }

    }

  });

}

play();
