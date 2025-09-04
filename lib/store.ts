import { createStore, action, Action } from "easy-peasy";

export interface Song {
  id: string | number;
  name: string;
  url: string;
  duration: number;
  artist?: {
    name: string;
    id: string | number;
  };
  createdAt?: string | Date;
}

export interface StoreModel {
  activeSongs: Song[];
  activeSong: Song | null;
  changeActiveSongs: Action<StoreModel, Song[]>;
  changeActiveSong: Action<StoreModel, Song>;
}

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});
