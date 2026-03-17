import type { Request, Response } from 'express';
import type { CharactersRepositoryInterface } from '../repositories/charactersRepository/CharactersRepositoryInterface.ts';

export type CharacterType = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAd: Date;
};

// Un controller doit manipuler la requête et renvoyer une réponse !
class CharactersController {
  characterRepository: CharactersRepositoryInterface;
  constructor(characterRepository: CharactersRepositoryInterface) {
    this.characterRepository = characterRepository;
  }

  createOneCharacter = async (request: Request, response: Response) => {
    const body = request.body;

    if (!body.name || !body.description) {
      // TODO il faut aussi vérifier le type des données !
      return response
        .status(400)
        .json({ message: 'Il manque des données', error: true });
    }

    const newCharacterInfo = {
      name: String(body.name),
      description: String(body.description),
    };

    const newCharacter =
      await this.characterRepository.createCharacter(newCharacterInfo);

    response
      .status(201)
      .json({ message: 'Perso crée !', character: newCharacter });
  };

  getAllCharacters = async (request: Request, response: Response) => {
    const characters = await this.characterRepository.getAllCharacters();
    if (characters.length === 0) {
      response.json({
        message: "Il n'y a aucun personnage en base ",
        results: null,
      });
    } else {
      response.json({ message: 'Données trouvées ', results: characters });
    }
  };

  getOneCharacterById = async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .json({ message: "L'id n'est pas un nombre", error: true });
    }

    const character = await this.characterRepository.getOneCharacterById(id);

    if (!character) {
      return response
        .status(404)
        .json({ message: "Il n'y a pas de perso avec cet ID", error: true });
    }

    response.json({ message: 'Perso trouvé', result: character });
  };

  replaceOneCharacterNameAndDescription = async (
    request: Request,
    response: Response,
  ) => {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .json({ message: "L'id n'est pas un nombre", error: true });
    }

    const body = request.body;

    if (!body.name || !body.description) {
      response.status(400).json({
        message: 'Merci de fourni le nom et la description',
        error: true,
      });
    }

    const character = await this.characterRepository.updateOneCharacterById(id, {
      name: body.name,
      description: body.description,
    });

    response.json({ message: 'Perso modifié', result: character });
  };

  deleteOneCharacterById = async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .json({ message: "L'id n'est pas un nombre", error: true });
    }

    const isDeleted = await this.characterRepository.deleteOneCharacterById(id);

    response.json({ message: 'Perso supprimé' });
  };
}

export default CharactersController;
