import fs from "fs";

const data = fs.readFileSync("../inputs/day1.txt", "utf8");
const elves = data.trim().split("\n");

let currentCalories = 0;
let calories: number[] = [];

for (const calorie of elves) {
  if (calorie.trim() !== "") {
    currentCalories += parseInt(calorie, 10);
  } else {
    calories.push(currentCalories);
    currentCalories = 0;
  }
}

console.log(`Max Calorie carried is ${Math.max(...calories)}`)

/*=================================== Part 2 =====================================*/

const topThreeElves: number[] = calories.sort((a, b) => b - a).slice(0, 3);
const sum = topThreeElves.reduce<number>((sum, p) => sum + p, 0);

console.log(`The top three elves carrying the most Calories are ${topThreeElves}`);
console.log(`The sum of the max calories are ${sum}`);
