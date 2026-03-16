import express from 'express';
import { charactersRouter } from './routers/charactersRouter.ts';

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

app.use('/characters', charactersRouter);

// ajouter une route pour species
//

// L'application doit écouter sur un port pour fonctionner.
app.listen(3000, () => {
  // Message en cas de réussite
  console.log('Server en fonctionnement');
});
