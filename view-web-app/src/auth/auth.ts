import useGlobalStore from "../stores/store";

export function tryLoadUserData() {
    const store = useGlobalStore();
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (userId) {
        store.dispatch("fetchUserData", { id: userId, role });
    } else {
        store.commit("setUserDataLoaded");
    }
}
