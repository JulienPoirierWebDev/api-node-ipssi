import type { CharacterType } from '../../controllers/CharactersController';
import type { CharacterInfosType } from '../charactersRepository/CharactersRepositoryInterface';
import type { CharactersRepositoryInterface } from './CharactersRepositoryInterface';

let characters: CharacterType[] = [];

class CharactersRepositoryInMemory implements CharactersRepositoryInterface {
  createCharacter(characterInfos: CharacterInfosType): void {
    const newCharacter: CharacterType = {
      id: Date.now(),
      name: characterInfos.name,
      description: characterInfos.description,
      createdAt: new Date(),
      updatedAd: new Date(),
    };

    characters.push(newCharacter);
  }

  getAllCharacters(): CharacterType[] {
    return characters;
  }

  getOneCharacterById(id: number): CharacterType | undefined {}

  updateOneCharacterById(id: number): CharacterType {
    throw new Error('not yet implemented');
  }
  deleteOneCharacterById(): void {
    throw new Error('not yet implemented');
  }
}

export default CharactersRepositoryInMemory;
