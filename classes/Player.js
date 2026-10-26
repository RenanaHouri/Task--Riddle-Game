// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle

export default class Player{
    constructor(name)
    {
        this.name=name;
        this.times=[]
    }
    recordTime(start, end)
    {
        const duration=end-start;
        this.times.push(duration)

    }
    showStats()
    {
        let totalTime=0;
        this.times.forEach(function(time)
        {
        totalTime+=time;
        })
        const averageTime = totalTime / this.times.length;
        console.log("Total time: " + totalTime / 1000 + " seconds");
        console.log("average time: " + averageTime / 1000 + " seconds");

    }


}