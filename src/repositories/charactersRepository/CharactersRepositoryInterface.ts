import type { CharacterType } from '../../controllers/CharactersController';

export type CharacterInfosType = {
  name: string;
  description: string;
};
interface CharactersRepositoryInterface {
  createCharacter(characterInfos: CharacterInfosType): void;
  getAllCharacters(): CharacterType[];
  getOneCharacterById(id: number): CharacterType | undefined;
  updateOneCharacterById(id: number): CharacterType;
  deleteOneCharacterById(): void;
}

export type { CharactersRepositoryInterface };
