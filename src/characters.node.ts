import { appendFile, readFile } from "node:fs";

app.post("/characters", (request, response) => {

  const newCharacter : CharacterType = {
      id:Date.now(),
      name:"Mario",
      description:"Un plombier",
      imageUrl:"/public/mario.jpg",
      createdAt:new Date(),
      updatedAd:new Date()
  }

    // tenter de lire fichier.

    // S'il y a un fichier en txt
    // on a la structure [{},{}] -> on JSON.parse
    // On ajouter la donnée {} avec data.push
    // [{},{},{}]
    // On stringify
    //



  appendFile("./src/characters.txt",JSON.stringify(newCharacter), (err) => {

    if(!err) {
      console.log("reussite")
      response.status(201).json({
      message:"Le character a été crée",
      character:newCharacter
  })
    } else {
      console.log(err);
      response.status(500).json({message:"Oups", error:true})
    }
  })


})

app.get("/characters", (request, response) => {

  // {XXX}{XXXX}
  // [{}, {}, {}]

  try {

  readFile("./src/characters.txt", "utf8", (err, data) => {


    if(!err) {
      response.json({message:"reussite",
        resultats:JSON.parse(data)
      })
    }
  })
  } catch (error) {
    response.status(500).json({message: "Nous n'arrivons pas a acceder a l'infos", error:true})
  }

})
