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


checking_valid_input= function(input, currentGameState, currentBoard){

    if(currentGameState == 0) {
      const regex = /\b[1-3]\b/;
      if(regex.exec(input) !== null) {
        return true;
      }

    } else if(currentGameState == 1) {
      const regex = /Y|N/g;
      if(regex.exec(input) !== null) {
        return true;
      }

    } else if(currentGameState == 2) {
      const regex = /O|X/g;
      if(regex.exec(input) !== null){
        return true;
      }

    } else if(currentGameState == 3) {
      const regex = /M|D/g;
      if(regex.exec(input) !== null) {
        return true;
      }

    } else if (currentGameState == 4) {
      // using regex to double check again make sure the number is from 0-8
      const regex = /\b[0-8]\b/;
      if(regex.exec(input) !== null && currentBoard[input] == ' ') {
        return true;
      }
    }
  
  }


pick_turn= function() {
  console.log(`Do you want to go first? Please enter: Y or N`);

}

exit= function(){
  process.exit();
}



show= function(board){
  console.log(board_display(board));
}


play= function(){
  let game = new TicTacToe(); 
  
  console.log("Which type of the game? Please eneter the number as the following type below");
  console.log("1. Human vs Computer");
  console.log("2. Human vs Human");
  console.log("3. Computer vs Computer");
  /** Changed openStdin. to stdin.one()  */
  process.stdin.on('data',function(val){ 
    if(game.gameState == 0) {
      const gameType = +val;
      if(checking_valid_input(gameType, game.gameState, game.board)) {

        game.incrementGameState();

        /**
         * if the input is valid, gameState will be incremented by 1
         * then player will be ask for the next move of the set-up
         */
        console.log(`You have picked game type number ${gameType}`);
        console.log("Do you want to go first? Please enter: Y or N");
      } else {
        /**
         * Handle bad user input
         */
        console.log("Invalid input, please enter 1 or 2 or 3");
        console.log("1. Human vs Computer");
        console.log("2. Human vs Human");
        console.log("3. Computer vs Computer");
      }
      
            
    } else if(game.gameState == 1) {      
      const playerDecision = val.toString()[0].toUpperCase(); 
      if(checking_valid_input(playerDecision, game.gameState, game.board)) {
          if(playerDecision == "Y") {
              game.incrementGameState();
              /**
               * if the player chose to go first
               * then 
               */
              console.log("Player goes first");
              console.log("Please pick your symbol (X or O):");
          } else {
              game.incrementGameState();
              /**
               * if the player didnt want to go first
               * then 
               */
              console.log("Computer goes first");
              console.log("Please pick your symbol (X or O):");
          }
      } else {
        console.log("Invalid input, please re-enter Y if you wish to go first.");
        console.log("Enter N if you do not wish to go first.");
      }

      
    } else if(game.gameState == 2) {      
      const inputSymbol = val.toString()[0].toUpperCase();    
      if(checking_valid_input(inputSymbol, game.gameState, game.board)) {
          // game.isStarted = true; 
          game.initialise_symbols(inputSymbol);
          game.incrementGameState();
          console.log(`Player has picked: ${inputSymbol}`);
          console.log(`Please pick the level: "M for Medium" or "D for Difficult":`);

      } else {
          console.log("Invalid input, please re-enter X or O");
      }   


    } else if(game.gameState == 3) {
        const pickedLevel = val.toString()[0].toUpperCase();
        if(checking_valid_input(pickedLevel, game.gameState, game.board)){
          game.incrementGameState();
          if(pickedLevel == "M") {
            console.log("Player has picked level Medium");
          } else if(pickedLevel == "D") {
            console.log("Player has picked level Difficult");
          }

          show(game.board);
          console.log("Enter [0-8]:");
        }
        
        
    }  else if(game.gameState == 4){
          // +val transfers data in Unite8arra to integer number/posion
          // change res to position (clearer understanding)
          let position = +val; 
          game.currentUserPosition = position;

          if(checking_valid_input(game.currentUserPosition,  game.gameState, game.board)) {
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


// play= function(){
//   let game = new TicTacToe(); 
  
//   // changed openStdin. to stdin.one()
//   process.stdin.on('data',function(val){ 
    
//     if(!game.isStarted){
//         console.log("Please pick your symbol (X or O):");
//         const inputSymbol = val.toString()[0].toUpperCase();     
//         if(inputSymbol !== undefined && checking_valid_input(inputSymbol, game.isStarted, game.board)) {

//           game.isStarted = true; 
//           console.log(`User has picked: ${inputSymbol}`);

//           game.initialise_symbols(inputSymbol);
//           show(game.board);
//           console.log("Enter [0-8]:");

//         } else {
//           console.log("Invalid input, please re-enter X or O");
//         }

//     } else{

//       // +val transfers data in Unite8arra to integer number/posion
//       // change res to position (clearer understanding)
//       let position = +val; 
//       game.currentUserPosition = position;

//       if(checking_valid_input(game.currentUserPosition, game.isStarted, game.board)) {
//         game.move(game.currentUserPosition, game.userSymbol);
//         console.log(`current turn is: ${game.userSymbol}`);

//         if(game.winner()||game.board_filled()) {
//           show(game.board);
//           console.log('Game over');
//           exit();
//         } else {
//           // added function show() here
//           // so the move of player (X) will be shown seperately from the computer move
//           show(game.board);
//           game.comp(game.computerSymbol);
//           console.log(`current turn is: ${game.computerSymbol}`);

//           if (game.winner()||game.board_filled()) {
//             show(game.board);
//             console.log('Game over');
//             exit();
//           } else {
//             show(game.board);
//             console.log(`The current available positions are: ${game.checking_empty_position(game.board)}`);
//           }
//         }
//       } else {
//         console.log(`Invalid input, please re-enter number as listed: ${game.checking_empty_position(game.board)}`);
//       }

//     }

//   });

}

play();
