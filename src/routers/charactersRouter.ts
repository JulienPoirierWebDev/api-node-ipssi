import express from 'express';
import CharactersController from '../controllers/CharactersController';

// Un router doit brancher des fonctions a des routes de l'application
// Il doit ignorer la logique dans les fonctions éxécutés
const charactersRouter = express.Router();

const characterController = new CharactersController();

charactersRouter.post('/', characterController.createOneCharacter);

charactersRouter.get('/', characterController.getAllCharacters);

charactersRouter.get('/:id', characterController.getOneCharacterById);

charactersRouter.put(
  '/:id',
  characterController.replaceOneCharacterNameAndDescription,
);

charactersRouter.delete('/:id', characterController.deleteOneCharacterById);

export { charactersRouter };
