import express from 'express';

//on prépare une application vide (pour le moment) app est une instance d'express
const app = express();

// Middleware global qui permet d'acceder au body de la requête reçue.
app.use(express.json());

// On enregistre une route : méthode GET sur endpoint (chemin) "/"
// Une fonction callback (appelé plus tard / après) est associée au combo méthode + endpoint
// Quand l'app écoute une requête sur "/" avec la méthode GET, alors elle exécuté la fonction
app.get('/', (request, response) => {
  // request qui va contenir toutes les infos sur la requete reçue
  // (les infos du client, la route, les query parameters, etc)
  // response est la reponse qui sera envoyé par notre API vers le client : nous devons l'enrichir
  // pour que le client reçoive ce que l'on souhaite.
  response.json({ message: 'Tout est OK sur la route principale' });
});

app.get('/date', (request, response) => {
  const date = new Date();
  response.json({ message: `Nous sommes le ${date.toLocaleDateString()} ` });
});

app.get('/questions', async (request, response) => {
  try {
    const fetchRequest = await fetch(
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy',
    );
    if (fetchRequest.ok) {
      const data = await fetchRequest.json();
      response.json(data);
    } else {
      throw new Error();
    }
  } catch (error) {
    response
      .status(503)
      .json({ message: 'Il y a un problème chez nous', error: true });
  }
});

export type CharacterType = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAd: Date;
};

let characters: CharacterType[] = [];

app.post('/characters', (request, response) => {
  const body = request.body;

  if (!body.name || !body.description) {
    // TODO il faut aussi vérifier le type des données !
    return response
      .status(400)
      .json({ message: 'Il manque des données', error: true });
  }

  const newCharacter: CharacterType = {
    id: Date.now(),
    name: body.name,
    description: body.description,
    createdAt: new Date(),
    updatedAd: new Date(),
  };

  characters.push(newCharacter);

  response
    .status(201)
    .json({ message: 'Perso crée !', character: newCharacter });
});

app.get('/characters', (request, response) => {
  if (characters.length === 0) {
    response.json({
      message: "Il n'y a aucun personnage en base ",
      results: null,
    });
  } else {
    response.json({ message: 'Données trouvées ', results: characters });
  }
});

/*
TODO :

Faire la suite du CRUD pour characters :

Il faut que l'on puisse : créer un personnage
Récupérer tous les perso
En récupérer un avec son ID
En modifier un avec son ID
En supprimer un avec son ID

*/

app.get('/characters/:id', (request, response) => {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return response
      .status(400)
      .json({ message: "L'id n'est pas un nombre", error: true });
  }

  const character = characters.find((oneCharacter) => oneCharacter.id === id);

  if (!character) {
    return response
      .status(404)
      .json({ message: "Il n'y a pas de perso avec cet ID", error: true });
  }

  response.json({ message: 'Perso trouvé', result: character });
});

app.put('/characters/:id', (request, response) => {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return response
      .status(400)
      .json({ message: "L'id n'est pas un nombre", error: true });
  }

  const character = characters.find((oneCharacter) => oneCharacter.id === id);

  if (!character) {
    return response
      .status(404)
      .json({ message: "Il n'y a pas de perso avec cet ID", error: true });
  }

  //const body = request.body;
  const { name, description } = request.body;

  character.name = name;
  character.description = description;
  character.updatedAd = new Date();

  response.json({ message: 'Perso modifié', result: character });
});

app.delete('/characters/:id', (request, response) => {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return response
      .status(400)
      .json({ message: "L'id n'est pas un nombre", error: true });
  }

  //      [a, b, c, d]
  // index 0  1  2  3

  //Si on veut supprimer c : il faut déja trouver son index.
  const characterIndex = characters.findIndex(
    (oneCharacter) => oneCharacter.id === id,
  );

  console.log(characterIndex);

  if (characterIndex === -1) {
    return response
      .status(404)
      .json({ message: "Il n'y a pas de perso avec cet ID", error: true });
  }

  // supprimer l'élement qui a l'index X
  characters.splice(characterIndex, 1); // Le deuxième paramètre signifie qu'il faut supprimer un seul élément

  response.json({ message: 'Perso supprimé' });
});

// L'application doit écouter sur un port pour fonctionner.
app.listen(3000, () => {
  // Message en cas de réussite
  console.log('Server en fonctionnement');
});
