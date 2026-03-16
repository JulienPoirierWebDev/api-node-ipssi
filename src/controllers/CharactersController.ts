import type { Request, Response } from 'express';

export type CharacterType = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAd: Date;
};

let characters: CharacterType[] = [];

// Un controller doit manipuler la requête et renvoyer une réponse !
class CharactersController {
  constructor() {
    // rien a déclarer
  }

  createOneCharacter(request: Request, response: Response) {
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
  }

  getAllCharacters(request: Request, response: Response) {
    if (characters.length === 0) {
      response.json({
        message: "Il n'y a aucun personnage en base ",
        results: null,
      });
    } else {
      response.json({ message: 'Données trouvées ', results: characters });
    }
  }

  getOneCharacterById(request: Request, response: Response) {
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
  }

  replaceOneCharacterNameAndDescription(request: Request, response: Response) {
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
  }

  deleteOneCharacterById(request: Request, response: Response) {
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
  }
}

export default CharactersController;
