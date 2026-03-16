import express from "express";

//on prépare une application vide (pour le moment) app est une instance d'express
const app = express()

app.use(express.json())

// On enregistre une route : méthode GET sur endpoint (chemin) "/"
// Une fonction callback (appelé plus tard / après) est associée au combo méthode + endpoint
// Quand l'app écoute une requête sur "/" avec la méthode GET, alors elle exécuté la fonction
app.get("/", (request, response) => {
  // request qui va contenir toutes les infos sur la requete reçue
  // (les infos du client, la route, les query parameters, etc)
  // response est la reponse qui sera envoyé par notre API vers le client : nous devons l'enrichir
  // pour que le client reçoive ce que l'on souhaite.
    response.json({message:"Tout est OK sur la route principale"})
})

app.get("/date", (request, response) => {
  const date = new Date();
  response.json({message : `Nous sommes le ${date.toLocaleDateString()} `})
})

app.get("/questions", async (request, response) => {
  try {
    const fetchRequest = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
    if(fetchRequest.ok) {
      const data = await fetchRequest.json();
      response.json(data);
    } else {
      throw new Error()
    }

  } catch (error) {
    response.status(503).json({message:"Il y a un problème chez nous", error:true})
  }
})

/* API REST:

// permet l'accès aux ressources
-> characters

Type HTTP : GET POST PUT PATCH DELETE

CRUD : Create Read Update Delete

Endpoint par ressource :

/characters

Pour chaque élement du CRUD, on utilise certains types

Create:
- méthode POST /characters

Read :
Récupérer un groupe (tous, ou filtre)
- methode GET /characters      ATTENTION, on peut appliquer des filtres ici.
Récupérer un élement précis et un seul.
- methode GET /characters/:id

Update :
Pour remplacer tout l'élement ayant l'ID recherché
- methode PUT /characters/:id
Pour mettre a jour seulement un morceau de l'élement
- methode PATCH /characters/:id

Delete :
Pour supprimer un élement avec l'ID
- méthode DELETE /characters/:id


Exemple :

/api/v1/characters
/api/v1/species
/api/v1/games

GET /api/v1/games/1250
Je récupère le jeu avec l'id 1250.

On peut utiliser les ressources ensembles.

On récupère tous les perso du jeu avec l'ID 1250
GET /api/v1/games/1250/characters

On récupère tous les perso de l'espèce avec l'id 2 du jeu avec l'id 1250
GET /api/v1/games/1250/characters/species/2
GET /api/v1/games/1250/characters?species=2

*/

export type CharacterType = {
  id:number,
  name:string,
  description:string,
  imageUrl?:string,
  createdAt:Date,
  updatedAd:Date
}

const characters:CharacterType[] = []

app.post('/characters', (request, response) => {

    const body = request.body

    console.log(body);

    const newCharacter : CharacterType = {
      id:Date.now(),
      name:body.name,
      description:body.description,
      createdAt:new Date(),
      updatedAd:new Date()
  }



  characters.push(newCharacter)

  response.status(201).json({message:"Perso crée !", character : newCharacter})
})


app.get('/characters', (request, response) => {
  response.json({message:"Données trouvées ", results : characters})
})

// L'application doit écouter sur un port pour fonctionner.
app.listen(3000, () => {
  // Message en cas de réussite
  console.log("Server en fonctionnement");
})
