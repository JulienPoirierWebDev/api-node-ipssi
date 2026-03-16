import type { CharacterType } from '../../controllers/CharactersController';

interface CharactersRepositoryInterface {
  createCharacter(newCharacter: CharacterType): void;
  getAllCharacters(): CharacterType[];
  getOneCharacterById(id: number): CharacterType;
  updateOneCharacterById(id: number): CharacterType;
  deleteOneCharacterById(): void;
}

export type { CharactersRepositoryInterface };
