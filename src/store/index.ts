import Vue from 'vue'
import Vuex from 'vuex'
import userInfoModule from './modules/userInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userInfo: userInfoModule,
  },
  getters: {
    token: (state) => state.user.token,
  },
})

export default store
