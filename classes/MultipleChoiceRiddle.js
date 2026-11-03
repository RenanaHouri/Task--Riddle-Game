import Riddle from './Riddle.js';

export default class MultipleChoiceRiddle extends Riddle {
    constructor(id, name,taskDescription,correctAnswer, choices )
    {
        super(id, name,taskDescription,correctAnswer)
        this.choices=choices
    }
    ask(prompt) {
        console.log(this.name);
        console.log(this.taskDescription);
        let i=1
        this.choices.forEach(function(option)
    {
        console.log(i + ". " + option);
        i=i+1;
    })
    let userAnswer = prompt("Choose an option number: ");
    const correctOption = this.choices.indexOf(this.correctAnswer) + 1;
    while (correctOption !== Number(userAnswer))
        {
            console.log("Your answwer incorrect,try again!")
            userAnswer=prompt("Your answer: ")
        }
        console.log("Correct answer!")

    }

}