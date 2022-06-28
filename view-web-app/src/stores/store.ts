import axios from 'axios';
import type { InjectionKey } from 'vue';
import config from "../config.json";
import { createStore, Store, useStore  } from 'vuex';

export interface UserState {
    id: string;
    role: string;
    firstName?: string;
}

export interface State {
    isLoadingUserData: boolean;
    user?: UserState;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
        isLoadingUserData: true,
        user: undefined
    }
  },
  actions: {
      async fetchUserData({ commit }, payload: UserState) {
          try {
              const response = await axios.get(`${config.GATEWAY_URL}/users/${payload.id}`);
              const { id, firstName } = response.data;
              commit("setUserData", {
                  id,
                  firstName,
                  role: payload.role
              })
          } catch (e) {}
      }
  },
  mutations: {
      setUserData (state: State, payload: UserState) {
          state.user = payload;
          state.isLoadingUserData = false;
      },
      clearUserData (state: State) {
          state.user = undefined;
      },
      setUserDataLoaded(state: State) {
          state.isLoadingUserData = false;
      }
  }
})

export default function useGlobalStore() {
    return useStore(storeKey);
}
