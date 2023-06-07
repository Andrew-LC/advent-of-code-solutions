import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf8").toString();

enum HAND {
  X = "rock",
  Y = "paper",
  Z = "scissors",
  A = "rock",
  B = "paper",
  C = "scissors"
}

enum HAND_POINTS {
  rock = 1,
  paper = 2,
  scissors = 3
}

enum GAME_POINTS {
  WIN = 6,
  DRAW = 3,
  LOST = 0
}

const pattern = {
 "rock paper": "win",
 "paper scissors": "win",
 "scissors rock": "win",
 "scissors scissors": "draw",
 "paper paper": "draw",
 "rock rock": "draw",
 "paper rock": "lose",
 "scissors paper": "lose",
 "rock scissors": "lose",
}

const games = data.split("\n").map((str) => str.replace(/\r/g, "")).filter(Boolean);

function pointReturn(games: string[]): number {
  let counter = 0;
  for(const match of games){
    const game = match.split(" ");
    const opponentHand = HAND[game[0] as keyof typeof HAND];
    const playerHand = HAND[game[1] as keyof typeof HAND];
    const playerPoint = HAND_POINTS[playerHand as keyof typeof HAND_POINTS];
    const opponentPoint = HAND_POINTS[opponentHand as keyof typeof HAND_POINTS]
    const moveset: string = [opponentHand, playerHand].join(" ");

    if (pattern[moveset] == "win") {
      counter += GAME_POINTS.WIN + playerPoint;
    } else if (pattern[moveset] == "draw") {
      counter += GAME_POINTS.DRAW + playerPoint;
    } else if(pattern[moveset] == "lose") {
      counter += GAME_POINTS.LOST + playerPoint;
    }
   }

  return counter;
 }

const points = pointReturn(games);
console.log(points)

function strategizeInput(game: string[]){
  let newInput = [];
  for(const match of game){
    const [opponent, player] = match.split(" ");
    if(player == "X" && opponent == "A"){
     newInput.push([opponent, "Z"].join(" ")); 
    } else if(player == "X" && opponent == "B") {
      newInput.push([opponent, "X"].join(" ")); 
    } else if(player == "X" && opponent == "C") {
      newInput.push([opponent, "Y"].join(" "));
    }else if(player == "Y" && opponent == "A") {
      newInput.push([opponent, "X"].join(" "));
    } else if(player == "Y" && opponent == "B") {
      newInput.push([opponent, "Y"].join(" "));
    } else if(player == "Y" && opponent == "C") {
      newInput.push([opponent, "Z"].join(" "));
    } else if(player == "Z" && opponent == "A") {
      newInput.push([opponent, "Y"].join(" "));
    } else if(player == "Z" && opponent == "B") {
      newInput.push([opponent, "Z"].join(" "));
    } else if(player == "Z" && opponent == "C") {
      newInput.push([opponent, "X"].join(" "));
    }
  }

  return newInput;
}

console.log(pointReturn(strategizeInput(games)));
