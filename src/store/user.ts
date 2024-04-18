import { StoreOptions } from "vuex";


export default {
  namespaced: true,
  state : () => ({
    loginUser: {
      userName: '未登录',
    },
  }),
  actions : {
    async getLoginUser ({ commit, state }, payload) {
      commit("updateUser", { userName: "C1own"});
    },
  },
  mutations : {
    updateUser (state, payload) {
      state.loginUser = payload
    },
  }
} as StoreOptions<any>;
