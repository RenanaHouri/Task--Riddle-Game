export  async function getAllRiddles()
{
    try{
    const res=await fetch("http://localhost:3000/riddles");
    if(!res.ok)
    {
        throw new Error("Failed to fetch riddles")
    }
    
    return await res.json()
}
catch(error)
{
      console.log("Original error:", error);
      throw new Error("Could not load riddles from server");
}
}

export async function createRiddle(riddle){
    try{
    const res=await fetch("http://localhost:3000/riddles",{
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body:JSON.stringify(riddle)
    }
    
)
    if(!res.ok)
    {
        throw new Error("Could not add riddles")
    }
    return await res.json()
}
catch(error){
  throw new Error("Could not add riddles")

}
}
export async function updateRiddle(id, riddle){
    try{
        const res= await fetch(`http://localhost:3000/riddles/${id}`,{
        method:"PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(riddle)
        })
        if(!res.ok) 
        {
            throw new Error("Could not update riddles")
        }
        return res.json()
    }
    
    catch{
        throw new Error("Could not update riddles")
    }
}

export async function deleteRiddle(id){
    try{
        const res=await fetch(`http://localhost:3000/riddles/${id}`,{
        method:"DELETE"
    }
    )
    if(!res.ok)
    {
        throw new Error("Could not delete the riddles")
    }

    }
    catch{
        throw new Error("Could not delete the riddles")
    }
    
}
