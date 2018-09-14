const constants = require("./constants.js");

const TicTacToe = require("./ticTacToe.js").TicTacToe;


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
      const regex = /\b[Y|N]\b/;
      if(regex.exec(input) !== null) {
        return true;
      }

    } else if(currentGameState == 2) {
      const regex = /\b[O|X]\b/;
      if(regex.exec(input) !== null){
        return true;
      }

    } else if(currentGameState == 3) {
      const regex = /\b[M|D]\b/;
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
        game.gameType = gameType;
        console.log(`You have picked game type number ${gameType}`);

        /**
         * if the gameType == 1 or 2, 
         * it will ask the player if the want to go first
         * if the gameType == 3 (which is computer vs computer)
         * it will go straight to level set up
         */
        if(game.gameType == 1 || game.gameType == 2) {
          console.log("Do you want to go first? Please enter: Y or N");
          game.incrementGameState(); 
        } else {
          console.log(`Please pick the level: "M for Medium" or "D for Difficult":`);
          game.incrementGameState();    

        }
           

      /**
       * Handle bad user input
       */
      } else {
        
        console.log("Invalid input, please enter 1 or 2 or 3");
        console.log("1. Human vs Computer");
        console.log("2. Human vs Human");
        console.log("3. Computer vs Computer");
      }
      
            
    } else if(game.gameState == 1) {      
      const playerDecision = val.toString().toUpperCase(); 

      if(checking_valid_input(playerDecision, game.gameState, game.board)) {
          /**
           * If gameType ==1 (Human vs Computer)
           * The message will say player goes first if the answer to the prev question is Y
           */
          if(game.gameType == 1){
              if(playerDecision[0] == "Y") {
                  game.incrementGameState();
                  console.log("Player goes first");
                  console.log("Please pick your symbol (X or O):");
              } else {
                  game.incrementGameState();
                  console.log("Computer goes first");
                  console.log("Please pick your symbol (X or O):");
              }

          /**
           * If gameType ==2 (Human vs Human)
           * The message will say player A goes first if the answer to the prev question is Y
           */
          } else if(game.gameType == 2){
              if(playerDecision[0] == "Y") {
                  game.incrementGameState();
                  console.log("Player A goes first");
                  console.log("Please pick your symbol (X or O):");
              } else {
                  game.incrementGameState();
                  console.log("Player B goes first");
                  console.log("Please pick your symbol (X or O):");
              }
          }

      /**
       * Handle bad user input
       */
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
          if(pickedLevel[0] == "M") {
            console.log("Player has picked level Medium");
          } else if(pickedLevel[0] == "D") {
            console.log("Player has picked level Difficult");
          }

          show(game.board);
          console.log("Enter [0-8]:");
        }
        
        
    }  else if(game.gameState == 4){
          // +val transfers data in Unite8array to integer number/posion
          // change res to position (clearer understanding)
          let position = +val; 
          game.currentUserPosition = position;

          if(checking_valid_input(game.currentUserPosition,  game.gameState, game.board)) {
            game.move(game.currentUserPosition, game.playerSymbol);
            console.log(`current turn is: ${game.playerSymbol}`);

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
