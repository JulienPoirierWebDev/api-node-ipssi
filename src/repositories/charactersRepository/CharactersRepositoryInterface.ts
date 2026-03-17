import type { CharacterType } from '../../controllers/CharactersController.ts';

export type CharacterInfosType = {
  name: string;
  description: string;
};

interface CharactersRepositoryInterface {
  createCharacter(newCharacter: CharacterInfosType): Promise<CharacterType>;
  getAllCharacters(): Promise<CharacterType[]>;
  getOneCharacterById(id: number): Promise<CharacterType | undefined>;
  updateOneCharacterById(
    id: number,
    data: CharacterInfosType,
  ): Promise<CharacterType>;
  deleteOneCharacterById(id:number): Promise<Boolean>;
}

export type { CharactersRepositoryInterface };
