 export async function findPlayerByName(name){
 try{
    const res=await fetch(`http://localhost:3000/players?name=${name}`);
    if(!res.ok)
    {
        throw new Error("Failed to fetch player")
    }
    
    const arr= await res.json()
    return arr[0];
}
catch(error)
{
      throw new Error("Could not load player from server");
}
}

 export async function createPlayer(name){
     try{
        const player={
            name:name,
            lowestTime: null
        }
    const res=await fetch("http://localhost:3000/players",{
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body:JSON.stringify(player)
    }
)
    if(!res.ok)
    {
        throw new Error("Could not add player")
    }
    return await res.json()
}
catch(error){
  throw new Error("Could not add player")

}
}

export async function updatePlayer(player) {
    try {
        const res = await fetch(`http://localhost:3000/players/${player.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(player)
        });

        if (!res.ok) {
            throw new Error("Could not update player");
        }

        return res.json();
    }

    catch {
        throw new Error("Could not update player");
    }
}

export async function getAllPlayers(){
    try{
    const res=await fetch("http://localhost:3000/players");
    if(!res.ok)
    {
        throw new Error("Failed to fetch players")
    }
    
    return res.json()
}
catch(error)
{
      throw new Error("Could not load players from server");
}

}