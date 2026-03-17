import type { CharacterType } from '../../controllers/CharactersController.ts';
import type {
  CharacterInfosType,
  CharactersRepositoryInterface,
} from './CharactersRepositoryInterface.ts';

//this en JS / TS : il fait référence au contexte d'éxécution de la méthode / fonction
// en mode "fonction normale"
let characters: CharacterType[] = [];

class CharactersRepositoryInMemory implements CharactersRepositoryInterface {
  createCharacter = async (
    characterInfos: CharacterInfosType,
  ): Promise<CharacterType> => {
    const newCharacter: CharacterType = {
      id: Date.now(),
      name: characterInfos.name,
      description: characterInfos.description,
      createdAt: new Date(),
      updatedAd: new Date(),
    };

    characters.push(newCharacter);

    return newCharacter;
  };

  getAllCharacters = async (): Promise<CharacterType[]> => {
    return characters;
  };

  getOneCharacterById = async (
    id: number,
  ): Promise<CharacterType | undefined> => {
    return characters.find((oneCharacter) => oneCharacter.id === id);
  };

  updateOneCharacterById = async (
    id: number,
    data: CharacterInfosType,
  ): Promise<CharacterType> => {
    const character = characters.find((oneCharacter) => oneCharacter.id === id);

    if (!character) {
      throw new Error("Il n'y a pas de personnage avec cet ID");
    }

    //const body = request.body;

    character.name = data.name;
    character.description = data.description;
    character.updatedAd = new Date();

    return character;
  };

  deleteOneCharacterById = async (id: number): Promise<Boolean> => {
    //      [a, b, c, d]
    // index 0  1  2  3

    //Si on veut supprimer c : il faut déja trouver son index.
    const characterIndex = characters.findIndex(
      (oneCharacter) => oneCharacter.id === id,
    );

    console.log(characterIndex);

    if (characterIndex === -1) {
      throw new Error("Il n'y a pas de perso avec cet ID");
    }

    // supprimer l'élement qui a l'index X
    characters.splice(characterIndex, 1); // Le deuxième paramètre signifie qu'il faut supprimer un seul élément

    return true;
  };
}

export default CharactersRepositoryInMemory;
