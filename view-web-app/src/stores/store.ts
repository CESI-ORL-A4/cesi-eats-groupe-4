import axios from 'axios';
import type { InjectionKey } from 'vue';
import config from "../config.json";
import { createStore, Store, useStore  } from 'vuex';
import { loadUserData } from '@/modules/userAPI';
import {getRestaurantByOwnerId} from "@/modules/restaurantAPI";

export interface UserState {
    id: string;
    role: string;
    firstName?: string;
    restaurantId?: string;
}

export interface State {
    isLoadingUserData: boolean;
    user?: UserState;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
        isLoadingUserData: true
    }
  },
  actions: {
      async fetchUserData({ commit }, payload: UserState) {
          try {
              const response = await loadUserData(payload.id);
              if (response) {
                  const { id, firstName } = response.data;
                  let restaurantId = undefined;

                  if (payload.role === "OWNER") {
                      restaurantId = (await getRestaurantByOwnerId(id))._id;
                  }

                  commit("setUserData", {
                      id,
                      firstName,
                      role: payload.role,
                      restaurantId
                  })
              } else {
                  commit("setUserDataLoaded");
              }
          } catch (e) {
              commit("setUserDataLoaded");
          }
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
