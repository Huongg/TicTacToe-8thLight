const constants = require("./constants.js");

const TicTacToe = require("./ticTacToe.js").TicTacToe;

// TO DO:
// define scope variable



board= [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
X= 'X';
O= 'O';
players= [X, O];
curr_turn= null;


// display grids (rows) on the console
board_display= function(){
  return    ' '+board[0]+' |'+' '+board[1]+' |'+' '+board[2]
            +'\n===+===+===\n'+' '
            +board[3]+' |'+' '+board[4]+' |'+' '+board[5]
            +'\n===+===+===\n'+' '
            +board[6]+' |'+' '+board[7]+' |'+' '+board[8]
}



// computer move
comp= function(computerSymbol){
  // changed the name "x" to computerMove
  computerMove= get_pattern_O_move();
  if(computerMove==-1){
    computerMove= get_pattern_X_move();
    if(computerMove==-1){
      computerMove= get_available_space_move();
    }
  }
  move(computerMove,computerSymbol);
}


move= function(pos, currentSymbol){
  // if not the current turn
  // return false
  // if(x!=curr_turn){
  //   return false;
  // }

  curr_turn = currentSymbol;

  // + before pos helps turn the pos into integer number
  // if pos >=0 and <=8 and is a number and not on the board yet
  // then go slice the board

  if(pos>=0 && pos<=8 && !isNaN(pos) && board[pos]==' '){
    board.splice(pos, 1, curr_turn);

      // if the current turn is X, switch to O, vice versa
    console.log(`current turn is: ${curr_turn}`);
    // curr_turn= (x==X)? O: X;
    // (curr_turn === X) ? O : X;

    return true;
  }

  // if it returns false, should be a message said
  // "position is already taken"
  return false;
}


board_filled= function(){
  nextFreeMove = get_available_space_move();
  if(nextFreeMove==-1){
    show();
    console.log('Game over');
    return true;
  }
  return false; 
}

// computer gets move
get_available_space_move= function(){

  // this is the default value saying that if no one started or taken the middle one
  // computer will choose the middle point
  if(board[4] == ' '){
    return 4
  };

  // this is for when no pattern is found,
  // next turn will take the first index value of the empty space
  return board.indexOf(' ');
}


winner= function(){
  board_string= board.join('');
  the_winner= null;
  for(i=0 ; i<constants.patterns_winning.length ; i++){
    array= board_string.match(constants.patterns_winning[i][0]);
    if(array){
      the_winner= constants.patterns_winning[i][1];
    }
  }
  if(the_winner){
    show();
    console.log('Game over');
    return true;
  }

  return false;
}


// get the move for O based on pattern 1
get_pattern_O_move= function(){
  board_string= board.join('')
  for(i=0 ; i<constants.patterns_O.length ; i++){
    array= board_string.match(constants.patterns_O[i][0]);
    if(array){
      return constants.patterns_O[i][1];
    }
  }

  // return -1 in case the current pattern does not match the patter_1_move
  // this case, current turn is X, it will never get matched with patter_1 which is O
  return -1;
}


// get the move for X (user pattern) based on pattern 2
get_pattern_X_move= function(){
  board_string= board.join('')
  for(i=0 ; i<constants.patterns_X.length ; i++){
    array= board_string.match(constants.patterns_X[i][0])
    if(array){
      return constants.patterns_X[i][1]
    }
  }
  return -1
}



exit= function(){
  process.exit();
}


// show the board on the console
show= function(){
  console.log(board_display())
}


checking_valid_input= function(input, gameIsStarted){
  // using regex to double check again make sure the number is from 0-8
  if(gameIsStarted){
    const regex = /\b[0-8]\b/;
    return regex.exec(input);
  } else {
     const regex = /O|X/g;
    return regex.exec(input);
  }
  
}

play= function(){
  let game = new TicTacToe(); 
  console.log("Please pick your symbol (X or O):");
  // changed openStdin. to stdin.one()
  process.stdin.on('data',function(val){ 
    
    if(!game.isStarted){
        const inputSymbol = val.toString()[0].toUpperCase();     
        if(inputSymbol !== undefined && 
            (checking_valid_input(inputSymbol, game.isStarted) !== null)) {

          game.isStarted = true; 
          console.log(`User has picked: ${inputSymbol}`);
          game.initialiseSymbols(inputSymbol);
          show();
          console.log("Enter [0-8]:");

        } else {
          console.log("Invalid input, please re-enter X or O");
        }

    } else{

      // +val transfers data in Unite8arra to integer number/posion
      // change res to position (clearer understanding)
      let position = +val; 
      game.currentUserPosition = position;
      if(checking_valid_input(game.currentUserPosition, game.isStarted) !== null) {
        move(position, game.userSymbol);
        if(winner()||board_filled()) {
          exit()
        } else {
          // added function show() here
          // so the move of player (X) will be shown seperately from the computer move
          show();
          comp(game.computerSymbol);
          if (winner()||board_filled()) {
            exit()
          } else {
            show()
          }
        }
      } else {
        console.log("Invalid input, please re-enter number from 0-8");
      }

    }

  });

}

play();
