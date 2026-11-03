// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.

import PromptSync from 'prompt-sync';
import Riddle from './classes/Riddle.js';
import Player from './classes/Player.js';
import {getAllRiddles,deleteRiddle,updateRiddle,createRiddle} from './api/riddlesApi.js';
import{findPlayerByName,createPlayer,updatePlayer,getAllPlayers} from './api/playersApi.js'
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js';

const prompt = PromptSync();

async function playGame() {
    const name = prompt("What is your name? ");
    let savedPlayer= await findPlayerByName(name);
    if(savedPlayer===undefined)
    {
        savedPlayer=await createPlayer(name);
    }
    if(savedPlayer.lowestTime!=null)
    {
        console.log(`Hi ${name}! Your previous lowest time was ${savedPlayer.lowestTime} seconds.`)
    }
    
    const level=prompt("Choose difficulty: easy / medium / hard:")
    const player = new Player(name);

const filterRiddle=(await getAllRiddles()).filter(function(riddle){
        return riddle.difficulty===level.trim().toLowerCase()
})

filterRiddle.forEach(function(riddle) {
    const start = Date.now();

    let currentRiddle;

    if (riddle.choices) {
        currentRiddle = new MultipleChoiceRiddle(
            riddle.id,
            riddle.name,
            riddle.taskDescription,
            riddle.correctAnswer,
            riddle.choices
        );
    } else {
        currentRiddle = new Riddle(
            riddle.id,
            riddle.name,
            riddle.taskDescription,
            riddle.correctAnswer
        );
    }

    currentRiddle.ask(prompt);

    const end = Date.now();
    player.recordTime(start, end);
});

player.showStats();
const currentTime = player.getTotalTime();

if ( player.times.length > 0 &&(savedPlayer.lowestTime === null || savedPlayer.lowestTime>currentTime)) {
    savedPlayer.lowestTime=currentTime
    await updatePlayer(savedPlayer);
    console.log("New record! Time updated.");

}

}

console.log("Welcome to the Riddle Game!");
let choice="";
while(choice!="0")
{
console.log(`
What do you want to do?

1. Play the game
2. Create a new riddle
3. Read all riddles
4. Update an existing riddle
5. Delete a riddle
6. View leaderboard
0. Exit
`);
choice=prompt("Enter your choice: ")
if(choice=="1")
{
    await playGame()

}
if(choice=="2")
{
    const name = prompt("Enter riddle name: ");
    const taskDescription = prompt("Enter riddle description: ");
    const correctAnswer = prompt("Enter correct answer: ");
    const difficulty = prompt("Enter difficulty (easy/medium/hard): ");
    const riddle={
        name:name,
        taskDescription:taskDescription,
        correctAnswer:correctAnswer ,
        difficulty:difficulty,
    }
    await createRiddle(riddle)
    console.log("Riddle created successfully!");
    
}
if(choice=="3")
{
     const riddles = await getAllRiddles();
     console.log(riddles);
    
}
if(choice=="4")
{
    const id = prompt("Enter riddle ID to update: ");
    const name = prompt("Enter new riddle name: ");
    const taskDescription = prompt("Enter new riddle description: ");
    const correctAnswer = prompt("Enter new correct answer: ");
    const difficulty = prompt("Enter new difficulty (easy/medium/hard): ");
    const riddle={
        name:name,
        taskDescription:taskDescription,
        correctAnswer:correctAnswer ,
        difficulty:difficulty,
    }
    await updateRiddle(id,riddle);
    console.log("Riddle updated  successfully!");


    
}
if(choice=="5")
{
     const id = prompt("Enter riddle ID to delete: ");
     await deleteRiddle(id)
     console.log("Riddle deleted successfully!");

}
if(choice=="6")
{
   let allPlayers= await getAllPlayers();
   const playerFilter =allPlayers.filter(function(player)
{
    return player.lowestTime!=null
})
playerFilter.sort((a,b) => a.lowestTime - b.lowestTime);
console.log("Leaderboard:");
playerFilter.forEach(function(player,index)
{
    console.log(`${index + 1}. ${player.name} - ${player.lowestTime} seconds`);
})
}


}
